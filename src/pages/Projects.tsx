import { portfolioData } from "@/lib/portfolioData";
import { PixelCanvasDemo } from "@/components/ParallexComp";
import { ProjectModal } from "@/components/ProjectModal";
import { useState, useMemo, useEffect } from "react";
import { Search, Filter, Github } from "lucide-react";

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTech, setSelectedTech] = useState<string | null>(null);

  useEffect(() => {
    portfolioData.getProjects().then(setProjects).catch(console.error).finally(() => setLoading(false));
  }, []);

// Helper to get tech array from subtitle
  const getTech = (project: any) => project.subtitle ? project.subtitle.split(',').map((t: string) => t.trim()).filter(Boolean) : [];

  // Get all unique technologies
  const allTechnologies = useMemo(() => {
    const techSet = new Set<string>();
    projects.forEach(project => {
      getTech(project).forEach(tech => techSet.add(tech));
    });
    return Array.from(techSet).sort();
  }, [projects]);

  // Filter projects based on search term and selected technology
  const filteredProjects = useMemo(() => {
    return projects.filter(project => {
      const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           project.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const techArray = getTech(project);
      const matchesTech = selectedTech ? techArray.includes(selectedTech) : true;
      
      return matchesSearch && matchesTech;
    });
  }, [projects, searchTerm, selectedTech]);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleProjectLive = (project: any) => {
    const liveUrl = project.live || project.codeLink || "https://spandana-projects.netlify.app/";
    window.open(liveUrl, "_blank");
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

          {/* Search and Filter Controls */}
          <div className="mb-8 flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-blue-500" />
              </div>
              <input
                type="text"
                placeholder="Search projects..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-[#0D1A2B]/40 border border-white/10 text-[#E7ECF4] placeholder-[#A3B1C4] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Technology Filter */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Filter className="h-5 w-5 text-[#A3B1C4]" />
              </div>
              <select
                className="pl-10 pr-8 py-2 rounded-lg bg-black border border-white/10 border-lg text-[#E7ECF4] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 appearance-none"
                value={selectedTech || ""}
                onChange={(e) => setSelectedTech(e.target.value || null)}
              >
                <option value="">All Technologies</option>
                {allTechnologies.map(tech => (
                  <option key={tech} value={tech}>{tech}</option>
                ))}
              </select>
            </div>
            <button className="border border-white/20 rounded-lg px-4 py-2 hover:bg-white/10 transition-all" onClick={() => window.open("https://github.com/Spandana-N-S", "_blank")}>View All Projects</button>
          </div>

          {/* PROJECT GRID */}
          {loading ? (
            <div className="col-span-full grid place-items-center h-64">
              <div>Loading GitHub projects...</div>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full grid place-items-center h-64">
              <div>No projects match your search.</div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {filteredProjects.map((project, index) => (
                  <div
                  key={index}
                  className="
                  rounded-2xl overflow-hidden transition-all duration-300
                  bg-gradient-to-br from-[#0D1A2B]/40 via-[#1F2D3D]/30 to-[#3C4B57]/30
                  border border-white/10 backdrop-blur-lg
                  hover:shadow-[0_0_30px_#4DA8FF55] hover:scale-[1.02]
                "
              >
                <div className="p-6">
                  {/* Project Header */}
                  <div className="flex justify-between items-start">
                    <div>
                      <h2 className="text-2xl font-bold text-[#E7ECF4]">
                        {project.title}
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

                  {/* Technology Tags */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {getTech(project).slice(0, 3).map((tech, techIndex) => (
                      <span 
                        key={techIndex} 
                        className="px-2 py-1 bg-cyan-600/20 text-cyan-300 text-xs rounded-full border border-cyan-500/30"
                      >
                        {tech}
                      </span>
                    ))}
                    {getTech(project).length > 3 && (
                      <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30">
                        +{getTech(project).length - 3} more
                      </span>
                    )}
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

                  {/* Pixel Canvas GitHub Link */}
                  <div className="mt-4 flex justify-center">
                    <a
                      href={project.codeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 bg-gradient-to-br from-[#24292F] to-[#1A1F24] text-white hover:from-[#2D363E] hover:to-[#21262D] shadow-lg hover:shadow-[0_0_15px_#4285f555] transition-all border border-gray-700/50"
                    >
                      <Github className="h-4 w-4" />
                      View on GitHub
                    </a>
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
            </>
          )}

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
