import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait a bit more for the animation to complete before calling onComplete
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-foreground">
          Welcome to Nathishwar's Portfolio
        </h1>
        <p className="text-xl md:text-2xl mb-12 text-muted-foreground">
          Ready to explore the world of creativity using AI
        </p>
        
        {/* Loading animation */}
        <div className="w-64 h-2 bg-muted rounded-full mx-auto mb-4 overflow-hidden">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="flex justify-center space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
      
      {/* Popup terminal message */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 w-4/5 max-w-2xl">
        <div className="bg-terminal-background border border-border rounded-lg p-4 shadow-lg">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-3 h-3 rounded-full bg-window-close" />
            <div className="w-3 h-3 rounded-full bg-window-minimize" />
            <div className="w-3 h-3 rounded-full bg-window-maximize" />
            <span className="ml-2 text-terminal-foreground/60 text-sm">
              portfolio-terminal
            </span>
          </div>
          <div className="font-terminal text-terminal-foreground text-sm">
            <p className="mb-2">$ Use this terminal to explore the portfolio</p>
            <p className="mb-2">$ Type <span className="text-terminal-prompt">help</span> to see available commands</p>
            <p>$ I've assigned an AI assistant to help you discover me</p>
          </div>
        </div>
      </div>
    </div>
  );
};