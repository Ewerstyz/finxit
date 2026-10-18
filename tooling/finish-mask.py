from pathlib import Path
p=Path('tooling/composite-product.py');s=p.read_text();s=s.replace("_,labels,stats,_=cv2.connectedComponentsWithStats", "screen=cv2.dilate(screen,np.ones((9,9),np.uint8))\n _,labels,stats,_=cv2.connectedComponentsWithStats");p.write_text(s)
