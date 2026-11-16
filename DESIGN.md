# The Field: design language

The site is one living cloud of points that never reloads. It forms a portrait, then each
project's real number, then a planted field at the horizon. Raw data resolving into something
legible is what the work itself does, so the interface makes that argument instead of describing it.

**Theme:** precise, luminous, classical. Didone type against machine-stippled points.

## Rules

- **The field carries data, never decoration.** Every scene is a real thing: the portrait, a
  measured result, a year, one knot per skill. Don't add a scene that only looks nice.
- **Anything the field says is also in the DOM.** Numerals are `aria-hidden`; the chapter text
  repeats them. The page must read completely without WebGL.
- **One accent.** Infrared comes from the shirt in the portrait. It means heat: the cursor,
  emphasis, the lit row. Never use it as a second neutral.
- **Quiet behind text.** Long text sits on the `sheet` scene, the dimmest one.

## Tokens

Defined in `app/globals.css`: primitive -> semantic -> component. Components use semantic names only.

| Primitive | Value | Semantic use (carbon / paper) |
|---|---|---|
| `carbon-950` | `#0a0a0c` | `background` / - |
| `bone-100` | `#ece8df` | - / `background` |
| `bone-50` | `#f4f0e8` | `foreground` / `card` |
| `carbon-900` | `#121215` | `card` / `foreground` |
| `bone-300` | `#c9c4b9` | `body` / `border` |
| `bone-700` | `#3b3833` | - / `body` |
| `bone-400` | `#98948b` | `muted-foreground` / `rule` |
| `bone-600` | `#5e5a53` | `rule` / `muted-foreground` |
| `infrared-400` | `#ff5a3c` | `brand` / - |
| `infrared-600` | `#b92f13` | - / `brand` |

Component tokens: `--field-ink` and `--field-heat`. The engine parses these, so they must stay 6-digit hex.

Contrast on `background` (WCAG AA needs 4.5:1):

| Role | Carbon | Paper |
|---|---|---|
| foreground | 17.4 | 15.3 |
| body | 11.4 | 9.5 |
| muted | 6.5 | 5.6 |
| brand | 6.4 | 4.9 |

Carbon is the default theme. Paper turns the portrait into an engraving, and it is a full theme, not an afterthought.

## Type

| Role | Face | Class |
|---|---|---|
| Hero and page titles | Bodoni Moda, opsz 40 | `.display .display-xl` |
| Headings | Bodoni Moda, opsz 14 | `.display` |
| Body | Geist | default |
| Labels | Geist Mono, 11px caps | `.eyebrow` |

Keep the optical size pinned. At the top of the axis, hairlines and hyphens vanish on a dark ground.
Use italic for emphasis, not bold.

## Motion

- Scene morph: 1350ms, per-point stagger, points arc rather than travel straight.
- Intro: 2800ms, from scatter to portrait.
- Scroll reveals use CSS scroll timelines, so unsupported browsers just show the content.
- `prefers-reduced-motion`: scenes snap, drift and cursor response stop, reveals are off.

## Adding a scene

Wrap content in `<Scene spec={...} anchor="#stage">`. The field forms `spec` while that element
crosses the reading line (55% down the viewport). Scene kinds live in `lib/field/scenes.ts`:
`portrait`, `text`, `sheet`, `furrows`, `knots`. Point at a `[data-anchor]` child for a per-item
stage on phones, as `components/metric-chapters.tsx` does.

## Portrait map

`public/portrait-map.png` is data, not a photo. R is point density on dark, G is density on light,
B is where the shirt stays red. If the headshot changes, regenerate it: person mask, then
tone-mapped density with a floor so dark hair and beard stay visible.
