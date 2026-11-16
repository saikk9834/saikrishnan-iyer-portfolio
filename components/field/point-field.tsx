"use client"

import { useEffect, useRef } from "react"
import { FieldEngine } from "@/lib/field/engine"

/** Mounted once in the root layout, so the field survives route changes. */
export default function PointField() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const root = document.documentElement
    let engine: FieldEngine | undefined
    try {
      engine = new FieldEngine(canvasRef.current!)
      root.dataset.field = "on"
    } catch (error) {
      // No WebGL2. Pages show their plain fallbacks instead.
      console.warn("Point field disabled:", error)
      root.dataset.field = "off"
    }
    return () => engine?.destroy()
  }, [])

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
}
