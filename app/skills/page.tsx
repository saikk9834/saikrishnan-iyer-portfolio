"use client"

import { useMemo, useState } from "react"
import type { Role } from "@/lib/skills"
import { roles, skillCategories } from "@/lib/skills"
import { KNOT_CENTERS, type SceneSpec } from "@/lib/field/scenes"
import { Scene } from "@/components/field/scene"

function SkillStage({ id, className }: { id: string; className: string }) {
  return (
    <div id={id} aria-hidden className={`relative ${className}`}>
      {KNOT_CENTERS.map(([x, y], index) => (
        <span
          key={index}
          className="eyebrow absolute -translate-x-1/2 -translate-y-1/2 bg-background/70 px-1.5 py-0.5 text-[10px] text-brand"
          style={{ left: `${x * 100}%`, top: `${y * 100}%` }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
      ))}
    </div>
  )
}

export default function SkillsPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  const filteredCategories = selectedRole
    ? skillCategories
        .filter((category) => category.roles.includes(selectedRole))
        .map((category) => ({
          ...category,
          skills: category.skills.filter((skill) => skill.roles.includes(selectedRole)),
        }))
        .filter((category) => category.skills.length > 0)
    : skillCategories

  // One knot of points per skill. Filtering dims knots; hovering a row lights its knot.
  const spec = useMemo<SceneSpec>(
    () => ({
      kind: "knots",
      groups: skillCategories.map((category) => ({
        knots: category.skills.map((skill) => ({
          active: !selectedRole || skill.roles.includes(selectedRole),
          hot: hovered === `${category.title}/${skill.name}`,
        })),
      })),
    }),
    [selectedRole, hovered],
  )

  return (
    <Scene spec={spec} anchor="#skills-stage, #skills-stage-small" className="shell lg:grid lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)] lg:gap-12">
      <div className="pt-32 pb-24 lg:pt-36">
        <p className="eyebrow text-brand">Toolkit</p>
        <h1 className="display display-xl mt-6 text-[clamp(3.25rem,7.6vw,8.5rem)] leading-[0.98]">
          <span className="lift">
            <span>
              What I <em>build</em> with
            </span>
          </span>
        </h1>
        <p className="fade-in mt-7 max-w-[34rem] text-[18px] leading-[1.6] text-body">
          Grouped by what I use them for. Filter by role if you are hiring for something specific.
        </p>

        <div className="fade-in mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filter skills by role">
          {roles.map((role) => {
            const isActive = selectedRole === role
            return (
              <button
                key={role}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedRole(isActive ? null : role)}
                className={`eyebrow min-h-11 cursor-pointer rounded-full border px-5 text-[10px] transition-colors ${
                  isActive
                    ? "border-brand bg-brand text-brand-foreground"
                    : "border-border bg-background/50 text-muted-foreground backdrop-blur-sm hover:border-rule hover:text-foreground"
                }`}
              >
                {role}
              </button>
            )
          })}
        </div>

        {/* Each knot is one skill; numbers match the category list. */}
        <SkillStage className="mt-8 h-[60svh] lg:hidden" id="skills-stage-small" />

        <div className="mt-12">
          {filteredCategories.map((category) => {
            const number = skillCategories.findIndex((c) => c.title === category.title) + 1
            return (
              <section key={category.title} className="border-t border-border pt-7 pb-10">
                <h2 className="display flex items-baseline gap-4 text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.15]">
                  <span className="eyebrow text-brand">{String(number).padStart(2, "0")}</span>
                  {category.title}
                </h2>

                <dl className="mt-5">
                  {category.skills.map((skill) => {
                    const id = `${category.title}/${skill.name}`
                    return (
                      <div
                        key={skill.name}
                        onPointerEnter={() => setHovered(id)}
                        onPointerLeave={() => setHovered(null)}
                        className="grid gap-x-6 gap-y-1 border-b border-border/60 py-3 transition-colors last:border-b-0 hover:text-brand sm:grid-cols-[190px_minmax(0,1fr)]"
                      >
                        <dt className="text-[16px]">{skill.name}</dt>
                        <dd className="eyebrow self-center text-[10px] text-muted-foreground">
                          {skill.frameworks.join(" · ")}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              </section>
            )
          })}

          <p className="border-t border-border pt-8 text-[17px] leading-[1.7] text-body">
            Picked up across four jobs: Precision Planting, IBM, Dell, and E-Green. The recurring theme has been cutting
            processing time by 40 to 60 percent.
          </p>
          <a href="/resume.pdf" className="link-rule mt-5 inline-block text-[15px] font-medium">
            Download résumé
          </a>
        </div>

      </div>

      <SkillStage className="sticky top-0 hidden h-svh lg:block" id="skills-stage" />
    </Scene>
  )
}
