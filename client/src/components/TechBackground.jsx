import { motion } from 'framer-motion';

const links = [
  'M36 198C162 120 300 124 426 232C533 324 668 352 810 276C920 216 1038 100 1164 136',
  'M68 432C188 358 332 338 466 408C598 478 716 514 832 486C944 460 1060 372 1168 260',
  'M26 704C184 598 334 570 488 630C620 684 742 710 882 650C1018 590 1110 470 1184 348',
  'M164 66C272 168 376 210 500 204C614 196 736 140 850 164C974 190 1084 290 1186 468',
];

const nodes = [
  { x: 94, y: 182, size: 7, delay: 0.2 },
  { x: 264, y: 128, size: 6, delay: 0.6 },
  { x: 424, y: 232, size: 8, delay: 1 },
  { x: 610, y: 360, size: 6, delay: 1.4 },
  { x: 816, y: 276, size: 9, delay: 1.8 },
  { x: 1032, y: 108, size: 7, delay: 2.2 },
  { x: 222, y: 398, size: 6, delay: 0.9 },
  { x: 468, y: 408, size: 8, delay: 1.3 },
  { x: 834, y: 486, size: 7, delay: 1.7 },
  { x: 1066, y: 376, size: 8, delay: 2.1 },
  { x: 188, y: 596, size: 7, delay: 1.1 },
  { x: 492, y: 632, size: 8, delay: 1.5 },
  { x: 880, y: 648, size: 10, delay: 1.9 },
  { x: 1094, y: 494, size: 7, delay: 2.3 },
];

export default function TechBackground({ meshY, meshRotate, streamY }) {
  return (
    <>
      <motion.div
        className="tech-background"
        style={{ y: meshY, rotate: meshRotate }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 1200 900" preserveAspectRatio="none">
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

          {links.map((path, index) => (
            <motion.path
              key={path}
              d={path}
              fill="none"
              stroke="url(#techLine)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0.25, opacity: 0.1 }}
              animate={{ pathLength: [0.25, 1, 0.25], opacity: [0.1, 0.45, 0.1] }}
              transition={{
                duration: 12 + index * 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: 'easeInOut',
                delay: index * 0.7,
              }}
            />
          ))}

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
      </motion.div>

      <motion.div className="data-stream data-stream--one" style={{ y: streamY }} aria-hidden="true" />
      <motion.div className="data-stream data-stream--two" style={{ y: streamY }} aria-hidden="true" />
    </>
  );
}
