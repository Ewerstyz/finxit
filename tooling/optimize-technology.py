from pathlib import Path
import sys
root=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(root/'.runtime/python'))
from PIL import Image
for name in ['finxi-tech-network','finxi-tech-intelligence','finxi-tech-core']:
    with Image.open(root/'referência/imagens/technology'/f'{name}.png') as image:
        image.convert('RGB').save(root/'public/assets'/f'{name}.webp',quality=90,method=6)
        print(name,image.size)
