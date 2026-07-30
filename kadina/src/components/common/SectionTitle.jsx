import { motion } from "framer-motion";
import { fadeUp, viewportOnce } from "../../componetts/motionPresets";

export default function SectionTitle({ eyebrow, title, description, align = "start" }) {
  const alignment =
    align === "center" ? "mx-auto items-center text-center" : "items-start";

  return (
    <motion.div
      className={`flex max-w-3xl flex-col ${alignment}`}
      initial="hidden"
      variants={fadeUp}
      viewport={viewportOnce}
      whileInView="visible"
    >
      {eyebrow && (
        <p className="text-sm font-black tracking-wide text-[#cf7d11]">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl font-black leading-tight text-[#4c2c00] sm:text-3xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base font-medium leading-8 text-[#4c2c00]/68">
          {description}
        </p>
      )}
    </motion.div>
  );
}
