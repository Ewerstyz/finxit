from pathlib import Path
import sys,subprocess
sys.path.insert(0,str(Path('.runtime/python').resolve()))
import imageio_ffmpeg
f=imageio_ffmpeg.get_ffmpeg_exe()
src='referência/videos/flow-03-product-original.mp4'
subprocess.run([f,'-y','-i',src,'-an','-c:v','libx264','-preset','medium','-crf','20','-g','6','-keyint_min','6','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart','public/media/finxi-product.mp4'],check=True,capture_output=True)
for t,name in [(0,'finxi-product'),(4,'finxi-product-mid'),(7.9,'finxi-product-end')]:
 subprocess.run([f,'-y','-ss',str(t),'-i',src,'-frames:v','1','-q:v','2','public/media/'+name+'.jpg'],check=True,capture_output=True)
