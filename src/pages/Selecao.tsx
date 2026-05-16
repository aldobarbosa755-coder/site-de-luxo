import { motion } from "motion/react";
import { useLanguage } from "../context/LanguageContext";
import ImageReveal from "../components/ImageReveal";
import TextReveal from "../components/TextReveal";
import SectionHeader from "../components/SectionHeader";
import { PAGE_TRANSITION } from "../constants/animations";

export default function Selecao() {
  const { t, language } = useLanguage();

  return (
    <motion.div 
      {...PAGE_TRANSITION}
      className="pt-40 pb-spacing-stack-lg bg-surface"
    >
      <div className="editorial-grid">
        <div className="col-start-1 col-end-13">
          <SectionHeader 
            label={t('process.02.title')}
            title={language === 'PT' ? 'Mão e Matéria' : 'Hand and Matter'}
            titleClassName="text-6xl md:text-8xl italic"
          />
          <TextReveal delay={0.4} className="w-20 h-[1px] bg-primary/20 mx-auto -mt-12 md:-mt-20 mb-32" />
        </div>

        <div className="col-start-1 col-end-13 md:col-start-2 md:col-end-7 mb-24 md:mb-0">
          <ImageReveal className="aspect-[3/4] bg-surface-container relative">
            <img 
              className="w-full h-full object-cover grayscale brightness-95" 
              src="https://images.unsplash.com/photo-1517646280104-a6fe7115124c?q=80&w=2670&auto=format&fit=crop" 
              alt="Raw Material" 
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
                <h3 className="font-serif text-3xl mb-6">{language === 'PT' ? 'A Verdade do Elemento' : 'The Truth of the Element'}</h3>
              </TextReveal>
              <TextReveal delay={0.2}>
                <p className="font-sans text-lg text-on-surface-variant opacity-60 leading-relaxed">
                  {t('process.02.content')}
                </p>
              </TextReveal>
            </div>
            <div>
              <TextReveal delay={0.4}>
                <h3 className="font-serif text-3xl mb-6">{language === 'PT' ? 'Rastreabilidade' : 'Traceability'}</h3>
              </TextReveal>
              <TextReveal delay={0.6}>
                <p className="font-sans text-lg text-on-surface-variant opacity-60 leading-relaxed">
                   {language === 'PT' 
                     ? 'Cada bloco de pedra e cada prancha de madeira possui um número de série único em nosso registro, permitindo-nos honrar sua origem e garantir uma extração responsável.'
                     : 'Each block of stone and each board of wood has a unique serial number in our records, allowing us to honor its origin and ensure responsible extraction.'}
                </p>
              </TextReveal>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
