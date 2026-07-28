import { Link } from "react-router-dom";
import { createWhatsappUrl } from "../../utils/whatsapp";

export default function CTASection({
  title = "خطوتك الأولى تبدأ باستشارة واضحة",
  description = "احجز استشارتك مع فريق كادينا.",
  primaryLabel = "احجز استشارتك",
  primaryTo,
  whatsappMessage = "مرحبًا، أرغب في حجز استشارة.",
  secondaryLabel,
  secondaryTo,
}) {
  const whatsappUrl = createWhatsappUrl(whatsappMessage);

  return (
    <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-[#f8aa2d]/30 bg-[#4c2c00] px-6 py-10 text-center shadow-[0_24px_70px_rgba(76,44,0,0.2)] sm:px-10 sm:py-12">
        <h2 className="text-2xl font-black text-[#fff7eb] sm:text-3xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#fff7eb]/75">
          {description}
        </p>
        <div className="mt-7 flex flex-wrap justify-center gap-3">
          {primaryTo ? (
            <Link
              className="rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
              to={primaryTo}
            >
              {primaryLabel}
            </Link>
          ) : (
            <a
              aria-label={`${primaryLabel} (يفتح في نافذة جديدة)`}
              className="rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
              href={whatsappUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {primaryLabel}
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
    </section>
  );
}
