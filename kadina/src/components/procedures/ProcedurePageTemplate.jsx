import { motion } from "framer-motion";
import { useLocation, useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import PageHero from "../common/PageHero";
import DirectAnswer from "../content/DirectAnswer";
import MedicalReviewBy from "../content/MedicalReviewBy";
import Seo from "../seo/Seo";
import {
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "../seo/seoUtils";
import { getDeviceDetail } from "../../data/devices";
import { getDoctorDetail } from "../../data/doctors";
import { getProcedure } from "../../data/procedures";
import { getServicePage } from "../../data/services";
import { getSolutionDetail } from "../../data/solutions";
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

function NumberedList({ items }) {
  if (!items?.length) return null;

  return (
    <motion.ol
      className="mt-7 border-t border-[var(--color-border)]"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewportOnce}
      whileInView="visible"
    >
      {items.map((item, index) => (
        <motion.li
          className="grid grid-cols-[3rem_1fr] gap-3 border-b border-[var(--color-border)] py-5 sm:grid-cols-[4.5rem_1fr] sm:py-6"
          key={`${item}-${index}`}
          variants={cardItem}
        >
          <span className="text-xs font-black tabular-nums text-[var(--color-accent-strong)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="font-bold leading-8 text-[var(--color-text)] sm:text-lg">
            {item}
          </span>
        </motion.li>
      ))}
    </motion.ol>
  );
}

function EditorialRelation({ en, eyebrow, title, to }) {
  return (
    <Link
      className="group flex min-h-16 items-center justify-between gap-5 border-y border-[var(--color-border)] py-4 font-black text-[var(--color-heading)] transition-colors hover:text-[var(--color-accent-strong)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-strong)]"
      to={to}
    >
      <span>
        <span className="block text-xs text-[var(--color-accent-strong)]">
          {eyebrow}
        </span>
        <span className="mt-1 block text-lg">{title}</span>
      </span>
      <span aria-hidden="true" className="editorial-arrow">
        {en ? "→" : "←"}
      </span>
    </Link>
  );
}

export default function ProcedurePageTemplate({ procedure: rawProcedure }) {
  const location = useLocation();
  const { lang } = useOutletContext();
  const en = lang === "en";
  const procedure = rawProcedure ? getProcedure(rawProcedure.slug, lang) : null;
  useTrackedView(
    ANALYTICS_EVENTS.PROCEDURE_VIEW,
    {
      language: lang,
      path: getCurrentPath(location),
      procedure_slug: rawProcedure?.slug,
      service_slug: rawProcedure?.serviceSlug,
    },
    Boolean(procedure),
  );

  if (!procedure) {
    return (
      <>
        <Seo
          canonicalPath={location.pathname}
          description={
            en
              ? "The requested procedure page is not available."
              : "صفحة الإجراء المطلوبة غير متاحة."
          }
          noindex
          title={en ? "Procedure Not Available" : "الإجراء غير متاح"}
        />
        <section className="min-h-[70vh] px-4 pb-20 pt-32 text-center">
          <h1 className="text-3xl font-black text-[var(--color-heading)]">
            {en ? "Procedure Not Available" : "الإجراء غير متاح"}
          </h1>
          <Link className="ds-button ds-button-primary mt-7" to="/services">
            {en ? "View Services" : "عرض الخدمات"}
          </Link>
        </section>
      </>
    );
  }

  const service = getServicePage(procedure.serviceSlug, lang);
  const doctors = procedure.doctorSlugs
    .map((slug) => getDoctorDetail(slug, lang))
    .filter(Boolean);
  const devices = procedure.deviceSlugs
    .map((slug) => getDeviceDetail(slug, lang))
    .filter(Boolean);
  const solutions = procedure.solutionSlugs
    .map((slug) => getSolutionDetail(slug, lang))
    .filter(Boolean);
  const canonicalPath = `/procedures/${procedure.slug}`;
  const whatsappUrl = createWhatsappUrl(procedure.whatsappMessage);

  return (
    <div>
      <Seo
        canonicalPath={canonicalPath}
        description={procedure.metaDescription}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "Services" : "الخدمات", path: "/services" },
            { name: service.title, path: `/services/${service.slug}` },
            { name: procedure.title, path: canonicalPath },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: procedure.title,
            description: procedure.metaDescription,
            path: canonicalPath,
          }),
          procedure.faq?.length ? createFaqSchema(procedure.faq) : null,
        ]}
        title={procedure.seoTitle}
      />

      <PageHero
        breadcrumbItems={[
          { label: en ? "Services" : "الخدمات", to: "/services" },
          { label: service.title, to: `/services/${service.slug}` },
          { label: procedure.title },
        ]}
        eyebrow={en ? "Kadina Procedures" : "إجراءات كادينا"}
        title={procedure.headline}
        variant="detail"
      />

      <DirectAnswer
        answer={procedure.directAnswer?.answer || procedure.intro}
        lang={lang}
        question={
          procedure.directAnswer?.question ||
          (en
            ? `What should you know about ${procedure.title}?`
            : `ما الذي ينبغي معرفته عن ${procedure.title}؟`)
        }
      />

      {procedure.whatIsIt && (
        <section className="ds-section">
          <div className="ds-container grid gap-7 lg:grid-cols-[minmax(0,.65fr)_minmax(0,1.35fr)] lg:gap-20">
            <h2 className="text-3xl font-black text-[var(--color-heading)] sm:text-4xl">
              {en ? "What Is the Procedure?" : "ما هو الإجراء؟"}
            </h2>
            <p className="border-t border-[var(--color-accent)] pt-6 text-lg font-bold leading-9">
              {procedure.whatIsIt}
            </p>
          </div>
        </section>
      )}

      {procedure.whoIsItFor?.length > 0 && (
        <section className="ds-section bg-[var(--color-surface-muted)]">
          <div className="ds-container grid gap-7 lg:grid-cols-[minmax(0,.65fr)_minmax(0,1.35fr)] lg:gap-20">
            <h2 className="text-3xl font-black text-[var(--color-heading)] sm:text-4xl">
              {en ? "Who May It Suit?" : "لمن قد يناسب؟"}
            </h2>
            <NumberedList items={procedure.whoIsItFor} />
          </div>
        </section>
      )}

      {procedure.howItWorks?.length > 0 && (
        <section className="ds-section">
          <div className="ds-container grid gap-7 lg:grid-cols-[minmax(0,.65fr)_minmax(0,1.35fr)] lg:gap-20">
            <h2 className="text-3xl font-black text-[var(--color-heading)] sm:text-4xl">
              {en ? "How Is It Planned?" : "كيف يتم التخطيط للإجراء؟"}
            </h2>
            <NumberedList items={procedure.howItWorks} />
          </div>
        </section>
      )}

      {procedure.expectedResults && (
        <motion.section
          className="border-y border-[var(--color-border)] bg-[var(--color-surface-raised)]"
          initial="hidden"
          variants={fadeUp}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <div className="ds-container ds-section grid gap-7 lg:grid-cols-[minmax(0,.65fr)_minmax(0,1.35fr)] lg:gap-20">
            <h2 className="text-3xl font-black text-[var(--color-heading)] sm:text-4xl">
              {en ? "Expected Results" : "النتائج المتوقعة"}
            </h2>
            <p className="border-t border-[var(--color-accent)] pt-6 text-lg font-bold leading-9">
              {procedure.expectedResults}
            </p>
          </div>
        </motion.section>
      )}

      <section className="ds-section bg-[var(--color-surface-dark)] text-[var(--color-text-on-dark)]">
        <div className="ds-container">
          <h2 className="text-4xl font-black !text-[var(--color-text-on-dark)] sm:text-5xl">
            {en ? "Connected Care" : "رعاية مترابطة"}
          </h2>
          <div className="mt-10 grid gap-10 lg:grid-cols-2">
            <div>
              <h3 className="text-sm font-black !text-[var(--color-accent)]">
                {en ? "Service" : "الخدمة"}
              </h3>
              <div className="mt-4 [&_a]:!border-[var(--color-border-on-dark)] [&_a]:!text-[var(--color-text-on-dark)]">
                <EditorialRelation
                  en={en}
                  eyebrow={en ? "Related service" : "الخدمة المرتبطة"}
                  title={service.title}
                  to={`/services/${service.slug}`}
                />
              </div>
            </div>
            {solutions.length > 0 && (
              <div>
                <h3 className="text-sm font-black !text-[var(--color-accent)]">
                  {en ? "Concern" : "المشكلة المرتبطة"}
                </h3>
                <div className="mt-4 space-y-3 [&_a]:!border-[var(--color-border-on-dark)] [&_a]:!text-[var(--color-text-on-dark)]">
                  {solutions.map((solution) => (
                    <EditorialRelation
                      en={en}
                      eyebrow={en ? "Problem & solution" : "المشكلة والحل"}
                      key={solution.slug}
                      title={solution.shortTitle}
                      to={`/solutions/${solution.slug}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {doctors.length > 0 && (
        <section className="ds-section">
          <div className="ds-container">
            <h2 className="text-3xl font-black text-[var(--color-heading)] sm:text-4xl">
              {en ? "Related Doctor" : "الطبيب المرتبط"}
            </h2>
            <div className="mt-9 grid gap-8 sm:grid-cols-2">
              {doctors.map((doctor) => (
                <Link
                  className="group grid gap-6 border-y border-[var(--color-border)] py-7 sm:grid-cols-[8rem_1fr] sm:items-center"
                  key={doctor.slug}
                  to={`/doctors/${doctor.slug}`}
                >
                  <div className="aspect-[4/5] overflow-hidden bg-[var(--color-surface-muted)]">
                    <img
                      alt={doctor.name}
                      className="h-full w-full object-cover"
                      loading="lazy"
                      src={doctor.image}
                    />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-[var(--color-heading)]">
                      {doctor.name}
                    </h3>
                    <p className="mt-3 leading-7 text-[var(--color-text-muted)]">
                      {doctor.specialty}
                    </p>
                    <span className="mt-5 inline-flex min-h-11 items-center gap-2 font-black text-[var(--color-accent-strong)]">
                      {en ? "Doctor Profile" : "ملف الطبيب"}
                      <span aria-hidden="true" className="editorial-arrow">
                        {en ? "→" : "←"}
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {devices.length > 0 && (
        <section className="ds-section bg-[var(--color-surface-muted)]">
          <div className="ds-container">
            <h2 className="text-3xl font-black text-[var(--color-heading)] sm:text-4xl">
              {en ? "Related Technology" : "التقنيات المرتبطة"}
            </h2>
            <div className="mt-9 grid gap-px bg-[var(--color-border)] md:grid-cols-3">
              {devices.map((device) => (
                <Link
                  className="group flex min-h-80 flex-col bg-[var(--color-surface-raised)] p-6"
                  key={device.slug}
                  to={`/technology/${device.slug}`}
                >
                  <img
                    alt={device.arabicName}
                    className="h-40 w-full object-contain"
                    loading="lazy"
                    src={device.image}
                  />
                  <h3 className="mt-6 text-2xl font-black text-[var(--color-heading)]" dir="ltr">
                    {device.arabicName}
                  </h3>
                  <span className="mt-auto inline-flex min-h-11 items-end gap-2 pt-5 font-black text-[var(--color-accent-strong)]">
                    {en ? "Technology Details" : "تفاصيل التقنية"}
                    <span aria-hidden="true" className="editorial-arrow">
                      {en ? "→" : "←"}
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {procedure.faq?.length > 0 && (
        <section className="ds-section">
          <div className="ds-container max-w-4xl">
            <h2 className="text-3xl font-black text-[var(--color-heading)] sm:text-4xl">
              {en ? "Frequently Asked Questions" : "الأسئلة الشائعة"}
            </h2>
            <div className="mt-8 border-t border-[var(--color-border)]">
              {procedure.faq.map((item, index) => (
                <details
                  className="border-b border-[var(--color-border)] py-5"
                  key={`${item.question}-${index}`}
                >
                  <summary className="min-h-11 cursor-pointer list-none text-lg font-black text-[var(--color-heading)]">
                    {item.question}
                  </summary>
                  <p className="mt-4 leading-8 text-[var(--color-text-muted)]">
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      <MedicalReviewBy
        lang={lang}
        review={
          procedure.medicalReviewBy
            ? {
                ...procedure.medicalReviewBy,
                lastReviewedDate:
                  procedure.lastReviewedDate ||
                  procedure.medicalReviewBy.lastReviewedDate,
              }
            : null
        }
      />

      <section className="ds-section-compact">
        <div className="ds-container text-center">
          <a
            className="ds-button ds-button-primary w-full sm:w-auto"
            href={whatsappUrl}
            onClick={() =>
              trackContactAction(ANALYTICS_EVENTS.WHATSAPP_CLICK, {
                language: lang,
                page_type: "procedure",
                slug: procedure.slug,
                source_section: SOURCE_SECTIONS.PROCEDURE_DETAIL,
              })
            }
            rel="noopener noreferrer"
            target="_blank"
          >
            {procedure.ctaLabel}
          </a>
        </div>
      </section>
    </div>
  );
}
