import {type NextRequest, NextResponse} from "next/server"
import Anthropic from "@anthropic-ai/sdk"
import {readFileSync} from "fs"
import {join} from "path"

const MODEL = "claude-opus-5"

// Read once per server process. Keeping the system prompt byte-identical across
// requests is what lets the prompt cache actually hit.
let cachedSystemPrompt: string | null = null

function getPortfolioContext(): string {
  if (cachedSystemPrompt !== null) return cachedSystemPrompt

  try {
    const resumeContent = readFileSync(join(process.cwd(), "public", "resume.txt"), "utf-8")

    cachedSystemPrompt = `
You answer questions about Saikrishnan Iyer for visitors to his portfolio site.

His resume:

${resumeContent}

Use it to answer questions about his jobs at Precision Planting, E-Green LLC, IBM and Dell, his academic
projects, his technical skills, and his degrees from Northeastern and BMS Institute. Quote his actual numbers
when they are relevant.

How to write:
- Two short paragraphs at most. The replies render inside a small chat bubble.
- Plain sentences. No marketing adjectives, no exclamation marks, no bulleted lists.
- Do not open with a pleasantry or restate the question. Answer it.
- If the resume does not cover something, say you do not know instead of guessing.
`
  } catch (error) {
    console.error("Error reading resume file:", error)
    // resume.txt is missing or unreadable; answer without it rather than 500ing.
    cachedSystemPrompt = `
You answer questions about Saikrishnan Iyer, an AI Software Engineer, for visitors to his portfolio site.

His resume could not be loaded, so you do not have his details. Say that you cannot look up specifics right now
and point the visitor at the work and skills pages. Keep it to one or two plain sentences.
`
  }

  return cachedSystemPrompt
}

const client = new Anthropic()

export async function POST(request: NextRequest) {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error("Chat API error: ANTHROPIC_API_KEY is not set")
    return NextResponse.json(
      { error: "The assistant is not configured yet (missing ANTHROPIC_API_KEY)." },
      { status: 503 },
    )
  }

  try {
    const { message, history } = await request.json()

    if (typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "A message is required." }, { status: 400 })
    }

    // Turn the client-side transcript into real conversation turns instead of
    // flattening it into the prompt text.
    const priorTurns: Anthropic.MessageParam[] = (Array.isArray(history) ? history : [])
      .filter(
        (msg: any) =>
          (msg?.role === "user" || msg?.role === "assistant") &&
          typeof msg.content === "string" &&
          msg.content.trim(),
      )
      .map((msg: any) => ({ role: msg.role, content: msg.content }))
      .slice(-8)

    // The API requires the first message to be from the user, and the widget
    // opens with a canned assistant greeting.
    while (priorTurns.length > 0 && priorTurns[0].role === "assistant") {
      priorTurns.shift()
    }

    const response = await client.messages.create({
      model: MODEL,
      max_tokens: 2048,
      output_config: { effort: "low" },
      system: [
        {
          type: "text",
          text: getPortfolioContext(),
          cache_control: { type: "ephemeral" },
        },
      ],
      messages: [...priorTurns, { role: "user", content: message }],
    })

    if (response.stop_reason === "refusal") {
      console.error("Chat API refusal:", response.stop_details)
      return NextResponse.json(
        { error: "I can't help with that one - try asking about Sai's work, skills, or projects." },
        { status: 422 },
      )
    }

    const text = response.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join("\n")
      .trim()

    if (!text) {
      return NextResponse.json({ error: "The assistant returned an empty response." }, { status: 502 })
    }

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Chat API error:", error)

    if (error instanceof Anthropic.AuthenticationError) {
      return NextResponse.json({ error: "The assistant's API key is invalid." }, { status: 503 })
    }
    if (error instanceof Anthropic.RateLimitError) {
      return NextResponse.json(
        { error: "The assistant is busy right now. Please try again in a moment." },
        { status: 429 },
      )
    }
    if (error instanceof Anthropic.APIError) {
      return NextResponse.json({ error: "The assistant couldn't be reached." }, { status: 502 })
    }

    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
