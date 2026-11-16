/*
  Scene generators for the point field. Each one turns a description ("the text
  −60%", "the portrait") into a target position for every point. Coordinates are
  CSS pixels local to the scene's anchor element; the engine adds the anchor's
  live position each frame, so a scene can scroll with the page.
*/

export type KnotGroup = { knots: { active: boolean; hot: boolean }[] }

export type SceneSpec =
  | { kind: "portrait" }
  | { kind: "text"; text: string }
  | { kind: "sheet" }
  | { kind: "furrows" }
  | { kind: "knots"; groups: KnotGroup[] }

export type SceneContext = {
  /** Point count. */
  n: number
  /** Anchor size. */
  w: number
  h: number
  /** Viewport size and anchor origin, so dust can fill the screen rather than the anchor. */
  vw: number
  vh: number
  ax: number
  ay: number
  theme: "dark" | "light"
  displayFont: string
}

export type Target = {
  /** x, y, size, alpha per point. */
  pos: Float32Array
  heat: Float32Array
}

/** Where the four category clusters sit on the skills stage, as fractions of the stage. */
export const KNOT_CENTERS: [number, number][] = [
  [0.29, 0.28],
  [0.73, 0.3],
  [0.27, 0.74],
  [0.72, 0.75],
]

function rng(seed: number) {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function gaussian(rand: () => number) {
  return Math.sqrt(-2 * Math.log(1 - rand())) * Math.cos(2 * Math.PI * rand())
}

function alloc(n: number): Target {
  return { pos: new Float32Array(n * 4), heat: new Float32Array(n) }
}

function put(t: Target, i: number, x: number, y: number, size: number, alpha: number, heat = 0) {
  const o = i * 4
  t.pos[o] = x
  t.pos[o + 1] = y
  t.pos[o + 2] = size
  t.pos[o + 3] = alpha
  t.heat[i] = heat
}

/** Faint points scattered across the whole viewport. Keeps a scene from feeling cut out. */
function dust(t: Target, from: number, ctx: SceneContext, rand: () => number) {
  for (let i = from; i < ctx.n; i++) {
    put(t, i, rand() * ctx.vw - ctx.ax, rand() * ctx.vh - ctx.ay, 0.6 + rand() * 0.8, 0.1 + rand() * 0.2)
  }
}

let portraitData: Promise<ImageData> | null = null

function loadPortrait() {
  portraitData ??= new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement("canvas")
      canvas.width = img.naturalWidth
      canvas.height = img.naturalHeight
      const c = canvas.getContext("2d", { willReadFrequently: true })!
      c.drawImage(img, 0, 0)
      resolve(c.getImageData(0, 0, canvas.width, canvas.height))
    }
    img.onerror = reject
    img.src = "/portrait-map.png"
  })
  return portraitData
}

/*
  public/portrait-map.png is a density map, not a photo: R is point density for a
  dark ground, G for a light ground, B is where the red shirt keeps its colour.
*/
async function portrait(ctx: SceneContext): Promise<Target> {
  const data = await loadPortrait()
  const { width: W, height: H } = data
  const channel = ctx.theme === "dark" ? 0 : 1
  const rand = rng(11)
  const t = alloc(ctx.n)

  const cum = new Float32Array(W * H)
  let total = 0
  for (let i = 0; i < W * H; i++) {
    const v = data.data[i * 4 + channel] / 255
    total += v * v
    cum[i] = total
  }

  const scale = Math.min(ctx.w / W, ctx.h / H)
  const ox = (ctx.w - W * scale) / 2
  const oy = ctx.h - H * scale
  const main = Math.floor(ctx.n * 0.93)

  for (let i = 0; i < main; i++) {
    const r = rand() * total
    let lo = 0
    let hi = cum.length - 1
    while (lo < hi) {
      const mid = (lo + hi) >> 1
      if (cum[mid] < r) lo = mid + 1
      else hi = mid
    }
    const px = lo % W
    const py = (lo / W) | 0
    const p = lo * 4
    const v = data.data[p + channel] / 255
    const heat = data.data[p + 2] / 255
    put(
      t,
      i,
      ox + (px + rand()) * scale,
      oy + (py + rand()) * scale,
      0.7 + v * 1.25 + heat * 0.3,
      0.45 + v * 0.55,
      heat,
    )
  }
  dust(t, main, ctx, rand)
  return t
}

function text(ctx: SceneContext, label: string): Target {
  const rand = rng(label.length * 97 + label.charCodeAt(0))
  const t = alloc(ctx.n)
  const w = Math.max(1, Math.floor(ctx.w))
  const h = Math.max(1, Math.floor(ctx.h))
  const canvas = document.createElement("canvas")
  canvas.width = w
  canvas.height = h
  const c = canvas.getContext("2d", { willReadFrequently: true })!

  // A leading sign is a hairline in a Didone, too thin to hold points. Draw it as a bar.
  const sign = label[0] === "−" || label[0] === "+" ? label[0] : ""
  const body = sign ? label.slice(1) : label
  const signEm = sign ? 0.62 : 0

  c.font = `700 100px ${ctx.displayFont}`
  const m = c.measureText(body)
  const size = Math.min((w * 0.94 * 100) / (m.width + signEm * 100), h * 0.72)

  c.font = `700 ${size}px ${ctx.displayFont}`
  c.textAlign = "center"
  c.textBaseline = "middle"
  c.fillStyle = "#fff"
  c.strokeStyle = "#fff"
  // Didone hairlines are thinner than the point spacing; fatten the mask so they survive.
  c.lineWidth = size * 0.016
  c.lineJoin = "round"
  const signWidth = signEm * size
  const bodyX = w / 2 + signWidth / 2
  c.fillText(body, bodyX, h / 2)
  c.strokeText(body, bodyX, h / 2)
  if (sign) {
    const left = bodyX - c.measureText(body).width / 2 - signWidth
    const bar = signWidth * 0.82
    const weight = size * 0.05
    c.fillRect(left, h / 2 - weight / 2, bar, weight)
    if (sign === "+") c.fillRect(left + bar / 2 - weight / 2, h / 2 - bar / 2, weight, bar)
  }

  const px = c.getImageData(0, 0, w, h).data
  const inside: number[] = []
  for (let i = 0; i < w * h; i++) if (px[i * 4 + 3] > 128) inside.push(i)
  if (inside.length === 0) {
    dust(t, 0, ctx, rand)
    return t
  }

  const main = Math.floor(ctx.n * 0.9)
  for (let i = 0; i < main; i++) {
    const p = inside[(rand() * inside.length) | 0]
    const x = (p % w) + rand()
    const y = ((p / w) | 0) + rand()
    // A clean sweep from hot to cool across the numeral. A narrow band keeps the
    // colours pure; a wide one blends them into salmon.
    const sweep = (x / w) * 0.8 + (y / h) * 0.2
    const hot = Math.min(Math.max((0.62 - sweep) / 0.2, 0), 1)
    put(t, i, x, y, 0.95 + rand() * 0.75, 0.8 + rand() * 0.2, rand() < hot ? 1 : 0)
  }
  dust(t, main, ctx, rand)
  return t
}

/** A rippling contour sheet. Quiet enough to sit behind text. */
function sheet(ctx: SceneContext): Target {
  const rand = rng(5)
  const t = alloc(ctx.n)
  const { w, h } = ctx
  const lines = 72
  for (let i = 0; i < ctx.n; i++) {
    const v = ((i % lines) + 0.5) / lines
    const u = rand()
    const y =
      h *
      (0.5 +
        (v - 0.5) * 0.92 +
        0.13 * Math.sin(u * 5.1 + v * 3.1) +
        0.06 * Math.sin(u * 11.3 - v * 7.4) +
        0.03 * Math.sin(u * 23 + v * 2))
    const crest = 0.5 + 0.5 * Math.sin(u * 6.4 + v * 9.2)
    put(t, i, -0.05 * w + u * 1.1 * w, y, 0.7 + crest * 0.5, 0.09 + crest * crest * 0.3, 0)
  }
  return t
}

/** Planted rows running to a horizon, seeds at even spacing. One row is lit. */
function furrows(ctx: SceneContext): Target {
  const t = alloc(ctx.n)
  const rand = rng(23)
  const { w, h } = ctx
  const horizon = h * 0.56
  const cx = w * 0.5
  const focal = Math.max(w, h) * 0.9
  const camera = 1.25
  const half = 80
  const rows = half * 2
  const steps = Math.floor(ctx.n / rows)
  const zNear = 1.3
  const zFar = 34
  let i = 0
  for (let r = 0; r < rows; r++) {
    // Half-row offset, so no row runs dead centre and reads as a road marking.
    const X = (r - half + 0.5) * 0.24
    const lit = r === half + 7
    for (let k = 0; k < steps; k++) {
      // Even spacing in the world; perspective does the bunching.
      const z = zNear + (k / steps) * (zFar - zNear)
      const swell = 0.16 * Math.sin(z * 0.24 + X * 0.3) + 0.07 * Math.sin(z * 0.6 - X * 0.5)
      const near = 1 - z / zFar
      put(
        t,
        i++,
        cx + (X * focal) / z,
        horizon + ((camera + swell) * focal) / z / 2.4,
        (lit ? 1.2 : 0.8) + near * near * near * 2.8,
        Math.min(1, near * near * (lit ? 1.3 : 0.8) + (lit ? 0.35 : 0.1)),
        lit ? 1 : 0,
      )
    }
  }
  dust(t, i, { ...ctx, vh: horizon, ax: 0, ay: 0, vw: w }, rand)
  return t
}

/** One tight knot per skill, one cluster per category. Filtered-out skills go dim. */
function knots(ctx: SceneContext, groups: KnotGroup[]): Target {
  const rand = rng(41)
  const t = alloc(ctx.n)
  const { w, h } = ctx
  const unit = Math.min(w, h)
  const all = groups.flatMap((g, gi) => g.knots.map((k, ki) => ({ ...k, gi, ki, size: g.knots.length })))
  const activeWeight = 1
  const idleWeight = 0.14
  const sum = all.reduce((s, k) => s + (k.active ? activeWeight : idleWeight), 0)
  const main = Math.floor(ctx.n * 0.93)

  let i = 0
  for (const k of all) {
    const count = Math.floor((main * (k.active ? activeWeight : idleWeight)) / sum)
    const [cx, cy] = KNOT_CENTERS[k.gi % KNOT_CENTERS.length]
    // Sunflower layout: knots spread evenly around the cluster's centre.
    const angle = k.ki * 2.39996 + k.gi
    const radius = unit * 0.2 * Math.sqrt((k.ki + 0.6) / k.size)
    const kx = cx * w + Math.cos(angle) * radius
    const ky = cy * h + Math.sin(angle) * radius
    const spread = unit * (k.hot ? 0.034 : 0.024)
    for (let p = 0; p < count && i < main; p++, i++) {
      const g = gaussian(rand)
      const a = rand() * Math.PI * 2
      put(
        t,
        i,
        kx + Math.cos(a) * g * spread,
        ky + Math.sin(a) * g * spread,
        (k.hot ? 1.5 : 1) + rand() * 0.7,
        k.active ? 0.55 + rand() * 0.45 : 0.16,
        k.hot ? 1 : rand() < 0.05 && k.active ? 1 : 0,
      )
    }
  }
  dust(t, i, ctx, rand)
  return t
}

export async function buildTarget(spec: SceneSpec, ctx: SceneContext): Promise<Target> {
  switch (spec.kind) {
    case "portrait":
      return portrait(ctx)
    case "text":
      return text(ctx, spec.text)
    case "sheet":
      return sheet(ctx)
    case "furrows":
      return furrows(ctx)
    case "knots":
      return knots(ctx, spec.groups)
  }
}
