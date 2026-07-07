import { motion } from "framer-motion";
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "./motionPresets";

export default function Stats({ t }) {
  return (
    <section className="relative overflow-hidden bg-[#2b1b08] py-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(248,170,45,0.12),transparent_40%,rgba(255,247,235,0.06))]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 text-center md:grid-cols-2 lg:grid-cols-4"
        >
          {t.stats.map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardItem}
              whileHover={{ y: -5 }}
              className="group rounded-[2rem] border border-white/10 bg-white/8 p-8 shadow-[0_12px_38px_rgba(0,0,0,0.14)] backdrop-blur-sm transition-colors duration-300 hover:border-[#f8aa2d]/35 hover:bg-white/12"
            >
              <span className="mx-auto mb-5 block h-1 w-12 rounded-full bg-[#f8aa2d]/65" />
              <h2 className="text-4xl font-black text-[#f8aa2d] transition-transform duration-300 group-hover:scale-105 md:text-5xl">
                {item.number}
              </h2>
              <p className="mt-3 text-base font-semibold text-[#fff7eb]/82">
                {item.title}
              </p>
              <p className="mt-4 text-[0.65rem] font-black tracking-[0.2em] text-[#fff7eb]/38">
                {String(index + 1).padStart(2, "0")}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
