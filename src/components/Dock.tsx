import { Home, User, Code, Briefcase, Trophy, FileText, Award, Medal } from "lucide-react";
import { useState, useRef, useEffect } from "react";

interface DockProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Dock = ({ activeSection, onSectionChange }: DockProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dockRef = useRef<HTMLDivElement>(null);

  const navItems = [
    { id: "home", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "projects", icon: Code, label: "Projects" },
    { id: "skills", icon: Award, label: "Skills" },
    { id: "experience", icon: Briefcase, label: "Experience" },
    { id: "achievements", icon: Trophy, label: "Achievements" },
    { id: "certificates", icon: Medal, label: "Certificates" },
  ];

  // Calculate scale based on distance from hovered item
  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;

    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.8;
    if (distance === 1) return 1.4;
    if (distance === 2) return 1.2;
    return 1;
  };

  return (
    <div
      ref={dockRef}
      className="flex flex-col items-center py-6"
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className="flex flex-col items-center space-y-2 bg-gradient-to-b from-[#0d1a2b] via-[#1f2d3d] to-[#3c4b57] bg-white/30 backdrop-blur-lg rounded-2xl p-2 border border-white/10">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          const scale = getScale(index);
          const isHovered = hoveredIndex === index;

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              onMouseEnter={() => setHoveredIndex(index)}
              aria-label={item.label}
              className={`p-3 rounded-xl transition-all duration-200 ease-out transform relative ${activeSection === item.id
                  ? "bg-gradient-to-b from-[#0d1a2b] via-[#1f2d3d] to-[#3c4b57] text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
                }`}
              style={{
                transform: `scale(${scale})`,
                zIndex: isHovered ? 10 : 1,
              }}
            >
              <Icon className="w-6 h-6 hover:text-white" />
              {/* Tooltip */}
              <span
                className={`
    absolute left-full ml-4 top-1/2 -translate-y-1/2 
    px-2 py-1 text-white text-xs rounded whitespace-nowrap
    bg-gradient-to-b from-[#0d1a2b] via-[#1f2d3d] to-[#3c4b57]
    opacity-0 transition-opacity duration-200 pointer-events-none
    z-[9999]                    
    ${isHovered ? 'opacity-100' : ''}
  `}
              >
                {item.label}
              </span>

            </button>
          );
        })}
      </div>
    </div>
  );
};