import { portfolioData } from "@/lib/portfolioData";
import { ShieldCheck, FileSignature, Award, ExternalLink, Lock, Cpu } from "lucide-react";

export const Certificates = () => {
  return (
    <div className="h-full overflow-y-auto overflow-x-hidden p-6 md:p-12 bg-[#0a0a0c] font-inter">

      {/* Dynamic Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.2)_50%),linear-gradient(90deg,rgba(255,0,0,0.03),rgba(255,0,0,0.03),rgba(255,0,0,0.03))] bg-[length:100%_4px,6px_100%] pointer-events-none" />
      </div>

      <div className="relative max-w-7xl mx-auto z-10">

        {/* Header - Security Vault Style */}
        <div className="flex flex-col items-center mb-16 space-y-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-900/20 border border-green-500/30 text-green-400 text-xs font-mono tracking-widest animate-pulse">
            <Lock className="w-3 h-3" />
            SECURE_VAULT_ACCESS_GRANTED
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-500 tracking-tight">
            CREDENTIALS
          </h1>
          <p className="text-slate-400 max-w-xl text-center font-mono text-sm leading-relaxed">
            // Verified digital certifications and authorized access keys.
          </p>
        </div>

        {/* Certificates PDF Viewer - PROMINENT */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-8 border-b border-white/20 pb-4 text-center flex items-center justify-center gap-3">
            📄 <span>Certificates Collection PDF</span>
          </h2>
          <div className="bg-gradient-to-br from-slate-900/90 to-slate-800/70 rounded-3xl p-6 border border-green-500/30 shadow-2xl backdrop-blur-xl max-w-4xl mx-auto">
            <iframe 
              src="/Certificates.pdf#toolbar=0&navpanes=0&scrollbar=0" 
              className="w-full h-[60vh] lg:h-[70vh] rounded-2xl border-0 shadow-2xl"
              title="Certificates PDF Viewer"
            />
            <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-6 border-t border-white/10 justify-center">
              <a 
                href="/Certificates.pdf" 
                download 
                className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto sm:mx-0"
              >
                📥 Download PDF
              </a>
              <a 
                href="/Certificates.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto sm:mx-0"
              >
                🔗 View Fullscreen
              </a>
            </div>
            <p className="text-center text-xs text-slate-400 mt-4 opacity-80">
              * Complete collection of all certifications. Zoom/Pan supported.
            </p>
          </div>
        </div>

        {/* Individual Certificates Grid - Smart Card Look */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {portfolioData.certificates.map((cert, index) => (
            <div
              key={index}
              className="group relative
                bg-[#121214] 
                rounded-xl overflow-hidden
                border border-white/5
                hover:border-green-500/30
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-[0_0_20px_rgba(34,197,94,0.1)]"
            >
              {/* Top Bar - Card Stripe */}
              <div className="h-1 w-full bg-gradient-to-r from-green-500 via-cyan-500 to-green-500 opacity-50" />

              <div className="p-6 relative">

                {/* Holographic Chip */}
                <div className="absolute top-6 right-6 opacity-80">
                  <Cpu className="w-8 h-8 text-green-500/40" />
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 rounded-lg bg-white/5 border border-white/10 group-hover:border-green-500/20 transition-colors">
                    <Award className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <div className="text-[10px] uppercase tracking-widest text-slate-500 font-mono mb-0.5">Verified Issuer</div>
                    <div className="text-sm font-semibold text-slate-200">{cert.issuer}</div>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-green-400 transition-colors">
                  {cert.name}
                </h3>

                {/* ID & Date */}
                <div className="flex items-center justify-between text-xs font-mono text-slate-500 mt-6 pt-4 border-t border-white/5">
                  <span>ID: {cert.credentialId ? cert.credentialId.substring(0, 10) + '...' : 'N/A'}</span>
                  <span>{cert.date}</span>
                </div>

                {/* Hover Reveal Link */}
                <a
                  href={cert.link || cert.pdfLink || '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute inset-0 flex items-center justify-center bg-black/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <div className="flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/50 bg-green-500/10 text-green-400 font-bold tracking-wide transform scale-90 group-hover:scale-100 transition-transform">
                    <ExternalLink className="w-4 h-4" />
                    VIEW CREDENTIAL
                  </div>
                </a>

              </div>
            </div>
          ))}
        </div>

        {/* Professional Development - Data List */}
        <div className="mb-20 grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
              <ShieldCheck className="w-6 h-6 text-green-400" />
              Auth Level
            </h2>
            <p className="text-slate-400 text-sm">
              Additional clearances and ongoing professional training protocols.
            </p>
          </div>

          <div className="lg:col-span-3 grid gap-4">
            {[
              {
                title: "Continuing Education",
                text: "Completed 40+ hours of professional development courses annually",
                code: "DEV_OPS_01"
              },
              {
                title: "Industry Certifications",
                text: "Maintained 6 active technical certifications",
                code: "SEC_LVL_05"
              },
              {
                title: "Workshops",
                text: "Attended 12 technical workshops and seminars",
                code: "WRK_SHOP_12"
              }
            ].map((item, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg bg-white/5 border border-white/5 hover:bg-white/[0.07] transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <div>
                    <h4 className="text-white font-medium">{item.title}</h4>
                    <p className="text-sm text-slate-400">{item.text}</p>
                  </div>
                </div>
                <div className="mt-2 sm:mt-0 font-mono text-xs text-slate-600 border border-slate-800 px-2 py-1 rounded bg-black/40">
                  {item.code}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
