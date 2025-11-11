import { useState } from "react";
import { Github, Globe, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { GitHubActivity } from "./GitHubActivity";
import { portfolioData } from "@/lib/portfolioData";

interface ProfileCardProps {
  name: string;
  role: string;
  profileCard: string;
  bio: string;
  location: string;
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
  instagram: string;
  email: string;
}

export const ProfileCard = ({
  name,
  role,
  profileCard,
  bio,
  location,
  github,
  linkedin,
  twitter,
  website,
  instagram,
  email
}: ProfileCardProps) => {
  const [showGitHubActivity, setShowGitHubActivity] = useState(false);

  // Extract GitHub username from the URL
  const githubUsername = github.split('/').pop() || "nathishwar";

  return (
    <>
      <div className="h-full flex flex-col bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]  border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40 overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 border-4 border-white shadow-lg">
              <span className="text-3xl font-bold text-white">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            {/* Name and Role */}
            <h2 className="text-2xl font-bold text-foreground text-white">{name}</h2>
            <p className="text-primary font-medium mt-1 text-[#A3B1C4] font-bold">{role}</p>
            
            {/* Location */}
            <p className="text-muted-foreground text-sm mt-2 text-[#4DA8FF] font-bold">{location}</p>
          </div>
        </div>
        
        {/* Bio */}
        <div className="p-6 flex-1">
          <p className="text-foreground/80 text-center text-gray-300">Code is my craft, AI is my edge, and great user experience is the goal every time.</p>
        </div>
        
        {/* See My Recent Works Button */}
        <div className="p-6 pt-0">
          <button 
            onClick={() => setShowGitHubActivity(true)}
            className="w-full py-3 px-5 rounded-xl bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]  border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40 text-[#E7ECF4]  
  hover:bg-white/50 hover:border-white/50
  transition-all"
          >
            See My Recent Works
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