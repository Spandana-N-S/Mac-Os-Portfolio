import { useState } from "react";
import { X, Minus, Maximize2, Minimize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import javascript from "react-syntax-highlighter/dist/esm/languages/hljs/javascript";
import typescript from "react-syntax-highlighter/dist/esm/languages/hljs/typescript";
import css from "react-syntax-highlighter/dist/esm/languages/hljs/css";
import { cn } from "@/lib/utils";
import { ECommercePreview, TaskManagerPreview, WeatherDashboardPreview } from "@/components/ProjectPreviews";

SyntaxHighlighter.registerLanguage("javascript", javascript);
SyntaxHighlighter.registerLanguage("typescript", typescript);
SyntaxHighlighter.registerLanguage("css", css);

interface ProjectModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: {
    name: string;
    description: string;
    tech: string[];
    keyFeatures?: string[];
    innovation?: string[];
    code?: {
      language: string;
      content: string;
    };
    preview?: React.ReactNode;
  } | null;
}

export const ProjectModal = ({ open, onOpenChange, project }: ProjectModalProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  if (!project) return null;

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleClose = () => {
    setIsMinimized(false);
    setIsFullscreen(false);
    onOpenChange(false);
  };

  // Get the appropriate preview component based on project name


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "transition-all duration-300 ease-in-out bg-terminal-background border-terminal-foreground/20 [&>button]:hidden",
          isMinimized && "h-14 overflow-hidden",
          isFullscreen ? "max-w-[95vw] max-h-[95vh] w-full h-full" : "max-w-4xl max-h-[80vh]"
        )}
      >
        {/* macOS Window Controls */}
        <div className="flex items-center gap-2 px-4 py-3 bg-terminal-background/50 border-b border-terminal-foreground/10 -mt-6 -mx-6 mb-4">
          <button
            onClick={handleClose}
            className="w-3 h-3 rounded-full bg-window-close hover:brightness-90 transition-all"
            aria-label="Close"
          />
          <button
            onClick={handleMinimize}
            className="w-3 h-3 rounded-full bg-window-minimize hover:brightness-90 transition-all"
            aria-label="Minimize"
          />
          <button
            onClick={handleFullscreen}
            className="w-3 h-3 rounded-full bg-window-maximize hover:brightness-90 transition-all"
            aria-label="Fullscreen"
          />
          <DialogTitle className="ml-3 text-terminal-foreground/60 text-sm font-terminal">
            {project.name}
          </DialogTitle>
        </div>

        {!isMinimized && (
          <div className="space-y-4">
            <div className="text-terminal-foreground/80 text-sm">
              {project.description}
            </div>
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 bg-terminal-foreground/10 text-terminal-prompt text-xs rounded-full font-terminal hover:bg-cyan-500/20 transition-colors duration-200"
                >
                  {tech}
                </span>
              ))}
            </div>

            <Tabs defaultValue="features" className="w-full">
  <TabsList className="bg-terminal-background/50 border border-terminal-foreground/10 grid w-full grid-cols-3">
    <TabsTrigger 
      value="features"
      className="data-[state=active]:bg-terminal-prompt/20 data-[state=active]:text-terminal-prompt"
    >
      Key Features
    </TabsTrigger>

    <TabsTrigger 
      value="innovation"
      className="data-[state=active]:bg-terminal-prompt/20 data-[state=active]:text-terminal-prompt"
    >
      Innovation
    </TabsTrigger>

    <TabsTrigger 
      value="demo"
      className="data-[state=active]:bg-terminal-prompt/20 data-[state=active]:text-terminal-prompt"
    >
      Live Demo
    </TabsTrigger>
  </TabsList>

  {/* Key Features Content */}
<TabsContent value="features" className="mt-4">
  <div className="border border-terminal-foreground/20 rounded-lg p-4 bg-black min-h-[200px]">
    <div className="flex flex-wrap gap-2">
      {project.keyFeatures && project.keyFeatures.length > 0 ? (
        project.keyFeatures.map((item, index) => (
          <span
            key={index}
            className="
              inline-block px-3 py-1 text-xs rounded-full 
              bg-terminal-prompt/10 text-terminal-prompt 
              border border-terminal-prompt/20 
              font-medium
              hover:bg-cyan-500/20 transition-colors duration-200
            "
          >
            {item}
          </span>
        ))
      ) : (
        <span>No key features available</span>
      )}
    </div>
  </div>
</TabsContent>

  {/* Innovation Content */}
  <TabsContent value="innovation" className="mt-4">
  <div className="border border-terminal-foreground/20 rounded-lg p-4 bg-black min-h-[200px]">
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 ">
      {project.innovation && project.innovation.length > 0 ? (
        project.innovation.map((item, index) => (
          <span
            key={index}
            className="
              inline-block px-3 py-2 text-xs rounded-lg 
              bg-terminal-prompt/10 text-terminal-prompt 
              border border-terminal-prompt/20 
              font-medium
              hover:bg-cyan-500/20 transition-colors duration-200
            "
          >
            {item}
          </span>
        ))
      ) : (
        <span>No innovation details available</span>
      )}
    </div>
  </div>
</TabsContent>

  {/* Live Demo Content */}
  <TabsContent value="demo" className="mt-4">
  <div className="border border-terminal-foreground/20 rounded-lg p-4 bg-black min-h-[200px] flex flex-col items-center justify-center">
    <div className="text-center mb-4">
      <h3 className="text-lg font-bold text-terminal-prompt mb-2">Experience the Project</h3>
      <p className="text-terminal-foreground/80 text-sm">
        Click below to view the live demo or source code
      </p>
    </div>
    <div className="flex gap-4">
      <button 
        onClick={() => window.open(project.live, '_blank')}
        className="px-4 py-2 bg-cyan-600/20 text-cyan-400 rounded-lg border border-cyan-500/30 hover:bg-cyan-500/30 transition-colors duration-200 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
        </svg>
        Live Demo
      </button>
      <button 
        onClick={() => window.open(project.code?.content ? '#' : project.codeLink, '_blank')}
        className="px-4 py-2 bg-purple-600/20 text-purple-400 rounded-lg border border-purple-500/30 hover:bg-purple-500/30 transition-colors duration-200 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
        View Code
      </button>
    </div>
  </div>
</TabsContent>

</Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};