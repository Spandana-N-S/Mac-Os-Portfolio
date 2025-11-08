import { useState } from "react";
import { portfolioData } from "@/lib/portfolioData";

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openProject = (index: number) => {
    setSelectedProject(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-foreground mb-8 text-center">My Projects</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {portfolioData.projects.map((project, index) => (
          <div 
            key={index}
            className="bg-card rounded-xl p-6 shadow-lg border border-border hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => openProject(index)}
          >
            <h2 className="text-xl font-bold text-foreground mb-2">{project.name}</h2>
            <p className="text-muted-foreground mb-4">{project.description}</p>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, techIndex) => (
                <span 
                  key={techIndex}
                  className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>
            
            <button className="text-primary font-medium hover:underline">
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Project Modal */}
      {isModalOpen && selectedProject !== null && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl shadow-2xl border border-border max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b border-border">
              <h2 className="text-2xl font-bold text-foreground">
                {portfolioData.projects[selectedProject].name}
              </h2>
              <button 
                onClick={closeModal}
                className="text-muted-foreground hover:text-foreground"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="p-6">
              <p className="text-muted-foreground mb-6">
                {portfolioData.projects[selectedProject].description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {portfolioData.projects[selectedProject].tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              
              <div className="border border-border rounded-lg p-4 bg-muted/10">
                <h3 className="font-semibold text-foreground mb-2">Code Sample</h3>
                <pre className="text-sm overflow-x-auto">
                  <code>
                    {portfolioData.projects[selectedProject].code.content}
                  </code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};