import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "lucide-react"
import Image from "next/image"

const workProjects = [
  {
    id: 1,
    title: "Scalable RAG Chatbot System",
    company: "Precision Planting",
    period: "Oct 2023 – Present",
    description:
      "Engineered a scalable RAG Chatbot leveraging AWS Bedrock with full-stack development in TypeScript, React, and Node.js, enabling efficient handling of complex support, HR, and sales inquiries.",
    image: "/conversational-ai-chatbot-interface.png",
    technologies: ["AWS Bedrock", "TypeScript", "React", "Node.js", "RAG"],
    achievements: [
      "Integrated with company's quote system",
      "Reduced manual processing time by 60%",
      "Increased response speed by 45%",
    ],
    featured: true,
  },
  {
    id: 2,
    title: "Automated Hand Steerable UV Sterilization",
    company: "E-Green LLC",
    period: "May 2022 – Dec 2022",
    description:
      "Spearheaded development of hand gesture recognition algorithms on Raspberry Pi and Nvidia Jetson Nano for intuitive lighting control and streamlined sterilization processes.",
    image: "/ai-code-editor.png",
    technologies: ["Python", "Computer Vision", "Raspberry Pi", "Nvidia Jetson Nano", "OpenCV"],
    achievements: [
      "Enhanced real-time processing capabilities by 50%",
      "Improved system reliability significantly",
      "Led ML-driven image generation project",
    ],
    featured: true,
  },
  {
    id: 3,
    title: "GitHub Bot with NLP",
    company: "IBM",
    period: "Jan 2020 - Aug 2021",
    description:
      "Designed GitHub bot using advanced Natural Language Processing methods, including named entity recognition, to automate the review process for pull requests.",
    image: "/document-processing-ai-interface.png",
    technologies: ["Python", "NLP", "Named Entity Recognition", "GitHub API", "Machine Learning"],
    achievements: [
      "Reduced review time from 3 hours to 5 seconds",
      "Enhanced development team efficiency",
      "Improved software quality and reliability",
    ],
    featured: true,
  },
  {
    id: 4,
    title: "NLP-based Support Ticket Analyzer",
    company: "Dell INC.",
    period: "July 2019 - Dec 2019",
    description:
      "Built an NLP-based Google Chrome App to analyze support ticket data, identify key issues, and provide relevant solutions on ServiceNow to streamline the support ticket resolution process.",
    image: "/analytics-dashboard.png",
    technologies: ["Python", "NLP", "Chrome Extension", "ServiceNow", "Topic Modeling"],
    achievements: [
      "Reduced average resolution time by 40%",
      "Implemented advanced NLP techniques",
      "Improved support efficiency significantly",
    ],
    featured: false,
  },
]

const academicProjects = [
  {
    id: 5,
    title: "COVID-19 Impact on Personal Income Analysis",
    period: "Jan 2023 - May 2023",
    description:
      "Analyzed the impact of COVID-19 on annual personal income in the United States using machine learning classifiers and complex datasets to draw meaningful insights.",
    image: "/analytics-dashboard.png",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Data Analysis"],
    achievements: [
      "Achieved 85% accuracy using multiple classifiers",
      "Used Naïve Bayes, Decision Tree, SVM, k-NN",
      "Performed advanced feature engineering",
    ],
    featured: false,
  },
  {
    id: 6,
    title: "Tennis Ball Collector Bot",
    period: "Jan 2022 – May 2022",
    description:
      "Developed computer vision algorithms for object recognition and tracking, with robotic arm and gripper system for autonomous tennis ball collection.",
    image: "/ai-code-editor.png",
    technologies: ["Python", "Computer Vision", "OpenCV", "Robotics", "Machine Learning"],
    achievements: [
      "95% detection accuracy across 3 surfaces",
      "98% collection success rate",
      "Reduced damage incidents by 70%",
    ],
    featured: true,
  },
  {
    id: 7,
    title: "Foreign Text Translation & Classification",
    period: "Sept 2021 - Dec 2021",
    description:
      "Built a comprehensive NLP pipeline for Hindi-to-English translation, summarization, and classification using advanced deep learning models.",
    image: "/document-processing-ai-interface.png",
    technologies: ["Python", "LSTM", "BERT", "LDA", "NLP", "Deep Learning"],
    achievements: [
      "90% BLEU score for translation",
      "85% accuracy in classification",
      "Advanced summarization capabilities",
    ],
    featured: false,
  },
]

export default function ProjectsPage() {
  const featuredProjects = [...workProjects, ...academicProjects].filter((p) => p.featured)
  const otherProjects = [...workProjects, ...academicProjects].filter((p) => !p.featured)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">My Projects</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            A showcase of AI-powered applications and systems I've built across industry and academia, focusing on
            real-world impact and measurable results.
          </p>
        </div>

        {/* Featured Projects */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 gradient-text">Featured Projects</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-slate-900/50 border-slate-700 backdrop-blur-sm overflow-hidden hover:border-slate-600 transition-colors"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl gradient-text">{project.title}</CardTitle>
                    <div className="flex items-center space-x-2 text-slate-400">
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">{project.period}</span>
                    </div>
                  </div>
                  { project?.company && <p className="text-slate-400 text-sm">{project.company}</p>}
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 mb-4">{project.description}</p>

                  {/* Achievements */}
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-white mb-2">Key Achievements:</h4>
                    <ul className="text-sm text-slate-300 space-y-1">
                      {project.achievements.map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-2">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-slate-800 text-slate-300">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Other Projects */}
        <section>
          <h2 className="text-3xl font-bold mb-8 gradient-text">Other Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherProjects.map((project) => (
              <Card
                key={project.id}
                className="bg-slate-900/50 border-slate-700 backdrop-blur-sm hover:border-slate-600 transition-colors"
              >
                <div className="relative h-32 overflow-hidden">
                  <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg gradient-text">{project.title}</CardTitle>
                  </div>
                  <div className="flex items-center space-x-2 text-slate-400 text-sm">
                    <Calendar className="w-3 h-3" />
                    <span>{project.period}</span>
                  </div>
                  {"company" in project && <p className="text-slate-400 text-sm">{project.company}</p>}
                </CardHeader>
                <CardContent>
                  <p className="text-slate-300 text-sm mb-4 line-clamp-3">{project.description}</p>

                  <div className="mb-4">
                    <h4 className="text-xs font-semibold text-white mb-2">Key Results:</h4>
                    <ul className="text-xs text-slate-300 space-y-1">
                      {project.achievements.slice(0, 2).map((achievement, index) => (
                        <li key={index} className="flex items-start">
                          <span className="text-blue-400 mr-1">•</span>
                          {achievement}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-wrap gap-1 mb-4">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech} variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                        {tech}
                      </Badge>
                    ))}
                    {project.technologies.length > 3 && (
                      <Badge variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                        +{project.technologies.length - 3}
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
