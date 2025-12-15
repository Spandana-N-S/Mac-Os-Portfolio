// Save this as lib/portfolioData.ts

export const portfolioData = {
  about: {
    name: "NATHISHWAR C",
    role: "AI Powered Full stack Developer",
    location: "Krishnagiri, Tamilnadu",
    bio:
      `I’m Nathishwar — an AI-Powered Full Stack Developer, open-source builder, and the creator of multiple AI tools and libraries. I build intelligent systems that combine modern full-stack engineering with advanced AI automation.

I’m the author of PywhatKit_alt, Quick Invoice (Python module), and the creator of Ruixen AI — a next-gen AI software ecosystem. I also founded KnowGrow and created Codex, a real-time collaborative coding platform used by developers for instant multi-user sessions.

I’ve worked on 10+ open-source AI projects, contributed to full-stack systems, and explored more than 100+ AI tools and 50+ vibe-code tools. My work spans Gen-AI assistants, automation platforms, real-time apps, and developer tools.

Currently, I’m pursuing B.Tech in Artificial Intelligence & Data Science with strong academic performance, and I specialize in integrating AI models with scalable web apps using Next.js, Node.js, Python, LangChain, and Docker.

When I’m not building, I love listening to music, vibecoding, exploring futuristic tech, and experimenting with creative AI systems that challenge imagination and logic together.`
    ,
    education: `B.Tech – Artificial Intelligence & Data Science (2023–2027), CGPA: 9.0`
    , // kept from your original data
  },

  contact: {
    email: "nathishwarc@gmail.com",
    github: "github.com/Nathishwar-prog",
    linkedin: "linkedin.com/in/nathishwar/",
    website: "knowgrow.tech/",
    phone: "+91 8838746347",
    twitter: "@nathishwarc",
    instagram: "instagram.com/pvt_life_of_nathish",
  },

  education: [
    {
      degree: "B.Tech Artificial Intelligence and Data Science",
      university: "Dhanalakshmi Srinivasan Engineering College",
      date: "Aug 2023 - May 2027",
      grade: "9.0 CGPA (Till 4th Sem)",
    },
    {
      degree: "Bio Mathematics",
      university: "Marutham matric.Hr.Sec.School",
      date: "Jun 2021 - May 2023",
      grade: "89.8%",
    },
  ],

  skills: {
    "Front-End": [
      "JavaScript (ES6+)",
      "TypeScript",
      "React.js",
      "Next.js",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Bootstrap",
      "Responsive UI",
      "Redux",
      "Material UI",
    ],
    "Back-End": [
      "Python",
      "Node.js",
      "Express.js",
      "FastAPI",
      "Flask",
      "RESTful APIs",
      "Microservices",
      "API Design",
    ],
    Databases: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Database Architecture",
      "SQL Joins",
      "Query Optimization",
      "Data Modeling",
    ],
    "AI & ML": [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "OpenCV",
      "spaCy",
      "MediaPipe",
      "Hugging Face Transformers",
      "LangChain",
      "OpenAI API",
    ],
    "DevOps & Tools": [
      "Git",
      "GitHub",
      "GitLab",
      "Docker",
      "Jenkins (CI/CD)",
      "AWS",
      "Render",
      "Netlify",
      "Vercel",
      "Linux/WSL",
      "Shell Scripting",
      "Postman",
      "ThunderBolt",
      "Insomnia",
    ],
    "Additional Skills": [
      "Agile Methodologies",
      "Agile Scrum",
      "Documentation",
      "Software Debugging",
      "Authentication (JWT, OAuth2)",
      "WebSockets",
      "Data Visualization (Matplotlib, Plotly)",
      "Team Collaboration",
    ],
  },

  workExperience: [
    {
      role: "AI-Powered Full Stack Engineer Intern",
      company: "KnowGrow Startup",
      date: "Jan 2025 - Apr 2025",
      location: "Remote",
      description: [
        "Developed and deployed AI-integrated full-stack web applications using React.js, Node.js, Python, and MongoDB.",
        "Implemented intelligent automation features leveraging LangChain, OpenAI APIs, and scikit-learn models for personalized learning and recommendation engines.",
        "Collaborated with data and backend teams to design and scale RESTful APIs and microservice-based architectures.",
        "Optimized front-end performance and enhanced UX using Next.js, Tailwind CSS, and efficient state management.",
      ],
    },
    {
      role: "AI/ML Intern (Virtual)",
      company: "Google - EduSkills & AICTE Program",
      date: "Jun 2024 - Aug 2024",
      location: "Virtual",
      description: [
        "Completed a 10-week training focused on Computer Vision, NLP, and Data Science projects.",
        "Gained hands-on experience with TensorFlow, PyTorch, and OpenCV for model development and deployment.",
        "Built end-to-end AI solutions, including supervised learning models and deep neural networks.",
        "Enhanced understanding of ethical AI practices, data handling, and project management workflows.",
      ],
    },
  ],

  // ✅ Your existing portfolio projects fully merged + preserved
  projects: [
    {
      title: "Gen AI-Tutor (Ruixen AI)",
      subtitle: "AI-powered tutoring platform",
      name: "Gen AI-Tutor (Ruixen AI)",
      description: "AI-powered tutoring platform for general knowledge and subject-specific topics",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe", "OpenAI API", "Next.js"],
      live: "https://aitutor.knowgrow.tech",
      codeLink: "https://future-on-ai.neocities.org/noacesss",
      innovation: [
        "Multi-model AI orchestration delivering adaptive learning",
        "Real-time personalized feedback",
        "Dynamic content generation for every learner.",
      ],
      keyFeatures: [
        "Adaptive AI tutoring engine",
        "Natural language understanding for precise query handling",
        "Personalized recommendations based on user behavior",
        "Real-time feedback analysis",
        "Scalable microservice backend",
        "Secure JWT authentication",
      ],
      code: {
        language: "typescript",
        content: `// AI Service Integration Example usage 
const aiService = new AiService({
  model: 'gpt-4',
  temperature: 0.7
});

async function getTutorResponse(topic: string, userQuery: string) {
  const context = await retrieveContext(topic);
  const response = await aiService.generate({
    prompt: \`Act as a tutor for \${topic}. User asks: \${userQuery}\`,
    context
  });
  return response;
}`,
      },
      preview: null,
    },

    {
      title: "Task Management App",
      subtitle: "Collaborative task management tool",
      name: "Task Management App",
      description: "Collaborative task management tool with real-time updates and team coordination features.",
      tech: ["React", "Firebase", "Tailwind CSS"],
      live: "https://nathishwar.me",
      codeLink: "https://github.com/Nathishwar-prog", // Updated to generic github as specific link was placeholder
      innovation: [
        "Real-time synchronization using Firestore listeners",
        "Optimistic UI updates for instant feedback",
        "Role-based access control for team security",
      ],
      keyFeatures: ["Task management", "Real-time updates", "Collaboration", "Status tracking", "Priority tagging"],
      code: {
        language: "typescript",
        content: `// Real-time task updates with Firebase

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebase-config';

export function subscribeToTasks(userId: string, callback: (tasks: Task[]) => void) {
  const q = query(
    collection(db, 'tasks'),
    where('userId', '==', userId)
  );

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Task[];

    callback(tasks);
  });
}`,
      },
      preview: null,
    },

    {
      title: "Weather Dashboard",
      subtitle: "Data visualization for forecasts",
      name: "Weather Dashboard",
      description: "Beautiful weather forecast application with interactive data visualization charts.",
      tech: ["React", "OpenWeather API", "Chart.js"],
      live: "https://nathishwar.me",
      codeLink: "https://github.com/Nathishwar-prog", // Updated to generic github as specific link was placeholder
      innovation: [
        "Location-based automatic forecasting",
        "Interactive charts for temperature trends",
        "Responsive design for all devices",
      ],
      keyFeatures: ["Weather forecasting", "Data visualization", "User-friendly interface", "City search", "5-day forecast"],
      code: {
        language: "typescript",
        content: `// Fetch weather data from OpenWeather API

interface WeatherData {
  temp: number;
  description: string;
  humidity: number;
  windSpeed: number;
}

export async function fetchWeather(city: string): Promise<WeatherData> {
  const apiKey = process.env.OPENWEATHER_API_KEY;
  const url = \`https://api.openweathermap.org/data/2.5/weather?q=\${city}&appid=\${apiKey}&units=metric\`;

  const response = await fetch(url);
  const data = await response.json();

  return {
    temp: Math.round(data.main.temp),
    description: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
}`,
      },
      preview: null,
    },
    {
      title: "Developer Kit",
      subtitle: "General components and styles",
      name: "Developer Kit",
      description: "General components and styles for development.",
      tech: ["React", "Firebase", "Tailwind CSS"],
      live: "https://nathishwar.me",
      codeLink: "https://github.com/Nathishwar-prog", // Updated to generic github as specific link was placeholder
      innovation: [
        "General components and styles for development",
        "General components and styles for development",
        "General components and styles for development",
      ],
      keyFeatures: ["Task management", "Real-time updates", "Collaboration", "Status tracking", "Priority tagging"],
      code: {
        language: "typescript",
        content: `// Real-time task updates with Firebase

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from './firebase-config';

export function subscribeToTasks(userId: string, callback: (tasks: Task[]) => void) {
  const q = query(
    collection(db, 'tasks'),
    where('userId', '==', userId)
  );

  return onSnapshot(q, (snapshot) => {
    const tasks = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Task[];

    callback(tasks);
  });
}`,
      },
      preview: null,
    },
  ],

  achievements: [
    { title: "GitHub Star", description: "Recognized as a GitHub Star for contributions to the developer community", date: "2023", icon: "Star" },
    { title: "Hackathon Winner", description: "First place in the National AI Hackathon 2022", date: "2022", icon: "Trophy" },
    { title: "Open Source Contributor", description: "Top 10 contributor to React ecosystem projects", date: "2021", icon: "GitPullRequest" },
    { title: "Tech Speaker", description: "Presented at 15+ international conferences on web development", date: "2020–Present", icon: "Mic" },
    { title: "Mentorship Award", description: "Received company award for mentoring junior developers", date: "2021", icon: "Users" },
    { title: "Innovation Grant", description: "Received $50k grant for innovative AI research project", date: "2020", icon: "Lightbulb" },
  ],

  certificates: [
    {
      name: "AI/ML Virtual Internship",
      issuer: "Google",
      date: "2024",
      credentialId: "e291ca949fcfa3f415fccf9008e78266.",
      link: "https://drive.google.com/file/d/1MLIs740REVglsrPR6w55NpTHzb1y60jc/view?usp=sharing"
    },
    {
      name: "Problem Solving",
      issuer: "Hackerrank",
      date: "2024",
      credentialId: "FE35A5B19540",
      link: "https://drive.google.com/file/d/1yAo4pjXy919k2JgVuGl17t557EF8_tcC/view?usp=sharing"
    },
    {
      name: "Learnathon 2024",
      issuer: "ICT Academy",
      date: "2024",
      credentialId: "ICT-345678",
      link: "https://drive.google.com/file/d/1_dafaqNtyGAcrnIrVn-QHxP1UYnzwMv_/view?usp=sharing"
    },
    {
      name: "AI Engineer Internship",
      issuer: "NoviTech private limited",
      date: "2024",
      credentialId: "AIIN2547",
      link: "https://drive.google.com/file/d/16XrgsZyLNlkYf8NN_oVLD0l9XFcfLa71/view?usp=sharing"
    },
    {
      name: "Data Analyst Internship",
      issuer: "Unified Mentor Pvt Ltd",
      date: "2025",
      credentialId: "U85500HR2023PTC115118",
      link: "https://drive.google.com/file/d/14OOEkrdQOJX_KJl8RVgsz0UKxpcHKQYE/view?usp=sharing"
    },
    {
      name: "ML Engineer Internship",
      issuer: "SkillCraft Technology Pvt Ltd",
      date: "2025",
      credentialId: "SCT/FEB25/0771",
      link: "https://drive.google.com/file/d/1NE7vBZKr4PJkCJLLCOWbSV99J1btOtjg/view?usp=sharing"
    }
  ],

  publications: [
    { title: "Modern Web Architecture Patterns", publication: "Tech Journal 2022", description: "Published research on scalable web application architectures." },
    { title: "Real‑time Data Processing with WebSockets", publication: "Conference 2021", description: "Presented innovative approaches to real‑time data streaming." },
    { title: "Efficient Data Synchronization Method", publication: "Patent #12345", description: "Patent for distributed system data‑sync optimization." },
  ],
};
