from pathlib import Path
import sys, subprocess, json
sys.path.insert(0,str(Path('.runtime/python').resolve()))
import imageio_ffmpeg
f=imageio_ffmpeg.get_ffmpeg_exe()
for original,name in [('flow-04-registros-original.mp4','finxi-registros'),('flow-05-planejamento-original.mp4','finxi-planejamento')]:
 src=str(Path('referência/videos')/original)
 dst='public/media/'+name+'.mp4'
 subprocess.run([f,'-y','-i',src,'-an','-c:v','libx264','-preset','medium','-crf','21','-g','6','-keyint_min','6','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart',dst],check=True,capture_output=True)
 for t,suffix in [(0,''),(4,'-mid'),(7.9,'-end')]:
  subprocess.run([f,'-y','-ss',str(t),'-i',dst,'-frames:v','1','-q:v','2','public/media/'+name+suffix+'.jpg'],check=True,capture_output=True)
 print(name,Path(dst).stat().st_size)
