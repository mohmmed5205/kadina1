import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { MODAL_EVENT } from "./SmoothScroll";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    mass: 0.28,
  });
  const shouldReduceMotion = useReducedMotion();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const handleModalState = (event) => setModalOpen(Boolean(event.detail?.open));
    window.addEventListener(MODAL_EVENT, handleModalState);
    return () => window.removeEventListener(MODAL_EVENT, handleModalState);
  }, []);

  if (shouldReduceMotion || modalOpen) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-x-0 top-[env(safe-area-inset-top)] z-[60] h-0.5 origin-left bg-[#f8aa2d] shadow-[0_1px_8px_rgba(248,170,45,0.45)] rtl:origin-right"
      style={{ scaleX }}
    />
  );
}
