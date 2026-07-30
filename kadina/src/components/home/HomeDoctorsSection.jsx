import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SectionTitle from "../common/SectionTitle";
import { fadeUp, viewportOnce } from "../../componetts/motionPresets";
import { doctorDetails } from "../../data/doctors";

export default function HomeDoctorsSection() {
  const swiperRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="scroll-mt-24 bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      id="doctors"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          title="نخبة الاستشاريين.. تحت سقف واحد"
        />

        <motion.div
          className="mt-9"
          initial="hidden"
          variants={fadeUp}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <Swiper
            modules={[Autoplay]}
            aria-label="أطباء مركز كادينا"
            className="home-card-swiper"
            dir="rtl"
            loop={true}
            grabCursor={true}
            slidesPerView={1}
            spaceBetween={20}
            autoplay={
              shouldReduceMotion
                ? false
                : {
                    delay: 3000,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: true,
                  }
            }
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              768: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 28 },
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onMouseEnter={() => swiperRef.current?.autoplay?.stop()}
            onMouseLeave={() =>
              !shouldReduceMotion && swiperRef.current?.autoplay?.start()
            }
            onFocusCapture={() => swiperRef.current?.autoplay?.stop()}
            onBlurCapture={(event) => {
              if (
                !event.currentTarget.contains(event.relatedTarget) &&
                !shouldReduceMotion
              ) {
                swiperRef.current?.autoplay?.start();
              }
            }}
          >
            {doctorDetails.map((doctor) => (
              <SwiperSlide key={doctor.slug}>
                <Link
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] shadow-[0_18px_45px_rgba(76,44,0,0.08)] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                  to={`/doctors/${doctor.slug}`}
                  tabIndex={0}
                >
                  <div className="flex aspect-[4/5] min-h-[220px] w-full items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(248,170,45,0.24),rgba(255,247,235,0.85))] md:min-h-[260px]">
                    {doctor.image ? (
                      <img
                        alt={doctor.name}
                        className="h-full w-full object-cover object-top"
                        decoding="async"
                        height="1440"
                        loading="lazy"
                        src={doctor.image}
                        width="1080"
                      />
                    ) : (
                      <span className="max-w-52 p-6 text-center text-2xl font-black leading-relaxed text-[#4c2c00]">
                        {doctor.name}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black text-[#4c2c00]">
                      {doctor.name}
                    </h3>
                    <p className="mt-3 leading-7 text-[#4c2c00]/70">
                      {doctor.specialty}
                    </p>
                    <span className="mt-5 inline-block font-black text-[#cf7d11]">
                      الملف التعريفي
                    </span>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        <div className="mt-8 text-center">
          <Link
            className="inline-block font-black text-[#cf7d11] underline decoration-[#f8aa2d]/40 underline-offset-8"
            to="/doctors"
          >
            تعرّف على كل الأطباء
          </Link>
        </div>
      </div>
    </section>
  );
}
