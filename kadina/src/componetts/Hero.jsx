import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "./motionPresets";

export default function Hero({ t }) {
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;

  return (
    <section
      id="home"
      className="relative min-h-[92vh] overflow-hidden bg-cover bg-center bg-no-repeat pt-[var(--nav-h,5.5rem)]"
      style={{ backgroundImage: "url('/homeBG.jpeg')" }}
    >
      <div className="absolute inset-0 bg-[#2b1b08]/62" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#2b1b08]/42 via-[#2b1b08]/18 to-[#2b1b08]/72" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#fff7eb] to-transparent" />

      <div className="relative z-10 mx-auto flex min-h-[calc(92vh-var(--nav-h,5.5rem))] max-w-7xl items-center px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="max-w-3xl text-center lg:text-start"
        >
          <motion.div
            variants={fadeUp}
            className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full border border-white/28 bg-white/16 shadow-[0_18px_42px_rgba(43,27,8,0.24)] backdrop-blur-md lg:mx-0"
          >
            <img
              src="/kadina-logo.png"
              alt={t.center.name}
              className="h-14 w-14 object-contain"
            />
          </motion.div>

          <motion.span
            variants={fadeUp}
            className="section-eyebrow border-white/30 bg-white/16 text-[#f8ead8] shadow-[0_10px_30px_rgba(43,27,8,0.18)]"
          >
            {t.hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="mt-7 text-4xl font-black leading-tight text-white drop-shadow-[0_4px_18px_rgba(43,27,8,0.48)] sm:text-5xl md:text-6xl"
          >
            {t.hero.title}
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-5 text-xl font-bold text-[#f8aa2d] drop-shadow-[0_3px_12px_rgba(43,27,8,0.45)] md:text-2xl"
          >
            {t.hero.highlight}
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-[#fff7eb]/92 drop-shadow-[0_3px_14px_rgba(43,27,8,0.35)] lg:mx-0"
          >
            {t.hero.description}
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#f8aa2d] px-8 py-4 text-center font-bold text-[#2b1b08] shadow-[0_16px_38px_rgba(207,125,17,0.36)] transition-colors duration-300 hover:bg-[#cf7d11] hover:text-white"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.hero.primaryCta}
            </motion.a>

            <motion.a
              href="#services"
              className="rounded-full border border-[#f8aa2d]/55 bg-[#fff7eb]/14 px-8 py-4 text-center font-bold text-white shadow-[0_12px_32px_rgba(43,27,8,0.2)] backdrop-blur-md transition-colors duration-300 hover:border-[#f8aa2d] hover:bg-[#f8aa2d] hover:text-[#2b1b08]"
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
            >
              {t.hero.secondaryCta}
            </motion.a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mx-auto mt-8 max-w-xl rounded-full border border-white/25 bg-white/14 px-5 py-3 text-sm font-bold leading-7 text-[#fff7eb] shadow-[0_14px_34px_rgba(43,27,8,0.18)] backdrop-blur-md sm:text-base lg:mx-0"
          >
            {t.hero.trust}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}