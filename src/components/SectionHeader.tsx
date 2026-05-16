import React from 'react';
import TextReveal from './TextReveal';

interface SectionHeaderProps {
  label?: string;
  title: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  centered?: boolean;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  label, 
  title, 
  description, 
  className = "", 
  titleClassName = "text-5xl md:text-8xl", 
  centered = true 
}) => {
  return (
    <div className={`mb-20 md:mb-32 ${centered ? "text-center flex flex-col items-center" : ""} ${className}`}>
      {label && (
        <TextReveal>
          <span className="font-sans text-[11px] font-bold uppercase text-on-surface-variant mb-12 block tracking-widest-luxury">
            {label}
          </span>
        </TextReveal>
      )}
      <TextReveal delay={0.2}>
        <h2 className={`font-serif text-primary leading-tight ${titleClassName}`}>
          {title}
        </h2>
      </TextReveal>
      {description && (
        <TextReveal delay={0.4}>
          <p className={`font-sans text-base md:text-lg text-on-surface-variant mt-16 md:mt-20 leading-relaxed opacity-60 tracking-wide ${centered ? "max-w-sm md:max-w-md mx-auto" : "max-w-xl"}`}>
            {description}
          </p>
        </TextReveal>
      )}
    </div>
  );
};

export default SectionHeader;
