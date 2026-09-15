import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import { fadeUp, viewportOnce } from "../../componetts/motionPresets";
import { createWhatsappUrl } from "../../utils/whatsapp";
import MagneticButton from "../motion/MagneticButton";
import {
  ANALYTICS_EVENTS,
  trackContactAction,
} from "../../utils/analytics";

export default function CTASection({
  title,
  description,
  primaryLabel,
  primaryTo,
  whatsappMessage,
  secondaryLabel,
  secondaryTo,
  sourceSection,
  pageType,
  slug,
}) {
  const { lang = "ar" } = useOutletContext();
  const resolvedTitle = title || (lang === "ar" ? "خطوتك الأولى تبدأ باستشارة واضحة" : "Your first step begins with a clear consultation");
  const resolvedDescription = description || (lang === "ar" ? "احجز استشارتك مع فريق كادينا." : "Book your consultation with the Kadina team.");
  const resolvedPrimaryLabel = primaryLabel || (lang === "ar" ? "احجز استشارتك" : "Book Your Consultation");
  const resolvedMessage = whatsappMessage || (lang === "ar" ? "مرحبًا، أرغب في حجز استشارة." : "Hello, I would like to book a consultation.");
  const whatsappUrl = createWhatsappUrl(resolvedMessage);

  return (
    <motion.section
      className="ds-section-compact"
      initial="hidden"
      variants={fadeUp}
      viewport={viewportOnce}
      whileInView="visible"
    >
      <div className="ds-container">
        <div className="cta-panel">
          <h2>{resolvedTitle}</h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8">
            {resolvedDescription}
          </p>
          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row sm:flex-wrap">
            {primaryTo ? (
              <MagneticButton className="w-full sm:w-auto">
                <Link
                  className="ds-button ds-button-primary w-full sm:w-auto"
                  to={primaryTo}
                >
                  {resolvedPrimaryLabel}
                </Link>
              </MagneticButton>
            ) : (
              <MagneticButton className="w-full sm:w-auto">
                <a
                  aria-label={`${resolvedPrimaryLabel} (${lang === "ar" ? "يفتح في نافذة جديدة" : "opens in a new window"})`}
                  className="ds-button ds-button-primary w-full sm:w-auto"
                  href={whatsappUrl}
                  onClick={() =>
                    sourceSection &&
                    trackContactAction(ANALYTICS_EVENTS.WHATSAPP_CLICK, {
                      language: lang,
                      page_type: pageType,
                      slug,
                      source_section: sourceSection,
                    })
                  }
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {resolvedPrimaryLabel}
                </a>
              </MagneticButton>
            )}
            {secondaryLabel && secondaryTo && (
              <Link
                className="ds-button ds-button-on-dark w-full sm:w-auto"
                to={secondaryTo}
              >
                {secondaryLabel}
              </Link>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
