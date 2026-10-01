import { STEPS, formatTime } from "../data/recipe";
import { useSync } from "../state/useSync";
import { Icon } from "./icons";
import { DeviceShell, Ring } from "./ui";

export function SmartWatch() {
  const {
    stepIndex,
    totalSteps,
    remainingSec,
    stepDuration,
    running,
    alert,
    toggleTimer,
    nextStep,
    clearAlert,
  } = useSync();
  const step = STEPS[stepIndex];

  return (
    <DeviceShell icon="watch" name="Apple Watch" tagline="Glanceable · haptics + gestures">
      <div className="relative mt-14 mb-14">
        {/* crown + side button */}
        <div className="absolute -right-2.5 top-16 h-14 w-2.5 rounded-r-lg bg-slate-600" aria-hidden="true" />
        <div className="absolute -right-2 top-36 h-20 w-2 rounded-r-md bg-slate-700" aria-hidden="true" />
        {/* strap */}
        <div className="absolute -top-10 left-1/2 h-12 w-24 -translate-x-1/2 rounded-t-3xl bg-gradient-to-b from-slate-800 to-slate-700" aria-hidden="true" />
        <div className="absolute -bottom-10 left-1/2 h-12 w-24 -translate-x-1/2 rounded-b-3xl bg-gradient-to-t from-slate-800 to-slate-700" aria-hidden="true" />

        <div
          className={`w-[290px] overflow-hidden rounded-[3.2rem] border-[10px] border-black bg-black shadow-2xl ring-1 ring-edge ${
            alert ? "shadow-ember/40" : "shadow-ember/10"
          }`}
        >
          <div
            role="alert"
            aria-live="assertive"
            className={`relative flex h-[350px] flex-col items-center justify-center gap-2 overflow-hidden bg-gradient-to-b from-coal to-ink px-5 text-center ${
              alert ? "animate-haptic" : ""
            }`}
          >
            {alert ? (
              <div key="alert" className="flex flex-col items-center gap-2">
                <span className="pointer-events-none absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ember animate-ring-ping" aria-hidden="true" />
                <span className="pointer-events-none absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ember-soft animate-ring-ping" style={{ animationDelay: "0.5s" }} aria-hidden="true" />
                <span className="grid size-16 animate-pop place-items-center rounded-full bg-ember text-white shadow-lg shadow-ember/60">
                  <Icon name="bell" size={30} />
                </span>
                <p className="font-display text-3xl font-extrabold tracking-tight text-white">Time's up!</p>
                <p className="max-w-[200px] text-sm font-semibold text-ember-soft">{step.title}</p>
                <button
                  type="button"
                  onClick={clearAlert}
                  className="mt-1 min-h-11 rounded-full bg-ember px-8 font-display text-base font-extrabold text-white shadow-lg shadow-ember/40 transition active:scale-95"
                >
                  Got it
                </button>
              </div>
            ) : (
              <div key={stepIndex} className="flex animate-rise flex-col items-center gap-2">
                <p className="text-[10px] font-bold tracking-[0.25em] text-ember-soft">
                  NOW · {stepIndex + 1}/{totalSteps}
                </p>
                <Ring
                  value={stepDuration ? remainingSec / stepDuration : 0}
                  size={148}
                  stroke={12}
                  label={`${formatTime(remainingSec)} left on ${step.title}`}
                >
                  <div>
                    <p className="tnum font-display text-[34px] font-extrabold leading-none text-white" aria-hidden="true">
                      {formatTime(remainingSec)}
                    </p>
                  </div>
                </Ring>
                <p className="flex items-center gap-1.5 font-display text-xl font-extrabold text-white">
                  <Icon name={step.icon} size={20} className="text-ember-soft" />
                  {step.watch}
                </p>
                <div className="mt-1 flex w-full gap-2">
                  <button
                    type="button"
                    onClick={toggleTimer}
                    aria-label={running ? "Pause step timer" : "Start step timer"}
                    className="grid min-h-11 min-w-11 flex-1 place-items-center rounded-full bg-white/10 text-white transition hover:bg-white/20 active:scale-95"
                  >
                    <Icon name={running ? "pause" : "play"} size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="min-h-11 min-w-11 flex-[2] rounded-full bg-ember font-display text-sm font-extrabold text-white shadow-lg shadow-ember/40 transition hover:brightness-110 active:scale-95"
                  >
                    NEXT STEP
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </DeviceShell>
  );
}
