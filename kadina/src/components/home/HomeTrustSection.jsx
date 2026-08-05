import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";
import { getHomePageContent } from "../../data/pagesContent";

export default function HomeTrustSection() {
  const { lang } = useOutletContext();
  const homePageContent = getHomePageContent(lang);
  return (
    <motion.section
      aria-label={lang === "ar" ? "أرقام الثقة في كادينا" : "Kadina trust metrics"}
      className="border-y border-[#f8aa2d]/20 bg-[#2b1b08] px-4 py-8 sm:px-5 lg:px-8"
      initial="hidden"
      variants={fadeUp}
      viewport={viewportOnce}
      whileInView="visible"
    >
      <motion.div
        className="mx-auto grid max-w-7xl grid-cols-2 gap-px overflow-hidden rounded-[1.5rem] bg-[#fff7eb]/15 md:grid-cols-4"
        variants={staggerContainer}
      >
        {homePageContent.trustMetrics.map((metric, index) => (
          <motion.div
            className="bg-[#2b1b08] px-4 py-6 text-center sm:px-6"
            key={`trust-metric-${index}`}
            variants={cardItem}
          >
            <p className="text-3xl font-black text-[#f8aa2d] sm:text-4xl">
              {metric.value}
            </p>
            <p className="mt-2 font-bold text-[#fff7eb]">{metric.label}</p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
