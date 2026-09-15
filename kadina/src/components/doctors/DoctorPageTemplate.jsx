import { motion } from "framer-motion";
import { useLocation, useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import Breadcrumbs from "../common/Breadcrumbs";
import Seo from "../seo/Seo";
import {
  absoluteUrl,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../seo/seoUtils";
import { getDoctorDetail } from "../../data/doctors";
import { createWhatsappUrl } from "../../utils/whatsapp";
import { useTrackedView } from "../../hooks/useAnalytics";
import {
  ANALYTICS_EVENTS,
  SOURCE_SECTIONS,
  getCurrentPath,
  trackContactAction,
} from "../../utils/analytics";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";

function EditorialLinks({ items, en }) {
  if (!items?.length) return null;

  return (
    <motion.div
      className="mt-5 border-t border-[var(--color-border)]"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewportOnce}
      whileInView="visible"
    >
      {items.map((item) => (
        <motion.div
          className="border-b border-[var(--color-border)]"
          key={item.to}
          variants={cardItem}
        >
          <Link
            className="group flex min-h-14 items-center justify-between gap-5 py-3.5 text-sm font-black leading-6 text-[var(--color-heading)] transition-colors hover:text-[var(--color-gold)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-gold)]"
            to={item.to}
          >
            <span>{item.title}</span>

            <span
              aria-hidden="true"
              className="shrink-0 text-[var(--color-gold)] transition-transform group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
            >
              {en ? "→" : "←"}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function DoctorPageTemplate({ doctor: rawDoctor }) {
  const location = useLocation();
  const { lang } = useOutletContext();
  const en = lang === "en";

  const doctor = rawDoctor
    ? getDoctorDetail(rawDoctor.slug, lang)
    : null;

  useTrackedView(
    ANALYTICS_EVENTS.DOCTOR_VIEW,
    {
      doctor_slug: rawDoctor?.slug,
      language: lang,
      path: getCurrentPath(location),
    },
    Boolean(doctor),
  );

  if (!doctor) {
    return (
      <>
        <Seo
          canonicalPath={location.pathname}
          description={
            en
              ? "The requested doctor page could not be found."
              : "تعذر العثور على صفحة الطبيب المطلوبة."
          }
          noindex
          title={en ? "Doctor Not Found" : "الطبيب غير موجود"}
        />

        <section className="min-h-[70vh] bg-[var(--color-surface)] px-4 pb-20 pt-32 sm:px-5 lg:px-8">
          <motion.div
            animate="visible"
            className="mx-auto max-w-2xl border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8 text-center sm:p-10"
            initial="hidden"
            variants={fadeUp}
          >
            <h1 className="text-3xl font-black text-[var(--color-heading)]">
              {en ? "Doctor Not Found" : "الطبيب غير موجود"}
            </h1>

            <p className="mt-4 leading-8 text-[var(--color-text-muted)]">
              {en
                ? "We could not find the requested doctor."
                : "لم نتمكن من العثور على الطبيب المطلوب."}
            </p>

            <Link
              className="ds-button ds-button-primary mt-7 inline-flex"
              to="/doctors"
            >
              {en ? "Back to Doctors" : "العودة إلى الأطباء"}
            </Link>
          </motion.div>
        </section>
      </>
    );
  }

  const canonicalPath = `/doctors/${doctor.slug}`;
  const seoDescription =
    doctor.shortBio || doctor.specialty || doctor.title;

  const personSchema = {
    "@type": "Person",
    name: doctor.name,
    url: absoluteUrl(canonicalPath),
    ...(doctor.title && { jobTitle: doctor.title }),
    ...(doctor.specialty && {
      medicalSpecialty: doctor.specialty,
    }),
    ...(doctor.image && {
      image: absoluteUrl(doctor.image),
    }),
  };

  const focusAreas = [
    ...doctor.services.map((item) => item.title),
    ...doctor.devices.map((item) => item.title),
    ...doctor.solutions.map((item) => item.title),
  ];

  const whatsappUrl = createWhatsappUrl(
    doctor.whatsappMessage,
  );

  return (
    <div className="bg-[var(--color-surface)] pt-[var(--nav-h)] text-[var(--color-heading)]">
      <Seo
        canonicalPath={canonicalPath}
        description={seoDescription}
        image={doctor.image}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            {
              name: en ? "Doctors" : "الأطباء",
              path: "/doctors",
            },
            {
              name: doctor.name,
              path: canonicalPath,
            },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: doctor.name,
            description: seoDescription,
            path: canonicalPath,
          }),
          personSchema,
        ]}
        title={`${doctor.name} — ${
          doctor.specialty || doctor.title
        }`}
      />

      {/* Doctor profile */}
      <section className="relative overflow-hidden bg-[var(--color-dark-brown)] py-8 sm:py-10 lg:py-14">
        <div className="ds-container !max-w-[72rem]">
          <Breadcrumbs
            items={[
              {
                label: en ? "Doctors" : "الأطباء",
                to: "/doctors",
              },
              { label: doctor.name },
            ]}
          />

          <motion.div
            animate="visible"
            className="mt-6 grid gap-8 md:grid-cols-[minmax(220px,0.72fr)_minmax(0,1.28fr)] md:items-center md:gap-10 lg:mt-8 lg:grid-cols-[minmax(280px,0.8fr)_minmax(0,1.2fr)] lg:gap-16"
            initial="hidden"
            variants={staggerContainer}
          >
            {/* Portrait */}
            <motion.div
              className="mx-auto aspect-[4/5] w-full max-w-[20rem] overflow-hidden rounded-[1.4rem] border border-[var(--color-border-on-dark)] bg-[var(--color-surface-raised)] md:mx-0 lg:max-w-[22rem]"
              variants={fadeUp}
            >
              {doctor.image ? (
                <img
                  alt={doctor.name}
                  className="h-full w-full object-cover object-top"
                  decoding="async"
                  fetchPriority="high"
                  height="1440"
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
                  className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_50%_30%,rgba(214,163,91,.16),transparent_42%)] p-6 text-center"
                  role="img"
                >
                  <span className="text-2xl font-black leading-relaxed text-[var(--color-gold)] sm:text-3xl">
                    {doctor.name}
                  </span>
                </div>
              )}
            </motion.div>

            {/* Information */}
            <motion.div variants={fadeUp}>
              <p className="text-xs font-black tracking-[.12em] text-[var(--color-gold)]">
                {doctor.title}
              </p>

              <h1 className="mt-3 max-w-3xl text-[clamp(1.75rem,3vw,2.625rem)] font-black leading-[1.15] tracking-[-.035em] text-[var(--color-cream)]">
                {doctor.name}
              </h1>

              <p className="mt-4 max-w-2xl text-base font-black leading-7 text-[var(--color-gold)] sm:text-lg">
                {doctor.specialty}
              </p>

              {doctor.shortBio && (
                <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-text-on-dark-muted)] sm:text-base sm:leading-8">
                  {doctor.shortBio}
                </p>
              )}

              {/* Experience */}
              {doctor.yearsOfExperience !== null && (
                <div className="mt-6 flex max-w-xl items-end gap-4 border-y border-[var(--color-border-on-dark)] py-4">
                  <strong className="text-[clamp(2rem,4vw,3.25rem)] font-black leading-none text-[var(--color-cream)]">
                    {doctor.yearsOfExperience}
                  </strong>

                  <span className="pb-1 text-sm font-bold text-[var(--color-text-on-dark-muted)]">
                    {en
                      ? "Years of experience"
                      : "سنة من الخبرة"}
                  </span>
                </div>
              )}

              {/* Expertise */}
              {focusAreas.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-black tracking-[.1em] text-[var(--color-gold)]">
                    {en
                      ? "AREAS OF EXPERTISE"
                      : "مجالات التميز"}
                  </p>

                  <div className="mt-3 flex max-w-2xl flex-wrap gap-2">
                    {focusAreas.map((area, index) => (
                      <span
                        className="inline-flex min-h-11 items-center rounded-full border border-[var(--color-border-on-dark)] bg-[var(--color-surface-raised)] px-3 py-1.5 text-xs font-bold leading-5 text-[var(--color-text-on-dark-muted)]"
                        key={`hero-focus-${index}`}
                      >
                        {area}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <a
                aria-label={
                  en
                    ? `Book with ${doctor.name} on WhatsApp (opens in a new window)`
                    : `احجز مع ${doctor.name} عبر واتساب (يفتح في نافذة جديدة)`
                }
                className="ds-button ds-button-primary mt-6 w-full sm:w-auto"
                href={whatsappUrl}
                onClick={() =>
                  trackContactAction(
                    ANALYTICS_EVENTS.WHATSAPP_CLICK,
                    {
                      language: lang,
                      page_type: "doctor",
                      slug: doctor.slug,
                      source_section:
                        SOURCE_SECTIONS.DOCTOR_DETAIL,
                    },
                  )
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                {en
                  ? "Book Your Consultation on WhatsApp"
                  : "احجز استشارتك عبر واتساب"}
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Related content */}
      {(doctor.services.length > 0 ||
        doctor.devices.length > 0 ||
        doctor.solutions.length > 0) && (
        <section className="bg-[var(--color-surface)] py-12 sm:py-16 lg:py-20">
          <div className="ds-container !max-w-[72rem]">
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
              {doctor.services.length > 0 && (
                <motion.div
                  initial="hidden"
                  variants={fadeUp}
                  viewport={viewportOnce}
                  whileInView="visible"
                >
                  <p className="text-xs font-black tracking-[.1em] text-[var(--color-gold)]">
                    {en ? "SPECIALTY" : "التخصص"}
                  </p>

                  <h2 className="mt-3 text-xl font-black leading-tight text-[var(--color-heading)] sm:text-2xl">
                    {en
                      ? "Related Services"
                      : "الخدمات المرتبطة"}
                  </h2>

                  <EditorialLinks
                    en={en}
                    items={doctor.services}
                  />
                </motion.div>
              )}

              {doctor.devices.length > 0 && (
                <motion.div
                  initial="hidden"
                  variants={fadeUp}
                  viewport={viewportOnce}
                  whileInView="visible"
                >
                  <p className="text-xs font-black tracking-[.1em] text-[var(--color-gold)]">
                    {en ? "TECHNOLOGY" : "التقنيات"}
                  </p>

                  <h2 className="mt-3 text-xl font-black leading-tight text-[var(--color-heading)] sm:text-2xl">
                    {en
                      ? "Related Devices"
                      : "الأجهزة المرتبطة"}
                  </h2>

                  <EditorialLinks
                    en={en}
                    items={doctor.devices}
                  />
                </motion.div>
              )}

              {doctor.solutions.length > 0 && (
                <motion.div
                  initial="hidden"
                  variants={fadeUp}
                  viewport={viewportOnce}
                  whileInView="visible"
                >
                  <p className="text-xs font-black tracking-[.1em] text-[var(--color-gold)]">
                    {en ? "CONCERNS" : "المشكلات"}
                  </p>

                  <h2 className="mt-3 text-xl font-black leading-tight text-[var(--color-heading)] sm:text-2xl">
                    {en
                      ? "Related Solutions"
                      : "الحلول المرتبطة"}
                  </h2>

                  <EditorialLinks
                    en={en}
                    items={doctor.solutions}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Social accounts */}
      {doctor.socialLinks.length > 0 && (
        <motion.section
          className="border-t border-[var(--color-border)] bg-[var(--color-surface-muted)]"
          initial="hidden"
          variants={fadeUp}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <div className="ds-container !max-w-[72rem] py-10 sm:py-12">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-black tracking-[.1em] text-[var(--color-gold)]">
                  {en ? "SOCIAL" : "التواصل"}
                </p>

                <h2 className="mt-2 text-xl font-black text-[var(--color-heading)] sm:text-2xl">
                  {en
                    ? "Doctor's Accounts"
                    : "حسابات الطبيب"}
                </h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {doctor.socialLinks.map((socialLink) => (
                  <a
                    aria-label={`${socialLink.label} (${
                      en
                        ? "opens in a new window"
                        : "يفتح في نافذة جديدة"
                    })`}
                    className="ds-button ds-button-secondary"
                    href={socialLink.url}
                    key={socialLink.url}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {socialLink.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.section>
      )}
    </div>
  );
}