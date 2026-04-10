import { memo } from 'react';
import { motion } from 'framer-motion';

const Reveal = memo(({
  children,
  className = '',
  delay = 0,
  amount = 0.2,
  y = 36,
}) => {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount, margin: '0px 0px -50px 0px' }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
});

Reveal.displayName = 'Reveal';

export default Reveal;
