import { Home, User, Briefcase, Wrench, Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface DockItem {
  id: string;
  label: string;
  icon: React.ElementType;
  command: string;
}

const dockItems: DockItem[] = [
  { id: "home", label: "Home", icon: Home, command: "" },
  { id: "about", label: "About", icon: User, command: "about" },
  { id: "projects", label: "Projects", icon: Briefcase, command: "projects" },
  { id: "skills", label: "Skills", icon: Wrench, command: "skills" },
  { id: "contact", label: "Contact", icon: Mail, command: "contact" },
];

interface DockProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export const Dock = ({ activeSection, onSectionChange }: DockProps) => {
  return (
    <div className="h-full flex items-center justify-center p-4">
      <div className="glass-effect rounded-3xl p-3 shadow-2xl">
        <div className="flex flex-col gap-2">
          {dockItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "group relative w-14 h-14 rounded-2xl flex items-center justify-center transition-smooth",
                  "hover:scale-110 active:scale-95",
                  isActive
                    ? "bg-dock-active shadow-lg"
                    : "hover:bg-dock-hover/10"
                )}
                aria-label={item.label}
              >
                <Icon
                  className={cn(
                    "w-6 h-6 transition-smooth",
                    isActive
                      ? "text-white"
                      : "text-foreground group-hover:text-dock-hover"
                  )}
                />
                
                {/* Tooltip */}
                <div className="absolute left-full ml-3 px-3 py-1.5 bg-foreground/90 text-background text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-smooth pointer-events-none whitespace-nowrap">
                  {item.label}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};