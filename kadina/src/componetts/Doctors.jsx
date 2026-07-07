import { motion } from "framer-motion";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { doctors } from "../data/doctors";
import { fadeUp, viewportOnce } from "./motionPresets";

export default function Doctors({ lang = "ar" }) {
  const data = doctors[lang] || doctors.ar;
  const isRtl = lang === "ar";

  return (
    <section id="doctors" className="relative overflow-hidden bg-[#fff7eb] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,247,235,0.95),rgba(248,234,216,0.40)_48%,rgba(255,247,235,0.95))]" />

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
            className="kadina-swiper doctors-swiper"
            navigation
            pagination={{ clickable: true }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            speed={750}
            loop={data.items.length > 4}
            spaceBetween={18}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 22,
              },
            }}
          >
            {data.items.map((doctor) => (
              <SwiperSlide key={doctor.name}>
                <motion.article
                  whileHover={{ y: -8 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[2rem] border border-[#f8aa2d]/16 bg-[#fffbf3] shadow-[0_14px_38px_rgba(76,44,0,0.08)] transition-colors duration-300 hover:border-[#f8aa2d]/40"
                >
                  <div className="relative overflow-hidden bg-gradient-to-b from-[#f8ead8] to-[#f0d9b5]">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/kadina-logo.png";
                        event.currentTarget.classList.remove("object-cover", "object-top");
                        event.currentTarget.classList.add("object-contain", "p-10");
                      }}
                      className="aspect-[4/5] w-full object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#2b1b08]/58 to-transparent" />
                  <img
                      src="/logo.png"
                      alt="Kadina"
                      className="absolute bottom-4 start-4 h-8 w-auto object-contain drop-shadow-md"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-5 py-6 text-center">
                    <h3 className="text-lg font-black leading-7 text-[#2b1b08]">
                      {doctor.name}
                    </h3>
                    <p className="mx-auto mt-3 max-w-[15rem] flex-1 text-sm font-bold leading-7 text-[#cf7d11]">
                      {doctor.specialty}
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
