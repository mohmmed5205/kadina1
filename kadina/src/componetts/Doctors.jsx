import { motion } from "framer-motion";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { doctors } from "../data/doctors";
import { fadeUp, viewportOnce } from "./motionPresets";

export default function Doctors({ lang = "ar" }) {
  const data = doctors[lang] || doctors.ar;
  const isRtl = lang === "ar";

  return (
    <section id="doctors" className="relative overflow-hidden bg-[#f8ead8] py-14 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(248,170,45,0.10),transparent_45%)]" />

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
            className="kadina-swiper dark-section-swiper doctors-swiper"
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
                  whileHover={{ y: -6 }}
                  className="group flex h-full flex-col overflow-hidden rounded-[1.5rem] border border-[#f8aa2d]/16 bg-[#fffbf3] shadow-[0_12px_30px_rgba(76,44,0,0.07)] transition-colors duration-300 hover:border-[#f8aa2d]/40 sm:rounded-[2rem]"
                >
                  <div className="relative flex h-[18rem] items-start justify-center overflow-hidden rounded-[1.5rem] bg-[#f8ead8] sm:h-[20rem] lg:h-[22rem]">
                    <img
                      src={doctor.image}
                      alt={doctor.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/logo.png";
                        event.currentTarget.classList.remove("object-cover", "object-top");
                        event.currentTarget.classList.add("object-contain", "p-10");
                      }}
                      className="h-full w-full object-contain object-top transition duration-500 sm:object-cover sm:object-top"
                    />
                    <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#2b1b08]/50 to-transparent lg:h-24" />
                    <img
                      src="/logo.png"
                      alt="Kadina"
                      className="absolute bottom-3 start-3 h-6 w-auto object-contain drop-shadow-md lg:bottom-4 lg:start-4 lg:h-8"
                    />
                  </div>

                  <div className="flex flex-1 flex-col px-4 py-4 text-center lg:px-5 lg:py-6">
                    <h3 className="text-base font-black leading-7 text-[#2b1b08] lg:text-lg">
                      {doctor.name}
                    </h3>
                    <p className="mx-auto mt-2 max-w-[15rem] flex-1 text-sm font-bold leading-6 text-[#cf7d11] lg:mt-3 lg:leading-7">
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
