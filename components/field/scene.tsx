"use client"

import { type ElementType, type ReactNode, useEffect, useRef } from "react"
import { registerTrigger } from "@/lib/field/engine"
import type { SceneSpec } from "@/lib/field/scenes"

type SceneProps = {
  spec: SceneSpec
  /** Selector for the element to draw into, if it isn't this one. */
  anchor?: string
  as?: ElementType
  id?: string
  className?: string
  children?: ReactNode
}

/** While this element sits on the reading line, the field forms `spec`. */
export function Scene({ spec, anchor, as: Tag = "div", id, className, children }: SceneProps) {
  const ref = useRef<HTMLElement>(null)
  const key = JSON.stringify(spec)

  useEffect(() => {
    return registerTrigger({ el: ref.current!, spec, anchor })
    // `key` stands in for `spec`, which is a new object on every render.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key, anchor])

  return (
    <Tag ref={ref} id={id} className={className}>
      {children}
    </Tag>
  )
}
