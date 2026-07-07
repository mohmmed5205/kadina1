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
    <section id="contact" className="relative overflow-hidden bg-[#f8ead8] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.70),transparent_44%,rgba(76,44,0,0.07))]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="section-eyebrow">{t.contact.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black text-[#2b1b08] md:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#4c2c00]/70">
            {t.contact.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-12 grid max-w-5xl gap-5 md:grid-cols-3"
        >
          {info.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.div
                key={item.label}
                variants={cardItem}
                whileHover={{ y: -5 }}
                className="rounded-[2rem] border border-[#f8aa2d]/16 bg-[#fffbf3] p-6 shadow-[0_12px_38px_rgba(76,44,0,0.08)] transition-colors duration-300 hover:border-[#f8aa2d]/35"
              >
                <div className="mb-5 flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8aa2d]/18 text-[#cf7d11] ring-1 ring-[#f8aa2d]/18">
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
            className="inline-flex items-center justify-center gap-3 rounded-full bg-[#f8aa2d] px-10 py-4 text-lg font-black text-[#2b1b08] shadow-[0_16px_40px_rgba(207,125,17,0.34)] transition-colors duration-300 hover:bg-[#cf7d11] hover:text-white"
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
