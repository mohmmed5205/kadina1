import { motion, useReducedMotion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { getAboutData } from "../../data/about";
import { fadeUp, viewportOnce } from "../../componetts/motionPresets";

export default function HomeBrandStatement() {
  const { lang } = useOutletContext();
  const { content } = getAboutData(lang);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="home-brand-statement relative overflow-hidden bg-[var(--color-surface-dark)] " id="brand-statement" aria-labelledby="brand-statement-title">
      <img alt="" aria-hidden="true" className="pointer-events-none absolute -bottom-[12%] -end-[8%] w-[min(72rem,92vw)] opacity-[.055] brightness-0 invert" decoding="async" loading="lazy" src="/kadina-logo3.webp" />
      <div className="pointer-events-none absolute inset-y-0 start-[var(--page-gutter)] w-px bg-[var(--color-border-on-dark)]" />
      <div className="ds-container relative flex items-center py-10  lg:py-12">
        <motion.div className="w-full min-w-0 max-w-5xl" initial={shouldReduceMotion ? false : "hidden"} variants={fadeUp} viewport={viewportOnce} whileInView="visible">
          <p className="text-xs font-black tracking-[.16em] text-[var(--color-accent)]">{lang === "ar" ? "هوية كادينا" : "The Kadina perspective"}</p>
          <h2 className="on-dark-heading mt-4 text-[clamp(1.5rem,2.7vw,2.5rem)] font-black leading-[1.3] tracking-[-.04em]" id="brand-statement-title">{content.vision}</h2>
          <div className="mt-5 grid gap-4 border-t border-[var(--color-border-on-dark)] pt-5 sm:mt-7 sm:gap-5 sm:pt-6 lg:grid-cols-12">
            <span className="text-[clamp(2rem,3vw,2.75rem)] font-black leading-none text-[var(--color-accent)] lg:col-span-3">K.</span>
            <p className="max-w-2xl text-sm leading-7 text-[var(--color-text-on-dark-muted)] sm:text-base sm:leading-8 lg:col-span-7 lg:col-start-6">{content.mission}</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
