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
    <section id="before-after" className="relative overflow-hidden bg-[#f8ead8] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.68),transparent_46%,rgba(207,125,17,0.08))]" />

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
          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
            {data.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-8 lg:grid-cols-2"
        >
          {data.cases.map((item) => (
            <motion.article
              key={item.title}
              variants={cardItem}
              whileHover={{ y: -5 }}
              className="overflow-hidden rounded-[2rem] border border-[#f8aa2d]/18 bg-[#fffbf3] p-5 shadow-[0_14px_38px_rgba(76,44,0,0.08)] transition-colors duration-300 hover:border-[#f8aa2d]/35"
            >
              <h3 className="mb-6 text-center text-xl font-black text-[#2b1b08]">
                {item.title}
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#4c2c00]/40" />
                    <p className="text-center text-sm font-bold text-[#4c2c00]/65">
                      {data.before}
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-[1.5rem] bg-[#fff7eb]">
                    <img
                      src={item.before}
                      alt={data.before}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/kadina-logo.png";
                        event.currentTarget.classList.remove("object-cover");
                        event.currentTarget.classList.add("object-contain", "p-12");
                      }}
                      className="h-64 w-full object-cover transition duration-500 hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#cf7d11]" />
                    <p className="text-center text-sm font-bold text-[#cf7d11]">
                      {data.after}
                    </p>
                  </div>
                  <div className="overflow-hidden rounded-[1.5rem] bg-[#fff7eb] ring-2 ring-[#f8aa2d]/30">
                    <img
                      src={item.after}
                      alt={data.after}
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src = "/kadina-logo.png";
                        event.currentTarget.classList.remove("object-cover");
                        event.currentTarget.classList.add("object-contain", "p-12");
                      }}
                      className="h-64 w-full object-cover transition duration-500 hover:scale-[1.04]"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
