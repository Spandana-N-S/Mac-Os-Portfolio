import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ProjectModal } from "./ProjectModal";

interface TerminalLine {
  type: "input" | "output" | "error" | "loading";
  content: string;
}

interface TerminalProps {
  currentSection: string;
}

const portfolioData = {
  about: {
    name: "Your Name",
    role: "Full Stack Developer",
    bio: "Passionate developer with expertise in building modern web applications. I love creating elegant solutions to complex problems.",
    location: "San Francisco, CA",
    education: "B.S. Computer Science",
  },
  projects: [
    {
      name: "E-Commerce Platform",
      description: "Full-stack e-commerce solution with React, Node.js, and PostgreSQL",
      tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
      code: {
        language: "typescript",
        content: `// Payment processing with Stripe
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function createPaymentIntent(amount: number) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Convert to cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    
    return { clientSecret: paymentIntent.client_secret };
  } catch (error) {
    console.error('Payment error:', error);
    throw error;
  }
}`,
      },
      preview: (
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-card rounded-lg border">
            <div>
              <h3 className="font-semibold">Premium Headphones</h3>
              <p className="text-sm text-muted-foreground">Wireless noise-cancelling</p>
            </div>
            <span className="text-xl font-bold">$299.99</span>
          </div>
          <button className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Add to Cart
          </button>
        </div>
      ),
    },
    {
      name: "Task Management App",
      description: "Collaborative task management tool with real-time updates",
      tech: ["React", "Firebase", "Tailwind CSS"],
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
      preview: (
        <div className="space-y-3">
          {["Design homepage mockups", "Implement user authentication", "Write API documentation"].map((task, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-card rounded-lg border hover:border-primary/50 transition-colors">
              <input type="checkbox" className="w-4 h-4" defaultChecked={i === 0} />
              <span className={cn("flex-1", i === 0 && "line-through text-muted-foreground")}>{task}</span>
            </div>
          ))}
        </div>
      ),
    },
    {
      name: "Weather Dashboard",
      description: "Beautiful weather forecast application with data visualization",
      tech: ["React", "OpenWeather API", "Chart.js"],
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
      preview: (
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-lg text-white">
          <h3 className="text-2xl font-bold mb-2">San Francisco</h3>
          <div className="text-5xl font-bold mb-4">72°F</div>
          <p className="text-blue-100 mb-4">Partly Cloudy</p>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-blue-200">Humidity</span>
              <div className="font-semibold">65%</div>
            </div>
            <div>
              <span className="text-blue-200">Wind</span>
              <div className="font-semibold">12 mph</div>
            </div>
          </div>
        </div>
      ),
    },
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "SQL"],
    frontend: ["React", "Vue.js", "Tailwind CSS", "Next.js"],
    backend: ["Node.js", "Express", "PostgreSQL", "MongoDB"],
    tools: ["Git", "Docker", "AWS", "Vercel"],
  },
  contact: {
    email: "your.email@example.com",
    github: "github.com/yourusername",
    linkedin: "linkedin.com/in/yourusername",
    twitter: "@yourusername",
  },
};

export const Terminal = ({ currentSection }: TerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { type: "output", content: "Welcome to my portfolio terminal! Type 'help' for available commands." },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof portfolioData.projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [lines]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (currentSection !== "home") {
      handleCommand(currentSection);
    }
  }, [currentSection]);

  const showLoadingAnimation = async (cmd: string) => {
    const loadingMessages = [
      "Initializing secure connection...",
      "Decrypting portfolio data...",
      "Loading project matrix...",
      "Establishing quantum link...",
      "Compiling information...",
      "Access granted.",
    ];

    setIsLoading(true);

    for (const message of loadingMessages) {
      await new Promise((resolve) => setTimeout(resolve, 300));
      setLines((prev) => [...prev, { type: "loading", content: `[${new Date().toLocaleTimeString()}] ${message}` }]);
    }

    setIsLoading(false);
    
    // Execute the actual command after loading
    const output = executeCommand(cmd);
    setLines((prev) => [...prev, ...output]);
  };

  const executeCommand = (cmd: string): TerminalLine[] => {
    const command = cmd.toLowerCase().trim();

    // Check if command is a project number
    const projectMatch = command.match(/^project\s+(\d+)$/);
    if (projectMatch) {
      const projectIndex = parseInt(projectMatch[1]) - 1;
      if (projectIndex >= 0 && projectIndex < portfolioData.projects.length) {
        setSelectedProject(portfolioData.projects[projectIndex]);
        setIsModalOpen(true);
        return [
          { type: "output", content: `Opening ${portfolioData.projects[projectIndex].name}...` },
        ];
      } else {
        return [
          { type: "error", content: `Project ${projectMatch[1]} not found. Use 'projects' to see available projects.` },
        ];
      }
    }

    switch (command) {
      case "help":
        return [
          { type: "output", content: "Available commands:" },
          { type: "output", content: "  about      - Learn about me" },
          { type: "output", content: "  projects   - View my projects" },
          { type: "output", content: "  project N  - Open project details (e.g., 'project 1')" },
          { type: "output", content: "  skills     - See my technical skills" },
          { type: "output", content: "  contact    - Get my contact information" },
          { type: "output", content: "  clear      - Clear the terminal" },
          { type: "output", content: "  help       - Show this help message" },
        ];

      case "about":
        return [
          { type: "output", content: `Name: ${portfolioData.about.name}` },
          { type: "output", content: `Role: ${portfolioData.about.role}` },
          { type: "output", content: `Location: ${portfolioData.about.location}` },
          { type: "output", content: `Education: ${portfolioData.about.education}` },
          { type: "output", content: "" },
          { type: "output", content: portfolioData.about.bio },
        ];

      case "projects":
        const projectLines: TerminalLine[] = [
          { type: "output", content: "My Projects (click to view details):" },
          { type: "output", content: "" },
        ];
        portfolioData.projects.forEach((project, index) => {
          projectLines.push(
            { type: "output", content: `${index + 1}. ${project.name}` },
            { type: "output", content: `   ${project.description}` },
            { type: "output", content: `   Tech: ${project.tech.join(", ")}` },
            { type: "output", content: `   Type 'project ${index + 1}' to open details` },
            { type: "output", content: "" }
          );
        });
        return projectLines;

      case "skills":
        return [
          { type: "output", content: "Technical Skills:" },
          { type: "output", content: "" },
          { type: "output", content: `Languages: ${portfolioData.skills.languages.join(", ")}` },
          { type: "output", content: `Frontend: ${portfolioData.skills.frontend.join(", ")}` },
          { type: "output", content: `Backend: ${portfolioData.skills.backend.join(", ")}` },
          { type: "output", content: `Tools: ${portfolioData.skills.tools.join(", ")}` },
        ];

      case "contact":
        return [
          { type: "output", content: "Contact Information:" },
          { type: "output", content: "" },
          { type: "output", content: `Email: ${portfolioData.contact.email}` },
          { type: "output", content: `GitHub: ${portfolioData.contact.github}` },
          { type: "output", content: `LinkedIn: ${portfolioData.contact.linkedin}` },
          { type: "output", content: `Twitter: ${portfolioData.contact.twitter}` },
        ];

      case "clear":
        return [];

      case "":
        return [];

      default:
        return [
          {
            type: "error",
            content: `Command not found: ${command}. Type 'help' for available commands.`,
          },
        ];
    }
  };

  const handleCommand = async (cmd: string) => {
    if (cmd.trim() === "") return;
    if (isLoading) return;

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: `$ ${cmd}` },
    ];

    setLines(newLines);
    
    if (cmd.toLowerCase().trim() === "clear") {
      setLines([]);
    } else if (["about", "projects", "skills"].includes(cmd.toLowerCase().trim()) || cmd.toLowerCase().match(/^project\s+\d+$/)) {
      // Show loading animation for these commands
      await showLoadingAnimation(cmd);
    } else {
      const output = executeCommand(cmd);
      setLines([...newLines, ...output]);
    }

    setHistory([...history, cmd]);
    setHistoryIndex(-1);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCommand(input);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex !== -1) {
        const newIndex = Math.min(history.length - 1, historyIndex + 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    }
  };

  return (
    <>
      <div className="h-full flex flex-col bg-terminal-background rounded-2xl shadow-2xl overflow-hidden">
        {/* Window controls */}
        <div className="flex items-center gap-2 px-4 py-3 bg-terminal-background/50 border-b border-terminal-foreground/10">
          <div className="w-3 h-3 rounded-full bg-window-close" />
          <div className="w-3 h-3 rounded-full bg-window-minimize" />
          <div className="w-3 h-3 rounded-full bg-window-maximize" />
          <span className="ml-3 text-terminal-foreground/60 text-sm font-terminal">
            portfolio-terminal
          </span>
        </div>

        {/* Terminal content */}
        <div
          ref={terminalRef}
          className="flex-1 overflow-y-auto p-4 font-terminal text-sm"
          onClick={() => inputRef.current?.focus()}
        >
          {lines.map((line, index) => (
            <div
              key={index}
              className={cn(
                "mb-1",
                line.type === "input" && "text-terminal-prompt font-semibold",
                line.type === "output" && "text-terminal-foreground",
                line.type === "error" && "text-destructive",
                line.type === "loading" && "text-terminal-prompt/80 animate-pulse"
              )}
            >
              {line.content}
            </div>
          ))}

          {/* Input line */}
          <form onSubmit={handleSubmit} className="flex items-center gap-2">
            <span className="text-terminal-prompt">$</span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent text-terminal-foreground outline-none caret-terminal-cursor font-terminal"
              autoFocus
              spellCheck={false}
              disabled={isLoading}
            />
          </form>
        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        project={selectedProject}
      />
    </>
  );
};
