import { useState, useEffect } from "react";
// Assuming portfolioData.js is in a 'lib' directory
import { portfolioData } from "@/lib/portfolioData"; 

const { about, skills } = portfolioData;

// Utility component for skill tags
const SkillTag = ({ skill }) => (
  <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium transition-transform hover:scale-105">
    {skill}
  </span>
);

export const About = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className={`transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-card rounded-2xl p-10 shadow-3xl border border-border/70 backdrop-blur-sm">
          
          {/* === 1. HEADER & SUMMARY === */}
          <header className="flex flex-col md:flex-row gap-8 items-center mb-10 pb-6 border-b border-border">
            <div className="flex-shrink-0 w-36 h-36 rounded-full bg-gradient-to-br from-primary-light to-primary flex items-center justify-center text-6xl font-extrabold text-white shadow-xl ring-4 ring-primary/50">
              {/* Initials: NATHISHWAR C -> NC */}
              {about.name.split(' ').map(n => n[0]).join('')}
            </div>
            
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-extrabold text-foreground mb-1">{about.name}</h1>
              <p className="text-2xl text-primary font-semibold mb-4">{about.role}</p>
              <p className="text-muted-foreground text-lg leading-relaxed">{about.bio}</p>
              
              {/* Contact/Links */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-4 text-sm font-medium">
                <a href={`mailto:${portfolioData.contact.email}`} className="text-accent hover:text-primary transition-colors">📧 {portfolioData.contact.email}</a>
                <a href="#" className="text-accent hover:text-primary transition-colors">🔗 {portfolioData.contact.linkedin}</a>
                <a href="#" className="text-accent hover:text-primary transition-colors">💻 {portfolioData.contact.github}</a>
                <span className="text-muted-foreground">📍 {about.location}</span>
              </div>
            </div>
          </header>
          
          {/* === 2. TECHNICAL SKILLS === */}
          <section className="mb-10">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">💡 Core Technical Expertise</h2>
            <div className="space-y-6">
              {Object.entries(skills).map(([category, skillsList]) => (
                <div key={category}>
                  <h3 className="text-xl font-bold text-secondary mb-3 capitalize">{category.replace('_', ' ')}:</h3>
                  <div className="flex flex-wrap gap-3">
                    {(skillsList as string[]).map(skill => <SkillTag key={skill} skill={skill} />)}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* === 3. PROFESSIONAL EXPERIENCE === */}
          <section className="mb-10 pt-6 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">💼 Work Experience</h2>
            <div className="space-y-8">
              {portfolioData.workExperience.map((job, index) => (
                <div key={index} className="bg-muted/30 p-6 rounded-xl shadow-inner transition-shadow hover:shadow-lg">
                  <h3 className="text-xl font-bold text-foreground">{job.title}</h3>
                  <p className="text-primary font-medium mb-1">{job.company}</p>
                  <p className="text-sm text-muted-foreground mb-3">{job.duration}</p>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {job.details.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* === 4. PROJECTS === */}
          <section className="mb-10 pt-6 border-t border-border">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">🚀 Key Projects</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {portfolioData.projects.map((project, index) => (
                <div key={index} className="bg-card-alt p-6 rounded-xl border border-primary/20 shadow-lg">
                  <h3 className="text-xl font-bold text-foreground mb-1">{project.name}</h3>
                  <p className="text-sm text-primary/80 mb-3">{project.type} | <a href="#" className="underline hover:text-accent">{project.preview}</a></p>
                  <p className="text-muted-foreground text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-primary/10 text-primary rounded text-xs">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* === 5. EDUCATION & CERTIFICATIONS === */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 border-t border-border">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">🎓 Education</h2>
              {portfolioData.educationHistory.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h3 className="text-xl font-bold text-foreground">{edu.institution}</h3>
                  <p className="text-lg text-primary">{edu.degree}</p>
                  <p className="text-sm text-muted-foreground">{edu.period} | Grade: **{edu.grade}**</p>
                </div>
              ))}
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">🏆 Certifications</h2>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                {portfolioData.certificates.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};