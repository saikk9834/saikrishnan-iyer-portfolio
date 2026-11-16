import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { workProjects } from "@/lib/projects"
import { Scene } from "@/components/field/scene"
import { MetricChapters } from "@/components/metric-chapters"
import { WordReveal } from "@/components/word-reveal"

const previously = [
  { org: "IBM", role: "Software Developer" },
  { org: "Dell", role: "NLP Intern" },
  { org: "E-Green", role: "Machine Learning Intern" },
  { org: "Northeastern", role: "MS Artificial Intelligence" },
]

export default function HomePage() {
  return (
    <>
      {/* Hero: the field arrives as a portrait. */}
      <Scene
        as="section"
        spec={{ kind: "portrait" }}
        anchor="#hero-portrait"
        className="relative flex min-h-svh flex-col overflow-hidden"
      >
        <div
          id="hero-portrait"
          aria-hidden
          className="absolute inset-x-0 top-[9svh] h-[50svh] lg:top-[11svh] lg:right-[8vw] lg:left-auto lg:h-[83svh] lg:w-[52vw]"
        />
        <div className="field-fallback absolute top-[12svh] right-5 w-[55vw] max-w-[420px] lg:right-[10vw]">
          <Image
            src="/saikrishnan-iyer-headshot.jpg"
            alt="Portrait of Saikrishnan Srinivas Iyer"
            width={420}
            height={462}
            priority
            className="w-full grayscale"
          />
        </div>

        <div className="shell relative flex flex-1 flex-col justify-end pt-28 pb-24 lg:pb-20">
          <div className="mb-auto hidden max-w-[23rem] pt-[14svh] lg:block">
            <p className="eyebrow fade-in text-brand">AI Software Engineer</p>
            <p className="fade-in mt-5 text-[19px] leading-[1.55] text-body">
              I work on RAG systems, NLP pipelines, and computer vision. Right now that means a support chatbot on AWS
              Bedrock at Precision Planting.
            </p>
            <div className="fade-in mt-7 flex items-center gap-6">
              <Link href="/projects" className="group inline-flex items-center gap-2 text-[15px] font-medium">
                <span className="link-rule">Selected work</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
              </Link>
              <Link href="/about" className="link-rule text-[15px]">
                About
              </Link>
            </div>
          </div>

          <h1 className="display display-xl relative text-[17.4vw] leading-[0.92] lg:flex lg:gap-[0.2em] lg:text-[11.1vw] lg:whitespace-nowrap">
            <span className="lift">
              <span>Saikrishnan</span>
            </span>
            <span className="lift">
              <span style={{ animationDelay: "0.62s" }}>
                <em className="text-brand">Iyer</em>
              </span>
            </span>
          </h1>

          <div className="fade-in mt-5 lg:hidden">
            <p className="eyebrow text-brand">AI Software Engineer</p>
            <p className="mt-3 text-[16px] leading-[1.55] text-body">
              I work on RAG systems, NLP pipelines, and computer vision. Right now that means a support chatbot on AWS
              Bedrock at Precision Planting.
            </p>
          </div>
        </div>

              </Scene>

      {/* Thesis: the sentence lights up as you read it. */}
      <Scene as="section" spec={{ kind: "sheet" }} className="thesis relative h-[240svh]">
        <div className="shell sticky top-0 flex h-svh flex-col justify-center">
          <p className="eyebrow text-brand">What the work is</p>
          <p className="display mt-7 max-w-[17em] text-[clamp(2.25rem,5.9vw,6rem)] leading-[1.06]">
            <WordReveal text="Most of the difficulty is *not* the *model.* It is retrieval quality, latency, and making sure the thing still answers correctly during planting season." />
          </p>
        </div>
      </Scene>

      {/* Work: every project's number, formed by the same points. */}
      <section aria-labelledby="work-heading">
        <Scene spec={{ kind: "sheet" }} className="shell pt-10 pb-6">
          <p className="eyebrow text-brand">Selected work</p>
          <h2 id="work-heading" className="display display-xl mt-5 text-[clamp(2.75rem,8vw,7.5rem)] leading-[1]">
            Systems in <em>production</em>
          </h2>
        </Scene>
        <MetricChapters projects={workProjects} stageId="home-stage" />
      </section>

      {/* Previously */}
      <Scene as="section" spec={{ kind: "sheet" }} className="shell pt-16 pb-28">
        <p className="eyebrow text-muted-foreground">Previously</p>
        <ul className="mt-6">
          {previously.map((entry) => (
            <li
              key={entry.org}
              className="rise flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 border-t border-border py-5"
            >
              <span className="display text-[clamp(2rem,5vw,4.25rem)] leading-[1.05]">{entry.org}</span>
              <span className="eyebrow text-muted-foreground">{entry.role}</span>
            </li>
          ))}
        </ul>
        <Link href="/projects" className="group mt-10 inline-flex items-center gap-2 text-[17px] font-medium">
          <span className="link-rule">All seven projects</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" strokeWidth={1.6} />
        </Link>
      </Scene>
    </>
  )
}
