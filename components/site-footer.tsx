import { Scene } from "@/components/field/scene"

const links = [
  { href: "https://linkedin.com/in/saikk9834", label: "LinkedIn", external: true },
  { href: "https://github.com/saikk9834", label: "GitHub", external: true },
  { href: "/resume.pdf", label: "Résumé", external: false },
]

/** Every page ends in the same place: the points settle into planted rows. */
export default function SiteFooter() {
  return (
    <Scene as="footer" spec={{ kind: "furrows" }} className="relative z-10 flex min-h-svh flex-col">
      <div className="shell flex flex-1 flex-col pt-28 pb-24 lg:pb-8">
        <p className="eyebrow text-brand">Contact</p>
        <h2 className="display display-xl mt-6 text-[clamp(3.5rem,11vw,10.5rem)] leading-[0.95]">
          Let&apos;s <em>talk.</em>
        </h2>
        <p className="mt-6 max-w-[32rem] text-[17px] leading-[1.6] text-body">
          Open to talking about AI engineering work, or anything on this site.
        </p>
        <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3">
          <a href="mailto:saikrishnaniyerjm@gmail.com" className="link-rule text-[17px] font-medium">
            saikrishnaniyerjm@gmail.com
          </a>
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="link-rule text-[15px]"
            >
              {link.label}
            </a>
          ))}
        </div>
        <p className="eyebrow mt-auto pt-16 text-muted-foreground">Saikrishnan Srinivas Iyer · Bloomington, Illinois</p>
      </div>
    </Scene>
  )
}
