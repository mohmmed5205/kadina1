import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import Link from "../components/routing/LocalizedLink";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import "./ServicesPage.css";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { getServicePages } from "../data/services";
import { getPublishedProceduresByService } from "../data/procedures";
import { SOURCE_SECTIONS } from "../utils/analytics";
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

export default function ServicesPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";

  const services = getServicePages(lang).map((service) => {
    const procedures = getPublishedProceduresByService(service.slug, lang);

    return {
      ...service,
      to: `/services/${service.slug}`,
      procedures,
    };
  });

  return (
    <div className="services-page services-listing-page">
      <Seo
        canonicalPath="/services"
        title={en ? "Services" : "الخدمات"}
        description={
          en
            ? "Explore Kadina Center's dermatology, laser, plastic surgery, hair and cosmetic injectable services in Riyadh."
            : "تعرّف على خدمات مركز كادينا في الجلدية والليزر وجراحة التجميل والشعر والحقن التجميلية بمدينة الرياض."
        }
        jsonLd={[
          createBreadcrumbSchema([
            {
              name: en ? "Home" : "الرئيسية",
              path: "/",
            },
            {
              name: en ? "Services" : "الخدمات",
              path: "/services",
            },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: en ? "Kadina Services" : "خدمات كادينا",
            description: en
              ? "Kadina Center services in dermatology, laser, plastic surgery, hair and cosmetic injectables."
              : "خدمات مركز كادينا في الجلدية والليزر وجراحة التجميل والشعر والحقن التجميلية.",
            path: "/services",
          }),
        ]}
      />

      <PageHero
        breadcrumbLabel={en ? "Services" : "الخدمات"}
        title={en ? "Kadina Services" : "خدمات كادينا"}
        description={
          en
            ? "Specialized care built around consultant expertise and carefully selected technologies."
            : "رعاية متخصصة تجمع الخبرة الاستشارية والتقنيات المناسبة لكل احتياج."
        }
        variant="editorial"
        className="services-hero"
      />

      <section className="services-specialties">
        <div className="ds-container services-specialties-container">
          <motion.div
            className="services-specialties-stack"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewportOnce}
            whileInView="visible"
          >
            {services.map((service, serviceIndex) => {
              const items =
                service.treatments?.length > 0
                  ? service.treatments
                  : service.procedures.map((procedure) => procedure.title);

              const visual = service.relatedDevices?.[0];

              return (
                <motion.article
                  className="services-specialty-panel"
                  key={service.slug}
                  variants={cardItem}
                >
                  <header className="services-specialty-header">
                    <span className="services-specialty-number">
                      {String(serviceIndex + 1).padStart(2, "0")}
                    </span>

                    <div>
                      <p className="services-specialty-eyebrow">
                        {en ? "Kadina Specialty" : "تخصصات كادينا"}
                      </p>

                      <h2>{service.title}</h2>

                      {service.subtitle && (
                        <p className="services-specialty-subtitle">
                          {service.subtitle}
                        </p>
                      )}
                    </div>
                  </header>

                  <div className="services-specialty-content">
                    <div className="services-specialty-main">
                      {items.length > 0 && (
                        <motion.div
                          className="services-treatment-grid"
                          initial="hidden"
                          variants={staggerContainer}
                          viewport={viewportOnce}
                          whileInView="visible"
                        >
                          {items.slice(0, 9).map((item, index) => (
                            <motion.div
                              className="services-treatment-tile"
                              key={`${service.slug}-item-${index}`}
                              variants={cardItem}
                            >
                              <span className="services-treatment-number">
                                {String(index + 1).padStart(2, "0")}
                              </span>

                              <span className="services-treatment-name">
                                {item}
                              </span>
                            </motion.div>
                          ))}
                        </motion.div>
                      )}

                      <Link
                        className="services-panel-cta"
                        to={service.to}
                        aria-label={`${
                          en ? "View service details" : "معرفة تفاصيل الخدمة"
                        }: ${service.title}`}
                      >
                        <span>
                          {en ? "View Service" : "معرفة التفاصيل"}
                        </span>

                        <span
                          aria-hidden="true"
                          className="services-panel-arrow"
                        >
                          {en ? "→" : "←"}
                        </span>
                      </Link>
                    </div>

                    <div className="services-specialty-visual">
                      {visual ? (
                        <>
                          <img
                            src={visual.image}
                            alt={visual.name}
                            loading="lazy"
                            decoding="async"
                          />

                          <div className="services-specialty-visual-caption">
                            <span>
                              {en ? "Featured Technology" : "تقنية مرتبطة"}
                            </span>

                            <strong dir="ltr">
                              {visual.name}
                            </strong>
                          </div>
                        </>
                      ) : (
                        <div className="services-specialty-placeholder">
                          <span className="services-placeholder-mark">
                            K
                          </span>

                          <strong>{service.title}</strong>

                          <span>
                            {en
                              ? "Kadina Center"
                              : "مركز كادينا"}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </motion.div>
        </div>
      </section>

      <div className="services-contact">
        <CTASection
          pageType="services"
          sourceSection={SOURCE_SECTIONS.SERVICES}
          title={
            en
              ? "Not sure which service is right for you?"
              : "لست متأكدًا أي خدمة تناسبك؟"
          }
          description={
            en
              ? "Contact us on WhatsApp and the Kadina team will help direct you to the right department."
              : "تواصل معنا عبر واتساب، وسيساعدك فريق كادينا في الوصول إلى القسم المناسب."
          }
          primaryLabel={
            en
              ? "Consult Us on WhatsApp"
              : "استشرنا عبر واتساب"
          }
          whatsappMessage={
            en
              ? "Hello, I would like to know which service is most suitable for my case at Kadina Center."
              : "مرحبًا، أرغب في معرفة الخدمة الأنسب لحالتي في مركز كادينا."
          }
        />
      </div>
    </div>
  );
}