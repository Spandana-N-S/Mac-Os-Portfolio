import { useState, useEffect } from "react";
import { Github } from "lucide-react";
import { GitHubActivity } from "./GitHubActivity";
import { portfolioData } from "@/lib/portfolioData";

export const GitHubActivityCard = () => {
  const [showGitHubActivity, setShowGitHubActivity] = useState(false);

  // Extract GitHub username from the URL
  const githubUsername = portfolioData.contact.github.split('/').pop() || "nathishwar";

  return (
    <>
      <div className="h-full flex flex-col bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 border-b border-border">
          <div className="flex items-center">
            <Github className="w-5 h-5 text-primary mr-2" />
            <h3 className="font-semibold text-foreground text-sm">GitHub Activity</h3>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col justify-between p-6">
          <div className="mb-4">
            <p className="text-foreground/80 text-center italic">
              "The best way to predict the future is to invent it."
            </p>
            <p className="text-muted-foreground text-center text-xs mt-2">- Alan Kay</p>
          </div>
          
          <button 
            onClick={() => setShowGitHubActivity(true)}
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity text-sm"
          >
            View GitHub Activity
          </button>
        </div>
      </div>

      {/* GitHub Activity Modal */}
      {showGitHubActivity && (
        <GitHubActivity 
          username={githubUsername} 
          onClose={() => setShowGitHubActivity(false)} 
        />
      )}
    </>
  );
};
