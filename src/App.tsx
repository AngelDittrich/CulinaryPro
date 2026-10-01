import { SmartTV } from "./components/SmartTV";
import { Smartphone } from "./components/Smartphone";
import { SmartWatch } from "./components/SmartWatch";
import { ControlPanel, Header } from "./components/chrome";
import { Toast } from "./components/ui";
import { SyncProvider } from "./state/SyncContext";
import { useSync } from "./state/useSync";

function Stage() {
  const { toast, dismissToast } = useSync();
  return (
    <div className="relative min-h-screen pb-32">
      {/* ambient background */}
      <div className="pointer-events-none fixed inset-0" aria-hidden="true">
        <div className="absolute -top-32 left-1/2 h-96 w-[60rem] -translate-x-1/2 rounded-full bg-ember/15 blur-[120px]" />
        <div className="absolute bottom-0 left-[-10rem] h-80 w-80 animate-float rounded-full bg-leaf/10 blur-[100px]" />
        <div className="absolute right-[-8rem] top-1/3 h-80 w-80 rounded-full bg-gold/10 blur-[100px]" />
      </div>

      <Header />

      <main className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-14 px-5 pt-8">
        <div className="w-full max-w-5xl">
          <SmartTV />
        </div>
        <div className="grid w-full max-w-4xl items-start gap-14 md:grid-cols-2">
          <Smartphone />
          <SmartWatch />
        </div>
      </main>

      <footer className="relative mx-auto mt-14 flex w-full max-w-7xl flex-wrap items-center justify-center gap-x-6 gap-y-2 px-5 text-center">
        <p className="text-xs font-semibold tracking-wide text-slate-500">
          WCAG AA · 4.5:1 contrast · 44px targets · keyboard + screen-reader ready
        </p>
      </footer>

      <ControlPanel />
      {toast && <Toast key={toast.id} msg={toast.msg} onClose={dismissToast} />}
    </div>
  );
}

export default function App() {
  return (
    <SyncProvider>
      <Stage />
    </SyncProvider>
  );
}
