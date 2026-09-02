import { motion, useReducedMotion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import { getAboutData } from "../../data/about";
import {
  fadeUp,
  imageReveal,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";

export default function HomeTrustSection() {
  const { lang } = useOutletContext();
  const { content } = getAboutData(lang);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="home-about scroll-mt-24 overflow-hidden bg-[var(--color-surface)]"
      id="about"
    >
      <motion.div
        className="ds-container grid gap-12 py-[var(--section-space)] lg:grid-cols-[minmax(0,.9fr)_minmax(30rem,1.1fr)] lg:items-center lg:gap-[clamp(4rem,8vw,9rem)]"
        initial={shouldReduceMotion ? false : "hidden"}
        variants={staggerContainer}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <motion.div className="relative" variants={imageReveal}>
          <div className="relative aspect-[4/5] overflow-hidden bg-[var(--color-surface-muted)] sm:aspect-[5/4] lg:aspect-[4/5]">
            <img
              alt={lang === "ar" ? "مبنى مركز كادينا الطبي في الرياض" : "Kadina Medical Center building in Riyadh"}
              className="h-full w-full object-cover object-[58%_center] lg:object-[62%_center]"
              decoding="async"
              loading="lazy"
              src="/homeBG.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(48,32,18,.58))]" />
            <p className="absolute bottom-6 start-6 text-[clamp(4rem,10vw,7.5rem)] font-black leading-none tracking-[-.07em] text-white/90 sm:bottom-8 sm:start-8">
              2013
            </p>
          </div>
          <span className="absolute -bottom-5 end-5 h-20 w-px bg-[var(--color-accent)] lg:-end-6 lg:bottom-12" aria-hidden="true" />
        </motion.div>

        <div>
          <motion.p className="section-title-eyebrow" variants={fadeUp}>
            {lang === "ar" ? "عن كادينا" : "About Kadina"}
          </motion.p>
          <motion.h2
            className="mt-5 max-w-3xl text-[clamp(2.75rem,7vw,6.5rem)] font-black leading-[1.02] tracking-[-.055em] text-[var(--color-heading)]"
            variants={fadeUp}
          >
            {content.intro}
          </motion.h2>
          <motion.p
            className="mt-7 max-w-2xl text-lg leading-9 text-[var(--color-text-muted)] lg:mt-10 lg:text-xl lg:leading-10"
            variants={fadeUp}
          >
            {content.story}
          </motion.p>
          <motion.div variants={fadeUp}>
            <Link
              className="mt-8 inline-flex min-h-12 items-center gap-4 border-b border-[var(--color-accent)] pb-2 font-black text-[var(--color-heading)] lg:mt-10"
              to="/about"
            >
              <span>{lang === "ar" ? "اعرف أكثر عن كادينا" : "Discover more about Kadina"}</span>
              <span aria-hidden="true" className="editorial-arrow">
                {lang === "ar" ? "←" : "→"}
              </span>
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
