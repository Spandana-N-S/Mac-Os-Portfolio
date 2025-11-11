import Achive from "@/components/Sphere";
import React from "react";

// Achievements Page – Creative Option B (no Framer Motion, pure SVG/CSS animations)
// TailwindCSS recommended. No external libs are required.
// Drop this in a file like src/components/Achievements.tsx and import it in your page.

export default function Achievements() {
  const achievements = [
    { title: "GitHub Star", description: "Recognized as a GitHub Star for contributions to the developer community", date: "2023", icon: "star" },
    { title: "Hackathon Winner", description: "First place in the National AI Hackathon 2022", date: "2022", icon: "trophy" },
    { title: "Open Source Contributor", description: "Top 10 contributor to React ecosystem projects", date: "2021", icon: "oss" },
    { title: "Tech Speaker", description: "Presented at 15+ international conferences on web development", date: "2020–Present", icon: "mic" },
    { title: "Mentorship Award", description: "Received company award for mentoring junior developers", date: "2021", icon: "mentor" },
    { title: "Innovation Grant", description: "Received $50k grant for innovative AI research project", date: "2020", icon: "bulb" },
  ];

  return (
    <div className="relative h-full min-h-screen overflow-y-auto overflow-x-hidden bg-[#050507] text-white">
      {/* Inline keyframes for custom animations */}
      <style>{`
        @keyframes floaty { 0%, 100% { transform: translateY(0px) } 50% { transform: translateY(-10px) } }
        @keyframes driftX { 0% { transform: translateX(-10px) } 50% { transform: translateX(10px) } 100% { transform: translateX(-10px) } }
        @keyframes rotate360 { to { transform: rotate(360deg) } }
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        @keyframes glowPulse { 0%,100% { opacity:.5; filter: blur(18px) } 50% { opacity:.9; filter: blur(22px) } }
        @keyframes dash { to { stroke-dashoffset: 0 } }
      `}</style>

      {/* Cosmic SVG background with animated gradients */}
      <svg className="pointer-events-none absolute inset-0 -z-10" viewBox="0 0 1440 800" aria-hidden>
        <defs>
          <radialGradient id="rg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
            <stop offset="60%" stopColor="#8b5cf6" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#000" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="strokeGrad" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#22d3ee"/>
            <stop offset="50%" stopColor="#a78bfa"/>
            <stop offset="100%" stopColor="#f472b6"/>
          </linearGradient>
        </defs>
        <circle cx="200" cy="200" r="220" fill="url(#rg)" style={{ animation: "glowPulse 6s ease-in-out infinite" }} />
        <circle cx="1200" cy="560" r="260" fill="url(#rg)" style={{ animation: "glowPulse 7s ease-in-out infinite", animationDelay: "-.7s" }} />

        {/* Animated constellation lines */}
        <g opacity="0.35">
          {[
            [80, 120, 300, 60],
            [300, 60, 540, 140],
            [540, 140, 760, 90],
            [760, 90, 1040, 130],
          ].map((l, i) => (
            <line
              key={i}
              x1={l[0]} y1={l[1]} x2={l[2]} y2={l[3]}
              stroke="url(#strokeGrad)" strokeWidth="2" strokeLinecap="round"
              strokeDasharray="220" strokeDashoffset="220"
              style={{ animation: `dash ${2 + i * 0.4}s ease forwards ${i * 0.2}s` }}
            />
          ))}
        </g>
      </svg>

      {/* Header ribbon with animated path underline */}
      <div className="relative max-w-6xl mx-auto px-6 pt-20">
        <div className="relative text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Achievements & Recognition
          </h1>
          <svg className="mx-auto mt-4" width="340" height="18" viewBox="0 0 340 18" aria-hidden>
            <path d="M5 12 C 40 2, 80 2, 120 12 S 220 22, 335 8" fill="none" stroke="url(#strokeGrad)" strokeWidth="3" strokeLinecap="round">
              <animate attributeName="stroke-dasharray" from="0,400" to="400,0" dur="1.8s" fill="freeze" />
            </path>
          </svg>
        </div>

        {/* Image Sphere Section */}
        <div className="mt-12 flex justify-center">
          <Achive />
        </div>

        {/* Badges marquee */}
        <div className="relative mt-10 overflow-hidden">
          <div
            className="flex gap-10 whitespace-nowrap opacity-80"
            style={{ animation: "marquee 18s linear infinite" }}
          >
            {new Array(2).fill(0).flatMap((_, loop) => (
              [
                "⭐ Excellence",
                "🏆 Winner",
                "💻 Open Source",
                "🎤 Speaker",
                "👨‍🏫 Mentor",
                "💡 Innovation",
              ].map((label, i) => (
                <span
                  key={`${loop}-${i}`}
                  className="px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur text-sm tracking-wide hover:scale-105 transition-transform"
                >
                  {label}
                </span>
              ))
            ))}
          </div>
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-[#050507] to-transparent"/>
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-[#050507] to-transparent"/>
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((a, idx) => (
            <AchievementCard key={idx} {...a} index={idx} />
          ))}
        </div>

        {/* Publications & Patents */}
        <section className="mt-20 rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-white/[0.03] p-8 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Publications & Patents</h2>
          <div className="mt-2 h-[3px] w-36 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 rounded-full" />

          <ul className="mt-8 space-y-6">
            <li>
              <h3 className="font-semibold text-cyan-300 text-lg">
                “Modern Web Architecture Patterns” — Tech Journal 2022
              </h3>
              <p className="text-slate-300/80 text-sm mt-1">
                Published research on scalable web application architectures.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-cyan-300 text-lg">
                “Real‑time Data Processing with WebSockets” — Conference 2021
              </h3>
              <p className="text-slate-300/80 text-sm mt-1">
                Presented innovative approaches to real‑time data streaming.
              </p>
            </li>
            <li>
              <h3 className="font-semibold text-cyan-300 text-lg">
                Patent #12345: “Efficient Data Synchronization Method”
              </h3>
              <p className="text-slate-300/80 text-sm mt-1">
                Patent for distributed system data‑sync optimization.
              </p>
            </li>
          </ul>
        </section>

        <footer className="py-16"/>
      </div>
    </div>
  );
}

function AchievementCard({ title, description, date, icon, index }: any) {
  return (
    <div
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur shadow-lg hover:shadow-cyan-500/20 transition-transform duration-300 hover:-translate-y-1 "
      style={{ animation: `floaty 6s ease-in-out ${index * 0.15}s infinite` }}
    >
      {/* Subtle gradient glow */}
      <div
        aria-hidden
        className="absolute -inset-24 -z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ background: "radial-gradient(600px 200px at var(--mx,50%) 0%, rgba(34,211,238,.12), transparent 60%)" }}
      />

      {/* Decorative orbit SVG */}
      <div className="absolute right-2 top-2 opacity-40">
        <OrbitSVG size={0} />
      </div>

      <div className="relative z-10 flex items-start gap-4">
        <div className="shrink-0">
          <Icon name={icon} />
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-bold tracking-wide">{title}</h3>
          <p className="text-slate-300/90 mt-2 text-sm leading-relaxed">{description}</p>
          <p className="text-xs text-cyan-300 mt-3 font-semibold">{date}</p>
        </div>
      </div>

      {/* Animated bottom border (grows left->right on hover) */}
      <span className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-pink-500 group-hover:w-full transition-[width] duration-500" />

      {/* Corner shimmer */}
      <span
        className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rounded-full blur-2xl"
        style={{
          background:
            "conic-gradient(from 0deg, rgba(34,211,238,.5), rgba(168,85,247,.25), transparent 60%)",
          animation: "rotate360 8s linear infinite",
        }}
      />
    </div>
  );
}

function Icon({ name }: { name: string }) {
  // Tip: If you want Flaticon assets, replace the <svg> markup below with the SVG you download from flaticon.com.
  // Keep the viewBox and size so animations stay crisp. Many Flaticon SVGs work drop-in.
  const common = {
    className: "w-12 h-12 md:w-14 md:h-14",
  } as any;

  switch (name) {
    case "star":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-hidden>
          <defs>
            <linearGradient id="gStar" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
            <filter id="fGlowStar" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path d="M32 6l7.9 16 17.7 2.6-12.8 12.5 3 17.5L32 47l-15.8 8.6 3-17.5L6.4 24.6 24 22z"
            fill="none" stroke="url(#gStar)" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round"
            strokeDasharray="240" strokeDashoffset="240">
            <animate attributeName="stroke-dashoffset" from="240" to="0" dur="1.2s" fill="freeze" />
          </path>
          <circle cx="32" cy="32" r="3" fill="#22d3ee" filter="url(#fGlowStar)">
            <animateTransform attributeName="transform" attributeType="XML" type="scale" values="1;1.2;1" dur="2.2s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
    case "trophy":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-hidden>
          <defs>
            <linearGradient id="gTrophy" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <path d="M12 12h8v4a12 12 0 0 0 24 0v-4h8c0 10-6 18-16 20v4h6v6H22v-6h6v-4C18 30 12 22 12 12z" fill="none" stroke="url(#gTrophy)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="300" strokeDashoffset="300">
            <animate attributeName="stroke-dashoffset" to="0" dur="1.2s" fill="freeze" />
          </path>
          <rect x="18" y="50" width="28" height="6" rx="2" fill="#f59e0b">
            <animate attributeName="opacity" values="1;.6;1" dur="2s" repeatCount="indefinite"/>
          </rect>
        </svg>
      );
    case "oss":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-hidden>
          <defs>
            <linearGradient id="gOss" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <path id="pRing" d="M32 8a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" fill="none" stroke="url(#gOss)" strokeWidth="2.2" strokeDasharray="6 8" />
          <circle r="3" fill="#06b6d4">
            <animateMotion dur="5.5s" repeatCount="indefinite" rotate="auto">
              <mpath xlinkHref="#pRing" />
            </animateMotion>
          </circle>
          <path d="M22 36l10-8 10 8v12H22z" fill="none" stroke="url(#gOss)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      );
    case "mic":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-hidden>
          <defs>
            <linearGradient id="gMic" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <rect x="24" y="10" width="16" height="26" rx="8" fill="none" stroke="url(#gMic)" strokeWidth="2.5" />
          <path d="M16 26c0 9 7 16 16 16s16-7 16-16" fill="none" stroke="url(#gMic)" strokeWidth="2.5" strokeLinecap="round">
            <animate attributeName="d" dur="2.2s" repeatCount="indefinite" values="M16 26c0 9 7 16 16 16s16-7 16-16;M16 26c0 7 7 14 16 14s16-7 16-14;M16 26c0 9 7 16 16 16s16-7 16-16" />
          </path>
          <line x1="32" y1="42" x2="32" y2="54" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round" />
          <rect x="24" y="54" width="16" height="4" rx="2" fill="#22d3ee"/>
        </svg>
      );
    case "mentor":
      return (
        <svg {...common} viewBox="0 0 64 64" aria-hidden>
          <defs>
            <linearGradient id="gMentor" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
          <circle cx="24" cy="22" r="8" fill="none" stroke="url(#gMentor)" strokeWidth="2.2" />
          <circle cx="44" cy="18" r="6" fill="none" stroke="url(#gMentor)" strokeWidth="2.2" />
          <path d="M8 50c2-10 10-16 16-16s14 6 16 16" fill="none" stroke="url(#gMentor)" strokeWidth="2.2" strokeLinecap="round"/>
          <path d="M30 34c6 1 12 7 14 16" fill="none" stroke="url(#gMentor)" strokeWidth="2.2" strokeLinecap="round" strokeDasharray="100" strokeDashoffset="100">
            <animate attributeName="stroke-dashoffset" to="0" dur="1.4s" fill="freeze" />
          </path>
        </svg>
      );
    case "bulb":
    default:
      return (
        <svg {...common} viewBox="0 0 64 64" aria-hidden>
          <defs>
            <linearGradient id="gBulb" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
          </defs>
          <path d="M32 8a16 16 0 0 0-8 30v6h16v-6a16 16 0 0 0-8-30z" fill="none" stroke="url(#gBulb)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          <rect x="26" y="44" width="12" height="6" rx="2" fill="#a78bfa" />
          <rect x="24" y="50" width="16" height="6" rx="2" fill="#a78bfa" />
          <circle cx="32" cy="8" r="2" fill="#22d3ee">
            <animateTransform attributeName="transform" type="rotate" from="0 32 32" to="360 32 32" dur="8s" repeatCount="indefinite" />
          </circle>
        </svg>
      );
  }
}

function OrbitSVG({ size = 72 }: { size?: number }) {
  const r = size / 2 - 6;
  const id = React.useId();
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <defs>
        <linearGradient id={`og-${id}`} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#a78bfa" />
        </linearGradient>
      </defs>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        fill="none"
        stroke={`url(#og-${id})`}
        strokeOpacity="0.6"
        strokeWidth="1.6"
        strokeDasharray="4 6"
      />
      {/* Removed the Achive component from here as it's now displayed as a main feature above */}
    </svg>
  );
}