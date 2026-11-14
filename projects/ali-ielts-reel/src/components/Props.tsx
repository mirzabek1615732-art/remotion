import React from 'react';
import {COLORS} from '../theme';
import {IeltsBookShape} from './AliCharacter';

/** Orange cartoon sofa; origin = centre of seat front at floor level. */
export const Sofa: React.FC<{x: number; y: number; scale?: number; layer: 'back' | 'front'}> = ({x, y, scale = 1, layer}) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    {layer === 'back' ? (
      <g>
        <rect x={-430} y={-470} width={860} height={300} rx={60} fill="#EA7A2B" stroke={COLORS.ink} strokeWidth={7} />
        <rect x={-380} y={-430} width={360} height={230} rx={40} fill={COLORS.orange} stroke={COLORS.ink} strokeWidth={5} />
        <rect x={20} y={-430} width={360} height={230} rx={40} fill={COLORS.orange} stroke={COLORS.ink} strokeWidth={5} />
        <rect x={-430} y={-230} width={860} height={150} rx={30} fill={COLORS.orange} stroke={COLORS.ink} strokeWidth={7} />
      </g>
    ) : (
      <g>
        <rect x={-470} y={-330} width={110} height={290} rx={48} fill="#EA7A2B" stroke={COLORS.ink} strokeWidth={7} />
        <rect x={360} y={-330} width={110} height={290} rx={48} fill="#EA7A2B" stroke={COLORS.ink} strokeWidth={7} />
        <rect x={-440} y={-100} width={880} height={70} rx={20} fill="#C2410C" stroke={COLORS.ink} strokeWidth={7} />
        <rect x={-420} y={-34} width={30} height={34} rx={6} fill={COLORS.ink} />
        <rect x={390} y={-34} width={30} height={34} rx={6} fill={COLORS.ink} />
      </g>
    )}
  </g>
);

/** Stand-alone IELTS book prop. */
export const IeltsBook: React.FC<{x: number; y: number; width?: number; rotate?: number; dusty?: number; glow?: number}> = ({
  x,
  y,
  width = 150,
  rotate = 0,
  dusty = 0,
  glow = 0,
}) => (
  <g transform={`translate(${x} ${y}) rotate(${rotate})`}>
    {glow > 0 ? <ellipse rx={width * 1.4} ry={width * 1.6} fill={COLORS.yellow} opacity={glow * 0.35} /> : null}
    <IeltsBookShape width={width} dusty={dusty} />
  </g>
);

/** Cobweb drawn in a corner (for the untouched book). */
export const Cobweb: React.FC<{x: number; y: number; size?: number; opacity?: number}> = ({x, y, size = 90, opacity = 1}) => (
  <g transform={`translate(${x} ${y})`} opacity={opacity} stroke="#E2E8F0" strokeWidth={3} fill="none">
    {[0, 22, 45, 68, 90].map((a) => (
      <line key={a} x1={0} y1={0} x2={Math.cos((a * Math.PI) / 180) * size} y2={Math.sin((a * Math.PI) / 180) * size} />
    ))}
    {[0.3, 0.55, 0.8].map((k) => (
      <path key={k} d={`M ${size * k} 0 Q ${size * k * 0.75} ${size * k * 0.3} ${size * k * 0.707} ${size * k * 0.707} Q ${size * k * 0.3} ${size * k * 0.75} 0 ${size * k}`} />
    ))}
  </g>
);

/** Analog wall clock. hours as float (15.5 = 15:30). */
export const Clock: React.FC<{x: number; y: number; r?: number; hours: number; wobble?: number}> = ({x, y, r = 120, hours, wobble = 0}) => {
  const minuteAngle = (hours % 1) * 360;
  const hourAngle = ((hours % 12) / 12) * 360;
  return (
    <g transform={`translate(${x} ${y}) rotate(${wobble})`}>
      <circle r={r + 14} fill={COLORS.orange} stroke={COLORS.ink} strokeWidth={7} />
      <circle r={r} fill={COLORS.white} stroke={COLORS.ink} strokeWidth={5} />
      {Array.from({length: 12}).map((_, i) => (
        <rect key={i} x={-4} y={-r + 10} width={8} height={i % 3 === 0 ? 26 : 14} rx={3} fill={COLORS.navy} transform={`rotate(${i * 30})`} />
      ))}
      <rect x={-7} y={-r * 0.52} width={14} height={r * 0.6} rx={7} fill={COLORS.navy} transform={`rotate(${hourAngle})`} />
      <rect x={-5} y={-r * 0.82} width={10} height={r * 0.9} rx={5} fill={COLORS.red} transform={`rotate(${minuteAngle})`} />
      <circle r={12} fill={COLORS.navy} />
    </g>
  );
};

/** Exam desk seen from the front; origin = centre of desk top edge. */
export const Desk: React.FC<{x: number; y: number; width?: number; color?: string}> = ({x, y, width = 760, color = '#B45309'}) => (
  <g transform={`translate(${x} ${y})`}>
    <rect x={-width / 2} y={0} width={width} height={46} rx={12} fill={color} stroke={COLORS.ink} strokeWidth={7} />
    <rect x={-width / 2 + 30} y={46} width={width - 60} height={320} fill="#92400E" stroke={COLORS.ink} strokeWidth={7} />
    <rect x={-width / 2 + 60} y={80} width={width - 120} height={110} rx={10} fill="#78350F" stroke={COLORS.ink} strokeWidth={5} />
    <circle cx={0} cy={135} r={12} fill={COLORS.yellow} stroke={COLORS.ink} strokeWidth={4} />
  </g>
);

/** Desk lamp with warm light cone. */
export const Lamp: React.FC<{x: number; y: number; on?: number}> = ({x, y, on = 1}) => (
  <g transform={`translate(${x} ${y})`}>
    {on > 0 ? <path d="M -40 -150 L -260 260 L 220 260 L 40 -150 Z" fill={COLORS.yellow} opacity={0.16 * on} /> : null}
    <rect x={-60} y={-10} width={120} height={20} rx={8} fill={COLORS.navy} stroke={COLORS.ink} strokeWidth={5} />
    <path d="M 0 -10 L -30 -120 L 20 -190" stroke={COLORS.navy} strokeWidth={14} fill="none" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M -10 -230 L 90 -200 L 50 -130 Z" fill={COLORS.green} stroke={COLORS.ink} strokeWidth={6} strokeLinejoin="round" />
  </g>
);

/** Flash-card with an English word and its Uzbek meaning. */
export const VocabCard: React.FC<{word: string; meaning: string; color?: string}> = ({word, meaning, color = COLORS.white}) => (
  <g>
    <rect x={-180} y={-90} width={360} height={180} rx={24} fill={color} stroke={COLORS.ink} strokeWidth={7} />
    <text y={-8} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={52} fill={COLORS.navy}>
      {word}
    </text>
    <text y={50} textAnchor="middle" fontFamily="Montserrat" fontWeight={600} fontSize={34} fill={COLORS.blue}>
      {meaning}
    </text>
  </g>
);

/** Speech bubble (SVG). Origin = tail tip. */
export const SpeechBubble: React.FC<{w: number; h: number; text: string; size?: number; tail?: 'left' | 'right'; color?: string; textColor?: string}> = ({
  w,
  h,
  text,
  size = 80,
  tail = 'left',
  color = COLORS.white,
  textColor = COLORS.navy,
}) => {
  const sx = tail === 'left' ? 1 : -1;
  return (
    <g>
      <g transform={`scale(${sx} 1)`}>
        <path d={`M 0 0 L 40 -90 L 120 -90 Z`} fill={color} stroke={COLORS.ink} strokeWidth={7} strokeLinejoin="round" />
      </g>
      <rect x={tail === 'left' ? -40 : -w + 40} y={-90 - h} width={w} height={h} rx={h / 2.4} fill={color} stroke={COLORS.ink} strokeWidth={7} />
      <g transform={`scale(${sx} 1)`}>
        <path d="M 44 -96 L 116 -96" stroke={color} strokeWidth={12} />
      </g>
      <text
        x={tail === 'left' ? -40 + w / 2 : -w / 2 + 40}
        y={-90 - h / 2 + size * 0.36}
        textAnchor="middle"
        fontFamily="Montserrat"
        fontWeight={900}
        fontSize={size}
        fill={textColor}
      >
        {text}
      </text>
    </g>
  );
};

/** IELTS 7.0 target / bullseye. */
export const TargetBoard: React.FC<{label?: string; r?: number}> = ({label = '7.0', r = 300}) => (
  <g>
    {[1, 0.8, 0.6, 0.4].map((k, i) => (
      <circle key={k} r={r * k} fill={i % 2 === 0 ? COLORS.white : COLORS.red} stroke={COLORS.ink} strokeWidth={8} />
    ))}
    <circle r={r * 0.24} fill={COLORS.yellow} stroke={COLORS.ink} strokeWidth={8} />
    <text y={r * 0.1} textAnchor="middle" fontFamily="Montserrat" fontWeight={900} fontSize={r * 0.24} fill={COLORS.navy}>
      {label}
    </text>
  </g>
);
