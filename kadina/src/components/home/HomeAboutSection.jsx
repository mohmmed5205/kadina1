import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";
import { getHomePageContent } from "../../data/pagesContent";

export default function HomeAboutSection() {
  const { lang } = useOutletContext();
  const homePageContent = getHomePageContent(lang);

  return (
    <section
      className="ds-section scroll-mt-24 bg-[var(--color-surface-muted)]"
      id="about"
    >
      <div className="ds-container">
        <SectionTitle title={lang === "ar" ? "لماذا كادينا؟" : "Why Kadina?"} />

        <motion.div
          className="mt-10 grid lg:mt-16 lg:grid-cols-12 lg:grid-rows-2"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          {homePageContent.whyKadina.map((item, index) => (
            <motion.article
              className={
                index === 0
                  ? "relative border-y border-[var(--color-border-strong)] py-9 lg:col-span-7 lg:row-span-2 lg:pe-16 lg:py-14"
                  : "relative border-b border-[var(--color-border)] py-9 lg:col-span-5 lg:ps-12"
              }
              key={`why-kadina-${index}`}
              variants={cardItem}
            >
              <span
                aria-hidden="true"
                className={`block font-black leading-none tracking-[-0.07em] text-[var(--color-accent-strong)] ${index === 0 ? "text-[clamp(5rem,13vw,10rem)]" : "text-5xl lg:text-6xl"}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3
                className={`mt-7 font-black leading-[1.12] text-[var(--color-heading)] ${index === 0 ? "max-w-2xl text-[clamp(2.25rem,6vw,4.5rem)]" : "text-2xl lg:text-3xl"}`}
              >
                {item.title}
              </h3>
              <p
                className={`mt-4 leading-8 text-[var(--color-text-muted)] ${index === 0 ? "max-w-2xl text-lg lg:mt-6 lg:leading-9" : "max-w-xl"}`}
              >
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>

        <Link
          className="mt-9 inline-flex min-h-11 items-center font-black text-[var(--color-accent-strong)] underline decoration-[var(--color-accent)]/45 underline-offset-8"
          to="/about"
        >
          {lang === "ar" ? "تعرّف علينا أكثر" : "Learn More About Us"}
        </Link>
      </div>
    </section>
  );
}
