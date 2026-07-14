import { motion } from "framer-motion";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "./motionPresets";

export default function BeforeAfter({ t }) {
  const data = t.beforeAfter;

  return (
    <section
      id="before-after"
      className="relative overflow-hidden bg-[#f8ead8] py-16 sm:py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.68),transparent_46%,rgba(207,125,17,0.08))]" />

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-10 max-w-3xl text-center lg:mb-16"
        >
          <span className="section-eyebrow">{data.eyebrow}</span>

          <h2 className="mt-4 text-2xl font-black text-[#2b1b08] md:text-5xl lg:mt-6">
            {data.title}
          </h2>

          <p className="mt-4 text-base leading-8 text-[#4c2c00]/70 md:text-lg">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 md:grid-cols-2 xl:grid-cols-3 lg:gap-8"
        >
          {data.cases.map((item) => (
            <motion.article
              key={`${item.title}-${item.doctor || ""}`}
              variants={cardItem}
              whileHover={{ y: -5 }}
              className="group overflow-hidden rounded-[1.5rem] border border-[#f8aa2d]/18 bg-[#fffbf3] p-3 shadow-[0_12px_30px_rgba(76,44,0,0.07)] transition-colors duration-300 hover:border-[#f8aa2d]/35 sm:rounded-[2rem] sm:p-4"
            >
              <div className="overflow-hidden rounded-[1.25rem] bg-[#fff7eb] sm:rounded-[1.6rem]">
                <img
                  src={item.image}
                  alt={`${item.title}${item.doctor ? ` - ${item.doctor}` : ""}`}
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = "/kadina-logo.png";
                    event.currentTarget.classList.add("p-12");
                  }}
                  className="w-full object-contain transition duration-500 group-hover:scale-[1.02]"
                  loading="lazy"
                />
              </div>

              
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}