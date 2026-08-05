import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import { fadeUp, viewportOnce } from "../../componetts/motionPresets";
import { createWhatsappUrl } from "../../utils/whatsapp";

export default function CTASection({
  title,
  description,
  primaryLabel,
  primaryTo,
  whatsappMessage,
  secondaryLabel,
  secondaryTo,
}) {
  const { lang = "ar" } = useOutletContext();
  const resolvedTitle = title || (lang === "ar" ? "خطوتك الأولى تبدأ باستشارة واضحة" : "Your first step begins with a clear consultation");
  const resolvedDescription = description || (lang === "ar" ? "احجز استشارتك مع فريق كادينا." : "Book your consultation with the Kadina team.");
  const resolvedPrimaryLabel = primaryLabel || (lang === "ar" ? "احجز استشارتك" : "Book Your Consultation");
  const resolvedMessage = whatsappMessage || (lang === "ar" ? "مرحبًا، أرغب في حجز استشارة." : "Hello, I would like to book a consultation.");
  const whatsappUrl = createWhatsappUrl(resolvedMessage);

  return (
    <motion.section
      className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      initial="hidden"
      variants={fadeUp}
      viewport={viewportOnce}
      whileInView="visible"
    >
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#f8aa2d]/30 bg-[#4c2c00] px-6 py-10 text-center shadow-[0_24px_70px_rgba(76,44,0,0.2)] sm:px-10 sm:py-12">
        <h2 className="text-2xl font-black text-[#fff7eb] sm:text-3xl">
          {resolvedTitle}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#fff7eb]/75">
          {resolvedDescription}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {primaryTo ? (
            <Link
              className="rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
              to={primaryTo}
            >
              {resolvedPrimaryLabel}
            </Link>
          ) : (
            <a
              aria-label={`${resolvedPrimaryLabel} (${lang === "ar" ? "يفتح في نافذة جديدة" : "opens in a new window"})`}
              className="rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
              href={whatsappUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {resolvedPrimaryLabel}
            </a>
          )}
          {secondaryLabel && secondaryTo && (
            <Link
              className="rounded-full border border-[#fff7eb]/25 px-6 py-3 font-black text-[#fff7eb] transition hover:border-[#f8aa2d] hover:text-[#f8aa2d]"
              to={secondaryTo}
            >
              {secondaryLabel}
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  );
}
