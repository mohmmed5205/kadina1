import { motion, useReducedMotion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import { getAboutData } from "../../data/about";
import { fadeUp, imageReveal, staggerContainer, viewportOnce } from "../../componetts/motionPresets";

export default function HomeTrustSection() {
  const { lang } = useOutletContext();
  const { content } = getAboutData(lang);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="overflow-hidden bg-[var(--color-surface)]" id="about">
      <motion.div
        className="ds-container !max-w-5xl pt-16 sm:pt-20 lg:pt-24"
        initial={shouldReduceMotion ? false : "hidden"}
        variants={staggerContainer}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <motion.div className="mx-auto max-w-3xl text-center" variants={fadeUp}>
          <p className="section-title-eyebrow justify-center">
            {lang === "ar" ? "عن كادينا" : "About Kadina"}
          </p>
          <h2 className="mt-7 text-[clamp(1.5rem,3vw,2.35rem)] font-black leading-[1.65] text-[var(--color-heading)]">
            {content.story}
          </h2>
          <Link className="ds-button ds-button-primary mt-8" to="/about">
            {lang === "ar" ? "اعرف أكثر عن كادينا" : "Discover Kadina"}
          </Link>
        </motion.div>

        <motion.figure className="relative -mx-[var(--page-gutter)] mt-12 sm:mt-16 lg:mx-0" variants={imageReveal}>
          <div className="relative min-h-[24rem] overflow-hidden sm:min-h-[32rem] lg:min-h-[38rem]">
            <img
              alt={lang === "ar" ? "مبنى مركز كادينا الطبي في الرياض" : "Kadina Medical Center building in Riyadh"}
              className="absolute inset-0 h-full w-full object-cover object-[58%_center] lg:object-center"
              decoding="async"
              loading="lazy"
              src="/homeBG.webp"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(48,32,18,.08),rgba(48,32,18,.12)_55%,var(--color-surface)_100%)]" />
          </div>
        </motion.figure>
      </motion.div>
    </section>
  );
}
