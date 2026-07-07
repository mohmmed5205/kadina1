import { motion } from "framer-motion";
import { FaClock, FaMapMarkedAlt, FaMapMarkerAlt, FaWhatsapp } from "react-icons/fa";
import {
  cardItem,
  fadeUp,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from "./motionPresets";

const MAP_URL = "https://maps.app.goo.gl/5RMSXMden4ex7MTD7?g_st=com.google.maps.preview.copy";

export default function Location({ t }) {
  const loc = t.location;
  const mapUrl = loc.mapUrl || MAP_URL;
  const cityLabel = t.dir === "rtl" ? "الرياض" : "Riyadh";

  const infoItems = [
    {
      icon: FaMapMarkerAlt,
      label: loc.addressLabel,
      value: loc.address,
    },
    {
      icon: FaClock,
      label: loc.hoursLabel,
      value: loc.hours,
    },
    {
      icon: FaWhatsapp,
      label: loc.bookingLabel,
      value: loc.booking,
    },
  ];

  return (
    <section id="location" className="relative overflow-hidden bg-[#fff7eb] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,247,235,1),rgba(248,234,216,0.34)_52%,rgba(255,247,235,1))]" />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <span className="section-eyebrow">{loc.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {loc.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
            {loc.description}
          </p>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#f8aa2d]/20 bg-gradient-to-br from-[#fffbf3] via-[#fff7eb] to-[#f8ead8] shadow-[0_24px_85px_rgba(76,44,0,0.12)]"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#f8aa2d] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative flex min-h-80 flex-col items-center justify-center overflow-hidden bg-[#f8ead8] p-10">
              <div className="pointer-events-none absolute inset-8 rounded-[2rem] border border-white/55" />
              <div className="pointer-events-none absolute inset-x-12 top-1/2 border-t border-[#cf7d11]/16" />
              <div className="pointer-events-none absolute inset-y-12 left-1/2 border-s border-[#cf7d11]/16" />

              <motion.div
                variants={fadeUp}
                className="relative z-10 mb-5 flex h-24 w-24 items-center justify-center rounded-[1.75rem] border border-[#f8aa2d]/35 bg-white/78 shadow-[0_18px_45px_rgba(76,44,0,0.14)] backdrop-blur"
              >
                <img
                  src="/kadina-logo.png"
                  alt={t.center.name}
                  className="h-16 w-16 object-contain"
                />
              </motion.div>

              <p className="relative z-10 mb-2 text-base font-black uppercase tracking-[0.3em] text-[#4c2c00]/60">
                KADINA
              </p>
              <p className="relative z-10 mb-6 rounded-full border border-[#f8aa2d]/25 bg-white/38 px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#cf7d11]">
                {cityLabel}
              </p>

              <motion.a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 inline-flex items-center gap-2 rounded-full bg-[#f8aa2d] px-7 py-3 font-black text-[#2b1b08] shadow-[0_12px_30px_rgba(207,125,17,0.32)] transition-colors duration-300 hover:bg-[#cf7d11] hover:text-white"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaMapMarkedAlt aria-hidden="true" />
                <span>{loc.button}</span>
              </motion.a>
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-col justify-center p-8 lg:p-10"
            >
              <div className="space-y-5">
                {infoItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.label}
                      variants={cardItem}
                      className="flex items-start gap-4 rounded-2xl border border-[#f8aa2d]/15 bg-white/58 p-5 shadow-sm transition hover:border-[#f8aa2d]/35 hover:bg-white/78 hover:shadow-md"
                    >
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f8aa2d]/16 text-[#cf7d11] ring-1 ring-[#f8aa2d]/18">
                        <Icon aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-[#4c2c00]/50">
                          {item.label}
                        </p>
                        <p className="mt-1 font-bold leading-7 text-[#2b1b08]">
                          {item.value}
                        </p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="my-7 flex items-center gap-3">
                <span className="h-px flex-1 bg-gradient-to-r from-[#f8aa2d]/30 to-transparent" />
                <span className="h-2 w-12 rounded-full bg-[#f8aa2d]/55" />
                <span className="h-px flex-1 bg-gradient-to-l from-[#f8aa2d]/30 to-transparent" />
              </div>

              <motion.a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f8aa2d] px-8 py-4 font-black text-[#2b1b08] shadow-[0_12px_32px_rgba(207,125,17,0.34)] transition-colors duration-300 hover:bg-[#cf7d11] hover:text-white"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaMapMarkedAlt aria-hidden="true" />
                <span>{loc.button}</span>
              </motion.a>
            </motion.div>
          </div>

          <div className="h-px w-full bg-gradient-to-r from-transparent via-[#f8aa2d]/25 to-transparent" />
        </motion.div>
      </div>
    </section>
  );
}
