import { portfolioData } from "@/lib/portfolioData";
import { PixelCanvasDemo } from "@/components/ParallexComp";
import { ProjectModal } from "@/components/ProjectModal";
import { useState } from "react";

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleProjectLive = (project: any) => {
    window.open(project.live, "_blank");
  };

  const handleProjectCode = (project: any) => {
    window.open(project.codeLink, "_blank");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="
      h-full overflow-y-auto p-8
      bg-gradient-to-br from-black via-black/40 to-[#3C4B57]
      text-[#E7ECF4]
    ">
      <div className="max-w-8xl mx-auto">
        {/* OUTER CARD */}
        <div className="
          rounded-2xl p-8 shadow-2xl
          bg-gradient-to-br from-black/50 via-black/70 to-[#3C4B57]/70

          border border-white/10 backdrop-blur-xl
        ">
          <h1 className="text-3xl font-bold mb-8 text-center text-[#E7ECF4]">
            Featured Projects
          </h1>

          {/* PROJECT GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {portfolioData.projects.map((project, index) => (
              <div
                key={index}
                className="
                  rounded-2xl overflow-hidden transition-all
                  bg-gradient-to-br from-[#0D1A2B]/40 via-[#1F2D3D]/30 to-[#3C4B57]/30
                  border border-white/10 backdrop-blur-lg
                  hover:shadow-[0_0_25px_#4DA8FF33]
                "
              >
                <div className="p-6">
                  {/* Project Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-[#E7ECF4]">
                        {project.name}
                      </h2>
                      <p className="text-[#A3B1C4] mt-2">
                        {project.description}
                      </p>
                    </div>

                    <div className="
                      px-3 py-1 rounded-lg text-sm font-medium
                      bg-[#4DA8FF]/10 text-[#4DA8FF] border border-[#4DA8FF]/20
                    ">
                      Featured
                    </div>
                  </div>

                  {/* Pixel Canvas Demo Card */}
                  <div className="mt-4 flex justify-center">
                    <div 
                      className="cursor-pointer"
                      onClick={() => handleProjectClick(project)}
                    >
                      <PixelCanvasDemo />
                    </div>
                  </div>

                


                  {/* Buttons */}
                  <div className="mt-6 flex gap-3">
                    <button 
                      className="
                        px-4 py-2 rounded-lg text-sm font-medium
                                  bg-gradient-to-br from-[#0D1A2B]/80 via-[#1F2D3D]/70 to-[#3C4B57]/70

                        shadow-[0_0_12px_#4DA8FF55]
                        hover:bg-[#3C91E6] hover:shadow-[0_0_18px_#4DA8FF99]
                        transition-all
                      "
                      onClick={() => handleProjectLive(project)}
                    >
                      View Project
                    </button>

                    <button className="
                      px-4 py-2 rounded-lg text-sm font-medium
                      border border-white/20 text-[#E7ECF4]
          bg-gradient-to-br from-[#0D1A2B]/80 via-[#1F2D3D]/70 to-[#3C4B57]/70

                      hover:bg-white/10 transition-all

                    "
                    onClick={() => handleProjectCode(project)}
                    >
                      View Code
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

          {/* OPEN SOURCE CONTRIBUTIONS */}
          <div className="
            mt-12 rounded-2xl p-8 text-center
            bg-gradient-to-br from-[#4DA8FF]/10 to-[#A78BFA]/10
            border border-white/10 backdrop-blur-xl
          ">
            <h2 className="text-2xl font-bold mb-4 text-[#E7ECF4]">
              Open Source Contributions
            </h2>

            <p className="text-[#A3B1C4] mb-6">
              I actively contribute to open source projects. Here are some of my recent contributions:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              {/* Each Contribution Card */}
              {[
                { title: "React Ecosystem", text: "Bug fixes and documentation improvements" },
                { title: "Node.js", text: "Performance optimizations" },
                { title: "Vite", text: "Plugin development" },
              ].map((c, i) => (
                <div 
                  key={i}
                  className="
                    rounded-xl p-4
                    bg-gradient-to-br from-[#0D1A2B]/40 via-[#1F2D3D]/30 to-[#3C4B57]/30
                    border border-white/10 backdrop-blur-lg
                    hover:shadow-[0_0_20px_#4DA8FF33] transition-all
                  "
                >
                  <h3 className="font-bold text-[#E7ECF4]">{c.title}</h3>
                  <p className="text-sm text-[#A3B1C4] mt-2">{c.text}</p>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        open={isModalOpen} 
        onOpenChange={closeModal} 
        project={selectedProject} 
      />
    </div>
  );
};
