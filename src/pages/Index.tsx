import { useState, useRef, useEffect } from "react";
import { Dock } from "@/components/Dock";
import { Terminal, TerminalHandle } from "@/components/Terminal";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ProfileCard } from "@/components/ProfileCard";
import { GitHubActivityCard } from "@/components/GitHubActivityCard";
import { About } from "./About";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Contact } from "./Contact";
import { portfolioData } from "@/lib/portfolioData";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const terminalRef = useRef<TerminalHandle>(null);

  // Load the Easy Peasy chatbot script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://bots.easy-peasy.ai/chat.min.js";
    script.defer = true;
    script.setAttribute("data-chat-url", "https://bots.easy-peasy.ai/bot/6fc51d13-714c-4afd-bf29-1ef67377b663");
    script.setAttribute("data-btn-position", "bottom-left");
    script.setAttribute("data-widget-btn-color", "#000000");
    script.id = "easy-peasy-bot-script";
    
    document.body.appendChild(script);
    
    return () => {
      // Clean up the script when the component unmounts
      const existingScript = document.getElementById("easy-peasy-bot-script");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };
  }, []);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    
    // Trigger command for non-home sections
    if (section !== "home") {
      // We'll use a timeout to ensure the terminal is ready
      setTimeout(() => {
        const commandMap: Record<string, string> = {
          about: "about",
          projects: "projects",
          skills: "skills",
          contact: "contact"
        };
        
        const command = commandMap[section];
        if (command && terminalRef.current) {
          terminalRef.current.handleCommand(command);
        }
      }, 100);
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "skills":
        return <Skills />;
      case "contact":
        return <Contact />;
      default:
        return (
          <div className="flex h-full">
            {/* Terminal Area - 75% width */}
            <div className="w-[75%] p-8 h-full">
              <Terminal 
                ref={terminalRef}
                currentSection={activeSection} 
              />
            </div>

            {/* Profile Cards Area - 25% width */}
            <div className="w-[25%] p-8 pl-0 flex flex-col gap-4 h-full">
              <div className="flex-[2] min-h-0">
                <ProfileCard
                  name={portfolioData.about.name}
                  role={portfolioData.about.role}
                  profileCardBio={portfolioData.about.bio}
                  bio={portfolioData.about.bio}
                  location={portfolioData.about.location}
                  github={portfolioData.contact.github}
                  linkedin={portfolioData.contact.linkedin}
                  twitter={portfolioData.contact.twitter}
                  website={portfolioData.contact.website}
                  instagram={portfolioData.contact.instagram}
                  email={portfolioData.contact.email}
                />
              </div>
              <div className="flex-1 min-h-0">
                <GitHubActivityCard />
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left Dock Sidebar */}
      <div className="w-24 bg-gradient-to-b from-background to-muted/30 border-r border-border/50">
        <Dock activeSection={activeSection} onSectionChange={handleSectionChange} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        {renderActiveSection()}
      </div>
    </div>
  );
};

export default Index;