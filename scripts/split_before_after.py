from PIL import Image
from pathlib import Path

assets = Path(r"c:\Users\hp\Desktop\CanSani\Frontend\src\assets")
full = Image.open(assets / "full.png").convert("RGB")
w, h = full.size
mid = w // 2
gap = max(6, w // 100)

# Exterior only — lower portion of each column
y0, y1 = int(h * 0.62), int(h * 0.965)
x0, x1 = int(w * 0.05), mid - gap
x2, x3 = mid + gap, int(w * 0.95)
before_ext = full.crop((x0, y0, x1, y1))
after_ext = full.crop((x2, y0, x3, y1))
before_ext.save(assets / "before-bin.png", optimize=True)
after_ext.save(assets / "after-bin.png", optimize=True)
print("exterior", before_ext.size, after_ext.size)

# Interior only from inside graphic — skip BEFORE/AFTER labels
inside = Image.open(assets / "beforeafterinside.png").convert("RGB")
iw, ih = inside.size
imid = iw // 2
igap = max(6, iw // 100)
iy0, iy1 = int(ih * 0.34), int(ih * 0.96)
before_in = inside.crop((int(iw * 0.04), iy0, imid - igap, iy1))
after_in = inside.crop((imid + igap, iy0, int(iw * 0.96), iy1))
before_in.save(assets / "before-bin-inside.png", optimize=True)
after_in.save(assets / "after-bin-inside.png", optimize=True)
print("interior", before_in.size, after_in.size)
