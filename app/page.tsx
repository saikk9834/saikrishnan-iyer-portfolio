import Navigation from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-950 to-slate-950">
      <Navigation />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            {/* Profile Image */}
            <div className="mb-8 flex justify-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 p-1">
                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                    <img
                      src="/ai-engineer-headshot.png"
                      alt="Saikrishnan Srinivas Iyer"
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-slate-950"></div>
              </div>
            </div>

            {/* Name */}
            <div className="mb-4">
              <h1 className="text-4xl md:text-6xl font-bold mb-2">
                <span className="gradient-text">Saikrishnan Srinivas Iyer</span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-400 mb-2">AI Software Engineer</p>
              <p className="text-lg text-slate-500">Bloomington, IL</p>
            </div>

            <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Building scalable AI solutions with RAG systems, NLP, and computer vision. Transforming complex business
              challenges into intelligent, automated systems that deliver measurable results.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link href="/projects">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg glow-blue">
                  View My Work
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link href="/skills">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white px-8 py-3 text-lg bg-transparent"
                >
                  Explore Skills
                </Button>
              </Link>
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6">
              <a
                href="https://github.com/saikk9834"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Github className="w-6 h-6" />
              </a>
              <a
                href="https://linkedin.com/in/saikk9834"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="mailto:saikrishnaniyerjm@gmail.com"
                className="text-slate-400 hover:text-white transition-colors"
              >
                <Mail className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-900/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div className="float-animation">
              <div className="text-4xl font-bold gradient-text mb-2">4+</div>
              <div className="text-slate-300">Years Experience</div>
            </div>
            <div className="float-animation" style={{ animationDelay: "1s" }}>
              <div className="text-4xl font-bold gradient-text mb-2">60%</div>
              <div className="text-slate-300">Processing Time Reduced</div>
            </div>
            <div className="float-animation" style={{ animationDelay: "2s" }}>
              <div className="text-4xl font-bold gradient-text mb-2">95%</div>
              <div className="text-slate-300">Detection Accuracy</div>
            </div>
            <div className="float-animation" style={{ animationDelay: "3s" }}>
              <div className="text-4xl font-bold gradient-text mb-2">3 sec</div>
              <div className="text-slate-300">Review Time (from 3 hours)</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Technologies */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 gradient-text">Core Technologies</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {[
              { name: "Python", level: 95 },
              { name: "AWS Bedrock", level: 85 },
              { name: "TypeScript", level: 85 },
              { name: "TensorFlow", level: 90 },
              { name: "React", level: 80 },
            ].map((tech, index) => (
              <div key={tech.name} className="p-6 bg-slate-800/50 rounded-lg hover:bg-slate-700/50 transition-colors">
                <div className="text-2xl font-bold text-blue-400 mb-2">{tech.name}</div>
                <div className="w-full bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full"
                    style={{ width: `${tech.level}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
