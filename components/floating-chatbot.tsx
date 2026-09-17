"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageCircle, X, Send, Bot, User } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
}

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content:
        "Ask me about Sai's work, projects, or background.",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      role: "user",
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
          history: messages,
        }),
      })

      const data = await response.json().catch(() => ({}))

      if (!response.ok) {
        throw new Error(data.error || `Request failed with status ${response.status}`)
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.message,
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Chat error:", error)
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          error instanceof Error && error.message
            ? error.message
            : "Something went wrong reaching the assistant. Try again in a moment.",
        role: "assistant",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close assistant" : "Ask the assistant"}
        aria-expanded={isOpen}
        className="fixed right-6 bottom-6 z-50 size-13 rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
      >
        {isOpen ? <X className="size-5" /> : <MessageCircle className="size-5" />}
      </Button>

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed right-6 bottom-24 z-40 h-[500px] max-h-[calc(100dvh-8rem)] w-96 max-w-[calc(100vw-3rem)] gap-0 border-border bg-popover py-0 shadow-lg">
          <CardHeader className="shrink-0 border-b border-border px-4 py-3.5">
            <CardTitle className="flex items-center gap-2.5">
              <Bot className="size-4 text-brand" strokeWidth={1.6} aria-hidden />
              <span className="label-mono text-[10px] text-muted-foreground">Ask about my work</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="flex min-h-0 flex-1 flex-col p-0">
            {/* Messages */}
            <div className="flex-1 overflow-hidden">
              <ScrollArea className="h-full px-4">
                <div className="space-y-4 py-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex items-start space-x-3 ${
                        message.role === "user" ? "flex-row-reverse space-x-reverse" : ""
                      }`}
                    >
                      <div
                        className={`flex size-7 shrink-0 items-center justify-center rounded-md ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-brand"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="size-3.5" strokeWidth={1.6} aria-hidden />
                        ) : (
                          <Bot className="size-3.5" strokeWidth={1.6} aria-hidden />
                        )}
                      </div>
                      <div
                        className={`max-w-[240px] rounded-md p-3 break-words ${
                          message.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex items-start space-x-3">
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-md bg-muted text-brand">
                        <Bot className="size-3.5" strokeWidth={1.6} aria-hidden />
                      </div>
                      <div className="rounded-md bg-muted p-3">
                        <div className="flex space-x-1">
                          <div className="size-1.5 animate-bounce rounded-full bg-muted-foreground"></div>
                          <div
                            className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="size-1.5 animate-bounce rounded-full bg-muted-foreground"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
            </div>

            {/* Input */}
            <div className="shrink-0 border-t border-border p-4">
              <div className="flex space-x-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about Sai's work, skills, or projects..."
                  className="h-11 border-input bg-background"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  size="sm"
                  aria-label="Send message"
                  className="h-11 w-11 bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  <Send className="size-4" strokeWidth={1.6} aria-hidden />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  )
}
