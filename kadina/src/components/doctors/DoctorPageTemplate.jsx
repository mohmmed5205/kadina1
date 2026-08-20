import { motion } from "framer-motion";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import PageHero from "../common/PageHero";
import Seo from "../seo/Seo";
import {
  absoluteUrl,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../seo/seoUtils";
import { getDoctorDetail } from "../../data/doctors";
import { createWhatsappUrl } from "../../utils/whatsapp";
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
      className="mt-6 border-t border-[var(--color-border)]"
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
            className="group flex min-h-16 items-center justify-between gap-6 py-4 font-black leading-7 text-[var(--color-heading)] transition-colors hover:text-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-strong)]"
            to={item.to}
          >
            <span>{item.title}</span>
            <span
              aria-hidden="true"
              className="editorial-arrow shrink-0 text-[var(--color-accent-strong)]"
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
  const doctor = rawDoctor ? getDoctorDetail(rawDoctor.slug, lang) : null;

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
        <section className="min-h-[70vh] px-4 pb-20 pt-32 sm:px-5 lg:px-8">
          <motion.div
            animate="visible"
            className="mx-auto max-w-3xl rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-8 text-center shadow-[0_20px_60px_rgba(76,44,0,0.1)] sm:p-12"
            initial="hidden"
            variants={fadeUp}
          >
            <h1 className="text-3xl font-black text-[#4c2c00]">
              {en ? "Doctor Not Found" : "الطبيب غير موجود"}
            </h1>
            <p className="mt-4 leading-8 text-[#4c2c00]/68">
              {en
                ? "We could not find the requested doctor."
                : "لم نتمكن من العثور على الطبيب المطلوب."}
            </p>
            <Link
              className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
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
  const seoDescription = doctor.shortBio || doctor.specialty || doctor.title;
  const personSchema = {
    "@type": "Person",
    name: doctor.name,
    url: absoluteUrl(canonicalPath),
    ...(doctor.title && { jobTitle: doctor.title }),
    ...(doctor.specialty && { medicalSpecialty: doctor.specialty }),
    ...(doctor.image && { image: absoluteUrl(doctor.image) }),
  };
  const focusAreas = [
    ...doctor.services.map((item) => item.title),
    ...doctor.devices.map((item) => item.title),
    ...doctor.solutions.map((item) => item.title),
  ];
  const whatsappUrl = createWhatsappUrl(doctor.whatsappMessage);

  const portraitFallback = (
    <div
      aria-label={
        en
          ? `Portrait placeholder for ${doctor.name}`
          : `صورة تعريفية بديلة للطبيبة ${doctor.name}`
      }
      className="doctor-portrait-placeholder flex h-full w-full items-center justify-center p-8 text-center"
      role="img"
    >
      <span className="text-3xl font-black leading-relaxed text-[var(--color-heading)] sm:text-4xl">
        {doctor.name}
      </span>
    </div>
  );

  return (
    <div>
      <Seo
        canonicalPath={canonicalPath}
        description={seoDescription}
        image={doctor.image}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "Doctors" : "الأطباء", path: "/doctors" },
            { name: doctor.name, path: canonicalPath },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: doctor.name,
            description: seoDescription,
            path: canonicalPath,
          }),
          personSchema,
        ]}
        title={`${doctor.name} — ${doctor.specialty || doctor.title}`}
      />

      <PageHero
        breadcrumbItems={[
          { label: en ? "Doctors" : "الأطباء", to: "/doctors" },
          { label: doctor.name },
        ]}
        className="doctor-detail-hero"
        description={doctor.shortBio}
        eyebrow={doctor.title}
        secondaryTitle={doctor.specialty}
        title={doctor.name}
        variant="detail"
        visual={
          doctor.image
            ? {
                alt: doctor.name,
                className: "h-full w-full object-cover object-top",
                src: doctor.image,
              }
            : undefined
        }
        visualFallback={!doctor.image ? portraitFallback : undefined}
      >
        {doctor.yearsOfExperience !== null && (
          <p className="mt-6 border-s-2 border-[var(--color-accent)] ps-4 text-sm font-black text-[var(--color-heading)]">
            {en ? "Experience" : "الخبرة"}: {doctor.yearsOfExperience}{" "}
            {en ? "years" : "سنة"}
          </p>
        )}

        {focusAreas.length > 0 && (
          <div className="mt-7">
            <p className="text-xs font-black text-[var(--color-accent-strong)]">
              {en ? "Areas of Expertise" : "مجالات التميز"}
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-[var(--color-text-muted)]">
              {focusAreas.map((area, index) => (
                <li className="inline-flex items-center gap-2" key={`hero-focus-${index}`}>
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 rounded-full bg-[var(--color-accent-strong)]"
                  />
                  {area}
                </li>
              ))}
            </ul>
          </div>
        )}

        <a
          aria-label={
            en
              ? `Book with ${doctor.name} on WhatsApp (opens in a new window)`
              : `احجز مع ${doctor.name} عبر واتساب (يفتح في نافذة جديدة)`
          }
          className="ds-button ds-button-primary mt-8 w-full sm:w-auto"
          href={whatsappUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          {en
            ? "Book Your Consultation on WhatsApp"
            : "احجز استشارتك عبر واتساب"}
        </a>
      </PageHero>

      {(doctor.services.length > 0 ||
        doctor.devices.length > 0 ||
        doctor.solutions.length > 0) && (
        <section className="ds-section">
          <div className="ds-container grid gap-x-12 gap-y-14 lg:grid-cols-3">
            {doctor.services.length > 0 && (
              <motion.div
                initial="hidden"
                variants={fadeUp}
                viewport={viewportOnce}
                whileInView="visible"
              >
                <p className="section-title-eyebrow">
                  {en ? "Specialty" : "التخصص"}
                </p>
                <h2 className="mt-4 text-2xl font-black text-[var(--color-heading)] sm:text-3xl">
                  {en ? "Related Services" : "الخدمات المرتبطة"}
                </h2>
                <EditorialLinks en={en} items={doctor.services} />
              </motion.div>
            )}

            {doctor.devices.length > 0 && (
              <motion.div
                initial="hidden"
                variants={fadeUp}
                viewport={viewportOnce}
                whileInView="visible"
              >
                <p className="section-title-eyebrow">
                  {en ? "Technology" : "التقنيات"}
                </p>
                <h2 className="mt-4 text-2xl font-black text-[var(--color-heading)] sm:text-3xl">
                  {en ? "Related Devices" : "الأجهزة المرتبطة"}
                </h2>
                <EditorialLinks en={en} items={doctor.devices} />
              </motion.div>
            )}

            {doctor.solutions.length > 0 && (
              <motion.div
                initial="hidden"
                variants={fadeUp}
                viewport={viewportOnce}
                whileInView="visible"
              >
                <p className="section-title-eyebrow">
                  {en ? "Concerns" : "المشكلات"}
                </p>
                <h2 className="mt-4 text-2xl font-black text-[var(--color-heading)] sm:text-3xl">
                  {en ? "Related Solutions" : "الحلول المرتبطة"}
                </h2>
                <EditorialLinks en={en} items={doctor.solutions} />
              </motion.div>
            )}
          </div>
        </section>
      )}

      {doctor.socialLinks.length > 0 && (
        <motion.section
          className="border-t border-[var(--color-border)]"
          initial="hidden"
          variants={fadeUp}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <div className="ds-container ds-section-compact">
            <h2 className="text-2xl font-black text-[var(--color-heading)] sm:text-3xl">
              {en ? "Doctor's Accounts" : "حسابات الطبيب"}
            </h2>
            <div className="mt-6 flex flex-wrap gap-3">
              {doctor.socialLinks.map((socialLink) => (
                <a
                  aria-label={`${socialLink.label} (${en ? "opens in a new window" : "يفتح في نافذة جديدة"})`}
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
        </motion.section>
      )}
    </div>
  );
}
