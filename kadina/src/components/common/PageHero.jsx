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

  return (
    <section className={`page-hero ${variantClassName} ${className}`}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(214,163,91,.22),transparent_38%)]" />
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute end-[12%] top-[22%] hidden h-32 w-32 rounded-full border border-[var(--color-border-strong)] lg:block"
        animate={shouldReduceMotion ? undefined : { y: [0, -12, 0], scale: [1, 1.04, 1], opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 11, ease: "easeInOut", repeat: Infinity }}
      />
      <img
        aria-hidden="true"
        alt=""
        className={`pointer-events-none absolute -bottom-20 end-[5%] h-72 w-auto object-contain opacity-[0.045] sm:h-96 ${utility ? "brightness-[4]" : ""}`}
        src="/kadina-logo3.webp"
      />
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
