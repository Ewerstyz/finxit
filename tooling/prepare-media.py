from pathlib import Path
import sys, subprocess
sys.path.insert(0, str(Path('.runtime/python').resolve()))
import imageio_ffmpeg
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
for source, name in [('flow-01-original.mp4','finxi-scroll'), ('flow-02-original.mp4','finxi-hero')]:
    src = Path('referência/videos')/source
    dst = Path('public/media')/f'{name}.mp4'
    subprocess.run([ffmpeg,'-y','-i',str(src),'-an','-c:v','libx264','-preset','medium','-crf','22','-g','12','-keyint_min','12','-sc_threshold','0','-pix_fmt','yuv420p','-movflags','+faststart',str(dst)],check=True,capture_output=True)
    subprocess.run([ffmpeg,'-y','-i',str(dst),'-frames:v','1','-q:v','2',str(dst.with_suffix('.jpg'))],check=True,capture_output=True)
    print(name, dst.stat().st_size)
