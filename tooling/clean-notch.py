from pathlib import Path
p=Path('tooling/composite-product.py');s=p.read_text()
s=s.replace("top=int(hull[:,:,1].min()); bottom=int(hull[:,:,1].max()); cutoff=top+int((bottom-top)*.09)\n screen[:cutoff][gray[:cutoff]<70]=0", "_,labels,stats,_=cv2.connectedComponentsWithStats(np.uint8(gray<70),8)\n body_label=1+int(np.argmax(stats[1:,cv2.CC_STAT_AREA]))\n screen[labels==body_label]=0")
p.write_text(s)
