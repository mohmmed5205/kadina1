import { motion } from "framer-motion";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { fadeUp, viewportOnce } from "./motionPresets";

export default function BeforeAfter({ t }) {
  const data = t.beforeAfter;
  const lang = t.dir === "rtl" ? "ar" : "en";

  return (
    <section
      id="before-after"
      className="relative overflow-hidden bg-[#f8ead8] py-14 sm:py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,170,45,0.11),transparent_42%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-8 max-w-3xl text-center lg:mb-12"
        >
          <span className="section-eyebrow">{data.eyebrow}</span>
          <h2 className="dark-section-title mt-4 text-2xl font-black sm:text-3xl lg:mt-6 lg:text-5xl">
            {data.title}
          </h2>
          <p className="dark-section-description mt-4 text-base leading-8 md:text-lg">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
        >
          <Swiper
            key={`before-after-${lang}`}
            modules={[Autoplay, Pagination, Navigation]}
            dir={t.dir}
            centeredSlides={false}
            loop={false}
            rewind
            slidesPerGroup={1}
            speed={650}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{ clickable: true }}
            navigation
            spaceBetween={14}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.25, spaceBetween: 18 },
              1024: { slidesPerView: 2.4, spaceBetween: 24 },
              1280: { slidesPerView: 3.1, spaceBetween: 28 },
            }}
            className="kadina-swiper dark-section-swiper before-after-swiper"
          >
            {data.cases.map((item) => (
              <SwiperSlide key={`${item.title}-${item.doctor || ""}`}>
                <motion.article
                  whileHover={{ y: -5 }}
                  className="group h-full overflow-hidden rounded-[1.5rem] border border-[#f8aa2d]/20 bg-[#fff7eb] p-3 shadow-[0_12px_30px_rgba(0,0,0,0.14)] transition-colors duration-300 hover:border-[#f8aa2d]/45 sm:rounded-[2rem] sm:p-4"
                >
                  <div className="aspect-[4/5] w-full overflow-hidden rounded-[1.5rem] bg-[#f8ead8]">
                    <img
                      src={item.image}
                      alt={`${item.title}${item.doctor ? ` - ${item.doctor}` : ""}`}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/kadina-logo.png";
                        event.currentTarget.classList.add("p-12");
                      }}
                    />
                  </div>
                  <div className="px-2 pb-1 pt-4">
                    <h3 className="font-black leading-7 text-[#2b1b08]">{item.title}</h3>
                    {item.doctor && (
                      <p className="mt-1 text-sm font-bold text-[#cf7d11]">{item.doctor}</p>
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
