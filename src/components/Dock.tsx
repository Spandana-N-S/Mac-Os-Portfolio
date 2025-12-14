import { Home, User, Code, Briefcase, Trophy, FileText, Award, Medal } from "lucide-react";
import { useState, useRef } from "react";

interface DockProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobile?: boolean;
}

export const Dock = ({ activeSection, onSectionChange, isMobile = false }: DockProps) => {
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
    if (distance === 0) return 1.5; // Slightly reduced scale for mobile safety
    if (distance === 1) return 1.2;
    return 1;
  };

  return (
    <div
      ref={dockRef}
      className={`flex ${isMobile ? 'flex-row justify-center w-full px-4' : 'flex-col items-center py-6 h-full'}`}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      <div className={`
        flex ${isMobile ? 'flex-row space-x-2' : 'flex-col space-y-2'} 
        items-center 
        bg-gradient-to-b from-[#0d1a2b] via-[#1f2d3d] to-[#3c4b57] 
        bg-white/30 backdrop-blur-lg 
        rounded-2xl p-2 border border-white/10
      `}>
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
              className={`p-2 lg:p-3 rounded-xl transition-all duration-300 ease-out transform relative ${activeSection === item.id
                ? "bg-gradient-to-b from-[#0d1a2b] via-[#1f2d3d] to-[#3c4b57] text-primary shadow-lg shadow-cyan-500/30"
                : "text-muted-foreground hover:text-foreground"
                }`}
              style={{
                transform: `scale(${scale})`,
                zIndex: isHovered ? 50 : 1,
              }}
            >
              <Icon className={`w-5 h-5 lg:w-6 lg:h-6 transition-all duration-300 ${isHovered ? 'text-cyan-400' : 'text-white'}`} />

              {/* Tooltip - Only show on desktop */}
              {!isMobile && (
                <div
                  className={`
                    absolute left-full ml-4 top-1/2 -translate-y-1/2 
                    px-3 py-1.5 rounded-lg
                    bg-[#0D1A2B]/80 backdrop-blur-md
                    border border-cyan-500/30
                    text-cyan-100 font-medium text-xs tracking-wide
                    shadow-[0_0_15px_rgba(34,211,238,0.3)]
                    transition-all duration-200 pointer-events-none
                    z-10
                    ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2'}
                  `}
                >
                  <div className="absolute left-0 top-1/2 -translate-x-[4px] -translate-y-1/2 w-2 h-2 bg-[#0D1A2B]/80 border-l border-b border-cyan-500/30 rotate-45 transform"></div>
                  {item.label}
                </div>
              )}

            </button>
          );
        })}
      </div>
    </div>
  );
};