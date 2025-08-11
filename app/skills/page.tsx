"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Brain, Code, Database, X } from "lucide-react"

type Role = "Computer Vision Engineer" | "NLP Engineer" | "AI Engineer" | "Software Development Engineer"

const skillCategories = [
  {
    title: "AI/ML & Deep Learning",
    icon: Brain,
    color: "from-purple-500 to-pink-500",
    roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
    skills: [
      {
        name: "TensorFlow",
        level: 90,
        frameworks: ["Keras", "TensorFlow Serving", "TensorBoard"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "PyTorch",
        level: 85,
        frameworks: ["torchvision", "transformers", "Lightning"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "scikit-learn",
        level: 95,
        frameworks: ["Pandas", "NumPy", "Matplotlib"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "XGBoost",
        level: 80,
        frameworks: ["LightGBM", "CatBoost"],
        roles: ["AI Engineer"] as Role[],
      },
      {
        name: "Recommender Systems",
        level: 75,
        frameworks: ["Collaborative Filtering", "Content-Based"],
        roles: ["AI Engineer"] as Role[],
      },
      {
        name: "Langchain",
        level: 85,
        frameworks: ["RAG", "Vector Stores", "Agents"],
        roles: ["NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "A/B Testing",
        level: 70,
        frameworks: ["Statistical Analysis", "Experimentation"],
        roles: ["AI Engineer"] as Role[],
      },
    ],
  },
  {
    title: "Programming & Data Analysis",
    icon: Code,
    color: "from-blue-500 to-cyan-500",
    roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer", "Software Development Engineer"] as Role[],
    skills: [
      {
        name: "Python",
        level: 95,
        frameworks: ["FastAPI", "Django", "Flask"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "Pandas",
        level: 90,
        frameworks: ["NumPy", "Matplotlib", "Seaborn"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "NumPy",
        level: 90,
        frameworks: ["SciPy", "Matplotlib"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "SQL",
        level: 85,
        frameworks: ["PostgreSQL", "MySQL", "SQLite"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "Spark",
        level: 75,
        frameworks: ["PySpark", "Spark SQL"],
        roles: ["AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "Feature Engineering",
        level: 85,
        frameworks: ["Data Preprocessing", "Scaling"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "Node.js",
        level: 80,
        frameworks: ["Express", "NestJS"],
        roles: ["Software Development Engineer"] as Role[],
      },
      {
        name: "TypeScript",
        level: 85,
        frameworks: ["React", "Next.js", "Angular"],
        roles: ["Software Development Engineer"] as Role[],
      },
    ],
  },
  {
    title: "ML Engineering & Deployment",
    icon: Database,
    color: "from-green-500 to-emerald-500",
    roles: ["Computer Vision Engineer", "AI Engineer", "Software Development Engineer"] as Role[],
    skills: [
      {
        name: "Git",
        level: 90,
        frameworks: ["GitHub", "GitLab", "Bitbucket"],
        roles: ["Computer Vision Engineer", "AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "AI Solution Deployment",
        level: 85,
        frameworks: ["Docker", "Kubernetes", "CI/CD"],
        roles: ["AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "Collaborative Development",
        level: 90,
        frameworks: ["Agile", "Code Reviews", "Documentation"],
        roles: ["Computer Vision Engineer", "AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "AWS Bedrock",
        level: 85,
        frameworks: ["Lambda", "S3", "ECS"],
        roles: ["AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "AWS Lambda",
        level: 80,
        frameworks: ["Serverless", "API Gateway"],
        roles: ["Software Development Engineer"] as Role[],
      },
      {
        name: "AWS S3",
        level: 85,
        frameworks: ["CloudFront", "IAM"],
        roles: ["Software Development Engineer"] as Role[],
      },
      {
        name: "AWS ECS",
        level: 75,
        frameworks: ["Fargate", "ECR"],
        roles: ["Software Development Engineer"] as Role[],
      },
    ],
  },
  {
    title: "Concepts & Techniques",
    icon: Brain,
    color: "from-orange-500 to-red-500",
    roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
    skills: [
      {
        name: "Supervised Learning",
        level: 95,
        frameworks: ["Classification", "Regression", "Ensemble Methods"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "Unsupervised Learning",
        level: 85,
        frameworks: ["Clustering", "Dimensionality Reduction"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "Natural Language Processing",
        level: 90,
        frameworks: ["BERT", "Transformers", "Named Entity Recognition"],
        roles: ["NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "Deep Learning",
        level: 85,
        frameworks: ["CNNs", "RNNs", "Transformers"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "Model Optimization",
        level: 80,
        frameworks: ["Hyperparameter Tuning", "Pruning", "Quantization"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "Computer Vision",
        level: 85,
        frameworks: ["OpenCV", "Object Detection", "Image Processing"],
        roles: ["Computer Vision Engineer", "AI Engineer"] as Role[],
      },
    ],
  },
]

export default function SkillsPage() {
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)

  const roles: Role[] = ["Computer Vision Engineer", "NLP Engineer", "AI Engineer", "Software Development Engineer"]

  const filteredCategories = selectedRole
    ? skillCategories
        .filter((category) => category.roles.includes(selectedRole))
        .map((category) => ({
          ...category,
          skills: category.skills.filter((skill) => skill.roles.includes(selectedRole)),
        }))
        .filter((category) => category.skills.length > 0)
    : skillCategories

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="gradient-text">Technical Skills</span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            A comprehensive overview of my technical expertise in AI/ML, software development, and cloud technologies,
            backed by real-world project experience.
          </p>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-white mb-4">Looking for skills for a specific role?</h2>
            <div className="flex flex-wrap justify-center gap-3 mb-4">
              {roles.map((role) => (
                <Button
                  key={role}
                  variant={selectedRole === role ? "default" : "outline"}
                  onClick={() => setSelectedRole(selectedRole === role ? null : role)}
                  className={`${
                    selectedRole === role
                      ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0"
                      : "border-slate-600 text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  {role}
                </Button>
              ))}
            </div>
            {selectedRole && (
              <div className="flex justify-center">
                <Button
                  variant="ghost"
                  onClick={() => setSelectedRole(null)}
                  className="text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4 mr-2" />
                  Clear filter
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Skills Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {filteredCategories.map((category) => {
            const Icon = category.icon
            return (
              <Card key={category.title} className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3">
                    <div
                      className={`w-10 h-10 rounded-lg bg-gradient-to-r ${category.color} flex items-center justify-center`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="gradient-text">{category.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {category.skills.map((skill) => (
                      <div key={skill.name} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="font-medium text-white">{skill.name}</span>
                          <span className="text-sm text-slate-400">{skill.level}%</span>
                        </div>
                        <Progress value={skill.level} className="h-2 bg-slate-800" />
                        <div className="flex flex-wrap gap-2">
                          {skill.frameworks.map((framework) => (
                            <Badge key={framework} variant="secondary" className="bg-slate-800 text-slate-300 text-xs">
                              {framework}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <Card className="bg-slate-900/50 border-slate-700 backdrop-blur-sm">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4 gradient-text">Professional Experience</h2>
              <p className="text-slate-300 max-w-2xl mx-auto">
                These skills have been developed and refined through hands-on experience across multiple roles at
                companies like Precision Planting, IBM, Dell, and E-Green LLC, where I've consistently delivered
                measurable results and efficiency improvements of 40-60%.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
