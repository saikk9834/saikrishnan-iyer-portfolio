import type React from "react"
import type { Metadata, Viewport } from "next"
import { Bodoni_Moda } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Navigation from "@/components/navigation"
import Ask from "@/components/ask"
import PointField from "@/components/field/point-field"
import SiteFooter from "@/components/site-footer"

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
  variable: "--font-bodoni",
})

export const metadata: Metadata = {
  title: "Saikrishnan Iyer - AI Software Engineer",
  description:
    "Portfolio of Saikrishnan Srinivas Iyer, AI Software Engineer building retrieval-augmented systems, NLP pipelines, and computer-vision tools.",
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0c" },
    { media: "(prefers-color-scheme: light)", color: "#ece8df" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodoni.variable} ${GeistSans.variable} ${GeistMono.variable} antialiased`}
    >
      <body className="min-h-dvh font-sans text-foreground">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <PointField />
          <Navigation />
          <main className="relative z-10">{children}</main>
          <SiteFooter />
          <Ask />
        </ThemeProvider>
      </body>
    </html>
  )
}
