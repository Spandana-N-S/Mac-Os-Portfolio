import { 
  X, 
  User, 
  Code, 
  Award, 
  Mail, 
  FileText, 
  Briefcase, 
  Trophy, 
  Medal 
} from "lucide-react";
import { About } from "@/pages/About";
import { Projects } from "@/pages/Projects";
import { Skills } from "@/pages/Skills";
import { Contact } from "@/pages/Contact";
import { Resume } from "@/pages/Resume";
import Experience from "@/pages/Experience";
import Achievements from "@/pages/Achievements";
import { Certificates } from "@/pages/Certificates";

interface SectionModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  section: string;
  data?: any;
}

export const SectionModal = ({ open, onOpenChange, section, data }: SectionModalProps) => {
  if (!open) return null;

  const getSectionIcon = () => {
    switch (section) {
      case "about": return <User className="w-5 h-5" />;
      case "projects": return <Code className="w-5 h-5" />;
      case "skills": return <Award className="w-5 h-5" />;
      case "contact": return <Mail className="w-5 h-5" />;
      case "resume": return <FileText className="w-5 h-5" />;
      case "experience": return <Briefcase className="w-5 h-5" />;
      case "achievements": return <Trophy className="w-5 h-5" />;
      case "certificates": return <Medal className="w-5 h-5" />;
      default: return <User className="w-5 h-5" />;
    }
  };

  const getSectionTitle = () => {
    switch (section) {
      case "about": return "About Me";
      case "projects": return "Projects";
      case "skills": return "Skills";
      case "contact": return "Contact";
      case "resume": return "Resume";
      case "experience": return "Experience";
      case "achievements": return "Achievements";
      case "certificates": return "Certificates";
      default: return section.charAt(0).toUpperCase() + section.slice(1);
    }
  };

  const renderSectionContent = () => {
    switch (section) {
      case "about":
        return <About />;
      case "projects":
        return <Projects />;
      case "skills":
        return <Skills />;
      case "contact":
        return <Contact />;
      case "resume":
        return <Resume />;
      case "experience":
        return <Experience />;
      case "achievements":
        return <Achievements />;
      case "certificates":
        return <Certificates />;
      default:
        return (
          <div className="p-6">
            <p>Content for {section} section</p>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-2xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            {getSectionIcon()}
            <h2 className="text-lg font-semibold">{getSectionTitle()}</h2>
          </div>
          <button 
            onClick={() => onOpenChange(false)}
            className="p-1 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {renderSectionContent()}
        </div>
      </div>
    </div>
  );
};