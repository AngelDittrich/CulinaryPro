import type { ReactNode } from "react";

export type IconName =
  | "tv"
  | "phone"
  | "watch"
  | "play"
  | "pause"
  | "next"
  | "prev"
  | "bell"
  | "barcode"
  | "cart"
  | "chart"
  | "check"
  | "clock"
  | "flame"
  | "fish"
  | "leaf"
  | "carrot"
  | "lemon"
  | "drop"
  | "spark"
  | "stir"
  | "plate"
  | "chef"
  | "sync"
  | "list"
  | "plus"
  | "x"
  | "wifi"
  | "signal"
  | "battery";

const PATHS: Record<IconName, ReactNode> = {
  tv: (
    <>
      <rect x="2.5" y="5" width="19" height="12" rx="2.5" />
      <path d="M9 21h6" />
    </>
  ),
  phone: (
    <>
      <rect x="7" y="2.5" width="10" height="19" rx="2.5" />
      <path d="M10.5 18.5h3" />
    </>
  ),
  watch: (
    <>
      <rect x="7" y="6.5" width="10" height="11" rx="3" />
      <path d="M9.5 2.8l.7 3.7M14.5 2.8l-.7 3.7M9.5 21.2l.7-3.7M14.5 21.2l-.7-3.7" />
      <path d="M12 10v2.4l1.7 1.1" />
    </>
  ),
  play: (
    <path
      d="M7 4.8v14.4c0 .8.9 1.3 1.6.9l11.2-7.2c.6-.4.6-1.4 0-1.8L8.6 3.9c-.7-.4-1.6.1-1.6.9Z"
      fill="currentColor"
      stroke="none"
    />
  ),
  pause: (
    <>
      <rect x="6" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" stroke="none" />
      <rect x="14" y="4.5" width="4" height="15" rx="1.2" fill="currentColor" stroke="none" />
    </>
  ),
  next: (
    <>
      <path
        d="M5.5 5.2v13.6c0 .9 1 1.5 1.8 1L15.5 14a1.2 1.2 0 0 0 0-2L7.3 4.2c-.8-.5-1.8.1-1.8 1Z"
        fill="currentColor"
        stroke="none"
      />
      <rect x="17" y="4" width="2.8" height="16" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
  prev: (
    <>
      <path
        d="M18.5 5.2v13.6c0 .9-1 1.5-1.8 1L8.5 14a1.2 1.2 0 0 1 0-2l8.2-7.8c.8-.5 1.8.1 1.8 1Z"
        fill="currentColor"
        stroke="none"
      />
      <rect x="4.2" y="4" width="2.8" height="16" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
  bell: (
    <>
      <path d="M6 8.5a6 6 0 0 1 12 0c0 6.5 2.5 8 2.5 8h-17S6 15 6 8.5" />
      <path d="M10.4 20a1.9 1.9 0 0 0 3.2 0" />
    </>
  ),
  barcode: (
    <>
      <path d="M4 5v14M7.5 5v14M11 5v14" />
      <path d="M14 5v14M16 5v14M20 5v14" strokeWidth={2.8} />
    </>
  ),
  cart: (
    <>
      <path d="M3 4h2l2.3 11.2a1 1 0 0 0 1 .8h9.9a1 1 0 0 0 1-.8L21.5 8H6" />
      <circle cx="9.5" cy="20" r="1.4" />
      <circle cx="17" cy="20" r="1.4" />
    </>
  ),
  chart: (
    <>
      <path d="M4 20h16" />
      <path d="M7.5 20v-6M12.5 20V7M17.5 20v-9" />
    </>
  ),
  check: <path d="m4.5 12.5 5 5 10-11" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  flame: (
    <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.4-.5-2-1-3-1.1-2.1-.2-4 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.2.4-2.3 1-3a2.5 2.5 0 0 0 2.5 2.5Z" />
  ),
  fish: (
    <>
      <ellipse cx="10" cy="12" rx="6.5" ry="4.2" />
      <path d="M16 12l4.5-3.5v7L16 12Z" />
      <circle cx="7.5" cy="11.5" r="0.7" fill="currentColor" stroke="none" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19C5 10.5 10.5 5 19 5c0 8.5-5.5 14-14 14Z" />
      <path d="M5 19c3.5-4.5 7-8 11-10" />
    </>
  ),
  carrot: (
    <>
      <path d="M7.5 8.5h9L12 20.5 7.5 8.5Z" />
      <path d="M12 8.5C12 6 10.5 4.5 8.5 4M12 8.5c0-2.5 1.5-4 3.5-4.5M12 8.5V3.5" />
      <path d="M10 12.5h4M10.7 15.5h2.6" />
    </>
  ),
  lemon: (
    <>
      <path d="M4 15a8 8 0 0 0 16 0Z" />
      <path d="M12 15V7M12 15l-5-3.5M12 15l5-3.5" />
    </>
  ),
  drop: <path d="M12 3.5S6.5 10 6.5 14a5.5 5.5 0 0 0 11 0C17.5 10 12 3.5 12 3.5Z" />,
  spark: (
    <>
      <path d="M12 3l1.7 5.6 5.8 1.4-5.8 1.7L12 17.5l-1.7-5.8L4.5 10l5.8-1.4L12 3Z" />
      <path d="M18.6 15.4l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
    </>
  ),
  stir: (
    <>
      <circle cx="9.5" cy="14.5" r="5" />
      <path d="M13 11 20 4" />
      <path d="M7 14.5h5" />
    </>
  ),
  plate: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <circle cx="12" cy="12" r="4.2" />
    </>
  ),
  chef: (
    <>
      <path d="M7 13a3.5 3.5 0 1 1 .6-6.9A4.5 4.5 0 0 1 16.4 6 3.5 3.5 0 1 1 17 13H7Z" />
      <path d="M7.5 13v3h9v-3M9.5 19.5h5" />
    </>
  ),
  sync: (
    <>
      <path d="M20 12a8 8 0 1 1-2.3-5.6" />
      <path d="M20 3.5V8h-4.5" />
    </>
  ),
  list: <path d="M5 5.5h14M5 10.5h14M5 15.5h9M5 20.5h6" />,
  plus: <path d="M12 5v14M5 12h14" />,
  x: <path d="M6 6l12 12M18 6 6 18" />,
  wifi: (
    <>
      <path d="M3 9.5a13 13 0 0 1 18 0M6.5 13a8.5 8.5 0 0 1 11 0M10 16.4a4 4 0 0 1 4 0" />
      <circle cx="12" cy="19" r="1" fill="currentColor" stroke="none" />
    </>
  ),
  signal: <path d="M4.5 18v-2M9.5 18V9M14.5 18v-5M19.5 18V6" />,
  battery: (
    <>
      <rect x="2.5" y="8.5" width="17" height="7" rx="2" />
      <path d="M21.8 11v2" />
      <rect x="4.8" y="10.8" width="9" height="2.6" rx="1" fill="currentColor" stroke="none" />
    </>
  ),
};

interface IconProps {
  name: IconName;
  className?: string;
  size?: number;
  decorative?: boolean;
  title?: string;
}

export function Icon({ name, className, size = 24, decorative = true, title }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={decorative ? "true" : undefined}
      role={decorative ? undefined : "img"}
    >
      {!decorative && title ? <title>{title}</title> : null}
      {PATHS[name]}
    </svg>
  );
}
