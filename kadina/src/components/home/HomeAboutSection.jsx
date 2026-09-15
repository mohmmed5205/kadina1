import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";
import { getHomePageContent } from "../../data/pagesContent";

export default function HomeAboutSection() {
  const { lang, t } = useOutletContext();
  const homePageContent = getHomePageContent(lang);

  return (
    <section
      className="ds-section scroll-mt-24 bg-[var(--color-surface-muted)]"
      id="why-kadina"
    >
      <div className="ds-container">
        <div className="grid gap-5 border-b border-[var(--color-border-strong)] pb-7 lg:grid-cols-12 lg:items-end lg:pb-10">
          <div className="lg:col-span-8">
            <p className="section-title-eyebrow">
              {t.whyUs.eyebrow}
            </p>
            <h2 className="mt-4 text-[clamp(1.75rem,3vw,2.5rem)] font-black leading-[1.06] tracking-[-.04em] text-[var(--color-heading)]">
              {t.whyUs.title}
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--color-text-muted)] lg:col-span-4 lg:justify-self-end lg:text-base lg:leading-8">
            {t.whyUs.description}
          </p>
        </div>

        <motion.div
          className="divide-y divide-[var(--color-border-strong)]"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          {homePageContent.whyKadina.map((item, index) => (
            <motion.article
              className="group grid grid-cols-[2.75rem_minmax(0,1fr)] gap-4 py-6 sm:grid-cols-[5rem_minmax(0,1fr)] sm:items-start lg:grid-cols-12 lg:gap-7 lg:py-7"
              key={`why-kadina-${index}`}
              variants={cardItem}
            >
              <span
                aria-hidden="true"
                className="block text-[clamp(2.25rem,4.5vw,3.5rem)] font-black leading-[.85] tracking-[-0.05em] text-[var(--color-accent-strong)] sm:col-span-1 lg:col-span-3"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="max-w-3xl text-[clamp(1.25rem,2vw,1.75rem)] font-black leading-[1.1] tracking-[-.03em] text-[var(--color-heading)] col-start-2 lg:col-span-5 lg:col-start-4">
                {item.title}
              </h3>
              <p className="max-w-xl text-sm leading-7 text-[var(--color-text-muted)] col-start-2 lg:col-span-4 lg:col-start-9 lg:text-base lg:leading-8">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <Link
          className="mt-10 inline-flex min-h-12 items-center gap-4 border-b border-[var(--color-accent-strong)] pb-2 font-black text-[var(--color-heading)]"
          to="/about"
        >
          <span>{lang === "ar" ? "تعرّف علينا أكثر" : "Learn More About Us"}</span>
          <span aria-hidden="true" className="editorial-arrow">
            {lang === "ar" ? "←" : "→"}
          </span>
        </Link>
      </div>
    </section>
  );
}
