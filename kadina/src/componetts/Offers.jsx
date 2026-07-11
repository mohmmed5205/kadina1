import { motion } from "framer-motion";
import { offers } from "../data/offers";
import { fadeUp, viewportOnce } from "./motionPresets";
import OfferSlider from "./OfferSlider";

function SummerSun() {
  const rays = [
    "left-1/2 top-[-2.1rem] h-9 w-2 -translate-x-1/2",
    "left-1/2 bottom-[-2.1rem] h-9 w-2 -translate-x-1/2",
    "right-[-2.1rem] top-1/2 h-2 w-9 -translate-y-1/2",
    "left-[-2.1rem] top-1/2 h-2 w-9 -translate-y-1/2",
    "right-[-1.45rem] top-[-1.1rem] h-8 w-2 rotate-45",
    "left-[-1.45rem] top-[-1.1rem] h-8 w-2 -rotate-45",
    "right-[-1.45rem] bottom-[-1.1rem] h-8 w-2 -rotate-45",
    "left-[-1.45rem] bottom-[-1.1rem] h-8 w-2 rotate-45",
  ];

  return (
    <div className="absolute right-[7%] top-10 hidden h-24 w-24 rounded-full border-[10px] border-[#ffc400]/80 opacity-70 md:block">
      <div className="absolute inset-4 rounded-full border-[7px] border-[#ffc400]/80" />
      {rays.map((className) => (
        <span
          key={className}
          className={`absolute rounded-full bg-[#ffc400]/80 ${className}`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function Offers({ lang = "ar", t }) {
  const data = offers[lang] || offers.ar;
  const isRtl = lang === "ar";

  return (
    <section
      id="offers"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-[#fff0d8] py-16 text-[#2b1b08] sm:py-20 lg:py-28"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(255,247,235,0.94),rgba(255,230,199,0.72)_48%,rgba(255,0,102,0.08))]" />
        <SummerSun />
        <div className="absolute -left-24 top-16 hidden h-52 w-52 rounded-full border-[18px] border-[#ff0066]/10 sm:block" />
        <div className="absolute bottom-0 left-0 h-36 w-full bg-[radial-gradient(ellipse_at_bottom,rgba(255,196,0,0.22),transparent_62%)]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 lg:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto mb-8 max-w-3xl text-center lg:mb-10"
        >
          <span className="mx-auto mb-3 flex w-fit rounded-full bg-[#2b1b08] px-5 py-2 text-sm font-black text-[#ffc400] shadow-[0_10px_24px_rgba(43,27,8,0.16)]">
            {data.exclusiveLabel}
          </span>
          <span className="mx-auto flex w-fit rounded-full border border-[#ff0066]/20 bg-white/70 px-5 py-2 text-sm font-black text-[#f90062] shadow-sm backdrop-blur">
            {data.eyebrow}
          </span>
          <h2 className="mt-4 text-2xl font-black leading-tight text-[#2b1b08] md:text-5xl lg:mt-6">
            {data.title}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-[#4c2c00]/72 md:text-lg">
            {data.description}
          </p>
        </motion.div>
      </div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
      >
        <OfferSlider lang={lang} t={t} />
      </motion.div>
    </section>
  );
}
