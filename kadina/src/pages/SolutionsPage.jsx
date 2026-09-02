import { useMemo } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { useOutletContext, useSearchParams } from "react-router-dom";
import Link from "../components/routing/LocalizedLink";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { getSolutionDetails } from "../data/solutions";
import { createWhatsappUrl } from "../utils/whatsapp";
import { getLocalizedText } from "../utils/i18n";
import {
  ANALYTICS_EVENTS,
  SOURCE_SECTIONS,
  trackContactAction,
  trackEvent,
} from "../utils/analytics";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

const MotionLink = motion.create(Link);

const areaFilters = [
  { slug: "all", label: { ar: "الكل", en: "All" } },
  { slug: "face", label: { ar: "الوجه", en: "Face" } },
  { slug: "body", label: { ar: "الجسم", en: "Body" } },
  { slug: "hair", label: { ar: "الشعر", en: "Hair" } },
  { slug: "skin", label: { ar: "البشرة", en: "Skin" } },
];

const filterBySlug = Object.fromEntries(
  areaFilters.map((filter) => [filter.slug, filter]),
);

function getResultsLabel(count, lang) {
  if (lang === "en") return `${count} ${count === 1 ? "solution" : "solutions"}`;
  if (count === 0) return "لا توجد حلول";
  if (count === 1) return "حل واحد";
  if (count === 2) return "حلّان";
  if (count >= 3 && count <= 10) return `${count} حلول`;

  return `${count} حلًا`;
}

export default function SolutionsPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const solutionDetails = useMemo(() => getSolutionDetails(lang), [lang]);
  const [searchParams, setSearchParams] = useSearchParams();

  const requestedArea = searchParams.get("area");
  const activeFilter = filterBySlug[requestedArea] || filterBySlug.all;

  const filteredSolutions = useMemo(() => {
    if (activeFilter.slug === "all") {
      return solutionDetails;
    }

    return solutionDetails.filter(
      (solution) => solution.areaSlug === activeFilter.slug,
    );
  }, [activeFilter.slug, solutionDetails]);

  const emptyStateWhatsappUrl = createWhatsappUrl(
    en ? "Hello, I would like to know the most suitable solution for my case at Kadina Center." : "مرحبًا، أرغب في معرفة الحل الأنسب لحالتي في مركز كادينا.",
  );

  const selectFilter = (slug) => {
    if (slug === activeFilter.slug) return;
    trackEvent(ANALYTICS_EVENTS.FILTER_CHANGE, {
      filter_type: "solution_area",
      language: lang,
      value: slug,
    });
    setSearchParams(slug === "all" ? {} : { area: slug });
  };

  return (
    <div>
      <Seo
        canonicalPath="/solutions"
        description={en ? "Explore Kadina solutions for face, body, hair and skin concerns and choose the concern closest to your needs." : "اكتشف حلول كادينا لمشكلات الوجه والجسم والشعر والبشرة، واختر المشكلة الأقرب لاحتياجك."}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "Problems & Solutions" : "المشاكل والحلول", path: "/solutions" },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: en ? "Problems & Solutions at Kadina" : "المشاكل والحلول في كادينا",
            description: en ? "Kadina solutions for skin, hair, face and body concerns." : "حلول كادينا لمشكلات البشرة والشعر والوجه والجسم.",
            path: "/solutions",
          }),
        ]}
        title={en ? "Problems & Solutions" : "المشكلات والحلول"}
      />

      <PageHero
        breadcrumbLabel={en ? "Problems & Solutions" : "المشكلات والحلول"}
        eyebrow={en ? "Problems & Solutions" : "المشكلات والحلول"}
        title={en ? "Your concern has a solution" : "مشكلتك لها حل.. ونعرفه بالاسم"}
        description={en ? "You do not need to know the name of a device or procedure. Choose what concerns you and see how Kadina approaches it, which technology may be used and what to expect." : "قد لا تعرف اسم الجهاز أو الإجراء — ولا يلزمك ذلك. اختر ما يزعجك، وسنريك كيف نعالجه في كادينا: بأي تقنية، وبيد أي استشاري، وماذا تتوقع."}
        variant="editorial"
      />

      <section className="ds-section solutions-index">
        <div className="ds-container">
          <motion.p
            className="max-w-3xl text-lg font-bold leading-9 text-[var(--color-text-muted)] sm:text-xl"
            initial="hidden"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            {en ? "Start with the name of your concern and browse solutions for the face, body, hair and skin." : "ابدأ من اسم المشكلة، وتصفّح الحلول حسب الوجه، الجسم، الشعر، والبشرة."}
          </motion.p>

          <div className="mt-9 border-y border-[var(--color-border)] py-4">
            <LayoutGroup id="solution-filters">
            <div
              aria-label={en ? "Filter solutions by area" : "تصفية الحلول حسب المنطقة"}
              className="mobile-strip flex gap-1 overflow-x-auto"
              role="group"
            >
              {areaFilters.map((filter) => {
                const isActive = activeFilter.slug === filter.slug;

                return (
                  <button
                    aria-controls="solutions-results"
                    aria-pressed={isActive}
                    className={`relative isolate min-h-11 shrink-0 overflow-hidden px-5 py-2.5 text-sm font-black transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent-strong)] ${
                      isActive
                        ? "text-[var(--color-heading)]"
                        : "text-[var(--color-text-muted)] hover:text-[var(--color-heading)]"
                    }`}
                    key={filter.slug}
                    onClick={() => selectFilter(filter.slug)}
                    type="button"
                  >
                    {isActive && (
                      <motion.span
                        aria-hidden="true"
                        className="absolute inset-x-3 bottom-0 -z-10 h-0.5 bg-[var(--color-accent)]"
                        layoutId="solution-filter-active"
                      />
                    )}
                    <span className="relative">
                      {getLocalizedText(filter.label, lang)}
                    </span>
                  </button>
                );
              })}
            </div>
            </LayoutGroup>
          </div>

          <p
            aria-live="polite"
            className="mt-7 text-sm font-black text-[var(--color-text-muted)]"
            role="status"
          >
            {getResultsLabel(filteredSolutions.length, lang)}
          </p>

          <AnimatePresence initial={false} mode="wait">
          {filteredSolutions.length > 0 ? (
            <motion.div
              key={activeFilter.slug}
              animate="visible"
              className="mt-8 grid grid-cols-1 gap-px border border-[var(--color-border)] bg-[var(--color-border)] sm:grid-cols-2 lg:grid-cols-3"
              id="solutions-results"
              initial="hidden"
              variants={staggerContainer}
            >
              {filteredSolutions.map((solution) => (
                <MotionLink
                  className="solution-index-card group relative flex flex-col bg-[var(--color-surface-raised)] p-6 outline outline-1 outline-transparent transition-[background-color,outline-color] hover:z-10 hover:outline-[var(--color-accent)] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-accent-strong)] sm:p-8"
                  key={solution.slug}
                  layout="position"
                  to={`/solutions/${solution.slug}`}
                  variants={cardItem}
                >
                  <img
                    alt=""
                    aria-hidden="true"
                    className="h-7 w-auto self-start object-contain"
                    decoding="async"
                    src="/logo.webp"
                  />

                  <h2 className="mt-7 line-clamp-3 text-[clamp(1.35rem,2.2vw,1.75rem)] font-black leading-[1.45] text-[var(--color-heading)]">
                    {solution.painHeadline ||
                      solution.shortTitle ||
                      solution.title}
                  </h2>

                  <p className="mt-3 text-sm font-bold text-[var(--color-text-muted)]">
                    {solution.title}
                  </p>

                  <span className="mt-auto inline-flex min-h-11 items-end gap-2 pt-6 font-black text-[var(--color-accent-strong)]">
                    {en ? "Discover the Solution" : "اعرف الحل"}
                    <span aria-hidden="true" className="editorial-arrow">
                      {en ? "→" : "←"}
                    </span>
                  </span>
                </MotionLink>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key={`empty-${activeFilter.slug}`}
              animate="visible"
              aria-live="polite"
              className="mt-7 rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-8 text-center"
              id="solutions-results"
              initial="hidden"
              role="status"
              variants={fadeUp}
            >
              <h2 className="text-2xl font-black text-[#4c2c00]">
                {en ? "No solutions match this category." : "لم نجد حلولًا مطابقة لهذا التصنيف."}
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-8 text-[#4c2c00]/70">
                {en ? "Contact us and we will help direct you to the right department for your case." : "تواصل معنا، وسنساعدك في الوصول إلى القسم الأنسب لحالتك."}
              </p>

              <a
                aria-label={en ? "Ask us on WhatsApp (opens in a new window)" : "اسألنا عبر واتساب (يفتح في نافذة جديدة)"}
                className="mt-6 inline-flex rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
                href={emptyStateWhatsappUrl}
                onClick={() =>
                  trackContactAction(ANALYTICS_EVENTS.WHATSAPP_CLICK, {
                    language: lang,
                    page_type: "solutions",
                    source_section: SOURCE_SECTIONS.SOLUTIONS,
                  })
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                {en ? "Ask Us on WhatsApp" : "اسألنا عبر واتساب"}
              </a>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </section>

      <CTASection
        pageType="solutions"
        sourceSection={SOURCE_SECTIONS.SOLUTIONS}
        title={en ? "Not sure what your concern is called?" : "غير متأكد من اسم المشكلة؟"}
        description={en ? "Describe what concerns you on WhatsApp and we will direct you to the appropriate service or technology." : "صف لنا ما يزعجك عبر واتساب، وسنوجهك إلى الخدمة أو التقنية المناسبة."}
        primaryLabel={en ? "Consult Us on WhatsApp" : "استشرنا عبر واتساب"}
        whatsappMessage={en ? "Hello, I would like to know the most suitable solution for my case at Kadina Center." : "مرحبًا، أرغب في معرفة الحل الأنسب لحالتي في مركز كادينا."}
      />
    </div>
  );
}
