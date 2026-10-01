import { INGREDIENTS, KCAL, MACROS, RECIPE_SUB, RECIPE_TITLE, STEPS, formatTime } from "../data/recipe";
import { useSync } from "../state/useSync";
import type { PhoneTab } from "../state/SyncContext";
import { Icon } from "./icons";
import type { IconName } from "./icons";
import { DeviceShell, ProgressBar, Ring } from "./ui";

const TABS: { id: PhoneTab; label: string; icon: IconName }[] = [
  { id: "recipe", label: "Recipe", icon: "list" },
  { id: "scanner", label: "Scanner", icon: "barcode" },
  { id: "shopping", label: "Shopping", icon: "cart" },
  { id: "nutrition", label: "Macros", icon: "chart" },
];

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-4 text-white" aria-hidden="true">
      <span className="tnum text-sm font-bold">9:41</span>
      <span className="flex items-center gap-1.5 text-white">
        <Icon name="signal" size={15} />
        <Icon name="wifi" size={15} />
        <Icon name="battery" size={20} />
      </span>
    </div>
  );
}

function RecipeTab() {
  const { stepIndex, goToStep } = useSync();
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-bold tracking-[0.2em] text-ember-soft">TONIGHT'S RECIPE</p>
      <h3 className="font-display text-2xl font-extrabold leading-tight text-white">{RECIPE_TITLE}</h3>
      <p className="mb-1 text-xs font-medium text-slate-400">{RECIPE_SUB}</p>
      {STEPS.map((s, i) => {
        const active = i === stepIndex;
        const done = i < stepIndex;
        return (
          <button
            key={s.id}
            type="button"
            onClick={() => goToStep(i)}
            aria-label={`Go to step ${i + 1}: ${s.title}`}
            aria-current={active ? "step" : undefined}
            className={`flex min-h-11 items-center gap-3 rounded-2xl border p-2.5 text-left transition-all duration-300 active:scale-[0.98] ${
              active
                ? "border-ember bg-ember/15 shadow-[0_0_20px_rgba(234,88,12,0.35)]"
                : "border-edge/60 bg-white/[0.04] hover:border-slate-500"
            }`}
          >
            <span
              className={`grid size-10 shrink-0 place-items-center rounded-xl ${
                active ? "bg-ember text-white" : done ? "bg-leaf/20 text-mint" : "bg-white/10 text-slate-300"
              }`}
            >
              <Icon name={done ? "check" : s.icon} size={20} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block truncate text-sm font-bold text-white">
                {i + 1}. {s.title}
              </span>
              <span className="tnum block text-xs text-slate-400">{formatTime(s.durationSec)}</span>
            </span>
            {active && <Icon name="play" size={16} className="shrink-0 text-ember-soft" />}
          </button>
        );
      })}
    </div>
  );
}

function ScannerTab() {
  const { scannedIds, scanNext } = useSync();
  const allDone = scannedIds.length >= INGREDIENTS.length;
  return (
    <div className="flex flex-col gap-3">
      <p className="text-[11px] font-bold tracking-[0.2em] text-ember-soft">INGREDIENT SCANNER</p>

      {/* viewfinder */}
      <div className="relative overflow-hidden rounded-3xl border border-edge bg-black/60 p-4">
        <div className="relative mx-auto w-fit rounded-xl bg-white px-6 py-4" role="img" aria-label="Barcode being scanned">
          <svg width="150" height="56" viewBox="0 0 150 56" aria-hidden="true">
            {Array.from({ length: 30 }, (_, i) => {
              const w = [3, 1.5, 4.5, 2, 3, 1.5][i % 6];
              const x = i * 5;
              return <rect key={i} x={x} y="2" width={w} height="52" fill="#0f172a" />;
            })}
          </svg>
          <div className="absolute inset-x-3 h-0.5 animate-scan rounded-full bg-ember shadow-[0_0_14px_4px_rgba(234,88,12,0.8)]" aria-hidden="true" />
        </div>
        <p className="tnum mt-3 text-center text-xs font-bold tracking-[0.3em] text-slate-300">8 901234 567890</p>
        <div className="pointer-events-none absolute inset-3" aria-hidden="true">
          {["left-0 top-0 border-l-4 border-t-4 rounded-tl-xl", "right-0 top-0 border-r-4 border-t-4 rounded-tr-xl", "bottom-0 left-0 border-b-4 border-l-4 rounded-bl-xl", "bottom-0 right-0 border-b-4 border-r-4 rounded-br-xl"].map(
            (c) => (
              <span key={c} className={`absolute h-7 w-7 border-ember-soft ${c}`} />
            ),
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={scanNext}
        disabled={allDone}
        className="flex min-h-14 items-center justify-center gap-2 rounded-2xl bg-ember font-display text-base font-extrabold text-white shadow-lg shadow-ember/40 transition-all hover:brightness-110 active:scale-[0.98] disabled:bg-edge disabled:text-slate-400 disabled:shadow-none"
      >
        <Icon name="barcode" size={22} />
        {allDone ? "All scanned" : "Scan ingredient"}
      </button>

      <div className="flex items-center justify-between">
        <p className="text-xs font-bold tracking-widest text-slate-400">
          SCANNED {scannedIds.length}/{INGREDIENTS.length}
        </p>
      </div>
      <ProgressBar value={scannedIds.length / INGREDIENTS.length} label="Ingredients scanned" barClass="bg-gradient-to-r from-leaf to-mint" />

      <ul className="flex flex-col gap-1.5">
        {INGREDIENTS.map((g) => {
          const found = scannedIds.includes(g.id);
          return (
            <li
              key={`${g.id}-${found ? "y" : "n"}`}
              className={`flex items-center gap-2.5 rounded-xl border px-3 py-2 ${
                found ? "animate-pop border-leaf/50 bg-leaf/10" : "border-edge/50 bg-white/[0.03] opacity-60"
              }`}
            >
              <span className={`grid size-8 place-items-center rounded-lg ${found ? "bg-leaf/20 text-mint" : "bg-white/10 text-slate-400"}`}>
                <Icon name={g.icon} size={17} />
              </span>
              <span className="flex-1 text-sm font-semibold text-white">{g.name}</span>
              <span className="tnum text-xs text-slate-400">{g.qty}</span>
              {found && <Icon name="check" size={16} className="text-mint" />}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ShoppingTab() {
  const { shop, toggleShopItem, pendingCount } = useSync();
  return (
    <div className="flex flex-col gap-2">
      <p className="text-[11px] font-bold tracking-[0.2em] text-ember-soft">SHOPPING LIST</p>
      <h3 className="font-display text-2xl font-extrabold text-white">
        {pendingCount === 0 ? "All packed!" : `${pendingCount} to buy`}
      </h3>
      <ul className="flex flex-col gap-2">
        {shop.map((it) => (
          <li key={it.id}>
            <button
              type="button"
              onClick={() => toggleShopItem(it.id)}
              aria-pressed={it.done}
              aria-label={`${it.name}, ${it.done ? "packed" : "to buy"}. Tap to toggle.`}
              className={`flex min-h-14 w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-300 active:scale-[0.98] ${
                it.done ? "border-leaf/40 bg-leaf/10" : "border-edge/60 bg-white/[0.04] hover:border-slate-500"
              }`}
            >
              <span
                className={`grid size-8 shrink-0 place-items-center rounded-full border-2 transition-all ${
                  it.done ? "border-leaf bg-leaf text-white" : "border-slate-500 text-transparent"
                }`}
                aria-hidden="true"
              >
                <Icon name="check" size={16} />
              </span>
              <span className={`flex-1 text-sm font-bold ${it.done ? "text-slate-400 line-through" : "text-white"}`}>
                {it.name}
              </span>
              <span className="tnum rounded-lg bg-white/10 px-2 py-1 text-xs font-bold text-slate-300">{it.qty}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function NutritionTab() {
  return (
    <div className="flex flex-col items-center gap-4">
      <p className="self-start text-[11px] font-bold tracking-[0.2em] text-ember-soft">NUTRITION PROFILE</p>
      <Ring value={0.68} size={150} bar="#fbbf24" label={`${KCAL} kilocalories per serving, 68 percent of meal target`}>
        <div className="text-center">
          <p className="tnum font-display text-4xl font-extrabold text-white">{KCAL}</p>
          <p className="text-[11px] font-bold tracking-widest text-slate-400">KCAL / SERVING</p>
        </div>
      </Ring>
      <ul className="flex w-full flex-col gap-3">
        {MACROS.map((m, i) => (
          <li key={m.label}>
            <div className="mb-1 flex items-baseline justify-between">
              <span className="text-sm font-bold text-white">{m.label}</span>
              <span className="tnum text-sm font-bold" style={{ color: m.color }}>
                {m.grams}g · {m.pct}%
              </span>
            </div>
            <div
              className="h-3.5 overflow-hidden rounded-full bg-edge/70"
              role="img"
              aria-label={`${m.label}: ${m.grams} grams, ${m.pct} percent`}
            >
              <div
                className="h-full rounded-full"
                style={{
                  width: `${m.pct}%`,
                  backgroundColor: m.color,
                  transition: "width 1s cubic-bezier(0.22,1,0.36,1)",
                  transitionDelay: `${i * 120}ms`,
                }}
              />
            </div>
          </li>
        ))}
      </ul>
      <div className="flex w-full items-center gap-2 rounded-2xl border border-leaf/40 bg-leaf/10 p-3">
        <Icon name="leaf" size={22} className="shrink-0 text-mint" />
        <p className="text-xs font-semibold text-mint">High-protein · omega-3 rich · gluten-free</p>
      </div>
    </div>
  );
}

export function Smartphone() {
  const { phoneTab, setPhoneTab, scannedIds, pendingCount } = useSync();
  const badge = (id: PhoneTab): number | null => {
    if (id === "scanner") return INGREDIENTS.length - scannedIds.length || null;
    if (id === "shopping") return pendingCount || null;
    return null;
  };

  return (
    <DeviceShell icon="phone" name="iPhone" tagline="Command center · touch + tabs">
      <div className="w-full max-w-[340px] rounded-[3rem] border-[10px] border-black bg-black shadow-2xl shadow-ember/10 ring-1 ring-edge">
        <div className="overflow-hidden rounded-[2.3rem] bg-gradient-to-b from-coal to-ink">
          <div className="relative">
            <StatusBar />
            <div className="absolute left-1/2 top-3.5 h-6 w-24 -translate-x-1/2 rounded-full bg-black" aria-hidden="true" />
          </div>

          <div
            key={phoneTab}
            className="slim-scroll h-[520px] animate-rise overflow-y-auto px-4 pb-4 pt-2"
            role="tabpanel"
            aria-label={`${phoneTab} tab`}
          >
            {phoneTab === "recipe" && <RecipeTab />}
            {phoneTab === "scanner" && <ScannerTab />}
            {phoneTab === "shopping" && <ShoppingTab />}
            {phoneTab === "nutrition" && <NutritionTab />}
          </div>

          <nav aria-label="Phone sections" className="border-t border-edge/70 bg-black/50 px-2 pb-5 pt-2">
            <div role="tablist" aria-label="Phone tabs" className="grid grid-cols-4 gap-1">
              {TABS.map((t) => {
                const active = phoneTab === t.id;
                const b = badge(t.id);
                return (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={active}
                    aria-label={t.label}
                    type="button"
                    onClick={() => setPhoneTab(t.id)}
                    className={`relative flex min-h-14 flex-col items-center justify-center gap-1 rounded-2xl transition-all duration-200 active:scale-95 ${
                      active ? "bg-ember/20 text-ember-soft" : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Icon name={t.icon} size={22} />
                    <span className="text-[10px] font-bold">{t.label}</span>
                    {active && <span className="absolute -top-2 h-1 w-8 rounded-full bg-ember" aria-hidden="true" />}
                    {b !== null && (
                      <span className="absolute right-2 top-1 grid size-5 place-items-center rounded-full bg-ember text-[10px] font-extrabold text-white" aria-hidden="true">
                        {b}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </DeviceShell>
  );
}
