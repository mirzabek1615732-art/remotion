# Teacher-reel colour grade (made with color-grade-ai)

Grade used on the intro reel. Built with the `color-grade-ai` tool
(github.com/mirzabek1615732-art/color-grade-ai) plus face-anchored exposure.

Pipeline per shot (ffmpeg):
1. White balance: RGB gains measured by `auto_grade.py` (warm paper wall kept at 60%).
2. Levels anchored to the face: black 0.045, white 0.92, face luminance 0.56
   (face measured inside the person mask's head region, so beige walls are not
   mistaken for skin).
3. `red_skin_fix` (skin-only hue) where skin measured redder than ~18°.
4. Shared look `look_bs.cube` = studio_punch@0.5 + warm_shift@0.25 + sat_boost@0.3
   (`ruby generate_chain_lut.rb look_bs.cube studio_punch@0.5 warm_shift@0.25 sat_boost@0.3`).
5. Finishing (not possible in a LUT): light vignette, Lanczos downscale from 4K, gentle unsharp.

Verified after grading with `auto_grade.py`: black point 0.009–0.013, white balance
neutral (paper wall intentionally warm), skin hue 17–21°, face luminance 0.51–0.54
across all five shots.

Note: `grade_chain.py` and `render_cg.sh` contain absolute paths from the editing
session; adjust `G` / `RAW` before reuse.
