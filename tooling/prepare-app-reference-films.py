"""Prepare the four new Flow exports; inspect their screens before site integration."""
from pathlib import Path
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT / '.runtime/python'))
import imageio_ffmpeg

SOURCE = ROOT / 'referência/videos/revisao-2026-10-02'
OUTPUT = ROOT / 'public/media'
QA = ROOT / 'design/qa/app-reference-films'
FILMS = [
    ('flow-08-home-original.mp4', 'finxi-app-home', 'inicio.jpg'),
    ('flow-09-reports-original.mp4', 'finxi-app-reports', 'relatorios.jpg'),
    ('flow-10-assistant-original.mp4', 'finxi-app-assistant', 'assistente-ia.jpg'),
    ('flow-11-connected-original.mp4', 'finxi-app-connected', 'inicio.jpg + assistente-ia.jpg'),
]

def main():
    missing = [name for name, _, _ in FILMS if not (SOURCE / name).is_file()]
    if missing:
        print('Aguardando os quatro arquivos exportados pelo usuário:')
        print('\n'.join(missing))
        return 2
    OUTPUT.mkdir(parents=True, exist_ok=True)
    QA.mkdir(parents=True, exist_ok=True)
    ff = imageio_ffmpeg.get_ffmpeg_exe()
    manifest = []
    for original, name, reference in FILMS:
        src = SOURCE / original
        dest = OUTPUT / (name + '.mp4')
        run([ff, '-y', '-i', str(src), '-map', '0:v:0', '-an', '-c:v', 'libx264',
             '-preset', 'medium', '-crf', '18', '-g', '6', '-keyint_min', '6',
             '-sc_threshold', '0', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', str(dest)])
        for second, suffix in [(0, ''), (4, '-mid'), (7.9, '-end')]:
            run([ff, '-y', '-ss', str(second), '-i', str(dest), '-frames:v', '1',
                 '-q:v', '2', str(OUTPUT / (name + suffix + '.jpg'))])
        run([ff, '-y', '-i', str(dest), '-vf',
             'fps=1,scale=640:-1,tile=2x4', '-frames:v', '1', '-q:v', '2',
             str(QA / (name + '-contact.jpg'))])
        manifest.append({'original': original, 'production': name + '.mp4',
                         'reference': reference, 'bytes': dest.stat().st_size,
                         'screen_review': 'pending', 'integrated': False})
        print('Preparado:', name)
    (QA / 'manifest.json').write_text(json.dumps(manifest, ensure_ascii=False, indent=2), encoding='utf-8')
    print('Revisar as folhas de contato e a fidelidade das telas antes de integrar.')
    return 0

def run(command):
    result = subprocess.run(command, capture_output=True, text=True)
    if result.returncode:
        raise RuntimeError(result.stderr[-3000:])

if __name__ == '__main__':
    sys.exit(main())
