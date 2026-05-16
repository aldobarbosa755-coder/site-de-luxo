import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import ImageReveal from "../components/ImageReveal";
import TextReveal from "../components/TextReveal";
import SectionHeader from "../components/SectionHeader";
import { PAGE_TRANSITION, FADE_IN } from "../constants/animations";

export default function Heritage() {
  const { t, language } = useLanguage();

  return (
    <motion.div 
      {...PAGE_TRANSITION}
      className="pt-40 pb-spacing-stack-lg bg-surface"
    >
      <div className="editorial-grid">
        <div className="col-start-1 col-end-13">
          <SectionHeader 
            label={t('heritage.label')}
            title={t('heritage.title')}
            titleClassName="text-6xl md:text-8xl italic"
          />
          <TextReveal delay={0.4} className="w-20 h-[1px] bg-primary/20 mx-auto -mt-12 md:-mt-20 mb-32" />
        </div>

        <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-7 mb-24 md:mb-0">
          <ImageReveal className="aspect-[3/4] bg-surface-container relative">
            <img 
              className="w-full h-full object-cover grayscale brightness-95" 
              src="https://images.unsplash.com/photo-1540674199941-b82c638d77e3?q=80&w=2574&auto=format&fit=crop" 
              alt="Ancestry" 
              width={800}
              height={1067}
              loading="lazy"
              decoding="async"
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
