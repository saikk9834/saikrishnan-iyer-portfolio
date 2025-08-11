import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Calendar, Award, Heart, Mail, Linkedin, Github } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">About Me</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            AI Software Engineer passionate about building scalable AI solutions that solve real-world problems and
            enhance human capabilities.
          </p>
        </div>

        {/* Contact Info */}
        <div className="flex justify-center space-x-6 mb-12">
          <a
            href="mailto:saikrishnaniyerjm@gmail.com"
            className="flex items-center space-x-2 text-slate-300 hover:text-blue-400 transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span>saikrishnaniyerjm@gmail.com</span>
          </a>
          <a
            href="https://linkedin.com/in/saikk9834"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-slate-300 hover:text-blue-400 transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/saikk9834"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-slate-300 hover:text-blue-400 transition-colors"
          >
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Personal Story */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">My Journey</h2>
              <div className="space-y-4 text-slate-300">
                <p>
                  My journey in AI began during my Bachelor's in Computer Science at BMS Institute of Technology, where
                  I discovered the transformative potential of machine learning and natural language processing.
                </p>
                <p>
                  After gaining valuable industry experience at Dell and IBM, where I built NLP-powered solutions that
                  reduced processing times by up to 60%, I pursued my Master's in Artificial Intelligence at
                  Northeastern University to deepen my expertise.
                </p>
                <p>
                  Currently, as an AI Software Engineer at Precision Planting, I'm engineering scalable RAG chatbots and
                  AI solutions using AWS Bedrock, TypeScript, and React, focusing on creating intelligent systems that
                  enhance business operations and user experiences.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Facts */}
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-6 gradient-text">Quick Facts</h2>
              <div className="space-y-6">
                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300">Bloomington, IL</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300">4+ Years Experience</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Award className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300">MS in Artificial Intelligence</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Heart className="w-5 h-5 text-blue-400" />
                  <span className="text-slate-300">AI Research Enthusiast</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Education */}
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Education</h2>
            <div className="space-y-6">
              <div className="border-l-4 border-blue-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">Master of Science in Artificial Intelligence</h3>
                <p className="text-slate-300 mb-1">Northeastern University, Khoury College of Computer Science</p>
                <p className="text-slate-400 text-sm">Boston, MA • Aug 2021 - May 2023</p>
              </div>
              <div className="border-l-4 border-purple-500 pl-6">
                <h3 className="text-xl font-semibold text-white mb-2">Bachelor of Engineering in Computer Science</h3>
                <p className="text-slate-300 mb-1">BMS Institute of Technology and Management</p>
                <p className="text-slate-400 text-sm">Bangalore, India • Sept 2016 - Sept 2020</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Values & Philosophy */}
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm mb-16">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Values & Philosophy</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🎯</span>
                </div>
                <h3 className="font-semibold mb-2 text-white">Impact-Driven</h3>
                <p className="text-slate-400 text-sm">
                  Building AI solutions that create measurable business value and solve real-world challenges.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="font-semibold mb-2 text-white">Efficiency-Focused</h3>
                <p className="text-slate-400 text-sm">
                  Passionate about automation and optimization, consistently reducing processing times by 40-60%.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤝</span>
                </div>
                <h3 className="font-semibold mb-2 text-white">Collaborative</h3>
                <p className="text-slate-400 text-sm">
                  Thriving in cross-functional teams to deliver scalable, enterprise-grade AI solutions.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Interests */}
        <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
          <CardContent className="p-8">
            <h2 className="text-2xl font-bold mb-6 gradient-text">Interests & Expertise Areas</h2>
            <div className="flex flex-wrap gap-3">
              {[
                "Natural Language Processing",
                "Computer Vision",
                "RAG Systems",
                "AWS Cloud Architecture",
                "Machine Learning Engineering",
                "Full-Stack Development",
                "Automation & Optimization",
                "Enterprise AI Solutions",
                "Research & Development",
              ].map((interest) => (
                <Badge key={interest} variant="secondary" className="bg-slate-800 text-slate-300 hover:bg-slate-700">
                  {interest}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
