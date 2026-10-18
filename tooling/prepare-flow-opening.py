"""Integrate LOCAL official Flow exports; never fetch remote media."""
from pathlib import Path
import argparse
import json
import shutil
import subprocess
import sys
import tempfile
ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.runtime/python'))
import imageio_ffmpeg
import cv2
from PIL import Image

def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode:
        raise RuntimeError(r.stderr[-4000:])

def duration(file):
    capture = cv2.VideoCapture(str(file))
    fps = capture.get(cv2.CAP_PROP_FPS)
    frames = capture.get(cv2.CAP_PROP_FRAME_COUNT)
    capture.release()
    if not fps or not frames:
        raise RuntimeError('Invalid local video: ' + str(file))
    return frames / fps

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--brand', type=Path, help='LOCAL brand-to-product Flow export, 10s')
    parser.add_argument('--scene', type=Path, help='LOCAL COMPLETE people + Brazil scene, 16s')
    parser.add_argument('--master', type=Path, help='LOCAL full Flow scene: brand, product, people and Brazil, about 25s')
    parser.add_argument('--poster-only', action='store_true')
    parser.add_argument('--scene-only', action='store_true', help='Integrate the available 16s scene while brand export is pending')
    args = parser.parse_args()
    if args.poster_only:
        Image.open(ROOT / 'referência/imagens/brand-opening/people-technology-original.png').save(ROOT / 'public/assets/finxi-people-technology.webp', quality=90)
        print('Static people poster prepared; no Flow film installed.')
        return
    if args.master:
        if args.brand or args.scene or args.scene_only:
            parser.error('--master cannot be combined with partial exports.')
        if not args.master.is_file() or duration(args.master) < 22:
            parser.error('A LOCAL complete Flow scene of at least 22 seconds is required.')
        ff = imageio_ffmpeg.get_ffmpeg_exe()
        output = ROOT / 'public/media'
        archive = ROOT / 'referência/videos/brand-opening'
        archive.mkdir(parents=True, exist_ok=True)
        name = 'finxi-brand-journey'
        # Stage and validate all artifacts before switching the active manifest.
        with tempfile.TemporaryDirectory(prefix='flow-master-', dir=ROOT / 'tooling') as temporary:
            stage = Path(temporary)
            movie = stage / (name + '.mp4')
            run([ff, '-y', '-i', str(args.master), '-map', '0:v:0', '-vf', 'scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=24,setsar=1', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-g', '6', '-keyint_min', '6', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(movie)])
            seconds = duration(movie)
            posters = []
            for second, suffix in [(0.15, ''), (8.5, '-app'), (16, '-people'), (seconds - .2, '-end')]:
                poster = name + suffix + '.jpg'
                run([ff, '-y', '-ss', str(second), '-i', str(movie), '-frames:v', '1', '-q:v', '2', str(stage / poster)])
                with Image.open(stage / poster) as image:
                    image.verify()
                posters.append('/media/' + poster)
            contact = stage / 'flow-opening-contact.jpg'
            run([ff, '-y', '-i', str(movie), '-vf', 'fps=1,scale=480:-1,tile=4x7', '-frames:v', '1', '-q:v', '2', str(contact)])
            original = archive / 'flow-complete-scene-original.mp4'
            if args.master.resolve() != original.resolve():
                shutil.copy2(args.master, original)
            for artifact in stage.iterdir():
                if artifact != contact:
                    shutil.copy2(artifact, output / artifact.name)
            shutil.copy2(contact, ROOT / 'design/qa/flow-opening-contact.jpg')
            manifest = {'file': name, 'duration': seconds, 'status': 'integrated-local-full-flow-scene', 'posters': posters}
            (ROOT / 'src/cinematic/opening-media.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
        print('Integrated complete LOCAL Flow scene:', output / (name + '.mp4'))
        print('Review design/qa/flow-opening-contact.jpg, then rebuild and verify scroll seeking.')
        return
    if args.scene_only:
        if not args.scene or not args.scene.is_file():
            parser.error('A LOCAL complete 16s scene is required.')
        archive = ROOT / 'referência/videos/brand-opening'
        archive.mkdir(parents=True, exist_ok=True)
        shutil.copy2(args.scene, archive / 'flow-people-brazil-scene-original.mp4')
        ff = imageio_ffmpeg.get_ffmpeg_exe()
        output = ROOT / 'public/media'
        name = 'finxi-people-brazil'
        run([ff, '-y', '-i', str(args.scene), '-map', '0:v:0', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-g', '6', '-keyint_min', '6', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(output / (name + '.mp4'))])
        seconds = duration(output / (name + '.mp4'))
        if seconds < 12:
            raise RuntimeError('Incomplete scene export; expected both people and Brazil.')
        posters = [None]
        for second, suffix in [(0, ''), (7.8, '-people'), (seconds - .2, '-end')]:
            poster = name + suffix + '.jpg'
            run([ff, '-y', '-ss', str(second), '-i', str(output / (name + '.mp4')), '-frames:v', '1', '-q:v', '2', str(output / poster)])
            posters.append('/media/' + poster)
        run([ff, '-y', '-i', str(output / (name + '.mp4')), '-vf', 'fps=1,scale=480:-1,tile=4x4', '-frames:v', '1', '-q:v', '2', str(ROOT / 'design/qa/flow-people-brazil-contact.jpg')])
        manifest = {'file':name, 'duration':seconds, 'progressStart':10/(10+seconds), 'status':'people-brazil-integrated-brand-export-pending', 'posters':posters}
        (ROOT / 'src/cinematic/opening-media.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
        print('Integrated people + Brazil locally; brand video remains pending.')
        return
    if not args.brand or not args.scene or not args.brand.is_file() or not args.scene.is_file():
        parser.error('Both LOCAL Flow exports required. No remote download is performed.')
    archive = ROOT / 'referência/videos/brand-opening'
    archive.mkdir(parents=True, exist_ok=True)
    for source, name in [(args.brand, 'flow-brand-product-original.mp4'), (args.scene, 'flow-people-brazil-scene-original.mp4')]:
        dest = archive / name
        if source.resolve() != dest.resolve():
            shutil.copy2(source, dest)
    output = ROOT / 'public/media'
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    name = 'finxi-brand-journey'
    destination = output / (name + '.mp4')
    filters = '[0:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=24,setsar=1,setpts=PTS-STARTPTS[b];[1:v]scale=1280:720:force_original_aspect_ratio=decrease,pad=1280:720:(ow-iw)/2:(oh-ih)/2,fps=24,setsar=1,setpts=PTS-STARTPTS[s];[b][s]concat=n=2:v=1:a=0[out]'
    run([ff, '-y', '-i', str(args.brand), '-i', str(args.scene), '-filter_complex', filters, '-map', '[out]', '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-g', '6', '-keyint_min', '6', '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(destination)])
    seconds = duration(destination)
    posters = []
    for second, suffix in [(0.15, ''), (8.5, '-app'), (16, '-people'), (seconds - .2, '-end')]:
        poster = name + suffix + '.jpg'
        run([ff, '-y', '-ss', str(second), '-i', str(destination), '-frames:v', '1', '-q:v', '2', str(output / poster)])
        if not (output / poster).is_file():
            raise RuntimeError('Invalid scene length: missing poster ' + poster)
        posters.append('/media/' + poster)
    run([ff, '-y', '-i', str(destination), '-vf', 'fps=1,scale=480:-1,tile=4x7', '-frames:v', '1', '-q:v', '2', str(ROOT / 'design/qa/flow-opening-contact.jpg')])
    manifest = {'file':name, 'duration':seconds, 'status':'integrated-local-flow-export', 'posters':posters}
    (ROOT / 'src/cinematic/opening-media.json').write_text(json.dumps(manifest, indent=2), encoding='utf-8')
    print('Integrated local Flow exports:', destination)
    print('Review design/qa/flow-opening-contact.jpg, then rebuild and verify scroll seeking.')

if __name__ == '__main__':
    main()
