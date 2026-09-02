import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import Link from "../components/routing/LocalizedLink";
import PageHero from "../components/common/PageHero";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { getDoctorDetails } from "../data/doctors";
import { getServicePages } from "../data/services";
import { createWhatsappUrl } from "../utils/whatsapp";
import {
  ANALYTICS_EVENTS,
  SOURCE_SECTIONS,
  trackContactAction,
} from "../utils/analytics";
import RevealImage from "../components/motion/RevealImage";
import MagneticButton from "../components/motion/MagneticButton";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

export default function DoctorsPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const doctorDetails = getDoctorDetails(lang);
  const serviceCategories = getServicePages(lang).filter((service) =>
    doctorDetails.some((doctor) =>
      doctor.services.some((item) => item.to === `/services/${service.slug}`),
    ),
  );
  const [activeFilter, setActiveFilter] = useState("all");
  const shouldReduceMotion = useReducedMotion();
  const visibleDoctors =
    activeFilter === "all"
      ? doctorDetails
      : doctorDetails.filter((doctor) =>
          doctor.services.some((item) => item.to === activeFilter),
        );
  const whatsappUrl = createWhatsappUrl(
    en
      ? "Hello, I would like to book a consultation with a Kadina doctor."
      : "مرحبًا، أرغب في حجز استشارة مع أحد أطباء كادينا.",
  );

  return (
    <div>
      <Seo
        canonicalPath="/doctors"
        description={
          en
            ? "Meet Kadina's consultants in dermatology, laser, cosmetic injectables, plastic surgery and hair transplantation."
            : "تعرّف على فريق استشاريي كادينا في الجلدية والليزر والحقن التجميلي وجراحة التجميل وزراعة الشعر."
        }
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "Doctors" : "الأطباء", path: "/doctors" },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: en ? "Kadina Consultants" : "أطباء كادينا الاستشاريون",
            description: en
              ? "Kadina's consultant team in dermatology, laser, aesthetics and hair transplantation."
              : "فريق استشاريي كادينا في الجلدية والليزر والتجميل وزراعة الشعر.",
            path: "/doctors",
          }),
        ]}
        title={en ? "Kadina Consultants" : "أطباء كادينا الاستشاريون"}
      />

      <PageHero
        breadcrumbLabel={en ? "Doctors" : "الأطباء"}
        description={
          en
            ? "At Kadina, your case is seen by a consultant specializing in your needs. Meet the team, choose your doctor and book directly."
            : "في كادينا لا يقابلك «طبيب مناوب»، بل استشاري متخصص في حالتك تحديدًا. تعرّف على الفريق، واختر طبيبك، واحجز معه مباشرة."
        }
        eyebrow={en ? "Kadina Team" : "فريق كادينا"}
        title={
          en
            ? "Leading consultants under one roof"
            : "نخبة الاستشاريين... تحت سقف واحد"
        }
        variant="editorial"
      />

      <section className="ds-section">
        <div className="ds-container">
          <motion.div
            initial="hidden"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <p className="section-title-eyebrow">
              {en ? "Consultant Team" : "فريق الاستشاريين"}
            </p>
            <h2 className="mt-4 max-w-3xl text-3xl font-black leading-tight text-[var(--color-heading)] sm:text-4xl lg:text-5xl">
              {en ? "Meet Kadina's Doctors" : "تعرّف على أطباء كادينا"}
            </h2>
          </motion.div>

          <motion.div
            aria-label={en ? "Filter doctors by service" : "تصفية الأطباء حسب الخدمة"}
            className="mt-8 flex snap-x gap-2 overflow-x-auto border-y border-[var(--color-border)] py-4"
            initial="hidden"
            role="group"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            {[
              { title: en ? "All" : "الكل", to: "all" },
              ...serviceCategories.map((service) => ({
                title: service.title,
                to: `/services/${service.slug}`,
              })),
            ].map((category) => (
              <button
                aria-pressed={activeFilter === category.to}
                className={`min-h-11 shrink-0 snap-start border px-5 py-2 text-sm font-black transition-colors ${
                  activeFilter === category.to
                    ? "border-[var(--color-heading)] bg-[var(--color-heading)] text-[var(--color-text-on-dark)]"
                    : "border-[var(--color-border-strong)] text-[var(--color-text-muted)] hover:border-[var(--color-accent-strong)] hover:text-[var(--color-heading)]"
                }`}
                key={category.to}
                onClick={() => setActiveFilter(category.to)}
                type="button"
              >
                {category.title}
              </button>
            ))}
          </motion.div>

          <p className="mt-5 text-sm font-bold text-[var(--color-text-muted)]" aria-live="polite">
            {en
              ? `${visibleDoctors.length} consultants`
              : `${visibleDoctors.length} من الاستشاريين`}
          </p>

          <motion.div
            animate="visible"
            aria-label={en ? "Kadina doctors" : "أطباء كادينا"}
            className="mt-8 grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 lg:gap-x-12 lg:gap-y-20"
            id="doctors-gallery"
            initial="hidden"
            key={activeFilter}
            role="list"
            variants={staggerContainer}
          >
            {visibleDoctors.map((doctor, index) => (
              <div
                className={index % 2 === 1 ? "md:pt-16" : ""}
                key={doctor.slug}
                role="listitem"
              >
                <motion.article
                  className="doctor-gallery-item group"
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.45, delay: shouldReduceMotion ? 0 : Math.min(index, 3) * 0.06 }}
                  variants={cardItem}
                >
                  <Link
                    aria-label={`${en ? "View profile for" : "عرض الملف التعريفي للطبيب"} ${doctor.name}`}
                    className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-strong)]"
                    to={`/doctors/${doctor.slug}`}
                  >
                    <RevealImage
                      className="aspect-[4/5] w-full bg-[var(--color-surface-muted)]"
                      rtl={lang === "ar"}
                    >
                      {doctor.image ? (
                        <img
                          alt={doctor.name}
                          className="doctor-portrait-image h-full w-full object-cover object-top"
                          decoding="async"
                          fetchPriority={index < 2 ? "high" : "auto"}
                          height="1440"
                          loading={index < 2 ? "eager" : "lazy"}
                          src={doctor.image}
                          width="1080"
                        />
                      ) : (
                        <div
                          aria-label={
                            en
                              ? `Portrait placeholder for ${doctor.name}`
                              : `صورة تعريفية بديلة للطبيبة ${doctor.name}`
                          }
                          className="doctor-portrait-placeholder flex h-full w-full items-center justify-center p-8 text-center"
                          role="img"
                        >
                          <span className="max-w-xs text-3xl font-black leading-relaxed text-[var(--color-heading)] sm:text-4xl">
                            {doctor.name}
                          </span>
                        </div>
                      )}
                    </RevealImage>

                    <div className="doctor-gallery-meta relative border-b border-[var(--color-border)] py-6 sm:py-7">
                      <p className="mb-3 text-xs font-black tracking-[.12em] text-[var(--color-accent-strong)]">
                        {String(index + 1).padStart(2, "0")}
                      </p>
                      <h3 className="text-2xl font-black leading-tight text-[var(--color-heading)] sm:text-3xl">
                        {doctor.name}
                      </h3>
                      <p className="mt-3 max-w-xl font-bold leading-8 text-[var(--color-text-muted)]">
                        {doctor.specialty}
                      </p>
                      <span className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-black text-[var(--color-accent-strong)]">
                        {en ? "View Profile" : "الملف التعريفي"}
                        <span aria-hidden="true" className="editorial-arrow">
                          {en ? "→" : "←"}
                        </span>
                      </span>
                    </div>
                  </Link>
                </motion.article>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      <motion.section
        className="ds-section-compact bg-[var(--color-surface-dark)]"
        initial="hidden"
        variants={fadeUp}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div className="ds-container text-center">
          <h2 className="text-3xl font-black !text-[var(--color-text-on-dark)] sm:text-4xl">
            {en ? "Choose Your Doctor and Book" : "اختر طبيبك واحجز معه"}
          </h2>
          <p className="mx-auto mt-4 max-w-2xl leading-8 text-[var(--color-text-on-dark-muted)]">
            {en
              ? "A consultant specializing in your specific needs."
              : "استشاري متخصص في حالتك تحديدًا."}
          </p>
          <div className="mt-7">
            <MagneticButton className="w-full sm:w-auto">
              <a
                aria-label={
                  en
                    ? "Book your consultation on WhatsApp (opens in a new window)"
                    : "احجز استشارتك عبر واتساب (يفتح في نافذة جديدة)"
                }
                className="ds-button ds-button-primary w-full sm:w-auto"
                href={whatsappUrl}
                onClick={() =>
                  trackContactAction(ANALYTICS_EVENTS.WHATSAPP_CLICK, {
                    language: lang,
                    page_type: "doctors",
                    source_section: SOURCE_SECTIONS.DOCTORS,
                  })
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                {en ? "Contact Us on WhatsApp" : "تواصل عبر واتساب"}
              </a>
            </MagneticButton>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
