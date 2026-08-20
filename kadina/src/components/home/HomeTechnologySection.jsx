import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import { fadeUp, viewportOnce } from "../../componetts/motionPresets";
import { getDeviceSummaries } from "../../data/devices";

const SWIPE_THRESHOLD = 50;

export default function HomeTechnologySection() {
  const { lang } = useOutletContext();
  const devices = getDeviceSummaries(lang).slice(0, 6);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchCurrentX = useRef(null);
  const active = devices[activeIndex] || devices[0];
  const shouldReduceMotion = useReducedMotion();
  const switchTransition = {
    duration: shouldReduceMotion ? 0 : 0.36,
    ease: [0.22, 1, 0.36, 1],
  };

  const getRelativeIndex = (current, direction) =>
    (current + direction + devices.length) % devices.length;

  const goNext = () => {
    setActiveIndex((current) => getRelativeIndex(current, 1));
  };

  const goPrevious = () => {
    setActiveIndex((current) => getRelativeIndex(current, -1));
  };

  const goVisualLeft = () => {
    if (lang === "ar") goNext();
    else goPrevious();
  };

  const goVisualRight = () => {
    if (lang === "ar") goPrevious();
    else goNext();
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null || touchCurrentX.current === null) return;
    const deltaX = touchCurrentX.current - touchStartX.current;
    touchStartX.current = null;
    touchCurrentX.current = null;
    if (Math.abs(deltaX) < SWIPE_THRESHOLD) return;
    if (deltaX > 0) goVisualLeft();
    else goVisualRight();
  };

  const handleSelectorKeyDown = (event, index) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

    event.preventDefault();
    const visualDirection =
      event.key === "ArrowRight" ? (lang === "ar" ? -1 : 1) : lang === "ar" ? 1 : -1;
    const nextIndex = getRelativeIndex(index, visualDirection);
    setActiveIndex(nextIndex);
    event.currentTarget.parentElement?.children[nextIndex]?.focus();
  };

  return (
    <section
      className="ds-section scroll-mt-24 overflow-hidden bg-[var(--color-warm-beige-strong)]"
      id="technology"
    >
      <div className="ds-container">
        <SectionTitle
          eyebrow={lang === "ar" ? "الأجهزة والتقنيات" : "Technology & Devices"}
          title={
            lang === "ar"
              ? "التقنية ليست ديكورًا.. بل جزء من القرار الطبي"
              : "Technology is not decoration. It is part of the clinical decision"
          }
          description={
            lang === "ar"
              ? "الجهاز الصحيح بيد الاستشاري الصحيح يصنع كل الفرق."
              : "The right device in the right consultant's hands makes all the difference."
          }
        />

        <motion.div
          className="mt-10 touch-pan-y overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border-on-dark)] bg-[var(--color-surface-dark)] lg:mt-14"
          initial={shouldReduceMotion ? false : "hidden"}
          variants={fadeUp}
          viewport={viewportOnce}
          whileInView="visible"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
            touchCurrentX.current = event.touches[0].clientX;
          }}
          onTouchMove={(event) => {
            touchCurrentX.current = event.touches[0].clientX;
          }}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={() => {
            touchStartX.current = null;
            touchCurrentX.current = null;
          }}
        >
          <div className="technology-showcase-grid">
            <div className="technology-showcase-heading p-6 pb-5 sm:p-10 lg:p-14 lg:pb-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`heading-${active?.slug}`}
                  animate={{ opacity: 1, y: 0 }}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={switchTransition}
                >
                  <p className="text-xs font-black tracking-[0.12em] text-[var(--color-accent)]">
                    {active?.category}
                  </p>
                  <h3 className="on-dark-heading mt-4 text-[clamp(2.25rem,6vw,4.75rem)] font-black leading-[1.05]">
                    {lang === "ar" ? active?.arabicName : active?.englishName}
                  </h3>
                  <p
                    className="mt-3 text-base font-bold text-[var(--color-accent)] sm:text-lg"
                    dir={lang === "ar" ? "ltr" : "rtl"}
                  >
                    {lang === "ar" ? active?.englishName : active?.arabicName}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className="technology-showcase-image relative flex aspect-[5/4] min-h-0 items-center justify-center overflow-hidden bg-[var(--color-surface)] p-3 sm:aspect-[4/3] sm:p-6 lg:aspect-auto lg:min-h-[36rem] lg:p-8"
              id="home-featured-device"
              role="tabpanel"
            >
              <span
                aria-hidden="true"
                className="absolute bottom-5 start-6 text-7xl font-black tracking-[-0.06em] text-[var(--color-heading)]/[0.06] sm:text-9xl"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </span>
              <AnimatePresence mode="wait">
                <motion.img
                  key={active?.slug}
                  alt={`${active?.arabicName} — ${active?.englishName}`}
                  animate={{ opacity: 1, scale: 1 }}
                  className="relative z-10 h-[82%] max-h-[18rem] w-[88%] object-contain sm:max-h-[25rem] lg:h-[90%] lg:max-h-[32rem] lg:w-[84%]"
                  decoding="async"
                  exit={{ opacity: 0, scale: 0.99 }}
                  height="1600"
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
                  loading="lazy"
                  src={active?.image}
                  transition={switchTransition}
                  width="1600"
                />
              </AnimatePresence>
            </div>

            <div className="technology-showcase-details flex flex-col justify-start p-6 pt-5 sm:p-10 lg:p-14 lg:pt-3">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`description-${active?.slug}`}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-xl leading-8 text-[var(--color-text-on-dark-muted)]"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ ...switchTransition, delay: shouldReduceMotion ? 0 : 0.05 }}
                >
                  {active?.cardDescription}
                </motion.p>
              </AnimatePresence>
              <Link
                className="ds-button ds-button-on-dark mt-7 w-full sm:w-fit"
                to={`/technology/${active?.slug}`}
              >
                {lang === "ar" ? "اكتشف الجهاز" : "Explore device"}
                <span aria-hidden="true" className="editorial-arrow">
                  {lang === "ar" ? "←" : "→"}
                </span>
              </Link>
            </div>
          </div>

          <div
            className="mobile-strip flex snap-x gap-2 overflow-x-auto border-t border-[var(--color-border-on-dark)] p-4 sm:p-5"
            role="tablist"
            aria-label={lang === "ar" ? "اختر جهازًا" : "Choose a device"}
          >
            {devices.map((device, index) => (
              <button
                key={device.slug}
                type="button"
                role="tab"
                aria-controls="home-featured-device"
                aria-selected={index === activeIndex}
                onClick={() => setActiveIndex(index)}
                onKeyDown={(event) => handleSelectorKeyDown(event, index)}
                tabIndex={index === activeIndex ? 0 : -1}
                className={`relative isolate min-h-12 min-w-40 snap-start overflow-hidden rounded-full border px-4 py-3 text-start text-sm font-black transition-colors sm:flex-1 ${index === activeIndex ? "border-[var(--color-accent)] text-[var(--color-heading)]" : "border-[var(--color-border-on-dark)] text-[var(--color-text-on-dark-muted)] hover:border-[var(--color-accent)]"}`}
              >
                {index === activeIndex ? (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 bg-[var(--color-accent)]"
                    layoutId="home-device-active"
                    transition={switchTransition}
                  />
                ) : null}
                <span className="me-2 opacity-55">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {device.displayName}
              </button>
            ))}
          </div>
        </motion.div>

        <Link
          className="mt-9 inline-flex min-h-11 items-center font-black text-[var(--color-accent-strong)] underline decoration-[var(--color-accent-strong)]/35 underline-offset-8"
          to="/technology"
        >
          {lang === "ar" ? "عرض جميع الأجهزة" : "View All Devices"}
        </Link>
      </div>
    </section>
  );
}
