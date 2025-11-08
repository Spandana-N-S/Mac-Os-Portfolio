import { useState } from "react";
import { portfolioData } from "@/lib/portfolioData";

export const Skills = () => {
  const [activeCategory, setActiveCategory] = useState("languages");

  const categories = [
    { id: "languages", name: "Languages" },
    { id: "frontend", name: "Frontend" },
    { id: "backend", name: "Backend" },
    { id: "tools", name: "Tools" },
  ];

  const getSkillsForCategory = (category: string) => {
    switch (category) {
      case "languages":
        return portfolioData.skills.languages;
      case "frontend":
        return portfolioData.skills.frontend;
      case "backend":
        return portfolioData.skills.backend;
      case "tools":
        return portfolioData.skills.tools;
      default:
        return [];
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-foreground mb-8 text-center">My Skills</h1>
      
      <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                activeCategory === category.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {getSkillsForCategory(activeCategory).map((skill, index) => (
            <div 
              key={index}
              className="bg-muted/50 p-4 rounded-lg text-center hover:bg-primary/10 transition-colors"
            >
              <div className="text-lg font-medium text-foreground">{skill}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};