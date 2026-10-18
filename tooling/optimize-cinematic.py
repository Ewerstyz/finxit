from pathlib import Path
import sys
root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root / '.runtime/python'))
from PIL import Image
for name in ['finxi-neighborhood', 'finxi-workspace']:
    source = root / 'referência/imagens/cinematic' / f'{name}.png'
    with Image.open(source) as image:
        image.convert('RGB').save(root / 'public/assets' / f'{name}.webp', format='WEBP', quality=88, method=6)
        print(name, image.size)
