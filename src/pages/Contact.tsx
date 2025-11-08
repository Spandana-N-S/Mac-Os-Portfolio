import { useState } from "react";
import { Github, Linkedin, Twitter, Mail, Globe } from "lucide-react";
import { portfolioData } from "@/lib/portfolioData";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", formData);
    alert("Thank you for your message! I'll get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  const socialLinks = [
    { icon: Github, url: `https://${portfolioData.contact.github}`, label: "GitHub" },
    { icon: Linkedin, url: `https://${portfolioData.contact.linkedin}`, label: "LinkedIn" },
    { icon: Twitter, url: `https://twitter.com/${portfolioData.contact.twitter}`, label: "Twitter" },
    { icon: Mail, url: `mailto:${portfolioData.contact.email}`, label: "Email" },
    { icon: Globe, url: `https://${portfolioData.contact.website}`, label: "Website" },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-foreground mb-8 text-center">Get In Touch</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Contact Information</h2>
          
          <div className="space-y-6">
            <div className="flex items-center">
              <Mail className="w-6 h-6 text-primary mr-4" />
              <div>
                <h3 className="font-semibold text-foreground">Email</h3>
                <a 
                  href={`mailto:${portfolioData.contact.email}`} 
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {portfolioData.contact.email}
                </a>
              </div>
            </div>
            
            <div className="flex items-center">
              <Globe className="w-6 h-6 text-primary mr-4" />
              <div>
                <h3 className="font-semibold text-foreground">Website</h3>
                <a 
                  href={`https://${portfolioData.contact.website}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {portfolioData.contact.website}
                </a>
              </div>
            </div>
          </div>
          
          <div className="mt-8">
            <h3 className="font-semibold text-foreground mb-4">Connect with me</h3>
            <div className="flex space-x-4">
              {socialLinks.slice(0, 4).map((link, index) => {
                const Icon = link.icon;
                return (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={link.label}
                  >
                    <Icon className="w-6 h-6" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Contact Form */}
        <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">Send me a message</h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                required
              />
            </div>
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                required
              />
            </div>
            
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-background border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition"
                required
              ></textarea>
            </div>
            
            <button
              type="submit"
              className="w-full py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};