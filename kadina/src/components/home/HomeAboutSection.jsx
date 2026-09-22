import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { cardItem, staggerContainer, viewportOnce } from "../../componetts/motionPresets";
import { getHomePageContent } from "../../data/pagesContent";

export default function HomeAboutSection() {
  const { lang, t } = useOutletContext();
  const homePageContent = getHomePageContent(lang);

  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] py-16 sm:py-20 lg:py-24" id="why-kadina">
      <div className="ds-container !max-w-5xl">
        <div className="max-w-3xl">
          <p className="section-title-eyebrow">{t.whyUs.eyebrow}</p>
          <h2 className="mt-5 text-[clamp(2.25rem,5vw,4.75rem)] font-black leading-[1.16] text-[var(--color-heading)]">
            {t.whyUs.title}
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--color-text-muted)] sm:text-lg sm:leading-9">
            {t.whyUs.description}
          </p>
        </div>

        <motion.div
          className="mt-10 border-s border-[var(--color-border-strong)] sm:mt-12"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          {homePageContent.whyKadina.map((item, index) => (
            <motion.article
              className="relative grid min-h-24 grid-cols-[3.5rem_minmax(0,1fr)] items-center gap-4 border-b border-[var(--color-border)] py-5 ps-5 sm:grid-cols-[4.5rem_minmax(0,1fr)] sm:gap-6 sm:ps-7"
              key={item.title}
              variants={cardItem}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-accent)] text-lg font-black text-[var(--color-accent)]" aria-hidden="true">✓</span>
              <div>
                <h3 className="text-lg font-black leading-7 text-[var(--color-heading)] sm:text-xl">{item.title}</h3>
                <p className="mt-1 text-sm leading-7 text-[var(--color-text-muted)]">{item.description}</p>
              </div>
              <span className="absolute start-[-1px] top-1/2 h-px w-5 -translate-y-1/2 bg-[var(--color-accent)]" aria-hidden="true" />
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
