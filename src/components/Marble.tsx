import type { ReactNode } from 'react';
import type { BarId } from '../data/bluethroat';

/**
 * The bar top as a surface: white marble with grey veins for Deptford,
 * black marble with pale veins for Brixton.
 */
export function Marble({ bar, children, className = '' }: { bar: BarId; children: ReactNode; className?: string }) {
  return (
    <div className={`marble marble--${bar} ${className}`}>
      <svg className="marble-veins" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g fill="none" strokeLinecap="round">
          <path className="v1" d="M-20 52 C 48 70, 96 38, 150 78 S 238 136, 282 118 S 360 84, 430 120" />
          <path className="v3" d="M150 78 C 162 96, 158 120, 176 142" />
          <path className="v2" d="M70 -20 C 92 40, 62 96, 112 150 S 150 250, 128 330" />
          <path className="v3" d="M112 150 C 132 160, 160 156, 184 176 S 214 214, 242 218" />
          <path className="v2" d="M268 -20 C 252 42, 314 88, 292 160 S 336 246, 372 320" />
          <path className="v3" d="M292 160 C 272 176, 250 172, 236 192" />
          <path className="v1" d="M-20 236 C 40 222, 92 258, 150 244 S 260 214, 318 240 S 390 270, 430 262" />
        </g>
      </svg>
      <div className="marble-body">{children}</div>
    </div>
  );
}
