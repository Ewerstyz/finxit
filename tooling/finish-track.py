from pathlib import Path
p=Path('tooling/composite-product.py');s=p.read_text()
s=s.replace("M=cv2.getPerspectiveTransform(source,q.astype(np.float32))","q=q+np.float32([[52,105],[58,139],[58,139],[52,105]])*max(0,1-i/100)\n M=cv2.getPerspectiveTransform(source,q.astype(np.float32))")
s=s.replace("screen[:]=0; cv2.drawContours(screen,[contour],-1,255,-1)","screen[:]=0; hull=cv2.convexHull(contour); cv2.drawContours(screen,[hull],-1,255,-1)\n top=int(hull[:,:,1].min()); bottom=int(hull[:,:,1].max()); cutoff=top+int((bottom-top)*.09)\n screen[:cutoff][gray[:cutoff]<70]=0")
p.write_text(s)
