"""Preserve the user screenshot on the already downloaded new Flow home film."""
from pathlib import Path
import json, subprocess, sys
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.runtime/python'))
import cv2, numpy as np, imageio_ffmpeg

source = ROOT / 'referência/videos/revisao-2026-10-02/flow-08-home-original.mp4'
cap = cv2.VideoCapture(str(source))
fps = cap.get(cv2.CAP_PROP_FPS)
frames = []
while True:
    ok, frame = cap.read()
    if not ok: break
    frames.append(frame)
cap.release()
if not frames: raise RuntimeError('Arquivo original não encontrado ou inválido.')
h, w = frames[0].shape[:2]
# Screen bounds inspected in the last frame, excluding the generated status bar.
quad = np.float32([[523,145],[756,145],[756,615],[523,615]])
quads = [None] * len(frames)
quads[-1] = quad.copy()
inliers = []
for i in range(len(frames)-1, 0, -1):
    a = cv2.cvtColor(frames[i], cv2.COLOR_BGR2GRAY)
    b = cv2.cvtColor(frames[i-1], cv2.COLOR_BGR2GRAY)
    mask = np.zeros((h,w), np.uint8)
    cv2.polylines(mask, [np.int32(quad)], True, 255, 30)
    pts = cv2.goodFeaturesToTrack(a, 350, .005, 5, mask=mask)
    if pts is None or len(pts)<8: raise RuntimeError('Poucos pontos para rastrear o visor.')
    nxt, status, err = cv2.calcOpticalFlowPyrLK(a,b,pts,None,winSize=(31,31),maxLevel=4)
    good = (status.ravel()==1) & (err.ravel()<25)
    H, support = cv2.findHomography(pts[good],nxt[good],cv2.RANSAC,2)
    if H is None: raise RuntimeError('Falha no rastreamento: '+str(i))
    quad = cv2.perspectiveTransform(quad.reshape(1,4,2),H)[0]
    quads[i-1] = quad.copy()
    inliers.append(int(support.sum()))
texture = cv2.imdecode(np.fromfile(ROOT / 'referência/telas-app-2026-10-02/inicio.jpg',np.uint8),cv2.IMREAD_COLOR)
th,tw = texture.shape[:2]
corners = np.float32([[0,0],[tw-1,0],[tw-1,th-1],[0,th-1]])
alpha = np.full((th,tw),255,np.uint8)
# Rounded bottom corners match the phone's physical screen; screenshot text stays intact.
r=48
alpha[th-r:,:r]=0;alpha[th-r:,tw-r:]=0
cv2.circle(alpha,(r,th-r),r,255,-1);cv2.circle(alpha,(tw-r-1,th-r),r,255,-1)
name='finxi-app-home'
ff=imageio_ffmpeg.get_ffmpeg_exe()
out=ROOT / 'public/media' / (name+'.mp4')
proc=subprocess.Popen([ff,'-y','-f','rawvideo','-pix_fmt','bgr24','-s',f'{w}x{h}','-r',str(fps),'-i','-','-an','-c:v','libx264','-preset','medium','-crf','18','-g','6','-keyint_min','6','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart',str(out)],stdin=subprocess.PIPE,stderr=subprocess.DEVNULL)
contact=[]
for i,(frame,q) in enumerate(zip(frames,quads)):
    # Correct the accumulated optical-flow drift in the opening close-up.
    opening=np.float32([[669,190],[1164,190],[1164,1179],[669,1179]])
    q=q+(opening-quads[0])*max(0,1-i/96)**2
    matrix=cv2.getPerspectiveTransform(corners,q.astype(np.float32))
    tex=cv2.warpPerspective(texture,matrix,(w,h),flags=cv2.INTER_CUBIC)
    a=cv2.warpPerspective(alpha,matrix,(w,h),flags=cv2.INTER_LINEAR).astype(np.float32)/255
    a=cv2.GaussianBlur(a,(3,3),.4)[...,None]
    result=np.clip(tex*a+frame*(1-a),0,255).astype(np.uint8)
    shift=w*.71-q[:,0].mean()
    result=cv2.warpAffine(result,np.float32([[1,0,shift],[0,1,0]]),(w,h),borderMode=cv2.BORDER_REPLICATE)
    proc.stdin.write(result.tobytes())
    if i in (0,len(frames)//2,len(frames)-1):
        suffix={0:'',len(frames)//2:'-mid',len(frames)-1:'-end'}[i]
        cv2.imencode('.jpg',result,[cv2.IMWRITE_JPEG_QUALITY,95])[1].tofile(str(ROOT/'public/media'/(name+suffix+'.jpg')))
    if i in (0,len(frames)//4,len(frames)//2,len(frames)-1):contact.append(cv2.resize(result,(640,360)))
proc.stdin.close()
if proc.wait():raise RuntimeError('Falha ao codificar o filme.')
cv2.imencode('.jpg',np.vstack([np.hstack(contact[:2]),np.hstack(contact[2:])]))[1].tofile(str(ROOT/'design/qa/app-home-composited-contact.jpg'))
(ROOT/'design/qa/app-home-tracking.json').write_text(json.dumps({'frames':len(frames),'fps':fps,'minimum_inliers':min(inliers),'first_quad':quads[0].tolist(),'last_quad':quads[-1].tolist(),'texture':'inicio.jpg','source':str(source),'result':str(out)},indent=2),encoding='utf-8')
print('Visor recomposto:',out)
