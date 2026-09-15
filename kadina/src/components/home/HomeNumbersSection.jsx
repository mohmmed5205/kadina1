import { motion, useReducedMotion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { getHomePageContent } from "../../data/pagesContent";
import { fadeUp, staggerContainer, viewportOnce } from "../../componetts/motionPresets";

export default function HomeNumbersSection() {
  const { lang } = useOutletContext();
  const metrics = getHomePageContent(lang).trustMetrics;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="home-numbers border-b border-[var(--color-border)] bg-[var(--color-surface)]" id="numbers" aria-labelledby="home-numbers-title">
      <div className="ds-container py-10 sm:py-12 lg:py-16">
        <motion.div initial={shouldReduceMotion ? false : "hidden"} variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
          <motion.div className="flex items-end justify-between gap-6 border-b border-[var(--color-border-strong)] pb-6" variants={fadeUp}>
            <div>
              <p className="section-title-eyebrow">{lang === "ar" ? "كادينا في أرقام" : "Kadina in numbers"}</p>
              <h2 className="mt-3 max-w-2xl text-[clamp(1.5rem,3vw,2.5rem)] font-black leading-[1.1] tracking-[-.035em] text-[var(--color-heading)]" id="home-numbers-title">
                {lang === "ar" ? "خبرة تراكمت.. وثقة صنعتها التفاصيل" : "Experience built over time, trust earned in the details"}
              </h2>
            </div>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <motion.article className="relative border-b border-[var(--color-border)] px-4 py-6 odd:border-e lg:border-b-0 lg:border-e lg:px-6 lg:py-9 lg:first:ps-0 lg:last:border-e-0" key={metric.label} variants={fadeUp}>
                <p className="text-[clamp(2.25rem,4vw,3rem)] font-black leading-none tracking-[-.05em] text-[var(--color-accent-strong)]" dir="ltr">{metric.value}</p>
                <p className="mt-2 max-w-44 text-xs font-bold leading-6 text-[var(--color-text-muted)] sm:mt-3 sm:text-sm sm:leading-7">{metric.label}</p>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
