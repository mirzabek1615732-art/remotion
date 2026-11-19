"""Per-shot grade: tool-measured white balance -> face-anchored levels -> shared look LUT."""
import json, math, sys
G = "/home/user/remotion/projects/personal-brand/private/work/cg"
ST = json.load(open(f"{G}/stats.json"))
# white-balance gains measured by color-grade-ai auto_grade.py (C at 60%: warm paper wall is real)
WB = {"A": (0.9675, 1.0, 1.0478), "B": (0.9925, 1.0, 1.0258), "C": (0.96, 1.0, 1.080), "D": (0.984, 1.0, 1.0308), "E": (1.0626, 1.0, 1.0166)}
BLACK, WHITE, SKIN = 0.045, 0.92, 0.56

def chain(shot, size="1080:1920", look=True):
    s = ST[shot]
    b, w, k = s["black"], s["white"], s["skin"]
    ns = (k - b) / (w - b)
    g = math.log((SKIN - BLACK) / (WHITE - BLACK)) / math.log(ns)
    r, gg, bb = WB[shot]
    lev = f"clip({BLACK}+{WHITE - BLACK}*pow(clip((val/255-{b})/{w - b},0,1.2),{g:.4f}),0,1)*255"
    parts = [
        f"colorchannelmixer=rr={r}:gg={gg}:bb={bb}",
        f"lutrgb=r='{lev}':g='{lev}':b='{lev}'",
    ]
    if shot in ("C", "E"):  # color-grade-ai red_skin_fix, skin-only hue correction
        parts.append(f"lut3d='{G}/luts/skin_{shot}.cube':interp=tetrahedral")
    if look:
        parts.append(f"lut3d='{G}/luts/look_bs.cube':interp=tetrahedral")
    parts += ["vignette=angle=PI/7", f"scale={size}:flags=lanczos", "unsharp=5:5:0.3:5:5:0"]
    return ",".join(parts), g

if __name__ == "__main__":
    f, g = chain(sys.argv[1], sys.argv[2] if len(sys.argv) > 2 else "1080:1920")
    print(f)
