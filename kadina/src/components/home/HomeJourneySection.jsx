import { motion } from "framer-motion";
import SectionTitle from "../common/SectionTitle";
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";
import { homePageContent } from "../../data/pagesContent";

export default function HomeJourneySection() {
  return (
    <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle title="رحلتك في كادينا" />
        <motion.ol
          className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          {homePageContent.journey.map((step, index) => (
            <motion.li
              className="relative rounded-[1.75rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-6 shadow-[0_18px_45px_rgba(76,44,0,0.07)]"
              key={step.title}
              variants={cardItem}
            >
              <span className="text-4xl font-black text-[#f8aa2d]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 text-xl font-black text-[#4c2c00]">
                {step.title}
              </h3>
              <p className="mt-3 leading-8 text-[#4c2c00]/68">
                {step.description}
              </p>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
