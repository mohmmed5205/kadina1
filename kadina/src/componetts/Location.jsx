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
    <section id="location" className="relative overflow-hidden bg-[#f8ead8] py-14 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,170,45,0.06),transparent_52%,rgba(248,170,45,0.04))]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-10 max-w-3xl text-center lg:mb-14"
        >
          <span className="section-eyebrow">{loc.eyebrow}</span>
          <h2 className="dark-section-title mt-4 text-2xl font-black leading-tight sm:text-3xl lg:mt-6 lg:text-5xl">
            {loc.title}
          </h2>
          <p className="dark-section-description mt-4 text-base leading-8 md:text-lg">
            {loc.description}
          </p>
        </motion.div>

        <motion.div
          variants={scaleIn}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-5xl overflow-hidden rounded-[1.5rem] border border-[#f8aa2d]/20 bg-gradient-to-br from-[#fffbf3] via-[#fff7eb] to-[#f8ead8] shadow-[0_18px_55px_rgba(76,44,0,0.10)] sm:rounded-[2rem] lg:shadow-[0_24px_85px_rgba(76,44,0,0.12)]"
        >
          <div className="h-1.5 w-full bg-gradient-to-r from-transparent via-[#f8aa2d] to-transparent" />

          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="relative flex min-h-64 flex-col items-center justify-center overflow-hidden bg-[#f8ead8] p-6 lg:min-h-80 lg:p-10">
              <div className="pointer-events-none absolute inset-8 hidden rounded-[2rem] border border-white/55 sm:block" />
              <div className="pointer-events-none absolute inset-x-12 top-1/2 hidden border-t border-[#cf7d11]/16 sm:block" />
              <div className="pointer-events-none absolute inset-y-12 left-1/2 hidden border-s border-[#cf7d11]/16 sm:block" />

              <motion.div
                variants={fadeUp}
                className="relative z-10 mb-4 flex items-center justify-center lg:mb-5"
              >
                <img
                  src="/logo.png"
                  alt={t.center.name}
                  className="h-14 w-auto object-contain lg:h-16"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/kadina-logo.png";
                  }}
                />
                
              </motion.div>

              <p className="relative z-10 mb-2 text-sm font-black uppercase tracking-[0.26em] text-[#4c2c00]/60 lg:text-base lg:tracking-[0.3em]">
                KADINA
              </p>
              <p className="relative z-10 mb-6 rounded-full border border-[#f8aa2d]/25 bg-white/38 px-4 py-1 text-xs font-black uppercase tracking-[0.18em] text-[#cf7d11]">
                {cityLabel}
              </p>

              {/* <motion.a
                href={mapUrl}
                target="_blank"
                rel="noreferrer"
                className="relative z-10 inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] shadow-[0_12px_30px_rgba(207,125,17,0.28)] transition-colors duration-300 hover:bg-[#cf7d11] hover:text-white sm:w-auto lg:px-7"
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaMapMarkedAlt aria-hidden="true" />
                <span>{loc.button}</span>
              </motion.a> */}
            </div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewportOnce}
              className="flex flex-col justify-center p-5 sm:p-8 lg:p-10"
            >
              <div className="space-y-4 lg:space-y-5">
                {infoItems.map((item) => {
                  const Icon = item.icon;

                  return (
                    <motion.div
                      key={item.label}
                      variants={cardItem}
                      className="flex items-start gap-3 rounded-2xl border border-[#f8aa2d]/15 bg-white/58 p-4 shadow-sm transition hover:border-[#f8aa2d]/35 hover:bg-white/78 hover:shadow-md lg:gap-4 lg:p-5"
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8aa2d]/16 text-[#cf7d11] ring-1 ring-[#f8aa2d]/18 lg:h-11 lg:w-11">
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
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#f8aa2d] px-6 py-3.5 font-black text-[#2b1b08] shadow-[0_12px_32px_rgba(207,125,17,0.30)] transition-colors duration-300 hover:bg-[#cf7d11] hover:text-white lg:px-8 lg:py-4"
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
