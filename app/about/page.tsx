import { Scene } from "@/components/field/scene"

const timeline = [
  {
    year: "2016",
    place: "Bangalore",
    title: "BMS Institute of Technology",
    role: "Bachelor of Engineering, Computer Science",
    body: "Machine learning and NLP started as coursework here and turned into the thing I actually wanted to do.",
  },
  {
    year: "2019",
    place: "Bangalore",
    title: "Dell",
    role: "NLP Intern",
    body: "An application that read support tickets, found the underlying issue, and suggested prior fixes. Average resolution time fell 40%.",
  },
  {
    year: "2020",
    place: "Bangalore",
    title: "IBM",
    role: "Software Developer",
    body: "A GitHub bot that automated the first pass of pull-request review, taking it from three hours to five seconds.",
  },
  {
    year: "2021",
    place: "Boston",
    title: "Northeastern University",
    role: "MS Artificial Intelligence, Khoury College",
    body: "That work made the gaps in what I understood obvious, so I went back for a Master's.",
  },
  {
    year: "2022",
    place: "Boston",
    title: "E-Green",
    role: "Machine Learning Intern",
    body: "Gesture recognition on Raspberry Pi and Jetson Nano: models that had to run on the hardware, not just in a notebook.",
  },
  {
    year: "2023",
    place: "Bloomington, Illinois",
    title: "Precision Planting",
    role: "AI Software Engineer, to present",
    body: "A RAG chatbot on AWS Bedrock with TypeScript and React, which support, HR, and sales all need at once during planting season.",
  },
]

const values = [
  {
    title: "Measure the outcome",
    body: "Every project on this site has a number next to it. If I cannot measure what changed, I do not know whether it worked.",
  },
  {
    title: "Automate the tedious part",
    body: "Most of what I have shipped takes a manual process and cuts the time it needs by half or better.",
  },
  {
    title: "Build with the users nearby",
    body: "Support, HR, and sales all use the chatbot at Precision Planting. Getting it right meant sitting with each of them first.",
  },
]

const interests = [
  "Natural Language Processing",
  "Computer Vision",
  "RAG Systems",
  "AWS Cloud Architecture",
  "Machine Learning Engineering",
  "Full-Stack Development",
  "Automation & Optimization",
  "Enterprise AI Solutions",
  "Research & Development",
]

export default function AboutPage() {
  return (
    <>
      <Scene
        as="header"
        spec={{ kind: "portrait" }}
        anchor="#about-portrait"
        className="relative flex min-h-svh flex-col overflow-hidden"
      >
        <div
          id="about-portrait"
          aria-hidden
          className="absolute inset-x-0 top-[9svh] h-[42svh] lg:inset-y-[6svh] lg:right-[3vw] lg:left-auto lg:h-auto lg:w-[52vw]"
        />
        <div className="shell relative flex flex-1 flex-col justify-end pt-32 pb-24 lg:pb-14">
          <p className="eyebrow text-brand">About</p>
          <h1 className="display display-xl mt-6 text-[clamp(3.5rem,11.5vw,11rem)] leading-[0.96]">
            <span className="lift">
              <span>How I</span>
            </span>
            <span className="lift">
              <span style={{ animationDelay: "0.62s" }}>
                <em>got here</em>
              </span>
            </span>
          </h1>
          <p className="fade-in mt-8 max-w-[30rem] text-[18px] leading-[1.6] text-body">
            AI software engineer in Bloomington, Illinois. Most of my work is getting models into production and keeping
            them there.
          </p>
        </div>
      </Scene>

      {/* The years form on the stage while the story scrolls past. */}
      <section aria-label="Career timeline" className="shell lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-12">
        <ol>
          {timeline.map((entry) => (
            <Scene
              key={entry.year}
              as="li"
              spec={{ kind: "text", text: entry.year }}
              anchor="#about-stage"
              className="flex flex-col justify-center py-14 lg:min-h-svh"
            >
              <div data-anchor aria-hidden className="h-[24svh] lg:hidden" />
              <p className="eyebrow flex flex-wrap gap-x-4 text-muted-foreground">
                <span className="text-brand">{entry.year}</span>
                <span>{entry.place}</span>
              </p>
              <h2 className="display mt-5 text-[clamp(2.25rem,4.6vw,4.25rem)] leading-[1.03]">{entry.title}</h2>
              <p className="eyebrow mt-4 text-muted-foreground">{entry.role}</p>
              <p className="mt-6 max-w-[33rem] text-[18px] leading-[1.65] text-body">{entry.body}</p>
            </Scene>
          ))}
        </ol>
        <div id="about-stage" aria-hidden className="sticky top-0 hidden h-svh lg:block" />
      </section>

      <Scene as="section" spec={{ kind: "sheet" }} className="shell pt-20 pb-24">
        <h2 className="eyebrow text-brand">How I work</h2>
        <div className="mt-8">
          {values.map((value, index) => (
            <div
              key={value.title}
              className="rise grid gap-x-10 gap-y-3 border-t border-border py-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-baseline"
            >
              <h3 className="display text-[clamp(2rem,4.4vw,3.75rem)] leading-[1.06]">
                <span className="eyebrow mr-4 align-middle text-muted-foreground">0{index + 1}</span>
                {value.title}
              </h3>
              <p className="text-[17px] leading-[1.65] text-body">{value.body}</p>
            </div>
          ))}
        </div>

        <h2 className="eyebrow mt-20 text-muted-foreground">Areas of interest</h2>
        <p className="display mt-6 max-w-[24em] text-[clamp(1.5rem,2.8vw,2.5rem)] leading-[1.3] text-body">
          {interests.join(" · ")}
        </p>
      </Scene>
    </>
  )
}
