import type { IconName } from "../components/icons";

export interface RecipeStep {
  id: number;
  kicker: string;
  title: string;
  /** short glance text for the watch */
  watch: string;
  detail: string;
  durationSec: number;
  temp?: string;
  icon: IconName;
}

export const RECIPE_TITLE = "Salmon & Veggies";
export const RECIPE_SUB = "Oven-baked · 6 steps";

export const STEPS: RecipeStep[] = [
  {
    id: 0,
    kicker: "Prep",
    title: "Preheat the oven",
    watch: "Preheat",
    detail: "180°C · 350°F",
    durationSec: 600,
    temp: "180°C",
    icon: "flame",
  },
  {
    id: 1,
    kicker: "Season",
    title: "Season & chop",
    watch: "Season",
    detail: "Salt · pepper · veggies",
    durationSec: 300,
    icon: "spark",
  },
  {
    id: 2,
    kicker: "Bake",
    title: "Bake at 180°C",
    watch: "Bake",
    detail: "Salmon + vegetables in",
    durationSec: 900,
    temp: "180°C",
    icon: "fish",
  },
  {
    id: 3,
    kicker: "Stir",
    title: "Stir for 2 min",
    watch: "Stir 2:00",
    detail: "Toss the vegetables",
    durationSec: 120,
    icon: "stir",
  },
  {
    id: 4,
    kicker: "Finish",
    title: "Lemon & herbs",
    watch: "Finish",
    detail: "Fresh lemon · dill",
    durationSec: 180,
    icon: "lemon",
  },
  {
    id: 5,
    kicker: "Serve",
    title: "Rest & serve",
    watch: "Serve",
    detail: "Rest 5 min · plate it",
    durationSec: 300,
    icon: "plate",
  },
];

export interface Ingredient {
  id: string;
  name: string;
  qty: string;
  icon: IconName;
}

export const INGREDIENTS: Ingredient[] = [
  { id: "salmon", name: "Salmon fillet", qty: "220 g", icon: "fish" },
  { id: "carrot", name: "Baby carrots", qty: "300 g", icon: "carrot" },
  { id: "lemon", name: "Lemon", qty: "1 pc", icon: "lemon" },
  { id: "dill", name: "Fresh dill", qty: "1 bunch", icon: "leaf" },
  { id: "oil", name: "Olive oil", qty: "2 tbsp", icon: "drop" },
  { id: "salt", name: "Sea salt", qty: "to taste", icon: "spark" },
];

export interface ShopItem {
  id: string;
  name: string;
  qty: string;
  done: boolean;
}

export const SHOPPING: ShopItem[] = [
  { id: "s1", name: "Salmon fillets", qty: "×2", done: true },
  { id: "s2", name: "Baby carrots", qty: "300 g", done: false },
  { id: "s3", name: "Lemon", qty: "×1", done: false },
  { id: "s4", name: "Fresh dill", qty: "×1", done: false },
  { id: "s5", name: "Olive oil", qty: "×1", done: true },
];

export interface Macro {
  label: string;
  grams: number;
  pct: number;
  color: string;
}

export const MACROS: Macro[] = [
  { label: "Protein", grams: 38, pct: 42, color: "#fb923c" },
  { label: "Carbs", grams: 24, pct: 27, color: "#4ade80" },
  { label: "Fat", grams: 21, pct: 31, color: "#fbbf24" },
];

export const KCAL = 486;

export function formatTime(totalSec: number): string {
  const s = Math.max(0, Math.round(totalSec));
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
}
