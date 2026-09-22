import { motion, useReducedMotion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { getHomePageContent } from "../../data/pagesContent";
import { fadeUp, staggerContainer, viewportOnce } from "../../componetts/motionPresets";

export default function HomeNumbersSection() {
  const { lang } = useOutletContext();
  const metrics = getHomePageContent(lang).trustMetrics;
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)] py-16 sm:py-20 lg:py-24"
      id="numbers"
      aria-labelledby="home-numbers-title"
    >
      <div className="ds-container !max-w-5xl">
        <motion.div
          initial={shouldReduceMotion ? false : "hidden"}
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <motion.header className="mx-auto mb-10 max-w-2xl text-center sm:mb-12" variants={fadeUp}>
            <p className="section-title-eyebrow justify-center">
              {lang === "ar" ? "كادينا في أرقام" : "Kadina in numbers"}
            </p>
            <h2
              className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.15] text-[var(--color-heading)]"
              id="home-numbers-title"
            >
              {lang === "ar" ? "كادينا في أرقام" : "Kadina in numbers"}
            </h2>
          </motion.header>

          <div className="grid grid-cols-2 gap-3 sm:gap-5">
            {metrics.map((metric) => (
              <motion.article
                className="flex min-h-[10rem] flex-col items-center justify-center rounded-[1.35rem] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-4 py-7 text-center sm:min-h-[12rem] sm:px-6"
                key={metric.label}
                variants={fadeUp}
              >
                <p className="text-[clamp(2rem,5vw,3.5rem)] font-black leading-none text-[var(--color-accent)]" dir="ltr">
                  {metric.value}
                </p>
                <p className="mt-4 max-w-52 text-xs font-bold leading-6 text-[var(--color-text-muted)] sm:text-sm sm:leading-7">
                  {metric.label}
                </p>
                <span className="mt-4 h-0.5 w-8 bg-[var(--color-accent)]" aria-hidden="true" />
              </motion.article>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
