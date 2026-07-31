import { ReactNode } from "react";
import { motion } from "motion/react";

interface RevealProps {
  children: ReactNode;
  /** Stagger delay in seconds. */
  delay?: number;
  /** Travel distance on the Y axis. */
  y?: number;
  className?: string;
}

/**
 * A restrained scroll-reveal: content fades and rises once as it enters the
 * viewport. Used consistently so the whole site shares one calm motion language.
 */
export const Reveal = ({ children, delay = 0, y = 24, className }: RevealProps) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-80px" }}
    transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);
