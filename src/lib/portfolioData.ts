// Spandana's Portfolio Data

export const portfolioData = {
  about: {
    name: "Spandana N S",
    role: "Front-end Software Engineer",
    location: "Bangalore",
    bio: `Recent Bachelors in Computer Applications graduate (August 2024, Bangalore University) passionate about software engineering and building efficient, scalable applications. With a strong foundation in HTML, CSS, Javascript, React, Next.js, Github, Typescript, Tailwind and data structures, I'm eager to contribute to innovative software projects as a front-end developer.
I worked as a Market Research Associate at Moxo from February 2025 to January 2026 (10 months). This role involved quantitative/qualitative market research, identifying revenue-sized companies and decision makers using tools like Sales Navigator, Lusha, ZoomInfo, and Crunchbase to generate qualified leads across regions (APAC, US, Middle East, Africa), including prospecting, company profiling, email campaigns, database maintenance, HubSpot CRM lead routing, quality analysis, and report preparation.

Key highlights:
- Completed Full Stack Web Development Certificate from Codecraft Academy | Udemy
- Part of Women In Tech Programme | Completed Training in Web Mobile Applications Course From Dec 09th 2023 To March 7th 2024
- Recognized as the Top Market Researcher at MOXO
- Industrial Visit to HSBC and CGI Companies by Nirmaan Organization

My technical portfolio showcases coding projects: I'm continuously learning core software engineering concepts like OOP, algorithms, and version control.`,
    education: `BCA (2024) – Bangalore University`
  },

  contact: {
    github: "github.com/Spandana-N-S",
linkedin: "https://linkedin.com/in/spandana-n-s-357963248",
    instagram: "www.instagram.com/spandana_shivarajgowda/?hl=en",
    email: "spandanans28@gmail.com"
  },

  education: [
    {
      degree: "Bachelors in Computer Applications",
      university: "Bangalore University",
      date: "2021 - August 2024",
      grade: "7.57",
    }
  ],

  skills: {
    "Frontend & UI (Expert)": [
      "JavaScript (ES6+ Expert), Typescript",
      "React (Expert), Next.js (Expert), GSAP (Animations)",
      "Tailwind CSS, Responsive Design",
      "CodeMirror 6 (Text Editors), WebContainers (Browser-based Environments)"
    ],
    "Backend & API": [
      "tRPC (Type-safe APIs), Inngest (Serverless Workflows/Queues)",
      "Clerk (Authentication)",
      "Payload CMS (Content Management)",
      "Stripe Connect (Payments)",
      "MongoDB, Convex (Databases & Storage)"
    ],
    "Monitoring, AI & Automation": [
      "Sentry, CodeRabbit, Junie"
    ],
    "Version Control": [
      "Git, GitHub"
    ],
    "Soft Skills & Fundamentals": [
      "Communication",
      "CS Fundamentals: DSA, DBMS, OS, OOP, Networks",
      "150+ LeetCode problems (DP, Graphs, Arrays)"
    ]
  },

  workExperience: [
    {
      role: "Market Research Associate",
      company: "Moxo",
      date: "February 2025 - January 2026",
      location: "Remote",
      description: [
        "Quantitative/qualitative market research, identifying revenue-sized companies and decision makers using Sales Navigator, Lusha, ZoomInfo, Crunchbase.",
        "Generated qualified leads across APAC, US, Middle East, Africa; prospecting, company profiling, email campaigns, HubSpot CRM.",
        "Recognized as Top Market Researcher."
      ]
    }
  ],

  projects: [
    {
      title: "Polaris | Build a Complete Browser-native Own AI Powered coding Environment IDE platform",
      subtitle: "Next.js, Typescript, Convex, Clerk, Inngest, CodeMirror 6, WebContainers, Firecrawl, Sentry, CodeRabbit",
      description: "AI-Driven Development Agent in Real-Time Browser Execution: Build an autonomous AI agent powered by Inngest that creates, modifies files, scrapes URLs via Firecrawl, and executes code entirely from natural-language prompts. Integrated WebContainers to deliver a full Node.js runtime, terminal, live preview, and code execution directly in the browser. Used CodeMirror 6 with Ghost-text AI Suggestions. Seamless Github Integration with Clerk OAuth. Production-Grade Reliability with Sentry monitoring.",
      codeLink: "https://github.com/Spandana-N-S/polaris"
    },
    {
      title: "Multitenant E-Commerce Marketplace App | Build a Complete Production ready App from Scratch",
      subtitle: "Next.js, Typescript, Tailwind CSS V4, Payload CMS, MongoDB, Stripe Connect, tRPC, Bun/NPM, CodeRabbit",
      description: "Multi-Tenant Architecture & Backend: Designed robust multi-tenant system with isolated tenant data, custom subdomain routing, tenant-specific roles, powerful payload CMS backend. Advanced Product Catalog with real-time search & filters. Payments with Stripe Connect, full cart management. March 2026.",
      codeLink: "https://github.com/Spandana-N-S/nextjs-multitenant-ecommerce"
    },
    {
      title: "Hangman Game | Fully Interactive Browser-based word guessing game | Built with Vanilla Javascript",
      subtitle: "Vanilla Javascript, HTML, CSS",
      description: "Game Logic & Mechanics: random word selection from 260+ word list, hint system, letter guessing, win/lose detection, progressive hangman stages. Interactive UI with on-screen keyboard, real-time word display, animated game-over modal. February 2026.",
      codeLink: "https://github.com/Spandana-N-S/hangman-Javascript"
    },
    {
      title: "Crazy 3D Image Slider Effects Using CSS",
      subtitle: "Advanced CSS 3D slider",
      description: "Interactive 3D image slider effects built with pure CSS.",
      codeLink: "https://github.com/Spandana-N-S/Crazy-3D-Image-Slider-Effects-Using-CSS"
    }
  ],

  achievements: [
    { title: "Top Market Researcher", description: "Recognized at MOXO for outstanding performance", date: "2025", icon: "Trophy" },
    { title: "Industrial Visit", description: "HSBC and CGI Companies by Nirmaan Organization", date: "2024", icon: "Building" }
  ],

certificates: [
    {
      name: "Full Stack Web Development Certificate",
      issuer: "Codecraft Academy | Udemy",
      credentialId: "UC-b83227e7-e5bf-421b-87bf-1574700588b5",
      date: "2024",
      link: "https://www.udemy.com/certificate/UC-b83227e7-e5bf-421b-87bf-1574700588b5/",
      pdfLink: "/Certificates.pdf"
    },
    {
      name: "Women In Tech Programme - Web Mobile Applications",
      issuer: "Nirmaan Organization",
      credentialId: "WIT-WEB-2024-002",
      date: "Dec 2023 - Mar 2024",
link: "https://www.linkedin.com/in/spandana-n-s-357963248",
      pdfLink: "/Certificates.pdf"
    }
  ],

  publications: []
};
