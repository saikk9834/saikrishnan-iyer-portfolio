"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { ArrowUp, X } from "lucide-react"
import { setFieldAgitation } from "@/lib/field/engine"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
}

const suggestions = [
  "What did you build at Precision Planting?",
  "How did the IBM review bot work?",
  "What is your computer vision experience?",
]

/*
  The site's assistant, reading the same résumé a recruiter would. While it works,
  the whole field behind the page stirs.
*/
export default function Ask() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const toggleRef = useRef<HTMLButtonElement>(null)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" })
  }, [messages, isLoading])

  // The toggle only exists while the panel is closed, so focus has to wait for it.
  const wasOpen = useRef(false)
  useEffect(() => {
    if (isOpen) inputRef.current?.focus()
    else if (wasOpen.current) toggleRef.current?.focus()
    wasOpen.current = isOpen
  }, [isOpen])

  useEffect(() => {
    setFieldAgitation(isLoading ? 1 : 0)
    return () => setFieldAgitation(0)
  }, [isLoading])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setIsOpen((open) => !open)
      }
    }
    addEventListener("keydown", onKey)
    return () => removeEventListener("keydown", onKey)
  }, [])

  const close = () => setIsOpen(false)

  const send = async (text: string) => {
    const question = text.trim()
    if (!question || isLoading) return

    const history = messages
    setMessages((prev) => [...prev, { id: `${Date.now()}-u`, content: question, role: "user" }])
    setInput("")
    setIsLoading(true)

    let reply: string
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history }),
      })
      const data = await response.json().catch(() => ({}))
      if (!response.ok) throw new Error(data.error || `Request failed with status ${response.status}`)
      reply = data.message
    } catch (error) {
      console.error("Chat error:", error)
      reply =
        error instanceof Error && error.message
          ? error.message
          : "Something went wrong reaching the assistant. Try again in a moment."
    }

    setMessages((prev) => [...prev, { id: `${Date.now()}-a`, content: reply, role: "assistant" }])
    setIsLoading(false)
  }

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    void send(input)
  }

  return (
    <div className="fixed right-4 bottom-4 z-40 sm:right-6 sm:bottom-6">
      {isOpen && (
        <div
          role="dialog"
          aria-label="Ask about my work"
          onKeyDown={(event) => event.key === "Escape" && close()}
          className="animate-in fade-in slide-in-from-bottom-3 absolute right-0 bottom-0 flex h-[min(560px,calc(100dvh-6rem))] w-[min(26rem,calc(100vw-2rem))] flex-col border border-border bg-popover/90 shadow-2xl backdrop-blur-xl duration-300"
        >
          <div className="flex items-center justify-between border-b border-border py-1 pr-1 pl-5">
            <span className="eyebrow text-muted-foreground">Ask about my work</span>
            <button
              type="button"
              onClick={close}
              aria-label="Close assistant"
              className="inline-flex size-11 cursor-pointer items-center justify-center text-muted-foreground hover:text-foreground"
            >
              <X className="size-4" strokeWidth={1.6} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-5 py-5" aria-live="polite">
            {messages.length === 0 && (
              <div>
                <p className="display text-[26px] leading-[1.15]">
                  It has read my résumé. <em>Ask it anything.</em>
                </p>
                <div className="mt-6 border-t border-border">
                  {suggestions.map((suggestion) => (
                    <button
                      key={suggestion}
                      type="button"
                      onClick={() => void send(suggestion)}
                      className="block min-h-11 w-full cursor-pointer border-b border-border py-3 text-left text-[14px] text-body transition-colors hover:text-brand"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="space-y-5">
              {messages.map((message) =>
                message.role === "user" ? (
                  <p key={message.id} className="display text-[21px] leading-[1.25]">
                    {message.content}
                  </p>
                ) : (
                  <p
                    key={message.id}
                    className="border-l border-brand pl-4 text-[15px] leading-[1.6] break-words whitespace-pre-wrap text-body"
                  >
                    {message.content}
                  </p>
                ),
              )}
              {isLoading && (
                <p className="eyebrow border-l border-brand pl-4 text-muted-foreground">
                  <span className="animate-pulse">Retrieving</span>
                </p>
              )}
              <div ref={endRef} />
            </div>
          </div>

          <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-border py-2 pr-2 pl-5">
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask a question"
              aria-label="Your question"
              disabled={isLoading}
              className="h-11 min-w-0 flex-1 bg-transparent text-[16px] outline-none placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              disabled={!input.trim() || isLoading}
              aria-label="Send question"
              className="inline-flex size-11 shrink-0 cursor-pointer items-center justify-center bg-brand text-brand-foreground transition-opacity disabled:cursor-default disabled:opacity-30"
            >
              <ArrowUp className="size-4" strokeWidth={1.8} />
            </button>
          </form>
        </div>
      )}

      {!isOpen && (
        <button
          ref={toggleRef}
          type="button"
          onClick={() => setIsOpen(true)}
          aria-expanded={false}
          className="group flex min-h-12 cursor-pointer items-center gap-3 rounded-full border border-border bg-popover/80 pr-5 pl-4 text-[14px] shadow-lg backdrop-blur-xl transition-colors hover:border-brand"
        >
          <span aria-hidden className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-brand" />
          </span>
          Ask about my work
          <kbd className="eyebrow hidden text-[10px] text-muted-foreground lg:inline">⌘K</kbd>
        </button>
      )}
    </div>
  )
}
