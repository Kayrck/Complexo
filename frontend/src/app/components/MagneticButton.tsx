import { useRef, useState, ReactNode, ElementType } from "react";
import { motion } from "motion/react";

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  as?: ElementType;
  /** Magnetic pull factor; kept low so it feels refined, not gimmicky. */
  strength?: number;
  [key: string]: unknown;
}

/**
 * A button/link that leans gently toward the cursor. The pull is deliberately
 * subtle — a premium tactile cue, never a distraction.
 */
export const MagneticButton = ({
  children,
  className = "",
  as,
  strength = 0.25,
  ...rest
}: MagneticButtonProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const Comp = (as ?? "button") as ElementType;

  const handleMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    setPos({
      x: (e.clientX - (r.left + r.width / 2)) * strength,
      y: (e.clientY - (r.top + r.height / 2)) * strength,
    });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 250, damping: 20, mass: 0.4 }}
      className="inline-block"
    >
      <Comp className={className} {...rest}>
        {children}
      </Comp>
    </motion.div>
  );
};
