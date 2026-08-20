import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { pageTransition } from "../../componetts/motionPresets";

export default function PageTransition({ children }) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  // Query-string filters animate their own result set; only real route changes
  // should trigger the page-level transition.
  const routeKey = location.pathname;

  if (shouldReduceMotion) return children;

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={routeKey}
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
