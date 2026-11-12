import React from 'react';
import {AbsoluteFill} from 'remotion';
import {loadFonts} from '../fonts';
import {COLORS} from '../theme';

loadFonts();

export type CoverIcon = 'results' | 'courses' | 'about' | 'free' | 'faq';

const Icon: React.FC<{icon: CoverIcon}> = ({icon}) => {
  const s = {stroke: COLORS.navy, strokeWidth: 22, strokeLinecap: 'round', strokeLinejoin: 'round', fill: 'none'} as const;
  switch (icon) {
    case 'results': // rising bars + arrow
      return (
        <g>
          <rect x={-150} y={20} width={70} height={110} rx={14} fill={COLORS.navy} />
          <rect x={-35} y={-50} width={70} height={180} rx={14} fill={COLORS.navy} />
          <rect x={80} y={-130} width={70} height={260} rx={14} fill={COLORS.navy} />
          <path d="M -160 -60 L -40 -150 L 20 -110 L 130 -200" {...s} />
          <path d="M 70 -205 L 135 -205 L 135 -140" {...s} />
        </g>
      );
    case 'courses': // open book
      return (
        <g>
          <path d="M 0 -110 Q -90 -150 -180 -120 L -180 120 Q -90 90 0 130 Q 90 90 180 120 L 180 -120 Q 90 -150 0 -110 Z" {...s} />
          <path d="M 0 -110 L 0 130" {...s} />
          <path d="M -130 -60 L -50 -70 M -130 0 L -50 -10 M 50 -70 L 130 -60 M 50 -10 L 130 0" {...s} strokeWidth={16} />
        </g>
      );
    case 'about': // person
      return (
        <g>
          <circle cx={0} cy={-80} r={75} {...s} />
          <path d="M -150 170 Q -150 30 0 30 Q 150 30 150 170" {...s} />
        </g>
      );
    case 'free': // gift
      return (
        <g>
          <rect x={-160} y={-40} width={320} height={190} rx={18} {...s} />
          <rect x={-180} y={-100} width={360} height={70} rx={18} {...s} />
          <path d="M 0 -100 L 0 150" {...s} />
          <path d="M 0 -100 Q -90 -200 -100 -130 Q -100 -100 0 -100 Q 100 -100 100 -130 Q 90 -200 0 -100" {...s} />
        </g>
      );
    case 'faq': // question bubble
      return (
        <g>
          <path d="M -170 -130 Q -170 -180 -120 -180 L 120 -180 Q 170 -180 170 -130 L 170 60 Q 170 110 120 110 L -20 110 L -110 180 L -100 110 L -120 110 Q -170 110 -170 60 Z" {...s} />
          <path d="M -45 -85 Q -45 -130 0 -130 Q 50 -130 50 -85 Q 50 -45 0 -30 L 0 5" {...s} />
          <circle cx={0} cy={55} r={14} fill={COLORS.navy} />
        </g>
      );
  }
};

/** Instagram story-highlight cover: 1080×1920, icon in the centre circle. */
export const HighlightCover: React.FC<{icon: CoverIcon}> = ({icon}) => (
  <AbsoluteFill style={{background: COLORS.blue}}>
    <svg viewBox="0 0 1080 1920" width={1080} height={1920}>
      <circle cx={540} cy={960} r={430} fill={COLORS.yellow} />
      <circle cx={540} cy={960} r={430} fill="none" stroke={COLORS.navy} strokeWidth={18} />
      <g transform="translate(540 975)">
        <Icon icon={icon} />
      </g>
    </svg>
  </AbsoluteFill>
);
