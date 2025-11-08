import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface TerminalLine {
  type: "input" | "output" | "error";
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
    },
    {
      name: "Task Management App",
      description: "Collaborative task management tool with real-time updates",
      tech: ["React", "Firebase", "Tailwind CSS"],
    },
    {
      name: "Weather Dashboard",
      description: "Beautiful weather forecast application with data visualization",
      tech: ["React", "OpenWeather API", "Chart.js"],
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

  const executeCommand = (cmd: string): TerminalLine[] => {
    const command = cmd.toLowerCase().trim();

    switch (command) {
      case "help":
        return [
          { type: "output", content: "Available commands:" },
          { type: "output", content: "  about     - Learn about me" },
          { type: "output", content: "  projects  - View my projects" },
          { type: "output", content: "  skills    - See my technical skills" },
          { type: "output", content: "  contact   - Get my contact information" },
          { type: "output", content: "  clear     - Clear the terminal" },
          { type: "output", content: "  help      - Show this help message" },
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
          { type: "output", content: "My Projects:" },
          { type: "output", content: "" },
        ];
        portfolioData.projects.forEach((project, index) => {
          projectLines.push(
            { type: "output", content: `${index + 1}. ${project.name}` },
            { type: "output", content: `   ${project.description}` },
            { type: "output", content: `   Tech: ${project.tech.join(", ")}` },
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

  const handleCommand = (cmd: string) => {
    if (cmd.trim() === "") return;

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: `$ ${cmd}` },
    ];

    const output = executeCommand(cmd);
    
    if (cmd.toLowerCase().trim() === "clear") {
      setLines([]);
    } else {
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
              line.type === "input" && "text-terminal-prompt",
              line.type === "output" && "text-terminal-foreground",
              line.type === "error" && "text-destructive"
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
          />
        </form>
      </div>
    </div>
  );
};
