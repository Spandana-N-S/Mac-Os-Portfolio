import { portfolioData } from "@/lib/portfolioData";

export const Certificates = () => {
  const certificates = [
    {
      name: "AI/ML Virtual Internship",
      issuer: "Google",
      date: "2024",
      credentialId: "e291ca949fcfa3f415fccf9008e78266.",
      link: "https://drive.google.com/file/d/1MLIs740REVglsrPR6w55NpTHzb1y60jc/view?usp=drive_link"
    },
    {
      name: "Problem Solving",
      issuer: "Hackerrank",
      date: "2024",
      credentialId: "FE35A5B19540",
      link: "https://drive.google.com/file/d/1yAo4pjXy919k2JgVuGl17t557EF8_tcC/view?usp=drive_link"
    },
    {
      name: "Learnathon 2024",
      issuer: "ICT Academy",
      date: "2024",
      credentialId: "ICT-345678",
      link: "https://drive.google.com/file/d/1_dafaqNtyGAcrnIrVn-QHxP1UYnzwMv_/view?usp=drive_link"
    },
    {
      name: "AI Engineer Internship",
      issuer: "NoviTech private limited",
      date: "2024",
      credentialId: "AIIN2547",
      link: "https://drive.google.com/file/d/16XrgsZyLNlkYf8NN_oVLD0l9XFcfLa71/view?usp=drive_link"
    },
    {
      name: "Data Analyst Internship",
      issuer: "Unified Mentor Pvt Ltd",
      date: "2025",
      credentialId: "U85500HR2023PTC115118",
      link: "https://drive.google.com/file/d/14OOEkrdQOJX_KJl8RVgsz0UKxpcHKQYE/view?usp=sharing"
    },
    {
      name: "ML Engineer Internship",
      issuer: "SkillCraft Technology Pvt Ltd",
      date: "2025",
      credentialId: "SCT/FEB25/0771",
      link: "https://drive.google.com/file/d/1NE7vBZKr4PJkCJLLCOWbSV99J1btOtjg/view?usp=drive_link"
    }
  ];

  return (
    <div className="h-full overflow-y-auto p-8 bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]  border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40">
      <div className="max-w-9xl mx-auto">

        {/* Outer Container */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]  border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40 p-10">
          
          {/* Page Title */}
          <h1 className="text-4xl font-bold mb-10 text-center text-cyan-200 tracking-wide">
            Certificates & Credentials
          </h1>

          {/* Certificate Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {certificates.map((cert, index) => (
              <div
                key={index}
                className="
                  relative overflow-hidden
                  bg-white/10 backdrop-blur-xl
                  rounded-2xl p-6 
                  bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]  border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40
                  hover:shadow-2xl hover:shadow-cyan-500/20
                  transition-all duration-300
                  hover:-translate-y-1
                "
              >

                {/* Accent Left Bar */}
                <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]  border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40"></div>

                {/* Verified Badge */}
                <div className="
                  absolute top-4 right-4
                  px-3 py-1 rounded-lg text-sm
                  bg-green-400/20 text-green-300
                  text-black 
                  border border-green-300/30 
                  shadow-[0_0_10px_1px_rgba(0,255,165,0.3)]
                ">
                  Verified
                </div>

                {/* Certificate Content */}
                <div className="mt-2">
                  <h2 className="text-xl font-bold text-cyan-100">{cert.name}</h2>
                  <p className="text-cyan-300 mt-1">{cert.issuer}</p>

                  <div className="mt-4 space-y-1">
                    <p className="text-sm text-gray-300">Issued: {cert.date}</p>
                    <p className="text-sm text-gray-300">Credential ID: {cert.credentialId}</p>
                  </div>
                </div>

                {/* Link */}
                <div className="mt-5 pt-5 border-t border-white/10">
                  <a
                    href={cert.link}
                    className="
                      text-sm font-medium text-cyan-300
                      hover:text-cyan-200 hover:underline
                      transition
                    "
                  >
                    View Certificate
                  </a>
                </div>

              </div>
            ))}
          </div>

          {/* Professional Development Section */}
          <div
            className="
              mt-14 
              bg-gradient-to-br from-[#0D1A2B] via-[#1F2D3D] to-[#3C4B57]  border border-white/10 backdrop-blur-xl rounded-2xl shadow-xl shadow-black/40
              border border-white/10
              rounded-3xl p-8
              shadow-xl shadow-black/30
            "
          >
            <h2 className="text-3xl font-bold mb-8 text-cyan-200">
              Professional Development
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {[    
                {
                  title: "Continuing Education",
                  text: "Completed 40+ hours of professional development courses annually"
                },
                {
                  title: "Industry Certifications",
                  text: "Maintained 6 active technical certifications"
                },
                {
                  title: "Workshops",
                  text: "Attended 12 technical workshops and seminars"
                }
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="
                    bg-white/10 backdrop-blur-xl
                    border border-white/10
                    rounded-2xl p-5
                    shadow-lg shadow-black/20
                    hover:shadow-cyan-400/20
                    hover:-translate-y-[2px]
                    transition-all duration-300
                  "
                >
                  <h3 className="font-semibold text-lg text-cyan-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-300 leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}

            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
