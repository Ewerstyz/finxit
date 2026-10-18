from pathlib import Path
import sys,json
sys.path.insert(0,str(Path('.runtime/python').resolve()))
import cv2,numpy as np
cap=cv2.VideoCapture('referência/videos/flow-03-product-original.mp4');frames=[]
while True:
 ok,f=cap.read()
 if not ok:break
 frames.append(f)
sift=cv2.SIFT_create(nfeatures=4000,contrastThreshold=.01)
last=frames[-1];mask=np.zeros(last.shape[:2],np.uint8);mask[100:611,525:754]=255
k,d=sift.detectAndCompute(cv2.cvtColor(last,cv2.COLOR_BGR2GRAY),mask)
matcher=cv2.BFMatcher();corners=np.float32([[526,101],[752,101],[752,609],[526,609]])
for i in [0,48,96,144]:
 kp,ds=sift.detectAndCompute(cv2.cvtColor(frames[i],cv2.COLOR_BGR2GRAY),None)
 matches=matcher.knnMatch(d,ds,k=2);good=[m for m,n in matches if m.distance<.72*n.distance]
 H,ins=cv2.findHomography(np.float32([k[m.queryIdx].pt for m in good]),np.float32([kp[m.trainIdx].pt for m in good]),cv2.RANSAC,3)
 q=cv2.perspectiveTransform(corners.reshape(1,4,2),H)[0]
 f=frames[i].copy();cv2.polylines(f,[np.int32(q)],True,(0,0,255),3);cv2.imwrite('design/qa/track-'+str(i)+'.jpg',f)
 print(i,len(good),int(ins.sum()),q.tolist())
