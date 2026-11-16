import { academicProjects, workProjects } from "@/lib/projects"
import { Scene } from "@/components/field/scene"
import { MetricChapters } from "@/components/metric-chapters"

export default function ProjectsPage() {
  return (
    <>
      <Scene as="header" spec={{ kind: "sheet" }} className="shell flex min-h-[78svh] flex-col justify-end pt-32 pb-16">
        <p className="eyebrow text-brand">Selected work</p>
        <h1 className="display display-xl mt-6 text-[clamp(3.25rem,11.5vw,11rem)] leading-[0.96]">
          <span className="lift">
            <span>
              Systems in <em>production</em>
            </span>
          </span>
        </h1>
        <p className="fade-in mt-8 max-w-[34rem] text-[18px] leading-[1.6] text-body">
          Seven projects: four built at work, three at university. Each one lists the result it was measured on.
        </p>
      </Scene>

      <section aria-labelledby="industry-heading">
        <h2 id="industry-heading" className="shell eyebrow text-muted-foreground">
          Industry
        </h2>
        <MetricChapters projects={workProjects} stageId="industry-stage" detailed />
      </section>

      <section aria-labelledby="academic-heading" className="pt-16 pb-16">
        <h2 id="academic-heading" className="shell eyebrow text-muted-foreground">
          Academic
        </h2>
        <MetricChapters projects={academicProjects} stageId="academic-stage" detailed />
      </section>
    </>
  )
}
