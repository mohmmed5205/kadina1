import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { imageReveal, smoothEase, viewportOnce } from "../../componetts/motionPresets";

export default function RevealImage({ children, className = "", rtl = false }) {
  const shouldReduceMotion = useReducedMotion();
  const [isTouch, setIsTouch] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
  );

  useEffect(() => {
    const media = window.matchMedia("(pointer: coarse)");
    const update = (event) => setIsTouch(event.matches);
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  const revealVariants = isTouch
    ? {
        hidden: imageReveal.hidden,
        visible: {
          ...imageReveal.visible,
          transition: {
            ...imageReveal.visible.transition,
            duration: 0.52,
          },
        },
      }
    : imageReveal;

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      initial={shouldReduceMotion ? false : "hidden"}
      variants={revealVariants}
      viewport={viewportOnce}
      whileInView="visible"
    >
      {children}
      {!shouldReduceMotion && (
        <motion.span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(135deg,#fff7eb,#f8d9aa)]"
          initial={{ x: 0 }}
          viewport={viewportOnce}
          whileInView={{ x: rtl ? "-102%" : "102%" }}
          transition={{ duration: isTouch ? 0.52 : 0.82, ease: smoothEase }}
        />
      )}
    </motion.div>
  );
}
