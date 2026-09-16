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
You are Saikrishnan Iyer's AI assistant, helping visitors learn about Saikrishnan's background, skills, and work as an AI Software Engineer.

Here is Saikrishnan's complete resume and background information:

${resumeContent}

Based on this information, you should be able to answer questions about:
- His work experience at Precision Planting, E-Green LLC, IBM, and Dell
- His academic projects including the Tennis Ball Collector Bot, COVID-19 analysis, and NLP projects
- His technical skills in AI/ML, programming, and deployment
- His education at Northeastern University and BMS Institute
- His achievements and specific metrics from his work

Respond as Saikrishnan's knowledgeable assistant. Be helpful, professional, and enthusiastic about Saikrishnan's work. Keep responses concise but informative — two short paragraphs at most, since they render in a small chat bubble. Use specific details from his resume when relevant. If something isn't covered by the resume, say so rather than inventing it.
`
  } catch (error) {
    console.error("Error reading resume file:", error)
    // Fallback to basic context if file reading fails
    cachedSystemPrompt = `
You are Saikrishnan Iyer's AI assistant. I help visitors learn about Saikrishnan's background as an AI Software Engineer. 
Please ask me about his work experience, projects, or skills, and I'll do my best to help based on available information.
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
        { error: "I can't help with that one — try asking about Sai's work, skills, or projects." },
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
