import { useEffect, useState, useMemo, memo, useCallback } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import {
  ArrowRight,
  Cpu,
  Database,
  Download,
  ExternalLink,
  GitBranch,
  GraduationCap,
  Link2,
  Mail,
  MapPin,
  Menu,
  Monitor,
  Phone,
  Rocket,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from 'lucide-react';
import Reveal from './components/Reveal.jsx';
import SectionHeading from './components/SectionHeading.jsx';
import TechBackground from './components/TechBackground.jsx';
import { useResumeDownload } from './hooks/useResume.js';

// Memoized external link pill component
const ExternalLinkPillMemo = memo(({ link, compact = false }) => {
  const Icon = {
    GitHub: GitBranch,
    LinkedIn: Link2,
    Email: Mail,
  }[link.label] || ExternalLink;

  return (
    <motion.a
      whileHover={{ y: -3, scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
      className={`link-pill ${compact ? 'compact' : ''}`}
      href={link.href}
      target={link.href.startsWith('http') ? '_blank' : undefined}
      rel={link.href.startsWith('http') ? 'noreferrer' : undefined}
    >
      <Icon size={16} />
      <span>{link.label}</span>
    </motion.a>
  );
});

ExternalLinkPillMemo.displayName = 'ExternalLinkPillMemo';

const navItems = [
  { label: 'Impact', href: '#impact' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

const highlightIcons = [ShieldCheck, Monitor, Workflow];
const checklistIcons = [Rocket, ShieldCheck, Cpu, GraduationCap];

// Memoized navbar component
const TopBar = memo(({ profile, isMenuOpen, onMenuOpen, onDownload, isDownloading }) => (
  <header className="topbar">
    <a href="#hero" className="brand-mark">
      <span>ST</span>
      <div>
        <strong>{profile.personal.name}</strong>
        <small>{profile.personal.shortTitle}</small>
      </div>
    </a>

    <nav className="desktop-nav">
      {navItems.map((item) => (
        <a key={item.href} href={item.href}>
          {item.label}
        </a>
      ))}
    </nav>

    <div className="topbar-actions">
      <button 
        className="ghost-button desktop-only" 
        onClick={onDownload}
        disabled={isDownloading}
        title="Download your resume PDF"
      >
        <Download size={16} />
        <span>{isDownloading ? 'Downloading...' : 'Resume'}</span>
      </button>
      <button
        type="button"
        className="menu-button"
        aria-label="Open menu"
        onClick={onMenuOpen}
      >
        <Menu size={20} />
      </button>
    </div>
  </header>
));

TopBar.displayName = 'TopBar';

// Memoized mobile menu component
const MobileMenu = memo(({ isOpen, onClose, profile, onDownload, isDownloading }) => (
  <AnimatePresence>
    {isOpen ? (
      <motion.div
        className="mobile-menu"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="mobile-menu-panel"
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mobile-menu-header">
            <strong>Navigate</strong>
            <button
              type="button"
              className="menu-button"
              aria-label="Close menu"
              onClick={onClose}
            >
              <X size={20} />
            </button>
          </div>

          <div className="mobile-links">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} onClick={onClose}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="mobile-cta-stack">
            <a className="primary-button" href="#contact" onClick={onClose}>
              Let&apos;s Connect
            </a>
            <button 
              className="ghost-button" 
              onClick={onDownload}
              disabled={isDownloading}
              title="Download your resume PDF"
            >
              <Download size={16} />
              <span>{isDownloading ? 'Downloading...' : 'Download Resume'}</span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    ) : null}
  </AnimatePresence>
));

MobileMenu.displayName = 'MobileMenu';

export default function App() {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const { downloadResume, isDownloading } = useResumeDownload();
  
  // All useTransform calls must be at the top level, not inside useMemo
  const heroY = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.96]);
  const meshY = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const meshRotate = useTransform(scrollYProgress, [0, 1], [0, 7]);
  const streamY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const orbitY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const orbitScale = useTransform(scrollYProgress, [0, 0.45, 1], [1, 1.06, 1.14]);
  const impactY = useTransform(scrollYProgress, [0.08, 0.26], [60, 0]);
  const projectsY = useTransform(scrollYProgress, [0.24, 0.52], [72, 0]);
  const skillsY = useTransform(scrollYProgress, [0.46, 0.74], [72, 0]);
  const contactY = useTransform(scrollYProgress, [0.68, 0.94], [60, 0]);

  // Memoize scroll transforms object for passing to child components
  const scrollTransforms = useMemo(() => ({
    heroY,
    heroScale,
    meshY,
    meshRotate,
    streamY,
    orbitY,
    orbitScale,
    impactY,
    projectsY,
    skillsY,
    contactY,
  }), [heroY, heroScale, meshY, meshRotate, streamY, orbitY, orbitScale, impactY, projectsY, skillsY, contactY]);

  // Memoize callbacks to prevent re-renders
  const handleMenuOpen = useCallback(() => setIsMenuOpen(true), []);
  const handleMenuClose = useCallback(() => setIsMenuOpen(false), []);

  useEffect(() => {
    const controller = new AbortController();

    async function loadProfile() {
      try {
        // Use environment variable for API URL, otherwise fallback to same host on port 5000
        const defaultBackendUrl = `${window.location.protocol}//${window.location.hostname}:5000`;
        const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.VITE_BACKEND_URL || defaultBackendUrl;
        
        const response = await fetch(`${API_BASE}/api/profile`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error('Unable to load profile data.');
        }

        const data = await response.json();
        setProfile(data);
      } catch (loadError) {
        if (loadError.name !== 'AbortError') {
          setError(loadError.message);
        }
      }
    }

    loadProfile();

    return () => controller.abort();
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  if (error) {
    return (
      <div className="status-screen">
        <div className="status-card">
          <Sparkles size={28} />
          <h1>Something interrupted the launch.</h1>
          <p>{error}</p>
          <button type="button" className="primary-button" onClick={() => window.location.reload()}>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="status-screen">
        <div className="status-card loading-card">
          <div className="loader-ring" />
          <p>Composing an animated recruiter-ready experience...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <TechBackground meshY={scrollTransforms.meshY} meshRotate={scrollTransforms.meshRotate} streamY={scrollTransforms.streamY} />
      <div className="ambient ambient-left" />
      <div className="ambient ambient-right" />
      <div className="grid-sheen" />
      <div className="story-rail" aria-hidden="true">
        <span>scroll signal</span>
        <div className="story-rail__track">
          <motion.div className="story-rail__progress" style={{ scaleY: scrollYProgress }} />
        </div>
      </div>

      <TopBar 
        profile={profile} 
        isMenuOpen={isMenuOpen} 
        onMenuOpen={handleMenuOpen}
        onDownload={downloadResume}
        isDownloading={isDownloading}
      />
      <MobileMenu 
        isOpen={isMenuOpen} 
        onClose={handleMenuClose} 
        profile={profile}
        onDownload={downloadResume}
        isDownloading={isDownloading}
      />

      <main>
        <HeroSection profile={profile} scrollTransforms={scrollTransforms} onMenuClose={handleMenuClose} />
        <MarqueeStrip profile={profile} />
        <ImpactSection profile={profile} scrollTransforms={scrollTransforms} />
        <ProjectsSection profile={profile} scrollTransforms={scrollTransforms} />
        <SkillsSection profile={profile} scrollTransforms={scrollTransforms} />
        <ContactSection profile={profile} scrollTransforms={scrollTransforms} />
      </main>

      <footer className="site-footer">
        <p>{profile.personal.name} | Designed to feel premium on desktop and mobile.</p>
      </footer>
    </div>
  );
}

// Memoized Hero Section
const HeroSection = memo(({ profile, scrollTransforms, onMenuClose }) => (
  <section className="hero section" id="hero">
    <motion.div className="hero-copy" style={{ y: scrollTransforms.heroY, scale: scrollTransforms.heroScale }}>
      <span className="eyebrow">
        Apple-inspired storytelling | Stripe-like polish | recruiter-first narrative
      </span>
      <h1>
        Building secure systems,
        <br />
        real-time experiences,
        <br />
        and products people remember.
      </h1>
      <p className="hero-summary">{profile.personal.subtitle}</p>

      <div className="hero-cta-row">
        <a className="primary-button" href="#projects">
          Explore Projects
          <ArrowRight size={18} />
        </a>
        <a className="ghost-button" href={profile.personal.resumeUrl} download>
          <Download size={16} />
          <span>Download Resume</span>
        </a>
      </div>

      <div className="hero-link-row">
        {profile.personal.links.map((link) => (
          <ExternalLinkPillMemo key={link.label} link={link} />
        ))}
      </div>
    </motion.div>

    <div className="hero-visual">
      <motion.div className="hero-orbit-shell" style={{ y: scrollTransforms.orbitY, scale: scrollTransforms.orbitScale }}>
        <div className="hero-orbit hero-orbit--outer" />
        <div className="hero-orbit hero-orbit--middle" />
        <div className="hero-orbit hero-orbit--inner" />
        <div className="hero-orbit__beam hero-orbit__beam--one" />
        <div className="hero-orbit__beam hero-orbit__beam--two" />
        <div className="hero-node hero-node--one" />
        <div className="hero-node hero-node--two" />
        <div className="hero-node hero-node--three" />
        <div className="hero-node hero-node--four" />
        <div className="hero-core">
          <strong>AI</strong>
          <span>Scroll-driven tech storytelling</span>
        </div>
        <div className="hero-code-pill hero-code-pill--one">Neural UI</div>
        <div className="hero-code-pill hero-code-pill--two">MERN Stack</div>
        <div className="hero-code-pill hero-code-pill--three">Automation</div>
      </motion.div>

      <motion.article
        className="glass-card recruiter-card"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="card-kicker">Recruiter Snapshot</span>
        <h2>{profile.personal.title}</h2>
        <p>{profile.personal.availability}</p>

        <div className="metric-grid">
          {profile.heroMetrics.map((metric) => (
            <div key={metric.label} className="metric-card">
              <strong>{metric.value}</strong>
              <span>{metric.label}</span>
              <small>{metric.detail}</small>
            </div>
          ))}
        </div>
      </motion.article>

      <motion.article
        className="glass-card terminal-card"
        initial={{ opacity: 0, y: 70 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="terminal-head">
          <span />
          <span />
          <span />
        </div>
        <div className="terminal-body">
          <p>$ engineer --profile shamsher</p>
          <p>&gt; secure Node.js APIs for enterprise platforms</p>
          <p>&gt; React interfaces for streaming telemetry</p>
          <p>&gt; automation that removes manual deployment drag</p>
          <p>&gt; product craft with recruiter-friendly storytelling</p>
        </div>
      </motion.article>

      <motion.article
        className="glass-card signal-card"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <span className="card-kicker">Signal Map</span>
        <ul>
          <li>
            <ShieldCheck size={16} />
            <span>Security-minded backend thinking</span>
          </li>
          <li>
            <Monitor size={16} />
            <span>High-volume UI and data visualization</span>
          </li>
          <li>
            <Workflow size={16} />
            <span>Automation-first ownership mindset</span>
          </li>
          <li>
            <Sparkles size={16} />
            <span>Premium presentation for recruiter impact</span>
          </li>
        </ul>
      </motion.article>
    </div>
  </section>
));

HeroSection.displayName = 'HeroSection';

// Memoized Marquee Strip
const MarqueeStrip = memo(({ profile }) => (
  <section className="marquee-strip">
    <div className="marquee-track">
      {[...profile.marquee, ...profile.marquee].map((item, index) => (
        <span key={`${item}-${index}`}>
          {item}
          <i />
        </span>
      ))}
    </div>
  </section>
));

MarqueeStrip.displayName = 'MarqueeStrip';

// Memoized Impact Section
const ImpactSection = memo(({ profile, scrollTransforms }) => (
  <motion.section className="section" id="impact" style={{ y: scrollTransforms.impactY }}>
    <Reveal>
      <SectionHeading
        eyebrow="Impact Highlights"
        title="A portfolio built around outcomes, not only tools."
        description="This experience is framed the way strong product teams present themselves: bold narrative, clear business value, and enough motion to keep recruiters curious without slowing them down."
      />
    </Reveal>

    <div className="highlights-grid">
      {profile.highlights.map((highlight, index) => {
        const Icon = highlightIcons[index % highlightIcons.length];

        return (
          <Reveal key={highlight.title} delay={index * 0.08}>
            <motion.article
              whileHover={{ y: -8, rotate: index % 2 === 0 ? -0.4 : 0.4 }}
              className="feature-card"
            >
              <div className="feature-icon">
                <Icon size={22} />
              </div>
              <span className="card-kicker">{highlight.eyebrow}</span>
              <h3>{highlight.title}</h3>
              <p>{highlight.description}</p>
              <small>{highlight.impact}</small>
            </motion.article>
          </Reveal>
        );
      })}
    </div>

    <div className="timeline-shell">
      {profile.experience.map((role, index) => (
        <Reveal key={`${role.company}-${role.role}`} delay={index * 0.08}>
          <motion.article className="timeline-card" whileHover={{ y: -6 }}>
            <div className="timeline-topline">
              <div>
                <span className="timeline-period">{role.period}</span>
                <h3>{role.role}</h3>
                <p className="timeline-company">{role.company}</p>
              </div>
              <div className="timeline-location">
                <MapPin size={16} />
                <span>{role.location}</span>
              </div>
            </div>

            <p className="timeline-summary">{role.summary}</p>

            <div className="bullet-list">
              {role.achievements.map((achievement) => (
                <div key={achievement} className="bullet-row">
                  <i />
                  <span>{achievement}</span>
                </div>
              ))}
            </div>

            <div className="chip-row">
              {role.stack.map((item) => (
                <span key={item} className="skill-chip">
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        </Reveal>
      ))}
    </div>
  </motion.section>
));

ImpactSection.displayName = 'ImpactSection';

// Memoized Projects Section
const ProjectsSection = memo(({ profile, scrollTransforms }) => (
  <motion.section className="section project-section" id="projects" style={{ y: scrollTransforms.projectsY }}>
    <Reveal>
      <SectionHeading
        eyebrow="Featured Builds"
        title="Hands-on MERN projects with modern product energy."
        description="Each project card is designed like a launch panel: clear thesis, visible technical depth, and enough animation to create momentum on scroll for both laptop and mobile screens."
      />
    </Reveal>

    <div className="project-grid">
      {profile.projects.map((project, index) => (
        <Reveal key={project.name} delay={index * 0.08}>
          <motion.article
            className="project-card"
            whileHover={{ y: -10, scale: 1.01 }}
            style={{
              '--project-glow': project.glow,
              '--project-border': project.border,
            }}
          >
            <div className="project-topline">
              <span className="card-kicker">{project.category}</span>
              <a href={project.href} target="_blank" rel="noreferrer" className="project-link">
                <span>View Code</span>
                <ExternalLink size={16} />
              </a>
            </div>

            <h3>{project.name}</h3>
            <p className="project-tagline">{project.tagline}</p>
            <p className="project-description">{project.description}</p>

            <div className="project-outcomes">
              {project.outcomes.map((outcome) => (
                <div key={outcome} className="bullet-row">
                  <i />
                  <span>{outcome}</span>
                </div>
              ))}
            </div>

            <div className="chip-row">
              {project.stack.map((item) => (
                <span key={item} className="skill-chip">
                  {item}
                </span>
              ))}
            </div>
          </motion.article>
        </Reveal>
      ))}
    </div>
  </motion.section>
));

ProjectsSection.displayName = 'ProjectsSection';

// Memoized Skills Section
const SkillsSection = memo(({ profile, scrollTransforms }) => {
  const icons = [Cpu, Database, Workflow, Sparkles];
  
  return (
    <motion.section className="section" id="skills" style={{ y: scrollTransforms.skillsY }}>
      <Reveal>
        <SectionHeading
          eyebrow="Capability Map"
          title="Balanced across product polish, backend depth, and systems thinking."
          description="The stack presentation is intentionally clean and highly scannable so a recruiter can understand range quickly, while engineers can still see the technical shape of the work."
        />
      </Reveal>

      <div className="skills-layout">
        <div className="skills-grid">
          {profile.skillBuckets.map((bucket, index) => {
            const Icon = icons[index % icons.length];

            return (
              <Reveal key={bucket.title} delay={index * 0.06}>
                <article className="skill-bucket">
                  <div className="bucket-title">
                    <Icon size={18} />
                    <h3>{bucket.title}</h3>
                  </div>
                  <div className="chip-row">
                    {bucket.items.map((item) => (
                      <span key={item} className="skill-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="checklist-panel" delay={0.12}>
          <span className="card-kicker">Why recruiters keep scrolling</span>
          <h3>Quick reasons this profile stands out</h3>
          <div className="checklist-stack">
            {profile.recruiterChecklist.map((item, index) => {
              const Icon = checklistIcons[index % checklistIcons.length];

              return (
                <div key={item} className="checklist-item">
                  <div className="checklist-icon">
                    <Icon size={18} />
                  </div>
                  <span>{item}</span>
                </div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </motion.section>
  );
});

SkillsSection.displayName = 'SkillsSection';

// Memoized Contact Section
const ContactSection = memo(({ profile, scrollTransforms }) => (
  <motion.section
    className="section contact-section"
    id="contact"
    style={{ y: scrollTransforms.contactY }}
  >
    <Reveal>
      <article className="contact-panel">
        <div className="contact-copy">
          <span className="eyebrow">Education & Contact</span>
          <h2>Let&apos;s build something thoughtful, fast, and reliable.</h2>
          <p>
            {profile.education.degree} from {profile.education.institution}, backed by a strong
            academic record and real-world delivery across enterprise software, real-time UIs,
            automation, and MERN applications.
          </p>

          <div className="education-card">
            <div>
              <GraduationCap size={18} />
              <span>{profile.education.degree}</span>
            </div>
            <strong>{profile.education.score}</strong>
            <small>
              {profile.education.institution} | {profile.education.period}
            </small>
          </div>
        </div>

        <div className="contact-actions">
          <a className="primary-button" href={`mailto:${profile.personal.email}`}>
            <Mail size={18} />
            <span>{profile.personal.email}</span>
          </a>
          <a className="ghost-button" href={`tel:${profile.personal.phone.replace(/\s+/g, '')}`}>
            <Phone size={16} />
            <span>{profile.personal.phone}</span>
          </a>
          <div className="contact-link-grid">
            {profile.personal.links.map((link) => (
              <ExternalLinkPillMemo key={`contact-${link.label}`} link={link} compact />
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  </motion.section>
));

ContactSection.displayName = 'ContactSection';
