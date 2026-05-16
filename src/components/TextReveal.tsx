import { motion } from "motion/react";
import { ReactNode } from "react";

interface TextRevealProps {
  children?: ReactNode;
  className?: string;
  delay?: number;
  width?: "auto" | "full";
}

export default function TextReveal({ children, className = "", delay = 0, width = "auto" }: TextRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 1.8, 
        ease: [0.16, 1, 0.3, 1],
        delay 
      }}
      className={`${width === "full" ? "w-full" : "w-fit"} ${className}`}
    >
      {children}
    </motion.div>
  );
}
