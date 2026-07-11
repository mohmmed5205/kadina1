import { motion } from "framer-motion";
import { FaClock, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "./motionPresets";

export default function Connect({ t }) {
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;

  const info = [
    {
      icon: FaPhoneAlt,
      label: t.contact.phoneLabel,
      value: t.center.phone,
      href: `tel:${t.center.phone}`,
    },
    {
      icon: FaMapMarkerAlt,
      label: t.contact.locationLabel,
      value: t.center.address,
    },
    {
      icon: FaClock,
      label: t.contact.hoursLabel,
      value: t.contact.hoursValue,
    },
  ];

  return (
    <section id="contact" className="relative overflow-hidden bg-[#f8ead8] py-16 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.70),transparent_44%,rgba(76,44,0,0.07))]" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-10 max-w-3xl text-center lg:mb-16"
        >
          <span className="section-eyebrow">{t.contact.eyebrow}</span>
          <h2 className="mt-4 text-2xl font-black text-[#2b1b08] md:text-5xl lg:mt-6">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#4c2c00]/70 md:text-lg">
            {t.contact.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-8 grid max-w-5xl gap-4 md:grid-cols-3 lg:mb-12 lg:gap-5"
        >
          {info.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                variants={cardItem}
                whileHover={{ y: -5 }}
                className="rounded-[1.5rem] border border-[#f8aa2d]/16 bg-[#fffbf3] p-5 shadow-[0_12px_30px_rgba(76,44,0,0.07)] transition-colors duration-300 hover:border-[#f8aa2d]/35 sm:rounded-[2rem] lg:p-6"
              >
                <div className="mb-4 flex items-center gap-3 lg:mb-5">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f8aa2d]/18 text-[#cf7d11] ring-1 ring-[#f8aa2d]/18 lg:h-11 lg:w-11">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="h-px flex-1 bg-gradient-to-r from-[#f8aa2d]/45 to-transparent" />
                  <span className="text-xs font-black text-[#4c2c00]/35">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>
                <p className="text-xs font-bold uppercase tracking-wider text-[#4c2c00]/50">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-2 block font-bold text-[#4c2c00] transition-colors hover:text-[#cf7d11]"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-2 font-bold leading-7 text-[#4c2c00]">
                    {item.value}
                  </p>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center"
        >
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full max-w-sm items-center justify-center gap-3 rounded-full bg-[#f8aa2d] px-7 py-3.5 text-base font-black text-[#2b1b08] shadow-[0_16px_40px_rgba(207,125,17,0.28)] transition-colors duration-300 hover:bg-[#cf7d11] hover:text-white sm:w-auto lg:px-10 lg:py-4 lg:text-lg"
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWhatsapp aria-hidden="true" />
            <span>{t.contact.whatsappCta}</span>
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
