/*
  The point field: one WebGL2 draw call that lives for the whole visit. Pages never
  own it. They register scenes (see components/field/scene.tsx), and the engine morphs
  to whichever scene sits on the reading line, so a route change is a re-formation
  of the same points rather than a cut.

  All motion runs in the vertex shader. The CPU only touches the buffers when a
  scene changes.
*/
import { buildTarget, type SceneContext, type SceneSpec, type Target } from "./scenes"

export type Trigger = {
  el: HTMLElement
  spec: SceneSpec
  /** Selector for the element the scene is drawn into. Falls back to [data-anchor], then the trigger. */
  anchor?: string
}

const triggers = new Set<Trigger>()

export function registerTrigger(trigger: Trigger) {
  triggers.add(trigger)
  return () => void triggers.delete(trigger)
}

let agitation = 0

/** Stirs the field. The assistant uses it while it is retrieving an answer. */
export function setFieldAgitation(level: number) {
  agitation = level
}

const VERT = `#version 300 es
in vec4 aFrom;
in vec4 aTo;
in vec4 aMisc; // heat from, heat to, seed a, seed b
uniform vec2 uRes;
uniform vec2 uToOff;
uniform vec2 uMouse;
uniform float uT;
uniform float uTime;
uniform float uMouseAmp;
uniform float uStir;
uniform float uDpr;
out float vAlpha;
out float vHeat;

float ease(float x) {
  return x < 0.5 ? 4.0 * x * x * x : 1.0 - pow(-2.0 * x + 2.0, 3.0) / 2.0;
}

void main() {
  float e = ease(clamp((uT - aMisc.z * 0.38) / 0.62, 0.0, 1.0));
  vec2 a = aFrom.xy;
  vec2 b = aTo.xy + uToOff;
  vec2 p = mix(a, b, e);

  // Points arc between scenes rather than travelling in straight lines.
  float arc = sin(3.14159265 * e);
  vec2 d = b - a;
  p += vec2(-d.y, d.x) * (aMisc.w - 0.5) * 0.55 * arc;

  float phase = aMisc.w * 6.2831853;
  float breathe = 0.9 + uStir * 16.0;
  p += vec2(
    sin(uTime * 0.55 + phase + p.y * 0.012),
    cos(uTime * 0.47 + phase * 1.3 + p.x * 0.012)
  ) * breathe;

  // The cursor is heat: it warms and scatters the points. Each moves in its own random
  // direction. Any outward push empties the centre, and a dark hole with a red rim
  // reads as a wound on the portrait.
  vec2 m = p - uMouse;
  float dist = length(m) + 0.001;
  float f = smoothstep(190.0, 0.0, dist) * uMouseAmp;
  f *= f;
  p += vec2(cos(phase + uTime * 0.9), sin(phase * 1.7 - uTime * 0.7)) * f * (10.0 + 26.0 * aMisc.z);

  float heat = mix(aMisc.x, aMisc.y, e) + f * 0.8 + arc * 0.3 + uStir * 0.25 * aMisc.w;
  float size = mix(aFrom.z, aTo.z, e);

  vHeat = heat;
  vAlpha = mix(aFrom.w, aTo.w, e) + f * 0.3;
  gl_PointSize = size * uDpr * (1.0 + f * 0.7);
  vec2 clip = p / uRes * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
}`

const FRAG = `#version 300 es
precision mediump float;
in float vAlpha;
in float vHeat;
uniform vec3 uInk;
uniform vec3 uHot;
out vec4 color;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float a = smoothstep(0.25, 0.08, dot(c, c)) * clamp(vAlpha, 0.0, 1.0);
  color = vec4(mix(uInk, uHot, clamp(vHeat, 0.0, 1.0)) * a, a);
}`

function hexToRgb(value: string): [number, number, number] {
  const hex = value.trim().replace("#", "")
  return [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255) as [number, number, number]
}

function compile(gl: WebGL2RenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)!
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    throw new Error(gl.getShaderInfoLog(shader) ?? "Shader failed to compile")
  }
  return shader
}

const MORPH_MS = 1350
const INTRO_MS = 2800

export class FieldEngine {
  private gl: WebGL2RenderingContext
  private n: number
  private dpr: number
  private from: Float32Array
  private to: Float32Array
  private misc: Float32Array
  private bufFrom: WebGLBuffer
  private bufTo: WebGLBuffer
  private bufMisc: WebGLBuffer
  private u: Record<string, WebGLUniformLocation | null> = {}

  private cache = new Map<string, Target>()
  private active: { trigger: Trigger | null; anchor: HTMLElement | null; key: string } | null = null
  private request = 0
  private started = false
  private morphStart = 0
  private morphMs = INTRO_MS
  private offset: [number, number] = [0, 0]

  private mouse = { x: -9999, y: -9999, amp: 0, lastMove: -1e9 }
  private stir = 0
  private lastScroll = 0
  private raf = 0
  private clock = 0
  private lastFrame = 0
  private still: boolean
  private observer: MutationObserver
  private resizeTimer = 0
  private drawCount: number
  private frameSum = 0
  private frameCount = 0

  constructor(private canvas: HTMLCanvasElement) {
    const gl = canvas.getContext("webgl2", { alpha: true, antialias: false, premultipliedAlpha: true })
    if (!gl) throw new Error("WebGL2 unavailable")
    this.gl = gl

    this.still = matchMedia("(prefers-reduced-motion: reduce)").matches
    const small = innerWidth < 768
    this.n = small ? 20000 : 56000
    this.dpr = Math.min(devicePixelRatio || 1, small ? 1.75 : 2)

    this.drawCount = this.n

    this.from = new Float32Array(this.n * 4)
    this.to = new Float32Array(this.n * 4)
    this.misc = new Float32Array(this.n * 4)
    for (let i = 0; i < this.n; i++) {
      this.from[i * 4] = Math.random() * innerWidth
      this.from[i * 4 + 1] = Math.random() * innerHeight
      this.from[i * 4 + 2] = 1
      this.misc[i * 4 + 2] = Math.random()
      this.misc[i * 4 + 3] = Math.random()
    }

    const program = gl.createProgram()!
    gl.attachShader(program, compile(gl, gl.VERTEX_SHADER, VERT))
    gl.attachShader(program, compile(gl, gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) ?? "Program failed to link")
    }
    gl.useProgram(program)

    const attribute = (name: string, data: Float32Array) => {
      const buffer = gl.createBuffer()!
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, data, gl.DYNAMIC_DRAW)
      const location = gl.getAttribLocation(program, name)
      gl.enableVertexAttribArray(location)
      gl.vertexAttribPointer(location, 4, gl.FLOAT, false, 0, 0)
      return buffer
    }
    this.bufFrom = attribute("aFrom", this.from)
    this.bufTo = attribute("aTo", this.to)
    this.bufMisc = attribute("aMisc", this.misc)

    for (const name of ["uRes", "uToOff", "uMouse", "uT", "uTime", "uMouseAmp", "uStir", "uDpr", "uInk", "uHot"]) {
      this.u[name] = gl.getUniformLocation(program, name)
    }

    gl.enable(gl.BLEND)
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
    gl.clearColor(0, 0, 0, 0)

    this.resize()
    this.readColors()

    addEventListener("resize", this.onResize)
    addEventListener("pointermove", this.onPointer, { passive: true })
    document.addEventListener("visibilitychange", this.onVisibility)
    this.observer = new MutationObserver(() => {
      this.readColors()
      this.active = null // a theme flip re-samples the portrait
    })
    this.observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })

    this.lastScroll = scrollY
    this.lastFrame = performance.now()
    this.raf = requestAnimationFrame(this.frame)
  }

  destroy() {
    cancelAnimationFrame(this.raf)
    removeEventListener("resize", this.onResize)
    removeEventListener("pointermove", this.onPointer)
    document.removeEventListener("visibilitychange", this.onVisibility)
    this.observer.disconnect()
  }

  private get theme() {
    return document.documentElement.classList.contains("dark") ? ("dark" as const) : ("light" as const)
  }

  private readColors() {
    const style = getComputedStyle(document.documentElement)
    this.gl.uniform3fv(this.u.uInk, hexToRgb(style.getPropertyValue("--field-ink")))
    this.gl.uniform3fv(this.u.uHot, hexToRgb(style.getPropertyValue("--field-heat")))
  }

  private resize() {
    const { canvas, gl, dpr } = this
    canvas.width = Math.round(innerWidth * dpr)
    canvas.height = Math.round(innerHeight * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
    gl.uniform2f(this.u.uRes, innerWidth, innerHeight)
    gl.uniform1f(this.u.uDpr, dpr)
  }

  private onResize = () => {
    clearTimeout(this.resizeTimer)
    this.resizeTimer = window.setTimeout(() => {
      this.resize()
      this.active = null
    }, 180)
  }

  private onPointer = (event: PointerEvent) => {
    if (this.still) return
    this.mouse.x = event.clientX
    this.mouse.y = event.clientY
    this.mouse.lastMove = performance.now()
  }

  private onVisibility = () => {
    cancelAnimationFrame(this.raf)
    if (!document.hidden) {
      this.lastFrame = performance.now()
      this.raf = requestAnimationFrame(this.frame)
    }
  }

  private resolveAnchor(trigger: Trigger): HTMLElement | null {
    const visible = (el: Element | null): el is HTMLElement => !!el && (el as HTMLElement).offsetWidth > 0
    const selected = trigger.anchor ? [...document.querySelectorAll(trigger.anchor)].find(visible) : null
    if (selected) return selected as HTMLElement
    const own = trigger.el.querySelector("[data-anchor]")
    if (visible(own)) return own
    return trigger.el
  }

  /** The scene on the reading line, a little below the middle of the screen. */
  private pick(): Trigger | null {
    const line = innerHeight * 0.55
    let best: Trigger | null = null
    let bestHeight = Infinity
    for (const trigger of triggers) {
      const rect = trigger.el.getBoundingClientRect()
      if (rect.top <= line && rect.bottom > line && rect.height < bestHeight) {
        best = trigger
        bestHeight = rect.height
      }
    }
    return best
  }

  private async retarget(trigger: Trigger | null, key: string) {
    const ticket = ++this.request
    const spec: SceneSpec = trigger?.spec ?? { kind: "sheet" }
    const anchor = trigger && spec.kind !== "sheet" ? this.resolveAnchor(trigger) : null
    const rect = anchor?.getBoundingClientRect()
    const w = rect?.width ?? innerWidth
    const h = rect?.height ?? innerHeight
    const cacheKey = `${key}|${Math.round(w)}x${Math.round(h)}|${this.theme}`
    this.active = { trigger, anchor, key }

    let target = this.cache.get(cacheKey)
    if (!target) {
      const displayFont = getComputedStyle(document.documentElement).getPropertyValue("--font-bodoni").trim()
      if (spec.kind === "text") {
        await document.fonts.load(`700 120px ${displayFont}`, spec.text).catch(() => {})
      }
      const ctx: SceneContext = {
        n: this.n,
        w,
        h,
        vw: innerWidth,
        vh: innerHeight,
        ax: rect?.left ?? 0,
        ay: rect?.top ?? 0,
        theme: this.theme,
        displayFont: displayFont || "serif",
      }
      target = await buildTarget(spec, ctx)
      // Hovering skills can mint a lot of variants; each is over a megabyte.
      if (this.cache.size >= 24) this.cache.delete(this.cache.keys().next().value!)
      this.cache.set(cacheKey, target)
    }
    if (ticket !== this.request) return

    const now = performance.now()
    if (this.started) this.snapshot(now)
    this.to.set(target.pos)
    for (let i = 0; i < this.n; i++) this.misc[i * 4 + 1] = target.heat[i]

    const { gl } = this
    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufFrom)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.from)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufTo)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.to)
    gl.bindBuffer(gl.ARRAY_BUFFER, this.bufMisc)
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.misc)

    this.morphMs = this.still ? 1 : this.started ? MORPH_MS : INTRO_MS
    this.morphStart = now
    this.started = true
  }

  /** Bakes where every point is right now into `from`, so a morph can start mid-morph. */
  private snapshot(now: number) {
    const { from, to, misc, n } = this
    const t = Math.min((now - this.morphStart) / this.morphMs, 1)
    const [ox, oy] = this.offset
    for (let i = 0; i < n; i++) {
      const o = i * 4
      const x = Math.min(Math.max((t - misc[o + 2] * 0.38) / 0.62, 0), 1)
      const e = x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
      const bx = to[o] + ox
      const by = to[o + 1] + oy
      const dx = bx - from[o]
      const dy = by - from[o + 1]
      const arc = Math.sin(Math.PI * e) * (misc[o + 3] - 0.5) * 0.55
      from[o] += dx * e - dy * arc
      from[o + 1] += dy * e + dx * arc
      from[o + 2] += (to[o + 2] - from[o + 2]) * e
      from[o + 3] += (to[o + 3] - from[o + 3]) * e
      misc[o] += (misc[o + 1] - misc[o]) * e
    }
  }

  private frame = (now: number) => {
    this.raf = requestAnimationFrame(this.frame)
    const elapsed = now - this.lastFrame
    const dt = Math.min(elapsed, 50)
    this.lastFrame = now
    this.adapt(elapsed)
    const { gl, u, mouse } = this

    const trigger = this.pick()
    const key = JSON.stringify(trigger?.spec ?? "sheet") + (trigger?.anchor ?? "")
    if (!this.active || this.active.key !== key) void this.retarget(trigger, key)

    const anchor = this.active?.anchor
    if (anchor) {
      const rect = anchor.getBoundingClientRect()
      this.offset = [rect.left, rect.top]
    } else {
      this.offset = [0, 0]
    }

    if (!this.still) this.clock += dt / 1000

    // Fast scrolling and a pending answer both stir the field.
    const velocity = Math.abs(scrollY - this.lastScroll)
    this.lastScroll = scrollY
    const stirTarget = this.still ? 0 : Math.max(agitation, Math.min(velocity / 140, 0.6))
    this.stir += (stirTarget - this.stir) * 0.08

    const moving = now - mouse.lastMove < 1800
    mouse.amp += ((moving ? 1 : 0) - mouse.amp) * 0.06

    gl.uniform1f(u.uT, this.started ? Math.min((now - this.morphStart) / this.morphMs, 1) : 0)
    gl.uniform1f(u.uTime, this.clock)
    gl.uniform2f(u.uToOff, this.offset[0], this.offset[1])
    gl.uniform2f(u.uMouse, mouse.x, mouse.y)
    gl.uniform1f(u.uMouseAmp, mouse.amp)
    gl.uniform1f(u.uStir, this.stir)

    gl.clear(gl.COLOR_BUFFER_BIT)
    if (this.started) gl.drawArrays(gl.POINTS, 0, this.drawCount)
  }

  /** Weak GPUs shed points rather than stutter. Scene points come first in the buffers, so shapes hold. */
  private adapt(elapsed: number) {
    if (!this.started || elapsed > 250) return // a throttled tab says nothing about the GPU
    this.frameSum += elapsed
    if (++this.frameCount < 45) return
    if (this.frameSum / this.frameCount > 30 && this.drawCount > this.n * 0.3) {
      this.drawCount = Math.floor(this.drawCount * 0.65)
    }
    this.frameSum = 0
    this.frameCount = 0
  }
}
