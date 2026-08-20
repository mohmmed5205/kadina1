import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import {
  ScanFace,
  Scissors,
  Sparkles,
  Stethoscope,
  Syringe,
} from "lucide-react";
import SectionTitle from "../common/SectionTitle";
import { cardItem, viewportOnce } from "../../componetts/motionPresets";
import { getServicePages } from "../../data/services";

const MotionLink = motion.create(Link);

const serviceIcons = {
  dermatology: Stethoscope,
  laser: Sparkles,
  "plastic-surgery": Scissors,
  hair: ScanFace,
  injectables: Syringe,
};

const bentoPlacement = [
  "lg:col-span-7 lg:row-span-3",
  "lg:col-span-5 lg:row-span-2",
  "lg:col-span-5 lg:row-span-1",
  "lg:col-span-6 lg:row-span-1",
  "lg:col-span-6 lg:row-span-1",
];

export default function HomeServicesSection() {
  const { lang } = useOutletContext();
  const services = getServicePages(lang);

  return (
    <section
      className="ds-section scroll-mt-24 bg-[var(--color-surface)]"
      id="services"
    >
      <div className="ds-container">
        <SectionTitle
          eyebrow={lang === "ar" ? "خدماتنا" : "Our Services"}
          title={lang === "ar" ? "الخدمات" : "Services"}
        />

        <motion.div
          className="mt-10 grid grid-flow-dense grid-cols-1 gap-4 md:grid-cols-2 lg:mt-14 lg:grid-cols-12 lg:auto-rows-[10rem]"
          initial="hidden"
          viewport={viewportOnce}
          whileInView="visible"
        >
          {services.map((service, index) => {
            const ServiceIcon = serviceIcons[service.slug];
            const visual = service.relatedDevices?.[0]?.image;
            const featured = index === 0;

            return (
              <MotionLink
                className={`service-bento-item group relative isolate flex min-h-56 flex-col justify-end overflow-hidden border p-6 sm:min-h-64 sm:p-8 lg:p-9 ${bentoPlacement[index]} ${featured ? "border-[var(--color-border-on-dark)] bg-[var(--color-surface-dark)] text-[var(--color-text-on-dark)]" : index === 1 ? "border-[var(--color-border)] bg-[var(--color-warm-beige-strong)]" : "border-[var(--color-border)] bg-[var(--color-surface-raised)]"}`}
                key={service.slug}
                to={`/services/${service.slug}`}
                variants={cardItem}
              >
                {visual && index < 2 ? (
                  <img
                    alt=""
                    aria-hidden="true"
                    className={`pointer-events-none absolute end-0 top-0 -z-10 h-[58%] w-[62%] object-contain p-5 transition-transform duration-500 group-hover:scale-[1.02] ${featured ? "opacity-25 brightness-[1.8]" : "opacity-35"}`}
                    decoding="async"
                    loading="lazy"
                    src={visual}
                  />
                ) : null}

                <span
                  className={`absolute end-6 top-6 flex h-12 w-12 items-center justify-center rounded-full border ${featured ? "border-[var(--color-border-on-dark)] text-[var(--color-accent)]" : "border-[var(--color-border-strong)] text-[var(--color-accent-strong)]"}`}
                >
                  <ServiceIcon aria-hidden="true" size={23} strokeWidth={1.7} />
                </span>

                <p
                  className={`text-xs font-black tracking-[0.12em] ${featured ? "text-[var(--color-accent)]" : "text-[var(--color-accent-strong)]"}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3
                  className={`mt-3 font-black leading-[1.12] ${featured ? "on-dark-heading max-w-2xl text-[clamp(2.5rem,6vw,5rem)]" : index === 1 ? "text-3xl text-[var(--color-heading)] sm:text-4xl" : "text-2xl text-[var(--color-heading)]"}`}
                >
                  {service.title}
                </h3>
                <p
                  className={`mt-3 max-w-xl leading-8 ${featured ? "text-[var(--color-text-on-dark-muted)] lg:text-lg" : "text-[var(--color-text-muted)]"}`}
                >
                  {service.subtitle}
                </p>
                <span
                  className={`mt-5 inline-flex items-center gap-3 font-black ${featured ? "text-[var(--color-accent)]" : "text-[var(--color-accent-strong)]"}`}
                >
                  {lang === "ar" ? "التفاصيل" : "Details"}
                  <span aria-hidden="true" className="editorial-arrow">
                    {lang === "ar" ? "←" : "→"}
                  </span>
                </span>
              </MotionLink>
            );
          })}
        </motion.div>

        <Link
          className="mt-9 inline-flex min-h-11 items-center font-black text-[var(--color-accent-strong)] underline decoration-[var(--color-accent)]/45 underline-offset-8"
          to="/services"
        >
          {lang === "ar" ? "عرض جميع الخدمات" : "View All Services"}
        </Link>
      </div>
    </section>
  );
}
