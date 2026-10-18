"""Inspect the user-supplied LOCAL film; no browser/network media access."""
from pathlib import Path
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.runtime/python'))
import cv2
import numpy as np
import imageio_ffmpeg
from PIL import Image, ImageDraw

source = ROOT / 'referência/videos/filme-completo-2026-10-03/finxi-flow-original.mp4'
capture = cv2.VideoCapture(str(source))
fps = capture.get(cv2.CAP_PROP_FPS)
frames = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))
duration = frames / fps
width, height = int(capture.get(3)), int(capture.get(4))
times = [0, 1, 2, 3, 4, 4.8, 5.17, 5.29, 6, 7, 8, 9, 10.42, 10.54, 11, 12, 13, 14, 15, 16, 17, duration-.12]
sheet = Image.new('RGB', (1280, 6*204), '#071226')
draw = ImageDraw.Draw(sheet)
for index, time in enumerate(times):
    capture.set(cv2.CAP_PROP_POS_MSEC, time*1000)
    ok, frame = capture.read()
    if not ok: raise RuntimeError(f'Cannot decode at {time}')
    thumb = Image.fromarray(cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)).resize((320,180))
    x,y = index%4*320, index//4*204
    sheet.paste(thumb,(x,y))
    draw.text((x+8,y+183),f'{time:.3f}s',fill='white')
capture.release()
sheet.save(ROOT / 'design/qa/user-full-film-original-contact.jpg', quality=94)
capture = cv2.VideoCapture(str(source))
joins = Image.new('RGB',(1280,3*204),'#071226')
join_draw = ImageDraw.Draw(joins)
for index, number in enumerate(range(247,259)):
    capture.set(cv2.CAP_PROP_POS_FRAMES,number)
    ok, frame = capture.read()
    if not ok: raise RuntimeError(f'Cannot decode frame {number}')
    x,y=index%4*320,index//4*204
    thumb=Image.fromarray(cv2.cvtColor(frame,cv2.COLOR_BGR2RGB)).resize((320,180))
    joins.paste(thumb,(x,y))
    join_draw.text((x+8,y+183),f'frame {number} / {number/24:.3f}s',fill='white')
joins.save(ROOT / 'design/qa/user-full-film-seams.jpg',quality=94)
capture.release()
capture = cv2.VideoCapture(str(source))
previous = None
diffs = []
while True:
    ok, frame = capture.read()
    if not ok: break
    small = cv2.resize(frame,(160,90)).astype('float32')
    if previous is not None:
        diffs.append({'time':(int(capture.get(cv2.CAP_PROP_POS_FRAMES))-1)/fps,'difference':float(np.mean(np.abs(small-previous)))})
    previous = small
capture.release()
info = {'duration':duration,'fps':fps,'frames':frames,'width':width,'height':height,'largestChanges':sorted(diffs,key=lambda x:x['difference'],reverse=True)[:18]}
probe = subprocess.run([imageio_ffmpeg.get_ffmpeg_exe(),'-hide_banner','-i',str(source)],capture_output=True,text=True)
info['streams'] = [line.strip() for line in probe.stderr.splitlines() if 'Stream #' in line]
(ROOT / 'design/qa/user-full-film-metadata.json').write_text(json.dumps(info,indent=2),encoding='utf-8')
print(json.dumps(info,indent=2))
