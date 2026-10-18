"""Install the supplied local Flow film with two restrained seam blends.

No generated content, remote downloads, replacement scenes or invented UI.
Outside the two transition windows the decoded source frames are unchanged.
"""
from pathlib import Path
import hashlib
import json
import subprocess
import sys

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT / '.runtime/python'))
import cv2
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw

SOURCE=ROOT / 'referência/videos/filme-completo-2026-10-03/finxi-flow-original.mp4'
NAME='finxi-flow-full-film-v1'
OUTPUT=ROOT / 'public/media' / (NAME+'.mp4')
FPS=24
# Verified actual cut frames, including the brief framing jump before cut 2.
WINDOWS=[{'cut':126,'start':118,'end':134},{'cut':253,'start':247,'end':259}]

def smooth(p):
    p=max(0,min(1,p))
    return p*p*(3-2*p)

def phone_bounds(frame):
    gray=cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)
    mask=(gray>125).astype('uint8')*255
    mask[:,:int(frame.shape[1]*.55)]=0
    mask=cv2.morphologyEx(mask,cv2.MORPH_CLOSE,np.ones((5,5),dtype='uint8'))
    contours,_=cv2.findContours(mask,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
    candidates=[cv2.boundingRect(c) for c in contours]
    candidates=[b for b in candidates if b[3]>350 and 1.8<b[3]/b[2]<3.4]
    if not candidates: raise RuntimeError('Cannot safely align the existing phone')
    return max(candidates,key=lambda b:b[2]*b[3])

def align_phone(right,left,p):
    # Match the existing device, then ease back to its original framing.
    # This prevents two displaced phone silhouettes during the blend.
    lx,ly,lw,lh=phone_bounds(left)
    rx,ry,rw,rh=phone_bounds(right)
    strength=1-smooth((p-.7)/.3)
    scale=1+strength*(lh/rh-1)
    tx=strength*((lx+lw/2)-(lh/rh)*(rx+rw/2))
    ty=strength*((ly+lh/2)-(lh/rh)*(ry+rh/2))
    matrix=np.array([[scale,0,tx],[0,scale,ty]],dtype='float32')
    return cv2.warpAffine(right,matrix,(right.shape[1],right.shape[0]),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_REPLICATE)

def run(command):
    r=subprocess.run(command,capture_output=True,text=True)
    if r.returncode: raise RuntimeError(r.stderr[-4000:])

capture=cv2.VideoCapture(str(SOURCE))
count=int(capture.get(cv2.CAP_PROP_FRAME_COUNT))
width,height=int(capture.get(3)),int(capture.get(4))
if (count,width,height)!=(420,1280,720):
    raise RuntimeError('Source changed; re-inspect seams before applying blends.')
buffers={}
for window in WINDOWS:
    for number in range(window['start'],window['end']+1):
        capture.set(cv2.CAP_PROP_POS_FRAMES,number)
        ok,frame=capture.read()
        if not ok: raise RuntimeError(f'Cannot read {number}')
        buffers[number]=frame
capture.release()

ff=imageio_ffmpeg.get_ffmpeg_exe()
encoder=subprocess.Popen([ff,'-y','-f','rawvideo','-pixel_format','bgr24','-video_size',f'{width}x{height}','-framerate',str(FPS),'-i','pipe:0','-an','-c:v','libx264','-crf','18','-preset','medium','-g','6','-keyint_min','6','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart',str(OUTPUT)],stdin=subprocess.PIPE,stdout=subprocess.DEVNULL,stderr=subprocess.DEVNULL)
capture=cv2.VideoCapture(str(SOURCE))
metrics=[{'original':[],'edited':[]} for _ in WINDOWS]
last_source=last_edited=None
try:
    for number in range(count):
        ok,original=capture.read()
        if not ok: raise RuntimeError(f'Cannot decode source {number}')
        result=original
        for index,window in enumerate(WINDOWS):
            start,end,cut=window['start'],window['end'],window['cut']
            if start<=number<=end:
                p=(number-start)/(end-start)
                # Overlap only existing frames, easing both ends of each blend.
                left=round(start+p*(cut-1-start))
                right=round(cut+p*(end-cut))
                alpha=smooth(p)
                incoming=align_phone(buffers[right],buffers[left],p) if index==0 else buffers[right]
                result=cv2.addWeighted(buffers[left],1-alpha,incoming,alpha,0)
            if start<number<=end:
                metrics[index]['original'].append(float(np.mean(np.abs(cv2.resize(original,(160,90)).astype('float32')-last_source))))
                metrics[index]['edited'].append(float(np.mean(np.abs(cv2.resize(result,(160,90)).astype('float32')-last_edited))))
        last_source=cv2.resize(original,(160,90)).astype('float32')
        last_edited=cv2.resize(result,(160,90)).astype('float32')
        encoder.stdin.write(result.tobytes())
finally:
    capture.release()
    encoder.stdin.close()
if encoder.wait()!=0: raise RuntimeError('Encoding failed')
verified=cv2.VideoCapture(str(OUTPUT))
output_count=int(verified.get(cv2.CAP_PROP_FRAME_COUNT))
output_fps=verified.get(cv2.CAP_PROP_FPS)
verified.release()
if output_count!=count or output_fps!=FPS: raise RuntimeError('Unexpected output timing')
duration=count/FPS
posters=[]
for time,suffix in [(.15,''),(5,'-app'),(9.7,'-people'),(17.2,'-end')]:
    filename=NAME+suffix+'.jpg'
    run([ff,'-y','-ss',str(time),'-i',str(OUTPUT),'-frames:v','1','-q:v','2',str(ROOT / 'public/media' / filename)])
    posters.append('/media/'+filename)
run([ff,'-y','-i',str(OUTPUT),'-vf','fps=1,scale=384:-1,tile=4x5','-frames:v','1','-q:v','2',str(ROOT / 'design/qa/user-full-film-edited-contact.jpg')])
seams=[]
for window,metric in zip(WINDOWS,metrics):
    before=max(metric['original'])
    after=max(metric['edited'])
    if after>=before: raise RuntimeError('Blend did not reduce abrupt frame change')
    seams.append({**window,'startSeconds':window['start']/FPS,'endSeconds':window['end']/FPS,'largestChangeBefore':before,'largestChangeAfter':after,'reductionPercent':round((1-after/before)*100,1)})
report={'source':str(SOURCE.relative_to(ROOT)),'sourceSha256':hashlib.sha256(SOURCE.read_bytes()).hexdigest(),'output':str(OUTPUT.relative_to(ROOT)),'frames':count,'fps':FPS,'duration':duration,'width':width,'height':height,'outsideWindows':'Original decoded source frames passed unchanged to encoder','phoneSeam':'Existing incoming device scale and center aligned before blending; eased back to original framing','audio':'Original preserved in reference; website copy silent for scroll seeking','seams':seams,'outputBytes':OUTPUT.stat().st_size}
(ROOT / 'design/qa/user-full-film-installed.json').write_text(json.dumps(report,indent=2),encoding='utf-8')
manifest={'file':NAME,'duration':duration,'width':width,'height':height,'status':'integrated-user-flow-film-with-local-blend','posters':posters,'sources':{'opening':'Complete Google Flow film supplied by the user on 2026-10-03; all four original moments preserved','localPolish':'Short eased blends at the two clip joins; no new scene, object, logo or interface','original':report['source'],'originalSha256':report['sourceSha256']}}
(ROOT / 'src/cinematic/opening-media.json').write_text(json.dumps(manifest,indent=2,ensure_ascii=False),encoding='utf-8')
print(json.dumps(report,indent=2))
