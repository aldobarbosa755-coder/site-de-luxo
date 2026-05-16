import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Share2, Mail, ArrowRight, ArrowLeft, Globe } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function BackButton() {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  if (location.pathname === "/") return null;

  const handleBack = () => {
    // If the window history length is 1, it might be the first page in this tab.
    // However, window.history.length includes all previous pages in the tab session.
    // A better approach for "Go Back" in an app is often to check if we can.
    // For simplicity, we just use navigate(-1) but ensure it's wrapped.
    navigate(-1);
  };

  return (
    <motion.button
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      onClick={handleBack}
      className="fixed left-4 md:left-4 lg:left-12 top-1/2 -translate-y-1/2 z-[100] flex flex-col items-center gap-4 md:gap-6 lg:gap-8 group touch-manipulation cursor-pointer p-4 md:p-0 bg-surface/10 backdrop-blur-[2px] rounded-full md:bg-transparent md:backdrop-blur-none"
    >
      <div className="h-6 md:h-8 lg:h-12 w-[1px] bg-primary/20 group-hover:bg-primary group-hover:h-12 lg:group-hover:h-20 transition-all duration-700"></div>
      <span className="font-sans text-[7px] md:text-[8px] lg:text-[9px] font-bold uppercase tracking-[0.6em] text-primary/40 group-hover:text-primary transition-colors duration-700 [writing-mode:vertical-lr] rotate-180">
        {t('nav.back')}
      </span>
      <ArrowLeft size={16} className="text-primary/40 group-hover:text-primary group-hover:-translate-y-2 transition-all duration-700" />
    </motion.button>
  );
}

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const isHome = location.pathname === "/";

  return (
    <>
      <BackButton />
      <nav 
        className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-700 ${
          isScrolled || !isHome ? "h-20 bg-surface/95 backdrop-blur-xl border-b border-outline-variant/10 shadow-sm" : "h-28 bg-transparent"
        } flex items-center`}
      >
        <div className="flex justify-between items-center w-full px-margin-edge max-w-[1600px] mx-auto h-full">
          <Link to="/" className="flex items-center gap-4 z-20">
            <span className={`font-serif text-3xl md:text-4xl lg:text-4xl tracking-tighter cursor-pointer transition-colors duration-500 ${isScrolled || !isHome ? "text-primary" : "text-white"}`}>L'ESSENCE</span>
          </Link>
          
          <div className="hidden lg:flex gap-16 items-center">
            {[
              { name: t('nav.home'), path: "/" },
              { name: t('nav.collections'), path: "/collections" },
              { name: t('nav.heritage'), path: "/heritage" }
            ].map((item, index) => (
              <Link 
                key={item.path}
                to={item.path}
                className={`font-sans text-[11px] font-bold uppercase tracking-[0.5em] transition-all relative group ${
                  isScrolled || !isHome ? "text-on-surface-variant hover:text-primary" : "text-white/80 hover:text-white"
                }`}
              >
                {item.name}
                <span className={`absolute -bottom-1 left-0 w-0 h-[1px] transition-all duration-300 group-hover:w-full ${isScrolled || !isHome ? "bg-primary" : "bg-white"}`}></span>
              </Link>
            ))}

            {/* Language Switcher Desktop */}
            <div className="flex items-center gap-4 ml-4">
              <button 
                onClick={() => setLanguage('PT')}
                className={`font-sans text-[10px] font-bold tracking-[0.2em] transition-all duration-500 ${
                  language === 'PT' 
                    ? (isScrolled || !isHome ? "text-primary" : "text-white")
                    : (isScrolled || !isHome ? "text-primary/20 hover:text-primary/60" : "text-white/20 hover:text-white/60")
                }`}
              >
                PT
              </button>
              <div className={`h-3 w-[1px] ${isScrolled || !isHome ? "bg-primary/10" : "bg-white/10"}`}></div>
              <button 
                onClick={() => setLanguage('EN')}
                className={`font-sans text-[10px] font-bold tracking-[0.2em] transition-all duration-500 ${
                  language === 'EN' 
                    ? (isScrolled || !isHome ? "text-primary" : "text-white")
                    : (isScrolled || !isHome ? "text-primary/20 hover:text-primary/60" : "text-white/20 hover:text-white/60")
                }`}
              >
                EN
              </button>
            </div>

            {/* Theme Toggle Desktop */}
            <button 
              onClick={toggleTheme}
              className={`ml-4 p-2 transition-all duration-500 rounded-full ${
                isScrolled || !isHome ? "text-primary hover:bg-primary/5" : "text-white hover:bg-white/10"
              }`}
              title={isDarkMode ? "Light Mode" : "Dark Mode"}
            >
              {isDarkMode ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
            </button>
          </div>

          <div className="flex items-center gap-8">
            <Link 
              to="/enquire"
              className={`hidden lg:block font-sans text-[11px] md:text-[12px] lg:text-[11px] font-bold uppercase tracking-[.4em] px-8 md:px-10 lg:px-10 py-3 md:py-4 lg:py-4 transition-all duration-1000 shadow-lg group relative overflow-hidden border ${
                isScrolled || !isHome 
                  ? "text-on-primary bg-primary border-primary hover:bg-on-surface-variant hover:border-on-surface-variant" 
                  : "text-black bg-white border-white hover:bg-surface-variant hover:border-surface-variant"
              }`}
            >
              <span className="relative z-10 group-hover:tracking-[.5em] transition-all duration-700">{t('nav.enquire')}</span>
              
              {/* Shine Effect */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-[25deg] -translate-x-[200%] group-hover:translate-x-[250%] transition-transform duration-[1200ms] ease-in-out pointer-events-none"></div>
              
              {/* Subtle Border Glow (Hover) */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/40 transition-all duration-1000 pointer-events-none"></div>
            </Link>
            <button 
              className={`lg:hidden p-2 transition-colors duration-500 ${isScrolled || !isHome ? "text-primary" : "text-white"}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={26} strokeWidth={1} /> : <Menu size={26} strokeWidth={1} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-md lg:hidden"
            />
            
            {/* Drawer */}
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300, mass: 0.8 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] md:w-[60%] z-50 bg-surface shadow-2xl flex flex-col lg:hidden overflow-hidden"
            >
              <div className="flex justify-between items-center px-12 h-24 border-b border-primary/5">
                <span className="font-serif text-xl tracking-tighter text-primary">L'ESSENCE</span>
                <button 
                  className="text-primary p-2 hover:rotate-90 transition-transform duration-500"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <X size={28} strokeWidth={1} />
                </button>
              </div>

              <div className="flex-1 flex flex-col items-center px-12 py-16 overflow-y-auto">
                <div className="flex flex-col items-center gap-4 w-full mt-8">
                  {[
                    { name: t('nav.home'), path: "/" },
                    { name: t('nav.collections'), path: "/collections" },
                    { name: t('nav.heritage'), path: "/heritage" }
                  ].map((item, i) => (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                      className="w-full text-center"
                    >
                      <Link 
                        to={item.path} 
                        onClick={() => setIsMobileMenuOpen(false)} 
                        className="font-serif text-4xl md:text-5xl text-primary hover:italic transition-all inline-block py-2 relative group"
                      >
                        {item.name}
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-700"></span>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 1 }}
                  className="mt-16 flex flex-col items-center gap-10 w-full"
                >
                  <div className="h-[1px] w-12 bg-primary/20"></div>

                  {/* Language Switcher Mobile */}
                  <div className="flex items-center gap-8">
                    <button 
                      onClick={() => { setLanguage('PT'); setIsMobileMenuOpen(false); }}
                      className={`font-sans text-xs font-bold tracking-[0.5em] transition-all duration-500 ${language === 'PT' ? "text-primary scale-110" : "text-primary/20 hover:text-primary/40"}`}
                    >
                      PT
                    </button>
                    <div className="h-4 w-[1px] bg-primary/10"></div>
                    <button 
                      onClick={() => { setLanguage('EN'); setIsMobileMenuOpen(false); }}
                      className={`font-sans text-xs font-bold tracking-[0.5em] transition-all duration-500 ${language === 'EN' ? "text-primary scale-110" : "text-primary/20 hover:text-primary/40"}`}
                    >
                      EN
                    </button>
                  </div>

                  {/* Theme Toggle Mobile */}
                  <button 
                    onClick={(e) => { toggleTheme(e as any); setIsMobileMenuOpen(false); }}
                    className="flex flex-col items-center gap-3 font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-primary group"
                  >
                    <div className="p-4 rounded-full border border-primary/10 group-hover:border-primary/30 transition-colors duration-500">
                      {isDarkMode ? <Sun size={18} strokeWidth={1} /> : <Moon size={18} strokeWidth={1} />}
                    </div>
                    <span>{isDarkMode ? "LIGHT MODE" : "DARK MODE"}</span>
                  </button>

                  <Link 
                    to="/enquire"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="mt-4 w-full max-w-[240px] font-sans text-[11px] font-bold uppercase tracking-widest-luxury text-on-primary bg-primary px-8 py-5 relative overflow-hidden group border border-primary hover:bg-on-surface-variant hover:border-on-surface-variant transition-all duration-1000 text-center shadow-xl"
                  >
                    <span className="relative z-10">{t('nav.enquire')}</span>
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[25deg] -translate-x-full group-hover:translate-x-full transition-transform duration-[1500ms] ease-out pointer-events-none"></div>
                  </Link>
                </motion.div>
              </div>

              <div className="px-12 py-12 border-t border-primary/5 text-center">
                <p className="font-sans text-[8px] uppercase tracking-[0.4em] text-primary/30">L'ESSENCE — PARIS • BERLIN • TOKYO</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="w-full bg-surface py-20 md:py-32 border-t border-outline-variant/20 relative z-10">
      <div className="editorial-grid">
        <div className="col-start-1 col-end-13 lg:col-start-1 lg:col-end-5 mb-32 lg:mb-0 flex flex-col items-center lg:items-start text-center lg:text-left">
          <span className="font-serif text-5xl md:text-6xl text-primary block mb-12 italic">L'ESSENCE</span>
          <p className="font-sans text-lg text-on-surface-variant max-w-sm opacity-60 mb-16 leading-relaxed">
            {t('footer.p')}
          </p>
          <div className="flex gap-10 justify-center lg:justify-start">
            <a href="#" className="text-primary/40 hover:text-primary transition-colors"><Share2 size={20} strokeWidth={1} /></a>
            <a href="#" className="text-primary/40 hover:text-primary transition-colors"><Mail size={20} strokeWidth={1} /></a>
          </div>
        </div>
        
        <div className="col-start-1 col-end-13 lg:col-start-6 lg:col-end-13 grid grid-cols-1 md:grid-cols-3 gap-24 md:gap-16 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start space-y-8">
            <h4 className="font-sans text-[10px] font-bold text-primary tracking-[0.5em] uppercase">{t('footer.nav')}</h4>
            {[
              { name: t('nav.home'), path: "/" },
              { name: t('nav.collections'), path: "/collections" },
              { name: t('nav.heritage'), path: "/heritage" }
            ].map(item => (
              <Link 
                key={item.path} 
                to={item.path} 
                className="block font-sans text-sm text-on-surface-variant hover:text-primary transition-all duration-500 hover:translate-x-1"
              >
                {item.name}
              </Link>
            ))}
          </div>
          <div className="flex flex-col items-center md:items-start space-y-8">
            <h4 className="font-sans text-[10px] font-bold text-primary tracking-[0.5em] uppercase">{t('footer.boutique')}</h4>
            {["Showrooms", "Shipping", "Contact"].map(item => (
              <a 
                key={item} 
                href="#" 
                className="block font-sans text-sm text-on-surface-variant hover:text-primary transition-all duration-500 hover:translate-x-1"
              >
                {item}
              </a>
            ))}
          </div>
          <div className="md:col-span-1 col-span-1 flex flex-col items-center md:items-start space-y-8 mt-12 md:mt-0">
            <h4 className="font-sans text-[10px] font-bold text-primary tracking-[0.5em] mb-4 uppercase">{t('footer.newsletter')}</h4>
            <p className="font-sans text-xs text-on-surface-variant mb-6 opacity-60 max-w-[200px] md:max-w-none">{t('footer.newsletter.p')}</p>
            <div className="flex border-b border-primary/10 pb-4 group/input transition-colors duration-700 focus-within:border-primary/40 w-full max-w-[300px] md:max-w-none">
              <input 
                type="email" 
                placeholder={t('footer.placeholder')} 
                className="bg-transparent border-none outline-none font-sans text-sm w-full placeholder:text-primary/10 placeholder:italic transition-all focus:placeholder:opacity-0" 
              />
              <button className="text-primary/40 hover:text-primary transition-all duration-700 flex items-center gap-2 group-hover/input:translate-x-2">
                <span className="font-sans text-[9px] font-bold tracking-[0.2em] uppercase">SEND</span>
                <ArrowRight size={14} strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="editorial-grid mt-32">
        <div className="col-start-1 col-end-13 border-t border-primary/5 pt-12 flex flex-col md:flex-row justify-between items-center opacity-40 font-sans text-[9px] tracking-[0.5em] uppercase">
          <p>© 2024 L'ESSENCE. {t('footer.rights')}</p>
          <p>{t('footer.tagline')}</p>
        </div>
      </div>
    </footer>
  );
}

