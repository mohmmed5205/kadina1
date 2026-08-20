import { motion } from "framer-motion";
import {
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";

export default function CardGrid({
  animate = true,
  children,
  className = "",
  ...props
}) {
  const gridClassName = `grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`;

  if (!animate) {
    return (
      <div className={gridClassName} {...props}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={gridClassName}
      initial="hidden"
      variants={staggerContainer}
      viewport={viewportOnce}
      whileInView="visible"
      {...props}
    >
      {children}
    </motion.div>
  );
}
