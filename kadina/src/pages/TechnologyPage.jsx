import { useMemo } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Link, useOutletContext, useSearchParams } from "react-router-dom";
import CTASection from "../components/common/CTASection";
import PageHero from "../components/common/PageHero";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { getDeviceSummaries } from "../data/devices";
import { createWhatsappUrl } from "../utils/whatsapp";
import { getLocalizedText } from "../utils/i18n";
import {
  cardItem,
  fadeUp,
  imageReveal,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

const MotionLink = motion.create(Link);

const categoryFilters = [
  { slug: "all", label: { ar: "الكل", en: "All" }, category: null },
  { slug: "laser", label: { ar: "إزالة الشعر بالليزر", en: "Laser Hair Removal" }, category: "إزالة الشعر بالليزر" },
  { slug: "skin-renewal", label: { ar: "تجديد البشرة", en: "Skin Renewal" }, category: "تجديد البشرة وعلاج آثارها" },
  { slug: "skincare", label: { ar: "العناية والنضارة", en: "Skin Care & Radiance" }, category: "العناية والنضارة" },
  { slug: "lifting-contouring", label: { ar: "الشد والنحت", en: "Lifting & Contouring" }, category: "الشد والنحت غير الجراحي" },
  { slug: "hair", label: { ar: "علاج الشعر", en: "Hair Treatment" }, category: "علاج الشعر" },
];

const filterBySlug = Object.fromEntries(
  categoryFilters.map((filter) => [filter.slug, filter]),
);

function getResultsLabel(count, lang) {
  if (lang === "en") return `${count} ${count === 1 ? "device" : "devices"}`;
  if (count === 2) return "جهازان";
  if (count >= 3 && count <= 10) return `${count} أجهزة`;
  return `${count} جهازًا`;
}

export default function TechnologyPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedCategory = searchParams.get("cat");
  const activeFilter = filterBySlug[requestedCategory] || filterBySlug.all;
  const localizedDevices = useMemo(() => getDeviceSummaries(lang), [lang]);
  const filteredDevices = useMemo(
    () =>
      activeFilter.category
        ? localizedDevices.filter(
            (device) => device.category === activeFilter.category,
          )
        : localizedDevices,
    [activeFilter.category, localizedDevices],
  );
  const emptyStateWhatsappUrl = createWhatsappUrl(
    en ? "Hello, I would like to know which device or technology is most suitable for my case at Kadina Center." : "مرحبًا، أرغب في معرفة الجهاز أو التقنية الأنسب لحالتي في مركز كادينا.",
  );

  const selectFilter = (slug) => {
    setSearchParams(slug === "all" ? {} : { cat: slug });
  };

  return (
    <div>
      <Seo
        canonicalPath="/technology"
        description={en ? "Explore Kadina's 13+ devices and technologies for hair removal, skin renewal, care, lifting, contouring and hair treatment." : "تعرّف على أجهزة وتقنيات كادينا الـ13 لإزالة الشعر وتجديد البشرة والعناية والشد والنحت وعلاج الشعر."}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "Technology & Devices" : "التقنيات والأجهزة", path: "/technology" },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: en ? "Kadina Technology & Devices" : "تقنيات وأجهزة كادينا",
            description: en ? "Kadina devices for hair removal, skin renewal and care, lifting, contouring and hair treatment." : "أجهزة إزالة الشعر وتجديد البشرة والعناية والشد والنحت وعلاج الشعر في كادينا.",
            path: "/technology",
          }),
        ]}
        title={en ? "Kadina Medical Technology & Devices" : "أجهزة وتقنيات كادينا الطبية"}
      />

      <PageHero
        breadcrumbLabel={en ? "Technology & Devices" : "التقنيات والأجهزة"}
        eyebrow={en ? "Technology & Devices" : "التقنيات والأجهزة"}
        title={en ? "Kadina's technology: 13+ world-class devices" : "ترسانة كادينا التقنية: 13+ جهازًا من الطراز العالمي الأول"}
        description={en ? "A device alone does not create the result. The right device, in the right consultant's hands, with the right settings for your skin—that is the Kadina formula." : "الجهاز وحده لا يصنع النتيجة، لكن الجهاز الصحيح، بيد الاستشاري الصحيح، وبالإعداد الصحيح لبشرتك، هو معادلة كادينا."}
        variant="editorial"
      />

      <section className="ds-section bg-[var(--color-surface)]">
        <div className="ds-container">
          <motion.p className="max-w-3xl text-lg font-bold leading-9 text-[var(--color-text-muted)] sm:text-xl" initial="hidden" variants={fadeUp} viewport={viewportOnce} whileInView="visible">
            {en ? "Browse our devices and learn what each one does and who it suits." : "تصفح أجهزتنا، واعرف ماذا يفعل كل جهاز، ولمن يناسب."}
          </motion.p>

          <div className="mt-9 border-y border-[var(--color-border-strong)] py-3 sm:py-4">
            <LayoutGroup id="technology-filters">
              <div aria-label={en ? "Filter devices by area" : "تصفية الأجهزة حسب المجال"} className="mobile-strip flex gap-1 overflow-x-auto" role="group">
                {categoryFilters.map((filter) => {
                  const isActive = activeFilter.slug === filter.slug;
                  return (
                    <button
                      aria-controls="technology-results"
                      aria-pressed={isActive}
                      className={`technology-filter relative isolate min-h-11 shrink-0 overflow-hidden px-4 py-2.5 text-sm font-black transition-colors focus-visible:outline-none sm:px-5 ${isActive ? "text-[var(--color-heading)]" : "text-[var(--color-text-muted)] hover:text-[var(--color-accent-strong)]"}`}
                      key={filter.slug}
                      onClick={() => selectFilter(filter.slug)}
                      type="button"
                    >
                      <span className="relative">{getLocalizedText(filter.label, lang)}</span>
                      {isActive && (
                        <motion.span aria-hidden="true" className="absolute inset-x-4 bottom-0 h-px bg-[var(--color-accent-strong)] sm:inset-x-5" layoutId="technology-filter-active" />
                      )}
                    </button>
                  );
                })}
              </div>
            </LayoutGroup>
          </div>

          <div className="mt-8 flex items-end justify-between gap-6 border-b border-[var(--color-border)] pb-5">
            <p aria-live="polite" className="text-sm font-black text-[var(--color-heading)]" role="status">
              {getResultsLabel(filteredDevices.length, lang)}
            </p>
            <span aria-hidden="true" className="h-px w-16 bg-[var(--color-accent)]" />
          </div>

          <AnimatePresence initial={false} mode="wait">
            {filteredDevices.length > 0 ? (
              <motion.div
                animate="visible"
                className="technology-results"
                id="technology-results"
                initial="hidden"
                key={activeFilter.slug}
                variants={staggerContainer}
              >
                {filteredDevices.map((device, index) => {
                  const primaryName = en ? device.englishName || device.arabicName : device.arabicName;
                  const secondaryName = en ? device.arabicName : device.englishName;
                  return (
                    <MotionLink
                      className={`technology-result-row group grid min-w-0 gap-7 border-b border-[var(--color-border-strong)] py-9 focus-visible:outline-none md:items-center md:gap-12 lg:py-14 ${index % 2 === 0 ? "technology-result-standard" : "technology-result-reverse"}`}
                      key={device.slug}
                      layout
                      to={`/technology/${device.slug}`}
                      variants={cardItem}
                    >
                      <motion.div className="technology-result-image flex aspect-[4/3] min-w-0 items-center justify-center overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5 sm:p-8" variants={imageReveal}>
                        <img alt={device.displayName} className="h-full max-h-[26rem] w-full object-contain" decoding="async" loading="lazy" src={device.image} />
                      </motion.div>
                      <div className="technology-result-content min-w-0 py-1">
                        <span className="text-xs font-black tracking-[0.12em] text-[var(--color-accent-strong)]">{String(index + 1).padStart(2, "0")}</span>
                        <h2 className="mt-5 break-words text-[clamp(2rem,5vw,4rem)] font-black leading-[1.08] text-[var(--color-heading)]">{primaryName}</h2>
                        {secondaryName && (
                          <p className="mt-3 break-words text-base font-black text-[var(--color-accent-strong)] sm:text-lg" dir={en ? "rtl" : "ltr"}>{secondaryName}</p>
                        )}
                        <p className="mt-6 max-w-xl text-base leading-8 text-[var(--color-text-muted)] sm:text-lg">{device.cardDescription}</p>
                        <span className="mt-7 inline-flex min-h-11 items-center gap-2 border-b border-[var(--color-border-strong)] pb-1 text-sm font-black text-[var(--color-accent-strong)]">
                          {en ? "Details" : "التفاصيل"}
                          <span aria-hidden="true" className="editorial-arrow">{en ? "→" : "←"}</span>
                        </span>
                      </div>
                    </MotionLink>
                  );
                })}
              </motion.div>
            ) : (
              <motion.div aria-live="polite" animate="visible" className="mt-10 border-y border-[var(--color-border-strong)] py-12 text-center" exit="hidden" id="technology-results" initial="hidden" role="status" variants={fadeUp}>
                <h2 className="text-2xl font-black text-[var(--color-heading)]">{en ? "No devices match this category." : "لم نجد أجهزة مطابقة لهذا التصنيف."}</h2>
                <p className="mx-auto mt-4 max-w-2xl leading-8 text-[var(--color-text-muted)]">{en ? "Contact us and we will help you find the most suitable technology for your case." : "تواصل معنا وسنساعدك في الوصول إلى التقنية الأنسب لحالتك."}</p>
                <a aria-label={en ? "Ask us on WhatsApp (opens in a new window)" : "اسألنا عبر واتساب (يفتح في نافذة جديدة)"} className="ds-button ds-button-primary mt-7" href={emptyStateWhatsappUrl} rel="noopener noreferrer" target="_blank">{en ? "Ask Us on WhatsApp" : "اسألنا عبر واتساب"}</a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <CTASection
        title={en ? "Not sure which device is right for your case?" : "لست متأكدًا أي جهاز يناسب حالتك؟"}
        description={en ? "Begin with a consultation and a Kadina consultant will help select the most suitable technology." : "ابدأ باستشارة، وسيساعدك استشاري كادينا في اختيار التقنية الأنسب."}
        primaryLabel={en ? "Consult Us on WhatsApp" : "استشرنا عبر واتساب"}
        whatsappMessage={en ? "Hello, I would like to know which device or technology is most suitable for my case at Kadina Center." : "مرحبًا، أرغب في معرفة الجهاز أو التقنية الأنسب لحالتي في مركز كادينا."}
      />
    </div>
  );
}
