import { useState } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import DoctorsMarquee from "../components/doctors/DoctorsMarquee";
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
  trackEvent,
} from "../utils/analytics";
import MagneticButton from "../components/motion/MagneticButton";
import {
  fadeUp,
  viewportOnce,
} from "../componetts/motionPresets";

export default function DoctorsPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";

  const doctorDetails = getDoctorDetails(lang);

  const serviceCategories = getServicePages(lang).filter((service) =>
    doctorDetails.some((doctor) =>
      doctor.services.some(
        (item) => item.to === `/services/${service.slug}`,
      ),
    ),
  );

  const [activeFilter, setActiveFilter] = useState("all");

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
    <div className="bg-[var(--color-surface)] pt-[var(--nav-h)] text-[var(--color-text)]">
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
        eyebrow={en ? "Kadina Team" : "فريق كادينا"}
        title={
          en
            ? "Leading consultants under one roof"
            : "نخبة الاستشاريين... تحت سقف واحد"
        }
        description={
          en
            ? "Meet Kadina's consultant team and choose the specialist closest to your needs."
            : "تعرّف على فريق كادينا الاستشاري واختر الطبيب الأقرب لاحتياجك."
        }
        variant="editorial"
        className="!min-h-[300px] !bg-[var(--color-surface-muted)] md:!min-h-[330px]"
      />

      {/* Team */}
      <section className="bg-[var(--color-dark-brown)] py-12 sm:py-16 lg:py-20">
        <div className="ds-container !max-w-[76rem]">
          <motion.header
            className="mb-8 flex flex-col gap-4 sm:mb-10 lg:mb-12 lg:flex-row lg:items-end lg:justify-between"
            initial="hidden"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <div>
              <p className="text-xs font-black tracking-[0.12em] text-[var(--color-gold)]">
                {en ? "CONSULTANT TEAM" : "فريق الاستشاريين"}
              </p>

              <h2 className="mt-3 max-w-2xl text-[clamp(1.75rem,3vw,2.75rem)] font-black leading-[1.2] text-[var(--color-cream)]">
                {en ? "Meet Kadina's Doctors" : "تعرّف على أطباء كادينا"}
              </h2>
            </div>

            <p
              aria-live="polite"
              className="text-sm font-bold text-[var(--color-text-on-dark-muted)]"
            >
              {en
                ? `${visibleDoctors.length} consultants`
                : `${visibleDoctors.length} من الاستشاريين`}
            </p>
          </motion.header>

          {/* Filters */}
          <motion.div
            aria-label={
              en
                ? "Filter doctors by service"
                : "تصفية الأطباء حسب الخدمة"
            }
            className="-mx-4 mb-8 flex snap-x gap-2 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mx-0 sm:mb-10 sm:px-0"
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
            ].map((category) => {
              const active = activeFilter === category.to;

              return (
                <button
                  aria-pressed={active}
                  className={`min-h-11 shrink-0 snap-start rounded-full border px-5 py-2 text-sm font-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)] ${
                    active
                      ? "border-[var(--color-gold)] bg-[var(--color-gold)] text-[var(--color-dark-brown)]"
                      : "border-[var(--color-border-on-dark)] bg-[var(--color-surface-raised)] text-[var(--color-text-on-dark-muted)] hover:border-[rgba(214,163,91,.55)] hover:text-[var(--color-cream)]"
                  }`}
                  key={category.to}
                  onClick={() => {
                    setActiveFilter(category.to);
                    trackEvent(ANALYTICS_EVENTS.FILTER_CHANGE, {
                      language: lang,
                      path: window.location.pathname,
                      filter_type: "doctor_service",
                      filter_value: category.to === "all" ? "all" : category.to.split("/").at(-1),
                      source_section: SOURCE_SECTIONS.DOCTORS,
                    });
                  }}
                  type="button"
                >
                  {category.title}
                </button>
              );
            })}
          </motion.div>

        </div>
        <DoctorsMarquee
          autoplay={activeFilter === "all"}
          doctors={visibleDoctors}
          key={activeFilter}
          lang={lang}
        />
      </section>

      {/* CTA */}
      <motion.section
        className="border-t border-[var(--color-border-on-dark)] bg-[var(--color-dark-brown)] py-12 sm:py-14"
        initial="hidden"
        variants={fadeUp}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div className="ds-container text-center">
          <h2 className="text-2xl font-black text-[var(--color-cream)] sm:text-3xl">
            {en ? "Choose Your Doctor and Book" : "اختر طبيبك واحجز معه"}
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[var(--color-text-on-dark-muted)] sm:text-base">
            {en
              ? "A consultant specializing in your specific needs."
              : "استشاري متخصص في حالتك تحديدًا."}
          </p>

          <div className="mt-6">
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
                  trackContactAction(
                    ANALYTICS_EVENTS.WHATSAPP_CLICK,
                    {
                      language: lang,
                      page_type: "doctors",
                      source_section:
                        SOURCE_SECTIONS.DOCTORS,
                    },
                  )
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                {en
                  ? "Contact Us on WhatsApp"
                  : "تواصل عبر واتساب"}
              </a>
            </MagneticButton>
          </div>
        </div>
      </motion.section>
    </div>
  );
}
