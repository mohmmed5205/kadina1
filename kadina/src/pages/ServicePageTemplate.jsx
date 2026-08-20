import { motion } from "framer-motion";
import { Link, useOutletContext } from "react-router-dom";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import RevealImage from "../components/motion/RevealImage";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { getServicePage } from "../data/services";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

const MotionLink = motion.create(Link);

export default function ServicePageTemplate({ slug }) {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const service = getServicePage(slug, lang);

  if (!service) return null;

  return (
    <div>
      <Seo
        canonicalPath={`/services/${service.slug}`}
        description={service.seoDescription}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: service.title, path: `/services/${service.slug}` },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: service.seoSubtitle,
            description: service.seoDescription,
            path: `/services/${service.slug}`,
          }),
          createFaqSchema(service.seoFaq),
        ]}
        title={`${service.title} — ${service.seoSubtitle}`}
      />

      <PageHero
        breadcrumbItems={[
          { label: en ? "Services" : "الخدمات", to: "/services" },
          { label: service.title },
        ]}
        eyebrow={en ? "Kadina Services" : "خدمات كادينا"}
        title={service.title}
        description={service.subtitle}
        variant="detail"
        visual={service.relatedDevices[0] ? {
          alt: service.relatedDevices[0].name,
          src: service.relatedDevices[0].image,
        } : undefined}
      />

      <motion.section className="ds-section bg-[var(--color-surface)]" initial="hidden" variants={fadeUp} viewport={viewportOnce} whileInView="visible">
        <div className="ds-container grid gap-8 lg:grid-cols-[minmax(12rem,.42fr)_minmax(0,1fr)] lg:gap-20">
          <div>
            <p className="text-xs font-black tracking-[0.14em] text-[var(--color-accent-strong)]">{en ? "THE KADINA APPROACH" : "منهج كادينا"}</p>
            <span aria-hidden="true" className="mt-5 block h-px w-16 bg-[var(--color-accent)]" />
            <p className="mt-5 text-sm font-black text-[var(--color-heading)]">{service.title}</p>
          </div>
          <div className="border-t border-[var(--color-border-strong)] pt-8 lg:pt-10">
            <p className="max-w-4xl text-xl font-medium leading-[2] text-[var(--color-text)] sm:text-2xl sm:leading-[1.9]">{service.intro}</p>
            {service.additionalParagraphs.map((paragraph, index) => (
              <p className="mt-6 max-w-4xl text-lg font-medium leading-9 text-[var(--color-text-muted)] sm:text-xl" key={`service-paragraph-${index}`}>{paragraph}</p>
            ))}
          </div>
        </div>
      </motion.section>

      {service.treatments.length > 0 && (
        <section className="ds-section border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="ds-container">
            <SectionTitle title={en ? "What Do We Treat?" : "ماذا نعالج؟"} />
            <motion.div className="mt-10 grid border-y border-[var(--color-border-strong)] sm:grid-cols-2" initial="hidden" variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
              {service.treatments.map((treatment, index) => (
                <motion.div className="border-b border-[var(--color-border)] py-6 font-black text-[var(--color-heading)] sm:px-7" key={`service-treatment-${index}`} variants={cardItem}>
                  <span className="me-4 text-xs text-[var(--color-accent-strong)]">{String(index + 1).padStart(2, "0")}</span>
                  {treatment}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {service.relatedDevices.length > 0 && (
        <section className="ds-section border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="ds-container">
            <SectionTitle eyebrow={en ? "Technology" : "التقنيات"} title={en ? "Related Devices" : "الأجهزة المرتبطة"} />
            <motion.div className="mt-12 border-t border-[var(--color-border-strong)]" initial="hidden" variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
              {service.relatedDevices.map((device, index) => (
                <motion.article className="service-device-row grid gap-7 border-b border-[var(--color-border-strong)] py-8 md:grid-cols-[minmax(0,1.15fr)_minmax(16rem,.85fr)] md:items-center md:gap-12 lg:py-12" key={device.to} variants={cardItem}>
                  <RevealImage className="flex aspect-[4/3] items-center justify-center rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5 sm:p-8" rtl={!en}>
                    <img alt={device.name} className="h-full w-full object-contain" decoding="async" loading="lazy" src={device.image} />
                  </RevealImage>
                  <div className="py-1">
                    <span className="text-xs font-black text-[var(--color-accent-strong)]">{String(index + 1).padStart(2, "0")}</span>
                    <h3 className="mt-5 text-[clamp(2rem,4vw,3.5rem)] font-black leading-[1.08] text-[var(--color-heading)]" dir="ltr">{device.name}</h3>
                    {device.use && <p className="mt-5 max-w-xl leading-8 text-[var(--color-text-muted)]">{device.use}</p>}
                    <MotionLink className="group mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[var(--color-border-strong)] pb-1 text-sm font-black text-[var(--color-accent-strong)] focus-visible:outline-none" to={device.to}>
                      {en ? "Device Details" : "تفاصيل الجهاز"}
                      <span aria-hidden="true" className="editorial-arrow">{en ? "→" : "←"}</span>
                    </MotionLink>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {service.faq.length > 0 && (
        <section className="ds-section bg-[var(--color-surface)]">
          <div className="ds-container max-w-4xl">
            <SectionTitle eyebrow={en ? "Before Booking" : "قبل الحجز"} title={en ? "Frequently Asked Questions" : "الأسئلة الشائعة"} />
            <motion.div className="mt-10 border-t border-[var(--color-border-strong)]" initial="hidden" variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
              {service.faq.map((item, index) => (
                <motion.details className="group border-b border-[var(--color-border)] py-5" key={`service-faq-${index}`} variants={cardItem}>
                  <summary className="min-h-11 cursor-pointer list-none pe-1 text-lg font-black text-[var(--color-heading)] outline-none marker:hidden">{item.question}</summary>
                  <p className="mt-4 max-w-3xl leading-8 text-[var(--color-text-muted)]">{item.answer}</p>
                </motion.details>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <CTASection title={service.subtitle} description={service.intro} primaryLabel={service.ctaLabel} whatsappMessage={service.whatsappMessage} />
    </div>
  );
}
