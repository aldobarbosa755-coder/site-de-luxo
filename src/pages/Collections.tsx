import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import ImageReveal from "../components/ImageReveal";
import TextReveal from "../components/TextReveal";

export default function Collections() {
  const { t } = useLanguage();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  const collections = [
    { 
      name: t('col.item1.name'), 
      desc: t('col.item1.desc'), 
      img: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=2670&auto=format&fit=crop" 
    },
    { 
      name: t('col.item2.name'), 
      desc: t('col.item2.desc'), 
      img: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=2667&auto=format&fit=crop" 
    },
    { 
      name: t('col.item3.name'), 
      desc: t('col.item3.desc'), 
      img: "https://images.unsplash.com/photo-1540674199941-b82c638d77e3?q=80&w=2574&auto=format&fit=crop" 
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-spacing-stack-lg bg-surface"
    >
      <div className="editorial-grid">
        <div className="col-start-1 col-end-13 mb-32 flex flex-col justify-between items-center text-center gap-12">
          <div>
            <TextReveal>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.7em] text-primary/40 mb-8 block">{t('nav.collections')}</span>
            </TextReveal>
            <TextReveal delay={0.2}>
              <h1 className="font-serif text-6xl md:text-9xl text-primary">{t('col.title')}</h1>
            </TextReveal>
          </div>
          <TextReveal delay={0.4}>
            <p className="font-sans text-lg text-on-surface-variant opacity-60 max-w-sm mx-auto md:mx-0">
              {t('col.p')}
            </p>
          </TextReveal>
        </div>

        <div className="col-start-1 col-end-13 space-y-40">
          {collections.map((col, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col md:flex-row items-center gap-24 ${idx % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div className="w-full md:w-1/2 aspect-[16/10] bg-surface-container group cursor-pointer">
                <ImageReveal className="w-full h-full">
                  <img src={col.img} className="w-full h-full object-cover transition-transform duration-[2000ms] ease-out group-hover:scale-105" alt={col.name} />
                </ImageReveal>
              </div>
              <div className="w-full md:w-1/2 flex flex-col items-center text-center gap-12">
                <TextReveal>
                   <span className="font-serif italic text-7xl text-primary/10">{`0${idx + 1}`}</span>
                </TextReveal>
                <TextReveal delay={0.2}>
                  <h2 className="font-serif text-5xl md:text-7xl text-primary">{col.name}</h2>
                </TextReveal>
                <TextReveal delay={0.4}>
                  <p className="font-sans text-xl text-on-surface-variant opacity-60 max-w-sm mx-auto">{col.desc}</p>
                </TextReveal>
                <TextReveal delay={0.6}>
                  <button className="flex items-center gap-6 font-sans text-[10px] font-bold uppercase tracking-widest-luxury text-primary border-b border-primary/20 pb-4 group">
                    {t('col.cta')} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-700" />
                  </button>
                </TextReveal>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
