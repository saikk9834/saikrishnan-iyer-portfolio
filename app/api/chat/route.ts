import {type NextRequest, NextResponse} from "next/server"
import {groq} from "@ai-sdk/groq"
import {generateText} from "ai"
import {readFileSync} from "fs"
import {join} from "path"

function getPortfolioContext(): string {
  try {
    const resumeContent = readFileSync(join(process.cwd(), "public", "resume.txt"), "utf-8")

    return `
You are Saikrishnan Iyer's AI assistant, helping visitors learn about Saikrishnan's background, skills, and work as an AI Software Engineer.

Here is Saikrishnan's complete resume and background information:

${resumeContent}

Based on this information, you should be able to answer questions about:
- His work experience at Precision Planting, E-Green LLC, IBM, and Dell
- His academic projects including the Tennis Ball Collector Bot, COVID-19 analysis, and NLP projects
- His technical skills in AI/ML, programming, and deployment
- His education at Northeastern University and BMS Institute
- His achievements and specific metrics from his work

Respond as Saikrishnan's knowledgeable assistant. Be helpful, professional, and enthusiastic about Saikrishnan's work. Keep responses concise but informative. Use specific details from his resume when relevant.
`
  } catch (error) {
    console.error("Error reading resume file:", error)
    // Fallback to basic context if file reading fails
    return `
You are Saikrishnan Iyer's AI assistant. I help visitors learn about Saikrishnan's background as an AI Software Engineer. 
Please ask me about his work experience, projects, or skills, and I'll do my best to help based on available information.
`
  }
}

export async function POST(request: NextRequest) {
  try {
    const { message, history } = await request.json()

    const { text } = await generateText({
      model: groq("llama3-8b-8192"),
      system: getPortfolioContext(),
      prompt: `User question: ${message}

Previous conversation context:
${history
  .slice(-4)
  .map((msg: any) => `${msg.role}: ${msg.content}`)
  .join("\n")}

Please provide a helpful response about Saikrishnan Iyer's background, skills, or projects.`,
    })

    return NextResponse.json({ message: text })
  } catch (error) {
    console.error("Chat API error:", error)
    return NextResponse.json({ error: "Failed to process chat message" }, { status: 500 })
  }
}
