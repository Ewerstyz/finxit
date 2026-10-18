from pathlib import Path
import sys, subprocess, json
sys.path.insert(0,str(Path('.runtime/python').resolve()))
import cv2, numpy as np, imageio_ffmpeg
src='referência/videos/flow-03-product-original.mp4'
cap=cv2.VideoCapture(src); fps=cap.get(cv2.CAP_PROP_FPS); frames=[]
while True:
 ok,fr=cap.read()
 if not ok: break
 frames.append(fr)
cap.release(); h,w=frames[0].shape[:2]
# Track the generated phone's planar screen backwards through the camera move.
corners=np.float32([[525,101],[755,101],[755,611],[525,611]])
quads=[None]*len(frames); quads[-1]=corners.copy(); metrics=[]
for i in range(len(frames)-1,0,-1):
 a=cv2.cvtColor(frames[i],cv2.COLOR_BGR2GRAY); b=cv2.cvtColor(frames[i-1],cv2.COLOR_BGR2GRAY)
 mask=np.zeros((h,w),np.uint8); cv2.polylines(mask,[np.int32(corners)],True,255,28)
 pts=cv2.goodFeaturesToTrack(a,350,.008,7,mask=mask)
 nxt,status,err=cv2.calcOpticalFlowPyrLK(a,b,pts,None,winSize=(31,31),maxLevel=4)
 good=(status.ravel()==1)&(err.ravel()<35)
 H,inliers=cv2.findHomography(pts[good],nxt[good],cv2.RANSAC,2.5)
 if H is None: raise RuntimeError('Tracking failed at '+str(i))
 corners=cv2.perspectiveTransform(corners.reshape(1,4,2),H)[0]; quads[i-1]=corners.copy()
 metrics.append(int(inliers.sum()))
tex=cv2.imdecode(np.fromfile('public/assets/app-financeiro.jpeg',dtype=np.uint8),cv2.IMREAD_COLOR)
th,tw=tex.shape[:2]; alpha=np.zeros((th,tw),np.uint8)
r=48
cv2.rectangle(alpha,(r,0),(tw-r,th),255,-1);cv2.rectangle(alpha,(0,r),(tw,th-r),255,-1)
for x,y in [(r,r),(tw-r,r),(r,th-r),(tw-r,th-r)]:cv2.circle(alpha,(x,y),r,255,-1)
# Keep the physical notch in the original generated handset.
cv2.rectangle(alpha,(int(tw*.34),0),(int(tw*.66),28),0,-1)
source=np.float32([[0,0],[tw-1,0],[tw-1,th-1],[0,th-1]])
f=imageio_ffmpeg.get_ffmpeg_exe()
proc=subprocess.Popen([f,'-y','-f','rawvideo','-pix_fmt','bgr24','-s',f'{w}x{h}','-r',str(fps),'-i','-','-an','-c:v','libx264','-preset','medium','-crf','20','-g','6','-keyint_min','6','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart','public/media/finxi-product.mp4'],stdin=subprocess.PIPE,stderr=subprocess.DEVNULL)
for i,(fr,q) in enumerate(zip(frames,quads)):
 q=q+np.float32([[52,105],[58,139],[58,139],[52,105]])*max(0,1-i/100)
 M=cv2.getPerspectiveTransform(source,q.astype(np.float32))
 overlay=cv2.warpPerspective(tex,M,(w,h),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_REPLICATE)
 gray=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY)
 _,screen=cv2.threshold(gray,205,255,cv2.THRESH_BINARY)
 contours,_=cv2.findContours(screen,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)
 contour=max(contours,key=cv2.contourArea)
 screen[:]=0; hull=cv2.convexHull(contour); cv2.drawContours(screen,[hull],-1,255,-1)
 screen=cv2.dilate(screen,np.ones((9,9),np.uint8))
 _,labels,stats,_=cv2.connectedComponentsWithStats(np.uint8(gray<70),8)
 body_label=1+int(np.argmax(stats[1:,cv2.CC_STAT_AREA]))
 screen[labels==body_label]=0
 a=screen.astype(np.float32)/255
 a=cv2.GaussianBlur(a,(3,3),.45)[...,None]
 result=np.uint8(np.clip(overlay*a+fr*(1-a),0,255))
 proc.stdin.write(result.tobytes())
 if i in (0,len(frames)//2,len(frames)-1):
  name={0:'finxi-product',len(frames)//2:'finxi-product-mid',len(frames)-1:'finxi-product-end'}[i]
  cv2.imencode('.jpg',result,[cv2.IMWRITE_JPEG_QUALITY,95])[1].tofile('public/media/'+name+'.jpg')
proc.stdin.close(); assert proc.wait()==0
Path('design/qa/product-tracking.json').write_text(json.dumps({'frames':len(frames),'fps':fps,'minimum_inliers':min(metrics),'first_quad':quads[0].tolist(),'last_quad':quads[-1].tolist(),'source':'Flow product film + planar replacement with original supplied interface'},indent=2))
print('Tracked and composited',len(frames),'frames; minimum inliers',min(metrics))
