/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, MotionConfig } from "motion/react";
import React, { useState, useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar, Footer } from "./components/Layout";
import CustomCursor from "./components/CustomCursor";
import PageTransition from "./components/PageTransition";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";

const Home = lazy(() => import("./pages/Home"));
const Heritage = lazy(() => import("./pages/Heritage"));
const Collections = lazy(() => import("./pages/Collections"));
const Enquire = lazy(() => import("./pages/Enquire"));
const Concepcao = lazy(() => import("./pages/Concepcao"));
const Selecao = lazy(() => import("./pages/Selecao"));
const Execucao = lazy(() => import("./pages/Execucao"));

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

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    
    const checkPerf = () => {
      if (document.documentElement.classList.contains('low-perf')) {
        setReducedMotion(true);
      }
    };

    checkPerf();
    window.addEventListener('lowPerformanceDetected', checkPerf);
    
    return () => {
      clearTimeout(timer);
      window.removeEventListener('lowPerformanceDetected', checkPerf);
    };
  }, []);

  return (
    <ThemeProvider>
      <LanguageProvider>
        <MotionConfig reducedMotion={reducedMotion ? "always" : "user"}>
          <Router>
            <CustomCursor />
            <div className="min-h-screen bg-surface selection:bg-primary/5 selection:text-primary relative overflow-x-hidden">
              <AnimatePresence>
                {isLoading && <Preloader />}
              </AnimatePresence>

              {!isLoading && (
                <>
                  <Navbar />
                  <Suspense fallback={null}>
                    <Routes>
                      <Route path="/" element={<PageTransition><Home /><Footer /></PageTransition>} />
                      <Route path="/heritage" element={<PageTransition><Heritage /><Footer /></PageTransition>} />
                      <Route path="/collections" element={<PageTransition><Collections /><Footer /></PageTransition>} />
                      <Route path="/enquire" element={<PageTransition><Enquire /><Footer /></PageTransition>} />
                      <Route path="/concepcao" element={<PageTransition><Concepcao /><Footer /></PageTransition>} />
                      <Route path="/selecao" element={<PageTransition><Selecao /><Footer /></PageTransition>} />
                      <Route path="/execucao" element={<PageTransition><Execucao /><Footer /></PageTransition>} />
                    </Routes>
                  </Suspense>
                </>
              )}
            </div>
          </Router>
        </MotionConfig>
      </LanguageProvider>
    </ThemeProvider>
  );
}
