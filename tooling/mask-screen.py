from pathlib import Path
p=Path('tooling/composite-product.py');s=p.read_text(encoding='utf-8')
s=s.replace("overlay=cv2.warpPerspective(tex,M,(w,h),flags=cv2.INTER_CUBIC)","overlay=cv2.warpPerspective(tex,M,(w,h),flags=cv2.INTER_CUBIC,borderMode=cv2.BORDER_REPLICATE)")
s=s.replace("a=cv2.warpPerspective(alpha,M,(w,h)).astype(np.float32)/255", "gray=cv2.cvtColor(fr,cv2.COLOR_BGR2GRAY)\n _,screen=cv2.threshold(gray,205,255,cv2.THRESH_BINARY)\n contours,_=cv2.findContours(screen,cv2.RETR_EXTERNAL,cv2.CHAIN_APPROX_SIMPLE)\n contour=max(contours,key=cv2.contourArea)\n screen[:]=0; cv2.drawContours(screen,[contour],-1,255,-1)\n a=screen.astype(np.float32)/255")
p.write_text(s,encoding='utf-8')
