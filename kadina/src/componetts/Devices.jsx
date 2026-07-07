import { motion } from "framer-motion";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { devices } from "../data/devices";
import { fadeUp, viewportOnce } from "./motionPresets";

export default function Devices({ lang = "ar" }) {
  const data = devices[lang] || devices.ar;
  const isRtl = lang === "ar";

  return (
    <section id="devices" className="relative overflow-hidden bg-[#f8ead8] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.64),rgba(248,234,216,0.42)_45%,rgba(76,44,0,0.06))]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="section-eyebrow">{data.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {data.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
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
            key={lang}
            dir={isRtl ? "rtl" : "ltr"}
            modules={[Autoplay, Navigation, Pagination]}
            className="kadina-swiper devices-swiper"
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={750}
            loop={data.items.length > 3}
            spaceBetween={18}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 22,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
          >
            {data.items.map((device) => (
              <SwiperSlide key={device.name}>
                <motion.article
                  whileHover={{ y: -8 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#f8aa2d]/18 bg-[#fffbf3] shadow-[0_14px_40px_rgba(76,44,0,0.08)] transition-colors duration-300 hover:border-[#f8aa2d]/42"
                >
                  <div className="relative flex min-h-72 items-center justify-center overflow-hidden bg-gradient-to-b from-[#fff7eb] to-[#f8ead8] p-6">
                    <img
                      src={device.image}
                      alt={device.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/kadina-logo.png";
                      }}
                      className="h-64 w-full object-contain transition duration-500 group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-6 py-6">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-lg font-black leading-7 text-[#2b1b08]">
                        {device.name}
                      </h3>
                      <span className="shrink-0 rounded-full border border-[#f8aa2d]/20 bg-[#f8aa2d]/12 px-3 py-1 text-xs font-black tracking-[0.12em] text-[#cf7d11]">
                        KADINA
                      </span>
                    </div>
                    <p className="flex-1 text-sm font-semibold leading-7 text-[#4c2c00]/70">
                      {device.description}
                    </p>
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
