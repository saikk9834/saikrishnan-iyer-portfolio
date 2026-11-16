"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, X, Sun, Moon } from "lucide-react"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/resume.pdf", label: "Résumé" },
]

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // The server doesn't know the visitor's theme, so nothing that reads it (icon
  // or label) can render until after hydration or React reports a mismatch.
  useEffect(() => setMounted(true), [])

  const isDark = mounted && resolvedTheme === "dark"

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      aria-label={mounted ? (isDark ? "Switch to light theme" : "Switch to dark theme") : "Switch theme"}
      className="inline-flex size-11 cursor-pointer items-center justify-center text-foreground"
    >
      {mounted ? (
        isDark ? (
          <Sun className="size-[17px]" strokeWidth={1.6} aria-hidden />
        ) : (
          <Moon className="size-[17px]" strokeWidth={1.6} aria-hidden />
        )
      ) : (
        <span className="size-[17px]" />
      )}
    </button>
  )
}

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  // Close the menu when the route changes, or it stays open over the new page.
  useEffect(() => setIsOpen(false), [pathname])

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* A soft scrim instead of a bar: the field should run right to the top edge. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-background via-background/70 to-transparent"
      />
      <div className="shell relative">
        <div className="flex h-16 items-center justify-between md:h-20">
          <Link href="/" className="display relative z-10 text-[19px] tracking-[-0.01em]">
            Saikrishnan <em>Iyer</em>
          </Link>

          <nav className="hidden items-center gap-9 md:flex">
            {navItems.slice(1).map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`eyebrow relative py-2 transition-colors ${
                    isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  {isActive && (
                    <span aria-hidden className="absolute -bottom-0.5 left-0 size-1 rounded-full bg-brand" />
                  )}
                </Link>
              )
            })}
            <div className="-mr-3">
              <ThemeToggle />
            </div>
          </nav>

          <div className="relative z-10 -mr-3 flex items-center md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="inline-flex size-11 cursor-pointer items-center justify-center text-foreground"
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <nav className="animate-in fade-in fixed inset-0 flex flex-col justify-center bg-background/95 backdrop-blur-md duration-300 md:hidden">
          <div className="shell">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`display block border-t border-border py-4 text-[2.75rem] leading-[1.1] ${
                    isActive ? "text-brand italic" : "text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
