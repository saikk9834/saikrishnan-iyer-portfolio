"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Menu, X, Home, User, Briefcase, Code, FileText, Sun, Moon } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/projects", label: "Work", icon: Briefcase },
  { href: "/about", label: "About", icon: User },
  { href: "/skills", label: "Skills", icon: Code },
  { href: "/resume.pdf", label: "Résumé", icon: FileText },
]

function ThemeToggle({ className = "" }: { className?: string }) {
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
      className={`inline-flex size-11 cursor-pointer items-center justify-center rounded-md text-foreground hover:bg-accent ${className}`}
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

  // Close the drawer when the route changes, or it stays open over the new page.
  useEffect(() => setIsOpen(false), [pathname])

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto max-w-[1440px] px-6 sm:px-10 lg:px-20">
        <div className="flex h-16 items-center justify-between md:h-22">
          <Link
            href="/"
            className="font-serif text-lg font-medium tracking-[-0.01em] md:text-xl"
          >
            Saikrishnan&nbsp;Iyer
          </Link>

          {/* Desktop: text only. Icon plus label on every item looks like a toolbar. */}
          <nav className="hidden items-center gap-10 self-stretch md:flex">
            {navItems.slice(1).map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`label-mono flex h-full items-center border-b-2 ${
                    isActive
                      ? "border-brand font-medium text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <span aria-hidden className="-ml-3 block h-[22px] w-px bg-border" />
            <ThemeToggle className="-mr-3" />
          </nav>

          <div className="-mr-2 flex items-center gap-0.5 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              className="inline-flex size-11 cursor-pointer items-center justify-center rounded-md text-foreground hover:bg-accent"
            >
              {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile: icons help here, where a bare text row is easy to mis-tap. */}
      {isOpen && (
        <nav className="border-t border-border bg-background md:hidden">
          <div className="mx-auto max-w-[1440px] px-4 py-2 sm:px-8">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`flex min-h-11 items-center gap-3 rounded-md px-3 py-2.5 text-base ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  } hover:bg-accent hover:text-foreground`}
                >
                  <Icon className="size-[18px]" strokeWidth={1.6} />
                  <span>{item.label}</span>
                  {isActive && <span aria-hidden className="ml-auto h-1 w-1 rounded-full bg-brand" />}
                </Link>
              )
            })}
          </div>
        </nav>
      )}
    </header>
  )
}
