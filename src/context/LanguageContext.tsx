import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'PT' | 'EN';

interface Translations {
  [key: string]: {
    PT: string;
    EN: string;
  };
}

export const translations: Translations = {
  // Navbar
  'nav.home': { PT: 'Principal', EN: 'Home' },
  'nav.collections': { PT: 'Coleções', EN: 'Collections' },
  'nav.journal': { PT: 'Journal', EN: 'Journal' },
  'nav.heritage': { PT: 'Heritage', EN: 'Heritage' },
  'nav.enquire': { PT: 'Solicitar', EN: 'Enquire' },
  'nav.back': { PT: 'VOLTAR', EN: 'BACK' },

  // Hero
  'hero.subtitle': { PT: 'DESDE MCMXCVI', EN: 'SINCE MCMXCVI' },
  'hero.title': { PT: 'A Arte do Silêncio', EN: 'The Art of Silence' },
  'hero.cta': { PT: 'PRÓXIMA COLEÇÃO', EN: 'NEXT COLLECTION' },

  // Philosophy
  'philo.label': { PT: 'FILOSOFIA', EN: 'PHILOSOPHY' },
  'philo.title': { PT: 'A beleza da restrição e a verdade dos materiais.', EN: 'The beauty of restraint and the truth of materials.' },
  'philo.p1': { PT: "Na L'Essence, acreditamos que a verdadeira sofisticação reside naquilo que é essencial. Nossa filosofia é um manifesto contra o excesso, um convite para desacelerar e apreciar a pureza da forma.", EN: "At L'Essence, we believe that true sophistication lies in what is essential. Our philosophy is a manifesto against excess, an invitation to slow down and appreciate the purity of form." },
  'philo.p2': { PT: 'Trabalhamos exclusivamente com matérias-primas que possuem alma: o carvalho que respira, o linho que amacia com o tempo, e o mármore que conta histórias milenares.', EN: 'We work exclusively with raw materials that have soul: oak that breathes, linen that softens over time, and marble that tells ancient stories.' },

  // Atelier
  'atelier.label': { PT: "L'ATELIER", EN: "L'ATELIER" },
  'atelier.title': { PT: 'A Mão do Mestre', EN: 'The Master\'s Hand' },
  'atelier.p': { PT: 'Tolerância zero como padrão. Em nossos ateliês, o tempo é medido pela precisão de um encaixe, não pelo relógio.', EN: 'Zero tolerance as standard. In our ateliers, time is measured by the precision of a joint, not by the clock.' },
  'atelier.feature1.title': { PT: 'PRECISÃO', EN: 'PRECISION' },
  'atelier.feature1.desc': { PT: 'A busca obsessiva pela perfeição geométrica.', EN: 'The obsessive pursuit of geometric perfection.' },
  'atelier.feature2.title': { PT: 'MATERIALIDADE', EN: 'MATERIALITY' },
  'atelier.feature2.desc': { PT: 'Respeito ancestral à fibra e ao toque natural.', EN: 'Ancestral respect for fiber and natural touch.' },

  // Process
  'process.01.title': { PT: 'Concepção', EN: 'Conception' },
  'process.01.desc': { PT: 'Esboços arquitetônicos que priorizam a função e o silêncio visual.', EN: 'Architectural sketches that prioritize function and visual silence.' },
  'process.02.title': { PT: 'Seleção', EN: 'Selection' },
  'process.02.desc': { PT: 'Matérias-primas raras escolhidas por sua textura, idade e alma.', EN: 'Rare raw materials chosen for their texture, age, and soul.' },
  'process.03.title': { PT: 'Execução', EN: 'Execution' },
  'process.03.desc': { PT: 'Centenas de horas de trabalho manual para uma única peça perfeita.', EN: 'Hundreds of hours of manual labor for a single perfect piece.' },
  'process.cta': { PT: 'Explorar Processo', EN: 'Explore Process' },

  // Ethos
  'ethos.01.title': { PT: 'Origem Natural', EN: 'Natural Origin' },
  'ethos.01.desc': { PT: 'Cada peça começa na extração ética, respeitando o ciclo da terra e a integridade de cada veio de pedra ou fibra de madeira.', EN: 'Each piece begins with ethical extraction, respecting the earth\'s cycle and the integrity of each stone vein or wood fiber.' },
  'ethos.02.title': { PT: 'Geometria Pura', EN: 'Pure Geometry' },
  'ethos.02.desc': { PT: 'Nossas formas não competem com o ambiente; elas o organizam, trazendo uma ordem silenciosa através de proporções áureas.', EN: 'Our forms do not compete with the environment; they organize it, bringing a quiet order through golden proportions.' },

  // Sensory
  'sensory.label': { PT: 'ESTUDOS SENSORIAIS', EN: 'SENSORY STUDIES' },
  'sensory.title': { PT: 'A Textura do Tempo', EN: 'The Texture of Time' },

  // Collections
  'col.title': { PT: 'Arquivos de Design', EN: 'Design Archives' },
  'col.p': { PT: 'Explorações sazonais que fundem inovação técnica com tradição artesanal.', EN: 'Seasonal explorations merging technical innovation with artisanal tradition.' },
  'col.item1.name': { PT: 'LA FORME', EN: 'LA FORME' },
  'col.item1.desc': { PT: 'Estudos em volume e vazio.', EN: 'Studies in volume and void.' },
  'col.item2.name': { PT: "L'HORLOGERIE", EN: "L'HORLOGERIE" },
  'col.item2.desc': { PT: 'O tempo como escultura.', EN: 'Time as sculpture.' },
  'col.item3.name': { PT: "L'ASSISE", EN: "L'ASSISE" },
  'col.item3.desc': { PT: 'A estrutura da quietude.', EN: 'The structure of stillness.' },
  'col.cta': { PT: 'Ver Coleção', EN: 'View Collection' },

  // Journal
  'journal.label': { PT: 'JOURNAL', EN: 'JOURNAL' },
  'journal.title': { PT: 'Insights & Ensaios', EN: 'Insights & Essays' },
  'journal.all': { PT: 'Ver todos', EN: 'View all' },
  'journal.post1.title': { PT: 'A Psicologia do Espaço Mínimo', EN: 'The Psychology of Minimal Space' },
  'journal.post2.title': { PT: 'Matéria e Memória: O Carvalho', EN: 'Matter and Memory: The Oak' },
  'journal.post3.title': { PT: 'Silêncio Visual em Ambientes Urbanos', EN: 'Visual Silence in Urban Environments' },

  // Heritage
  'heritage.label': { PT: 'HERITAGE', EN: 'HERITAGE' },
  'heritage.title': { PT: 'Projetado para durar.', EN: 'Designed to last.' },
  'heritage.p': { 
    PT: 'A L\'Essence não nasceu em um escritório, mas em uma oficina em Provence, onde a luz de outono revelava a alma das texturas. Nossa herança é uma tapeçaria tecida por três gerações de artesãos que entendiam que a madeira não é um recurso, mas um organismo vivo que continua a sussurrar sua história muito depois de ser esculpida.', 
    EN: 'L\'Essence was not born in an office, but in a workshop in Provence, where the autumn light revealed the soul of textures. Our heritage is a tapestry woven by three generations of artisans who understood that wood is not a resource, but a living organism that continues to whisper its story long after it has been carved.' 
  },
  'heritage.cta': { PT: 'Ler a nossa história', EN: 'Read our story' },
  'heritage.event1': { PT: 'Abertura do primeiro showroom em Tokyo.', EN: 'Opening of the first showroom in Tokyo.' },
  'heritage.event2': { PT: 'Prêmio de Excelência em Design Sustentável.', EN: 'Award for Excellence in Sustainable Design.' },
  'heritage.event3': { PT: 'Lançamento da Coleção \'La Forme\'.', EN: 'Launch of \'La Forme\' Collection.' },

  // CTA
  'cta.label': { PT: 'ACESSO EXCLUSIVO', EN: 'EXCLUSIVE ACCESS' },
  'cta.title': { PT: 'Experiencie o Essencial', EN: 'Experience the Essential' },
  'cta.button': { PT: 'SOLICITAR CONVITE', EN: 'REQUEST INVITATION' },
  'cta.catalog': { PT: 'Visualizar Catálogo', EN: 'View Catalog' },

  // Footer
  'process.01.content': { 
    PT: 'A concepção na L\'Essence começa com o silêncio. Antes do primeiro traço, existe uma fase de observação profunda da luz e do espaço. Nossos arquitetos buscam formas que não apenas ocupem o vazio, mas que dialoguem com ele em perfeita harmonia.', 
    EN: 'Conception at L\'Essence begins with silence. Before the first line, there is a phase of deep observation of light and space. Our architects seek forms that not only occupy the void but dialogue with it in perfect harmony.' 
  },
  'process.02.content': { 
    PT: 'A matéria dita a forma. Percorremos as florestas certificadas do norte da Europa em busca do carvalho perfeito, e as pedreiras de Carrara para o mármore mais puro. Cada veio, cada nó e cada imperfeição natural é considerada uma assinatura da natureza.', 
    EN: 'Material dictates form. We travel through certified forests in Northern Europe in search of the perfect oak, and the quarries of Carrara for the purest marble. Each grain, each knot, and each natural imperfection is considered a signature of nature.' 
  },
  'process.03.content': { 
    PT: 'Onde a tecnologia termina, a mão humana continua. Cada junção é feita com precisão milimétrica usando técnicas ancestrais de marcenaria. Uma única mesa pode levar mais de trezentas horas para ser finalizada, polida manualmente com óleos naturais.', 
    EN: 'Where technology ends, the human hand continues. Each joint is made with millimetric precision using ancestral woodworking techniques. A single table can take more than three hundred hours to finish, hand-polished with natural oils.' 
  },
  'footer.p': { PT: 'Arquitetos da restrição. Criadores de silêncio tátil para o indivíduo atento.', EN: 'Architects of restraint. Creators of tactile silence for the mindful individual.' },
  'footer.nav': { PT: 'NAVEGAÇÃO', EN: 'NAVIGATION' },
  'footer.boutique': { PT: 'BOUTIQUE', EN: 'BOUTIQUE' },
  'footer.newsletter': { PT: 'NEWSLETTER', EN: 'NEWSLETTER' },
  'footer.newsletter.p': { PT: 'Inscreva-se para atualizações silenciosas.', EN: 'Sign up for silent updates.' },
  'footer.placeholder': { PT: 'Seu e-mail', EN: 'Your email' },
  'footer.rights': { PT: 'TODOS OS DIREITOS RESERVADOS.', EN: 'ALL RIGHTS RESERVED.' },
  'footer.tagline': { PT: 'PROJETADO PARA A LONGEVIDADE', EN: 'DESIGNED FOR LONGEVITY' },

  // Enquire
  'enquire.label': { PT: 'ACESSO PRIVADO', EN: 'PRIVATE ACCESS' },
  'enquire.title': { PT: 'Solicitar Convite', EN: 'Request Invitation' },
  'enquire.p': { PT: 'Junte-se à nossa lista de espera exclusiva para ter acesso antecipado a novas coleções e edições limitadas.', EN: 'Join our exclusive waiting list for early access to new collections and limited editions.' },
  'enquire.form.name': { PT: 'Nome Completo', EN: 'Full Name' },
  'enquire.form.email': { PT: 'E-mail', EN: 'Email' },
  'enquire.form.interest': { PT: 'Seu Interesse', EN: 'Your Interest' },
  'enquire.form.message': { PT: 'Mensagem (Opcional)', EN: 'Message (Optional)' },
  'enquire.form.submit': { PT: 'ENVIAR SOLICITAÇÃO', EN: 'SEND REQUEST' },
  'enquire.footer': { PT: 'Respeitamos sua privacidade. Seus dados nunca serão compartilhados.', EN: 'We respect your privacy. Your data will never be shared.' }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('PT');

  const t = (key: string) => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
