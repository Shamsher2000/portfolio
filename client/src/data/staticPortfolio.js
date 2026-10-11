/**
 * Static portfolio data for frontend-only deployment
 * This replaces the backend API calls with static data
 */

export const staticPortfolioData = {
  slug: 'primary',
  personal: {
    name: 'Shamsher Tiwari',
    shortTitle: 'AI-Ready Full-Stack Engineer',
    title: 'System Development Engineer 2 at Dell Technologies',
    subtitle:
      'At Dell Technologies, I ship permission-aware Node.js APIs, real-time React and Kafka experiences, and AI-assisted Python automation—from architecture through delivery.',
    availability:
      'AI-ready full-stack engineer with enterprise ownership across security, real-time data, and automation. Open to backend, full-stack, platform, and AI-enabled product roles.',
    email: 'shamshertiwari.nov2000@gmail.com',
    phone: '+91 8765616755',
    resumeUrl: '/resume/Shamsher_Tiwari_resume.pdf',
    links: [
      {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/shamsher-tiwari-a2314620b/',
      },
      {
        label: 'GitHub',
        href: 'https://github.com/Shamsher2000',
      },
      {
        label: 'Email',
        href: 'mailto:shamshertiwari.nov2000@gmail.com',
      },
    ],
  },
  heroMetrics: [
    {
      value: '70%',
      label: 'More custom control',
      detail: 'Claude-assisted SBAC permission design for AI-driven 17G server management.',
    },
    {
      value: '2x',
      label: 'Faster OME deployment',
      detail: 'AI-assisted Python automation for complex infrastructure workflows.',
    },
    {
      value: '30%+',
      label: 'Global admin reach',
      detail: '17G backend and OME integration impacting datacentre administrators worldwide.',
    },
    {
      value: '50%',
      label: 'Less manual effort',
      detail: 'Automated OME configuration, backup, and restoration workflows.',
    },
  ],
  marquee: [
    'AI-Assisted Engineering',
    'Claude + LLMs',
    'Node.js',
    'React',
    'Redux Toolkit',
    'Kafka Telemetry',
    'Python Automation',
    'Gemini 2.5 Flash',
    'Web Speech API',
    'Scope-Based Access Control',
    'GitHub Copilot',
    'Enterprise Systems',
  ],
  highlights: [
    {
      eyebrow: 'Secure APIs + AI-assisted design',
      title: 'Granular access control for AI-driven server management.',
      description:
        'At Dell, I designed Node.js, Express, and MongoDB APIs with scope-based access control, using Claude and LLMs to architect complex permission matrices for 17G server management through OpenManage Enterprise.',
      impact: 'Increased custom user control by 70% while adding a critical enterprise security layer.',
    },
    {
      eyebrow: 'Real-time product engineering',
      title: 'High-volume Kafka telemetry, made decision-ready.',
      description:
        'I built an end-to-end React and Redux Toolkit frontend for Kafka Connectivity and applied AI-assisted code optimization to stream and render large datasets in real time.',
      impact: 'Improved monitoring and data-driven decisions for cloud-scale infrastructure workflows.',
    },
    {
      eyebrow: 'AI-assisted automation ownership',
      title: 'OME deployment workflows automated end to end.',
      description:
        'I built and owned a Python automation framework from scratch with Dell Common Framework libraries, using AI models to generate and refine complex configuration, backup, and restoration scripts.',
      impact: '2x faster deployments with 50% less manual engineering effort.',
    },
  ],
  experience: [
    {
      company: 'Dell Technologies',
      role: 'System Development Engineer 2',
      period: 'Aug 2023 - Present',
      location: '',
      summary:
        'Delivering secure APIs, real-time product interfaces, and AI-assisted automation for OpenManage Enterprise and next-generation server-management workflows.',
      achievements: [
        'Designed a Node.js, Express, and MongoDB API with scope-based access control, using Claude and LLMs to model complex permissions and increase custom user control by 70%.',
        'Contributed to the 17G backend and OpenManage Enterprise integration, supporting workflows that impact more than 30% of datacentre administrators worldwide.',
        'Built an end-to-end React and Redux Toolkit service for Kafka Connectivity, using AI code optimization for high-volume real-time telemetry.',
        'Owned a Python automation framework from scratch that doubled deployment speed and reduced manual engineering effort by 50%.',
      ],
      stack: ['Node.js', 'Express', 'MongoDB', 'React', 'Redux Toolkit', 'Python', 'Kafka', 'OME', 'Claude', 'LLMs'],
    },
    {
      company: 'Draup',
      role: 'Front End Developer Intern',
      period: 'Feb 2023 - May 2023',
      location: '',
      summary:
        'Improved email-template workflows by reducing frontend dependency on backend changes.',
      achievements: [
        'Migrated email templates from backend-controlled rendering to Postmark-based management.',
        'Used JavaScript libraries to streamline template handling and speed up content updates.',
      ],
      stack: ['JavaScript', 'Frontend Development', 'Postmark', 'Template Systems'],
    },
  ],
  projects: [
    {
      name: 'VocaLink',
      category: 'AI Voice Agent · Gemini 2.5 Flash',
      tagline: 'A multilingual voice agent with speech recognition and natural-language intent handling.',
      description:
        'VocaLink combines the MERN stack, Web Speech API, Gemini 2.5 Flash, Socket.IO, and Indian-language support in a configurable AI assistant.',
      outcomes: [
        'Built speech recognition for Indian languages with Web Speech API and real-time intent detection powered by Gemini 2.5 Flash.',
        'Designed a JSON-driven action system for search, media playback, date and time, weather, and calculator requests.',
        'Added assistant customization plus MongoDB and Cloudinary persistence while keeping conversations fluid with Socket.IO.',
      ],
      stack: ['React', 'Node.js', 'MongoDB', 'Gemini 2.5 Flash', 'Web Speech API', 'Socket.IO', 'Cloudinary'],
      href: 'https://github.com/Shamsher2000/aiassitant.git',
      glow: 'rgba(140, 184, 255, 0.22)',
      border: 'rgba(140, 184, 255, 0.2)',
    },
    {
      name: 'Chatly',
      category: 'Real-time Chat App',
      tagline: 'Live messaging designed around speed, presence, and expressive interaction.',
      description:
        'Chatly combines event-driven communication with a responsive UI so text, media, and presence updates stay synchronized.',
      outcomes: [
        'Built live messaging and active-user tracking with Socket.IO.',
        'Enabled text, image, and emoji messaging using Multer and Cloudinary-backed uploads.',
        'Managed high-frequency UI synchronization with Redux.',
      ],
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Socket.IO', 'Cloudinary'],
      href: 'https://github.com/Shamsher2000/chatapp.git',
      glow: 'rgba(33, 189, 163, 0.24)',
      border: 'rgba(33, 189, 163, 0.18)',
    },
    {
      name: 'Shoppe',
      category: 'E-commerce Platform',
      tagline: 'A full shopping flow with secure auth, admin operations, and polished discovery.',
      description:
        'Shoppe was built as an end-to-end MERN commerce experience focused on secure checkout, smooth browsing, and admin usability.',
      outcomes: [
        'Implemented JWT-based authentication and an administrative dashboard for order management.',
        'Integrated Stripe for payments and Cloudinary for reliable image delivery and optimization.',
        'Added pagination, fuzzy search, and multi-parameter filtering to improve product exploration.',
      ],
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe', 'Cloudinary'],
      href: 'https://github.com/Shamsher2000/onlineshoppingapp.git',
      glow: 'rgba(255, 122, 89, 0.28)',
      border: 'rgba(255, 122, 89, 0.22)',
    },
  ],
  skillBuckets: [
    {
      title: 'Frontend Product Engineering',
      items: ['React', 'Redux Toolkit', 'JavaScript (ES6+)', 'HTML5', 'CSS', 'Responsive UI', 'Tailwind CSS'],
    },
    {
      title: 'Backend & Data',
      items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'MySQL', 'PostgreSQL', 'API Security', 'SBAC', 'JWT'],
    },
    {
      title: 'Real-time & Enterprise Systems',
      items: ['Kafka Connectivity', 'Socket.IO', 'Telemetry Visualization', 'OpenManage Enterprise', 'Server Architecture', 'VMware ESXi', 'vSphere'],
    },
    {
      title: 'AI & Automation',
      items: ['Python', 'Claude', 'LLM-Assisted Engineering', 'Gemini 2.5 Flash', 'ChatGPT', 'GitHub Copilot', 'Web Speech API', 'AI Code Optimization'],
    },
  ],
  recruiterChecklist: [
    'Enterprise engineering at Dell across secure APIs, real-time frontend systems, and infrastructure automation.',
    'Applied Claude and LLMs to permission architecture that increased custom user control by 70%.',
    'Used AI-assisted optimization for high-volume telemetry and AI models for complex automation scripts.',
    'Built VocaLink with Gemini 2.5 Flash, Web Speech API, Socket.IO, and multilingual support.',
    'Own work end to end while balancing security, usability, operability, and measurable delivery.',
  ],
  education: {
    institution: 'Dayananda Sagar College of Engineering',
    degree: 'B.E. in Computer Science Engineering',
    score: '9.5 CGPA',
    period: 'Aug 2019 - Jul 2023',
    location: 'Bengaluru, Karnataka',
  },
};
