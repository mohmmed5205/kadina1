import { motion } from "framer-motion";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "./motionPresets";

export default function Gallery({ t }) {
  return (
    <section id="gallery" className="relative overflow-hidden bg-[#f8ead8] py-24 sm:py-28">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.68),transparent_46%,rgba(207,125,17,0.08))]" />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <span className="section-eyebrow">{t.gallery.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {t.gallery.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
            {t.gallery.description}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {t.gallery.images.map((image, index) => (
            <motion.figure
              key={image.src}
              variants={cardItem}
              whileHover={{ y: -5 }}
              className={index === 0 ? "group sm:col-span-2 lg:col-span-1" : "group"}
            >
              <div className="overflow-hidden rounded-[2rem] border border-[#f8aa2d]/18 bg-[#fffbf3] p-3 shadow-[0_12px_38px_rgba(76,44,0,0.08)] transition-colors duration-300 group-hover:border-[#f8aa2d]/35">
                <div className="overflow-hidden rounded-[1.5rem] bg-[#fff7eb]">
                  <img
                    src={image.src}
                    alt={image.alt}
                    onError={(event) => {
                      event.currentTarget.onerror = null;
                      event.currentTarget.src = "/kadina-logo.png";
                      event.currentTarget.classList.remove("object-cover");
                      event.currentTarget.classList.add("object-contain", "p-12");
                    }}
                    className="aspect-[4/3] w-full object-cover object-center transition-transform duration-700 group-hover:scale-[1.05]"
                    loading="lazy"
                  />
                </div>
                {image.alt && (
                  <figcaption className="mt-3 px-2 pb-1 text-center text-sm font-semibold text-[#4c2c00]/60">
                    {image.alt}
                  </figcaption>
                )}
              </div>
            </motion.figure>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
