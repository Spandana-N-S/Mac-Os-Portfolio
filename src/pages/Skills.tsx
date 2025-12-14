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
    <div className={`
      transition-all duration-300 ease-in-out
      fixed bottom-0 left-0 right-0 p-2 z-5
      md:absolute md:bottom-4 md:right-4 md:left-auto md:w-[450px]
      text-[#E7ECF4] pointer-events-auto select-none
    `}>

      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="
          w-full py-2 px-4 rounded-xl text-left font-medium tracking-wide
          bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]
          border border-white/10 backdrop-blur-xl
          shadow-lg shadow-black/40
          hover:bg-white/20 transition 
          ring-1 ring-white/10
          flex justify-between items-center
        "
      >
        <span>{open ? "Hide Skills" : "View All Skills"}</span>
        <span className={`transform transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      {/* Expand Area */}
      <div
        className={`
          overflow-hidden transition-all duration-500 ease-out
          ${open ? "max-h-[70vh] opacity-100 mt-4" : "max-h-0 opacity-0 mt-0"}
        `}
      >
        <div
          className="
            rounded-2xl
            bg-[#0D1A2B]/95 backdrop-blur-2xl 
            border border-white/20 
            shadow-2xl shadow-black/40
            ring-1 ring-cyan-300/30
            flex flex-col
            max-h-[65vh]
          "
        >
          {/* Scrollable Content Area */}
          <div className="overflow-y-auto p-4 md:p-6 custom-scrollbar">
            <SkillsVisualization skills={skills} />
          </div>
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
        {/* ------------------------------------------------------------------ */}
        {/* ✅ TOP LEFT CARD (Redesigned HUD Style) */}
        {/* ------------------------------------------------------------------ */}
        <div
          className="
            hidden md:block absolute top-6 left-6 w-72
            bg-[#0D1A2B]/80 backdrop-blur-xl
            border border-cyan-500/20
            rounded-2xl p-5
            shadow-[0_0_30px_rgba(8,145,178,0.1)]
            transition-all duration-300 hover:border-cyan-500/40
            group
          "
        >
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-cyan-500/20">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <h2 className="text-sm font-bold tracking-widest text-cyan-400 uppercase">
              System Layers
            </h2>
          </div>

          <div className="space-y-3">
            {[
              { label: "Core & Frameworks", desc: "Languages (Inner)", color: "bg-blue-400" },
              { label: "Frontend & DB", desc: "Styling (Second)", color: "bg-purple-400" },
              { label: "DevOps & Tools", desc: "Infrastructure (Third)", color: "bg-green-400" },
              { label: "Professional", desc: "Soft Skills (Outer)", color: "bg-yellow-400" }
            ].map((item, i) => (
              <div
                key={i}
                className="
                  flex items-center gap-3
                  p-2.5 rounded-lg
                  hover:bg-cyan-500/5
                  transition-colors duration-200
                "
              >
                <div className={`w-1.5 h-8 rounded-full ${item.color} shadow-[0_0_8px_rgba(255,255,255,0.3)]`} />
                <div>
                  <div className="text-xs text-cyan-100/90 font-medium">{item.label}</div>
                  <div className="text-[10px] text-cyan-400/60 uppercase tracking-wide">{item.desc}</div>
                </div>
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
      px-5 py-2 rounded-xl
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