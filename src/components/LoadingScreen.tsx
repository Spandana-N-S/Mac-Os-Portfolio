import { useState, useEffect } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
}

export const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  const [lines, setLines] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const [hexDump, setHexDump] = useState<string[]>([]);

  const bootSequence = [
    "INITIALIZING KERNEL...",
    "LOADING SYSTEM MODULES...",
    "VERIFYING INTEGRITY...",
    "MOUNTING VIRTUAL FILESYSTEM...",
    "ALLOCATING MEMORY BLOCKS...",
    "CONFIGURING NETWORK SOCKETS...",
    "ESTABLISHING SECURE TUNNEL...",
    "DECRYPTING USER DATA...",
    "STARTING GRAPHICAL INTERFACE...",
    "SYSTEM READY."
  ];

  // Hex dump animation effect
  useEffect(() => {
    const chars = "0123456789ABCDEF";
    const interval = setInterval(() => {
      const newLines = Array(15).fill(0).map(() => {
        let line = "0x";
        for (let i = 0; i < 4; i++) line += chars[Math.floor(Math.random() * chars.length)];
        line += ": ";
        for (let i = 0; i < 8; i++) line += chars[Math.floor(Math.random() * chars.length)] + " ";
        return line;
      });
      setHexDump(newLines);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  // Boot sequence logic
  useEffect(() => {
    let currentLine = 0;

    // Add lines one by one
    const lineInterval = setInterval(() => {
      if (currentLine >= bootSequence.length) {
        clearInterval(lineInterval);
        setTimeout(onComplete, 1000); // Wait a bit after completion
        return;
      }

      setLines(prev => [...prev, bootSequence[currentLine]]);
      currentLine++;
    }, 350);

    // Smooth progress counter
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + 1.5, 100);
      });
    }, 50);

    return () => {
      clearInterval(lineInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-[#050a14] flex flex-col items-center justify-center p-4 z-[100] font-mono overflow-hidden">

      {/* CRT Scanline Effect */}
      <div className="absolute inset-0 pointer-events-none z-[120] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%] pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none z-[110] animate-scanline bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-[100px] w-full" />

      {/* Cyber Background Grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(34, 211, 238, 0.15) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34, 211, 238, 0.15) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          maskImage: 'radial-gradient(circle at center, black 40%, transparent 100%)'
        }}
      />

      {/* Hex Dump Column (Right Side Decoration) */}
      <div className="hidden md:block absolute right-10 top-1/2 -translate-y-1/2 text-[10px] text-cyan-800/50 font-mono select-none pointer-events-none text-right">
        {hexDump.map((line, i) => (
          <div key={i} className="opacity-50">{line}</div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-3xl flex flex-col md:flex-row gap-8 items-center md:items-start">

        {/* Main Terminal Output */}
        <div className="w-full bg-[#0d1a2b]/80 border border-cyan-500/30 p-6 rounded-lg backdrop-blur-md shadow-[0_0_50px_rgba(8,145,178,0.2)]">
          <div className="flex justify-between items-center mb-4 border-b border-cyan-500/20 pb-2">
            <span className="text-xs text-cyan-400/80 tracking-widest">SYSTEM BOOT CHECK</span>
            <span className="text-xs text-cyan-600">v2.4.0</span>
          </div>

          <div className="space-y-1 h-[200px] overflow-hidden font-mono text-sm">
            {lines.map((line, index) => (
              <div key={index} className="flex items-center text-cyan-300/90">
                <span className="mr-3 text-emerald-400 font-bold text-xs">[ OK ]</span>
                <span className="opacity-90">{line}</span>
              </div>
            ))}
            {lines.length < bootSequence.length && (
              <div className="animate-pulse text-cyan-500 ml-0">
                <span className="mr-3 text-cyan-600/50 font-bold text-xs">[ .. ]</span>
                <span className="inline-block w-2 h-4 bg-cyan-500 align-middle"></span>
              </div>
            )}
          </div>

          {/* Progress Bar Area */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-cyan-400 mb-1">
              <span>SYSTEM_INTEGRITY</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="relative h-2 bg-cyan-900/30 rounded-full overflow-hidden w-full">
              <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-600 to-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.6)]"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex gap-2 mt-2">
              <div className={`h-1 flex-1 rounded-sm ${progress > 20 ? 'bg-cyan-500/50' : 'bg-cyan-900/30'}`}></div>
              <div className={`h-1 flex-1 rounded-sm ${progress > 40 ? 'bg-cyan-500/50' : 'bg-cyan-900/30'}`}></div>
              <div className={`h-1 flex-1 rounded-sm ${progress > 60 ? 'bg-cyan-500/50' : 'bg-cyan-900/30'}`}></div>
              <div className={`h-1 flex-1 rounded-sm ${progress > 80 ? 'bg-cyan-500/50' : 'bg-cyan-900/30'}`}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};