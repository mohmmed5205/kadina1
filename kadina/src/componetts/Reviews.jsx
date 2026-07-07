import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "./motionPresets";

function RatingMark() {
  return (
    <div className="flex items-center gap-3" aria-label="5 out of 5 rating">
      <div className="flex items-center gap-1 text-[#f8aa2d]">
        {Array.from({ length: 5 }).map((_, index) => (
          <FaStar key={index} className="text-sm" aria-hidden="true" />
        ))}
      </div>
      <span className="h-px flex-1 bg-gradient-to-r from-[#f8aa2d]/55 to-transparent" />
      <span className="rounded-full bg-[#f8aa2d]/18 px-3 py-1 text-xs font-black text-[#cf7d11]">
        5.0
      </span>
    </div>
  );
}

export default function Reviews({ t }) {
  const data = t.reviews;

  return (
    <section id="reviews" className="relative overflow-hidden bg-[#fff7eb] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,247,235,1),rgba(248,234,216,0.32)_52%,rgba(255,247,235,1))]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="section-eyebrow">{data.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black text-[#2b1b08] md:text-5xl">
            {data.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#4c2c00]/70">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-6 md:grid-cols-3"
        >
          {data.items.map((item) => (
            <motion.article
              key={item.name}
              variants={cardItem}
              whileHover={{ y: -6 }}
              className="flex flex-col rounded-[2rem] border border-[#f8aa2d]/16 bg-[#fffbf3] p-7 shadow-[0_12px_38px_rgba(76,44,0,0.08)] transition-colors duration-300 hover:border-[#f8aa2d]/35"
            >
              <RatingMark />

              <p className="mt-5 flex-1 leading-8 text-[#4c2c00]/75">
                &quot;{item.review}&quot;
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-[#f8aa2d]/15 pt-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#f8aa2d]/30 to-[#f8aa2d]/10 font-black text-[#cf7d11] shadow-sm">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black leading-tight text-[#2b1b08]">
                    {item.name}
                  </h3>
                  <p className="text-xs text-[#4c2c00]/50">{item.label}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {data.google && (
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mt-10 text-center"
          >
            <a
              href="#contact"
              className="inline-flex rounded-full border border-[#f8aa2d]/25 bg-[#fffbf3] px-7 py-3 font-black text-[#4c2c00] shadow-[0_10px_28px_rgba(76,44,0,0.08)] transition hover:-translate-y-0.5 hover:border-[#f8aa2d]/45 hover:bg-white hover:shadow-[0_16px_34px_rgba(76,44,0,0.12)]"
            >
              {data.google}
            </a>
          </motion.div>
        )}
      </div>
    </section>
  );
}
