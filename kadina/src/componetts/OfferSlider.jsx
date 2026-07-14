import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { offers } from "../data/offers";
import { cardItem, staggerContainer, viewportOnce } from "./motionPresets";

function OfferLine({ item, labels }) {
  return (
    <motion.li
      variants={cardItem}
      className="rounded-[1.35rem] bg-[#f90062] px-3.5 py-3.5 shadow-[0_12px_24px_rgba(249,0,98,0.18)] md:rounded-[2rem] md:px-4 md:py-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-black leading-6 text-white sm:text-base md:text-lg md:leading-7">
          {item.name}
        </p>

        <div className="flex shrink-0 items-end gap-3">
          <div className="pb-1 text-center text-white/72">
            <span className="block text-[0.62rem] font-black uppercase tracking-[0.12em]">
              {labels.oldPriceLabel}
            </span>
            <span className="text-lg font-black line-through decoration-[#2b1b08]/55 decoration-2 md:text-xl">
              {item.oldPrice}
            </span>
          </div>

          <div className="flex items-end gap-1 leading-none text-[#ffc400] drop-shadow-[0_3px_0_rgba(43,27,8,0.25)]">
            <span className="text-[clamp(2.25rem,13vw,4.8rem)] font-black">
              {item.newPrice}
            </span>
            <span className="mb-2 text-xs font-black uppercase text-[#ffe79a]">
              {labels.currency}
            </span>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

function OfferPoster({ offer, data, centerName, whatsappUrl, compact = false }) {
  const isDense = offer.items.length > 6;

  return (
    <article className="relative h-full overflow-hidden rounded-[1.75rem] border border-[#f8aa2d]/24 bg-[#ffe6c9] shadow-[0_12px_30px_rgba(76,44,0,0.10)] sm:rounded-[2.5rem] lg:shadow-[0_24px_70px_rgba(76,44,0,0.14)]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.58),transparent_46%,rgba(255,0,102,0.09))]" />
        <div className="absolute -right-12 -top-14 hidden h-44 w-44 rounded-full border-[18px] border-[#ffc400]/22 sm:block" />
        <div className="absolute bottom-0 left-0 h-20 w-full bg-[linear-gradient(135deg,transparent_0_45%,rgba(255,196,0,0.25)_45%_55%,transparent_55%)]" />
      </div>

      <div className={`relative z-10 flex h-full flex-col p-4 sm:p-8 ${compact ? "lg:p-8" : "lg:p-10"}`}>
        <div className="flex flex-col items-center gap-4 text-center lg:gap-5">
          <img
            src="/logo.png"
            alt={centerName}
            className="h-11 w-auto object-contain lg:h-14"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/kadina-logo.png";
            }}
          />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-[#2b1b08] px-4 py-1.5 text-xs font-black text-[#ffc400] shadow-sm">
              {data.limitedBadge}
            </span>
            <span className="rounded-full border border-[#f90062]/20 bg-white/70 px-4 py-1.5 text-xs font-black text-[#f90062]">
              {data.limitedTime}
            </span>
          </div>

          <span className="relative inline-flex items-center justify-center">
            <span className="absolute h-8 w-40 -rotate-3 rounded-full bg-[#ffc400]/90 lg:h-10 lg:w-48" />
            <span className="relative rounded-full bg-[#ff0066] px-5 py-1.5 text-base font-black text-white shadow-[0_10px_24px_rgba(249,0,98,0.28)] lg:px-6 lg:py-2 lg:text-xl">
              {data.badge}
            </span>
          </span>

          <div className="rounded-[1.4rem] bg-[#f90062] px-5 py-3 shadow-[0_14px_34px_rgba(249,0,98,0.25)] sm:rounded-full lg:px-7">
            <h3 className="text-xl font-black leading-tight text-white md:text-4xl">
              {offer.title}
            </h3>
          </div>
        </div>

        <motion.ul
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className={`mt-6 grid gap-3 lg:mt-9 lg:gap-4 ${
            isDense
              ? "max-h-[21rem] overflow-y-auto overscroll-contain pe-1 lg:max-h-none lg:grid-cols-2 lg:overflow-visible lg:pe-0"
              : ""
          }`}
        >
          {offer.items.map((item) => (
            <OfferLine
              key={`${offer.id}-${item.name}-${item.newPrice}`}
              item={item}
              labels={data}
            />
          ))}
        </motion.ul>

        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row lg:mt-8">
          <div className="inline-flex w-full max-w-sm flex-wrap items-center justify-center gap-2 rounded-2xl border-2 border-[#ffc400] bg-white/80 px-4 py-2.5 text-[#2b1b08] shadow-sm sm:w-auto sm:rounded-full">
            <FaWhatsapp className="text-[#f90062]" aria-hidden="true" />
            <span className="text-xs font-black uppercase tracking-[0.12em] text-[#4c2c00]/55">
              {data.phoneLabel}
            </span>
            <span className="text-lg font-black sm:text-xl">{data.displayPhone}</span>
          </div>

          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-[#f90062] px-6 py-3.5 text-base font-black text-white shadow-[0_18px_42px_rgba(249,0,98,0.30)] transition-colors duration-300 hover:bg-[#cf7d11] sm:w-auto lg:px-8 lg:py-4"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWhatsapp aria-hidden="true" />
            <span>{data.slideCta}</span>
          </motion.a>
        </div>
      </div>
    </article>
  );
}

export default function OfferSlider({
  lang = "ar",
  t,
  compact = false,
  modal = false,
  showAvailability = true,
}) {
  const data = offers[lang] || offers.ar;
  const isRtl = lang === "ar";
  const sliderKey = modal ? `hero-offers-modal-${lang}` : `offers-${lang}`;
  const swiperRef = useRef(null);
  const [activeSlide, setActiveSlide] = useState({ key: sliderKey, index: 0 });
  const activeIndex = activeSlide.key === sliderKey ? activeSlide.index : 0;
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;
  const totalOffers = data.cards.length;
  const counterText =
    lang === "ar"
      ? `عرض ${activeIndex + 1} من ${totalOffers}`
      : `Offer ${activeIndex + 1} of ${totalOffers}`;
  const swipeText =
    lang === "ar" ? "اسحب لمشاهدة المزيد من العروض" : "Swipe to see more offers";

  const handleSlideChange = (swiper) => {
    setActiveSlide({
      key: sliderKey,
      index: swiper.realIndex ?? swiper.activeIndex ?? 0,
    });
  };

  const handleTabClick = (index) => {
    setActiveSlide({ key: sliderKey, index });
    swiperRef.current?.slideTo(index);
  };

  return (
    <div className={modal ? "offers-modal relative" : "relative"}>
      {showAvailability ? (
        <div className="mx-auto mb-4 flex max-w-7xl justify-center px-4">
          <span className="rounded-full border border-[#f90062]/18 bg-white/70 px-4 py-2 text-xs font-black text-[#f90062] shadow-sm">
            {data.moreAvailable}
          </span>
        </div>
      ) : null}

      {modal ? (
        <div className="mb-4 px-1">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-black text-[#4c2c00]/70">{swipeText}</p>
            <p className="w-fit rounded-full border border-[#f8aa2d]/25 bg-[#fff7eb] px-3.5 py-1.5 text-xs font-black text-[#4c2c00]">
              {counterText}
            </p>
          </div>

          <div className="scrollbar-hide flex gap-2 overflow-x-auto px-1 pb-2">
            {data.cards.map((offer, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={offer.id}
                  type="button"
                  onClick={() => handleTabClick(index)}
                  className={`shrink-0 rounded-full px-4 py-2 text-sm font-black transition-colors duration-200 ${
                    isActive
                      ? "bg-[#f8aa2d] text-[#2b1b08]"
                      : "border border-[#f8aa2d]/25 bg-[#fff7eb] text-[#4c2c00]"
                  }`}
                  aria-current={isActive ? "true" : undefined}
                >
                  {offer.tabTitle || offer.title}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <Swiper
        key={sliderKey}
        dir={isRtl ? "rtl" : "ltr"}
        modules={[Autoplay, Navigation, Pagination]}
        className={`offers-swiper ${modal ? "offers-modal-swiper" : ""}`}
        centeredSlides={true}
        loop={false}
        rewind={true}
        slidesPerGroup={1}
        navigation={modal ? false : true}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        speed={modal ? 600 : 750}
        spaceBetween={modal ? 12 : 16}
        slidesPerView={modal ? 1.03 : 1.05}
        watchSlidesProgress={true}
        observer={true}
        observeParents={true}
        resistanceRatio={modal ? 0.7 : 0.65}
        threshold={8}
        touchRatio={1}
        simulateTouch={true}
        allowTouchMove={true}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        breakpoints={{
          640: {
            slidesPerView: modal ? 1.12 : 1.15,
            spaceBetween: modal ? 18 : 20,
            navigation: true,
          },
          1024: {
            slidesPerView: 1.35,
            spaceBetween: modal ? 26 : 28,
            navigation: true,
          },
          1280: {
            slidesPerView: modal ? 1.45 : 1.55,
            spaceBetween: modal ? 30 : 32,
            navigation: true,
          },
        }}
      >
        {data.cards.map((offer) => (
          <SwiperSlide key={offer.id}>
            <OfferPoster
              offer={offer}
              data={data}
              centerName={t.center.name}
              whatsappUrl={whatsappUrl}
              compact={compact || modal}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="mt-2 text-center text-xs font-black uppercase tracking-[0.14em] text-[#4c2c00]/55">
        {data.swipeHint}
      </p>
    </div>
  );
}
