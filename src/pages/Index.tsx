import { useState, useRef, useEffect } from "react";
import { Dock } from "@/components/Dock";
import { Terminal, TerminalHandle } from "@/components/Terminal";
import { LoadingScreen } from "@/components/LoadingScreen";
import { ProfileCard } from "@/components/ProfileCard";
import { GitHubActivityCard } from "@/components/GitHubActivityCard";
import { Gallery } from "@/components/Gallery";
import { About } from "./About";
import { Projects } from "./Projects";
import { Skills } from "./Skills";
import { Contact } from "./Contact";
import { Resume } from "./Resume";
import Experience from "./Experience";
import Achievements from "./Achievements";
import { Certificates } from "./Certificates";
import { portfolioData } from "@/lib/portfolioData";
import { useVisitors } from "@/hooks/useVisitors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";


const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [isLoading, setIsLoading] = useState(true);
  const [showEmailModal, setShowEmailModal] = useState(true);
  const [emailInput, setEmailInput] = useState("");
  const { hasVisited, setFirstVisitEmail } = useVisitors();
  const terminalRef = useRef<TerminalHandle>(null);

  useEffect(() => {
    if (hasVisited()) {
      setShowEmailModal(false);
    }
  }, [hasVisited]);

  const handleEmailSubmit = () => {
    if (setFirstVisitEmail(emailInput)) {
      toast({
        title: "Welcome!",
        description: "Your visit has been recorded. Enjoy the portfolio!",
      });
      setEmailInput("");
      setShowEmailModal(false);
    } else {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address with @.",
      });
    }
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  if (showEmailModal) {
    return (
      <div className="fixed inset-0 bg-gray-900/95 flex items-center justify-center z-[10000] p-6">
        <div className="bg-gray-800/95 border-2 border-gray-600/50 backdrop-blur-none rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl text-white">
          <h2 className="text-3xl font-bold text-white mb-4 text-center">Welcome!</h2>
          <p className="text-gray-200 mb-8 text-center leading-relaxed">
            Enter your email to access the portfolio and help track visitors.
          </p>
          <div className="space-y-6">
            <Input
              type="email"
              placeholder="your@email.com"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="w-full bg-white/10 border-2 border-white/30 focus:border-blue-400 focus:ring-4 focus:ring-blue-500/30 text-white placeholder-gray-400 text-xl py-8 px-6 font-bold rounded-2xl shadow-lg"
              autoFocus
            />
            <Button
              onClick={handleEmailSubmit}
              className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-bold text-xl py-8 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300"
            >
              Unlock Portfolio →
            </Button>
          </div>
          <p className="text-xs text-gray-500 mt-6 text-center">
            Your email is stored locally for visitor stats only.
          </p>
        </div>
      </div>
    );
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
          contact: "contact",
          resume: "resume",
          experience: "experience",
          achievements: "achievements",
          certificates: "certificates",
          gallery: ""
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
      case "resume":
        return <Resume />;
      case "experience":
        return <Experience />;
      case "achievements":
        return <Achievements />;
      case "gallery":
        return <Gallery />;
      case "certificates":
        return <Certificates />;
      default:
        return (
          <div className="flex flex-col lg:flex-row bg-gradient-to-br from-[#0d1a2b] via-[#1f2d3d] to-[#c3d4e0] bg-background bg-black h-full overflow-y-auto lg:overflow-hidden">
            {/* Terminal Area - 75% width on desktop, 100% on mobile */}
            <div className="w-full lg:w-[75%] p-4 lg:p-8 h-auto lg:h-full min-h-[500px]">
              <Terminal
                ref={terminalRef}
                currentSection={activeSection}
              />
            </div>

            {/* Profile Cards Area - 25% width on desktop, 100% on mobile */}
            <div className="w-full lg:w-[25%] p-4 lg:p-8 lg:pl-0 flex flex-col gap-4 h-auto lg:h-full">
              <div className="flex-[3] min-h-0 overflow-auto">
                <ProfileCard
                  name={portfolioData.about.name}
                  role={portfolioData.about.role}
                  profileCard={portfolioData.about.bio}
                  bio={portfolioData.about.bio}
                  location={portfolioData.about.location}
                  github={portfolioData.contact.github}
                  linkedin={portfolioData.contact.linkedin}
                  twitter=""
                  website=""
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

  if (showEmailModal) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[10000] p-4">
        <Dialog open={true}>
          <DialogContent className="bg-[#0D1A2B]/95 backdrop-blur-2xl border-white/20 max-w-md mx-auto text-white max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-2xl">Welcome to Spandana&apos;s Portfolio!</DialogTitle>
              <DialogDescription className="text-gray-300">
                To help track visitors and personalize your experience, please enter your email.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <Input
                type="email"
                placeholder="your@email.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="bg-[#1F2D3D]/80 border-white/30 text-white placeholder-gray-400 font-medium"
                autoFocus
              />
            </div>
            <DialogFooter>
              <Button
                onClick={handleEmailSubmit}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold"
              >
                Continue to Portfolio
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row h-screen w-full bg-background bg-black overflow-hidden">
      {/* Dock Sidebar */}
      <div className="hidden md:block w-20 lg:w-24 bg-gradient-to-b from-[#0d1a2b] via-[#1f2d3d] to-[#3c4b57] border-r border-border/50 shrink-0 relative z-50">
        <Dock activeSection={activeSection} onSectionChange={handleSectionChange} />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-hidden relative">
        {renderActiveSection()}

        {/* Mobile Dock */}
        <div className="md:hidden absolute bottom-4 left-0 right-0 flex justify-center z-50 pointer-events-none">
          <div className="bg-black/20 backdrop-blur-md rounded-2xl pointer-events-auto">
            <Dock activeSection={activeSection} onSectionChange={handleSectionChange} isMobile />
          </div>
        </div>
      </div>
    </div>
  );
};


export default Index;

