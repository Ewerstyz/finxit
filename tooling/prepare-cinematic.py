from pathlib import Path
import sys, subprocess
sys.path.insert(0,str(Path('.runtime/python').resolve()))
import imageio_ffmpeg
ff=imageio_ffmpeg.get_ffmpeg_exe()
for original,name in [('flow-06-cinematic-original.mp4','finxi-cinematic'),('flow-07-strategy-original.mp4','finxi-strategy')]:
    src=Path('referência/videos')/original
    if not src.exists(): continue
    dest=Path('public/media')/(name+'.mp4')
    if dest.exists(): continue
    subprocess.run([ff,'-y','-i',str(src),'-an','-c:v','libx264','-crf','20','-preset','medium','-g','6','-keyint_min','6','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart',str(dest)],check=True,capture_output=True)
    for second,suffix in [(0,''),(4,'-mid'),(7.9,'-end')]:
        subprocess.run([ff,'-y','-ss',str(second),'-i',str(dest),'-frames:v','1','-q:v','2',f'public/media/{name}{suffix}.jpg'],check=True,capture_output=True)
    print(name,dest.stat().st_size)
