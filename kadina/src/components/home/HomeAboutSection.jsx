import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";
import { getHomePageContent } from "../../data/pagesContent";

export default function HomeAboutSection() {
  const { lang } = useOutletContext();
  const homePageContent = getHomePageContent(lang);
  return (
    <section
      className="scroll-mt-24 bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      id="about"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle title={lang === "ar" ? "لماذا كادينا؟" : "Why Kadina?"} />
        <motion.div
          className="mt-9 grid gap-5 md:grid-cols-3"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          {homePageContent.whyKadina.map((item, index) => (
            <motion.article
              className="rounded-[1.75rem] border border-[#f8aa2d]/25 bg-white/75 p-6 shadow-[0_18px_45px_rgba(76,44,0,0.07)]"
              key={`why-kadina-${index}`}
              variants={cardItem}
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-[#f8aa2d]/16 text-lg font-black text-[#cf7d11]"
              >
                {index + 1}
              </span>
              <h3 className="mt-5 text-xl font-black text-[#4c2c00]">
                {item.title}
              </h3>
              <p className="mt-3 leading-8 text-[#4c2c00]/68">
                {item.description}
              </p>
            </motion.article>
          ))}
        </motion.div>
        <div className="mt-8 text-center">
          <Link
            className="inline-block font-black text-[#cf7d11] underline decoration-[#f8aa2d]/40 underline-offset-8"
            to="/about"
          >
            {lang === "ar" ? "تعرّف علينا أكثر" : "Learn More About Us"}
          </Link>
        </div>
      </div>
    </section>
  );
}
