import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import { fadeUp, viewportOnce } from "../../componetts/motionPresets";
import { getDoctorDetails } from "../../data/doctors";

const SWIPE_THRESHOLD = 50;

export default function HomeDoctorsSection() {
  const { lang } = useOutletContext();
  const doctors = getDoctorDetails(lang);
  const [activeIndex, setActiveIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchCurrentX = useRef(null);
  const active = doctors[activeIndex] || doctors[0];
  const shouldReduceMotion = useReducedMotion();
  const switchTransition = {
    duration: shouldReduceMotion ? 0 : 0.38,
    ease: [0.22, 1, 0.36, 1],
  };

  const getRelativeIndex = (current, direction) =>
    (current + direction + doctors.length) % doctors.length;

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
      className="ds-section scroll-mt-24 bg-[var(--color-surface)]"
      id="doctors"
    >
      <div className="ds-container">
        <SectionTitle
          eyebrow={lang === "ar" ? "فريق كادينا" : "Kadina team"}
          title={
            lang === "ar"
              ? "نخبة الاستشاريين.. تحت سقف واحد"
              : "Leading consultants under one roof"
          }
        />

        <motion.div
          className="mt-10 touch-pan-y overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-muted)] lg:mt-14"
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
          <div className="doctor-showcase-grid">
            <div className="doctor-showcase-heading p-6 pb-5 sm:p-10 lg:p-12 lg:pb-3">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`doctor-heading-${active?.slug}`}
                  animate={{ opacity: 1, y: 0 }}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ ...switchTransition, delay: shouldReduceMotion ? 0 : 0.04 }}
                >
                  <p className="text-xs font-black tracking-[0.12em] text-[var(--color-accent-strong)]">
                    {active?.title}
                  </p>
                  <h3 className="mt-3 text-[clamp(2.25rem,6vw,4.5rem)] font-black leading-[1.08] text-[var(--color-heading)]">
                    {active?.name}
                  </h3>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className="doctor-showcase-image relative aspect-[4/5] min-h-0 overflow-hidden bg-[var(--color-warm-beige-strong)] lg:min-h-[44rem]"
              id="home-featured-doctor"
              role="tabpanel"
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={active?.slug}
                  alt={active?.name}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`absolute inset-0 h-full w-full ${active?.image ? "object-cover object-top" : "object-contain p-14"}`}
                  decoding="async"
                  exit={{ opacity: 0, scale: 0.99 }}
                  height="1440"
                  initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
                  loading="lazy"
                  src={active?.image || "/kadina-logo.webp"}
                  transition={switchTransition}
                  width="1080"
                />
              </AnimatePresence>
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[var(--color-surface-dark)]/60 to-transparent" />
              <span className="absolute bottom-6 start-6 text-sm font-black text-[var(--color-text-on-dark-muted)]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(doctors.length).padStart(2, "0")}
              </span>
            </div>

            <div className="doctor-showcase-details p-6 pt-5 sm:p-10 lg:p-12 lg:pt-3">
              <AnimatePresence mode="wait">
                <motion.p
                  key={`doctor-specialty-${active?.slug}`}
                  animate={{ opacity: 1, y: 0 }}
                  className="max-w-xl text-base font-bold leading-8 text-[var(--color-text-muted)] sm:text-lg sm:leading-9"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 8 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ ...switchTransition, delay: shouldReduceMotion ? 0 : 0.08 }}
                >
                  {active?.specialty}
                </motion.p>
              </AnimatePresence>
              <Link
                className="ds-button mt-7 w-full bg-[var(--color-surface-dark)] text-[var(--color-text-on-dark)] hover:bg-[var(--color-accent-strong)] sm:w-fit"
                to={`/doctors/${active?.slug}`}
              >
                {lang === "ar" ? "الملف التعريفي" : "View profile"}
                <span aria-hidden="true" className="editorial-arrow">
                  {lang === "ar" ? "←" : "→"}
                </span>
              </Link>
            </div>

            <div
              className="doctor-showcase-selector mobile-strip flex snap-x gap-3 overflow-x-auto border-t border-[var(--color-border)] p-4 sm:p-5 lg:mx-12 lg:px-0"
              role="tablist"
              aria-label={lang === "ar" ? "اختر طبيبًا" : "Choose a doctor"}
            >
              {doctors.map((doctor, index) => (
                <button
                  key={doctor.slug}
                  type="button"
                  role="tab"
                  aria-controls="home-featured-doctor"
                  aria-label={doctor.name}
                  aria-selected={index === activeIndex}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleSelectorKeyDown(event, index)}
                  tabIndex={index === activeIndex ? 0 : -1}
                  className={`group relative min-w-[5.25rem] snap-start pb-2 text-start ${index === activeIndex ? "text-[var(--color-heading)]" : "text-[var(--color-text-muted)]"}`}
                >
                  {index === activeIndex ? (
                    <motion.span
                      aria-hidden="true"
                      className="absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-[var(--color-accent-strong)]"
                      layoutId="home-doctor-active"
                      transition={switchTransition}
                    />
                  ) : null}
                  <span
                    className={`block aspect-[4/5] min-h-20 overflow-hidden rounded-[var(--radius-sm)] border transition-colors ${index === activeIndex ? "border-[var(--color-accent-strong)]" : "border-[var(--color-border)]"}`}
                  >
                    <img
                      alt=""
                      aria-hidden="true"
                      className={`h-full w-full ${doctor.image ? "object-cover object-top" : "object-contain p-3"}`}
                      decoding="async"
                      loading="lazy"
                      src={doctor.image || "/kadina-logo.webp"}
                    />
                  </span>
                  <span className="mt-2 line-clamp-2 block text-xs font-bold leading-5">
                    {doctor.name}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        <Link
          className="mt-9 inline-flex min-h-11 items-center font-black text-[var(--color-accent-strong)] underline decoration-[var(--color-accent-strong)]/35 underline-offset-8"
          to="/doctors"
        >
          {lang === "ar" ? "تعرّف على كل الأطباء" : "View All Doctors"}
        </Link>
      </div>
    </section>
  );
}
