"""Composite user app captures into the locally supplied Flow module films."""
from pathlib import Path
import json, subprocess, sys
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'.runtime/python'))
import cv2,numpy as np,imageio_ffmpeg

FILMS=[
    ('flow-09-reports-original.mp4','finxi-app-reports','relatorios.jpg',
     [[771,145],[1145,145],[1145,954],[771,954]]),
    ('flow-10-assistant-original.mp4','finxi-app-assistant','assistente-ia.jpg',
     [[786,218],[1134,218],[1134,917],[786,917]]),
]
ff=imageio_ffmpeg.get_ffmpeg_exe()
for original,name,reference,last in FILMS:
    cap=cv2.VideoCapture(str(ROOT/'referência/videos/revisao-2026-10-02'/original))
    fps=cap.get(cv2.CAP_PROP_FPS);frames=[]
    while True:
        ok,fr=cap.read()
        if not ok:break
        frames.append(fr)
    cap.release()
    if not frames:raise RuntimeError(original)
    h,w=frames[0].shape[:2];quad=np.float32(last);quads=[None]*len(frames);quads[-1]=quad.copy();support=[]
    for i in range(len(frames)-1,0,-1):
        a=cv2.cvtColor(frames[i],cv2.COLOR_BGR2GRAY);b=cv2.cvtColor(frames[i-1],cv2.COLOR_BGR2GRAY)
        mask=np.zeros((h,w),np.uint8)
        if name=='finxi-app-assistant': cv2.fillConvexPoly(mask,np.int32(quad),255)
        cv2.polylines(mask,[np.int32(quad)],True,255,32)
        pts=cv2.goodFeaturesToTrack(a,450,.004,6,mask=mask)
        nxt,status,err=cv2.calcOpticalFlowPyrLK(a,b,pts,None,winSize=(31,31),maxLevel=4)
        good=(status.ravel()==1)&(err.ravel()<30)
        if good.sum()<4:raise RuntimeError(f'{name}: poucos pontos no frame {i}')
        H,ins=cv2.findHomography(pts[good],nxt[good],cv2.RANSAC,2.5)
        if H is None:raise RuntimeError(f'{name}: rastreamento falhou no frame {i}')
        quad=cv2.perspectiveTransform(quad.reshape(1,4,2),H)[0];quads[i-1]=quad.copy();support.append(int(ins.sum()))
    tex=cv2.imdecode(np.fromfile(ROOT/'referência/telas-app-2026-10-02'/reference,np.uint8),cv2.IMREAD_COLOR)
    th,tw=tex.shape[:2];src=np.float32([[0,0],[tw-1,0],[tw-1,th-1],[0,th-1]])
    alpha=np.full((th,tw),255,np.uint8);r=45
    alpha[th-r:,:r]=0;alpha[th-r:,tw-r:]=0
    cv2.circle(alpha,(r,th-r),r,255,-1);cv2.circle(alpha,(tw-r-1,th-r),r,255,-1)
    out=ROOT/'public/media'/(name+'.mp4')
    proc=subprocess.Popen([ff,'-y','-f','rawvideo','-pix_fmt','bgr24','-s',f'{w}x{h}','-r',str(fps),'-i','-','-an','-c:v','libx264','-preset','medium','-crf','18','-g','6','-keyint_min','6','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart',str(out)],stdin=subprocess.PIPE,stderr=subprocess.DEVNULL)
    contact=[]
    for i,(fr,q) in enumerate(zip(frames,quads)):
        matrix=cv2.getPerspectiveTransform(src,q.astype(np.float32));overlay=cv2.warpPerspective(tex,matrix,(w,h),flags=cv2.INTER_CUBIC)
        a=cv2.warpPerspective(alpha,matrix,(w,h),flags=cv2.INTER_LINEAR).astype(np.float32)/255
        a=cv2.GaussianBlur(a,(3,3),.4)[...,None];result=np.clip(overlay*a+fr*(1-a),0,255).astype(np.uint8)
        proc.stdin.write(result.tobytes())
        if i in (0,len(frames)//2,len(frames)-1):
            suffix={0:'',len(frames)//2:'-mid',len(frames)-1:'-end'}[i]
            cv2.imencode('.jpg',result,[cv2.IMWRITE_JPEG_QUALITY,95])[1].tofile(str(ROOT/'public/media'/(name+suffix+'.jpg')))
        if i in (0,len(frames)//4,len(frames)//2,len(frames)-1):contact.append(cv2.resize(result,(640,360)))
    proc.stdin.close()
    if proc.wait():raise RuntimeError('Falha de codificação')
    cv2.imencode('.jpg',np.vstack([np.hstack(contact[:2]),np.hstack(contact[2:])]))[1].tofile(str(ROOT/'design/qa'/(name+'-contact.jpg')))
    (ROOT/'design/qa'/(name+'-tracking.json')).write_text(json.dumps({'frames':len(frames),'fps':fps,'minimum_inliers':min(support),'first_quad':quads[0].tolist(),'last_quad':quads[-1].tolist(),'reference':reference,'output':str(out)},indent=2),encoding='utf-8')
    print('Recomposto:',name,flush=True)
