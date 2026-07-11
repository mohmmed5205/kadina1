import { useState } from "react";
import { motion } from "framer-motion";
import { FaLeaf, FaMagic, FaSpa, FaUserMd } from "react-icons/fa";
import ServiceModal from "./ServiceModal";

const serviceIcons = [FaUserMd, FaMagic, FaSpa, FaLeaf];
const fallbackServiceKeys = ["dermatology", "laser", "aesthetics", "hair"];

export default function Services({ t, lang = "ar" }) {
  const services = t?.services?.items || [];
  const [selectedServiceKey, setSelectedServiceKey] = useState(null);
  const isServiceModalOpen = Boolean(selectedServiceKey);

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#f8ead8] py-16 sm:py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.8),transparent_45%,rgba(207,125,17,0.1))]" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mb-10 max-w-3xl text-center lg:mb-16"
        >
          <span className="section-eyebrow">{t.services.eyebrow}</span>

          <h2 className="mt-4 text-2xl font-black leading-tight text-[#2b1b08] md:text-5xl lg:mt-6">
            {t.services.title}
          </h2>

          <p className="mt-4 text-base leading-8 text-[#4c2c00]/70 md:text-lg">
            {t.services.description}
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:gap-6 xl:grid-cols-4">
          {services.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];
            const serviceKey = service.key || fallbackServiceKeys[index];

            return (
              <motion.button
                key={serviceKey || service.title}
                type="button"
                onClick={() => setSelectedServiceKey(serviceKey)}
                aria-haspopup="dialog"
                aria-label={`${t.services.more}: ${service.title}`}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                whileHover={{ y: -6 }}
                className="group relative flex cursor-pointer flex-col overflow-hidden rounded-[1.5rem] border border-[#f8aa2d]/18 bg-[#fffbf3] p-5 text-start shadow-[0_12px_30px_rgba(76,44,0,0.06)] transition-colors duration-300 hover:border-[#f8aa2d]/45 hover:bg-white sm:rounded-[2rem] lg:min-h-[21rem] lg:p-7"
              >
                <div className="mb-5 flex items-center justify-between gap-4 lg:mb-8">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#f8aa2d]/16 text-lg text-[#cf7d11] ring-1 ring-[#f8aa2d]/20 transition-all duration-300 group-hover:bg-[#f8aa2d] group-hover:text-[#2b1b08] lg:h-12 lg:w-12 lg:text-xl">
                    <Icon aria-hidden="true" />
                  </span>

                  <img
                    src="/logo.png"
                    alt="Kadina"
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/kadina-logo.png";
                    }}
                    className="h-6 w-auto object-contain lg:h-7"
                  />
                </div>

                <h3 className="text-lg font-black text-[#2b1b08] lg:text-xl">
                  {service.title}
                </h3>

                <p className="mt-3 flex-1 text-sm leading-7 text-[#4c2c00]/70 lg:mt-4 lg:leading-8">
                  {service.description}
                </p>

                <span
                  className="mt-5 inline-flex w-fit rounded-full border border-[#4c2c00]/12 bg-[#fff7eb] px-4 py-2 text-sm font-black text-[#4c2c00] transition-all duration-200 hover:border-[#f8aa2d] hover:bg-[#f8aa2d] hover:text-[#2b1b08] hover:shadow-md lg:mt-7 lg:px-5 lg:py-2.5"
                >
                  {t.services.more}
                </span>
              </motion.button>
            );
          })}
        </div>
      </div>

      <ServiceModal
        open={isServiceModalOpen}
        onClose={() => setSelectedServiceKey(null)}
        serviceKey={selectedServiceKey}
        lang={lang}
        t={t}
      />
    </section>
  );
}
