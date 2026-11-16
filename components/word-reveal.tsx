import type { ReactNode } from "react"

/*
  Lights a sentence word by word as the section scrolls, using CSS scroll timelines
  (see .thesis in globals.css). Browsers without them just show the sentence.
  A word wrapped in *asterisks* is set in italic accent.
*/
export function WordReveal({ text }: { text: string }): ReactNode {
  const words = text.split(" ")
  return words.map((word, index) => {
    const emphasis = word.includes("*")
    return (
      <span key={index} className="thesis-word" style={{ "--p": index / words.length } as React.CSSProperties}>
        {emphasis ? <em className="text-brand">{word.replaceAll("*", "")}</em> : word}{" "}
      </span>
    )
  })
}
