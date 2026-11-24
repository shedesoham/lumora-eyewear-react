import React, { useId } from 'react';
import { FRAME_COLORS } from './data.js';

const SHAPES = {
  square: {
    left: 'M216 155 C249 136 374 135 404 158 C425 178 424 231 412 279 C402 326 363 344 313 341 C257 337 217 317 204 277 C190 232 183 176 216 155 Z',
    right: 'M734 155 C701 136 576 135 546 158 C525 178 526 231 538 279 C548 326 587 344 637 341 C693 337 733 317 746 277 C760 232 767 176 734 155 Z',
  },
  round: {
    left: 'M319 139 C386 139 422 185 422 238 C422 296 380 340 319 340 C258 340 211 296 211 238 C211 183 256 139 319 139 Z',
    right: 'M631 139 C564 139 528 185 528 238 C528 296 570 340 631 340 C692 340 739 296 739 238 C739 183 694 139 631 139 Z',
  },
  cat: {
    left: 'M185 128 C244 155 358 136 405 157 C431 172 417 237 406 270 C393 313 363 342 311 343 C251 344 207 313 195 277 C182 232 192 168 185 128 Z',
    right: 'M765 128 C706 155 592 136 545 157 C519 172 533 237 544 270 C557 313 587 342 639 343 C699 344 743 313 755 277 C768 232 758 168 765 128 Z',
  },
  aviator: {
    left: 'M213 148 C262 126 362 136 406 165 C434 185 405 254 386 302 C372 336 342 358 309 352 C265 346 229 309 211 270 C188 219 183 169 213 148 Z',
    right: 'M737 148 C688 126 588 136 544 165 C516 185 545 254 564 302 C578 336 608 358 641 352 C685 346 721 309 739 270 C762 219 767 169 737 148 Z',
  },
};

export default function Eyewear({ color = 'midnight', shape = 'square', animated = false, sunglasses = false, className = '', title = 'Eyeglasses' }) {
  const uid = useId().replaceAll(':', '');
  const p = FRAME_COLORS[color] || FRAME_COLORS.midnight;
  const shapePaths = SHAPES[shape] || SHAPES.square;
  const uidLens = `lens-${uid}`;
  const uidFrame = `frame-${uid}`;
  const uidArm = `arm-${uid}`;
  const uidShadow = `shadow-${uid}`;
  const part = (name) => animated ? `eyewear-part part-${name}` : '';

  return (
    <svg className={`eyewear-svg ${animated ? 'eyewear-animated' : ''} ${className}`} viewBox="0 0 950 480" role="img" aria-label={`${title}, ${p.name}`}>
      <defs>
        <linearGradient id={uidFrame} x1="0" y1="0" x2=".55" y2="1">
          <stop offset="0%" stopColor={p.highlight} />
          <stop offset="33%" stopColor={p.frame} />
          <stop offset="73%" stopColor={p.frame} />
          <stop offset="100%" stopColor={p.shadow} />
        </linearGradient>
        <linearGradient id={uidLens} x1="0" y1="0" x2="1" y2=".95">
          <stop offset="0%" stopColor="#ffffff" stopOpacity={sunglasses ? '.43' : '.65'} />
          <stop offset="39%" stopColor={sunglasses ? p.shadow : p.lens} stopOpacity={sunglasses ? '.92' : '.22'} />
          <stop offset="100%" stopColor={sunglasses ? p.frame : '#f7f8ff'} stopOpacity={sunglasses ? '.93' : '.16'} />
        </linearGradient>
        <linearGradient id={uidArm} x1="0" x2="1" y1="0" y2="1">
          <stop stopColor={p.highlight} />
          <stop offset="55%" stopColor={p.frame} />
          <stop offset="100%" stopColor={p.shadow} />
        </linearGradient>
        <filter id={uidShadow} x="-20%" y="-50%" width="140%" height="210%">
          <feDropShadow dx="0" dy="11" stdDeviation="10" floodColor="#1f2424" floodOpacity=".22" />
        </filter>
      </defs>

      <g filter={`url(#${uidShadow})`}>
        <g className={part('temple-left')}>
          <path d="M215 179 L127 143 Q97 130 76 140 L58 155 Q54 159 64 166 L192 225" fill="none" stroke={p.shadow} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M210 176 L125 145 Q100 135 77 145" fill="none" stroke={`url(#${uidArm})`} strokeWidth="11" strokeLinecap="round" />
          <path d="M190 173 L142 153" stroke={p.highlight} opacity=".62" strokeWidth="3" strokeLinecap="round" />
        </g>
        <g className={part('temple-right')}>
          <path d="M735 179 L823 143 Q853 130 874 140 L892 155 Q896 159 886 166 L758 225" fill="none" stroke={p.shadow} strokeWidth="19" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M740 176 L825 145 Q850 135 873 145" fill="none" stroke={`url(#${uidArm})`} strokeWidth="11" strokeLinecap="round" />
          <path d="M760 173 L808 153" stroke={p.highlight} opacity=".62" strokeWidth="3" strokeLinecap="round" />
        </g>

        <g className={part('lens-left')}>
          <path d={shapePaths.left} fill={`url(#${uidLens})`} stroke="none" />
          <path d="M250 183 Q315 159 381 188" fill="none" stroke="#fff" opacity={sunglasses ? '.18' : '.49'} strokeWidth="8" strokeLinecap="round" />
          <path d="M241 198 Q229 232 243 267" fill="none" stroke="#fff" opacity={sunglasses ? '.08' : '.25'} strokeWidth="5" strokeLinecap="round" />
        </g>
        <g className={part('lens-right')}>
          <path d={shapePaths.right} fill={`url(#${uidLens})`} stroke="none" />
          <path d="M569 183 Q635 159 700 188" fill="none" stroke="#fff" opacity={sunglasses ? '.18' : '.49'} strokeWidth="8" strokeLinecap="round" />
          <path d="M709 198 Q721 232 707 267" fill="none" stroke="#fff" opacity={sunglasses ? '.08' : '.25'} strokeWidth="5" strokeLinecap="round" />
        </g>
        <g className={part('rim-left')}>
          <path d={shapePaths.left} fill="none" stroke={p.shadow} strokeWidth="26" strokeLinejoin="round" />
          <path d={shapePaths.left} fill="none" stroke={`url(#${uidFrame})`} strokeWidth="19" strokeLinejoin="round" />
          <path d={shapePaths.left} fill="none" stroke={p.highlight} strokeWidth="2" strokeOpacity=".46" strokeLinejoin="round" />
          <circle cx="219" cy="182" r="4.8" fill="#d5b77d" opacity=".92" />
          <circle cx="230" cy="183" r="2.2" fill="#e9d8b0" opacity=".8" />
        </g>
        <g className={part('rim-right')}>
          <path d={shapePaths.right} fill="none" stroke={p.shadow} strokeWidth="26" strokeLinejoin="round" />
          <path d={shapePaths.right} fill="none" stroke={`url(#${uidFrame})`} strokeWidth="19" strokeLinejoin="round" />
          <path d={shapePaths.right} fill="none" stroke={p.highlight} strokeWidth="2" strokeOpacity=".46" strokeLinejoin="round" />
          <circle cx="731" cy="182" r="4.8" fill="#d5b77d" opacity=".92" />
          <circle cx="720" cy="183" r="2.2" fill="#e9d8b0" opacity=".8" />
        </g>
        <g className={part('bridge')}>
          <path d="M414 183 Q475 142 536 183" fill="none" stroke={p.shadow} strokeWidth="23" strokeLinecap="round" />
          <path d="M414 182 Q475 141 536 182" fill="none" stroke={`url(#${uidFrame})`} strokeWidth="16" strokeLinecap="round" />
          <path d="M429 171 Q475 146 521 171" fill="none" stroke={p.highlight} strokeWidth="3.1" strokeOpacity=".65" strokeLinecap="round" />
          <path d="M423 212 L428 247 M527 212 L522 247" fill="none" stroke={p.highlight} strokeWidth="7" strokeLinecap="round" opacity=".5" />
        </g>
      </g>
    </svg>
  );
}
