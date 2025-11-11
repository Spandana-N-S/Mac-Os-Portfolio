// This is your updated Resume.tsx file

import { portfolioData } from "@/lib/portfolioData";
// You might need to import icons, e.g., from 'react-icons/fa'
// import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from 'react-icons/fa';

export const Resume = () => {
  return (
    <div className="
      h-full overflow-y-auto p-8
      bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]
      text-[#E7ECF4]
    ">
      <div className="max-w-7xl mx-auto">

        {/* OUTER CARD */}
        <div className="
          rounded-2xl shadow-2xl p-8 sm:p-12
          bg-gradient-to-br from-[#0D1A2B]/80 via-[#1F2D3D]/70 to-[#3C4B57]/70
          border border-white/10 backdrop-blur-xl
        ">

          {/* HEADER */}
          <div className="text-center mb-10">
            <h1 className="text-4xl font-bold text-[#E7ECF4] mb-2">
              {portfolioData.about.name}
            </h1>
            <p className="text-[#4DA8FF] text-xl font-medium">
              {portfolioData.about.role}
            </p>
            <p className="text-[#A3B1C4] mt-2">
              {portfolioData.about.location}
            </p>
          </div>

          {/* Education + Contact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">

            {/* EDUCATION */}
            <div>
              <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2">
                Education
              </h2>
              <div className="space-y-4">
                {portfolioData.education.map((edu, index) => (
                  <div 
                    key={index}
                    className="
                      rounded-xl p-4 
                      bg-gradient-to-br from-[#0D1A2B]/40 via-[#1F2D3D]/30 to-[#3C4B57]/30
                      border border-white/10 backdrop-blur-lg
                    "
                  >
                    <h3 className="text-lg font-bold text-[#E7ECF4]">
                      {edu.degree}
                    </h3>
                    <p className="text-[#A3B1C4]">{edu.university}</p>
                    <p className="text-sm text-[#A3B1C4] mt-1">{edu.date}</p>
                    <p className="text-sm text-[#A3B1C4] mt-1">{edu.grade}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2">
                Contact
              </h2>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="font-medium w-24 text-[#E7ECF4]">Email:</span>
                  <a href={`mailto:${portfolioData.contact.email}`} className="text-[#A3B1C4] hover:text-[#4DA8FF] transition-colors">
                    {portfolioData.contact.email}
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24 text-[#E7ECF4]">GitHub:</span>
                  <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-[#A3B1C4] hover:text-[#4DA8FF] transition-colors">
                    {portfolioData.contact.github}
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24 text-[#E7ECF4]">LinkedIn:</span>
                  <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#A3B1C4] hover:text-[#4DA8FF] transition-colors">
                    {portfolioData.contact.linkedin}
                  </a>
                </div>
                <div className="flex items-center">
                  <span className="font-medium w-24 text-[#E7ECF4]">Website:</span>
                  <a href={portfolioData.contact.website} target="_blank" rel="noopener noreferrer" className="text-[#A3B1C4] hover:text-[#4DA8FF] transition-colors">
                    {portfolioData.contact.website}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* PROFESSIONAL SUMMARY */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2">
              Professional Summary
            </h2>
            <p className="text-[#A3B1C4] leading-relaxed">
              {portfolioData.about.bio}
            </p>
          </div>

          {/* SKILLS */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2">
              Skills
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {Object.entries(portfolioData.skills).map(([category, skills]) => (
                <div 
                  key={category}
                  className="
                    rounded-xl p-4 
                    bg-gradient-to-br from-[#0D1A2B]/40 via-[#1F2D3D]/30 to-[#3C4B57]/30
                    border border-white/10 backdrop-blur-lg
                  "
                >
                  <h3 className="font-bold capitalize text-[#E7ECF4] mb-2">
                    {category}
                  </h3>
                  <ul className="space-y-1">
                    {(skills as string[]).map((skill: string, index: number) => (
                      <li key={index} className="text-sm text-[#A3B1C4]">
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* WORK EXPERIENCE */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2">
              Work Experience
            </h2>
            <div className="space-y-6">
              {portfolioData.workExperience.map((work, index) => (
                <div 
                  key={index}
                  className="
                    rounded-xl p-6 
                    bg-gradient-to-br from-[#0D1A2B]/40 via-[#1F2D3D]/30 to-[#3C4B57]/30
                    border border-white/10 backdrop-blur-lg
                  "
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold text-[#E7ECF4]">{work.role}</h3>
                      <p className="text-lg text-[#4DA8FF]">{work.company}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-[#A3B1C4]">{work.date}</p>
                      <p className="text-sm text-[#A3B1C4]">{work.location}</p>
                    </div>
                  </div>
                  <ul className="list-disc list-inside space-y-1 text-[#A3B1C4] pl-2">
                    {work.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* PROJECTS */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold mb-4 border-b border-white/10 pb-2">
              Projects
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {portfolioData.projects.map((project, index) => (
                <div 
                  key={index}
                  className="
                    rounded-xl p-6 
                    bg-gradient-to-br from-[#0D1A2B]/40 via-[#1F2D3D]/30 to-[#3C4B57]/30
                    border border-white/10 backdrop-blur-lg
                    flex flex-col
                  "
                >
                  <h3 className="text-xl font-bold text-[#E7ECF4]">{project.title}</h3>
                  <p className="text-md text-[#4DA8FF] mb-2">{project.subtitle}</p>
                  <ul className="list-disc list-inside space-y-1 text-[#A3B1C4] pl-2 mb-4">
                    {project.description.map((desc, i) => (
                      <li key={i}>{desc}</li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-2">
                    <a 
                      href={project.codeLink}
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#4DA8FF] font-medium hover:underline"
                    >
                      View Project
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>  
      </div>
    </div>
  );
};