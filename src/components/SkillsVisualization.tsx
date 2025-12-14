import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

interface SkillCategory {
  [category: string]: string[];
}

interface SkillsVisualizationProps {
  skills: SkillCategory;
}

export const SkillsVisualization = ({ skills }: SkillsVisualizationProps) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  // Function to determine proficiency level (mock implementation)
  const getProficiencyLevel = (skill: string) => {
    const levels = ["Beginner", "Intermediate", "Advanced", "Expert"];
    // Simple hash-based approach for demo purposes
    const hash = skill.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return levels[hash % levels.length];
  };

  // Function to get proficiency color
  const getProficiencyColor = (level: string) => {
    switch (level) {
      case "Beginner": return "bg-red-500";
      case "Intermediate": return "bg-yellow-500";
      case "Advanced": return "bg-blue-500";
      case "Expert": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-4">
      {Object.entries(skills).map(([category, skillList]) => {
        const isExpanded = expandedCategories[category] ?? false;

        return (
          <div
            key={category}
            className="bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57] border border-white/10 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20"
          >
            <button
              className="w-full p-4 flex justify-between items-center text-left bg-gradient-to-r from-cyan-900/20 to-blue-900/20 hover:from-cyan-900/30 hover:to-blue-900/30 transition-colors duration-200"
              onClick={() => toggleCategory(category)}
            >
              <h3 className="text-lg font-bold text-white">{category}</h3>
              {isExpanded ? (
                <ChevronDown className="w-5 h-5 text-cyan-400" />
              ) : (
                <ChevronRight className="w-5 h-5 text-cyan-400" />
              )}
            </button>

            {isExpanded && (
              <div className="p-3 grid grid-cols-1 gap-2">
                {skillList.map((skill, index) => {
                  const proficiency = getProficiencyLevel(skill);
                  const proficiencyColor = getProficiencyColor(proficiency);

                  return (
                    <div
                      key={index}
                      className="p-3 bg-black/30 rounded-lg border border-white/5 hover:border-cyan-500/30 transition-all duration-200"
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-white">{skill}</span>
                        <span className={`px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full ${proficiencyColor} text-white`}>
                          {proficiency}
                        </span>
                      </div>

                      {/* Skill bar visualization */}
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${proficiencyColor}`}
                          style={{
                            width: proficiency === "Beginner" ? "25%" :
                              proficiency === "Intermediate" ? "60%" :
                                proficiency === "Advanced" ? "75%" : "100%"
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};