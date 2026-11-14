#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
RAW=../raw/intro-reel
VOICE="highpass=f=80,afftdn=nf=-30:nr=8,equalizer=f=250:t=q:w=1.2:g=-2,equalizer=f=3500:t=q:w=1.0:g=2.5,acompressor=threshold=-20dB:ratio=2.5:attack=8:release=120:makeup=1.5"
seg(){ # out shot file start end size
  local out=$1 shot=$2 file=$3 ss=$4 to=$5 size=$6
  local vf; vf="fps=30,$(python3 cg/grade_chain.py $shot $size),format=yuv420p"
  ffmpeg -v error -y -ss $ss -to $to -i "$RAW/$file" -vf "$vf" -af "$VOICE" -c:v libx264 -crf 12 -preset slow -x264-params keyint=15 -c:a pcm_s16le -ar 48000 seg_cg/tmp_$out.mov
  local I; I=$(ffmpeg -i seg_cg/tmp_$out.mov -af ebur128 -f null - 2>&1 | grep -E '^\s+I:' | tail -1 | awk '{print $2}')
  local gain; gain=$(python3 -c "print(round(-16-($I),2))")
  ffmpeg -v error -y -i seg_cg/tmp_$out.mov -c:v copy -af "volume=${gain}dB,alimiter=limit=0.89" -c:a aac -b:a 256k seg_cg/$out.mp4
  rm seg_cg/tmp_$out.mov
  echo "$out ($shot) done"
}
seg line1_take_2  A "line1 take 2.mp4"   0.95 5.00 1080:1920
seg line_2_take_2 B "line 2 take 2 .mp4" 2.30 7.20 1080:1920
seg 3-line_take_2 C "3-line take 2 .mp4" 0.45 7.90 1080:1920
seg line_4        D "line 4.mp4"         1.10 7.70 1080:1920
seg 6-7lines      E "6-7lines.mp4"       1.00 11.95 2160:3840
