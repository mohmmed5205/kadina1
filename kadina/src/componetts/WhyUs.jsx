import { motion } from "framer-motion";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "./motionPresets";

export default function WhyUs({ t }) {
  return (
    <section id="why-us" className="relative overflow-hidden bg-[#fff7eb] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,247,235,1),rgba(248,234,216,0.38)_48%,rgba(255,247,235,1))]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="section-eyebrow">{t.whyUs.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {t.whyUs.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
            {t.whyUs.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
        >
          {t.whyUs.items.map((item, index) => (
            <motion.article
              key={item.title}
              variants={cardItem}
              whileHover={{ y: -7 }}
              className="group relative overflow-hidden rounded-[2rem] border border-[#f8aa2d]/15 bg-[#fffbf3] p-7 shadow-[0_12px_38px_rgba(76,44,0,0.07)] transition-colors duration-300 hover:border-[#f8aa2d]/40"
            >
              <div className="mb-7 flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f8aa2d]/18 text-sm font-black text-[#cf7d11] ring-1 ring-[#f8aa2d]/20 transition-all duration-300 group-hover:bg-[#f8aa2d] group-hover:text-[#2b1b08]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="h-px flex-1 bg-gradient-to-r from-[#f8aa2d]/45 to-transparent" />
              </div>
              <h3 className="text-xl font-black text-[#2b1b08]">{item.title}</h3>
              <p className="mt-4 leading-8 text-[#4c2c00]/65">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
