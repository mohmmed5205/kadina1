import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

export default function CountUp({ value }) {
  const ref = useRef(null);
  const shouldReduceMotion = useReducedMotion();
  const isInView = useInView(ref, { once: true, amount: 0.65 });
  const match = String(value).match(/[\d,.]+/);
  const target = Number(match?.[0]?.replaceAll(",", "") || 0);
  const suffix = String(value).replace(match?.[0] || "", "");
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!isInView || shouldReduceMotion) {
      return undefined;
    }

    const duration = 1100;
    const startedAt = performance.now();
    let frameId;

    const tick = (now) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(target * eased));
      if (progress < 1) frameId = window.requestAnimationFrame(tick);
    };

    frameId = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frameId);
  }, [isInView, shouldReduceMotion, target]);

  const resolvedValue = shouldReduceMotion ? target : displayValue;

  return <span ref={ref}>{resolvedValue}{suffix}</span>;
}
