import { useState } from "react";
import { X, Minus, Maximize2 } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { portfolioData } from "./Terminal";

interface SectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: string;
  data: any;
}

export const SectionModal = ({ open, onOpenChange, section, data }: SectionModalProps) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

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

  const renderContent = () => {
    switch (section) {
      case "about":
        return (
          <div className="space-y-6 text-terminal-foreground">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{data.name}</h2>
                <p className="text-terminal-prompt font-medium mb-4">{data.role}</p>
                <p className="mb-4">{data.bio}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p>{data.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Education</h3>
                    <p>{data.education}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "skills":
        return (
          <div className="space-y-6 text-terminal-foreground">
            <div>
              <h2 className="text-2xl font-bold mb-4">Technical Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-terminal-prompt mb-2">Languages</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.languages.map((skill: string) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-terminal-foreground/10 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-terminal-prompt mb-2">Frontend</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.frontend.map((skill: string) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-terminal-foreground/10 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-terminal-prompt mb-2">Backend</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.backend.map((skill: string) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-terminal-foreground/10 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-terminal-prompt mb-2">Tools</h3>
                  <div className="flex flex-wrap gap-2">
                    {data.tools.map((skill: string) => (
                      <span 
                        key={skill} 
                        className="px-3 py-1 bg-terminal-foreground/10 rounded-full text-sm"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      case "contact":
        return (
          <div className="space-y-6 text-terminal-foreground">
            <h2 className="text-2xl font-bold">Get in Touch</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-terminal-prompt mb-1">Email</h3>
                  <a 
                    href={`mailto:${data.email}`} 
                    className="hover:text-terminal-prompt transition-colors"
                  >
                    {data.email}
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-terminal-prompt mb-1">GitHub</h3>
                  <a 
                    href={`https://${data.github}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-terminal-prompt transition-colors"
                  >
                    {data.github}
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-terminal-prompt mb-1">LinkedIn</h3>
                  <a 
                    href={`https://${data.linkedin}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-terminal-prompt transition-colors"
                  >
                    {data.linkedin}
                  </a>
                </div>
                <div>
                  <h3 className="font-semibold text-terminal-prompt mb-1">Twitter</h3>
                  <a 
                    href={`https://${data.twitter}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="hover:text-terminal-prompt transition-colors"
                  >
                    {data.twitter}
                  </a>
                </div>
              </div>
              <div className="bg-terminal-foreground/5 rounded-lg p-6 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-terminal-prompt/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-terminal-prompt" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-terminal-foreground/70">Feel free to reach out!</p>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <div className="text-terminal-foreground">
            <h2 className="text-2xl font-bold mb-4">Section Details</h2>
            <p>Details for the {section} section would appear here.</p>
          </div>
        );
    }
  };

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
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </DialogTitle>
        </div>

        {!isMinimized && (
          <div className="max-h-[calc(80vh-80px)] overflow-y-auto p-1">
            {renderContent()}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};