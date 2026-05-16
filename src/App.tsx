/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence } from "motion/react";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { Navbar, Footer } from "./components/Layout";
import CustomCursor from "./components/CustomCursor";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Heritage from "./pages/Heritage";
import Collections from "./pages/Collections";
import Enquire from "./pages/Enquire";
import Concepcao from "./pages/Concepcao";
import Selecao from "./pages/Selecao";
import Execucao from "./pages/Execucao";

function Preloader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[10000] bg-surface flex flex-col items-center justify-center"
    >
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="flex flex-col items-center gap-8"
      >
        <span className="font-serif text-4xl md:text-6xl tracking-tighter text-primary">L'ESSENCE</span>
        <div className="w-40 h-[1px] bg-primary/10 relative overflow-hidden">
          <motion.div 
            initial={{ left: "-100%" }}
            animate={{ left: "100%" }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 bottom-0 w-20 bg-primary"
          />
        </div>
        <span className="font-sans text-[9px] font-medium tracking-[0.6em] text-primary/40 uppercase">Pursuing Perfection</span>
      </motion.div>
    </motion.div>
  );
}

const scrollPositions = new Map<string, number>();

function PageTransition({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigationType = useNavigationType();
  
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Use a ref to store the current key so we can save scroll on unmount/change
  const locationKeyRef = React.useRef(location.key);

  useEffect(() => {
    const handleScroll = () => {
      // Potentially throttle this if performance is an issue
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
        // We need to wait for the transition AND potential image loads
        // A series of attempts is often necessary in heavy SPAs
        const restore = () => window.scrollTo(0, savedPos);
        
        requestAnimationFrame(() => {
          restore();
          setTimeout(restore, 50);
          setTimeout(restore, 200);
          setTimeout(restore, 500);
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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <Router>
        <CustomCursor />
        <div className="min-h-screen bg-surface selection:bg-primary/5 selection:text-primary relative overflow-x-hidden">
        <AnimatePresence>
          {isLoading && <Preloader />}
        </AnimatePresence>

        {!isLoading && (
          <>
            <Navbar />
            <Routes>
              <Route path="/" element={<PageTransition><Home /><Footer /></PageTransition>} />
              <Route path="/heritage" element={<PageTransition><Heritage /><Footer /></PageTransition>} />
              <Route path="/collections" element={<PageTransition><Collections /><Footer /></PageTransition>} />
              <Route path="/enquire" element={<PageTransition><Enquire /><Footer /></PageTransition>} />
              <Route path="/concepcao" element={<PageTransition><Concepcao /><Footer /></PageTransition>} />
              <Route path="/selecao" element={<PageTransition><Selecao /><Footer /></PageTransition>} />
              <Route path="/execucao" element={<PageTransition><Execucao /><Footer /></PageTransition>} />
            </Routes>
          </>
        )}
      </div>
    </Router>
    </LanguageProvider>
    </ThemeProvider>
  );
}
