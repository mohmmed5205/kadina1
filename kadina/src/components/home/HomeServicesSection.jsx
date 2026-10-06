import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import SectionTitle from "../common/SectionTitle";
import { cardItem, viewportOnce } from "../../componetts/motionPresets";
import { getServicePages } from "../../data/services";

const MotionLink = motion.create(Link);

export default function HomeServicesSection() {
  const { lang, t } = useOutletContext();
  const services = getServicePages(lang);

  return (
    <section
      className="scroll-mt-24 overflow-hidden bg-[var(--color-surface)] pt-[var(--section-space)]"
      id="services"
    >
      <div className="ds-container pb-12 lg:pb-16">
        <SectionTitle
          eyebrow={lang === "ar" ? "خدماتنا" : "Our Services"}
          title={t.services.title}
          description={t.services.description}
        />
      </div>

      <motion.div
        className="border-y border-[var(--color-border-strong)]"
        initial="hidden"
        viewport={viewportOnce}
        whileInView="visible"
      >
        {services.map((service, index) => {
          const visual = service.relatedDevices?.[0]?.image;
          const dark = true;

          return (
            <MotionLink
              className={`service-panel group relative isolate block overflow-hidden border-b last:border-b-0 ${dark ? "border-[var(--color-border-on-dark)] bg-[var(--color-surface-dark)]" : "border-[var(--color-border-strong)] bg-[var(--color-surface-muted)]"}`}
              key={service.slug}
              to={`/services/${service.slug}`}
              variants={cardItem}
            >
              <div className={`grid min-h-[26rem] lg:min-h-[30rem] lg:grid-cols-2 ${index % 2 ? "service-panel-reverse" : ""}`}>
                <div className={`service-panel-content relative z-10 flex flex-col justify-between px-[var(--page-gutter)] py-9 sm:py-12 lg:px-[max(var(--page-gutter),calc((100vw-var(--container-max))/2+var(--page-gutter)))] lg:py-14 ${index % 2 ? "lg:order-2" : ""}`}>
                  <div className="flex items-center justify-between gap-5">
                    <span className={`text-sm font-black tracking-[.14em] ${dark ? "text-[var(--color-accent)]" : "text-[var(--color-accent-strong)]"}`}>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className={`h-px flex-1 ${dark ? "bg-[var(--color-border-on-dark)]" : "bg-[var(--color-border-strong)]"}`} aria-hidden="true" />
                  </div>
                  <div className="my-9 lg:my-10">
                    <h3 className={`max-w-3xl text-[clamp(2rem,4vw,3.75rem)] font-black leading-[.94] tracking-[-.06em] ${dark ? "text-[var(--color-text-on-dark)]" : "text-[var(--color-heading)]"}`}>
                      {service.title}
                    </h3>
                    <p className={`mt-4 max-w-xl text-base leading-8 lg:text-lg ${dark ? "text-[var(--color-text-on-dark-muted)]" : "text-[var(--color-text-muted)]"}`}>
                      {service.subtitle}
                    </p>
                  </div>
                  <span className={`inline-flex w-fit items-center gap-4 border-b pb-2 font-black ${dark ? "border-[var(--color-accent)] text-[var(--color-accent)]" : "border-[var(--color-accent-strong)] text-[var(--color-heading)]"}`}>
                    {lang === "ar" ? "استكشف الخدمة" : "Explore service"}
                    <span aria-hidden="true" className="editorial-arrow">
                      {lang === "ar" ? "←" : "→"}
                    </span>
                  </span>
                </div>

                <div className={`service-panel-visual relative min-h-[18rem] overflow-hidden ${dark ? "bg-[var(--color-surface-raised)]" : "bg-[var(--color-surface)]"} ${index % 2 ? "lg:order-1" : ""}`}>
                  {visual ? (
                  <img
                    alt={service.title}
                    className="h-full min-h-[22rem] w-full object-contain p-10 transition-transform duration-700 group-hover:scale-[1.025] sm:p-16 lg:absolute lg:inset-0 lg:min-h-0 lg:p-[clamp(2rem,5vw,5rem)]"
                    decoding="async"
                    loading="lazy"
                    src={visual}
                  />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <img
                        alt=""
                        aria-hidden="true"
                        className={`w-[min(58%,22rem)] object-contain opacity-[.11] ${dark ? "brightness-0 invert" : ""}`}
                        decoding="async"
                        loading="lazy"
                        src="/kadina-logo3.webp"
                      />
                      <span className={`absolute text-[clamp(10rem,24vw,28rem)] font-black leading-none tracking-[-.1em] ${dark ? "text-[var(--color-text-on-dark)]/[.035]" : "text-[var(--color-heading)]/[.035]"}`} aria-hidden="true">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </MotionLink>
          );
        })}
      </motion.div>

      <div className="ds-container py-10 lg:py-14">
        <Link
          className="inline-flex min-h-12 items-center gap-4 border-b border-[var(--color-accent-strong)] pb-2 font-black text-[var(--color-heading)]"
          to="/services"
        >
          <span>{lang === "ar" ? "عرض جميع الخدمات" : "View All Services"}</span>
          <span aria-hidden="true" className="editorial-arrow">
            {lang === "ar" ? "←" : "→"}
          </span>
        </Link>
      </div>
    </section>
  );
}
