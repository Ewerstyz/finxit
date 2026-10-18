from pathlib import Path
import sys
ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT/'.runtime/python'))
import cv2,numpy as np
for original,name in [('flow-09-reports-original.mp4','reports'),('flow-10-assistant-original.mp4','assistant')]:
    cap=cv2.VideoCapture(str(ROOT/'referência/videos/revisao-2026-10-02'/original))
    n=int(cap.get(cv2.CAP_PROP_FRAME_COUNT));fps=cap.get(cv2.CAP_PROP_FPS)
    shots=[]
    for i in [0,n//4,n//2,n-1]:
        cap.set(cv2.CAP_PROP_POS_FRAMES,i);ok,fr=cap.read()
        if not ok: raise RuntimeError(original)
        shots.append(cv2.resize(fr,(640,360)))
        cv2.imencode('.jpg',fr)[1].tofile(str(ROOT/f'design/qa/new-{name}-{i}.jpg'))
    cap.release()
    cv2.imencode('.jpg',np.vstack([np.hstack(shots[:2]),np.hstack(shots[2:])]))[1].tofile(str(ROOT/f'design/qa/new-{name}-contact.jpg'))
    print(name,n,fps,fr.shape)
