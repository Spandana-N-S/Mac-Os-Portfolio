import { portfolioData } from "@/lib/portfolioData";
import React from 'react'; // Import React for JSX

// Define a <style> tag to inject global keyframes and classes for animation
const animationStyles = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes pulseShadow {
    0% { box-shadow: 0 0 20px #4DA8FF40; }
    50% { box-shadow: 0 0 35px #4DA8FF80; }
    100% { box-shadow: 0 0 20px #4DA8FF40; }
  }

  /* We can use this class to apply the animation */
  .fade-in {
    animation: fadeIn 0.6s ease-out forwards;
  }
  
  /* Staggered delay classes */
  .fade-in-delay-1 { animation-delay: 0.1s; }
  .fade-in-delay-2 { animation-delay: 0.2s; }
  .fade-in-delay-3 { animation-delay: 0.3s; }
  .fade-in-delay-4 { animation-delay: 0.4s; }
  .fade-in-delay-5 { animation-delay: 0.5s; }
`;

// A helper component to render highlighted text
const Highlight = ({ children }: { children: React.ReactNode }) => (
  <span className="
    font-medium 
    bg-clip-text text-transparent 
    bg-gradient-to-r from-[#4DA8FF] to-[#A78BFA]
  ">
    {children}
  </span>
);

export const About = () => {
  return (
    <>
      {/* Inject the animation styles into the component */}
      <style>{animationStyles}</style>

      <div className="
        h-full overflow-y-auto p-4 sm:p-8 
        bg-gradient-to-br from-black via-gray-700 to-[#3C4B57]
        text-[#E7ECF4]
      ">
        <div className="max-w-7xl mx-auto">

          {/* Outer Card */}
          <div className="
            rounded-2xl shadow-4xl overflow-hidden
             bg-gradient-to-br from-black via-[#1F2D3D] to-[#3C4B57]  border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40
            border border-white/10 backdrop-blur-xl
            fade-in
          ">
            
            {/* Header */}
            <div className="
              bg-gradient-to-br from-[#4DA8FF]/10 to-[#A78BFA]/10 
              p-8 text-center border-b border-white/10
            ">
              <img 
                src="/Nathishwar.jpg"
                alt={portfolioData.about.name}
                className="
                  w-50 h-32 rounded-full mx-auto mb-6 
                  shadow-black/20 shadow-[0_0_20px_#4DA8FF40] 
                  border-4 border-[#4DA8FF]/40 
                  object-cover
                "
                style={{ animation: 'pulseShadow 3s infinite ease-in-out' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://placehold.co/128x128/1F2D3D/E7ECF4?text=NC';
                }}
              />
              <h1 className="text-4xl font-bold text-[#E7ECF4] fade-in">
                {portfolioData.about.name}
              </h1>
              <p className="text-[#4DA8FF] text-2xl mt-2 font-medium fade-in fade-in-delay-1">
                {portfolioData.about.role}
              </p>
              <p className="text-[#A3B1C4] mt-2 fade-in fade-in-delay-2">
                {portfolioData.about.location}
              </p>
            </div>
            
            {/* Content */}
            <div className="p-4 sm:p-8">

              {/* About Me */}
              <div className="mb-10 fade-in fade-in-delay-3">
                <h2 className="text-3xl font-bold mb-4 text-[#E7ECF4] border-b border-white/10 pb-2">About Me</h2>
                <p className="text-[#A3B1C4] text-lg leading-relaxed">
                  <Highlight>Passionate developer</Highlight> with <Highlight>expertise</Highlight> in building <Highlight>modern web applications</Highlight>. 
                  I love creating <Highlight>elegant solutions</Highlight> to <Highlight>complex problems</Highlight>.
                </p>
              </div>

              {/* Achievements */}
              <div className="mb-10 fade-in fade-in-delay-4">
                <h2 className="text-3xl font-bold mb-6 text-[#E7ECF4] border-b border-white/10 pb-2">Achievements</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                  {/* Achievement Cards - now with hover:scale and transition */}
                  <div className="p-6 rounded-xl border border-white/10
                    bg-gradient-to-br from-[#102132]/60 via-[#1F2D3D]/50 to-[#3C4B57]/40
                    shadow-lg backdrop-blur-xl hover:shadow-[0_0_25px_#4DA8FF60]
                    transition-all duration-300 hover:scale-[1.03]">
                    <h3 className="text-xl font-bold text-[#4DA8FF] mb-2">Library Author</h3>
                    <p className="text-[#A3B1C4]">
                      Creator of <b>PywhatKit_alt</b> and <b>Quick Invoice</b> Python modules used by developers worldwide.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-white/10
                    bg-gradient-to-br from-[#102132]/60 via-[#1F2D3D]/50 to-[#3C4B57]/40
                    shadow-lg backdrop-blur-xl hover:shadow-[0_0_25px_#A78BFA60]
                    transition-all duration-300 hover:scale-[1.03]">
                    <h3 className="text-xl font-bold text-[#A78BFA] mb-2">Founder & CEO</h3>
                    <p className="text-[#A3B1C4]">
                      Founder of <b>KnowGrow</b> — building AI-powered learning tools and automation systems.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-white/10
                    bg-gradient-to-br from-[#102132]/60 via-[#1F2D3D]/50 to-[#3C4B57]/40
                    shadow-lg backdrop-blur-xl hover:shadow-[0_0_25px_#4DA8FF60]
                    transition-all duration-300 hover:scale-[1.03]">
                    <h3 className="text-xl font-bold text-[#4DA8FF] mb-2">AI Software Creator</h3>
                    <p className="text-[#A3B1C4]">
                      Built <b>Ruixen AI</b> — an intelligent AI software ecosystem designed for modular automation and productivity.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-white/10
                    bg-gradient-to-br from-[#102132]/60 via-[#1F2D3D]/50 to-[#3C4B57]/40
                    shadow-lg backdrop-blur-xl hover:shadow-[0_0_25px_#A78BFA60]
                    transition-all duration-300 hover:scale-[1.03]">
                    <h3 className="text-xl font-bold text-[#A78BFA] mb-2">Open Source Contributor</h3>
                    <p className="text-[#A3B1C4]">
                      Contributed to <b>10+ AI</b> and full-stack open-source projects including Gen-AI and automation tools.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-white/10
                    bg-gradient-to-br from-[#102132]/60 via-[#1F2D3D]/50 to-[#3C4B57]/40
                    shadow-lg backdrop-blur-xl hover:shadow-[0_0_25px_#4DA8FF60]
                    transition-all duration-300 hover:scale-[1.03]">
                    <h3 className="text-xl font-bold text-[#4DA8FF] mb-2">CodeX Creator</h3>
                    <p className="text-[#A3B1C4]">
                      Developed <b>Codex</b> — a real-time coding platform with live preview, cursor sharing, and video chat.
                    </p>
                  </div>

                  <div className="p-6 rounded-xl border border-white/10
                    bg-gradient-to-br from-[#102132]/60 via-[#1F2D3D]/50 to-[#3C4B57]/40
                    shadow-lg backdrop-blur-xl hover:shadow-[0_0_25px_#A78BFA60]
                    transition-all duration-300 hover:scale-[1.03]">
                    <h3 className="text-xl font-bold text-[#A78BFA] mb-2">Tech Explorer</h3>
                    <p className="text-[#A3B1C4]">
                      Uses <b>50+ vibe-code tools</b> & <b>100+ AI tools</b> for productivity, creativity, and research.
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Education */}
              <div className="mb-10 fade-in fade-in-delay-5">
                <h2 className="text-3xl font-bold mb-4 text-[#E7ECF4] border-b border-white/10 pb-2">Education</h2>
                
                <div className="
                  rounded-xl p-6 
                  bg-gradient-to-br from-[#0D1A2B]/50 via-[#1F2D3D]/40 to-[#3C4B57]/40
                  border border-white/10 backdrop-blur-lg
                  shadow-lg transition-all duration-300 hover:shadow-xl
                ">
                  <h3 className="text-xl font-bold text-[#E7ECF4]">
                    {portfolioData.about.education}
                  </h3>
                  <p className="text-[#A3B1C4] mt-1">Dhanalakshmi Srinivasan Engineering college</p>
                  <p className="text-sm text-[#A3B1C4] mt-2">Graduate at 2027</p>
                </div>
              </div>
              
              {/* Skills + Contact */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Skills Section */}
                <div className="fade-in fade-in-delay-5">
                  <h2 className="text-3xl font-bold mb-4 text-[#E7ECF4] border-b border-white/10 pb-2">Skills</h2>
                  
                  <div className="space-y-4">
                    {Object.entries(portfolioData.skills).map(([category, skills]) => (
                      <div 
                        key={category}
                        className="
                          rounded-xl p-4 
                          bg-gradient-to-br from-[#0D1A2B]/40 via-[#1F2D3D]/30 to-[#3C4B57]/30
                          border border-white/10 backdrop-blur-lg
                          shadow-lg
                        "
                      >
                        <h3 className="font-bold capitalize mb-3 text-xl text-[#E7ECF4]">
                          {category}
                        </h3>

                        <div className="flex flex-wrap gap-2">
                          {(skills as string[]).map((skill: string, index: number) => (
                            <span 
                              key={index}
                              className="
                                px-3 py-1 rounded-full text-sm
                                bg-[#4DA8FF]/10 text-[#4DA8FF]
                                border border-[#4DA8FF]/20
                                transition-all duration-200
                                hover:bg-[#4DA8FF]/20 hover:scale-110 cursor-default
                              "
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Contact Section */}
                <div className="fade-in fade-in-delay-5">
                  <h2 className="text-3xl font-bold mb-4 text-[#E7ECF4] border-b border-white/10 pb-2">Contact</h2>

                  <div className="
                    rounded-xl p-6 space-y-4
                    bg-gradient-to-br from-[#0D1A2B]/40 via-[#1F2D3D]/30 to-[#3C4B57]/30
                    border border-white/10 backdrop-blur-lg
                    shadow-lg
                  ">
                    <div className="flex items-center">
                      <span className="font-medium w-24 text-[#E7ECF4]">Email:</span>
                      <a href={`mailto:${portfolioData.contact.email}`} className="text-[#A3B1C4] hover:text-[#4DA8FF] transition-colors">{portfolioData.contact.email}</a>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-24 text-[#E7ECF4]">GitHub:</span>
                      <a href={`https://${portfolioData.contact.github}`} target="_blank" rel="noopener noreferrer" className="text-[#A3B1C4] hover:text-[#4DA8FF] transition-colors">{portfolioData.contact.github}</a>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-24 text-[#E7ECF4]">LinkedIn:</span>
                      <a href={`https://{portfolioData.contact.linkedin}`} target="_blank" rel="noopener noreferrer" className="text-[#A3B1C4] hover:text-[#4DA8FF] transition-colors">{portfolioData.contact.linkedin}</a>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-24 text-[#E7ECF4]">Twitter:</span>
                      <a href={`https{portfolioData.contact.twitter}`} target="_blank" rel="noopener noreferrer" className="text-[#A3B1C4] hover:text-[#4DA8FF] transition-colors">{portfolioData.contact.twitter}</a>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-24 text-[#E7ECF4]">Website:</span>
                      <a href={`https://${portfolioData.contact.website}`} target="_blank" rel="noopener noreferrer" className="text-[#A3B1C4] hover:text-[#4DA8FF] transition-colors">{portfolioData.contact.website}</a>
                    </div>
                  </div>
                  
                  {/* Interests */}
                  <h2 className="text-3xl font-bold mt-8 mb-4 text-[#E7ECF4] border-b border-white/10 pb-2">
                    Interests
                  </h2>

                  <div className="
                    rounded-xl p-6 
                    bg-gradient-to-br from-[#0D1A2B]/40 via-[#1F2D3D]/30 to-[#3C4B57]/30
                    border border-white/10 backdrop-blur-lg
                    shadow-lg
                  ">
                    <p className="text-[#A3B1C4] text-lg leading-relaxed">
                      When I'm not coding, I enjoy <Highlight>contributing to open source</Highlight>, 
                      writing technical blogs, and <Highlight>exploring new technologies</Highlight>. 
                      I'm passionate about <Highlight>AI/ML</Highlight> and <Highlight>cloud computing</Highlight> and also <Highlight>vibecoding</Highlight> and <Highlight>experimenting with new AI tools</Highlight>. Tech, creativity, and <Highlight>futuristic ideas</Highlight> keep me energized and always building something new.
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};