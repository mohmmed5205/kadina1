import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";
import { getHomePageContent } from "../../data/pagesContent";
import CountUp from "../motion/CountUp";

export default function HomeTrustSection() {
  const { lang } = useOutletContext();
  const homePageContent = getHomePageContent(lang);
  return (
    <section aria-label={lang === "ar" ? "أرقام الثقة في كادينا" : "Kadina trust metrics"} className="bg-[var(--color-surface)]">
      <motion.div className="ds-container py-[var(--section-space)] text-center" initial="hidden" variants={fadeUp} viewport={viewportOnce} whileInView="visible">
        <p className="mx-auto max-w-5xl text-[clamp(2.25rem,8vw,5rem)] font-black leading-[1.16] tracking-[-0.04em] text-[var(--color-heading)]">
          {lang === "ar" ? "منذ 2013.. خبرة استشارية وتقنيات عالمية تحت سقف واحد" : "Since 2013, consultant expertise and world-class technology under one roof"}
        </p>
        <span aria-hidden="true" className="mx-auto mt-10 block h-px w-20 bg-[var(--color-accent-strong)]" />
      </motion.div>
      <motion.div className="border-y border-[var(--color-border-on-dark)] bg-[var(--color-surface-dark)]" initial="hidden" variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
        <div className="ds-container grid grid-cols-2 md:grid-cols-4">
        {homePageContent.trustMetrics.map((metric, index) => (
          <motion.div
            className="trust-metric relative flex min-h-40 flex-col justify-center px-3 py-8 text-center sm:px-6 lg:py-14"
            key={`trust-metric-${index}`}
            variants={cardItem}
          >
            <p className="text-5xl font-black tracking-[-0.05em] text-[var(--color-accent)] sm:text-6xl lg:text-7xl">
              <CountUp value={metric.value} />
            </p>
            <p className="mt-3 text-sm font-bold text-[var(--color-text-on-dark-muted)] sm:text-base">{metric.label}</p>
          </motion.div>
        ))}
        </div>
      </motion.div>
    </section>
  );
}
