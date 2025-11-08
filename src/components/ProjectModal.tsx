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
                  className="px-3 py-1 bg-terminal-foreground/10 text-terminal-prompt text-xs rounded-full font-terminal"
                >
                  {tech}
                </span>
              ))}
            </div>

            <Tabs defaultValue="preview" className="w-full">
              <TabsList className="bg-terminal-background/50 border border-terminal-foreground/10">
                <TabsTrigger 
                  value="preview"
                  className="data-[state=active]:bg-terminal-prompt/20 data-[state=active]:text-terminal-prompt"
                >
                  Live Preview
                </TabsTrigger>
                {project.code && (
                  <TabsTrigger 
                    value="code"
                    className="data-[state=active]:bg-terminal-prompt/20 data-[state=active]:text-terminal-prompt"
                  >
                    Code
                  </TabsTrigger>
                )}
              </TabsList>

              <TabsContent value="preview" className="mt-4">
                <div className="border border-terminal-foreground/20 rounded-lg p-4 bg-background min-h-[300px]">
                  {project.preview || (
                    <div className="flex items-center justify-center h-full text-muted-foreground">
                      No preview available
                    </div>
                  )}
                </div>
              </TabsContent>

              {project.code && (
                <TabsContent value="code" className="mt-4">
                  <div className="rounded-lg overflow-hidden border border-terminal-foreground/20">
                    <SyntaxHighlighter
                      language={project.code.language}
                      style={atomOneDark}
                      customStyle={{
                        margin: 0,
                        borderRadius: "0.5rem",
                        fontSize: "0.875rem",
                        maxHeight: isFullscreen ? "calc(95vh - 300px)" : "400px",
                      }}
                      showLineNumbers
                    >
                      {project.code.content}
                    </SyntaxHighlighter>
                  </div>
                </TabsContent>
              )}
            </Tabs>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
