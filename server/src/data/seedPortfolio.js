import { parseResumePDF } from '../utils/pdfParser.js';
import { getPrimaryResumePath, primaryResumeExists, pdfConfig } from '../config/pdfConfig.js';

/**
 * Fallback portfolio data (used when PDF is not available)
 * Keep this as a comprehensive default that matches the expected structure
 */
export const fallbackPortfolioData = {
  slug: 'primary',
  personal: {
    name: 'Shamsher Tiwari',
    shortTitle: 'System Development Engineer 2',
    title: 'System Development Engineer 2 at Dell Technologies',
    subtitle:
      'I build secure backend systems, expressive React experiences, and automation flows that make enterprise infrastructure easier to operate and more delightful to use.',
    availability:
      'Open to thoughtful recruiter conversations and software engineering opportunities that value ownership, product sense, and full-stack execution.',
    email: 'shamshertiwari.nov2000@gmail.com',
    phone: '+91 8765616755',
    location: 'Bengaluru, Karnataka, India',
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
      label: 'More user control',
      detail: 'Scope-based permissions for high-security infrastructure APIs.',
    },
    {
      value: '2x',
      label: 'Faster deployment',
      detail: 'Python automation reduced repetitive setup effort across environments.',
    },
    {
      value: '30%+',
      label: 'Global admin impact',
      detail: 'Backend features shipped for datacentre administrators worldwide.',
    },
    {
      value: '9.5',
      label: 'CGPA',
      detail: 'Strong academic base in computer science and systems thinking.',
    },
  ],
  marquee: [
    'Node.js',
    'Express',
    'MongoDB',
    'React',
    'Redux Toolkit',
    'Realtime Data',
    'System Design',
    'Python Automation',
    'Socket.IO',
    'Cloudinary',
    'Stripe',
    'Enterprise Security',
  ],
  highlights: [
    {
      eyebrow: 'Security-first systems',
      title: 'Backend APIs designed with real permission boundaries.',
      description:
        'At Dell Technologies, I engineered secure Node.js and Express services with scope-based access control to protect AI-driven 17G server management workflows.',
      impact: 'Built for enterprise trust, granular control, and operational clarity.',
    },
    {
      eyebrow: 'Realtime product thinking',
      title: 'Interfaces that stay readable while data keeps moving.',
      description:
        'I built React and Redux Toolkit experiences for Kafka Connectivity so customers could stream and visualize high-volume telemetry in real time.',
      impact: 'Focused on clarity, responsiveness, and decision-ready information.',
    },
    {
      eyebrow: 'Automation ownership',
      title: 'Complex deployment workflows simplified into repeatable systems.',
      description:
        'I owned a Python automation framework for OpenManage Enterprise configuration, backup, and restoration across diverse environments.',
      impact: 'Doubled deployment speed and reduced manual engineering effort by half.',
    },
  ],
  experience: [
    {
      company: 'Dell Technologies',
      role: 'System Development Engineer 2',
      period: 'Aug 2023 - Present',
      location: 'Bengaluru, Karnataka',
      summary:
        'Building secure backend services, realtime observability experiences, and automation systems for OpenManage Enterprise and next-generation infrastructure workflows.',
      achievements: [
        'Designed a high-security backend API with scope-based access control using Node.js, Express, and MongoDB.',
        'Contributed to 17G backend development and OpenManage Enterprise integration for enterprise hardware management.',
        'Built a React and Redux Toolkit frontend service to manage Kafka Connectivity and visualize telemetry at scale.',
        'Took full ownership of a Python automation framework that accelerated deployment and reduced operational effort.',
      ],
      stack: ['Node.js', 'Express', 'MongoDB', 'React', 'Redux Toolkit', 'Python', 'Kafka', 'OME'],
    },
    {
      company: 'Draup',
      role: 'Front End Developer Intern',
      period: 'Feb 2023 - May 2023',
      location: 'Remote / Bengaluru',
      summary:
        'Improved template workflows and frontend agility by reducing backend dependency for email template updates.',
      achievements: [
        'Migrated email templates from backend-controlled rendering to Postmark-based management.',
        'Used JavaScript libraries to streamline template handling and speed up content updates.',
      ],
      stack: ['JavaScript', 'Frontend Development', 'Postmark', 'Template Systems'],
    },
  ],
  projects: [
    {
      name: 'Shoppe',
      category: 'Ecommerce Platform',
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
    {
      name: 'Chatly',
      category: 'Realtime Chat App',
      tagline: 'Live messaging designed around speed, presence, and expressive interaction.',
      description:
        'Chatly combines realtime communication patterns with a responsive UI so conversations stay fluid across text, media, and presence updates.',
      outcomes: [
        'Built live messaging and active user tracking with Socket.IO.',
        'Enabled text, image, and emoji messaging using Multer and Cloudinary-backed uploads.',
        'Managed complex UI synchronization with Redux for high-frequency interactions.',
      ],
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Socket.IO', 'Cloudinary'],
      href: 'https://github.com/Shamsher2000/chatapp.git',
      glow: 'rgba(33, 189, 163, 0.24)',
      border: 'rgba(33, 189, 163, 0.18)',
    },
    {
      name: 'VocaLink',
      category: 'AI Voice Assistant',
      tagline: 'A multilingual voice-enabled virtual agent built with real interaction flow.',
      description:
        'VocaLink extends the MERN stack into speech-driven interaction with natural language controls, assistant customization, and realtime conversation support.',
      outcomes: [
        'Engineered speech-recognition flows for Indian languages using Web Speech API and Gemini Flash.',
        'Built JSON-driven actions for search, media playback, date, weather, and calculator intents.',
        'Stored assistant assets and user inputs with MongoDB and Cloudinary while keeping conversations smooth with Socket.IO.',
      ],
      stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Socket.IO', 'Gemini', 'Cloudinary'],
      href: 'https://github.com/Shamsher2000/aiassitant.git',
      glow: 'rgba(140, 184, 255, 0.22)',
      border: 'rgba(140, 184, 255, 0.2)',
    },
  ],
  skillBuckets: [
    {
      title: 'Frontend Experience',
      items: ['React', 'Redux Toolkit', 'JavaScript (ES6+)', 'HTML5', 'CSS', 'Responsive UI', 'Tailwind CSS'],
    },
    {
      title: 'Backend Engineering',
      items: ['Node.js', 'Express', 'MongoDB', 'Mongoose', 'SQL', 'REST APIs', 'Authentication'],
    },
    {
      title: 'Realtime & Product Systems',
      items: ['Socket.IO', 'Kafka Connectivity', 'Telemetry Visualization', 'Cloudinary', 'Stripe'],
    },
    {
      title: 'Core Engineering',
      items: ['Python', 'C/C++', 'System Design', 'DBMS', 'SDLC', 'Agile', 'Data Structures and Algorithms'],
    },
  ],
  recruiterChecklist: [
    'Enterprise experience at Dell with visible ownership across backend, frontend, and automation.',
    'MERN projects that show product thinking, API design, payments, realtime messaging, and AI features.',
    'Comfortable with both systems-heavy contexts and recruiter-facing presentation quality.',
    'Strong CS foundation with a 9.5 CGPA in Computer Science Engineering.',
  ],
  education: {
    institution: 'Dayananda Sagar College of Engineering',
    degree: 'B.E. in Computer Science Engineering',
    score: '9.5 CGPA',
    period: 'Aug 2019 - Jul 2023',
    location: 'Bengaluru, Karnataka',
  },
};

/**
 * Dynamically load portfolio data
 * First tries to read from PDF, falls back to default data
 */
export async function loadPortfolioData() {
  if (primaryResumeExists()) {
    try {
      console.log(`📄 Reading resume from PDF: ${getPrimaryResumePath()}`);
      const pdfData = await parseResumePDF(getPrimaryResumePath());
      console.log('✅ Successfully parsed resume PDF');
      
      // Merge PDF data with fallback data to ensure all fields exist
      return mergeWithFallback(pdfData);
    } catch (error) {
      console.error(`⚠️  Error parsing PDF: ${error.message}`);
      
      if (pdfConfig.useFallbackOnError) {
        console.log('📌 Falling back to default portfolio data');
        return fallbackPortfolioData;
      }
      throw error;
    }
  } else {
    console.log(`📌 No PDF found at ${getPrimaryResumePath()}, using fallback data`);
    console.log(`💡 To enable PDF-based seeding, place your resume PDF in: ${getPrimaryResumePath()}`);
    return fallbackPortfolioData;
  }
}

/**
 * Merge parsed PDF data with fallback to ensure all required fields are present
 */
function mergeWithFallback(pdfData) {
  return {
    slug: pdfData.slug || fallbackPortfolioData.slug,
    personal: {
      ...fallbackPortfolioData.personal,
      ...pdfData.personal,
    },
    heroMetrics: pdfData.heroMetrics?.length > 0 ? pdfData.heroMetrics : fallbackPortfolioData.heroMetrics,
    marquee: pdfData.marquee?.length > 0 ? pdfData.marquee : fallbackPortfolioData.marquee,
    highlights: pdfData.highlights?.length > 0 ? pdfData.highlights : fallbackPortfolioData.highlights,
    experience: pdfData.experience?.length > 0 ? pdfData.experience : fallbackPortfolioData.experience,
    projects: pdfData.projects?.length > 0 ? pdfData.projects : fallbackPortfolioData.projects,
    skillBuckets: pdfData.skillBuckets?.length > 0 ? pdfData.skillBuckets : fallbackPortfolioData.skillBuckets,
    recruiterChecklist: pdfData.recruiterChecklist?.length > 0 ? pdfData.recruiterChecklist : fallbackPortfolioData.recruiterChecklist,
    education: pdfData.education && Object.values(pdfData.education).some(v => v) 
      ? pdfData.education 
      : fallbackPortfolioData.education,
  };
}

// Export the fallback data for backward compatibility
export const seedPortfolio = fallbackPortfolioData;
