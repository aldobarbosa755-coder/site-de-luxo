import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";

export default function Enquire() {
  const { t, language } = useLanguage();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-spacing-stack-lg bg-surface min-h-screen"
    >
      <div className="editorial-grid">
        <motion.div {...fadeIn} className="col-start-1 col-end-13 md:col-start-4 md:col-end-10 text-center mb-24">
          <span className="font-sans text-[11px] font-bold uppercase tracking-[0.7em] text-primary/40 mb-8 block">{t('enquire.label')}</span>
          <h1 className="font-serif text-6xl md:text-8xl text-primary leading-tight">{t('enquire.title')}</h1>
          <p className="font-sans text-lg text-on-surface-variant opacity-60 mt-12 mb-20 max-w-lg mx-auto">
            {t('enquire.p')}
          </p>
        </motion.div>

        <motion.div {...fadeIn} className="col-start-1 col-end-13 md:col-start-4 md:col-end-10 bg-white shadow-2xl p-12 md:p-20 border border-primary/5">
          <form className="space-y-16" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
               <div className="flex flex-col gap-4 items-center">
                  <label className="font-sans text-[10px] font-bold uppercase tracking-widest-luxury text-primary/40 text-center">{t('enquire.form.name')}</label>
                  <input 
                    type="text" 
                    className="border-b border-primary/20 py-4 font-sans text-lg focus:border-primary outline-none transition-colors italic text-center w-full"
                    placeholder="Ex: Jean Prouvé"
                  />
               </div>
               <div className="flex flex-col gap-4 items-center">
                  <label className="font-sans text-[10px] font-bold uppercase tracking-widest-luxury text-primary/40 text-center">{t('enquire.form.email')}</label>
                  <input 
                    type="email" 
                    className="border-b border-primary/20 py-4 font-sans text-lg focus:border-primary outline-none transition-colors italic text-center w-full"
                    placeholder="jean@archive.com"
                  />
               </div>
            </div>
            
            <div className="flex flex-col gap-4 items-center">
               <label className="font-sans text-[10px] font-bold uppercase tracking-widest-luxury text-primary/40 text-center">{t('enquire.form.interest')}</label>
               <select className="border-b border-primary/20 py-4 font-sans text-lg focus:border-primary outline-none transition-colors bg-transparent italic text-center w-full">
                  <option>{language === 'PT' ? "Coleção 'La Forme'" : "'La Forme' Collection"}</option>
                  <option>{language === 'PT' ? "Mobiliário Sob Medida" : "Custom Furniture"}</option>
                  <option>{language === 'PT' ? "Consultoria de Design" : "Design Consultancy"}</option>
                  <option>{language === 'PT' ? "Outros" : "Others"}</option>
               </select>
            </div>

            <div className="flex flex-col gap-4 items-center">
               <label className="font-sans text-[10px] font-bold uppercase tracking-widest-luxury text-primary/40 text-center">{t('enquire.form.message')}</label>
               <textarea 
                 rows={4}
                 className="border-b border-primary/20 py-4 font-sans text-lg focus:border-primary outline-none transition-colors bg-transparent resize-none italic text-center w-full"
                 placeholder={language === 'PT' ? "Como podemos ajudar você a encontrar o essencial?" : "How can we help you find the essential?"}
               />
            </div>

            <button className="w-full bg-primary text-on-primary font-sans text-[11px] font-bold uppercase py-10 tracking-[0.6em] hover:bg-on-surface-variant transition-all duration-700 flex justify-center items-center gap-4 group">
              {t('enquire.form.submit')} <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform duration-700" />
            </button>
          </form>
        </motion.div>

        <motion.div {...fadeIn} className="col-start-1 col-end-13 md:col-start-4 md:col-end-10 mt-24 text-center">
           <p className="font-sans text-[10px] font-bold uppercase tracking-[0.4em] text-primary/30">
             {t('enquire.footer')}
           </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
