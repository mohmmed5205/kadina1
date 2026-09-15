import { motion, useReducedMotion } from "framer-motion";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { fadeUp, viewportOnce } from "./motionPresets";
import RevealImage from "../components/motion/RevealImage";

export default function BeforeAfter({ t }) {
  const data = t.beforeAfter;
  const lang = t.dir === "rtl" ? "ar" : "en";
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      id="before-after"
      className="ds-section relative overflow-hidden bg-[var(--color-surface)]"
    >
      <div className="ds-container relative">
        <motion.div
          variants={fadeUp}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          className="mb-8 grid gap-5 border-b border-[var(--color-border-strong)] pb-7 lg:mb-12 lg:grid-cols-12 lg:items-end"
        >
          <div className="lg:col-span-8">
            <span className="section-title-eyebrow">{data.eyebrow}</span>
            <h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-black leading-[1.05] tracking-[-.04em] text-[var(--color-heading)]">{data.title}</h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[var(--color-text-muted)] md:text-base lg:col-span-4 lg:justify-self-end">{data.description}</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Swiper
            key={`before-after-${lang}`}
            modules={[Pagination, Navigation]}
            dir={t.dir}
            centeredSlides={false}
            loop={false}
            rewind
            slidesPerGroup={1}
            speed={shouldReduceMotion ? 0 : 650}
            pagination={{ clickable: true }}
            navigation
            spaceBetween={12}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.35, spaceBetween: 20 },
              1024: { slidesPerView: 2.5, spaceBetween: 28 },
              1440: { slidesPerView: 3.1, spaceBetween: 32 },
            }}
            className="kadina-swiper before-after-swiper !overflow-visible"
          >
            {data.cases.map((item, index) => (
              <SwiperSlide key={`${item.image}-${index}`}>
                <motion.article
                  whileHover={shouldReduceMotion ? undefined : { y: -3 }}
                  className="group h-full"
                >
                  <RevealImage className="aspect-[5/6] w-full bg-[var(--color-surface-muted)]" rtl={t.dir === "rtl"}>
                    <img
                      src={item.image}
                      alt={`${item.title}${item.doctor ? ` - ${item.doctor}` : ""}`}
                      className="h-full w-full object-contain"
                      decoding="async"
                      height="1440"
                      loading="lazy"
                      width="1080"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/kadina-logo.webp";
                        event.currentTarget.classList.add("p-12");
                      }}
                    />
                  </RevealImage>
                  <div className="border-b border-[var(--color-border-strong)] pb-5 pt-5">
                    <h3 className="text-base font-black leading-7 text-[var(--color-heading)]">{item.title}</h3>
                    {item.doctor && (
                      <p className="mt-1 text-sm font-bold text-[var(--color-accent-strong)]">{item.doctor}</p>
                    )}
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
}
