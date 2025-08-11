import type React from "react"
import type { Metadata } from "next"
import { Inter, JetBrains_Mono } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import FloatingChatbot from "@/components/floating-chatbot"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
})

export const metadata: Metadata = {
  title: "Saikrishnan Iyer - AI Software Engineer",
  description:
    "Portfolio of Saikrishnan Iyer, AI Software Engineer specializing in machine learning, full-stack development, and innovative AI solutions.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}>
      <body className="bg-slate-950 text-white min-h-screen">
        <Navigation />
        {children}
        <FloatingChatbot />
      </body>
    </html>
  )
}
