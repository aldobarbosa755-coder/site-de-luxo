import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import ImageReveal from "../components/ImageReveal";
import TextReveal from "../components/TextReveal";

export default function Heritage() {
  const { t, language } = useLanguage();
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-spacing-stack-lg bg-surface"
    >
      <div className="editorial-grid">
        <div className="col-start-2 col-end-12 md:col-start-3 md:col-end-11 text-center mb-32">
          <TextReveal>
            <span className="font-sans text-[11px] font-bold uppercase tracking-[0.7em] text-primary/40 mb-8 block">{t('heritage.label')}</span>
          </TextReveal>
          <TextReveal delay={0.2}>
            <h1 className="font-serif text-6xl md:text-8xl text-primary mb-12 italic leading-tight">{t('heritage.title')}</h1>
          </TextReveal>
          <TextReveal delay={0.4} className="w-20 h-[1px] bg-primary/20 mx-auto" />
        </div>

        <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-7 mb-24 md:mb-0">
          <ImageReveal className="aspect-[3/4] bg-surface-container relative">
            <img 
              className="w-full h-full object-cover grayscale brightness-95" 
              src="https://images.unsplash.com/photo-1540674199941-b82c638d77e3?q=80&w=2574&auto=format&fit=crop" 
              alt="Ancestry" 
            />
          </ImageReveal>
        </div>

        <div className="col-start-1 col-end-13 md:col-start-8 md:col-end-12 flex flex-col justify-center items-center text-center pt-16 md:pt-0">
          <div className="space-y-12">
            <div>
              <TextReveal>
                <h3 className="font-serif text-3xl mb-6">{language === 'PT' ? '1996: A Origem' : '1996: The Origin'}</h3>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="font-sans text-lg text-on-surface-variant opacity-60 leading-relaxed">
                  {t('heritage.p')}
                </p>
              </TextReveal>
            </div>
            <div>
              <TextReveal delay={0.4}>
                <h3 className="font-serif text-3xl mb-6">{language === 'PT' ? 'A Evolução' : 'The Evolution'}</h3>
              </TextReveal>
              <TextReveal delay={0.6}>
                <p className="font-sans text-lg text-on-surface-variant opacity-60 leading-relaxed">
                   {language === 'PT' 
                     ? 'Ao longo das décadas, expandimos nossa expertise para metalurgia fina e têxteis naturais, mantendo sempre o compromisso inabalável com a verdade do material.'
                     : 'Over the decades, we have expanded our expertise into fine metallurgy and natural textiles, always maintaining an unwavering commitment to the truth of the material.'}
                </p>
              </TextReveal>
            </div>
          </div>
        </div>

        <div className="col-start-1 col-end-13 mt-40">
           <div className="grid grid-cols-1 md:grid-cols-3 gap-16 text-center">
              {[
                { year: "2004", event: t('heritage.event1') },
                { year: "2012", event: t('heritage.event2') },
                { year: "2024", event: t('heritage.event3') }
              ].map((item, idx) => (
                <div key={item.year}>
                  <TextReveal delay={idx * 0.2} className="border-t border-primary/10 pt-8 group" width="full">
                    <span className="font-serif italic text-4xl text-primary/40 group-hover:text-primary transition-colors duration-700 block mb-4">{item.year}</span>
                    <p className="font-sans text-sm text-on-surface-variant opacity-60">{item.event}</p>
                  </TextReveal>
                </div>
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
}
