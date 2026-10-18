"""Author a NEW logo/screen motion film from original LOCAL assets.

No remote media, blocked clip, or browser frames are used. The people/Brazil
continuation is the already available local Flow export.
"""
from pathlib import Path
import argparse
import hashlib
import json
import shutil
import subprocess
import sys
import tempfile

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.runtime/python'))
import cv2
import imageio_ffmpeg
import numpy as np
from PIL import Image, ImageDraw

WIDTH, HEIGHT, FPS = 1280, 720, 24

def ease(value):
    p = min(1, max(0, value))
    return p * p * (3 - 2 * p)

def run(command):
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr[-4000:])

def half_turn_assets():
    # Chroma-key only the white backdrop of the ORIGINAL blue brand image.
    brand = np.array(Image.open(ROOT / 'public/assets/finxi_brand_light.jpg').convert('RGB'))
    blue = brand[:,:,2].astype('int16')
    red = brand[:,:,0].astype('int16')
    green = brand[:,:,1].astype('int16')
    alpha = np.where((blue-red > 15) & (blue-green > 10), 255, 0).astype('uint8')
    ys, xs = np.where(alpha > 0)
    box = (slice(ys.min(), ys.max()+1), slice(xs.min(), xs.max()+1))
    logo = Image.fromarray(np.dstack([brand, alpha])[box]).resize((round((xs.max()-xs.min()+1)*608/(ys.max()-ys.min()+1)),608), Image.Resampling.LANCZOS)
    screenshot = Image.open(ROOT / 'public/assets/finxi-inicio-original.jpeg').convert('RGBA')
    screen_width = round(590 * screenshot.width / screenshot.height)
    screenshot = screenshot.resize((screen_width,590), Image.Resampling.LANCZOS)
    # Plain generic phone frame. No hardware logo, back, camera module or text.
    phone = Image.new('RGBA',(screen_width+18,608),(0,0,0,0))
    drawing = ImageDraw.Draw(phone)
    drawing.rounded_rectangle((0,0,phone.width-1,607),radius=24,fill=(9,14,24,255),outline=(75,104,135,255),width=2)
    phone.alpha_composite(screenshot,(9,9))
    clip = Image.new('L',phone.size,0)
    ImageDraw.Draw(clip).rounded_rectangle((0,0,phone.width-1,607),radius=24,fill=255)
    phone.putalpha(clip)
    return logo,phone

def half_turn_frame(background, logo, phone, t):
    angle = 180 * ease((t-1.5)/4)
    canvas = background.copy()
    if abs(angle-90) < 1e-8:
        ImageDraw.Draw(canvas).line((round(WIDTH*.74),56,round(WIDTH*.74),663),fill=(63,133,238,255),width=2)
        return canvas,angle,'swap'
    asset = logo if angle < 90 else phone
    # Phone front occupies the opposite face after substitution: it becomes
    # frontal at 180 without mirroring the supplied app or showing any back.
    local_angle = angle if angle < 90 else angle-180
    radians = np.deg2rad(local_angle)
    w,h=asset.size
    points=np.array([[-w/2,-h/2],[w/2,-h/2],[w/2,h/2],[-w/2,h/2]],dtype='float32')
    lens=6000
    z=-points[:,0]*np.sin(radians)
    factor=lens/(lens+z)
    destination=np.column_stack((WIDTH*.74+points[:,0]*np.cos(radians)*factor,HEIGHT*.5+points[:,1]*factor)).astype('float32')
    source=np.array([[0,0],[w-1,0],[w-1,h-1],[0,h-1]],dtype='float32')
    matrix=cv2.getPerspectiveTransform(source,destination)
    image=cv2.warpPerspective(np.array(asset),matrix,(WIDTH,HEIGHT),flags=cv2.INTER_LINEAR,borderMode=cv2.BORDER_CONSTANT,borderValue=(0,0,0,0))
    canvas.alpha_composite(Image.fromarray(image))
    return canvas,angle,'logo' if angle < 90 else 'phone'

def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--half-turn',action='store_true',help='Exact 0/90/180 rotation and static phone ending from ORIGINAL local assets')
    args=parser.parse_args()
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    logo = Image.open(ROOT / 'public/assets/finxi_brand.webp').convert('RGBA')
    screen = Image.open(ROOT / 'public/assets/app-inicio.jpg').convert('RGBA')
    continuation = ROOT / 'public/media/finxi-people-brazil.mp4'
    if not continuation.is_file():
        raise RuntimeError('The existing LOCAL Flow continuation is required.')
    y, x = np.mgrid[0:HEIGHT, 0:WIDTH]
    glow = np.exp(-(((x-WIDTH*.74)/(WIDTH*.35))**2 + ((y-HEIGHT*.5)/(HEIGHT*.65))**2))
    dark, light = np.array([2,11,27]), np.array([9,31,63])
    background = Image.fromarray((dark + glow[...,None]*(light-dark)).astype('uint8')).convert('RGBA')
    archive = ROOT / 'referência/videos/brand-opening'
    archive.mkdir(parents=True, exist_ok=True)
    name = 'finxi-half-turn-journey' if args.half_turn else 'finxi-logo-screen-journey'
    turn_logo,turn_phone=half_turn_assets() if args.half_turn else (None,None)
    choreography=[]
    previous_angle=0
    final_pixels=None
    still_frames=0
    with tempfile.TemporaryDirectory(prefix='logo-screen-', dir=ROOT / 'tooling') as temporary:
        stage = Path(temporary)
        opening = stage / ('half-turn-original-motion.mp4' if args.half_turn else 'logo-screen-original-motion.mp4')
        encoder = subprocess.Popen([ff, '-y', '-f', 'rawvideo', '-pixel_format', 'rgb24', '-video_size', f'{WIDTH}x{HEIGHT}', '-framerate', str(FPS), '-i', 'pipe:0', '-an', '-c:v', 'libx264', '-crf', '17', '-preset', 'medium', '-g', '6', '-keyint_min', '6', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(opening)], stdin=subprocess.PIPE, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
        try:
            for frame in range(10 * FPS):
                t = frame / FPS
                if args.half_turn:
                    canvas,angle,object_name=half_turn_frame(background,turn_logo,turn_phone,t)
                    if not previous_angle <= angle <= 180:
                        raise RuntimeError('Rotation exceeded one monotonic half-turn.')
                    previous_angle=angle
                    pixels=canvas.convert('RGB').tobytes()
                    if t >= 5.5:
                        if final_pixels is not None and pixels != final_pixels:
                            raise RuntimeError('Phone moved after reaching 180 degrees.')
                        final_pixels=pixels
                        still_frames+=1
                    choreography.append({'frame':frame,'time':t,'angle':angle,'object':object_name})
                    encoder.stdin.write(pixels)
                    continue
                blend = ease((t-3)/2.3)
                canvas = background.copy()
                for asset, alpha, height in [(logo, 1-blend, 330*(1+.04*ease(t/6))), (screen, blend, 590*(1+.03*ease((t-3)/7)))]:
                    if alpha <= 0:
                        continue
                    size = (round(height*asset.width/asset.height), round(height))
                    layer = asset.resize(size, Image.Resampling.LANCZOS)
                    if asset is logo:
                        # Clip the original app-icon card; keep its white mark
                        # untouched and avoid placing its black outside corners
                        # on the navy film background.
                        clip = Image.new('L', size, 0)
                        ImageDraw.Draw(clip).rounded_rectangle((0, 0, size[0]-1, size[1]-1), radius=round(height*.19), fill=255)
                        layer.putalpha(clip)
                    if alpha < 1:
                        layer.putalpha(layer.getchannel('A').point(lambda a: round(a*alpha)))
                    position = (round(WIDTH*.74-size[0]/2), round(HEIGHT*.5-size[1]/2))
                    canvas.alpha_composite(layer, position)
                encoder.stdin.write(canvas.convert('RGB').tobytes())
        finally:
            encoder.stdin.close()
        if encoder.wait() != 0:
            raise RuntimeError('Logo/screen video encoding failed.')
        if args.half_turn:
            swap=choreography[84]
            if swap['angle'] != 90 or swap['object'] != 'swap' or still_frames != 108:
                raise RuntimeError('Invalid edge substitution or static ending.')
            (ROOT / 'design/qa/half-turn-choreography.json').write_text(json.dumps({'frames':choreography,'swapFrame':84,'swapTime':3.5,'finalAngle':180,'staticFrames':still_frames,'staticPixelsIdentical':True},indent=2),encoding='utf-8')
        movie = stage / (name + '.mp4')
        # Remove the old standalone product-phone opening. Blend directly into
        # the established people shot, preserving its existing Brazil extension.
        filters = '[0:v]setpts=PTS-STARTPTS,fps=24,format=yuv420p[a];[1:v]trim=start=3.5,setpts=PTS-STARTPTS,fps=24,format=yuv420p[b];[a][b]xfade=transition=fade:duration=1.2:offset=8.8,format=yuv420p[out]'
        run([ff, '-y', '-i', str(opening), '-i', str(continuation), '-filter_complex', filters, '-map', '[out]', '-an', '-c:v', 'libx264', '-crf', '18', '-preset', 'medium', '-g', '6', '-keyint_min', '6', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(movie)])
        capture = cv2.VideoCapture(str(movie))
        seconds = capture.get(cv2.CAP_PROP_FRAME_COUNT) / capture.get(cv2.CAP_PROP_FPS)
        capture.release()
        if not 20 <= seconds <= 21:
            raise RuntimeError(f'Unexpected composed duration: {seconds}')
        posters = []
        for second, suffix in [(.15,''), (7,'-app'), (12,'-people'), (seconds-.2,'-end')]:
            poster = name + suffix + '.jpg'
            run([ff, '-y', '-ss', str(second), '-i', str(movie), '-frames:v', '1', '-q:v', '2', str(stage / poster)])
            with Image.open(stage / poster) as image:
                image.verify()
            posters.append('/media/' + poster)
        contact = stage / ('half-turn-journey-contact.jpg' if args.half_turn else 'logo-screen-journey-contact.jpg')
        run([ff, '-y', '-i', str(movie), '-vf', 'fps=1,scale=384:-1,tile=4x6', '-frames:v', '1', '-q:v', '2', str(contact)])
        shutil.copy2(opening, archive / opening.name)
        for artifact in stage.iterdir():
            if artifact not in [opening, contact]:
                shutil.copy2(artifact, ROOT / 'public/media' / artifact.name)
        shutil.copy2(contact, ROOT / 'design/qa' / contact.name)
        if args.half_turn:
            run([ff,'-y','-i',str(opening),'-vf','fps=4,scale=320:-1,tile=8x5','-frames:v','1','-q:v','2',str(ROOT / 'design/qa/half-turn-opening-contact.jpg')])
        manifest = {'file':name, 'duration':seconds, 'status':'integrated-exact-half-turn-and-local-flow' if args.half_turn else 'integrated-original-assets-motion-and-local-flow', 'posters':posters, 'sources':{'opening':'Original supplied blue logo and app screenshot; controlled 0-90-180 rotation, substitution at frame 84, static after 5.5s' if args.half_turn else 'Original supplied logo and app screenshot, locally composed with alpha blend', 'continuation':'Existing local Flow people/Brazil film, trimmed from 3.5s', 'flowCorrection':'Flow generations did not preserve the requested motion/identity; new opening authored locally' if args.half_turn else 'New generation failed with unusual activity; no new Flow export used'}}
        if args.half_turn:
            manifest['references'] = [
                {'file': file, 'sha256': hashlib.sha256((ROOT / file).read_bytes()).hexdigest()}
                for file in ['public/assets/finxi_brand_light.jpg', 'public/assets/finxi-inicio-original.jpeg']
            ]
        (ROOT / 'src/cinematic/opening-media.json').write_text(json.dumps(manifest, indent=2, ensure_ascii=False), encoding='utf-8')
        print(f'Installed new original-assets + local Flow movie: {seconds:.3f}s')
        print(ROOT / 'public/media' / movie.name)

if __name__ == '__main__':
    main()
