// Small line icons for navigation, drawn to match the menu's glass drawings.
const common = {
  width: 24,
  height: 24,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  'aria-hidden': true,
};

export const IconArch = () => (
  <svg {...common}>
    <path d="M4 21V11a8 8 0 0 1 16 0v10" />
    <path d="M8 21v-9a4 4 0 0 1 8 0v9" />
  </svg>
);
export const IconCoupe = () => (
  <svg {...common}>
    <path d="M5 6h14c0 4-3.5 5.8-6 6.6V19l3 1H8l3-1v-6.4C8.5 11.8 5 10 5 6z" />
  </svg>
);
export const IconPin = () => (
  <svg {...common}>
    <path d="M12 21s-6.5-6.2-6.5-11a6.5 6.5 0 0 1 13 0c0 4.8-6.5 11-6.5 11z" />
    <circle cx="12" cy="10" r="2.2" />
  </svg>
);
export const IconKey = () => (
  <svg {...common}>
    <circle cx="8" cy="12" r="3.5" />
    <path d="M11.5 12H21M18 12v3M15.5 12v2" />
  </svg>
);
export const IconArrow = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M3 8h10M9 4l4 4-4 4" />
  </svg>
);
export const IconOut = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M6 3H3v10h10v-3M9 3h4v4M13 3L7 9" />
  </svg>
);
