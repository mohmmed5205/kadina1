import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { fadeUp, viewportOnce } from "../../componetts/motionPresets";
import { createWhatsappUrl } from "../../utils/whatsapp";
import { getHomePageContent } from "../../data/pagesContent";

export default function HomeFinalCta() {
  const { lang } = useOutletContext();
  const homePageContent = getHomePageContent(lang);
  const { finalCta } = homePageContent;

  return (
    <motion.section
      className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      initial="hidden"
      variants={fadeUp}
      viewport={viewportOnce}
      whileInView="visible"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] bg-[#2b1b08] px-6 py-12 text-center shadow-[0_24px_60px_rgba(43,27,8,0.2)] sm:px-10 lg:py-16">
        <h2 className="text-2xl font-black leading-tight text-[#fff7eb] sm:text-4xl">
          {finalCta.title}
        </h2>
        <a
          aria-label={`${finalCta.label} (${lang === "ar" ? "يفتح في نافذة جديدة" : "opens in a new window"})`}
          className="mt-7 inline-flex rounded-full bg-[#f8aa2d] px-7 py-3.5 font-black text-[#2b1b08] shadow-[0_16px_38px_rgba(207,125,17,0.32)] transition hover:bg-[#cf7d11] hover:text-white"
          href={createWhatsappUrl(finalCta.message)}
          rel="noopener noreferrer"
          target="_blank"
        >
          {finalCta.label}
        </a>
      </div>
    </motion.section>
  );
}
