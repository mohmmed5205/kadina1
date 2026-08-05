import { useRef } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import SectionTitle from "../common/SectionTitle";
import { fadeUp } from "../../componetts/motionPresets";
import { getDeviceSummaries } from "../../data/devices";

export default function HomeTechnologySection() {
  const { lang } = useOutletContext();
  const swiperRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const localizedDevices = getDeviceSummaries(lang);

  return (
    <section
      className="scroll-mt-24 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      id="technology"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow={lang === "ar" ? "الأجهزة والتقنيات" : "Technology & Devices"}
          title={lang === "ar" ? "ترسانة تقنية لا تجدها مجتمعة في مكان آخر" : "Advanced technology brought together in one place"}
          description={lang === "ar" ? "الجهاز وحده لا يصنع النتيجة — الجهاز الصحيح بيد الاستشاري الصحيح يصنع كل الفرق." : "A device alone does not create the result—the right device in the right consultant's hands makes all the difference."}
        />

        <motion.div
          key={lang}
          className="mt-9"
          initial="hidden"
          animate="visible"
          variants={fadeUp}
        >
          <Swiper
            key={`technology-${lang}`}
            modules={[Autoplay]}
            aria-label={lang === "ar" ? "أجهزة كادينا الطبية" : "Kadina medical devices"}
            className="home-card-swiper"
            dir={lang === "ar" ? "rtl" : "ltr"}
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
            {localizedDevices.map((device) => (
              <SwiperSlide key={device.slug}>
                <Link
                  className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] shadow-[0_18px_45px_rgba(76,44,0,0.07)] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55"
                  to={`/technology/${device.slug}`}
                  tabIndex={0}
                >
                  <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-white/70 p-4">
                    {device.image ? (
                      <img
                        alt={device.displayName}
                        className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                        decoding="async"
                        loading="lazy"
                        src={device.image}
                      />
                    ) : (
                      <span className="p-6 text-center text-xl font-black text-[#4c2c00]">
                        {device.displayName}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-black text-[#4c2c00]">
                      {device.displayName}
                    </h3>
                    {device.englishName && (
                      <p
                        className="mt-2 text-sm font-bold text-[#cf7d11]"
                        dir="ltr"
                      >
                        {device.englishName}
                      </p>
                    )}
                    <p className="mt-3 leading-7 text-[#4c2c00]/70">
                      {device.cardDescription}
                    </p>
                    <span className="mt-5 inline-block font-black text-[#cf7d11]">
                      {lang === "ar" ? "تفاصيل الجهاز" : "Device Details"}
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
            to="/technology"
          >
            {lang === "ar" ? "كل الأجهزة" : "View All Devices"}
          </Link>
        </div>
      </div>
    </section>
  );
}
