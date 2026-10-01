import type { ReactNode } from "react";
import { Icon } from "./icons";
import type { IconName } from "./icons";

/* ---------- Device section shell: icon chip + name + live dot ---------- */
export function DeviceShell({
  icon,
  name,
  tagline,
  children,
}: {
  icon: IconName;
  name: string;
  tagline: string;
  children: ReactNode;
}) {
  return (
    <section aria-label={`${name} mockup`} className="flex w-full flex-col items-center gap-4">
      <div className="flex items-center gap-2.5 rounded-full border border-edge bg-coal/80 py-2 pl-3 pr-4 shadow-lg shadow-black/40">
        <span className="grid size-9 place-items-center rounded-full bg-ember text-white">
          <Icon name={icon} size={20} />
        </span>
        <span className="font-display text-lg font-bold tracking-tight text-white">{name}</span>
      </div>
      {children}
      <p className="text-center text-sm font-medium text-slate-400">{tagline}</p>
    </section>
  );
}

/* ---------- Circular progress ring (watch timer, kcal) ---------- */
export function Ring({
  value,
  size = 120,
  stroke = 10,
  bar = "#ea580c",
  track = "#2c3a5e",
  children,
  label,
}: {
  value: number; // 0..1
  size?: number;
  stroke?: number;
  bar?: string;
  track?: string;
  children?: ReactNode;
  label?: string;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const v = Math.min(1, Math.max(0, value));
  return (
    <div
      className="relative grid place-items-center"
      style={{ width: size, height: size }}
      role="img"
      aria-label={label ?? `Progress ${Math.round(v * 100)} percent`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={track} strokeWidth={stroke} fill="none" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={bar}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={c * (1 - v)}
          style={{ transition: "stroke-dashoffset 0.9s linear" }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  );
}

/* ---------- Linear progress bar with animated fill ---------- */
export function ProgressBar({
  value,
  label,
  barClass = "bg-gradient-to-r from-ember-deep via-ember to-ember-soft",
}: {
  value: number; // 0..1
  label?: string;
  barClass?: string;
}) {
  const v = Math.min(1, Math.max(0, value));
  return (
    <div
      className="h-3 w-full overflow-hidden rounded-full bg-edge/70"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(v * 100)}
      aria-label={label ?? "Progress"}
    >
      <div
        className={`h-full rounded-full ${barClass}`}
        style={{ width: `${v * 100}%`, transition: "width 0.6s cubic-bezier(0.22,1,0.36,1)" }}
      />
    </div>
  );
}

/* ---------- Step dots ---------- */
export function StepDots({ total, current, label }: { total: number; current: number; label?: string }) {
  return (
    <div className="flex items-center gap-2" role="img" aria-label={label ?? `Step ${current + 1} of ${total}`}>
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          aria-hidden="true"
          className={
            i === current
              ? "h-2.5 w-8 rounded-full bg-ember shadow-[0_0_12px_rgba(234,88,12,0.9)] transition-all duration-500"
              : i < current
                ? "grid size-2.5 place-items-center rounded-full bg-mint transition-all duration-500"
                : "size-2.5 rounded-full bg-edge transition-all duration-500"
          }
        />
      ))}
    </div>
  );
}

/* ---------- Floating toast ---------- */
export function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div
      role="status"
      className="fixed bottom-24 left-1/2 z-50 flex w-max max-w-[92vw] -translate-x-1/2 animate-pop items-center gap-3 rounded-2xl border border-edge bg-coal/95 py-3 pl-4 pr-3 shadow-2xl shadow-black/60 backdrop-blur"
    >
      <span className="grid size-9 shrink-0 place-items-center rounded-full bg-ember text-white">
        <Icon name="bell" size={18} />
      </span>
      <p className="truncate text-sm font-semibold text-white">{msg}</p>
      <button
        type="button"
        onClick={onClose}
        aria-label="Dismiss notification"
        className="grid size-9 shrink-0 place-items-center rounded-full text-slate-300 transition hover:bg-white/10 hover:text-white"
      >
        <Icon name="x" size={18} />
      </button>
    </div>
  );
}
