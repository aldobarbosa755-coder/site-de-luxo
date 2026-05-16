export const FADE_IN = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-100px" },
  transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] }
};

export const LINE_GROW = {
  initial: { width: 0 },
  whileInView: { width: "100%" },
  viewport: { once: true },
  transition: { duration: 1.5, ease: "circOut" }
};

export const PAGE_TRANSITION = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 1 }
};
