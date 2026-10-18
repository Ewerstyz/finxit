from pathlib import Path
p=Path('tooling/composite-product.py')
s=p.read_text(encoding='utf-8-sig')
s=s.replace("mask=np.zeros((h,w),np.uint8); cv2.fillConvexPoly(mask,np.int32(corners),255)","mask=np.zeros((h,w),np.uint8); cv2.polylines(mask,[np.int32(corners)],True,255,28)")
s=s.replace("corners=np.float32([[526,101],[752,101],[752,609],[526,609]])","corners=np.float32([[525,101],[755,101],[755,611],[525,611]])")
p.write_text(s,encoding='utf-8')
