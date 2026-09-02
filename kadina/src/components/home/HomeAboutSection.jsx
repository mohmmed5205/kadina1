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
        <div className="grid gap-7 border-b border-[var(--color-border-strong)] pb-10 lg:grid-cols-12 lg:items-end lg:pb-14">
          <div className="lg:col-span-8">
            <p className="section-title-eyebrow">
              {t.whyUs.eyebrow}
            </p>
            <h2 className="mt-5 text-[clamp(3rem,8vw,7rem)] font-black leading-[.98] tracking-[-.055em] text-[var(--color-heading)]">
              {t.whyUs.title}
            </h2>
          </div>
          <p className="max-w-md text-base leading-8 text-[var(--color-text-muted)] lg:col-span-4 lg:justify-self-end lg:text-lg">
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
              className="group grid gap-6 py-10 sm:grid-cols-[7rem_minmax(0,1fr)] sm:items-start lg:grid-cols-12 lg:gap-8 lg:py-16"
              key={`why-kadina-${index}`}
              variants={cardItem}
            >
              <span
                aria-hidden="true"
                className="block text-[clamp(4rem,8vw,7.5rem)] font-black leading-[.8] tracking-[-0.07em] text-[var(--color-accent-strong)] sm:col-span-1 lg:col-span-3"
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="max-w-3xl text-[clamp(2rem,4.4vw,4.5rem)] font-black leading-[1.05] tracking-[-.04em] text-[var(--color-heading)] sm:col-start-2 lg:col-span-5 lg:col-start-4">
                {item.title}
              </h3>
              <p className="max-w-xl text-base leading-8 text-[var(--color-text-muted)] sm:col-start-2 lg:col-span-4 lg:col-start-9 lg:text-lg lg:leading-9">
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
