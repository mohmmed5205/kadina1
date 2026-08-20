import { motion } from "framer-motion";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import PageHero from "../common/PageHero";
import Seo from "../seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../seo/seoUtils";
import { createWhatsappUrl } from "../../utils/whatsapp";
import { getSolutionDetail } from "../../data/solutions";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";

function EditorialList({ items, dark = false }) {
  return (
    <motion.ul
      className={`mt-8 border-t ${dark ? "border-white/15" : "border-[var(--color-border)]"}`}
      initial="hidden"
      variants={staggerContainer}
      viewport={viewportOnce}
      whileInView="visible"
    >
      {items.map((item, index) => (
        <motion.li
          className={`grid grid-cols-[2.75rem_1fr] gap-4 border-b py-5 sm:grid-cols-[4rem_1fr] sm:py-6 ${dark ? "border-white/15 text-[var(--color-text-on-dark)]" : "border-[var(--color-border)] text-[var(--color-text)]"}`}
          key={`solution-list-item-${index}`}
          variants={cardItem}
        >
          <span
            aria-hidden="true"
            className={`text-xs font-black tabular-nums ${dark ? "text-[var(--color-accent)]" : "text-[var(--color-accent-strong)]"}`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-base font-bold leading-8 sm:text-lg">
            {item}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}

function RelatedLinks({ items, en }) {
  if (!items?.length) return null;

  return (
    <motion.div
      className="mt-5 border-t border-white/15"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewportOnce}
      whileInView="visible"
    >
      {items.map((item) => (
        <motion.div
          className="border-b border-white/15"
          key={item.to}
          variants={cardItem}
        >
          <Link
            className="group flex min-h-14 items-center justify-between gap-5 py-3 font-black text-[var(--color-text-on-dark)] transition-colors hover:text-[var(--color-accent)]"
            to={item.to}
          >
            <span>{item.title}</span>
            <span
              aria-hidden="true"
              className="editorial-arrow text-[var(--color-accent)]"
            >
              {en ? "→" : "←"}
            </span>
          </Link>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default function SolutionPageTemplate({ solution: rawSolution }) {
  const location = useLocation();
  const { lang } = useOutletContext();
  const en = lang === "en";
  const solution = rawSolution
    ? getSolutionDetail(rawSolution.slug, lang)
    : null;

  if (!solution) {
    return (
      <>
        <Seo
          canonicalPath={location.pathname}
          description={
            en
              ? "The requested solution was not found among Kadina's problem and solution pages."
              : "الحل المطلوب غير موجود ضمن صفحات المشاكل والحلول في كادينا."
          }
          noindex
          title={en ? "Solution Not Found" : "الحل غير موجود"}
        />
        <section className="min-h-[70vh] px-4 pb-20 pt-32 sm:px-5 lg:px-8">
          <motion.div
            animate="visible"
            className="mx-auto max-w-3xl rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-8 text-center shadow-[0_20px_60px_rgba(76,44,0,0.1)] sm:p-12"
            initial="hidden"
            variants={fadeUp}
          >
            <h1 className="text-3xl font-black text-[#4c2c00]">
              {en ? "Solution Not Found" : "الحل غير موجود"}
            </h1>
            <p className="mt-4 leading-8 text-[#4c2c00]/68">
              {en
                ? "We could not find the requested solution."
                : "لم نتمكن من العثور على الحل المطلوب."}
            </p>
            <Link
              className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
              to="/solutions"
            >
              {en ? "Back to Solutions" : "العودة إلى الحلول"}
            </Link>
          </motion.div>
        </section>
      </>
    );
  }

  const whatsappUrl = createWhatsappUrl(solution.whatsappMessage);

  return (
    <div>
      <Seo
        canonicalPath={`/solutions/${solution.slug}`}
        description={solution.seoDescription}
        image={solution.image}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            {
              name: en ? "Problems & Solutions" : "المشاكل والحلول",
              path: "/solutions",
            },
            {
              name: solution.shortTitle,
              path: `/solutions/${solution.slug}`,
            },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: solution.seoPainHeadline,
            description: solution.seoDescription,
            path: `/solutions/${solution.slug}`,
          }),
        ]}
        title={`${solution.shortTitle} — ${solution.seoPainHeadline}`}
      />

      <PageHero
        breadcrumbItems={[
          {
            label: en ? "Problems & Solutions" : "المشكلات والحلول",
            to: "/solutions",
          },
          { label: solution.shortTitle },
        ]}
        description={solution.intro}
        eyebrow={solution.title}
        title={solution.painHeadline}
        variant="detail"
      />

      {!solution.compact && solution.isThisYou && (
        <section className="ds-section">
          <motion.div
            className="ds-container grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:gap-20"
            initial="hidden"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <div>
              <p className="section-title-eyebrow">
                {en ? "Understanding the Concern" : "بداية الفهم"}
              </p>
              <h2 className="mt-4 text-3xl font-black leading-tight text-[var(--color-heading)] sm:text-4xl lg:text-5xl">
                {en ? "Does This Sound Like You?" : "هل هذا أنت؟"}
              </h2>
            </div>
            <p className="border-s-2 border-[var(--color-accent)] ps-6 text-xl font-bold leading-10 text-[var(--color-text)] sm:ps-8 sm:text-2xl sm:leading-[1.8]">
              {solution.isThisYou}
            </p>
          </motion.div>
        </section>
      )}

      {!solution.compact && solution.signs.length > 0 && (
        <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-raised)]">
          <div className="ds-container ds-section-compact grid gap-8 lg:grid-cols-[minmax(0,.65fr)_minmax(0,1.35fr)] lg:gap-20">
            <motion.h2
              className="text-3xl font-black leading-tight text-[var(--color-heading)] sm:text-4xl"
              initial="hidden"
              variants={fadeUp}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {en ? "Signs of the Concern" : "علامات المشكلة"}
            </motion.h2>
            <EditorialList items={solution.signs} />
          </div>
        </section>
      )}

      {solution.kadinaSolution.length > 0 && (
        <section className="bg-[var(--color-surface-dark)] text-[var(--color-text-on-dark)]">
          <motion.div
            className="ds-container ds-section grid gap-10 lg:grid-cols-[minmax(0,.7fr)_minmax(0,1.3fr)] lg:gap-20"
            initial="hidden"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <div>
              <p className="page-hero-eyebrow">
                {en ? "The Kadina Approach" : "نهج كادينا"}
              </p>
              <h2 className="mt-4 text-4xl font-black leading-tight !text-[var(--color-text-on-dark)] sm:text-5xl">
                {en ? "The Kadina Solution" : "حل كادينا"}
              </h2>
            </div>

            <div>
              {solution.kadinaSolutionTitle && (
                <h3 className="text-2xl font-black leading-9 !text-[var(--color-accent)] sm:text-3xl">
                  {solution.kadinaSolutionTitle}
                </h3>
              )}
              {solution.compact ? (
                <p className="mt-6 text-lg font-bold leading-9 text-[var(--color-text-on-dark)]">
                  {solution.kadinaSolution[0]}
                </p>
              ) : (
                <EditorialList dark items={solution.kadinaSolution} />
              )}
              {solution.kadinaSolutionSupport && (
                <p className="mt-7 border-s border-[var(--color-accent)] ps-5 font-bold leading-8 text-[var(--color-text-on-dark-muted)]">
                  {solution.kadinaSolutionSupport}
                </p>
              )}

              <div className="mt-10 grid gap-8 sm:grid-cols-2">
                {solution.relatedDevices.length > 0 && (
                  <div>
                    <h3 className="text-sm font-black !text-[var(--color-accent)]">
                      {en ? "Devices Used" : "الأجهزة المستخدمة"}
                    </h3>
                    <RelatedLinks en={en} items={solution.relatedDevices} />
                  </div>
                )}
                {solution.relatedServices.length > 0 && (
                  <div>
                    <h3 className="text-sm font-black !text-[var(--color-accent)]">
                      {en ? "Related Services" : "الخدمات المرتبطة"}
                    </h3>
                    <RelatedLinks en={en} items={solution.relatedServices} />
                  </div>
                )}
                {solution.relatedDoctor && (
                  <div>
                    <h3 className="text-sm font-black !text-[var(--color-accent)]">
                      {en ? "Specialist Doctor" : "الطبيب المختص"}
                    </h3>
                    <RelatedLinks en={en} items={[solution.relatedDoctor]} />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </section>
      )}

      {solution.whatToExpect && (
        <section className="ds-section">
          <motion.div
            className="ds-container grid gap-8 lg:grid-cols-[minmax(0,.65fr)_minmax(0,1.35fr)] lg:gap-20"
            initial="hidden"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <h2 className="text-3xl font-black leading-tight text-[var(--color-heading)] sm:text-4xl">
              {en ? "What to Expect" : "ماذا تتوقع؟"}
            </h2>
            <p className="border-t border-[var(--color-accent)] pt-6 text-lg font-bold leading-9 text-[var(--color-text)] sm:text-xl">
              {solution.whatToExpect}
            </p>
          </motion.div>
        </section>
      )}

      {solution.reassurance && (
        <motion.section
          className="border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]"
          initial="hidden"
          variants={fadeUp}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <div className="ds-container py-16 text-center sm:py-20 lg:py-24">
            <p className="mx-auto max-w-5xl text-3xl font-black leading-tight text-[var(--color-heading)] sm:text-4xl lg:text-5xl">
              {solution.reassurance}
            </p>
          </div>
        </motion.section>
      )}

      <motion.section
        className="ds-section-compact"
        initial="hidden"
        variants={fadeUp}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div className="ds-container text-center">
          <a
            aria-label={`${solution.ctaLabel} (${en ? "opens in a new window" : "يفتح في نافذة جديدة"})`}
            className="ds-button ds-button-primary w-full sm:w-auto"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            {solution.ctaLabel}
          </a>
        </div>
      </motion.section>
    </div>
  );
}
