"use client"

import { useState } from "react"
import { X } from "lucide-react"
import type { Role } from "@/lib/skills"
import { roles, skillCategories } from "@/lib/skills"

export default function SkillsPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const filteredCategories = selectedRole
    ? skillCategories
        .filter((category) => category.roles.includes(selectedRole))
        .map((category) => ({
          ...category,
          skills: category.skills.filter((skill) => skill.roles.includes(selectedRole)),
        }))
        .filter((category) => category.skills.length > 0)
    : skillCategories

  return (
    <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
      <header className="pt-14 pb-10 lg:pt-16">
        <div className="max-w-[620px]">
          <div className="flex items-center gap-3">
            <span aria-hidden className="block h-px w-7 bg-brand" />
            <span className="label-mono text-brand">Toolkit</span>
          </div>
          <h1 className="mt-5 font-serif text-[clamp(2.25rem,6vw,3.25rem)] leading-[1.05] font-normal tracking-[-0.025em] dark:font-light">
            What I build with
          </h1>
          <p className="mt-4 text-[17px] leading-[1.65] text-body">
            Grouped by what I use them for. Filter by role if you are hiring for something specific.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {roles.map((role) => {
            const isActive = selectedRole === role
            return (
              <button
                key={role}
                type="button"
                aria-pressed={isActive}
                onClick={() => setSelectedRole(isActive ? null : role)}
                className={`label-mono min-h-11 cursor-pointer rounded-md border px-[18px] text-[10px] tracking-[0.14em] ${
                  isActive
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border text-muted-foreground hover:border-rule hover:text-foreground"
                }`}
              >
                {role}
              </button>
            )
          })}
          {selectedRole && (
            <button
              type="button"
              onClick={() => setSelectedRole(null)}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 px-3 text-[13px] text-muted-foreground hover:text-foreground"
            >
              <X className="size-3.5" />
              Clear
            </button>
          )}
        </div>
      </header>

      <section className="grid gap-x-18 pb-16 lg:grid-cols-2">
        {filteredCategories.map((category, index) => (
          <div key={category.title} className="border-t border-border pt-7 pb-8">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-[11px] tracking-[0.1em] text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h2 className="font-serif text-[25px] leading-[1.2] font-normal tracking-[-0.015em] dark:font-light">
                {category.title}
              </h2>
            </div>

            <dl className="mt-5">
              {category.skills.map((skill) => (
                <div
                  key={skill.name}
                  className="grid gap-x-6 gap-y-1 border-b border-border/60 py-3 last:border-b-0 sm:grid-cols-[168px_minmax(0,1fr)]"
                >
                  <dt className="text-[15px]">{skill.name}</dt>
                  <dd className="label-mono self-center text-[10px] text-muted-foreground">
                    {skill.frameworks.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </section>

      {filteredCategories.length === 0 && (
        <p className="border-t border-border py-16 text-center text-body">
          Nothing tagged for that role yet. Clear the filter to see everything.
        </p>
      )}

      <section className="border-t border-border py-10 pb-24">
        <p className="max-w-[720px] text-[17px] leading-[1.7] text-body">
          Picked up across four jobs: Precision Planting, IBM, Dell, and E-Green. The recurring theme has been cutting
          processing time by 40 to 60 percent.
        </p>
        <a href="/resume.pdf" className="link-rule mt-5 inline-block text-[15px] font-medium">
          Download résumé
        </a>
      </section>
    </div>
  )
}
