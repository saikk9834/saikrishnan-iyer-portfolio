import type { Project } from "@/lib/projects"
import { academicProjects, workProjects } from "@/lib/projects"

function ProjectRow({ project }: { project: Project }) {
  return (
    <article className="grid items-start gap-5 border-t border-border py-8 md:grid-cols-[196px_minmax(0,1fr)_232px] md:gap-10">
      <div>
        {project.company && <div className="font-mono text-[11px] tracking-[0.1em]">{project.company}</div>}
        <div className="mt-1.5 font-mono text-[11px] tracking-[0.06em] text-muted-foreground">{project.period}</div>
      </div>

      <div>
        <h3 className="font-serif text-2xl leading-[1.2] font-normal tracking-[-0.015em] dark:font-light">
          {project.title}
        </h3>
        <p className="mt-2.5 max-w-[640px] text-[15px] leading-[1.62] text-body">{project.description}</p>

        <ul className="mt-4 space-y-1.5">
          {project.achievements.map((achievement) => (
            <li key={achievement} className="flex gap-3 text-[14px] leading-[1.55] text-body">
              <span aria-hidden className="mt-[9px] block h-px w-3 shrink-0 bg-rule" />
              {achievement}
            </li>
          ))}
        </ul>

        <div className="label-mono mt-4 text-[10px] text-muted-foreground">{project.technologies.join(" · ")}</div>
      </div>

      <div className="md:text-right">
        <div className="font-serif text-[42px] leading-none font-normal tracking-[-0.02em] text-brand">
          {project.metric}
        </div>
        <div className="label-mono mt-2 text-[10px] text-muted-foreground">{project.metricLabel}</div>
      </div>
    </article>
  )
}

export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
      <header className="max-w-[640px] pt-14 pb-10 lg:pt-16">
        <div className="flex items-center gap-3">
          <span aria-hidden className="block h-px w-7 bg-brand" />
          <span className="label-mono text-brand">Selected work</span>
        </div>
        <h1 className="mt-5 font-serif text-[clamp(2.25rem,6vw,3.5rem)] leading-[1.05] font-normal tracking-[-0.025em] dark:font-light">
          Systems in production
        </h1>
        <p className="mt-5 text-[17px] leading-[1.65] text-body">
          Seven projects: four built at work, three at university. Each one lists the result it was measured on.
        </p>
      </header>

      <section className="pb-20">
        <h2 className="label-mono pb-4 text-[10px] text-muted-foreground">Industry</h2>
        {workProjects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </section>

      <section className="border-t border-border pt-14 pb-24">
        <h2 className="label-mono pb-4 text-[10px] text-muted-foreground">Academic</h2>
        {academicProjects.map((project) => (
          <ProjectRow key={project.id} project={project} />
        ))}
      </section>
    </div>
  )
}
