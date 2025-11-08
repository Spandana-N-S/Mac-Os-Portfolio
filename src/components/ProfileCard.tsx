import { useState } from "react";
import { Github, Globe, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { GitHubActivity } from "./GitHubActivity";
import { portfolioData } from "@/lib/portfolioData";

interface ProfileCardProps {
  name: string;
  role: string;
  profileCardBio: string;
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
  profileCardBio,
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

  const socialLinks = [
    { icon: Github, url: `https://${github}`, label: "GitHub" },
    { icon: Linkedin, url: `https://${linkedin}`, label: "LinkedIn" },
    { icon: Twitter, url: `https://${twitter}`, label: "Twitter" },
    { icon: Globe, url: `https://${website}`, label: "Website" },
    { icon: Instagram, url: `https://${instagram}`, label: "Instagram" },
    { icon: Mail, url: `mailto:${email}`, label: "Email" },
  ];

  // Extract GitHub username from the URL
  const githubUsername = github.split('/').pop() || "nathishwar";

  return (
    <>
      <div className="h-full flex flex-col bg-card border border-border rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-br from-primary/10 to-secondary/10 p-6">
          <div className="flex flex-col items-center text-center">
            {/* Profile Image */}
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center mb-4 border-4 border-white shadow-lg">
              <span className="text-3xl font-bold text-white">
                {name.split(' ').map(n => n[0]).join('')}
              </span>
            </div>
            
            {/* Name and Role */}
            <h2 className="text-2xl font-bold text-foreground">{name}</h2>
            <p className="text-primary font-medium mt-1">{role}</p>
            
            {/* Location */}
            <p className="text-muted-foreground text-sm mt-2">{location}</p>
          </div>
        </div>
        
        {/* Bio */}
        <div className="p-6 flex-1">
          <p className="text-foreground/80 text-center">{profileCardBio}</p>
        </div>
        
        {/* Social Links */}
        <div className="p-6 pt-0">
          <div className="flex justify-center space-x-4">
            {socialLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
          
          
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