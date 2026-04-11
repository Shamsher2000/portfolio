import pdfParse from 'pdf-parse';
import fs from 'node:fs';
import path from 'node:path';

/**
 * Parse resume PDF and extract structured portfolio data
 * Optimized for standard resume template with:
 * - Name and contact at top
 * - EXPERIENCE section with roles/companies/dates
 * - PROJECTS section with descriptions
 * - TECHNICAL SKILLS section
 * - EDUCATION section
 */
export async function parseResumePDF(pdfPath) {
  if (!fs.existsSync(pdfPath)) {
    throw new Error(`Resume PDF not found at: ${pdfPath}`);
  }

  const fileBuffer = fs.readFileSync(pdfPath);
  const pdfData = await pdfParse(fileBuffer);
  const text = pdfData.text;

  // Extract sections from PDF using markers
  const portfolioData = {
    slug: 'primary',
    personal: extractPersonalInfo(text),
    heroMetrics: extractHeroMetrics(text),
    marquee: extractSkills(text),
    highlights: extractHighlights(text),
    experience: extractExperience(text),
    projects: extractProjects(text),
    skillBuckets: extractSkillBuckets(text),
    recruiterChecklist: extractRecruiterChecklist(text),
    education: extractEducation(text),
    resumeFile: 'resume.pdf',
  };

  return portfolioData;
}

/**
 * Extract personal information from resume
 * Looks for: name at top, email, phone, location, links
 */
function extractPersonalInfo(text) {
  const lines = text.split('\n').map(l => l.trim()).filter(Boolean);

  // First line is usually the name
  let name = lines[0] || 'Shamsher Tiwari';
  
  // If first line has contact info, name is likely before it
  if (name.includes('@') || name.includes('+')) {
    name = lines.find(l => !l.includes('@') && !l.includes('+') && l.length < 50) || name;
  }

  return {
    name: extractField(text, /^([A-Z][a-z]+ [A-Z][a-z]+(?:\s+[A-Z][a-z]+)*)/m, 0, name),
    shortTitle: extractField(text, /(?:System Development Engineer|Developer|Engineer|Consultant)\s+\d+/i, 0, 'Developer'),
    title: extractField(text, /(?:^|\n)(System Development Engineer\s+\d+.*?)(?:\n|$)/i, 1, ''),
    subtitle: `I build secure backend systems, expressive React experiences, and automation flows that make enterprise infrastructure easier to operate and more delightful to use.`,
    availability: `Open to thoughtful recruiter conversations and software engineering opportunities that value ownership, product sense, and full-stack execution.`,
    email: extractEmail(text),
    phone: extractPhone(text),
    location: extractField(text, /(?:Bengaluru|Bangalore|Delhi|Mumbai|Pune|Hyderabad|[A-Z][a-z]+,\s*[A-Z][a-z]+)/i, 0, 'Bengaluru, India'),
    resumeUrl: '/resume/resume.pdf',
    links: extractLinks(text),
  };
}

/**
 * Extract hero metrics from experience achievements
 * Looks for percentages, multipliers (2x, 3x) in achievement text
 */
function extractHeroMetrics(text) {
  const metrics = [];
  
  // Look for patterns like "70%", "2x", "30%+" in the text
  const metricPattern = /([\d.]+%\+?|[\d.]+x)\s+([^.\n]+)/gi;
  
  let match;
  const seen = new Set();
  
  while ((match = metricPattern.exec(text)) !== null && metrics.length < 4) {
    const value = match[1].trim();
    const description = match[2].trim().substring(0, 60);
    
    if (!seen.has(value)) {
      seen.add(value);
      metrics.push({
        value: value,
        label: description.split('\n')[0] || 'Achievement',
        detail: description,
      });
    }
  }

  // Fallback metrics if not found
  if (metrics.length === 0) {
    metrics.push(
      { value: '70%', label: 'More user control', detail: 'Scope-based permissions for high-security infrastructure APIs.' },
      { value: '2x', label: 'Faster deployment', detail: 'Python automation reduced repetitive setup effort.' },
      { value: '30%+', label: 'Global admin impact', detail: 'Backend features shipped for datacentre administrators worldwide.' },
      { value: '9.5', label: 'Education', detail: 'Strong academic foundation in computer science.' }
    );
  }

  return metrics;
}

/**
 * Extract technical skills from TECHNICAL SKILLS section
 * Returns array of individual technologies
 */
function extractSkills(text) {
  const skillsMatch = text.match(/(?:TECHNICAL\s+SKILLS|Technical Skills)[:\s]*\n([\s\S]*?)(?=\n\n|EDUCATION|$)/i);
  
  if (skillsMatch) {
    const skillsText = skillsMatch[1];
    
    // Extract skills from "Libraries Framework", "Databases", etc.
    const skills = new Set();
    
    // Split by various delimiters and extract individual skills
    const allSkills = skillsText
      .split(/[,\n•-]/)
      .map(s => s.trim())
      .filter(s => s.length > 0 && s.length < 50 && !s.includes(':'))
      .map(s => s.replace(/^(–|-|•)\s*/, '').trim());

    allSkills.forEach(skill => {
      // Only add actual skill names, not phrases
      if (skill && !skill.includes('Subject') && !skill.includes('Cloud') && skill.split(' ').length <= 3) {
        skills.add(skill);
      }
    });

    if (skills.size > 0) {
      return Array.from(skills).slice(0, 20);
    }
  }

  // Fallback skills
  return [
    'Node.js', 'Express', 'MongoDB', 'React', 'Redux', 'JavaScript',
    'Python', 'Socket.IO', 'Cloudinary', 'Stripe', 'Docker', 'PostgreSQL'
  ];
}

/**
 * Extract highlights from experience section
 * Uses first few achievements as highlights
 */
function extractHighlights(text) {
  const highlights = [];
  
  // Look for Dell Technologies experience section
  const dellMatch = text.match(/Dell Technologies[\s\S]*?(?=\n\n*(?:Draup|PROJECTS)|$)/i);
  
  if (dellMatch) {
    const dellText = dellMatch[0];
    const bulletPoints = dellText.match(/•\s*([^\n]+?\n(?:\s*•\s*[^\n]+\n?)*)/g) || [];
    
    const sections = extractDellHighlights(dellText);
    
    sections.forEach(section => {
      if (section && highlights.length < 3) {
        highlights.push({
          eyebrow: section.title || 'Achievement',
          title: section.subtitle || '',
          description: section.description || '',
          impact: section.impact || '',
        });
      }
    });
  }

  // Fallback highlights
  if (highlights.length === 0) {
    highlights.push(
      {
        eyebrow: 'Security-first systems',
        title: 'Backend APIs designed with real permission boundaries.',
        description: 'Engineered secure Node.js and Express services with scope-based access control.',
        impact: 'Built for enterprise trust, granular control, and operational clarity.',
      },
      {
        eyebrow: 'Realtime product thinking',
        title: 'Interfaces that stay readable while data keeps moving.',
        description: 'Built React and Redux Toolkit experiences for data visualization.',
        impact: 'Focused on clarity, responsiveness, and decision-ready information.',
      },
      {
        eyebrow: 'Automation ownership',
        title: 'Complex workflows simplified into repeatable systems.',
        description: 'Owned Python automation framework for enterprise configuration.',
        impact: 'Doubled deployment speed and reduced manual effort by half.',
      }
    );
  }

  return highlights;
}

/**
 * Extract highlights from Dell Technologies section
 */
function extractDellHighlights(dellText) {
  // Look for main achievement categories
  const categories = [
    {
      pattern: /scope.*?control/i,
      lines: dellText.match(/[^\n]*scope.*?control[^\n]*/gi) || []
    },
    {
      pattern: /17g.*?backend/i,
      lines: dellText.match(/[^\n]*17g.*?backend[^\n]*/gi) || []
    },
    {
      pattern: /real.*?time|kafka/i,
      lines: dellText.match(/[^\n]*real.*?time[^\n]*/gi) || []
    },
    {
      pattern: /automation|python/i,
      lines: dellText.match(/[^\n]*automation[^\n]*/gi) || []
    }
  ];

  return categories
    .map(cat => ({
      title: cat.lines[0]?.substring(0, 60) || '',
      subtitle: cat.lines[1]?.substring(0, 50) || '',
      description: cat.lines.join(' ').substring(0, 150),
      impact: ''
    }))
    .filter(h => h.title.length > 0);
}

/**
 * Extract work experience
 * Looks for: Company, Role, Period, Location, Achievements
 */
function extractExperience(text) {
  const experiences = [];

  // Split into experience blocks
  const experienceSection = text.match(/EXPERIENCE[\s\S]*?(?=\n\n*PROJECTS|$)/i);
  
  if (experienceSection) {
    // Match company/role patterns
    const companyPattern = /([A-Z][A-Za-z\s&]+?)\s*(?:\(([^)]+)\))?\s*\n(.*?)(?=\n[A-Z][A-Za-z\s&]+?\s*(?:\(|$)|$)/gim;
    
    let match;
    while ((match = companyPattern.exec(experienceSection[0])) !== null) {
      const company = match[1]?.trim() || '';
      const roleAndDate = match[2] || match[3]?.split('\n')[0] || '';
      const content = match[3] || match[0];
      
      if (company && company.length > 2) {
        const role = extractRole(roleAndDate || content);
        const period = extractPeriod(content);
        const achievements = extractAchievements(content);
        const stack = extractStackFromText(content);

        experiences.push({
          company: company.trim(),
          role: role,
          period: period,
          location: extractLocation(content),
          summary: achievements[0] || '',
          achievements: achievements.slice(0, 4),
          stack: stack,
        });
      }
    }
  }

  // Fallback to hardcoded if parsing fails
  if (experiences.length === 0) {
    experiences.push({
      company: 'Dell Technologies',
      role: 'System Development Engineer 2',
      period: 'Aug 2023 - Present',
      location: 'Bengaluru, Karnataka',
      summary: 'Building secure backend services and realtime systems.',
      achievements: [
        'Designed high-security backend API with scope-based access control.',
        'Developed frontend service for Kafka Connectivity visualization.',
        'Owned Python automation framework for enterprise deployment.'
      ],
      stack: ['Node.js', 'Express', 'MongoDB', 'React', 'Redux', 'Python'],
    });
  }

  return experiences;
}

/**
 * Extract projects from PROJECTS section
 */
function extractProjects(text) {
  const projects = [];
  
  const projectsSection = text.match(/PROJECTS[\s\S]*?(?=\n\n*TECHNICAL SKILLS|$)/i);
  
  if (projectsSection) {
    // Match project name - Tech stack pattern
    const projectPattern = /^([A-Za-z\s&-]+?)\s*[-–]\s*([^(]+?)(?:\s*\(([^)]*)\))?\s*\n/gm;
    
    const lines = projectsSection[0].split('\n').filter(l => l.trim());
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Check if line contains project name - description pattern
      if (line.match(/^[A-Z][a-zA-Z\s&-]+\s*[-–]/)) {
        const parts = line.split(/\s*[-–]\s*/);
        const name = parts[0]?.trim();
        const description = parts[1]?.trim() || '';
        
        // Get next lines for tech stack or achievements
        const stack = extractStackFromLine(lines[i + 1] || '');
        
        if (name && name.length > 2 && name.length < 40) {
          projects.push({
            name: name,
            category: extractCategory(description) || 'Project',
            tagline: description.substring(0, 80),
            description: description,
            outcomes: extractAchievements(lines.slice(i, i + 5).join('\n')),
            stack: stack,
            href: '',
            glow: 'rgba(140, 184, 255, 0.22)',
            border: 'rgba(140, 184, 255, 0.2)',
          });
        }
      }
    }
  }

  if (projects.length === 0) {
    // Fallback projects
    projects.push(
      {
        name: 'Shoppe',
        category: 'Ecommerce Platform',
        tagline: 'End-to-end shopping solution with secure payments.',
        description: 'Full-stack ecommerce platform with JWT auth, admin dashboard, and Stripe integration.',
        outcomes: ['Implemented JWT authentication', 'Integrated Stripe for payments', 'Built admin dashboard'],
        stack: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe'],
        href: '',
        glow: 'rgba(255, 122, 89, 0.28)',
        border: 'rgba(255, 122, 89, 0.22)',
      },
      {
        name: 'Chatly',
        category: 'Real-time Chat',
        tagline: 'Live messaging with presence and notifications.',
        description: 'Real-time chat application with Socket.IO and Cloudinary.',
        outcomes: ['Built live messaging', 'Real-time user tracking', 'Image sharing'],
        stack: ['React', 'Node.js', 'Socket.IO', 'Cloudinary'],
        href: '',
        glow: 'rgba(33, 189, 163, 0.24)',
        border: 'rgba(33, 189, 163, 0.18)',
      }
    );
  }

  return projects;
}

/**
 * Extract skill buckets/categories from TECHNICAL SKILLS section
 */
function extractSkillBuckets(text) {
  const buckets = [];
  
  const skillsSection = text.match(/TECHNICAL\s+SKILLS[\s\S]*?(?=\nEDUCATION|$)/i);
  
  if (skillsSection) {
    const content = skillsSection[0];
    const lines = content.split('\n').filter(l => l.trim());
    
    // Look for category patterns like "Programming Languages / Skills-" 
    const categories = [
      { name: 'Frontend', patterns: ['React', 'JavaScript', 'CSS', 'HTML'] },
      { name: 'Backend', patterns: ['Node.js', 'Express', 'MongoDB', 'Python'] },
      { name: 'DevOps & Tools', patterns: ['Docker', 'GitHub', 'JIRA', 'Cloud'] },
      { name: 'Core Skills', patterns: ['OOPS', 'SDLC', 'System Design', 'Data Structures'] },
    ];

    categories.forEach(cat => {
      const items = [];
      lines.forEach(line => {
        if (line.length > 3 && !line.includes(':')) {
          const skills = line.split(/[,–\n]/).map(s => s.trim()).filter(s => s.length > 0 && s.length < 40);
          items.push(...skills);
        }
      });

      if (items.length > 0) {
        buckets.push({
          title: cat.name,
          items: items.slice(0, 8),
        });
      }
    });
  }

  // Fallback skill buckets
  if (buckets.length === 0) {
    buckets.push(
      {
        title: 'Frontend Development',
        items: ['React', 'Redux', 'JavaScript (ES6+)', 'HTML5', 'CSS', 'Tailwind CSS'],
      },
      {
        title: 'Backend Engineering',
        items: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'REST APIs', 'Authentication'],
      },
      {
        title: 'Realtime & Systems',
        items: ['Socket.IO', 'Kafka', 'System Design', 'Microservices', 'Cloud Platforms'],
      },
      {
        title: 'Core Engineering',
        items: ['Python', 'Data Structures', 'Algorithms', 'DBMS', 'SDLC', 'System Architecture'],
      }
    );
  }

  return buckets;
}

/**
 * Extract recruiter talking points from achievements
 */
function extractRecruiterChecklist(text) {
  const checklist = [];
  
  // Extract impactful achievements from experience
  const achievements = text.match(/•\s*([^\n]+)/g) || [];
  
  achievements.slice(0, 4).forEach(ach => {
    const clean = ach.replace(/^•\s*/, '').trim().substring(0, 100);
    if (clean && clean.length > 10) {
      checklist.push(clean);
    }
  });

  // Add education highlight
  if (text.match(/9\.5|CGPA/i)) {
    checklist.push('Strong academic foundation with excellent CGPA.');
  }

  // Fallback checklist
  if (checklist.length === 0) {
    checklist.push(
      'Enterprise experience with visible ownership across backend and frontend.',
      'Full-stack projects demonstrating system design and product thinking.',
      'Expertise in Node.js, React, and real-time systems.',
      'Strong foundation in computer science and system architecture.'
    );
  }

  return checklist.slice(0, 5);
}

/**
 * Extract education information
 */
function extractEducation(text) {
  const eduPattern = /([A-Z][A-Za-z\s&]+(?:College|University|Institute))[\s\S]*?(?:\n|$)/i;
  const match = text.match(eduPattern);
  
  const institution = match ? match[1].trim() : 'Dayananda Sagar College of Engineering';
  const degree = extractField(text, /(?:B\.E\.|B\.S\.|B\.A\.|M\.?E\.?|M\.?S\.?)\s+(?:in\s+)?([^–\n]+)/i, 0, 'Computer Science Engineering');
  const score = extractField(text, /(\d\.?\d+)\s*(?:CGPA?|GPA)/i, 0, '9.5 CGPA');
  const period = extractField(text, /(Aug|Jan|Feb|Mar|Apr|May|Jun|Jul|Sep|Oct|Nov|Dec)\s+\d{4}\s*(?:–|-)\s*(Aug|Jan|Feb|Mar|Apr|May|Jun|Jul|Sep|Oct|Nov|Dec|July|July)\s+\d{4}/i, 0, 'Aug 2019 – Jul 2023');
  
  return {
    institution: institution,
    degree: `B.E. in ${degree}`,
    score: score.includes('CGPA') ? score : `${score} CGPA`,
    period: period,
    location: 'Bengaluru, Karnataka',
  };
}

// ============= HELPER FUNCTIONS =============

function extractRole(text) {
  const rolePattern = /(?:Developer|Engineer|Consultant|Manager|Lead|Specialist|Architect)\s+\d+/i;
  const match = text.match(rolePattern);
  return match ? match[0] : 'Developer';
}

function extractPeriod(text) {
  const periodPattern = /(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s+\d{4}\s*(?:–|-|to)\s*(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec|Present)/i;
  const match = text.match(periodPattern);
  return match ? match[0] : 'Present';
}

function extractLocation(text) {
  const locationPattern = /([A-Z][a-z]+(?:\s+[A-Z][a-z]+)*,\s*[A-Z][a-z]+)/;
  const match = text.match(locationPattern);
  return match ? match[0] : 'Bengaluru, India';
}

function extractCategory(text) {
  const categories = ['Ecommerce', 'Chat', 'Voice', 'AI', 'Web Application', 'Platform', 'Tool'];
  for (const cat of categories) {
    if (text.toLowerCase().includes(cat.toLowerCase())) {
      return cat;
    }
  }
  return 'Project';
}

function extractAchievements(text) {
  const achievements = [];
  const bulletPattern = /•\s*([^\n]+)/g;
  let match;
  
  while ((match = bulletPattern.exec(text)) !== null) {
    const cleaned = match[1].trim().substring(0, 150);
    if (cleaned && cleaned.length > 10 && achievements.length < 10) {
      achievements.push(cleaned);
    }
  }
  
  return achievements;
}

function extractStackFromText(text) {
  const commonTechs = [
    'Node.js', 'Express', 'MongoDB', 'React', 'Redux', 'Redux Toolkit',
    'JavaScript', 'Python', 'Java', 'C++', 'SQL', 'PostgreSQL', 'MySQL',
    'Docker', 'Kubernetes', 'AWS', 'GCP', 'Azure', 'Stripe', 'Cloudinary',
    'Socket.IO', 'Kafka', 'GraphQL', 'REST', 'Tailwind CSS', 'HTML5', 'CSS3',
    'TypeScript', 'Git', 'Jenkins', 'CI/CD', 'Linux', 'JIRA', 'Postmark',
    'Multer', 'Mongoose', 'JWT', 'Web Speech API', 'Gemini'
  ];

  const found = [];
  commonTechs.forEach(tech => {
    const regex = new RegExp(`\\b${tech}\\b`, 'i');
    if (regex.test(text)) {
      found.push(tech);
    }
  });

  return found.slice(0, 8);
}

function extractStackFromLine(line) {
  return extractStackFromText(line);
}

function extractEmail(text) {
  const match = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  return match ? match[1] : '';
}

function extractPhone(text) {
  const match = text.match(/[\+]?[\d\s\-()]{10,}/);
  return match ? match[0].trim() : '';
}

function extractLinks(text) {
  const links = [];
  
  const linkedinMatch = text.match(/LinkedIn/i);
  if (linkedinMatch) {
    links.push({
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/shamsher-tiwari-a2314620b/',
    });
  }

  const githubMatch = text.match(/GitHub/i);
  if (githubMatch) {
    links.push({
      label: 'GitHub',
      href: 'https://github.com/Shamsher2000',
    });
  }

  const emailMatch = text.match(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/);
  if (emailMatch) {
    links.push({
      label: 'Email',
      href: `mailto:${emailMatch[1]}`,
    });
  }

  return links;
}

function extractField(text, pattern, groupIndex = 0, fallback = '') {
  const match = text.match(pattern);
  return match ? match[groupIndex]?.trim() || fallback : fallback;
}
