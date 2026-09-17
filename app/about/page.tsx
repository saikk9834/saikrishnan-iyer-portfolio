import { Mail, Linkedin, Github, Target, Zap, Users } from "lucide-react"

const quickFacts = [
  { label: "Based in", value: "Bloomington, Illinois" },
  { label: "Experience", value: "4+ years, shipping" },
  { label: "Degree", value: "MS Artificial Intelligence" },
  { label: "Focus", value: "RAG systems, NLP, computer vision" },
]

const education = [
  {
    degree: "Master of Science in Artificial Intelligence",
    school: "Northeastern University, Khoury College of Computer Science",
    detail: "Boston, MA · Aug 2021 - May 2023",
  },
  {
    degree: "Bachelor of Engineering in Computer Science",
    school: "BMS Institute of Technology and Management",
    detail: "Bangalore, India · Sep 2016 - Sep 2020",
  },
]

const values = [
  {
    icon: Target,
    title: "Measure the outcome",
    body: "Every project on this site has a number next to it. If I cannot measure what changed, I do not know whether it worked.",
  },
  {
    icon: Zap,
    title: "Automate the tedious part",
    body: "Most of what I have shipped takes a manual process and cuts the time it needs by half or better.",
  },
  {
    icon: Users,
    title: "Build with the users nearby",
    body: "Support, HR, and sales all use the chatbot at Precision Planting. Getting it right meant sitting with each of them first.",
  },
]

const interests = [
  "Natural Language Processing",
  "Computer Vision",
  "RAG Systems",
  "AWS Cloud Architecture",
  "Machine Learning Engineering",
  "Full-Stack Development",
  "Automation & Optimization",
  "Enterprise AI Solutions",
  "Research & Development",
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
      <header className="max-w-[640px] pt-14 pb-12 lg:pt-16">
        <div className="flex items-center gap-3">
          <span aria-hidden className="block h-px w-7 bg-brand" />
          <span className="label-mono text-brand">About</span>
        </div>
        <h1 className="mt-5 font-serif text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.05] font-normal tracking-[-0.025em] dark:font-light">
          How I got here
        </h1>
        <p className="mt-5 text-[17px] leading-[1.65] text-body">
          AI software engineer in Bloomington, Illinois. Most of my work is getting models into production and keeping
          them there.
        </p>
      </header>

      {/* Story + facts */}
      <section className="grid gap-14 border-t border-border pt-12 pb-20 lg:grid-cols-[minmax(0,660px)_320px] lg:justify-between lg:gap-20">
        <div className="max-w-[660px] space-y-5 text-[17px] leading-[1.75] text-body">
          <p>
            I studied Computer Science at BMS Institute of Technology in Bangalore. Machine learning and NLP started as
            coursework there and turned into the thing I actually wanted to do.
          </p>
          <p>
            Dell came first, then IBM, both building NLP tooling that cut processing times by up to 60%. That work made
            the gaps in what I understood obvious, so I went to Northeastern for a Master&apos;s in Artificial
            Intelligence.
          </p>
          <p>
            I&apos;m now at Precision Planting, building a RAG chatbot on AWS Bedrock with TypeScript and React. Most of
            the difficulty is not the model. It is retrieval quality, latency, and making sure the thing still answers
            correctly during planting season, when support, HR, and sales all need it at once.
          </p>
        </div>

        <dl className="h-fit border-t border-border pt-6 lg:border-t-0 lg:pt-0">
          {quickFacts.map((fact) => (
            <div key={fact.label} className="border-b border-border/60 py-4 last:border-b-0">
              <dt className="label-mono text-[10px] text-muted-foreground">{fact.label}</dt>
              <dd className="mt-2 text-[15px]">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Education */}
      <section className="border-t border-border pt-12 pb-20">
        <h2 className="label-mono pb-6 text-[10px] text-muted-foreground">Education</h2>
        <div className="grid gap-10 md:grid-cols-2">
          {education.map((entry) => (
            <div key={entry.degree}>
              <h3 className="font-serif text-[22px] leading-[1.25] font-normal tracking-[-0.015em] dark:font-light">
                {entry.degree}
              </h3>
              <p className="mt-2.5 text-[15px] text-body">{entry.school}</p>
              <p className="mt-1.5 font-mono text-[11px] tracking-[0.06em] text-muted-foreground">{entry.detail}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-border pt-12 pb-20">
        <h2 className="label-mono pb-8 text-[10px] text-muted-foreground">How I work</h2>
        <div className="grid gap-10 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon
            return (
              <div key={value.title}>
                <Icon className="size-5 text-brand" strokeWidth={1.5} aria-hidden />
                <h3 className="mt-4 font-serif text-xl font-normal tracking-[-0.015em] dark:font-light">
                  {value.title}
                </h3>
                <p className="mt-2.5 text-[15px] leading-[1.65] text-body">{value.body}</p>
              </div>
            )
          })}
        </div>
      </section>

      {/* Interests */}
      <section className="border-t border-border pt-12 pb-20">
        <h2 className="label-mono pb-6 text-[10px] text-muted-foreground">Areas of interest</h2>
        <p className="max-w-[820px] text-[17px] leading-[1.9]">{interests.join(" · ")}</p>
      </section>

      {/* Contact */}
      <section className="flex flex-wrap items-center justify-between gap-6 border-t border-border py-10 pb-24">
        <p className="font-serif text-2xl leading-[1.3] font-normal tracking-[-0.015em] dark:font-light">
          Get in touch
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
          <a href="mailto:saikrishnaniyerjm@gmail.com" className="link-rule inline-flex items-center gap-2.5 text-[15px]">
            <Mail className="size-4" strokeWidth={1.6} aria-hidden />
            saikrishnaniyerjm@gmail.com
          </a>
          <a
            href="https://linkedin.com/in/saikk9834"
            target="_blank"
            rel="noopener noreferrer"
            className="link-rule inline-flex items-center gap-2.5 text-[15px]"
          >
            <Linkedin className="size-4" strokeWidth={1.6} aria-hidden />
            LinkedIn
          </a>
          <a
            href="https://github.com/saikk9834"
            target="_blank"
            rel="noopener noreferrer"
            className="link-rule inline-flex items-center gap-2.5 text-[15px]"
          >
            <Github className="size-4" strokeWidth={1.6} aria-hidden />
            GitHub
          </a>
        </div>
      </section>
    </div>
  )
}
