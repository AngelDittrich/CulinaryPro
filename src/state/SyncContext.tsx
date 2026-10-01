import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { INGREDIENTS, SHOPPING, STEPS } from "../data/recipe";
import type { ShopItem } from "../data/recipe";

export type PhoneTab = "recipe" | "scanner" | "shopping" | "nutrition";

interface Toast {
  id: number;
  msg: string;
}

export interface SyncApi {
  stepIndex: number;
  totalSteps: number;
  progress: number;
  remainingSec: number;
  stepDuration: number;
  running: boolean;
  alert: boolean;
  toast: Toast | null;
  phoneTab: PhoneTab;
  scannedIds: string[];
  shop: ShopItem[];
  pendingCount: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (i: number) => void;
  toggleTimer: () => void;
  triggerAlert: (msg?: string) => void;
  clearAlert: () => void;
  setPhoneTab: (t: PhoneTab) => void;
  scanNext: () => void;
  toggleShopItem: (id: string) => void;
  dismissToast: () => void;
}

const SyncContext = createContext<SyncApi | null>(null);

export { SyncContext };

let toastSeq = 0;

export function SyncProvider({ children }: { children: ReactNode }) {
  const [stepIndex, setStepIndex] = useState(2); // start at "Bake at 180°C" for instant wow
  const [remainingSec, setRemainingSec] = useState(STEPS[2].durationSec);
  const [running, setRunning] = useState(false);
  const [alert, setAlert] = useState(false);
  const [toast, setToast] = useState<Toast | null>(null);
  const [phoneTab, setPhoneTab] = useState<PhoneTab>("scanner");
  const [scannedIds, setScannedIds] = useState<string[]>(["salmon", "carrot"]);
  const [shop, setShop] = useState<ShopItem[]>(SHOPPING);
  const alertTimer = useRef<number | null>(null);
  const toastTimer = useRef<number | null>(null);

  const showToast = useCallback((msg: string) => {
    toastSeq += 1;
    setToast({ id: toastSeq, msg });
  }, []);

  const jumpTo = useCallback(
    (i: number, silent = false) => {
      const clamped = ((i % STEPS.length) + STEPS.length) % STEPS.length;
      setStepIndex(clamped);
      setRemainingSec(STEPS[clamped].durationSec);
      setRunning(true);
      setAlert(false);
      if (!silent && clamped === 0 && i >= STEPS.length) {
        showToast("Recipe restarted — back to step 1");
      }
    },
    [showToast],
  );

  const nextStep = useCallback(() => jumpTo(stepIndex + 1), [jumpTo, stepIndex]);
  const prevStep = useCallback(() => jumpTo(stepIndex - 1, true), [jumpTo, stepIndex]);
  const goToStep = useCallback((i: number) => jumpTo(i, true), [jumpTo]);
  const toggleTimer = useCallback(() => setRunning((r) => !r), []);

  const triggerAlert = useCallback(
    (msg = "Watch is buzzing — check it!") => {
      setAlert(true);
      showToast(msg);
    },
    [showToast],
  );

  const clearAlert = useCallback(() => {
    setAlert(false);
    if (alertTimer.current) window.clearTimeout(alertTimer.current);
  }, []);

  const scanNext = useCallback(() => {
    const next = INGREDIENTS.find((g) => !scannedIds.includes(g.id));
    if (!next) {
      showToast("All ingredients scanned");
      return;
    }
    setScannedIds((ids) => [...ids, next.id]);
    showToast(`Scanned: ${next.name}`);
  }, [scannedIds, showToast]);

  const toggleShopItem = useCallback((id: string) => {
    setShop((items) => items.map((it) => (it.id === id ? { ...it, done: !it.done } : it)));
  }, []);

  const dismissToast = useCallback(() => setToast(null), []);

  // 1-second kitchen clock shared by all three devices
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => {
      setRemainingSec((s) => {
        if (s <= 1) {
          window.clearInterval(id);
          setRunning(false);
          setAlert(true);
          showToast(`Time's up — ${STEPS[stepIndex].title}!`);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => window.clearInterval(id);
  }, [running, stepIndex, showToast]);

  // haptic demo auto-calms after 10 s
  useEffect(() => {
    if (!alert) return;
    alertTimer.current = window.setTimeout(() => setAlert(false), 10000);
    return () => {
      if (alertTimer.current) window.clearTimeout(alertTimer.current);
    };
  }, [alert]);

  // toasts fade after 3.5 s
  useEffect(() => {
    if (!toast) return;
    toastTimer.current = window.setTimeout(() => setToast(null), 3500);
    return () => {
      if (toastTimer.current) window.clearTimeout(toastTimer.current);
    };
  }, [toast]);

  const value = useMemo<SyncApi>(
    () => ({
      stepIndex,
      totalSteps: STEPS.length,
      progress: (stepIndex + 1) / STEPS.length,
      remainingSec,
      stepDuration: STEPS[stepIndex].durationSec,
      running,
      alert,
      toast,
      phoneTab,
      scannedIds,
      shop,
      pendingCount: shop.filter((s) => !s.done).length,
      nextStep,
      prevStep,
      goToStep,
      toggleTimer,
      triggerAlert,
      clearAlert,
      setPhoneTab,
      scanNext,
      toggleShopItem,
      dismissToast,
    }),
    [
      stepIndex,
      remainingSec,
      running,
      alert,
      toast,
      phoneTab,
      scannedIds,
      shop,
      nextStep,
      prevStep,
      goToStep,
      toggleTimer,
      triggerAlert,
      clearAlert,
      scanNext,
      toggleShopItem,
      dismissToast,
    ],
  );

  return <SyncContext.Provider value={value}>{children}</SyncContext.Provider>;
}
