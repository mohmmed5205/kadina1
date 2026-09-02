import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SectionTitle from "../common/SectionTitle";
import { fadeUp, viewportOnce } from "../../componetts/motionPresets";
import { getDoctorDetails } from "../../data/doctors";

function DoctorPortrait({ doctor, lang }) {
  if (doctor.image) {
    return (
      <img
        alt={doctor.name}
        className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
        decoding="async"
        height="1440"
        loading="lazy"
        src={doctor.image}
        width="1080"
      />
    );
  }

  return (
    <div
      aria-label={
        lang === "ar"
          ? `صورة تعريفية بديلة للطبيبة ${doctor.name}`
          : `Portrait placeholder for ${doctor.name}`
      }
      className="doctor-portrait-placeholder flex h-full w-full items-center justify-center p-8 text-center"
      role="img"
    >
      <span className="text-3xl font-black leading-relaxed text-[var(--color-heading)]">
        {doctor.name}
      </span>
    </div>
  );
}

export default function HomeDoctorsSection() {
  const { lang, t } = useOutletContext();
  const doctors = getDoctorDetails(lang);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [edgeState, setEdgeState] = useState({ beginning: true, end: false });
  const shouldReduceMotion = useReducedMotion();

  const goPrevious = () => swiperRef.current?.slidePrev();
  const goNext = () => swiperRef.current?.slideNext();

  return (
    <section
      className="ds-section scroll-mt-24 overflow-hidden bg-[var(--color-surface)]"
      id="doctors"
    >
      <div className="ds-container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              eyebrow={lang === "ar" ? "فريق كادينا" : "Kadina team"}
              title={
                lang === "ar"
                  ? "نخبة الاستشاريين.. تحت سقف واحد"
                  : "Leading consultants under one roof"
              }
            />
          </div>
          <p className="max-w-md text-base leading-8 text-[var(--color-text-muted)] lg:col-span-4 lg:justify-self-end lg:text-lg">
            {lang === "ar"
              ? "تعرّف على الفريق، واختر الاستشاري الأقرب إلى احتياجك."
              : "Meet the team and find the consultant whose expertise matches your needs."}
          </p>
        </div>

        <motion.div
          className="mt-10 lg:mt-16"
          initial={shouldReduceMotion ? false : "hidden"}
          variants={fadeUp}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <Swiper
            aria-label={lang === "ar" ? "أطباء كادينا" : "Kadina doctors"}
            breakpoints={{
              640: { slidesPerView: 1.7, spaceBetween: 22 },
              1024: { slidesPerView: 2.5, spaceBetween: 28 },
              1280: { slidesPerView: 3.05, spaceBetween: 32 },
            }}
            className="!overflow-visible"
            dir={t.dir}
            grabCursor
            key={`home-doctors-${lang}`}
            onSlideChange={(swiper) => {
              setActiveIndex(swiper.activeIndex);
              setEdgeState({ beginning: swiper.isBeginning, end: swiper.isEnd });
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              setActiveIndex(swiper.activeIndex);
              setEdgeState({ beginning: swiper.isBeginning, end: swiper.isEnd });
            }}
            resistanceRatio={0.72}
            slidesPerView={1.15}
            spaceBetween={16}
            speed={shouldReduceMotion ? 0 : 620}
          >
            {doctors.map((doctor, index) => (
              <SwiperSlide key={doctor.slug}>
                <article className="doctor-gallery-item group h-full">
                  <Link
                    aria-label={`${lang === "ar" ? "عرض الملف التعريفي للطبيب" : "View profile for"} ${doctor.name}`}
                    className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-strong)]"
                    to={`/doctors/${doctor.slug}`}
                  >
                    <div className="aspect-[4/5] overflow-hidden bg-[var(--color-surface-muted)]">
                      <DoctorPortrait doctor={doctor} lang={lang} />
                    </div>
                    <div className="doctor-gallery-meta relative flex flex-1 flex-col border-b border-[var(--color-border-strong)] py-6">
                      <p className="text-xs font-black tracking-[.12em] text-[var(--color-accent-strong)]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="mt-3 text-[clamp(1.6rem,3vw,2.35rem)] font-black leading-tight text-[var(--color-heading)]">
                        {doctor.name}
                      </h3>
                      <p className="mt-3 line-clamp-3 leading-7 text-[var(--color-text-muted)]">
                        {doctor.specialty}
                      </p>
                      <span className="mt-auto inline-flex min-h-11 items-end gap-3 pt-5 text-sm font-black text-[var(--color-accent-strong)]">
                        {lang === "ar" ? "الملف التعريفي" : "View profile"}
                        <span aria-hidden="true" className="editorial-arrow">
                          {lang === "ar" ? "←" : "→"}
                        </span>
                      </span>
                    </div>
                  </Link>
                </article>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="mt-8 flex items-center gap-5 border-t border-[var(--color-border)] pt-5">
            <p className="min-w-16 text-sm font-black tracking-[.1em] text-[var(--color-heading)]" aria-live="polite">
              {String(activeIndex + 1).padStart(2, "0")} / {String(doctors.length).padStart(2, "0")}
            </p>
            <div className="h-px flex-1 overflow-hidden bg-[var(--color-border-strong)]" aria-hidden="true">
              <motion.span
                animate={{ scaleX: (activeIndex + 1) / doctors.length }}
                className="block h-full w-full origin-left bg-[var(--color-accent-strong)] rtl:origin-right"
                transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
              />
            </div>
            <div className="flex gap-2">
              <button
                aria-label={lang === "ar" ? "الطبيب السابق" : "Previous doctor"}
                className="flex h-11 w-11 items-center justify-center border border-[var(--color-border-strong)] text-lg text-[var(--color-heading)] transition-colors hover:border-[var(--color-accent-strong)] hover:text-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-35"
                disabled={edgeState.beginning}
                onClick={goPrevious}
                type="button"
              >
                <span aria-hidden="true">{lang === "ar" ? "→" : "←"}</span>
              </button>
              <button
                aria-label={lang === "ar" ? "الطبيب التالي" : "Next doctor"}
                className="flex h-11 w-11 items-center justify-center border border-[var(--color-border-strong)] text-lg text-[var(--color-heading)] transition-colors hover:border-[var(--color-accent-strong)] hover:text-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-35"
                disabled={edgeState.end}
                onClick={goNext}
                type="button"
              >
                <span aria-hidden="true">{lang === "ar" ? "←" : "→"}</span>
              </button>
            </div>
          </div>
        </motion.div>

        <Link
          className="mt-9 inline-flex min-h-12 items-center gap-4 border-b border-[var(--color-accent-strong)] pb-2 font-black text-[var(--color-heading)]"
          to="/doctors"
        >
          <span>{lang === "ar" ? "تعرّف على كل الأطباء" : "View all doctors"}</span>
          <span aria-hidden="true" className="editorial-arrow">
            {lang === "ar" ? "←" : "→"}
          </span>
        </Link>
      </div>
    </section>
  );
}
