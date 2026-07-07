import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { FaWhatsapp } from "react-icons/fa";
import { offers } from "../data/offers";
import {
  cardItem,
  fadeUp,
  smoothEase,
  staggerContainer,
  viewportOnce,
} from "./motionPresets";

function SummerSun() {
  const rays = [
    "left-1/2 top-[-2.1rem] h-9 w-2 -translate-x-1/2",
    "left-1/2 bottom-[-2.1rem] h-9 w-2 -translate-x-1/2",
    "right-[-2.1rem] top-1/2 h-2 w-9 -translate-y-1/2",
    "left-[-2.1rem] top-1/2 h-2 w-9 -translate-y-1/2",
    "right-[-1.45rem] top-[-1.1rem] h-8 w-2 rotate-45",
    "left-[-1.45rem] top-[-1.1rem] h-8 w-2 -rotate-45",
    "right-[-1.45rem] bottom-[-1.1rem] h-8 w-2 -rotate-45",
    "left-[-1.45rem] bottom-[-1.1rem] h-8 w-2 rotate-45",
  ];

  return (
    <div className="absolute right-[7%] top-10 hidden h-24 w-24 rounded-full border-[10px] border-[#ffc400]/80 opacity-70 md:block">
      <div className="absolute inset-4 rounded-full border-[7px] border-[#ffc400]/80" />
      {rays.map((className) => (
        <span
          key={className}
          className={clsx("absolute rounded-full bg-[#ffc400]/80", className)}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

function OfferLine({ item, labels }) {
  return (
    <motion.li
      variants={cardItem}
      className="rounded-[1.6rem] bg-[#f90062] px-4 py-4 shadow-[0_12px_28px_rgba(249,0,98,0.20)] md:rounded-[2rem]"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="text-base font-black leading-7 text-white md:text-lg">
          {item.name}
        </p>

        <div className="flex shrink-0 items-end gap-3">
          <div className="pb-1 text-center text-white/72">
            <span className="block text-[0.62rem] font-black uppercase tracking-[0.12em]">
              {labels.oldPriceLabel}
            </span>
            <span className="text-xl font-black line-through decoration-[#2b1b08]/55 decoration-2">
              {item.oldPrice}
            </span>
          </div>

          <div className="flex items-end gap-1 leading-none text-[#ffc400] drop-shadow-[0_3px_0_rgba(43,27,8,0.25)]">
            <span className="text-[clamp(2.45rem,8vw,4.8rem)] font-black">
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

export default function Offers({ lang = "ar", t }) {
  const data = offers[lang] || offers.ar;
  const [activeId, setActiveId] = useState(data.cards[0].id);
  const activeOffer = data.cards.find((card) => card.id === activeId) || data.cards[0];
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;
  const isDense = activeOffer.items.length > 6;

  return (
    <section
      id="offers"
      dir={data === offers.ar ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#fff0d8] py-24 text-[#2b1b08] sm:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.94),rgba(255,230,199,0.72)_48%,rgba(255,0,102,0.08))]" />
        <SummerSun />
        <div className="absolute -left-24 top-16 h-52 w-52 rounded-full border-[18px] border-[#ff0066]/10" />
        <div className="absolute -bottom-24 right-[-4rem] h-72 w-72 rounded-full bg-[#ff0066]/12 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-36 w-full bg-[radial-gradient(ellipse_at_bottom,rgba(255,196,0,0.22),transparent_62%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-10 max-w-3xl text-center"
        >
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-[1.4rem] border border-[#f8aa2d]/30 bg-white/78 shadow-[0_16px_42px_rgba(76,44,0,0.12)]">
            <img
              src="/kadina-logo.png"
              alt={t.center.name}
              className="h-14 w-14 object-contain"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/logo.png";
              }}
            />
          </div>

          <span className="inline-flex rounded-full border border-[#ff0066]/20 bg-white/70 px-5 py-2 text-sm font-black text-[#f90062] shadow-sm backdrop-blur">
            {data.eyebrow}
          </span>
          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {data.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#4c2c00]/72">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-8 grid max-w-5xl gap-3 md:grid-cols-3"
          role="tablist"
          aria-label={data.title}
        >
          {data.cards.map((card, index) => {
            const isActive = card.id === activeOffer.id;

            return (
              <motion.button
                key={card.id}
                type="button"
                variants={cardItem}
                onClick={() => setActiveId(card.id)}
                className={clsx(
                  "rounded-[1.4rem] border px-5 py-4 text-start shadow-sm transition-all duration-200",
                  isActive
                    ? "border-[#f90062]/30 bg-[#f90062] text-white shadow-[0_16px_34px_rgba(249,0,98,0.23)]"
                    : "border-[#f8aa2d]/20 bg-white/68 text-[#4c2c00] hover:border-[#f90062]/25 hover:bg-white"
                )}
                role="tab"
                aria-selected={isActive}
                aria-controls={`offer-panel-${card.id}`}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                <span
                  className={clsx(
                    "mb-2 inline-flex h-7 w-7 items-center justify-center rounded-full text-xs font-black",
                    isActive ? "bg-[#ffc400] text-[#2b1b08]" : "bg-[#f8aa2d]/18 text-[#cf7d11]"
                  )}
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="block text-base font-black leading-6">
                  {card.tabTitle}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.article
            key={activeOffer.id}
            id={`offer-panel-${activeOffer.id}`}
            role="tabpanel"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.38, ease: smoothEase }}
            className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-[#f8aa2d]/24 bg-[#ffe6c9] shadow-[0_28px_90px_rgba(76,44,0,0.14)]"
          >
            <div className="relative overflow-hidden p-5 sm:p-8 lg:p-10">
              <div className="pointer-events-none absolute -right-10 -top-16 h-44 w-44 rounded-full border-[18px] border-[#ffc400]/22" />
              <div className="pointer-events-none absolute -bottom-28 -left-16 h-72 w-72 rounded-full bg-[#ff0066]/13 blur-2xl" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-full bg-[linear-gradient(135deg,transparent_0_45%,rgba(255,196,0,0.25)_45%_55%,transparent_55%)]" />

              <div className="relative z-10 flex flex-col items-center gap-5 text-center">
                <span className="relative inline-flex items-center justify-center">
                  <span className="absolute h-10 w-48 -rotate-3 rounded-full bg-[#ffc400]/90" />
                  <span className="relative rounded-full bg-[#ff0066] px-6 py-2 text-xl font-black text-white shadow-[0_10px_24px_rgba(249,0,98,0.28)]">
                    {data.badge}
                  </span>
                </span>

                <div className="rounded-full bg-[#f90062] px-7 py-3 shadow-[0_14px_34px_rgba(249,0,98,0.25)]">
                  <h3 className="text-2xl font-black leading-tight text-white md:text-4xl">
                    {activeOffer.title}
                  </h3>
                </div>
              </div>

              <motion.ul
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className={clsx(
                  "relative z-10 mt-9 grid gap-4",
                  isDense ? "lg:grid-cols-2" : "lg:grid-cols-1"
                )}
              >
                {activeOffer.items.map((item) => (
                  <OfferLine key={`${item.name}-${item.newPrice}`} item={item} labels={data} />
                ))}
              </motion.ul>

              <div className="relative z-10 mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <div className="inline-flex items-center gap-3 rounded-full border-2 border-[#ffc400] bg-white/80 px-5 py-2.5 text-[#2b1b08] shadow-sm">
                  <FaWhatsapp className="text-[#f90062]" aria-hidden="true" />
                  <span className="text-xs font-black uppercase tracking-[0.12em] text-[#4c2c00]/55">
                    {data.phoneLabel}
                  </span>
                  <span className="text-xl font-black">{data.displayPhone}</span>
                </div>
              </div>
            </div>
          </motion.article>
        </AnimatePresence>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-9 text-center"
        >
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f90062] px-9 py-4 text-lg font-black text-white shadow-[0_18px_42px_rgba(249,0,98,0.30)] transition-colors duration-300 hover:bg-[#cf7d11]"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWhatsapp aria-hidden="true" />
            <span>{data.bookCta}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
