"""Remove wall showing through gaps in the hair: inside the text zone, neutral
(low-chroma) bright pixels are background, so their alpha is keyed out.
Skin is protected because it has chroma; dark hair is untouched.

usage: python3 -I hair_lumakey.py <in_dir> <out_dir>
"""
import os
import sys

import numpy as np
from PIL import Image, ImageFilter

src, out = sys.argv[1], sys.argv[2]
Y0, Y1 = 120, 860
for n in sorted(f for f in os.listdir(src) if f.endswith(".png")):
    im = np.asarray(Image.open(os.path.join(src, n)).convert("RGBA")).astype(np.float64) / 255
    rgb, a = im[..., :3], im[..., 3].copy()
    lum = rgb @ np.array([0.2126, 0.7152, 0.0722])
    chroma = rgb.max(-1) - rgb.min(-1)
    neutral = np.clip((0.09 - chroma) / 0.05, 0, 1)            # 1 = grey/white, 0 = coloured (skin)
    bright = np.clip((lum - 0.42) / (0.70 - 0.42), 0, 1)        # 1 = wall-bright
    key = 1 - neutral * bright
    key = np.asarray(Image.fromarray((key * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(0.8))).astype(np.float64) / 255
    a[Y0:Y1] = a[Y0:Y1] * key[Y0:Y1]
    Image.fromarray((np.dstack([rgb, a]) * 255 + 0.5).astype(np.uint8), "RGBA").save(os.path.join(out, n), compress_level=3)
print("done")
