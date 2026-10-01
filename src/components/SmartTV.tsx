import { useRef, useState } from "react";
import { STEPS, formatTime } from "../data/recipe";
import { useSync } from "../state/useSync";
import { Icon } from "./icons";
import { DeviceShell, ProgressBar, StepDots } from "./ui";

/* Stylized "video frame": salmon plate illustration drawn in SVG */
function DishArt({ running }: { running: boolean }) {
  return (
    <svg
      viewBox="0 0 800 450"
      className="h-full w-full"
      role="img"
      aria-label="Overhead shot of oven-baked salmon with vegetables"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <radialGradient id="tvGlow" cx="50%" cy="38%" r="75%">
          <stop offset="0%" stopColor="#7c2d12" />
          <stop offset="45%" stopColor="#431407" />
          <stop offset="100%" stopColor="#0f172a" />
        </radialGradient>
        <linearGradient id="salmon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fdba74" />
          <stop offset="55%" stopColor="#fb923c" />
          <stop offset="100%" stopColor="#ea580c" />
        </linearGradient>
        <linearGradient id="plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f8fafc" />
          <stop offset="100%" stopColor="#cbd5e1" />
        </linearGradient>
        <linearGradient id="table" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#292018" />
          <stop offset="100%" stopColor="#171310" />
        </linearGradient>
      </defs>

      <rect width="800" height="450" fill="url(#tvGlow)" />
      <circle cx="400" cy="180" r="190" fill="#ea580c" opacity="0.12" />

      {/* table */}
      <rect y="330" width="800" height="120" fill="url(#table)" />
      <rect y="328" width="800" height="4" fill="#ea580c" opacity="0.5" />

      {/* plate */}
      <ellipse cx="400" cy="300" rx="255" ry="86" fill="#0b1120" opacity="0.55" />
      <ellipse cx="400" cy="288" rx="250" ry="82" fill="url(#plate)" />
      <ellipse cx="400" cy="288" rx="196" ry="62" fill="none" stroke="#94a3b8" strokeWidth="3" opacity="0.8" />

      {/* salmon fillet */}
      <g transform="rotate(-8 400 280)">
        <rect x="270" y="238" width="230" height="86" rx="40" fill="url(#salmon)" />
        <rect x="270" y="238" width="230" height="86" rx="40" fill="none" stroke="#9a3412" strokeWidth="4" opacity="0.6" />
        {[0, 1, 2, 3, 4].map((i) => (
          <path
            key={i}
            d={`M${300 + i * 38} 244 q10 36 0 74`}
            stroke="#fff7ed"
            strokeWidth="7"
            fill="none"
            strokeLinecap="round"
            opacity="0.85"
          />
        ))}
      </g>

      {/* broccoli */}
      {[
        [560, 250],
        [600, 272],
        [566, 300],
      ].map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 5} y={y} width="10" height="26" rx="5" fill="#3f6212" />
          <circle cx={x} cy={y} r="24" fill="#4d7c0f" />
          <circle cx={x - 9} cy={y - 7} r="12" fill="#65a30d" />
          <circle cx={x + 9} cy={y - 5} r="11" fill="#65a30d" />
        </g>
      ))}

      {/* carrot sticks */}
      <g transform="rotate(14 220 290)">
        <rect x="150" y="272" width="120" height="20" rx="10" fill="#f97316" />
        <rect x="150" y="300" width="105" height="18" rx="9" fill="#fb923c" />
        <path d="M150 282h120M150 309h105" stroke="#9a3412" strokeWidth="3" opacity="0.7" />
      </g>

      {/* lemon wedge */}
      <g transform="translate(610 330)">
        <path d="M-52 0a52 52 0 0 0 104 0Z" fill="#fde047" />
        <path d="M-52 0a52 52 0 0 0 104 0Z" fill="none" stroke="#a16207" strokeWidth="4" />
        <path d="M0 0V-46M0 0 40-26M0 0-40-26" stroke="#a16207" strokeWidth="4" strokeLinecap="round" />
      </g>

      {/* dill */}
      <g stroke="#4ade80" strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M210 210q20-26 52-32" />
        <path d="M232 200v-18M248 194l10-14M218 210l-4-16" />
      </g>

      {/* steam */}
      {[
        { x: 350, d: "0s" },
        { x: 410, d: "1.1s" },
        { x: 470, d: "2.2s" },
      ].map(({ x, d }, i) => (
        <path
          key={i}
          d={`M${x} 210 q-14 -22 0 -44 q14 -22 0 -44`}
          stroke="#fff7ed"
          strokeWidth="9"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
          className={running ? "animate-steam" : ""}
          style={{ animationDelay: d }}
        />
      ))}
    </svg>
  );
}

export function SmartTV() {
  const {
    stepIndex,
    totalSteps,
    progress,
    remainingSec,
    running,
    toggleTimer,
    nextStep,
    prevStep,
  } = useSync();
  const step = STEPS[stepIndex];
  const [focusIdx, setFocusIdx] = useState(1);
  const btnRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const controls = [prevStep, toggleTimer, nextStep] as const;
  const urgent = remainingSec <= 60 && running;

  const onKeys = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const dir = e.key === "ArrowRight" ? 1 : -1;
    const next = (focusIdx + dir + controls.length) % controls.length;
    setFocusIdx(next);
    btnRefs.current[next]?.focus();
  };

  const ctrlBtn = (i: number, label: string, icon: "prev" | "play" | "pause" | "next", fn: () => void) => (
    <button
      key={label}
      ref={(el) => {
        btnRefs.current[i] = el;
      }}
      type="button"
      onClick={() => {
        setFocusIdx(i);
        fn();
      }}
      aria-label={label}
      className={`grid min-h-11 min-w-11 place-items-center rounded-2xl px-5 py-3 font-display text-base font-bold transition-all duration-200 active:scale-95 ${
        focusIdx === i
          ? "bg-ember text-white shadow-[0_0_0_3px_#0f172a,0_0_0_6px_#fb923c,0_10px_30px_rgba(234,88,12,0.5)]"
          : "bg-white/10 text-white hover:bg-white/20"
      }`}
    >
      <Icon name={icon} size={26} />
    </button>
  );

  return (
    <DeviceShell icon="tv" name="Smart TV" tagline="10-foot HUD · D-pad + hands-free">
      <div className="w-full overflow-hidden rounded-[2rem] border-[10px] border-black bg-black shadow-2xl shadow-ember/10 ring-1 ring-edge">
        <div className="relative aspect-video w-full overflow-hidden">
          <div className="absolute inset-0">
            <DishArt running={running} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/55" aria-hidden="true" />

          {/* top bar */}
          <div className="absolute inset-x-0 top-0 flex items-start justify-between p-4 sm:p-5">
            <div className="flex items-center gap-2 rounded-full bg-black/55 py-1.5 pl-2 pr-4 backdrop-blur">
              <span className="grid size-8 place-items-center rounded-full bg-ember text-white">
                <Icon name="chef" size={18} />
              </span>
              <span className="font-display text-sm font-bold tracking-wide text-white">
                KITCHENFLOW
              </span>
            </div>

            {/* GIANT timer */}
            <div
              className={`rounded-2xl border px-4 py-2 text-right backdrop-blur transition-colors sm:px-5 ${
                urgent ? "border-ember-soft bg-ember/25" : "border-white/15 bg-black/55"
              }`}
            >
              <p className="text-[11px] font-bold tracking-[0.2em] text-ember-soft">TIMER</p>
              <p
                className="tnum font-display text-4xl font-extrabold leading-none text-white sm:text-5xl"
                aria-hidden="true"
              >
                {formatTime(remainingSec)}
              </p>
              <span className="sr-only" aria-live="polite">
                {Math.ceil(remainingSec / 60)} minutes left on {step.title}
              </span>
            </div>
          </div>

          {/* play / pause */}
          <button
            type="button"
            onClick={toggleTimer}
            aria-label={running ? "Pause video and timer" : "Play video and start timer"}
            className={`absolute left-1/2 top-[38%] grid size-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 ${
              running ? "bg-black/45 opacity-70 backdrop-blur hover:opacity-100" : "animate-pop bg-ember shadow-ember/50"
            }`}
          >
            <Icon name={running ? "pause" : "play"} size={38} />
          </button>

          {/* step headline */}
          <div key={stepIndex} className="absolute inset-x-0 bottom-0 animate-rise p-4 sm:p-6" aria-live="polite">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-ember px-3 py-1 font-display text-xs font-extrabold tracking-widest text-white">
                STEP {stepIndex + 1}/{totalSteps}
              </span>
              <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-bold tracking-widest text-white backdrop-blur">
                {step.kicker.toUpperCase()}
              </span>
              {step.temp && (
                <span className="flex items-center gap-1 rounded-full bg-gold/90 px-3 py-1 text-xs font-extrabold text-ink">
                  <Icon name="flame" size={14} />
                  {step.temp}
                </span>
              )}
            </div>
            <h2 className="font-display text-3xl font-extrabold leading-tight tracking-tight text-white drop-shadow-lg sm:text-5xl">
              {step.title}
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-200 sm:text-lg">{step.detail}</p>
            <div className="mt-3 flex items-center gap-3">
              <div className="flex-1">
                <ProgressBar value={progress} label="Recipe progress" />
              </div>
              <span className="tnum text-xs font-bold text-slate-200">
                {Math.round(progress * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* remote control bar */}
        <div
          className="flex flex-wrap items-center justify-between gap-3 bg-coal px-4 py-3 sm:px-5"
          role="toolbar"
          aria-label="TV remote controls. Use left and right arrow keys to move the focus."
          tabIndex={0}
          onKeyDown={onKeys}
        >
          <StepDots total={totalSteps} current={stepIndex} />
          <div className="flex items-center gap-2">
            <span className="mr-1 hidden items-center gap-1 rounded-md border border-edge px-2 py-1 text-[11px] font-bold text-slate-400 sm:flex">
              ◀ ▶ D-PAD
            </span>
            {ctrlBtn(0, "Previous step", "prev", prevStep)}
            {ctrlBtn(1, running ? "Pause" : "Play", running ? "pause" : "play", toggleTimer)}
            {ctrlBtn(2, "Next step", "next", nextStep)}
          </div>
        </div>
      </div>
      <p className="sr-only">
        Step {stepIndex + 1} of {totalSteps}: {step.title}. {formatTime(remainingSec)} remaining.
      </p>
    </DeviceShell>
  );
}
