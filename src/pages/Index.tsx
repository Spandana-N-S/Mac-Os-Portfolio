import { useState } from "react";
import { Dock } from "@/components/Dock";
import { Terminal } from "@/components/Terminal";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden">
      {/* Left Dock Sidebar */}
      <div className="w-24 bg-gradient-to-b from-background to-muted/30 border-r border-border/50">
        <Dock activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>

      {/* Main Terminal Area */}
      <div className="flex-1 p-8">
        <Terminal currentSection={activeSection} />
      </div>
    </div>
  );
};

export default Index;
