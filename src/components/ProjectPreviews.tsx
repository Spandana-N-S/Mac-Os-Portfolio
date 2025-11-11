import React from "react";

interface ProjectPreviewProps {
  projectName: string;
  description: string;
  tech: string[];
}

export const ProjectPreview: React.FC<ProjectPreviewProps> = ({ 
  projectName, 
  description, 
  tech 
}) => {
  // Map tech stack to color classes
  const getTechColor = (techName: string) => {
    const techColors: Record<string, string> = {
      "React": "bg-blue-900 text-blue-300",
      "Node.js": "bg-green-900 text-green-300",
      "PostgreSQL": "bg-purple-900 text-purple-300",
      "Firebase": "bg-orange-900 text-orange-300",
      "Tailwind CSS": "bg-teal-900 text-teal-300",
      "OpenWeather API": "bg-yellow-900 text-yellow-300",
      "Chart.js": "bg-indigo-900 text-indigo-300",
      "Stripe": "bg-pink-900 text-pink-300",
      "Vue.js": "bg-emerald-900 text-emerald-300",
      "Next.js": "bg-gray-900 text-gray-300",
      "Express": "bg-gray-700 text-gray-300",
      "MongoDB": "bg-green-700 text-green-300",
    };
    
    return techColors[techName] || "bg-gray-900 text-gray-300";
  };

  return (
    <div className="p-4 bg-gray-900 rounded-lg">
      <h3 className="text-lg font-bold mb-2">{projectName}</h3>
      <p className="text-gray-300">{description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {tech.map((techItem, index) => (
          <span 
            key={index}
            className={`px-2 py-1 rounded text-sm ${getTechColor(techItem)}`}
          >
            {techItem}
          </span>
        ))}
      </div>
    </div>
  );
};

// Specific preview components for each project
export const ECommercePreview: React.FC = () => (
  <ProjectPreview 
    projectName="E-Commerce Platform"
    description="A full-stack e-commerce solution with payment processing."
    tech={["React", "Node.js", "PostgreSQL", "Stripe"]}
  />
);

export const TaskManagerPreview: React.FC = () => (
  <ProjectPreview 
    projectName="Task Management App"
    description="Real-time collaborative task management tool."
    tech={["React", "Firebase", "Tailwind CSS"]}
  />
);

export const WeatherDashboardPreview: React.FC = () => (
  <ProjectPreview 
    projectName="Weather Dashboard"
    description="Beautiful weather forecast with data visualization."
    tech={["React", "OpenWeather API", "Chart.js"]}
  />
);