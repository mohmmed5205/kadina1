import { useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { offers } from "../data/offers";
import { cardItem, staggerContainer, viewportOnce } from "./motionPresets";
import { createWhatsappUrl } from "../utils/whatsapp";
import {
  ANALYTICS_EVENTS,
  SOURCE_SECTIONS,
  trackContactAction,
} from "../utils/analytics";

function OfferLine({ item, labels }) {
  return (
    <motion.li
      variants={cardItem}
      className="rounded-[var(--radius-md)] border border-[var(--color-border-on-dark)] bg-[var(--color-surface-dark)] px-3.5 py-3.5 md:px-4 md:py-4"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-sm font-black leading-6 text-[var(--color-text-on-dark)] sm:text-base md:text-lg md:leading-7">
          {item.name}
        </p>

        <div className="flex shrink-0 items-end gap-3">
          <div className="pb-1 text-center text-[var(--color-text-on-dark-muted)]">
            <span className="block text-[0.62rem] font-black uppercase tracking-[0.12em]">
              {labels.oldPriceLabel}
            </span>
            <span className="text-lg font-black line-through decoration-[var(--color-gold-strong)] decoration-2 md:text-xl">
              {item.oldPrice}
            </span>
          </div>

          <div className="flex items-end gap-1 leading-none text-[var(--color-accent)]">
            <span className="text-[clamp(2.25rem,13vw,4.8rem)] font-black">
              {item.newPrice}
            </span>
            <span className="mb-2 text-xs font-black uppercase text-[var(--color-text-on-dark-muted)]">
              {labels.currency}
            </span>
          </div>
        </div>
      </div>
    </motion.li>
  );
}

function OfferPoster({
  offer,
  data,
  externalLabel,
  lang,
  compact = false,
}) {
  const isDense = offer.items.length > 6;
  const whatsappUrl = createWhatsappUrl(`${data.slideCta}: ${offer.title}`);

  return (
    <article className="ds-card offer-poster relative h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(48,32,18,0.72),transparent_50%,rgba(214,163,91,0.1))]" />
        <div className="absolute -end-12 -top-14 hidden h-44 w-44 rounded-full border border-[var(--color-border-strong)] sm:block" />
        <div className="absolute bottom-0 start-0 h-20 w-full bg-[linear-gradient(135deg,transparent_0_46%,rgba(214,163,91,0.14)_46%_54%,transparent_54%)]" />
      </div>

      <div className={`relative z-10 flex h-full flex-col p-4 sm:p-8 ${compact ? "lg:p-8" : "lg:p-10"}`}>
        <div className="flex flex-col items-center gap-4 text-center lg:gap-5">
          <img
            src="/logo.png"
            alt=""
            className="h-11 w-auto object-contain lg:h-14"
            decoding="async"
            height="75"
            loading="lazy"
            width="75"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/kadina-logo.png";
            }}
          />

          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="rounded-full bg-[var(--color-surface-dark)] px-4 py-1.5 text-xs font-black text-[var(--color-accent)]">
              {data.limitedBadge}
            </span>
            <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)]/70 px-4 py-1.5 text-xs font-black text-[var(--color-accent-strong)]">
              {data.limitedTime}
            </span>
          </div>

          <span className="relative inline-flex items-center justify-center">
            <span className="absolute h-8 w-40 -rotate-3 rounded-full bg-[var(--color-surface-raised)]/80 lg:h-10 lg:w-48" />
            <span className="relative rounded-full border border-[var(--color-gold-strong)] bg-[var(--color-accent)] px-5 py-1.5 text-base font-black text-[var(--color-ink)] lg:px-6 lg:py-2 lg:text-xl">
              {data.badge}
            </span>
          </span>

          <div className="rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-raised)]/75 px-5 py-3 sm:rounded-full lg:px-7">
            <h3 className="text-xl font-black leading-tight text-[var(--color-heading)] md:text-4xl">
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
          {offer.items.map((item, index) => (
            <OfferLine
              key={`${offer.id}-line-${index}`}
              item={item}
              labels={data}
            />
          ))}
        </motion.ul>

        <div className="mt-7 flex flex-col items-center justify-center gap-4 sm:flex-row lg:mt-8">
          <div className="inline-flex w-full max-w-sm flex-wrap items-center justify-center gap-2 rounded-[var(--radius-md)] border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)]/80 px-4 py-2.5 text-[var(--color-heading)] sm:w-auto sm:rounded-full">
            <FaWhatsapp className="text-[var(--color-accent-strong)]" aria-hidden="true" />
            <span className="text-xs font-black uppercase tracking-[0.12em] text-[var(--color-text-muted)]">
              {data.phoneLabel}
            </span>
            <span className="text-lg font-black sm:text-xl">{data.displayPhone}</span>
          </div>

          <motion.a
            href={whatsappUrl}
            onClick={() =>
              trackContactAction(ANALYTICS_EVENTS.WHATSAPP_CLICK, {
                language: lang,
                page_type: "home",
                source_section: SOURCE_SECTIONS.OFFERS,
              })
            }
            aria-label={`${data.slideCta} (${externalLabel})`}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-button ds-button-primary w-full max-w-sm px-6 py-3.5 text-base sm:w-auto lg:px-8 lg:py-4"
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
  compact = false,
  modal = false,
  showAvailability = true,
}) {
  const data = offers[lang] || offers.ar;
  const isRtl = lang === "ar";
  const sliderKey = modal ? `hero-offers-modal-${lang}` : `offers-${lang}`;
  const swiperRef = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeSlide, setActiveSlide] = useState({ key: sliderKey, index: 0 });
  const activeIndex = activeSlide.key === sliderKey ? activeSlide.index : 0;
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
        <div className="ds-container mb-4 flex justify-center">
          <span className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)]/70 px-4 py-2 text-xs font-black text-[var(--color-accent-strong)]">
            {data.moreAvailable}
          </span>
        </div>
      ) : null}

      {modal ? (
        <div className="mb-4 px-1">
          <div className="mb-3 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm font-black text-[var(--color-text-muted)]">{swipeText}</p>
            <p className="w-fit rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-3.5 py-1.5 text-xs font-black text-[var(--color-text)]">
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
                      ? "bg-[var(--color-accent)] text-[var(--color-ink)]"
                      : "border border-[var(--color-border)] bg-[var(--color-surface-raised)] text-[var(--color-text)]"
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
        modules={[Navigation, Pagination]}
        className={`offers-swiper ${modal ? "offers-modal-swiper" : ""}`}
        centeredSlides={true}
        loop={false}
        rewind={true}
        slidesPerGroup={1}
        navigation={modal ? false : true}
        pagination={{ clickable: true }}
        speed={shouldReduceMotion ? 0 : modal ? 600 : 750}
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
              externalLabel={
                isRtl ? "يفتح في نافذة جديدة" : "opens in a new window"
              }
              lang={lang}
              compact={compact || modal}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <p className="mt-2 text-center text-xs font-black uppercase tracking-[0.14em] text-[var(--color-text-muted)]">
        {data.swipeHint}
      </p>
    </div>
  );
}
