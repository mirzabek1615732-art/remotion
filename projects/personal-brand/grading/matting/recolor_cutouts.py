"""Re-colour the hook cut-outs from newly graded frames, reusing the existing alpha.

usage: python3 -I recolor_cutouts.py <graded_frames_dir> <alpha_cutouts_dir> <out_dir>
Inside the text zone the foreground is re-estimated (pymatting) so no wall
colour bleeds into hair strands; elsewhere the graded pixels are used as-is.
"""
import os
import sys

import numpy as np
from PIL import Image
from pymatting import estimate_foreground_ml

frames, alpha_dir, out = sys.argv[1:4]
Y0, Y1 = 120, 860
names = sorted(f for f in os.listdir(alpha_dir) if f.endswith(".png"))
for n in names:
    i = int(n[:4])
    rgb = np.asarray(Image.open(os.path.join(frames, f"{i + 1:04d}.png")).convert("RGB")).astype(np.float64) / 255
    alpha = np.asarray(Image.open(os.path.join(alpha_dir, n)))[..., 3].astype(np.float64) / 255
    fg = rgb.copy()
    fg[Y0:Y1] = np.clip(estimate_foreground_ml(rgb[Y0:Y1], alpha[Y0:Y1]), 0, 1)
    Image.fromarray((np.dstack([fg, alpha]) * 255 + 0.5).astype(np.uint8), "RGBA").save(os.path.join(out, n), compress_level=3)
print("done", len(names))
