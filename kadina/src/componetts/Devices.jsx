import { motion } from "framer-motion";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { devices } from "../data/devices";
import { fadeUp, viewportOnce } from "./motionPresets";

export default function Devices({ lang = "ar" }) {
  const data = devices[lang] || devices.ar;
  const isRtl = lang === "ar";

  return (
    <section id="devices" className="relative overflow-hidden bg-[#f8ead8] py-14 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(248,170,45,0.09),transparent_48%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-8 max-w-3xl text-center lg:mb-12"
        >
          <span className="section-eyebrow">{data.eyebrow}</span>
          <h2 className="dark-section-title mt-4 text-2xl font-black leading-tight sm:text-3xl lg:mt-6 lg:text-5xl">
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
            key={lang}
            dir={isRtl ? "rtl" : "ltr"}
            modules={[Autoplay, Navigation, Pagination]}
            className="kadina-swiper dark-section-swiper devices-swiper"
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={750}
            loop={false}
            rewind={true}
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
                  whileHover={{ y: -6 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#f8aa2d]/18 bg-[#fffbf3] shadow-[0_12px_32px_rgba(76,44,0,0.07)] transition-colors duration-300 hover:border-[#f8aa2d]/42 sm:rounded-[2rem]"
                >
                  <div className="flex h-[13rem] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#fff7eb] p-3 sm:h-[15rem] lg:h-[17rem]">
                    <img
                      src={device.image}
                      alt={device.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/logo.png";
                      }}
                      className="max-h-full w-full scale-110 object-contain transition duration-500 sm:scale-105 lg:scale-100"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-4 py-4 lg:px-6 lg:py-6">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <h3 className="text-base font-black leading-7 text-[#2b1b08] lg:text-lg">
                        {device.name}
                      </h3>
                      <img
                        src="/logo.png"
                        alt="Kadina"
                        className="h-6 w-auto shrink-0 object-contain lg:h-7"
                        onError={(event) => {
                          event.currentTarget.onerror = null;
                          event.currentTarget.src = "/kadina-logo.png";
                        }}
                      />
                    </div>
                    <p className="flex-1 text-sm font-semibold leading-6 text-[#4c2c00]/70 lg:leading-7">
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
