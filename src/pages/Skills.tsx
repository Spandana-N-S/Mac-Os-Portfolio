import SkillsOrbit from "@/components/SkillsOrbit";
import { SkillsVisualization } from "@/components/SkillsVisualization";
import { portfolioData } from "@/lib/portfolioData";
import React from "react";

// ---------------------------------------------------------------------
// ✅ Bottom Expandable Skills Card
// ---------------------------------------------------------------------
const BottomSkillsCard = ({ skills }: { skills: any }) => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="absolute right-6 bottom-6 w-100 text-[#E7ECF4] pointer-events-auto select-none">

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full py-3 px-4 rounded-xl text-left font-medium tracking-wide
          bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]  border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40
          shadow-lg shadow-black/40
          hover:bg-white/20 transition 
          ring-1 ring-white/10
        "
      >
        {open ? "Hide Skills" : "View All Skills"}
      </button>

      {/* Expand Area */}
      <div
        className={`
          overflow-hidden transition-all duration-500 ease-out
          ${open ? "max-h-[800px] mt-4" : "max-h-0 mt-0"}
        `}
      >
        <div
          className="
            p-5 rounded-2xl
            bg-white/10 backdrop-blur-2xl 
            border border-white/20 
            shadow-2xl shadow-black/40
            ring-1 ring-cyan-300/30
            transform transition-all duration-500
          "
        >
          <SkillsVisualization skills={skills} />
        </div>
      </div>

    </div>
  );
};

// ---------------------------------------------------------------------
// ✅ Main Component
// ---------------------------------------------------------------------
export const Skills = () => {

  return (
    <div
      className="
        relative
        h-full min-h-screen overflow-y-auto p-8
        bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]
        text-[#E7ECF4]
        no-scrollbar
      "
    >

      {/* Orbit */}
      <div className="absolute inset-0 h-full z-0 pointer-events-auto">
        <SkillsOrbit />
      </div>

      {/* Foreground */}
      <div className="relative z-10 w-full h-full pointer-events-none">

        {/* ------------------------------------------------------------------ */}
        {/* ✅ TOP LEFT CARD (improved visuals) */}
        {/* ------------------------------------------------------------------ */}
        <div
          className="
            absolute top-2 left-10 w-64 rounded-2xl
            bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]  border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40
            p-5 shadow-xl shadow-black/40 ring-1 ring-cyan-300/20
          "
        >
          <h2 className="text-lg font-semibold mb-4 text-cyan-200">
            Quick Info
          </h2>

          <div className="space-y-3">
            {["Inner Orbit (Language & FrameWorks)", "Second Orbit(Styling & Database)", "Thrid Orbit(Devops & Tools)", "Fourth Orbit(Soft Skills)"].map((item) => (
              <div
                key={item}
                className="
                  flex items-center gap-3
                  p-2 rounded-xl
                  bg-white/5 hover:bg-white/10
                  transition-all duration-300
                  shadow-sm shadow-black/20
                "
              >
                <div className="w-2 h-6 bg-cyan-100 shadow-[0_1px_10px_3px_rgba(0,255,255,0.4)]"></div>
                <span className="text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <div
          className="
    absolute top-1 right-1
    pointer-events-none
  "
        >
          <div
            className="
      pointer-events-auto
      px-3 py-2 rounded-xl
      bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]  border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40
      border border-white/20 
      shadow-lg shadow-black/40
      ring-1 ring-cyan-300/30
      text-sm font-medium tracking-wide
      text-cyan-200
      hover:bg-white/20 transition
    "
          >
            Till Now Explore more tools and tech
            <span className="text-cyan-300"> • </span>
            Exploring more in AI 
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* ✅ BOTTOM RIGHT SKILLS CARD */}
        {/* ------------------------------------------------------------------ */}
        <BottomSkillsCard skills={portfolioData.skills} />

      </div>

    </div>
  );
};

export default Skills;