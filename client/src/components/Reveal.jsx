import { memo } from 'react';
import { motion } from 'framer-motion';

const Reveal = memo(({
  children,
  className = '',
  delay = 0,
  amount = 0.3,
  y = 40,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ 
        once: true, 
        amount,
        margin: '0px 0px -100px 0px' // Detect elements later for smoother reveal
      }}
      transition={{
        duration: 0.8, // Slightly longer for smoother animation
        delay: delay + 0.1, // Base delay offset for staggering
        ease: [0.25, 0.46, 0.45, 0.94], // Improved easing curve
      }}
      style={{ willChange: 'opacity, transform' }}
    >
      {children}
    </motion.div>
  );
});

Reveal.displayName = 'Reveal';

export default Reveal;
