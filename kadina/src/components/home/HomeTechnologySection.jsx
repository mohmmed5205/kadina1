import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SectionTitle from "../common/SectionTitle";
import { fadeUp, viewportOnce } from "../../componetts/motionPresets";
import { getDeviceSummaries } from "../../data/devices";

export default function HomeTechnologySection() {
  const { lang, t } = useOutletContext();
  const devices = getDeviceSummaries(lang);
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [edgeState, setEdgeState] = useState({ beginning: true, end: false });
  const shouldReduceMotion = useReducedMotion();
  const en = lang === "en";

  const syncSwiperState = (swiper) => {
    setActiveIndex(swiper.activeIndex);
    setEdgeState({ beginning: swiper.isBeginning, end: swiper.isEnd });
  };

  // Describe the panel's visual position independently of document direction.
  // Native Swiper dragging remains physically tied to the user's finger.
  const goVisualLeft = () => {
    if (en) swiperRef.current?.slidePrev();
    else swiperRef.current?.slideNext();
  };

  const goVisualRight = () => {
    if (en) swiperRef.current?.slideNext();
    else swiperRef.current?.slidePrev();
  };

  const leftDisabled = en ? edgeState.beginning : edgeState.end;
  const rightDisabled = en ? edgeState.end : edgeState.beginning;

  return (
    <section
      className="ds-section scroll-mt-24 overflow-hidden bg-[var(--color-warm-beige-strong)]"
      id="technology"
    >
      <div className="ds-container">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <SectionTitle
              eyebrow={en ? "Technology & Devices" : "الأجهزة والتقنيات"}
              title={
                en
                  ? "Technology, considered as part of every care decision"
                  : "التقنية جزء من قرار العناية"
              }
            />
          </div>
          <p className="max-w-md text-base leading-8 text-[var(--color-text-muted)] lg:col-span-4 lg:justify-self-end lg:text-lg">
            {en
              ? "Explore each device, its role and the service journey it supports."
              : "تعرّف على كل جهاز، ودوره، ورحلة الخدمة التي يدعمها."}
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
            aria-label={en ? "Kadina devices" : "أجهزة كادينا"}
            breakpoints={{
              640: { slidesPerView: 1.55, spaceBetween: 20 },
              768: { slidesPerView: 1.8, spaceBetween: 22 },
              1024: { slidesPerView: 2.45, spaceBetween: 26 },
              1440: { slidesPerView: 3, spaceBetween: 30 },
            }}
            className="!overflow-visible"
            dir={t.dir}
            grabCursor
            key={`home-technology-${lang}`}
            onSlideChange={syncSwiperState}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              syncSwiperState(swiper);
            }}
            resistanceRatio={0.72}
            slidesPerView={1.15}
            spaceBetween={16}
            speed={shouldReduceMotion ? 0 : 620}
          >
            {devices.map((device, index) => {
              const primaryName = en ? device.englishName : device.arabicName;
              const secondaryName = en ? device.arabicName : device.englishName;

              return (
                <SwiperSlide key={device.slug}>
                  <article className="group flex h-full flex-col bg-[var(--color-surface)] transition-colors duration-300 hover:bg-[var(--color-surface-raised)]">
                    <Link
                      aria-label={`${en ? "View device" : "عرض جهاز"} ${primaryName}`}
                      className="flex h-full flex-col focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-strong)]"
                      to={`/technology/${device.slug}`}
                    >
                      <div className="relative flex aspect-[4/5] items-center justify-center overflow-hidden border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-3 sm:p-4 lg:aspect-[5/6]">
                        <span
                          aria-hidden="true"
                          className="absolute start-5 top-4 text-xs font-black tracking-[.12em] text-[var(--color-accent-strong)]"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <img
                          alt={`${device.arabicName} — ${device.englishName}`}
                          className="h-[92%] w-[94%] object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                          decoding="async"
                          height="1000"
                          loading="lazy"
                          src={device.image}
                          width="800"
                        />
                      </div>
                      <div className="relative flex flex-1 flex-col border-b border-[var(--color-border-strong)] px-1 py-6 transition-[border-color] duration-300 group-hover:border-[var(--color-accent-strong)]">
                        <p className="text-xs font-black tracking-[.1em] text-[var(--color-accent-strong)]">
                          {device.category}
                        </p>
                        <h3 className="mt-3 text-[clamp(1.6rem,2.4vw,2.35rem)] font-black leading-tight text-[var(--color-heading)]">
                          {primaryName}
                        </h3>
                        {secondaryName ? (
                          <p
                            className="mt-2 text-sm font-bold text-[var(--color-text-muted)]"
                            dir={en ? "rtl" : "ltr"}
                          >
                            {secondaryName}
                          </p>
                        ) : null}
                        <span className="mt-auto inline-flex min-h-11 items-end gap-3 pt-5 text-sm font-black text-[var(--color-accent-strong)]">
                          {en ? "Details" : "التفاصيل"}
                          <span aria-hidden="true" className="editorial-arrow">
                            {en ? "→" : "←"}
                          </span>
                        </span>
                      </div>
                    </Link>
                  </article>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className="mt-8 flex items-center gap-4 border-t border-[var(--color-border-strong)] pt-5 sm:gap-5">
            <p
              aria-live="polite"
              className="min-w-[4.5rem] text-sm font-black tracking-[.1em] text-[var(--color-heading)]"
            >
              {String(activeIndex + 1).padStart(2, "0")} / {String(devices.length).padStart(2, "0")}
            </p>
            <div
              aria-hidden="true"
              className="h-px flex-1 overflow-hidden bg-[var(--color-border-strong)]"
            >
              <motion.span
                animate={{ scaleX: (activeIndex + 1) / devices.length }}
                className="block h-full w-full origin-left bg-[var(--color-accent-strong)] rtl:origin-right"
                transition={{ duration: shouldReduceMotion ? 0 : 0.35 }}
              />
            </div>
            <div className="flex gap-2">
              <button
                aria-label={en ? "Show the device on the left" : "إظهار الجهاز الموجود يسارًا"}
                className="flex h-11 w-11 items-center justify-center border border-[var(--color-border-strong)] text-lg text-[var(--color-heading)] transition-colors hover:border-[var(--color-accent-strong)] hover:text-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-35"
                disabled={leftDisabled}
                onClick={goVisualLeft}
                type="button"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                aria-label={en ? "Show the device on the right" : "إظهار الجهاز الموجود يمينًا"}
                className="flex h-11 w-11 items-center justify-center border border-[var(--color-border-strong)] text-lg text-[var(--color-heading)] transition-colors hover:border-[var(--color-accent-strong)] hover:text-[var(--color-accent-strong)] disabled:cursor-not-allowed disabled:opacity-35"
                disabled={rightDisabled}
                onClick={goVisualRight}
                type="button"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </motion.div>

        <Link
          className="group mt-9 inline-flex min-h-12 items-center gap-4 border-b border-[var(--color-accent-strong)] pb-2 font-black text-[var(--color-heading)]"
          to="/technology"
        >
          <span>{en ? "View all devices" : "عرض جميع الأجهزة"}</span>
          <span aria-hidden="true" className="editorial-arrow">
            {en ? "→" : "←"}
          </span>
        </Link>
      </div>
    </section>
  );
}
