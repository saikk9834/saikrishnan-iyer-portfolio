export type Project = {
  id: number
  title: string
  company?: string
  period: string
  description: string
  technologies: string[]
  achievements: string[]
  /** Headline number for the row, taken from the first achievement. */
  metric: string
  metricLabel: string
}

export const workProjects: Project[] = [
  {
    id: 1,
    title: "Scalable RAG chatbot system",
    company: "Precision Planting",
    period: "Oct 2023 - Present",
    description:
      "A retrieval-augmented support assistant on AWS Bedrock, wired into the company quote system and fielding support, HR, and sales questions across the business.",
    technologies: ["AWS Bedrock", "TypeScript", "React", "Node.js", "RAG"],
    achievements: [
      "Reduced manual processing time by 60%",
      "Increased response speed by 45%",
      "Integrated with the company quote system",
    ],
    metric: "−60%",
    metricLabel: "Manual processing time",
  },
  {
    id: 2,
    title: "Hand-steerable UV sterilization",
    company: "E-Green LLC",
    period: "May - Dec 2022",
    description:
      "Gesture-recognition models running on Raspberry Pi and Jetson Nano, turning hand movement into direct control over a sterilization rig.",
    technologies: ["Python", "Computer Vision", "OpenCV", "Jetson Nano", "Raspberry Pi"],
    achievements: [
      "Enhanced real-time processing capabilities by 50%",
      "Improved system reliability significantly",
      "Led an ML-driven image generation project",
    ],
    metric: "+50%",
    metricLabel: "Real-time throughput",
  },
  {
    id: 3,
    title: "GitHub review bot with NLP",
    company: "IBM",
    period: "Jan 2020 - Aug 2021",
    description:
      "Named-entity recognition over pull request diffs and discussion, automating the first pass of code review for the platform team.",
    technologies: ["Python", "NLP", "Named Entity Recognition", "GitHub API", "Machine Learning"],
    achievements: [
      "Reduced review time from 3 hours to 5 seconds",
      "Enhanced development team efficiency",
      "Improved software quality and reliability",
    ],
    metric: "3h → 5s",
    metricLabel: "First-pass review",
  },
  {
    id: 4,
    title: "Support ticket analyzer",
    company: "Dell",
    period: "Jul - Dec 2019",
    description:
      "A Chrome extension that read ServiceNow ticket text, surfaced the underlying issue through topic modelling, and suggested prior resolutions inline.",
    technologies: ["Python", "NLP", "Chrome Extension", "ServiceNow", "Topic Modeling"],
    achievements: [
      "Reduced average resolution time by 40%",
      "Implemented advanced NLP techniques",
      "Improved support efficiency significantly",
    ],
    metric: "−40%",
    metricLabel: "Avg. resolution time",
  },
]

export const academicProjects: Project[] = [
  {
    id: 5,
    title: "Tennis ball collector bot",
    period: "Jan - May 2022",
    description:
      "Object recognition and tracking driving a robotic arm and gripper, collecting tennis balls autonomously across three court surfaces.",
    technologies: ["Python", "Computer Vision", "OpenCV", "Robotics", "Machine Learning"],
    achievements: [
      "98% collection success rate",
      "95% detection accuracy across 3 surfaces",
      "Reduced damage incidents by 70%",
    ],
    metric: "98%",
    metricLabel: "Collection success",
  },
  {
    id: 6,
    title: "Hindi–English translation pipeline",
    period: "Sep - Dec 2021",
    description:
      "An NLP pipeline covering translation, summarization, and classification, built on LSTM and BERT with LDA for topic structure.",
    technologies: ["Python", "LSTM", "BERT", "LDA", "NLP", "Deep Learning"],
    achievements: [
      "90% BLEU score for translation",
      "85% accuracy in classification",
      "Advanced summarization capabilities",
    ],
    metric: "90%",
    metricLabel: "BLEU score",
  },
  {
    id: 7,
    title: "COVID-19 impact on personal income",
    period: "Jan - May 2023",
    description:
      "Classifier comparison over US personal income data, measuring how the pandemic moved annual earnings across demographic groups.",
    technologies: ["Python", "Scikit-learn", "Pandas", "NumPy", "Data Analysis"],
    achievements: [
      "Achieved 85% accuracy using multiple classifiers",
      "Used Naïve Bayes, Decision Tree, SVM, k-NN",
      "Performed advanced feature engineering",
    ],
    metric: "85%",
    metricLabel: "Classifier accuracy",
  },
]

/** The three shown on the home page. */
export const featuredProjects = workProjects.slice(0, 3)
