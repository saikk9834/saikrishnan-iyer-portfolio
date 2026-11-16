import type { Project } from "@/lib/projects"
import { Scene } from "@/components/field/scene"

type MetricChaptersProps = {
  projects: Project[]
  /** Unique per page section: the sticky stage the numerals form on. */
  stageId: string
  detailed?: boolean
}

/*
  Project text scrolls on the left while the field re-forms each project's headline
  number on a sticky stage to the right. On phones each chapter carries its own
  stage above the text instead.
*/
export function MetricChapters({ projects, stageId, detailed = false }: MetricChaptersProps) {
  return (
    <div className="shell relative lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
      <div>
        {projects.map((project, index) => (
          <Scene
            key={project.id}
            as="article"
            spec={{ kind: "text", text: project.metric }}
            anchor={`#${stageId}`}
            className="flex flex-col justify-center py-14 lg:min-h-svh lg:py-24"
          >
            <div data-anchor aria-hidden className="h-[30svh] lg:hidden" />
            <div className="eyebrow flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground">
              <span className="text-brand">
                {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
              </span>
              {project.company && <span>{project.company}</span>}
              <span>{project.period}</span>
            </div>

            <h3 className="display mt-6 text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.02]">{project.title}</h3>
            <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.65] text-body">{project.description}</p>

            {detailed && (
              <ul className="mt-6 max-w-[34rem] space-y-2 border-t border-border pt-5">
                {project.achievements.map((achievement) => (
                  <li key={achievement} className="text-[15px] leading-[1.5] text-body">
                    {achievement}
                  </li>
                ))}
              </ul>
            )}

            <p className="mt-7 flex items-baseline gap-3 border-t border-border pt-4">
              <span className="font-mono text-[15px] font-medium text-brand">{project.metric}</span>
              <span className="eyebrow text-muted-foreground">{project.metricLabel}</span>
            </p>
            <p className="eyebrow mt-3 leading-[1.9] text-muted-foreground">
              {(detailed ? project.technologies : project.technologies.slice(0, 4)).join(" · ")}
            </p>
          </Scene>
        ))}
      </div>
      <div id={stageId} aria-hidden className="sticky top-0 hidden h-svh lg:block" />
    </div>
  )
}
