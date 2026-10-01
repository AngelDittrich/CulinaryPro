import { STEPS } from "../data/recipe";
import { useSync } from "../state/useSync";
import { Icon } from "./icons";

export function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl flex-col items-center gap-5 px-5 pb-2 pt-8 text-center sm:pt-12">
      <div className="flex flex-wrap items-center justify-center gap-2">
        <span className="flex items-center gap-2 rounded-full border border-edge bg-coal/80 py-1.5 pl-2 pr-4">
          <span className="grid size-8 place-items-center rounded-full bg-ember text-white">
            <Icon name="chef" size={18} />
          </span>
          <span className="font-display text-sm font-extrabold tracking-widest text-white">
            CULINARYPRO
          </span>
        </span>
        <span className="flex items-center gap-1.5 rounded-full border border-leaf/40 bg-leaf/10 px-3.5 py-2 text-xs font-extrabold tracking-widest text-mint">
          <Icon name="sync" size={14} />
          SYNCED
        </span>
      </div>

      <h1 className="max-w-3xl font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-white sm:text-6xl">
        One recipe.{" "}
        <span className="bg-gradient-to-r from-ember-soft via-ember to-gold bg-clip-text text-transparent">
          Three screens.
        </span>
      </h1>
      <p className="max-w-xl text-base font-medium text-slate-400 sm:text-lg">
        TV cooks · Phone commands · Watch nudges — all in real time.
      </p>

      <p className="text-xs font-semibold tracking-wide text-slate-500">
        Eduardo Arellanes &amp; Angel Dittrich · UTCH BIS (IT)
      </p>
    </header>
  );
}

export function ControlPanel() {
  const { stepIndex, totalSteps, running, toggleTimer, nextStep, triggerAlert } = useSync();
  const step = STEPS[stepIndex];

  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4">
      <div
        className="flex w-full max-w-2xl flex-wrap items-center justify-center gap-2 rounded-3xl border border-edge bg-coal/90 p-2.5 shadow-2xl shadow-black/60 backdrop-blur-xl sm:rounded-full sm:pl-5"
        role="toolbar"
        aria-label="Simulation controls"
      >
        <div className="mr-auto hidden items-center gap-2.5 sm:flex" aria-live="polite">
          <span className="grid size-10 place-items-center rounded-full bg-ember/20 text-ember-soft">
            <Icon name={step.icon} size={20} />
          </span>
          <span className="text-left leading-tight">
            <span className="block text-[10px] font-bold tracking-[0.2em] text-slate-400">
              STEP {stepIndex + 1}/{totalSteps}
            </span>
            <span className="block max-w-[160px] truncate text-sm font-bold text-white">{step.title}</span>
          </span>
        </div>

        <button
          type="button"
          onClick={nextStep}
          className="flex min-h-12 items-center gap-2 rounded-full bg-ember px-6 font-display text-base font-extrabold text-white shadow-lg shadow-ember/40 transition hover:brightness-110 active:scale-95"
        >
          <Icon name="next" size={20} />
          Next step
        </button>
        <button
          type="button"
          onClick={toggleTimer}
          aria-pressed={running}
          className={`flex min-h-12 items-center gap-2 rounded-full px-6 font-display text-base font-extrabold transition active:scale-95 ${
            running
              ? "bg-gold text-ink shadow-lg shadow-gold/30 hover:brightness-105"
              : "bg-white/10 text-white hover:bg-white/20"
          }`}
        >
          <Icon name={running ? "pause" : "play"} size={20} />
          {running ? "Pause" : "Timer"}
        </button>
        <button
          type="button"
          onClick={() => triggerAlert()}
          className="flex min-h-12 items-center gap-2 rounded-full bg-white/10 px-6 font-display text-base font-extrabold text-white transition hover:bg-white/20 active:scale-95"
        >
          <Icon name="bell" size={20} />
          <span className="hidden sm:inline">Watch alert</span>
          <span className="sm:hidden">Buzz</span>
        </button>
      </div>
    </div>
  );
}
