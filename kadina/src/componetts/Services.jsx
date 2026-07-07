import { motion } from "framer-motion";
import { FaLeaf, FaMagic, FaSpa, FaUserMd } from "react-icons/fa";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "./motionPresets";

const serviceIcons = [FaUserMd, FaMagic, FaSpa, FaLeaf];

export default function Services({ t }) {
  return (
    <section id="services" className="relative overflow-hidden bg-[#f8ead8] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.76),transparent_42%,rgba(207,125,17,0.08))]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="section-eyebrow">{t.services.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {t.services.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
            {t.services.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-4"
        >
          {t.services.items.map((service, index) => {
            const Icon = serviceIcons[index % serviceIcons.length];

            return (
              <motion.article
                key={service.title}
                variants={cardItem}
                whileHover={{ y: -8 }}
                className="group relative flex min-h-[22rem] flex-col overflow-hidden rounded-[2rem] border border-[#f8aa2d]/18 bg-[#fffbf3] p-7 shadow-[0_12px_38px_rgba(76,44,0,0.07)] transition-colors duration-300 hover:border-[#f8aa2d]/45"
              >
                <div className="mb-8 flex items-center justify-between gap-4">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#f8aa2d]/16 text-xl text-[#cf7d11] ring-1 ring-[#f8aa2d]/20 transition-all duration-300 group-hover:bg-[#f8aa2d] group-hover:text-[#2b1b08]">
                    <Icon aria-hidden="true" />
                  </span>
                  <span className="rounded-full border border-[#f8aa2d]/22 bg-[#fff7eb] px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-[#cf7d11]">
                    Kadina {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                <h3 className="text-xl font-black text-[#2b1b08]">
                  {service.title}
                </h3>

                <p className="mt-4 flex-1 text-sm leading-8 text-[#4c2c00]/70">
                  {service.description}
                </p>

                <a
                  href="#contact"
                  className="mt-7 inline-flex w-fit rounded-full border border-[#4c2c00]/12 bg-[#fff7eb] px-5 py-2.5 text-sm font-black text-[#4c2c00] transition-all duration-200 hover:border-[#f8aa2d] hover:bg-[#f8aa2d] hover:text-[#2b1b08] hover:shadow-md"
                >
                  {t.services.more}
                </a>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
