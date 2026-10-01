# CulinaryPro / KitchenFlow — Multi-Device Live Mockup

Asistente culinario manos libres que sincroniza en tiempo real tres dispositivos:
**Smart TV** (HUD 10-foot) · **iPhone** (command center) · **Apple Watch** (glanceable + háptica).

> **Eduardo Arellanes & Angel Dittrich — UTCH BIS (IT)**

## Demo

```bash
npm install
npm run dev      # abrir http://localhost:5173
```

Todo es interactivo: pulsa **Next step** y TV, iPhone y Watch cambian a la vez;
inicia el temporizador y corre en las tres pantallas; al llegar a cero, el Watch
vibra con alerta háptica. En el iPhone puedes cambiar de pestaña, escanear
ingredientes y tachar la lista de compras.

## 1. Visión general

Un único estado sincronizado (`SyncContext` + reloj global de 1 s) alimenta las
tres vistas. Cada dispositivo conserva su metáfora de interacción:

| Dispositivo | Metáfora | Rol en la receta |
|---|---|---|
| Smart TV | **10-Foot UI**: video HD, timer gigante (15:00), “Step 3 of 6” a 28pt+, foco D-Pad navegable con ◀ ▶ | Mostrar y controlar |
| iPhone | **Touch & Tabs**: Receta, Escáner, Compras, Macros; targets ≥ 44px | Comandar y escanear |
| Watch | **Glanceable**: “Stir 2:00”, anillo circular, [Next Step], vibración animada | Avisar y avanzar |

El *feedback* del sistema es siempre visible: temporizadores activos, progreso
sincronizado, toasts de confirmación y alerta háptica al finalizar cada paso.

## 2. Justificación de usabilidad

- **Una acción, tres reacciones.** “Next step”, “Timer” y “Watch alert” (barra
  inferior) actualizan los tres mockups simultáneamente: la demo *prueba* la
  sincronización en lugar de describirla.
- **Cada pantalla hace lo suyo.** La TV no repite al teléfono: muestra video +
  titulares gigantes; el teléfono gestiona (tabs, escáner láser, checklist,
  macros animados); el reloj solo interrumpe cuando importa (fin de timer).
- **Todo responde al tacto/teclado.** D-Pad con flechas del teclado en la TV,
  tabs con `role="tablist"` en el iPhone, botones ≥ 44px en todas partes;
  cada interacción tiene animación de confirmación (pop, rise, haptic shake).

## 3. Justificación de accesibilidad (WCAG AA)

| Criterio | Implementación |
|---|---|
| **Contraste ≥ 4.5:1** | Fondo `#0F172A`; blanco ≈ 18:1, naranja `#EA580C` ≈ 5.1:1, verde `#16A34A` ≈ 5.5:1 sobre el fondo |
| **Targets ≥ 44×44px** | `min-h-11 min-w-11` en todos los botones de TV, teléfono y reloj |
| **Teclado** | Foco `:focus-visible` naranja de 3px en todo; D-Pad con ◀ ▶ + anillo de foco |
| **Lector de pantalla** | HTML semántico (`header/main/nav/h1-h3`), `aria-labels`, `role="progressbar/tab/alert"`, `aria-live` en paso actual y minutos restantes |
| **Movimiento** | `prefers-reduced-motion` desactiva animaciones |

## Estructura

```
src/
├── data/recipe.ts          # receta, ingredientes, macros (6 pasos)
├── state/                  # SyncContext (estado global) + useSync
├── components/
│   ├── icons.tsx           # set SVG propio (30 iconos)
│   ├── ui.tsx              # Ring, ProgressBar, StepDots, Toast
│   ├── SmartTV.tsx         # marco 16:9 + ilustración SVG del platillo
│   ├── Smartphone.tsx      # 4 tabs: Recipe / Scanner / Shopping / Macros
│   ├── SmartWatch.tsx      # glance + alerta háptica
│   └── chrome.tsx          # header + barra de simulación
└── App.tsx
```
