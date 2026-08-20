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
      className="ds-section relative overflow-hidden bg-[var(--color-surface-dark)]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,170,45,0.11),transparent_42%)]" />

      <div className="ds-container relative">
        <motion.div
          variants={fadeUp}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-8 max-w-3xl text-center lg:mb-12"
        >
          <span className="section-eyebrow">{data.eyebrow}</span>
          <h2 className="on-dark-heading mt-4 text-[var(--text-heading)] font-black leading-[var(--leading-heading)] lg:mt-6">
            {data.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-text-on-dark-muted)] md:text-lg">
            {data.description}
          </p>
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
              640: { slidesPerView: 1.25, spaceBetween: 18 },
              1024: { slidesPerView: 2.4, spaceBetween: 24 },
              1280: { slidesPerView: 3.1, spaceBetween: 28 },
            }}
            className="kadina-swiper dark-section-swiper before-after-swiper"
          >
            {data.cases.map((item, index) => (
              <SwiperSlide key={`${item.image}-${index}`}>
                <motion.article
                  whileHover={shouldReduceMotion ? undefined : { y: -5 }}
                  className="premium-card group h-full p-3 sm:p-4"
                >
                  <RevealImage className="aspect-[4/5] w-full rounded-[var(--radius-md)] bg-[var(--color-warm-beige)]" rtl={t.dir === "rtl"}>
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
                  <div className="px-2 pb-1 pt-4">
                    <h3 className="font-black leading-7 text-[var(--color-heading)]">{item.title}</h3>
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
