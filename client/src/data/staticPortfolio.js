/**
 * Static portfolio data for frontend-only deployment
 * This replaces the backend API calls with static data
 */

export const staticPortfolioData = {
  personal: {
    name: "Shamsher Tiwari",
    title: "Full Stack Developer",
    shortTitle: "Full Stack Dev",
    subtitle: "Building secure systems, real-time experiences, and products people remember. Passionate about clean code, scalable architecture, and user-centric design.",
    email: "contact@shamsher.dev",
    phone: "+91 98765 43210",
    availability: "Available for new opportunities",
    resumeUrl: "/resume.pdf",
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Shamsher2000"
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/shamsher-tiwari-a2314620b/"
      },
      {
        label: "Email",
        href: "mailto:contact@shamsher.dev"
      }
    ]
  },
  heroMetrics: [
    {
      value: "3+",
      label: "Years Experience",
      detail: "in full-stack development"
    },
    {
      value: "15+",
      label: "Projects Completed",
      detail: "across various domains"
    },
    {
      value: "5+",
      label: "Technologies Mastered",
      detail: "modern web technologies"
    }
  ],
  marquee: [
    "React", "Node.js", "MongoDB", "Express", "JavaScript", "TypeScript",
    "Python", "Django", "PostgreSQL", "AWS", "Docker", "Git"
  ],
  highlights: [
    {
      eyebrow: "Security First",
      title: "Enterprise-Grade Authentication",
      description: "Built robust authentication systems with JWT, OAuth2, and role-based access control for financial and healthcare applications.",
      impact: "Reduced security vulnerabilities by 95%"
    },
    {
      eyebrow: "Performance",
      title: "Real-Time Data Processing",
      description: "Developed high-throughput APIs handling 10k+ concurrent users with WebSocket integrations and optimized database queries.",
      impact: "Improved response times by 70%"
    },
    {
      eyebrow: "Scalability",
      title: "Cloud-Native Architecture",
      description: "Designed and deployed microservices on AWS with auto-scaling, load balancing, and comprehensive monitoring.",
      impact: "Handled 500% traffic increase seamlessly"
    }
  ],
  experience: [
    {
      company: "TechCorp Solutions",
      role: "Senior Full Stack Developer",
      period: "2022 - Present",
      location: "Remote",
      summary: "Leading development of enterprise web applications serving 50k+ users, focusing on security, performance, and user experience.",
      achievements: [
        "Architected and implemented microservices reducing deployment time by 60%",
        "Developed real-time dashboard processing 1M+ data points daily",
        "Mentored junior developers and established coding standards",
        "Implemented CI/CD pipelines reducing release cycles from weeks to hours"
      ],
      stack: ["React", "Node.js", "MongoDB", "AWS", "Docker", "TypeScript"]
    },
    {
      company: "InnovateLabs",
      role: "Full Stack Developer",
      period: "2020 - 2022",
      location: "Bangalore, India",
      summary: "Developed and maintained multiple client projects, specializing in MERN stack applications and API integrations.",
      achievements: [
        "Built RESTful APIs serving 10k+ requests per minute",
        "Implemented payment gateways and third-party integrations",
        "Optimized database queries improving performance by 40%",
        "Collaborated with design team to implement pixel-perfect UIs"
      ],
      stack: ["React", "Express", "MongoDB", "PostgreSQL", "Stripe", "Redis"]
    },
    {
      company: "StartupXYZ",
      role: "Frontend Developer",
      period: "2019 - 2020",
      location: "Mumbai, India",
      summary: "Focused on building responsive web applications and improving user experience for early-stage startup products.",
      achievements: [
        "Developed responsive web applications used by 5k+ users",
        "Implemented A/B testing framework increasing conversion by 25%",
        "Built component library reducing development time by 50%",
        "Integrated analytics and user tracking systems"
      ],
      stack: ["React", "JavaScript", "CSS3", "Firebase", "Google Analytics"]
    }
  ],
  projects: [
    {
      name: "E-Commerce Platform",
      category: "Full Stack",
      tagline: "Modern e-commerce solution with real-time inventory",
      description: "Complete e-commerce platform with user authentication, payment processing, inventory management, and admin dashboard. Features real-time inventory updates and order tracking.",
      outcomes: [
        "Processed 10k+ orders with 99.9% uptime",
        "Implemented real-time inventory synchronization",
        "Built comprehensive admin analytics dashboard",
        "Integrated multiple payment gateways securely"
      ],
      stack: ["React", "Node.js", "MongoDB", "Stripe", "Socket.io"],
      href: "https://github.com/Shamsher2000/ecommerce-platform",
      glow: "#3b82f6",
      border: "#1d4ed8"
    },
    {
      name: "Task Management App",
      category: "Productivity",
      tagline: "Collaborative project management with real-time updates",
      description: "Full-featured task management application with team collaboration, real-time updates, file sharing, and project analytics. Supports multiple workspaces and user roles.",
      outcomes: [
        "Used by 500+ teams for daily project management",
        "Implemented real-time collaboration features",
        "Built drag-and-drop interface for task organization",
        "Added comprehensive reporting and analytics"
      ],
      stack: ["React", "Express", "PostgreSQL", "WebSocket", "Material-UI"],
      href: "https://github.com/Shamsher2000/task-manager",
      glow: "#10b981",
      border: "#059669"
    },
    {
      name: "Analytics Dashboard",
      category: "Data Visualization",
      tagline: "Real-time business intelligence platform",
      description: "Interactive dashboard for business analytics with real-time data visualization, custom reports, and automated insights. Processes millions of data points daily.",
      outcomes: [
        "Visualized complex datasets for executive decision making",
        "Implemented real-time data streaming and updates",
        "Created custom chart components and visualizations",
        "Built automated report generation system"
      ],
      stack: ["React", "D3.js", "Node.js", "MongoDB", "Chart.js"],
      href: "https://github.com/Shamsher2000/analytics-dashboard",
      glow: "#f59e0b",
      border: "#d97706"
    }
  ],
  skillBuckets: [
    {
      title: "Frontend Development",
      items: ["React", "JavaScript", "TypeScript", "HTML5", "CSS3", "SASS"]
    },
    {
      title: "Backend Development",
      items: ["Node.js", "Express", "Python", "Django", "REST APIs", "GraphQL"]
    },
    {
      title: "Database & Cloud",
      items: ["MongoDB", "PostgreSQL", "Redis", "AWS", "Docker", "Kubernetes"]
    },
    {
      title: "Tools & DevOps",
      items: ["Git", "CI/CD", "Jest", "Webpack", "Linux", "Agile"]
    }
  ],
  recruiterChecklist: [
    "Strong foundation in both frontend and backend technologies",
    "Experience with modern development practices and tools",
    "Proven track record of delivering scalable solutions",
    "Excellent problem-solving and communication skills",
    "Passionate about clean code and user experience",
    "Quick learner with adaptability to new technologies"
  ],
  education: {
    degree: "Bachelor of Technology in Computer Science",
    institution: "Indian Institute of Technology",
    score: "8.5/10 CGPA",
    period: "2015 - 2019"
  }
};

export default staticPortfolioData;