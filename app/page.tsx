import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import { featuredProjects } from "@/lib/projects"

const previously = ["IBM", "Dell", "E-Green", "Northeastern University"]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
      {/* Hero */}
      <section className="flex flex-col gap-14 pt-14 pb-20 lg:flex-row lg:items-start lg:justify-between lg:gap-22 lg:pt-19">
        <div className="flex max-w-[600px] flex-col lg:flex-1">
          <div className="flex items-center gap-3">
            <span aria-hidden className="block h-px w-7 bg-brand" />
            <span className="label-mono text-brand">AI Software Engineer</span>
          </div>

          <h1 className="mt-6 font-serif text-[clamp(2.5rem,8vw,4.875rem)] leading-[1.0] font-normal tracking-[-0.025em] dark:font-light">
            Saikrishnan
            <br />
            Srinivas Iyer
          </h1>

          <p className="mt-7 text-lg leading-[1.68] text-body sm:text-[19px]">
            I work on RAG systems, NLP pipelines, and computer vision. Right now that means a support chatbot on AWS
            Bedrock at Precision Planting.
          </p>

          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center sm:gap-7">
            <Link
              href="/projects"
              className="inline-flex min-h-13 w-full items-center justify-center gap-2.5 rounded-md bg-primary px-7 text-base font-medium text-primary-foreground hover:bg-primary/90 sm:w-auto"
            >
              View selected work
              <ArrowRight className="size-4" strokeWidth={1.75} />
            </Link>
            <Link href="/about" className="link-rule text-base font-medium">
              Read about me
            </Link>
          </div>

          <dl className="mt-16 grid grid-cols-1 gap-6 border-t border-border pt-7 sm:grid-cols-3">
            <div>
              <dt className="label-mono text-[10px] text-muted-foreground">Experience</dt>
              <dd className="mt-2 text-[15px]">4+ years, shipping</dd>
            </div>
            <div>
              <dt className="label-mono text-[10px] text-muted-foreground">Education</dt>
              <dd className="mt-2 text-[15px]">
                MS Artificial Intelligence
                <br />
                Northeastern University
              </dd>
            </div>
            <div>
              <dt className="label-mono text-[10px] text-muted-foreground">Based in</dt>
              <dd className="mt-2 text-[15px]">Bloomington, Illinois</dd>
            </div>
          </dl>
        </div>

        <div className="w-full max-w-[396px] shrink-0">
          <Image
            src="/saikrishnan-iyer-headshot.jpg"
            alt="Portrait of Saikrishnan Srinivas Iyer"
            width={396}
            height={468}
            priority
            className="aspect-[396/468] w-full rounded-md object-cover object-[center_22%]"
          />
          <div className="mt-4 flex items-baseline justify-between border-t border-border pt-3">
            <span className="label-mono text-[10px] text-muted-foreground">Currently</span>
            <span className="text-[13px] text-body">Precision Planting</span>
          </div>
        </div>
      </section>

      {/* Previously */}
      <section className="flex flex-wrap items-baseline gap-x-9 gap-y-3 pb-24">
        <span className="label-mono text-[10px] text-muted-foreground">Previously</span>
        {previously.map((org) => (
          <span key={org} className="font-serif text-xl text-body sm:text-[22px]">
            {org}
          </span>
        ))}
      </section>

      {/* Selected work */}
      <section className="pb-24">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <div className="flex items-center gap-3">
              <span aria-hidden className="block h-px w-7 bg-brand" />
              <span className="label-mono text-brand">Selected work</span>
            </div>
            <h2 className="mt-5 font-serif text-[clamp(2rem,5vw,3rem)] leading-[1.05] font-normal tracking-[-0.025em] dark:font-light">
              Systems in production
            </h2>
          </div>
          <Link href="/projects" className="link-rule text-[15px] font-medium">
            All work
          </Link>
        </div>

        <div className="mt-10">
          {featuredProjects.map((project) => (
            <Link
              key={project.id}
              href="/projects"
              className="grid items-start gap-5 border-t border-border py-7 hover:bg-accent/40 md:grid-cols-[196px_minmax(0,1fr)_232px] md:gap-10"
            >
              <div>
                <div className="font-mono text-[11px] tracking-[0.1em]">{project.company}</div>
                <div className="mt-1.5 font-mono text-[11px] tracking-[0.06em] text-muted-foreground">
                  {project.period}
                </div>
              </div>
              <div>
                <h3 className="font-serif text-2xl leading-[1.2] font-normal tracking-[-0.015em] dark:font-light">
                  {project.title}
                </h3>
                <p className="mt-2.5 max-w-[640px] text-[15px] leading-[1.62] text-body">{project.description}</p>
                <div className="label-mono mt-3.5 text-[10px] text-muted-foreground">
                  {project.technologies.slice(0, 4).join(" · ")}
                </div>
              </div>
              <div className="md:text-right">
                <div className="font-serif text-[42px] leading-none font-normal tracking-[-0.02em] text-brand">
                  {project.metric}
                </div>
                <div className="label-mono mt-2 text-[10px] text-muted-foreground">{project.metricLabel}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Contact */}
      <section className="flex flex-wrap items-center justify-between gap-6 border-t border-border py-10">
        <p className="max-w-[520px] font-serif text-2xl leading-[1.3] font-normal tracking-[-0.015em] dark:font-light">
          Open to talking about AI engineering work, or anything on this site.
        </p>
        <div className="flex items-center gap-2">
          <a
            href="mailto:saikrishnaniyerjm@gmail.com"
            aria-label="Email Saikrishnan Iyer"
            className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Mail className="size-[18px]" strokeWidth={1.6} />
          </a>
          <a
            href="https://linkedin.com/in/saikk9834"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Linkedin className="size-[18px]" strokeWidth={1.6} />
          </a>
          <a
            href="https://github.com/saikk9834"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="inline-flex size-11 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            <Github className="size-[18px]" strokeWidth={1.6} />
          </a>
        </div>
      </section>
    </div>
  )
}
