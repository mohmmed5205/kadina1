import { useState } from "react";
import { motion } from "framer-motion";
import OffersModal from "./OffersModal";
import { fadeUp, staggerContainer } from "./motionPresets";

export default function Hero({ t, lang = "ar" }) {
  const [isOffersOpen, setIsOffersOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;

  return (
    <>
      <section
        id="home"
        className="relative min-h-[80vh] overflow-hidden bg-cover bg-center bg-no-repeat pt-[var(--nav-h,4.25rem)] lg:min-h-[92vh]"
        style={{ backgroundImage: "url('/homeBG.jpeg')" }}
      >
        <div className="absolute inset-0 bg-[#2b1b08]/48" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#2b1b08]/30 via-[#2b1b08]/12 to-[#2b1b08]/62" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#fff7eb] to-transparent lg:h-40" />

      <div className="relative z-10 mx-auto flex min-h-[calc(80vh-var(--nav-h,4.25rem))] max-w-7xl items-center px-4 py-10 sm:px-6 lg:min-h-[calc(92vh-var(--nav-h,5rem))] lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl text-center lg:text-start"
        >
          <motion.img
            variants={fadeUp}
            src="/kadina-logo3.png"
            alt={t.center.name}
            className="mx-auto mb-4 h-20 w-auto object-contain drop-shadow-[0_8px_18px_rgba(43,27,8,0.35)] lg:mx-0 lg:h-26"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/kadina-logo.png";
            }}
          />

          <motion.span
            variants={fadeUp}
            className="section-eyebrow border-white/30 bg-white/16 text-[#f8ead8] shadow-[0_10px_30px_rgba(43,27,8,0.18)]"
          >
            {t.hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-5 text-3xl font-black leading-tight text-white drop-shadow-[0_4px_18px_rgba(43,27,8,0.48)] sm:text-4xl md:text-6xl lg:mt-7"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-lg font-bold text-[#f8aa2d] drop-shadow-[0_3px_12px_rgba(43,27,8,0.45)] md:text-2xl"
          >
            {t.hero.highlight}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#fff7eb]/92 drop-shadow-[0_3px_14px_rgba(43,27,8,0.35)] md:text-lg lg:mx-0 lg:mt-6"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap lg:mt-10 lg:justify-start"
          >
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full max-w-xs rounded-full bg-[#f8aa2d] px-6 py-3.5 text-center font-bold text-[#2b1b08] shadow-[0_16px_38px_rgba(207,125,17,0.36)] transition-colors duration-300 hover:bg-[#cf7d11] hover:text-white sm:w-auto lg:px-8 lg:py-4"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.hero.primaryCta}
            </motion.a>

            <motion.a
              href="#services"
              className="w-full max-w-xs rounded-full border border-[#f8aa2d]/55 bg-[#fff7eb]/14 px-6 py-3.5 text-center font-bold text-white shadow-[0_12px_32px_rgba(43,27,8,0.2)] backdrop-blur-md transition-colors duration-300 hover:border-[#f8aa2d] hover:bg-[#f8aa2d] hover:text-[#2b1b08] sm:w-auto lg:px-8 lg:py-4"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.hero.secondaryCta}
            </motion.a>

            <motion.button
              type="button"
              onClick={() => setIsOffersOpen(true)}
              className="w-full max-w-xs rounded-full border border-white/28 bg-white px-6 py-3.5 text-center font-bold text-[#2b1b08] shadow-[0_12px_32px_rgba(43,27,8,0.2)] transition-colors duration-300 hover:border-[#f8aa2d] hover:bg-[#f8aa2d] sm:w-auto lg:px-8 lg:py-4"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.hero.offersCta}
            </motion.button>
          </motion.div>

        </motion.div>
      </div>
      </section>

      <OffersModal
        open={isOffersOpen}
        onClose={() => setIsOffersOpen(false)}
        lang={lang}
        t={t}
      />
    </>
  );
}
