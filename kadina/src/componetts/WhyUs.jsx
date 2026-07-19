import { motion } from "framer-motion";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "./motionPresets";

export default function WhyUs({ t }) {
  return (
    <section id="why-us" className="relative overflow-hidden bg-[#f8ead8] py-14 sm:py-20 lg:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(248,170,45,0.05),transparent_48%,rgba(248,170,45,0.04))]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-10 max-w-3xl text-center lg:mb-16"
        >
          <span className="section-eyebrow">{t.whyUs.eyebrow}</span>
          <h2 className="dark-section-title mt-4 text-2xl font-black leading-tight sm:text-3xl lg:mt-6 lg:text-5xl">
            {t.whyUs.title}
          </h2>
          <p className="dark-section-description mt-4 text-base leading-8 md:text-lg">
            {t.whyUs.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6"
        >
          {t.whyUs.items.map((item) => (
            <motion.article
              key={item.title}
              variants={cardItem}
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[1.5rem] border border-[#f8aa2d]/15 bg-[#fffbf3] p-5 shadow-[0_12px_30px_rgba(76,44,0,0.06)] transition-colors duration-300 hover:border-[#f8aa2d]/40 sm:rounded-[2rem] lg:p-7"
            >
              <div className="mb-5 flex items-center gap-3 lg:mb-7">
               <img
            src="/kadina-logo3.png"
            alt={t.center.name}
            className="h-20 w-auto object-contain lg:h-20"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = "/logo.png";
            }}
          />
              
                <span className="h-px flex-1 bg-gradient-to-r from-[#f8aa2d]/45 to-transparent" />
              </div>
              <h3 className="text-lg font-black text-[#2b1b08] lg:text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-[#4c2c00]/65 lg:mt-4 lg:text-base lg:leading-8">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
