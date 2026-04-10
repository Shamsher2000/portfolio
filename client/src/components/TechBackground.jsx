import { memo } from 'react';
import { motion } from 'framer-motion';

// Reduced node count for better performance (from 14 to 8)
const nodes = [
  { x: 94, y: 182, size: 7, delay: 0.2 },
  { x: 424, y: 232, size: 8, delay: 1 },
  { x: 816, y: 276, size: 9, delay: 1.8 },
  { x: 468, y: 408, size: 8, delay: 1.3 },
  { x: 880, y: 648, size: 10, delay: 1.9 },
  { x: 1066, y: 376, size: 8, delay: 2.1 },
];

// Optimized SVG renderer
const TechSVG = memo(() => (
  <svg viewBox="0 0 1200 900" preserveAspectRatio="none" className="tech-svg">
    <defs>
      <linearGradient id="techLine" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#53f3c3" stopOpacity="0" />
        <stop offset="30%" stopColor="#2ad0ff" stopOpacity="0.55" />
        <stop offset="68%" stopColor="#5f78ff" stopOpacity="0.52" />
        <stop offset="100%" stopColor="#53f3c3" stopOpacity="0" />
      </linearGradient>
      <radialGradient id="techGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="#9eefff" stopOpacity="0.95" />
        <stop offset="55%" stopColor="#39cfff" stopOpacity="0.45" />
        <stop offset="100%" stopColor="#39cfff" stopOpacity="0" />
      </radialGradient>
      <pattern id="techGrid" width="52" height="52" patternUnits="userSpaceOnUse">
        <path
          d="M52 0H0V52"
          fill="none"
          stroke="#7fdcff"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
        <circle cx="3" cy="3" r="1.4" fill="#7fdcff" fillOpacity="0.2" />
      </pattern>
    </defs>

    <rect width="1200" height="900" fill="url(#techGrid)" opacity="0.85" />

    {/* Optimized paths - using fewer with CSS animations */}
    <path
      d="M36 198C162 120 300 124 426 232C533 324 668 352 810 276C920 216 1038 100 1164 136"
      fill="none"
      stroke="url(#techLine)"
      strokeWidth="2"
      strokeLinecap="round"
      className="tech-path tech-path--1"
    />
    <path
      d="M68 432C188 358 332 338 466 408C598 478 716 514 832 486C944 460 1060 372 1168 260"
      fill="none"
      stroke="url(#techLine)"
      strokeWidth="2"
      strokeLinecap="round"
      className="tech-path tech-path--2"
    />

    {/* Optimized nodes */}
    {nodes.map((node) => (
      <g key={`${node.x}-${node.y}`}>
        <circle cx={node.x} cy={node.y} r={node.size * 2.8} fill="url(#techGlow)" opacity="0.25" />
        <circle cx={node.x} cy={node.y} r={node.size} fill="#e5fbff" fillOpacity="0.92" />
        <circle
          cx={node.x}
          cy={node.y}
          r={node.size + 4}
          fill="none"
          stroke="#83ecff"
          strokeOpacity="0.35"
          strokeWidth="1"
        />
      </g>
    ))}
  </svg>
));

const TechBackground = memo(({ meshY, meshRotate, streamY }) => {
  return (
    <>
      <motion.div
        className="tech-background"
        style={{ 
          y: meshY, 
          rotate: meshRotate,
          willChange: 'transform',
        }}
        aria-hidden="true"
      >
        <TechSVG />
      </motion.div>

      <motion.div 
        className="data-stream data-stream--one" 
        style={{ y: streamY, willChange: 'transform' }} 
        aria-hidden="true" 
      />
      <motion.div 
        className="data-stream data-stream--two" 
        style={{ y: streamY, willChange: 'transform' }} 
        aria-hidden="true" 
      />
    </>
  );
});

TechBackground.displayName = 'TechBackground';

export default TechBackground;
