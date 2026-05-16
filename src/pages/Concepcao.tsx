import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import ImageReveal from "../components/ImageReveal";
import TextReveal from "../components/TextReveal";
import SectionHeader from "../components/SectionHeader";
import { PAGE_TRANSITION } from "../constants/animations";

export default function Concepcao() {
  const { t, language } = useLanguage();

  return (
    <motion.div 
      {...PAGE_TRANSITION}
      className="pt-40 pb-spacing-stack-lg bg-surface"
    >
      <div className="editorial-grid">
        <div className="col-start-1 col-end-13">
          <SectionHeader 
            label={t('process.01.title')}
            title={language === 'PT' ? 'A Alma do Design' : 'The Soul of Design'}
            titleClassName="text-6xl md:text-8xl italic"
          />
          <TextReveal delay={0.4} className="w-20 h-[1px] bg-primary/20 mx-auto -mt-12 md:-mt-20 mb-32" />
        </div>

        <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-7 mb-24 md:mb-0">
          <ImageReveal className="aspect-[3/4] bg-surface-container relative">
            <img 
              className="w-full h-full object-cover grayscale brightness-95" 
              src="https://images.unsplash.com/photo-1434031215912-0691cbd7870a?q=80&w=2670&auto=format&fit=crop" 
              alt="Archival Sketch" 
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
                <h3 className="font-serif text-3xl mb-6">{language === 'PT' ? 'O Primeiro Traço' : 'The First Stroke'}</h3>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="font-sans text-lg text-on-surface-variant opacity-60 leading-relaxed">
                  {t('process.01.content')}
                </p>
              </TextReveal>
            </div>
            <div>
              <TextReveal delay={0.4}>
                <h3 className="font-serif text-3xl mb-6">{language === 'PT' ? 'Silêncio Visual' : 'Visual Silence'}</h3>
              </TextReveal>
              <TextReveal delay={0.6}>
                <p className="font-sans text-lg text-on-surface-variant opacity-60 leading-relaxed">
                   {language === 'PT' 
                     ? 'Nossas peças são concebidas como âncoras para a mente. Em um mundo ruidoso, buscamos a redução máxima para que a essência do objeto possa finalmente respirar.'
                     : 'Our pieces are conceived as anchors for the mind. In a noisy world, we seek maximal reduction so the essence of the object can finally breathe.'}
                </p>
              </TextReveal>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
