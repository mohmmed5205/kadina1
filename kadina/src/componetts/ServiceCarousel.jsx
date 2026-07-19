import { motion } from "framer-motion";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

function DeviceCard({ item }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="group flex h-full flex-col rounded-[1.7rem] border border-[#f8aa2d]/20 bg-[#fffbf3] p-4 shadow-[0_14px_34px_rgba(76,44,0,0.08)] lg:p-5"
    >
      <div className="flex h-[13rem] items-center justify-center overflow-hidden rounded-[1.5rem] bg-[#fff7eb] p-3 sm:h-[15rem] lg:h-[17rem]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="max-h-full w-full scale-110 object-contain transition duration-500 sm:scale-105 lg:scale-100"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/logo.png";
          }}
        />
      </div>

      <div className="flex flex-1 flex-col pt-4">
        <h4 className="text-base font-black leading-7 text-[#2b1b08] lg:text-lg">
          {item.name}
        </h4>
        <p className="mt-2 flex-1 text-sm font-semibold leading-7 text-[#4c2c00]/70">
          {item.description}
        </p>
      </div>
    </motion.article>
  );
}

function DoctorCard({ item }) {
  return (
    <motion.article
      whileHover={{ y: -5 }}
      className="group flex h-full flex-col overflow-hidden rounded-[1.7rem] border border-[#f8aa2d]/20 bg-[#fffbf3] shadow-[0_14px_34px_rgba(76,44,0,0.08)]"
    >
      <div className="relative flex h-[18rem] items-start justify-center overflow-hidden rounded-[1.5rem] bg-[#f8ead8] sm:h-[20rem] lg:h-[22rem]">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-contain object-top transition duration-500 sm:object-cover sm:object-top"
          onError={(event) => {
            event.currentTarget.onerror = null;
            event.currentTarget.src = "/logo.png";
            event.currentTarget.classList.remove("object-cover", "object-top");
            event.currentTarget.classList.add("object-contain", "p-10");
          }}
        />
      </div>

      <div className="flex flex-1 flex-col p-4 text-center lg:p-5">
        <h4 className="text-base font-black leading-7 text-[#2b1b08] lg:text-lg">
          {item.name}
        </h4>
        <p className="mx-auto mt-2 max-w-[17rem] flex-1 text-sm font-bold leading-7 text-[#4c2c00]/70">
          {item.specialty}
        </p>
      </div>
    </motion.article>
  );
}

function ServiceCard({ item, type }) {
  return type === "doctor" ? <DoctorCard item={item} /> : <DeviceCard item={item} />;
}

export default function ServiceCarousel({
  title,
  items = [],
  type = "device",
  lang = "ar",
  emptyMessage,
  carouselKey,
}) {
  const isRtl = lang === "ar";
  const hasMultipleItems = items.length > 1;
  const singleCardWidth = type === "doctor" ? "max-w-sm" : "max-w-md";

  return (
    <section className="overflow-hidden rounded-[1.5rem] border border-[#f8aa2d]/20 bg-[#fff7eb]/80 p-4 shadow-sm sm:rounded-[2rem] sm:p-5 sm:shadow-[0_16px_38px_rgba(76,44,0,0.07)] lg:p-7">
      <div className="mb-5 flex items-center justify-between gap-4 lg:mb-6">
        <h3 className="text-2xl font-black leading-tight text-[#2b1b08] md:text-3xl">
          {title}
        </h3>
      </div>

      {items.length === 0 ? (
        <p className="rounded-2xl border border-[#f8aa2d]/22 bg-white/60 p-5 text-sm font-bold text-[#4c2c00]/70">
          {emptyMessage}
        </p>
      ) : hasMultipleItems ? (
        <Swiper
          key={carouselKey || `${lang}-${type}-${title}`}
          modules={[Autoplay, Pagination, Navigation]}
          dir={isRtl ? "rtl" : "ltr"}
          centeredSlides={false}
          loop={false}
          rewind={true}
          slidesPerGroup={1}
          speed={700}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          spaceBetween={16}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1.35,
              spaceBetween: 18,
            },
            1024: {
              slidesPerView: 2.4,
              spaceBetween: 22,
            },
            1280: {
              slidesPerView: 3.2,
              spaceBetween: 24,
            },
          }}
          className={`service-carousel-swiper service-carousel-swiper-${type}`}
        >
          {items.map((item) => (
            <SwiperSlide key={`${type}-${item.name}`}>
              <ServiceCard item={item} type={type} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <div className={`mx-auto ${singleCardWidth}`}>
          <ServiceCard item={items[0]} type={type} />
        </div>
      )}
    </section>
  );
}
