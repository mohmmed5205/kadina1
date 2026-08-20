import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { fadeUp, viewportOnce } from "../../componetts/motionPresets";
import { createWhatsappUrl } from "../../utils/whatsapp";
import { getHomePageContent } from "../../data/pagesContent";
import MagneticButton from "../motion/MagneticButton";

export default function HomeFinalCta() {
  const { lang } = useOutletContext();
  const homePageContent = getHomePageContent(lang);
  const { finalCta } = homePageContent;

  return (
    <motion.section
      className="ds-section border-t border-[var(--color-border-on-dark)] bg-[var(--color-surface-dark)]"
      initial="hidden"
      variants={fadeUp}
      viewport={viewportOnce}
      whileInView="visible"
    >
      <div className="ds-container grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16">
        <div className="text-start">
          <p className="text-xs font-black tracking-[0.18em] text-[var(--color-accent)]">KADINA MEDICAL CENTER</p>
          <h2 className="on-dark-heading mt-5 max-w-5xl text-[clamp(2.5rem,8vw,6rem)] font-black leading-[1.05] tracking-[-0.045em] sm:mt-6">
            {lang === "ar" ? "ابدأ رحلتك مع كادينا" : "Begin your journey with Kadina"}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-text-on-dark-muted)] sm:mt-6 sm:text-lg">{finalCta.title}</p>
        </div>
        <div>
          <MagneticButton className="w-full sm:w-auto">
            <a
              aria-label={`${finalCta.label} (${lang === "ar" ? "يفتح في نافذة جديدة" : "opens in a new window"})`}
              className="ds-button ds-button-primary w-full px-7 py-3.5 sm:w-auto"
              href={createWhatsappUrl(finalCta.message)}
              rel="noopener noreferrer"
              target="_blank"
            >
              {finalCta.label}
            </a>
          </MagneticButton>
        </div>
      </div>
    </motion.section>
  );
}
