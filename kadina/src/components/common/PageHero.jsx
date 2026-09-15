import { motion, useReducedMotion } from "framer-motion";
import { useLocation } from "react-router-dom";
import Breadcrumbs from "./Breadcrumbs";
import { staggerFast, textReveal } from "../../componetts/motionPresets";

export default function PageHero({
  children,
  className = "",
  breadcrumbLabel,
  breadcrumbItems,
  eyebrow,
  title,
  secondaryTitle,
  secondaryTitleDir,
  description,
  variant,
  visual,
  visualFallback,
}) {
  const { pathname } = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const resolvedVariant = variant || (/^\/(contact|faq|blog|booking)/.test(pathname) ? "utility" : "editorial");
  const utility = resolvedVariant === "utility";
  const detail = resolvedVariant === "detail";
  const hasVisual = Boolean(visual || visualFallback);
  const variantClassName = utility
    ? "page-hero-utility"
    : detail
      ? "page-hero-detail"
      : "page-hero-editorial";

  const detailDensityClassName = detail && !hasVisual
    ? "page-hero-detail-no-visual"
    : "";

  return (
    <section className={`page-hero ${variantClassName} ${detailDensityClassName} ${className}`}>
      <div className="pointer-events-none absolute inset-x-[var(--page-gutter)] bottom-0 h-px bg-[var(--color-border-strong)]" />
      <motion.div
        animate="visible"
        className="ds-container relative"
        initial={shouldReduceMotion ? false : "hidden"}
        variants={staggerFast}
      >
        <motion.div variants={textReveal}>
          <Breadcrumbs
            items={breadcrumbItems || [{ label: breadcrumbLabel || title }]}
          />
        </motion.div>
        <div className={detail && hasVisual ? "page-hero-detail-grid" : ""}>
          <div>
            <motion.p className="page-hero-eyebrow mt-7 lg:mt-10" variants={textReveal}>
              {eyebrow}
            </motion.p>
            <motion.h1 className="page-hero-title break-words" variants={textReveal}>
              {title}
            </motion.h1>
            {secondaryTitle && (
              <motion.p
                className="page-hero-secondary-title"
                dir={secondaryTitleDir}
                variants={textReveal}
              >
                {secondaryTitle}
              </motion.p>
            )}
            {description && (
              <motion.p className="page-hero-description" variants={textReveal}>
                {description}
              </motion.p>
            )}
            {children && <motion.div variants={textReveal}>{children}</motion.div>}
          </div>
          {detail && hasVisual && (
            <motion.div
              className="page-hero-detail-visual"
              variants={textReveal}
            >
              {visual ? (
                <img
                  alt={visual.alt}
                  className={visual.className || "h-full w-full object-contain"}
                  decoding="async"
                  fetchPriority="high"
                  src={visual.src}
                />
              ) : (
                visualFallback
              )}
            </motion.div>
          )}
        </div>
      </motion.div>
    </section>
  );
}
