import { motion, useReducedMotion } from "framer-motion";
import {
  staggerFast,
  textReveal,
  viewportOnce,
} from "../../componetts/motionPresets";

export default function SectionTitle({ eyebrow, title, description, align = "start" }) {
  const shouldReduceMotion = useReducedMotion();
  const alignment =
    align === "center" ? "section-title-center" : "";

  return (
    <motion.div
      className={`section-title ${alignment}`}
      initial={shouldReduceMotion ? false : "hidden"}
      variants={staggerFast}
      viewport={viewportOnce}
      whileInView="visible"
    >
      {eyebrow && (
        <motion.p
          className="section-title-eyebrow"
          variants={textReveal}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.span
        aria-hidden="true"
        className="section-title-rule"
        variants={{
          hidden: { scaleX: 0 },
          visible: {
            scaleX: 1,
            transition: { duration: 0.62, ease: [0.22, 1, 0.36, 1] },
          },
        }}
      />
      <motion.h2
        className="section-title-heading"
        variants={textReveal}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className="section-title-description"
          variants={textReveal}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
