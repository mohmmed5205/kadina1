import { motion } from "framer-motion";
import {
  FaClock,
  FaInstagram,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaSnapchatGhost,
  FaTiktok,
  FaWhatsapp,
} from "react-icons/fa";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "./motionPresets";

const socialIcons = {
  snapchat: FaSnapchatGhost,
  instagram: FaInstagram,
  tiktok: FaTiktok,
};

export default function Contact({ t }) {
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;

  const contactItems = [
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
      href: "#location",
    },
    {
      icon: FaClock,
      label: t.contact.hoursLabel,
      value: t.contact.hoursValue,
      href: null,
    },
  ];

  const socials = t.contact.socials || [];

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#fff7eb] py-16 sm:py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(248,170,45,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(76,44,0,0.08),transparent_40%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-10 max-w-3xl text-center lg:mb-16"
        >
          <span className="section-eyebrow">{t.contact.eyebrow}</span>

          <h2 className="mt-5 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {t.contact.title}
          </h2>

          <p className="mt-4 text-base leading-8 text-[#4c2c00]/70 sm:text-lg">
            {t.contact.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 lg:grid-cols-3"
        >
          {contactItems.map((item) => {
            const Icon = item.icon;

            const cardContent = (
              <motion.div
                variants={cardItem}
                whileHover={{ y: -6 }}
                className="group flex h-full flex-col items-center rounded-[2rem] border border-[#f8aa2d]/20 bg-[#fffbf3] p-6 text-center shadow-[0_14px_34px_rgba(76,44,0,0.07)] transition-colors duration-300 hover:border-[#f8aa2d]/45"
              >
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f8aa2d]/16 text-lg text-[#cf7d11] ring-1 ring-[#f8aa2d]/20 transition-all duration-300 group-hover:bg-[#f8aa2d] group-hover:text-[#2b1b08]">
                  <Icon aria-hidden="true" />
                </span>

                <h3 className="mt-5 text-lg font-black text-[#2b1b08]">
                  {item.label}
                </h3>

                <p className="mt-3 text-sm font-bold leading-7 text-[#4c2c00]/70">
                  {item.value}
                </p>
              </motion.div>
            );

            if (item.href) {
              return (
                <a key={item.label} href={item.href}>
                  {cardContent}
                </a>
              );
            }

            return <div key={item.label}>{cardContent}</div>;
          })}
        </motion.div>

        {socials.length > 0 && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto mt-8 max-w-4xl rounded-[2rem] border border-[#f8aa2d]/20 bg-[#fffbf3] p-5 text-center shadow-[0_14px_34px_rgba(76,44,0,0.07)] sm:p-7"
          >
            <h3 className="text-2xl font-black text-[#2b1b08]">
              {t.contact.socialLabel}
            </h3>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#4c2c00]/70">
              {t.contact.socialDiscription}
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {socials.map((social) => {
                const Icon = socialIcons[social.key];

                return (
                  <a
                    key={social.key}
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="group inline-flex items-center gap-2 rounded-full border border-[#f8aa2d]/25 bg-white px-5 py-3 text-sm font-black text-[#4c2c00] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#f8aa2d] hover:bg-[#f8aa2d] hover:text-[#2b1b08]"
                  >
                    {Icon && (
                      <Icon className="text-lg transition-transform duration-300 group-hover:scale-110" />
                    )}

                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>
          </motion.div>
        )}

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 flex justify-center"
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-full bg-[#f8aa2d] px-7 py-4 text-center text-sm font-black text-[#2b1b08] shadow-[0_16px_34px_rgba(207,125,17,0.24)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#cf7d11] hover:text-white sm:w-auto"
          >
            <FaWhatsapp className="text-lg" />
            {t.contact.whatsappCta}
          </a>
        </motion.div>
      </div>
    </section>
  );
}