"""Prepare the three official Flow downloads for reversible scroll seeking."""
from pathlib import Path
import sys, json, hashlib, subprocess
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.runtime/python'))
import cv2
import numpy as np
import imageio_ffmpeg
from PIL import Image, ImageDraw

names = ['organize', 'entenda', 'converse']
screens = {'organize':'app-inicio.jpg', 'entenda':'app-relatorios.jpg', 'converse':'app-assistente.jpg'}
ffmpeg = imageio_ffmpeg.get_ffmpeg_exe()
report = []
install = '--install' in sys.argv

def exact_screen(frame, screenshot):
    # The generated device is frontal. Replace only its screen with the supplied
    # real capture so AI-generated text cannot masquerade as the app interface.
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
    bounds = []
    for threshold in [95,125,155]:
        mask = (gray < threshold).astype('uint8') * 255
        mask[:,:int(frame.shape[1]*.34)] = 0
        mask[:,int(frame.shape[1]*.66):] = 0
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, cv2.getStructuringElement(cv2.MORPH_RECT,(5,5)))
        contours,_ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        bounds = [cv2.boundingRect(c) for c in contours]
        bounds = [b for b in bounds if b[3] > frame.shape[0]*.55 and 1.8 < b[3]/b[2] < 3.2]
        if not bounds:
            # Thin horizontal background paths can touch the device silhouette.
            # Its tall vertical bezel remains distinguishable from those paths.
            columns = np.where(np.sum(mask > 0, axis=0) > frame.shape[0]*.4)[0]
            if len(columns) >= 2:
                x1,x2 = int(columns.min()),int(columns.max())
                edges = np.concatenate([mask[:,x1:x1+4],mask[:,x2-3:x2+1]],axis=1)
                rows = np.where(np.sum(edges > 0, axis=1) >= 2)[0]
                if len(rows):
                    candidate = (x1,int(rows.min()),x2-x1+1,int(rows.max()-rows.min()+1))
                    if candidate[3] > frame.shape[0]*.55 and 1.8 < candidate[3]/candidate[2] < 3.2:
                        bounds = [candidate]
        if bounds: break
    if not bounds: raise RuntimeError('Cannot safely identify the existing frontal device')
    x,y,w,h = max(bounds, key=lambda b:b[2]*b[3])
    left,right = x+round(w*.045),x+w-round(w*.045)
    top,bottom = y+round(h*.025),y+h-round(h*.025)
    target_w,target_h = right-left,bottom-top
    # The provided captures exclude the Android status bar. Leave a small
    # neutral safe area for the generated physical camera, preserving all UI.
    safe_top = round(target_h*.04)
    image = np.empty((target_h,target_w,3), dtype='uint8')
    image[:] = screenshot[0,0]
    image[safe_top:] = cv2.resize(screenshot, (target_w,target_h-safe_top), interpolation=cv2.INTER_LANCZOS4)
    alpha = cv2.rectangle(np.zeros((target_h,target_w),dtype='uint8'),(0,0),(target_w-1,target_h-1),255,-1)
    radius = round(target_w*.065)
    alpha[:radius,:radius] = 0
    alpha[:radius,-radius:] = 0
    alpha[-radius:,:radius] = 0
    alpha[-radius:,-radius:] = 0
    for cx,cy in [(radius,radius),(target_w-radius-1,radius),(radius,target_h-radius-1),(target_w-radius-1,target_h-radius-1)]:
        cv2.circle(alpha,(cx,cy),radius,255,-1)
    alpha = cv2.GaussianBlur(alpha,(3,3),.5).astype('float32')[:,:,None]/255
    original = frame[top:bottom,left:right].copy()
    # Keep the physical camera cutout, if present, in a narrow top-center area.
    camera = np.zeros((target_h,target_w), dtype=bool)
    camera[:round(target_h*.04),round(target_w*.36):round(target_w*.64)] = True
    camera &= cv2.cvtColor(original,cv2.COLOR_BGR2GRAY)<45
    alpha[camera] = 0
    frame[top:bottom,left:right] = (image*alpha+original*(1-alpha)).astype('uint8')
    return frame
for name in names:
    if '--only-converse' in sys.argv and name != 'converse': continue
    source = ROOT / 'referência/videos/plano-2026-10-18' / (name + '-flow-original.mp4')
    cap = cv2.VideoCapture(str(source))
    count, fps = int(cap.get(cv2.CAP_PROP_FRAME_COUNT)), cap.get(cv2.CAP_PROP_FPS)
    width, height = int(cap.get(3)), int(cap.get(4))
    if not count or fps <= 0: raise RuntimeError('Invalid downloaded video: ' + name)
    duration = count / fps
    contact = Image.new('RGB', (1280, 750), '#071a32')
    for index, time in enumerate([.1, 1.5, 3, 4.5, 6, duration-.2]):
        cap.set(cv2.CAP_PROP_POS_MSEC, time*1000)
        ok, frame = cap.read()
        if not ok: raise RuntimeError('Cannot read ' + name)
        tile = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)).resize((640,360))
        x,y = (index%2)*640, (index//2)*250
        tile.thumbnail((640,230))
        contact.paste(tile, (x+(640-tile.width)//2,y))
        ImageDraw.Draw(contact).text((x+12,y+232), f'{name} — {time:.2f}s', fill='white')
    cap.release()
    contact.save(ROOT / 'design/qa' / (f'plan-film-{name}-contact.jpg'), quality=92)
    item = {'source':str(source.relative_to(ROOT)), 'sha256':hashlib.sha256(source.read_bytes()).hexdigest(), 'duration':duration, 'frames':count, 'fps':fps, 'width':width, 'height':height}
    if install:
        output = ROOT / 'public/media' / ('finxi-plan-'+name+'.mp4')
        encoder = subprocess.Popen([ffmpeg, '-y', '-f', 'rawvideo', '-pixel_format', 'bgr24', '-video_size',f'{width}x{height}', '-framerate',str(fps), '-i','pipe:0', '-an', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-g', '6', '-keyint_min', '6', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(output)], stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        capture = cv2.VideoCapture(str(source))
        screenshot = cv2.imread(str(ROOT / 'public/assets' / screens[name]))
        for number in range(count):
            ok, frame = capture.read()
            if not ok: raise RuntimeError('Cannot decode source')
            try:
                encoder.stdin.write(exact_screen(frame, screenshot).tobytes())
            except Exception as error:
                cv2.imwrite(str(ROOT / 'design/qa' / f'plan-screen-detection-{name}-{number}.jpg'),frame)
                encoder.stdin.close()
                encoder.wait()
                raise RuntimeError(f'{name} frame {number}: {error}') from error
        capture.release()
        encoder.stdin.close()
        if encoder.wait() != 0: raise RuntimeError('Encoder failed')
        verify = cv2.VideoCapture(str(output))
        if int(verify.get(cv2.CAP_PROP_FRAME_COUNT)) != count or abs(verify.get(cv2.CAP_PROP_FPS)-fps) > .01:
            raise RuntimeError('Output timing changed')
        verify.release()
        poster = output.with_name(output.stem+'-end.jpg')
        subprocess.run([ffmpeg, '-y', '-ss', str(duration-.2), '-i', str(output), '-frames:v', '1', '-q:v', '2', str(poster)], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.PIPE)
        subprocess.run([ffmpeg,'-y','-i',str(output),'-vf','fps=1,scale=480:-1,tile=2x4','-frames:v','1','-q:v','2',str(ROOT / 'design/qa' / (f'plan-film-{name}-exact-screen.jpg'))],check=True,stdout=subprocess.DEVNULL,stderr=subprocess.PIPE)
        item.update(output=str(output.relative_to(ROOT)), bytes=output.stat().st_size, audio='Silent web copy; original retained', processing='H264 frequent keyframes; real supplied screenshot tracked over the existing frontal phone screen to prevent invented UI text')
    report.append(item)
(ROOT / 'design/qa/plan-films.json').write_text(json.dumps(report, indent=2), encoding='utf-8')
print(json.dumps(report, indent=2))
