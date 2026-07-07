import { motion } from "framer-motion";
import {
  cardItem,
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "./motionPresets";

export default function About({ t }) {
  const isAr = t.dir === "rtl";

  const description = isAr
    ? "مركز كادينا الطبي وجهة متخصصة في خدمات التجميل، والليزر، والعناية بالبشرة والشعر، تحت إشراف نخبة من الأطباء السعوديين وباستخدام أحدث الأجهزة والتقنيات الطبية."
    : "Kadina Medical Center is a specialized destination for aesthetics, laser treatments, skin care, and hair care, led by a selected team of Saudi doctors and supported by the latest medical devices and technologies.";

  return (
    <section id="about" className="relative overflow-hidden bg-[#fff7eb] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 opacity-70">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(248,170,45,0.10)_0%,transparent_34%,rgba(76,44,0,0.07)_100%)]" />
        <div className="absolute -top-32 right-[-12rem] h-[34rem] w-[34rem] rounded-full border border-[#f8aa2d]/14" />
        <div className="absolute bottom-[-14rem] left-[-10rem] h-[32rem] w-[32rem] rounded-full border border-[#4c2c00]/10" />
      </div>

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#f8aa2d]/22 bg-gradient-to-br from-[#fffbf3] via-[#fff7eb] to-[#f8ead8] shadow-[0_24px_85px_rgba(76,44,0,0.12)]"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#f8aa2d] to-transparent" />

          <div className="grid grid-cols-1 items-stretch lg:grid-cols-5">
            <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#f8ead8] p-10 lg:col-span-2">
              <div className="pointer-events-none absolute inset-y-8 left-8 right-8 rounded-[2rem] border border-white/55" />
              <motion.div
                variants={fadeUp}
                className="relative z-10 mb-6 flex h-32 w-32 items-center justify-center rounded-[1.75rem] border border-[#f8aa2d]/35 bg-white/75 shadow-[0_18px_45px_rgba(76,44,0,0.11)] backdrop-blur"
              >
                <img
                  src="/kadina-logo.png"
                  alt={t.center.name}
                  className="h-24 w-24 object-contain"
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              </motion.div>

              <div className="relative z-10 flex items-center gap-2">
                <span className="h-px w-10 bg-[#f8aa2d]/60" />
                <span className="h-2 w-10 rounded-full bg-[#f8aa2d]/70" />
                <span className="h-px w-10 bg-[#f8aa2d]/60" />
              </div>

              <p className="relative z-10 mt-6 text-center text-xs font-black uppercase tracking-[0.3em] text-[#4c2c00]/55">
                {isAr ? "مركز كادينا الطبي" : "Kadina Medical Center"}
              </p>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="relative flex flex-col justify-center p-8 lg:col-span-3 lg:p-12"
            >
              <motion.div variants={fadeUp} className="mb-8 flex">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#4c2c00] px-5 py-2 text-sm font-black text-[#f8aa2d] shadow-[0_10px_26px_rgba(76,44,0,0.22)]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f8aa2d]" aria-hidden="true" />
                  {isAr ? "من نحن؟" : "About Kadina"}
                </span>
              </motion.div>

              <motion.h2
                variants={fadeUp}
                className="text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl"
              >
                {t.about.title}
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="mt-6 text-lg leading-[2.05] text-[#4c2c00] md:text-xl md:leading-[2.15]"
              >
                {description}
              </motion.p>

              <motion.div variants={fadeUp} className="my-8 flex items-center gap-4">
                <span className="h-px flex-1 bg-gradient-to-r from-[#f8aa2d]/35 to-transparent" />
                <span className="h-2 w-14 rounded-full bg-[#f8aa2d]/60" />
                <span className="h-px flex-1 bg-gradient-to-l from-[#f8aa2d]/35 to-transparent" />
              </motion.div>

              <motion.div
                variants={staggerContainer}
                className="grid gap-5 border-y border-[#f8aa2d]/18 py-6 sm:grid-cols-2"
              >
                {[t.about.visionTitle, t.about.missionTitle].map((title, index) => (
                  <motion.div key={title} variants={cardItem}>
                    <span className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#f8aa2d]/18 text-xs font-black text-[#cf7d11]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-2 text-base font-black text-[#4c2c00]">
                      {title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-[#4c2c00]/62">
                      {index === 0 ? t.about.visionText : t.about.missionText}
                    </p>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={staggerContainer} className="mt-6 grid gap-2">
                {t.about.bullets.map((item, index) => (
                  <motion.div
                    key={item}
                    variants={cardItem}
                    className="flex items-center gap-3 rounded-full border border-[#4c2c00]/8 bg-white/45 px-4 py-2.5 font-semibold text-[#4c2c00] transition hover:border-[#f8aa2d]/35 hover:bg-white/72"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#f8aa2d]/22 text-[0.65rem] font-black text-[#cf7d11]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#f8aa2d]/30 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
