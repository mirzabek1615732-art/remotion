"""Refine the hook cut-outs with closed-form alpha matting around the hair.

usage: python3 -I hairmatte.py <frames_dir> <coarse_cutouts_dir> <out_dir> <first> <last>
Coarse masks come from the existing RGBA cut-outs (u2net). Inside the text
zone (top of frame) a trimap is built from the coarse mask and solved with
pymatting; foreground colours are decontaminated so no white wall bleeds
into hair strands.
"""
import os
import sys

import numpy as np
from PIL import Image, ImageFilter
from pymatting import estimate_alpha_cf, estimate_foreground_ml

frames, coarse_dir, out, first, last = sys.argv[1], sys.argv[2], sys.argv[3], int(sys.argv[4]), int(sys.argv[5])
Y0, Y1 = 120, 860  # rows that can overlap the hook text
S = float(os.environ.get('MATTE_SCALE', '0.5'))  # 0.5: full res gave blocky patches in the solver


def morph(mask, size, op):
    im = Image.fromarray((mask * 255).astype(np.uint8))
    im = im.filter(ImageFilter.MaxFilter(size) if op == "dilate" else ImageFilter.MinFilter(size))
    return np.asarray(im) > 127


for i in range(first, last + 1):
    rgb = np.asarray(Image.open(os.path.join(frames, f"{i + 1:04d}.png")).convert("RGB")).astype(np.float64) / 255
    coarse = np.asarray(Image.open(os.path.join(coarse_dir, f"{i:04d}.png")))[..., 3].astype(np.float64) / 255
    H, W = coarse.shape
    crop = rgb[Y0:Y1]
    cm = coarse[Y0:Y1] > 0.5
    small = lambda a: np.asarray(Image.fromarray((a * 255).astype(np.uint8)).resize((int(W * S), int((Y1 - Y0) * S)), Image.BILINEAR)).astype(np.float64) / 255
    img_s = np.stack([small(crop[..., c]) for c in range(3)], -1)
    cm_s = small(cm.astype(np.float64)) > 0.5
    fg = morph(cm_s, 13, "erode")
    bg = ~morph(cm_s, 17, "dilate")
    tri = np.full(cm_s.shape, 0.5)
    tri[fg] = 1.0
    tri[bg] = 0.0
    if not (tri == 0.5).any():
        alpha_s = cm_s.astype(np.float64)
    else:
        alpha_s = estimate_alpha_cf(img_s, tri)
    alpha_c = np.asarray(Image.fromarray((np.clip(alpha_s, 0, 1) * 255).astype(np.uint8)).resize((W, Y1 - Y0), Image.BICUBIC)).astype(np.float64) / 255
    # keep the coarse mask's solid interior (face/body) and only use the matte at the edge band
    alpha = coarse.copy()
    band = np.zeros_like(coarse, dtype=bool)
    band[Y0:Y1] = True
    alpha[Y0:Y1] = alpha_c
    fgc = estimate_foreground_ml(crop, alpha_c)
    out_rgb = rgb.copy()
    out_rgb[Y0:Y1] = np.clip(fgc, 0, 1)
    rgba = np.dstack([out_rgb, np.clip(alpha, 0, 1)])
    Image.fromarray((rgba * 255 + 0.5).astype(np.uint8), "RGBA").save(os.path.join(out, f"{i:04d}.png"), compress_level=3)
    print("frame", i, flush=True)
