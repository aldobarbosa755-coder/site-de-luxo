import { motion } from "motion/react";
import { ReactNode } from "react";

interface ImageRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export default function ImageReveal({ children, className = "", delay = 0 }: ImageRevealProps) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <motion.div
        initial={{ scale: 1.1, opacity: 0, y: 20 }}
        whileInView={{ scale: 1, opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        transition={{ 
          duration: 1.8, 
          ease: [0.16, 1, 0.3, 1],
          delay 
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
