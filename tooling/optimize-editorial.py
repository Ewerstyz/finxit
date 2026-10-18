from pathlib import Path
import sys
root = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(root / '.runtime/python'))
from PIL import Image
source = root / 'public/assets/empreendedora-editorial.png'
with Image.open(source) as photo:
    photo.convert('RGB').save(source.with_suffix('.jpg'), quality=88, optimize=True)
print('Editorial JPEG ready')
