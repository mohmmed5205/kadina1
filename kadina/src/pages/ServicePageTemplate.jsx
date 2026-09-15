import { motion } from "framer-motion";
import { useLocation, useOutletContext } from "react-router-dom";
import Link from "../components/routing/LocalizedLink";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import DirectAnswer from "../components/content/DirectAnswer";
import "./ServicesPage.css";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { getServicePage } from "../data/services";
import { getPublishedProceduresByService } from "../data/procedures";
import { useTrackedView } from "../hooks/useAnalytics";
import {
  ANALYTICS_EVENTS,
  SOURCE_SECTIONS,
  getCurrentPath,
} from "../utils/analytics";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

const MotionLink = motion.create(Link);

export default function ServicePageTemplate({ slug }) {
  const location = useLocation();
  const { lang } = useOutletContext();
  const en = lang === "en";

  const service = getServicePage(slug, lang);

  useTrackedView(
    ANALYTICS_EVENTS.SERVICE_VIEW,
    {
      language: lang,
      path: getCurrentPath(location),
      service_slug: slug,
    },
    Boolean(service),
  );

  if (!service) return null;

  const publishedProcedures = getPublishedProceduresByService(slug, lang);

  return (
    <div className="services-page service-detail-page">
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
        title={service.seoTitle}
      />

      <PageHero
        breadcrumbItems={[
          {
            label: en ? "Services" : "الخدمات",
            to: "/services",
          },
          {
            label: service.title,
          },
        ]}
        eyebrow={en ? "Kadina Services" : "خدمات كادينا"}
        title={service.title}
        description={service.subtitle}
        variant="editorial"
        className="services-hero services-detail-hero"
      />

      <DirectAnswer
        answer={service.directAnswer?.answer}
        lang={lang}
        question={service.directAnswer?.question}
      />

      {/* Approach */}
      <motion.section
        className="services-intro services-section"
        initial="hidden"
        variants={fadeUp}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div
          className={`ds-container services-intro-layout${
            service.relatedDevices[0] ? " services-intro-with-visual" : ""
          }`}
        >
          <div className="services-intro-heading">
            <p className="section-title-eyebrow">
              {en ? "Our Approach" : "منهجنا"}
            </p>

            <h2>
              {en ? "The Kadina Approach" : "منهج كادينا"}
            </h2>

            <p>{service.title}</p>
          </div>

          <div className="services-intro-copy">
            <p>{service.intro}</p>

            {service.additionalParagraphs.map((paragraph, index) => (
              <p key={`service-paragraph-${index}`}>
                {paragraph}
              </p>
            ))}
          </div>

          {service.relatedDevices[0] && (
            <figure className="services-intro-visual">
              <img
                alt={service.relatedDevices[0].name}
                src={service.relatedDevices[0].image}
                loading="lazy"
                decoding="async"
              />

              <figcaption dir="ltr">
                {service.relatedDevices[0].name}
              </figcaption>
            </figure>
          )}
        </div>
      </motion.section>

      {/* Treatments */}
      {service.treatments.length > 0 && (
        <section className="services-treatments services-section">
          <div className="ds-container">
            <SectionTitle
              eyebrow={en ? "Care" : "الرعاية"}
              title={en ? "What Do We Treat?" : "ماذا نعالج؟"}
            />

            <motion.div
              className="services-treatment-list"
              initial="hidden"
              variants={staggerContainer}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {service.treatments.map((treatment, index) => (
                <motion.div
                  className="services-treatment-item"
                  key={`service-treatment-${index}`}
                  variants={cardItem}
                >
                  <span aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <p>{treatment}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Procedures */}
      {publishedProcedures.length > 0 && (
        <section className="services-procedures services-section">
          <div className="ds-container services-procedures-layout">
            <div>
              <p className="section-title-eyebrow">
                {en ? "Procedures" : "الإجراءات"}
              </p>

              <h2 className="services-procedures-title">
                {en
                  ? "Procedures in This Service"
                  : "إجراءات هذا القسم"}
              </h2>
            </div>

            <motion.div
              className="services-procedure-list"
              initial="hidden"
              variants={staggerContainer}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {publishedProcedures.map((procedure, index) => (
                <MotionLink
                  className="services-procedure-link"
                  key={procedure.slug}
                  to={`/procedures/${procedure.slug}`}
                  variants={cardItem}
                >
                  <span className="services-procedure-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span className="services-procedure-name">
                    {procedure.title}
                  </span>

                  <span
                    aria-hidden="true"
                    className="editorial-arrow"
                  >
                    {en ? "→" : "←"}
                  </span>
                </MotionLink>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Related devices */}
      {service.relatedDevices.length > 0 && (
        <section className="services-devices services-section">
          <div className="ds-container">
            <SectionTitle
              eyebrow={en ? "Technology" : "التقنيات"}
              title={en ? "Related Devices" : "الأجهزة المرتبطة"}
            />

            <motion.div
              className="services-device-list"
              initial="hidden"
              variants={staggerContainer}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {service.relatedDevices.map((device, index) => (
                <motion.article
                  className="services-device-item"
                  key={device.to}
                  variants={cardItem}
                >
                  <div className="services-device-visual">
                    <img
                      alt={device.name}
                      decoding="async"
                      loading="lazy"
                      src={device.image}
                    />
                  </div>

                  <div className="services-device-copy">
                    <span className="services-index" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <h3 dir="ltr">
                      {device.name}
                    </h3>

                    {device.use && (
                      <p>{device.use}</p>
                    )}

                    <Link
                      className="services-text-link"
                      to={device.to}
                      aria-label={`${
                        en ? "Device Details" : "تفاصيل الجهاز"
                      }: ${device.name}`}
                    >
                      {en ? "Device Details" : "تفاصيل الجهاز"}

                      <span
                        aria-hidden="true"
                        className="editorial-arrow"
                      >
                        {en ? "→" : "←"}
                      </span>
                    </Link>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* FAQ */}
      {service.faq.length > 0 && (
        <section className="services-faq services-section">
          <div className="ds-container services-faq-container">
            <SectionTitle
              eyebrow={en ? "Before Booking" : "قبل الحجز"}
              title={
                en
                  ? "Frequently Asked Questions"
                  : "الأسئلة الشائعة"
              }
            />

            <motion.div
              className="services-faq-list"
              initial="hidden"
              variants={staggerContainer}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {service.faq.map((item, index) => (
                <motion.details
                  className="services-faq-item"
                  key={`service-faq-${index}`}
                  variants={cardItem}
                >
                  <summary>
                    {item.question}
                  </summary>

                  <p>{item.answer}</p>
                </motion.details>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <div className="services-contact">
        <CTASection
          title={service.subtitle}
          description={service.intro}
          primaryLabel={service.ctaLabel}
          whatsappMessage={service.whatsappMessage}
          pageType="service"
          slug={service.slug}
          sourceSection={SOURCE_SECTIONS.SERVICE_DETAIL}
        />
      </div>
    </div>
  );
}