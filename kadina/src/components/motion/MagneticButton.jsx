import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";

export default function MagneticButton({ children, className = "" }) {
  const shouldReduceMotion = useReducedMotion();
  const [canMagnetize, setCanMagnetize] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches,
  );
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 22, mass: 0.3 });
  const springY = useSpring(y, { stiffness: 260, damping: 22, mass: 0.3 });

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const update = (event) => setCanMagnetize(event.matches);
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  const handlePointerMove = (event) => {
    if (shouldReduceMotion || !canMagnetize || event.pointerType !== "mouse") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    x.set(((event.clientX - bounds.left) / bounds.width - 0.5) * 12);
    y.set(((event.clientY - bounds.top) / bounds.height - 0.5) * 12);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={`inline-flex ${className}`}
      onPointerLeave={reset}
      onPointerMove={handlePointerMove}
      style={shouldReduceMotion || !canMagnetize ? undefined : { x: springX, y: springY }}
    >
      {children}
    </motion.span>
  );
}
