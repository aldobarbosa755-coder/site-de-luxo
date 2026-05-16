import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { 
  ChevronDown, 
  ArrowRight, 
  Minus
} from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { useTheme } from "../context/ThemeContext";
import ImageReveal from "../components/ImageReveal";
import TextReveal from "../components/TextReveal";

export default function Home() {
  const heroRef = useRef(null);
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { scrollYProgress: heroScrollProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const heroY = useTransform(heroScrollProgress, [0, 1], ["0%", "30%"]);
  const titleY = useTransform(heroScrollProgress, [0, 1], ["0%", "-40%"]);
  const heroOpacity = useTransform(heroScrollProgress, [0, 1], [1, 0.3]);
  const heroScale = useSpring(useTransform(heroScrollProgress, [0, 1], [1, 1.1]), { stiffness: 100, damping: 30 });

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
  };

  const lineGrow = {
    initial: { width: 0 },
    whileInView: { width: "100%" },
    viewport: { once: true },
    transition: { duration: 1.5, ease: "circOut" }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-primary z-[100] origin-left"
        style={{ scaleX }}
      />
      
      <main>
        {/* Hero Section */}
        <section ref={heroRef} className="relative h-screen w-full overflow-hidden flex items-center justify-center">
          <motion.div 
            style={{ y: heroY, scale: heroScale, opacity: heroOpacity }}
            className="absolute inset-0 z-0"
          >
            <ImageReveal className="absolute inset-0 z-0">
              <img 
                className="w-full h-full object-cover transition-all duration-1000" 
                src={isDarkMode 
                  ? "https://lh3.googleusercontent.com/aida-public/AB6AXuBJLYD14WRG06JCq-lk99OSumbElogl8J_jlGj2mvv9mq5AjYSQwMdmkI_BP17uBZyXH89CiDj1SFaU3H6ovJ8h8-mvcpPzUXQMGbESsGOOmCICOrzM9VpD1Tku5ChmGrvgqEyASUMM5HBbHUFLFXW_O8GEK2VFvETWY0g1bszrQzJKQxFofPFWS8GlMANyaWg30gaUQ4Bq28oa3ykIeUZmUKdSo4mn38gGlLKefi1j6IbdQhgNqXrnfo88R0_hG4PmyvI3PmCWDfsL"
                  : "https://lh3.googleusercontent.com/aida-public/AB6AXuA-XF2VeMQTMriC85avcpvdjhh3SQx5J0FdykeSDakMIjblW03FjEXZaw-YJ5A5SlvhRhl1Vt_an9KW488CoYXfZ0ohbPJoQ_zWkx87ZJ_EbZe9WGoyQ6SjXNLw-bCyw9cZ7NF_HI36CcDf7r3o_cQ6VkzI4kMMxA_VtoRaJp5DqQgUsKnX-1L8UG83O5qkV88Xb5nXqcoU_pCYJP9iwg5oOdVejsb1b2CYs1tJTw5dmlf7gEbVIddHfpj8HjlDO2VpQ2_Rce4Zr-x9"
                }
                alt="Architecture"
              />
            </ImageReveal>
            <div className={`absolute inset-0 transition-colors duration-1000 ${isDarkMode ? "bg-black/60" : "bg-black/20"}`}></div>
            {/* Subtle Texture Overlay */}
            <div className={`absolute inset-0 transition-opacity duration-1000 pointer-events-none mix-blend-overlay ${isDarkMode ? "opacity-[0.05]" : "opacity-[0.02]"}`} style={{ backgroundImage: `url("https://www.transparenttextures.com/patterns/natural-paper.png")` }}></div>
            <div className={`absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b ${isDarkMode ? "from-black/80" : "from-black/40"} via-transparent to-transparent opacity-80`}></div>
          </motion.div>

          <div className="relative z-10 text-center w-full max-w-[1800px] mx-auto px-margin-edge">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-12 flex flex-col items-center"
            >
              <Minus className="mb-6 md:mb-8 transition-colors duration-1000 text-white" />
              <span className="font-sans text-[11px] sm:text-[14px] md:text-[16px] lg:text-[11px] font-bold uppercase tracking-[0.6em] opacity-80 transition-colors duration-1000 text-white">
                {t('hero.subtitle')}
              </span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              style={{ y: titleY }}
              transition={{ delay: 0.4, duration: 2, ease: [0.16, 1, 0.3, 1] }}
              className="font-serif text-5xl sm:text-7xl md:text-8xl lg:text-[10vw] mb-12 md:mb-24 lg:mb-20 tracking-tighter leading-[0.95] md:leading-[0.9] text-reveal mx-auto max-w-[90vw] md:max-w-6xl transition-colors duration-1000 text-white"
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex justify-center mb-24 md:mb-0"
            >
              <Link to="/collections" className="font-sans text-[10px] sm:text-[12px] md:text-[13px] lg:text-[11px] font-bold uppercase tracking-widest-luxury flex items-center gap-6 group relative py-4 transition-colors duration-1000 text-white">
                <span className="relative z-10 transition-all duration-700 group-hover:tracking-[0.6em]">{t('hero.cta')}</span>
                <ArrowRight size={14} className="relative z-10 group-hover:translate-x-3 transition-transform duration-700" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] transition-transform duration-700 origin-right scale-x-100 group-hover:scale-x-0 bg-white/20"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] transition-transform duration-700 origin-left scale-x-0 group-hover:scale-x-100 bg-white"></div>
              </Link>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-8 md:bottom-16 w-full px-margin-edge flex flex-col md:flex-row justify-between items-center md:items-end gap-4 font-sans text-[8px] md:text-[9px] uppercase tracking-[0.4em] transition-colors duration-1000 text-white/50"
          >
            <span className="order-2 md:order-1">PARIS / BERLIN / TOKYO</span>
            <ChevronDown size={24} strokeWidth={1} className="order-1 md:order-2 animate-bounce transition-colors duration-1000 text-white" />
            <span className="order-3 hidden md:block">© 2024 L'ESSENCE</span>
          </motion.div>
        </section>

        {/* Philosophy Section */}
        <section className="py-stack-lg bg-surface relative overflow-hidden" id="philosophy">
          <div className="editorial-grid">
            <motion.div 
              {...fadeIn}
              className="col-start-1 col-end-13 flex flex-col items-center text-center"
            >
              <TextReveal delay={0.2} className="h-[1px] bg-primary/10 mb-20 w-40" />
              <TextReveal delay={0.4}>
                <span className="font-sans text-[11px] font-bold uppercase text-on-surface-variant mb-16 block tracking-[0.5em]">{t('philo.label')}</span>
              </TextReveal>
              <TextReveal delay={0.6}>
                <h2 className="font-serif text-5xl md:text-8xl mb-32 md:mb-40 text-primary leading-[1.05] max-w-[1100px] mx-auto">
                  {t('philo.title')}
                </h2>
              </TextReveal>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-24 text-center max-w-5xl mx-auto">
                <TextReveal delay={0.8}>
                  <p className="font-sans text-lg text-on-surface leading-relaxed opacity-60 tracking-wider text-center">
                    {t('philo.p1')}
                  </p>
                </TextReveal>
                <TextReveal delay={1}>
                  <p className="font-sans text-lg text-on-surface leading-relaxed opacity-60 tracking-wider text-center">
                    {t('philo.p2')}
                  </p>
                </TextReveal>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Atelier Section */}
        <section className="bg-surface py-24 md:py-32 lg:py-stack-lg border-t border-primary/5" id="atelier">
          <div className="editorial-grid items-center gap-y-24 md:gap-y-32">
            <motion.div 
              {...fadeIn}
              className="col-start-1 col-end-13 lg:col-start-1 lg:col-end-6 order-2 lg:order-1 flex justify-center lg:justify-start"
            >
              <ImageReveal className="aspect-[4/5] bg-surface-container relative shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-none">
                <img 
                  className="w-full h-full object-cover grayscale brightness-110 contrast-100" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuD1FdoNYi_d5g7fqI_lTfkuiuJ9YxqIHkZEN3xOagU9CBWD2dNQOuOZeHNGdqLYn0Q8O0XxOTdxJN0qnO47hADbxPwa05y048tHKSn45Upu2wYcnaP6ynr9keYUoEdbSOvNbJZP_u90cmCK-KIZrZ5aFwAS58sLy3VUO4tB7KlxMgLsmBI3Y_QzOlmIWvGiMCzzqcrXn8KaHHS10cjCop579mKqjx-j9Xini4DbuSjlNl1PZvkat9svhwhku6btqrvpG3SySiKnsOEE" 
                  alt="Craftsmanship" 
                />
                <div className="absolute top-6 left-6 md:top-10 md:left-10 p-3 md:p-4 bg-white/10 backdrop-blur-md border border-white/20">
                  <span className="font-serif italic text-white text-lg md:text-xl">01</span>
                </div>
              </ImageReveal>
            </motion.div>
            <div className="col-start-1 col-end-13 lg:col-start-7 lg:col-end-13 text-center flex flex-col items-center order-1 lg:order-2">
              <TextReveal>
                <span className="font-sans text-[11px] md:text-[13px] lg:text-[11px] font-bold uppercase text-on-surface-variant mb-12 block tracking-widest-luxury">{t('atelier.label')}</span>
              </TextReveal>
              <TextReveal delay={0.2}>
                <h2 className="font-serif text-5xl md:text-8xl lg:text-7xl mb-12 md:mb-16 text-primary leading-tight">{t('atelier.title')}</h2>
              </TextReveal>
              <TextReveal delay={0.4}>
                <p className="font-sans text-base md:text-lg text-on-surface-variant mb-16 md:mb-20 max-w-sm md:max-w-md lg:max-w-sm leading-relaxed opacity-60 tracking-wide mx-auto text-center">
                  {t('atelier.p')}
                </p>
              </TextReveal>
              <div className="space-y-12 md:space-y-16 w-full flex flex-col items-center">
                {[
                  { title: t('atelier.feature1.title'), desc: t('atelier.feature1.desc') },
                  { title: t('atelier.feature2.title'), desc: t('atelier.feature2.desc') }
                ].map((item, idx) => (
                  <div key={item.title}>
                    <TextReveal delay={0.6 + idx * 0.2} className="group cursor-pointer">
                      <span className="font-sans text-[10px] md:text-[13px] lg:text-[10px] font-bold uppercase tracking-[0.5em] text-primary block mb-2 group-hover:translate-x-2 transition-transform">{item.title}</span>
                      <p className="font-sans text-base md:text-lg lg:text-base text-on-surface-variant opacity-70 italic mb-4">{item.desc}</p>
                      <div className="h-[1px] w-40 md:w-64 lg:w-40 bg-primary/10 relative overflow-hidden mx-auto">
                        <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-[0.16,1,0.3,1]"></div>
                      </div>
                    </TextReveal>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Process Section - REFINED */}
        <section className="pt-24 md:pt-32 lg:pt-stack-lg pb-24 md:pb-32 lg:pb-stack-lg bg-surface border-b border-primary/5">
          <div className="editorial-grid">
            <motion.div {...fadeIn} className="col-start-1 col-end-13 lg:col-start-2 lg:col-end-12 grid grid-cols-1 lg:grid-cols-3 gap-32 lg:gap-32">
              {[
                { step: "01", title: t('process.01.title'), desc: t('process.01.desc'), path: "/concepcao" },
                { step: "02", title: t('process.02.title'), desc: t('process.02.desc'), path: "/selecao" },
                { step: "03", title: t('process.03.title'), desc: t('process.03.desc'), path: "/execucao" }
              ].map((item, idx) => (
                <div key={idx} className="flex flex-col items-center gap-12 relative p-12 md:p-24 lg:p-12 group/card transition-all duration-1000 text-center">
                  <span className="font-serif italic text-9xl md:text-[12rem] lg:text-9xl text-primary/[0.03] absolute -top-20 md:-top-32 lg:-top-20 right-4 md:right-1/4 lg:-right-4 transition-all duration-1000 group-hover/card:text-primary/5 group-hover/card:-translate-y-4 select-none pointer-events-none">
                    {item.step}
                  </span>
                  
                  <div className="space-y-8 relative z-10">
                    <h3 className="font-serif text-5xl md:text-7xl lg:text-5xl text-primary leading-tight group-hover/card:italic transition-all duration-700">
                      {item.title}
                    </h3>
                    <p className="font-sans text-base md:text-lg lg:text-base text-on-surface-variant leading-relaxed opacity-50 group-hover/card:opacity-80 transition-opacity duration-700 max-w-[280px] md:max-w-md lg:max-w-[280px] mx-auto text-center">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Ethos Section - NEW minimalist section */}
        <section className="py-24 md:py-32 lg:py-stack-lg bg-surface">
          <div className="editorial-grid gap-y-32 md:gap-y-0">
            <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-6 lg:col-start-1 lg:col-end-5 group text-center flex flex-col items-center">
              <TextReveal>
                <span className="font-sans text-[10px] md:text-[13px] lg:text-[10px] font-bold text-primary/30 group-hover:text-primary transition-colors duration-700 tracking-[0.6em] mb-12 md:mb-16 block">01</span>
              </TextReveal>
              <TextReveal delay={0.2}>
                <h3 className="font-serif text-4xl md:text-6xl lg:text-4xl mb-12 md:mb-16">{t('ethos.01.title')}</h3>
              </TextReveal>
              <TextReveal delay={0.4}>
                <p className="font-sans text-lg md:text-xl lg:text-lg text-on-surface-variant opacity-60 leading-relaxed tracking-wide max-w-md mx-auto text-center">
                  {t('ethos.01.desc')}
                </p>
              </TextReveal>
            </div>
            
            <div className="col-start-1 col-end-13 md:col-start-7 md:col-end-12 lg:col-start-7 lg:col-end-11 md:mt-32 lg:mt-60 group text-center flex flex-col items-center">
              <TextReveal>
                <span className="font-sans text-[10px] md:text-[13px] lg:text-[10px] font-bold text-primary/30 group-hover:text-primary transition-colors duration-700 tracking-[0.6em] mb-12 md:mb-16 block">02</span>
              </TextReveal>
              <TextReveal delay={0.2}>
                <h3 className="font-serif text-4xl md:text-6xl lg:text-4xl mb-12 md:mb-16">{t('ethos.02.title')}</h3>
              </TextReveal>
              <TextReveal delay={0.4}>
                <p className="font-sans text-lg md:text-xl lg:text-lg text-on-surface-variant opacity-60 leading-relaxed tracking-wide max-w-md mx-auto text-center">
                  {t('ethos.02.desc')}
                </p>
              </TextReveal>
            </div>
          </div>
        </section>

        {/* Sensory Details Section - REDESIGNED for more space, less photos */}
        <section className="py-stack-lg bg-surface overflow-hidden border-t border-primary/5">
          <div className="editorial-grid pt-40 md:pt-32">
            <motion.div {...fadeIn} className="col-start-1 col-end-13 text-center">
              <span className="font-sans text-[11px] font-medium uppercase tracking-[0.7em] text-on-surface-variant mb-16 md:mb-12 block">{t('sensory.label')}</span>
              <h2 className="font-serif text-5xl md:text-7xl lg:text-9xl italic text-primary mb-32 md:mb-32">{t('sensory.title')}</h2>
              <div className="h-[1px] w-40 md:w-24 bg-primary/20 mx-auto"></div>
            </motion.div>
          </div>
        </section>

        {/* Collection Showcase */}
        <section className="py-24 md:py-32 lg:py-stack-lg bg-surface" id="collections">
          <div className="editorial-grid items-start gap-y-32 lg:gap-y-0">
              <div className="col-start-1 col-end-13 lg:col-start-1 lg:col-end-7 flex flex-col items-center text-center">
                <ImageReveal className="aspect-[4/5] relative w-full max-w-sm md:max-w-2xl lg:max-w-none">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgepxaDVvEd2f73GpI2LVbXjSQFKPH9ZxEdXwaIayzxk4D9Rn7fYkvOqa0surmPOEx69oRgryw1-D8-ncVT1xLlbdh6km-8kQ_i2IHN1IPRuTKYDXtEOkCVxWhiSDE1Ak19WbAAsAUADr8nQ_w8BaPfJ0ZkKVYfmRz5POH8sPZD-g2kjCcs2jNMUK0mOQxFBcgNPJNpALrbjdNErTDoJoSJMpj34Drgd3C6MPoN-zF8JB9dNyixABfD7hA9S5LE8cH1bcarzR4Ssq3" 
                  alt="La Forme" 
                />
                <div className="absolute inset-0 border-[12px] md:border-[24px] border-surface pointer-events-none"></div>
                <div className="absolute bottom-6 right-6 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 z-20">
                  <span className="font-sans text-[9px] md:text-[13px] lg:text-[11px] font-bold uppercase text-on-primary bg-primary px-6 md:px-12 lg:px-10 py-3 md:py-6 lg:py-5 tracking-widest-luxury block whitespace-nowrap">LA FORME N° 01</span>
                </div>
              </ImageReveal>
              <TextReveal className="mt-16 md:mt-24 lg:mt-32 max-w-xl mx-auto text-center px-6">
                <h3 className="font-serif text-4xl md:text-7xl lg:text-5xl mb-12 md:mb-16 lg:mb-12">Esculturas <span className="italic">Cotidianas</span></h3>
                <p className="font-sans text-base md:text-xl lg:text-lg text-on-surface-variant leading-relaxed opacity-60 tracking-wide">
                  Objetos que transcendem sua função utilitária para se tornarem âncoras de serenidade em espaços contemporâneos.
                </p>
              </TextReveal>
            </div>

            <div className="col-start-1 col-end-13 lg:col-start-8 lg:col-end-13 flex flex-col items-center text-center gap-40 md:gap-64 lg:gap-60 mt-20 md:mt-40 lg:mt-80">
              {[
                { 
                  title: "L'Horlogerie", 
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA8WvAxslTk8X4AdCdRAN52zFcKq8S2AlBkJfx9SniTuz66xIplkWGmdmDjP78FGiqMDiAdU9pQk8LclR3LFb6Zg1uAtPczAD9x5ZxGgrDGCihOscTcnkenMGbE6bb277XjHGVz2ng0RXRb2f6SLslXsr0AO82pWVuiWHb-4vCO7OBogrbITmkAqRLkNvvhB08jOG3LNznQ7yeCMCHDcaJmdmkirRLudhJS-cZjGR3Y8b29D_6p96KCUazzXRG55oKRVIHeb0oKgXZ7",
                  desc: "Cronometria despojada. Titânio acetinado e absoluto silêncio.",
                  aspect: "square"
                },
                { 
                  title: "L'Assise", 
                  img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPOEyoqyA_N3rH7TJ5gcjgfhn1CWwQE3lL6EqbsmSD2_-eHE8VHxhlHSh6cMK066fpAB8ts_vif00BmdZF8tyPPZI1fLueka1nFj5_HR78rMf2R5AYlfzZdtyGfachheBIMZwfb8WdNx8Fpr2k5e7FxGTU279Q9wGoOcU9EAuDhjdeTwHMeGe-DxOFoeMYVLvulxpiQpZVi80E1MrVHljn6jRoE2TdJ0oXg8qfGuGdn8NzI9hfgXtzfG7NyMysGgAAeFI_wDS_h0qg",
                  desc: "Conforto geométrico. Marceneiros do norte e carvalho puro.",
                  aspect: "3/4"
                }
              ].map((item) => (
                <div key={item.title} className="group cursor-pointer w-full max-w-sm md:max-w-xl lg:max-w-none">
                  <ImageReveal className={`aspect-${item.aspect} mb-12 md:mb-20 lg:mb-16`}>
                    <img className="w-full h-full object-cover" src={item.img} alt={item.title} />
                  </ImageReveal>
                  <TextReveal delay={0.4} className="text-center px-4">
                    <h3 className="font-serif text-3xl md:text-6xl lg:text-4xl text-primary mb-8 md:mb-12 lg:mb-8">{item.title}</h3>
                  </TextReveal>
                  <TextReveal delay={0.6} className="text-center px-6">
                    <p className="font-sans text-base md:text-xl lg:text-base text-on-surface-variant leading-relaxed opacity-60 mx-auto max-w-xs md:max-w-md lg:max-w-xs">
                      {item.desc}
                    </p>
                  </TextReveal>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Heritage Section */}
        <section className="py-24 md:py-32 lg:py-stack-lg bg-surface relative overflow-visible" id="heritage">
          <div className="editorial-grid gap-y-32">
            <div className="col-start-1 col-end-13 lg:col-start-1 lg:col-end-6 flex flex-col justify-center items-center lg:items-start text-center lg:text-left order-2 lg:order-1 mt-20 lg:mt-0">
              <TextReveal>
                <span className="font-sans text-[11px] font-bold uppercase text-on-surface-variant mb-12 block tracking-widest-luxury">{t('heritage.label')}</span>
              </TextReveal>
              <TextReveal delay={0.2}>
                <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl mb-12 md:mb-16 text-primary leading-tight">{t('heritage.title')}</h2>
              </TextReveal>
              <TextReveal delay={0.4}>
                <p className="font-sans text-base md:text-lg text-on-surface mb-8 leading-relaxed opacity-60 tracking-wider max-w-xl mx-auto lg:mx-0">
                  {t('heritage.p')}
                </p>
              </TextReveal>
            </div>
            
            <motion.div 
              {...fadeIn}
              className="col-start-1 col-end-13 lg:col-start-7 lg:col-end-13 order-1 lg:order-2 flex justify-center items-center"
            >
              <div className="relative w-full max-w-md md:max-w-lg lg:max-w-none">
                <ImageReveal className="aspect-[3/4] translate-x-8 translate-y-8 md:translate-x-12 md:translate-y-12 lg:translate-x-16 lg:translate-y-16 shadow-2xl z-10 relative">
                  <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8WvAxslTk8X4AdCdRAN52zFcKq8S2AlBkJfx9SniTuz66xIplkWGmdmDjP78FGiqMDiAdU9pQk8LclR3LFb6Zg1uAtPczAD9x5ZxGgrDGCihOscTcnkenMGbE6bb277XjHGVz2ng0RXRb2f6SLslXsr0AO82pWVuiWHb-4vCO7OBogrbITmkAqRLkNvvhB08jOG3LNznQ7yeCMCHDcaJmdmkirRLudhJS-cZjGR3Y8b29D_6p96KCUazzXRG55oKRVIHeb0oKgXZ7" className="w-full h-full object-cover grayscale" />
                </ImageReveal>
                <ImageReveal className="aspect-[3/4] absolute top-[-60px] md:top-[-80px] lg:top-[-100px] left-[-40px] md:left-[-60px] lg:left-[-80px] w-full z-0 opacity-30 grayscale blur-[2px]">
                   <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAPOEyoqyA_N3rH7TJ5gcjgfhn1CWwQE3lL6EqbsmSD2_-eHE8VHxhlHSh6cMK066fpAB8ts_vif00BmdZF8tyPPZI1fLueka1nFj5_HR78rMf2R5AYlfzZdtyGfachheBIMZwfb8WdNx8Fpr2k5e7FxGTU279Q9wGoOcU9EAuDhjdeTwHMeGe-DxOFoeMYVLvulxpiQpZVi80E1MrVHljn6jRoE2TdJ0oXg8qfGuGdn8NzI9hfgXtzfG7NyMysGgAAeFI_wDS_h0qg" className="w-full h-full object-cover" />
                </ImageReveal>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="pt-stack-lg pb-20 md:pb-stack-lg bg-surface">
          <div className="editorial-grid">
            <div className="col-start-1 col-end-13 text-center py-32 md:py-40 border-t border-primary/10">
              <TextReveal>
                <span className="font-sans text-[11px] font-bold uppercase text-on-surface-variant mb-16 md:mb-12 block tracking-widest-luxury">{t('cta.label')}</span>
              </TextReveal>
              <TextReveal delay={0.2}>
                <h1 className="font-serif text-6xl md:text-7xl lg:text-9xl text-primary mb-24 md:mb-20 tracking-tighter">{t('cta.title')}</h1>
              </TextReveal>
              <TextReveal delay={0.4} className="flex flex-col md:flex-row items-center justify-center gap-16" width="full">
                <Link to="/enquire" className="bg-primary text-on-primary font-sans text-[11px] font-bold uppercase px-14 py-5 hover:bg-on-surface-variant transition-all duration-1000 tracking-[0.5em] relative group overflow-hidden border border-primary hover:border-on-surface-variant">
                  <span className="relative z-10">{t('cta.button')}</span>
                  {/* Subtle sweep shine */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-[25deg] -translate-x-[200%] group-hover:translate-x-[250%] transition-transform duration-[1500ms] ease-in-out pointer-events-none"></div>
                  {/* Slow internal fill */}
                  <div className="absolute inset-0 bg-white/[0.03] translate-y-full group-hover:translate-y-0 transition-transform duration-[1200ms] ease-out"></div>
                </Link>
                <Link to="/collections" className="font-sans text-[11px] font-bold text-primary uppercase tracking-[0.5em] group flex items-center gap-6 py-4 relative">
                  <span className="group-hover:italic transition-all duration-500">{t('cta.catalog')}</span>
                  <div className="relative">
                    <Minus className="group-hover:rotate-90 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-primary/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  </div>
                  <div className="absolute bottom-0 right-0 w-0 h-[1px] bg-primary transition-all duration-1000 group-hover:w-full"></div>
                </Link>
              </TextReveal>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  );
}
