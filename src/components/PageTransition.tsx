import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useLocation, useNavigationType } from "react-router-dom";

const scrollPositions = new Map<string, number>();

interface PageTransitionProps {
  children: React.ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const location = useLocation();
  const navigationType = useNavigationType();
  
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      scrollPositions.set(location.key, window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      scrollPositions.set(location.key, window.scrollY);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.key]);

  useEffect(() => {
    if (navigationType === "PUSH") {
      window.scrollTo(0, 0);
    } else if (navigationType === "POP") {
      const savedPos = scrollPositions.get(location.key);
      if (typeof savedPos === "number") {
        const restore = () => window.scrollTo(0, savedPos);
        requestAnimationFrame(() => {
          restore();
          setTimeout(restore, 50);
          setTimeout(restore, 200);
        });
      }
    }
  }, [location.key, navigationType]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="min-h-screen flex flex-col"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
