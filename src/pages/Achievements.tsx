import Achive from "@/components/Sphere";
import React from "react";
import { portfolioData } from "@/lib/portfolioData";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import {
  Star,
  Trophy,
  GitPullRequest,
  Mic,
  Users,
  Lightbulb,
  FileText,
  Award,
  Zap
} from "lucide-react";

// Helper to map string icon names to Lucide components
const getIcon = (name: string) => {
  switch (name) {
    case "Star": return <Star className="w-8 h-8 text-cyan-400" />;
    case "Trophy": return <Trophy className="w-8 h-8 text-yellow-400" />;
    case "GitPullRequest": return <GitPullRequest className="w-8 h-8 text-green-400" />;
    case "Mic": return <Mic className="w-8 h-8 text-pink-400" />;
    case "Users": return <Users className="w-8 h-8 text-blue-400" />;
    case "Lightbulb": return <Lightbulb className="w-8 h-8 text-purple-400" />;
    default: return <Award className="w-8 h-8 text-cyan-400" />;
  }
};

export default function Achievements() {
  return (
    <div className="relative h-full min-h-screen overflow-y-auto overflow-x-hidden p-6 md:p-12 bg-[#050507] text-white font-inter">

      {/* Background Ambience */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[100px] animate-pulse delay-1000" />
      </div>

      <div className="relative max-w-6xl mx-auto z-10">

        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-block px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-mono mb-4">
            SYSTEM.ACHIEVEMENTS_LOG
          </div>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400">
            Recognition & Impact
          </h1>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            A chronicle of milestones, contributions, and breakthroughs in the digital frontier.
          </p>
        </div>

        {/* 3D Sphere - Centered */}
        <div className="mb-20 flex justify-center scale-90 md:scale-100">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[50px] rounded-full" />
            <Achive />
          </div>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {portfolioData.achievements.map((item, idx) => {
            if (idx === 0) {
              return (
                <HoverCard key={idx}>
                  <HoverCardTrigger className="w-full">
                    <div className="group relative p-6 rounded-2xl bg-[#0D1A2B]/40 backdrop-blur-md border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(8,145,178,0.1)] cursor-pointer">
                      {/* Card Glow */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                      <div className="relative flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                          {getIcon(item.icon)}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                          <p className="text-slate-400 text-sm leading-relaxed mb-3">
                            {item.description}
                          </p>
                          <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-mono text-cyan-300">
                            <Zap className="w-3 h-3" />
                            {item.date}
                          </div>
                        </div>
                      </div>
                    </div>
                  </HoverCardTrigger>
                  <HoverCardContent className="w-80 p-0 bg-[#0D1A2B]/90 backdrop-blur-md border-white/10">
                    <img 
                      src="/Moxo.jpeg" 
                      alt="Moxo Top Market Researcher Award" 
                      className="w-full h-48 object-cover rounded-t-lg" 
                    />
                    <div className="p-4 space-y-2">
                      <h4 className="font-bold text-lg text-white">Top Market Researcher</h4>
                      <p className="text-sm text-slate-400">Outstanding performance recognition at Moxo</p>
                    </div>
                  </HoverCardContent>
                </HoverCard>
              );
            }
            return (
              <div
                key={idx}
                className="group relative p-6 rounded-2xl bg-[#0D1A2B]/40 backdrop-blur-md border border-white/5 hover:border-cyan-500/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(8,145,178,0.1)]"
              >
                {/* Card Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex items-start gap-4">
                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    {getIcon(item.icon)}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">{item.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-3">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center gap-2 px-2 py-1 rounded-md bg-white/5 border border-white/5 text-xs font-mono text-cyan-300">
                      <Zap className="w-3 h-3" />
                      {item.date}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Publications Section */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <FileText className="w-8 h-8 text-purple-400" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-400">
              Research & Patents
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {portfolioData.publications.map((pub, idx) => (
              <div
                key={idx}
                className="relative p-6 rounded-xl bg-gradient-to-br from-[#1a1b26] to-[#0f1016] border border-white/5 hover:border-purple-500/30 transition-all group"
              >
                <div className="absolute top-0 right-0 p-4 opacity-50 font-mono text-xs text-slate-500 group-hover:text-purple-400 transition-colors">
                  REF_0{idx + 1}
                </div>
                <h3 className="text-lg font-semibold text-purple-200 mb-2 group-hover:text-purple-400 transition-colors">
                  {pub.title}
                </h3>
                <div className="text-sm font-medium text-cyan-400 mb-3 block">
                  {pub.publication}
                </div>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {pub.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="pb-20 text-center">
          <p className="text-slate-600 font-mono text-sm">END OF LOG</p>
        </div>

      </div>
    </div>
  );
}