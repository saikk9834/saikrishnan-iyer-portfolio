-- Create portfolio content tables
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  long_description TEXT,
  technologies JSONB,
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  image_url VARCHAR(500),
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS skills (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  category VARCHAR(50) NOT NULL,
  proficiency INTEGER CHECK (proficiency >= 1 AND proficiency <= 100),
  years_experience DECIMAL(3,1),
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS experiences (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company VARCHAR(255) NOT NULL,
  position VARCHAR(255) NOT NULL,
  description TEXT,
  start_date DATE,
  end_date DATE,
  current_role BOOLEAN DEFAULT false,
  technologies JSONB,
  achievements TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS chat_conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  session_id VARCHAR(255) NOT NULL,
  messages JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample data
INSERT INTO skills (name, category, proficiency, years_experience, description) VALUES
('Python', 'Programming Languages', 95, 5.0, 'Expert in Python for AI/ML, backend development, and automation'),
('JavaScript/TypeScript', 'Programming Languages', 90, 4.0, 'Full-stack development with modern frameworks'),
('React/Next.js', 'Frontend Frameworks', 88, 3.5, 'Building modern, responsive web applications'),
('Machine Learning', 'AI/ML', 92, 4.0, 'Deep learning, neural networks, and model deployment'),
('TensorFlow/PyTorch', 'AI/ML', 85, 3.0, 'Building and training deep learning models'),
('Node.js', 'Backend Technologies', 82, 3.0, 'Server-side JavaScript and API development'),
('PostgreSQL', 'Databases', 80, 3.5, 'Database design, optimization, and management'),
('Docker/Kubernetes', 'DevOps', 75, 2.5, 'Containerization and orchestration'),
('AWS/GCP', 'Cloud Platforms', 78, 2.0, 'Cloud infrastructure and deployment'),
('Git/GitHub', 'Tools', 90, 5.0, 'Version control and collaborative development');

INSERT INTO projects (title, description, long_description, technologies, github_url, live_url, featured) VALUES
('AI-Powered Code Analyzer', 'Advanced static analysis tool using machine learning to detect code patterns and suggest improvements', 'Built a comprehensive code analysis platform that uses transformer models to understand code semantics and provide intelligent suggestions. The system processes multiple programming languages and provides real-time feedback on code quality, security vulnerabilities, and performance optimizations.', '["Python", "TensorFlow", "FastAPI", "React", "PostgreSQL", "Docker"]', 'https://github.com/example/code-analyzer', 'https://code-analyzer-demo.vercel.app', true),
('Neural Network Visualizer', 'Interactive web application for visualizing and understanding neural network architectures', 'Created an educational tool that allows users to build, train, and visualize neural networks in real-time. Features include drag-and-drop network building, live training visualization, and interactive exploration of how different architectures affect learning.', '["JavaScript", "D3.js", "TensorFlow.js", "React", "Node.js"]', 'https://github.com/example/nn-visualizer', 'https://nn-viz.vercel.app', true),
('Distributed ML Pipeline', 'Scalable machine learning pipeline for processing large datasets', 'Designed and implemented a distributed system for training ML models on large datasets. The pipeline includes data preprocessing, model training, hyperparameter optimization, and automated deployment with monitoring and rollback capabilities.', '["Python", "Apache Spark", "Kubernetes", "MLflow", "PostgreSQL", "Redis"]', 'https://github.com/example/ml-pipeline', null, true);

INSERT INTO experiences (company, position, description, start_date, end_date, current_role, technologies, achievements) VALUES
('TechCorp AI', 'Senior AI Software Engineer', 'Lead development of AI-powered products and machine learning infrastructure', '2022-01-01', null, true, '["Python", "TensorFlow", "AWS", "Kubernetes", "PostgreSQL"]', ARRAY['Led team of 5 engineers in developing core AI features', 'Improved model inference speed by 40% through optimization', 'Architected scalable ML pipeline processing 1M+ requests daily']),
('DataFlow Systems', 'Machine Learning Engineer', 'Developed and deployed machine learning models for data analytics platform', '2020-06-01', '2021-12-31', false, '["Python", "PyTorch", "Docker", "GCP", "MongoDB"]', ARRAY['Built recommendation system increasing user engagement by 25%', 'Implemented A/B testing framework for ML experiments', 'Reduced model training time by 60% through distributed computing']),
('StartupXYZ', 'Full Stack Developer', 'Built web applications and APIs for early-stage fintech startup', '2019-03-01', '2020-05-31', false, '["JavaScript", "React", "Node.js", "PostgreSQL", "AWS"]', ARRAY['Developed MVP that secured $2M Series A funding', 'Built real-time trading dashboard handling 10K+ concurrent users', 'Implemented secure payment processing system']);
