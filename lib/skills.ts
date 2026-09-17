export type Role = "Computer Vision Engineer" | "NLP Engineer" | "AI Engineer" | "Software Development Engineer"

export type Skill = {
  name: string
  /** Related libraries and sub-tools, shown beside the skill. */
  frameworks: string[]
  roles: Role[]
}

export type SkillCategory = {
  title: string
  roles: Role[]
  skills: Skill[]
}

export const roles: Role[] = [
  "AI Engineer",
  "NLP Engineer",
  "Computer Vision Engineer",
  "Software Development Engineer",
]

export const skillCategories: SkillCategory[] = [
  {
    title: "AI/ML & Deep Learning",
    roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
    skills: [
      {
        name: "TensorFlow",
        frameworks: ["Keras", "TensorFlow Serving", "TensorBoard"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "PyTorch",
        frameworks: ["torchvision", "transformers", "Lightning"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "scikit-learn",
        frameworks: ["Pandas", "NumPy", "Matplotlib"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "XGBoost",
        frameworks: ["LightGBM", "CatBoost"],
        roles: ["AI Engineer"] as Role[],
      },
      {
        name: "Recommender Systems",
        frameworks: ["Collaborative Filtering", "Content-Based"],
        roles: ["AI Engineer"] as Role[],
      },
      {
        name: "Langchain",
        frameworks: ["RAG", "Vector Stores", "Agents"],
        roles: ["NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "A/B Testing",
        frameworks: ["Statistical Analysis", "Experimentation"],
        roles: ["AI Engineer"] as Role[],
      },
    ],
  },
  {
    title: "Programming & Data Analysis",
    roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer", "Software Development Engineer"] as Role[],
    skills: [
      {
        name: "Python",
        frameworks: ["FastAPI", "Django", "Flask"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "Pandas",
        frameworks: ["NumPy", "Matplotlib", "Seaborn"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "NumPy",
        frameworks: ["SciPy", "Matplotlib"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "SQL",
        frameworks: ["PostgreSQL", "MySQL", "SQLite"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "Spark",
        frameworks: ["PySpark", "Spark SQL"],
        roles: ["AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "Feature Engineering",
        frameworks: ["Data Preprocessing", "Scaling"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "Node.js",
        frameworks: ["Express", "NestJS"],
        roles: ["Software Development Engineer"] as Role[],
      },
      {
        name: "TypeScript",
        frameworks: ["React", "Next.js", "Angular"],
        roles: ["Software Development Engineer"] as Role[],
      },
    ],
  },
  {
    title: "ML Engineering & Deployment",
    roles: ["Computer Vision Engineer", "AI Engineer", "Software Development Engineer"] as Role[],
    skills: [
      {
        name: "Git",
        frameworks: ["GitHub", "GitLab", "Bitbucket"],
        roles: ["Computer Vision Engineer", "AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "AI Solution Deployment",
        frameworks: ["Docker", "Kubernetes", "CI/CD"],
        roles: ["AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "Collaborative Development",
        frameworks: ["Agile", "Code Reviews", "Documentation"],
        roles: ["Computer Vision Engineer", "AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "AWS Bedrock",
        frameworks: ["Lambda", "S3", "ECS"],
        roles: ["AI Engineer", "Software Development Engineer"] as Role[],
      },
      {
        name: "AWS Lambda",
        frameworks: ["Serverless", "API Gateway"],
        roles: ["Software Development Engineer"] as Role[],
      },
      {
        name: "AWS S3",
        frameworks: ["CloudFront", "IAM"],
        roles: ["Software Development Engineer"] as Role[],
      },
      {
        name: "AWS ECS",
        frameworks: ["Fargate", "ECR"],
        roles: ["Software Development Engineer"] as Role[],
      },
    ],
  },
  {
    title: "Concepts & Techniques",
    roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
    skills: [
      {
        name: "Supervised Learning",
        frameworks: ["Classification", "Regression", "Ensemble Methods"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "Unsupervised Learning",
        frameworks: ["Clustering", "Dimensionality Reduction"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "Natural Language Processing",
        frameworks: ["BERT", "Transformers", "Named Entity Recognition"],
        roles: ["NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "Deep Learning",
        frameworks: ["CNNs", "RNNs", "Transformers"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "Model Optimization",
        frameworks: ["Hyperparameter Tuning", "Pruning", "Quantization"],
        roles: ["Computer Vision Engineer", "NLP Engineer", "AI Engineer"] as Role[],
      },
      {
        name: "Computer Vision",
        frameworks: ["OpenCV", "Object Detection", "Image Processing"],
        roles: ["Computer Vision Engineer", "AI Engineer"] as Role[],
      },
    ],
  },
]
