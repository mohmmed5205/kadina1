import { motion, useReducedMotion } from "framer-motion";
import { useLocation, useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import Breadcrumbs from "../common/Breadcrumbs";
import SectionTitle from "../common/SectionTitle";
import Seo from "../seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../seo/seoUtils";
import { getDeviceDetail } from "../../data/devices";
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
  imageReveal,
  staggerContainer,
  staggerFast,
  textReveal,
  viewportOnce,
} from "../../componetts/motionPresets";

const MotionLink = motion.create(Link);

function EditorialList({ items }) {
  return (
    <motion.ol
      className="device-editorial-list mt-8 border-y border-[var(--color-border-strong)]"
      initial="hidden"
      variants={staggerContainer}
      viewport={viewportOnce}
      whileInView="visible"
    >
      {items.map((item, index) => (
        <motion.li
          className="grid min-h-24 grid-cols-[3.25rem_1fr] items-start gap-3 border-b border-[var(--color-border)] py-6 last:border-b-0 sm:grid-cols-[5rem_1fr] sm:py-7"
          key={`device-list-item-${index}`}
          variants={cardItem}
        >
          <span className="pt-1 text-xs font-black text-[var(--color-accent-strong)]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-lg font-bold leading-8 text-[var(--color-heading)] sm:text-xl">
            {item}
          </span>
        </motion.li>
      ))}
    </motion.ol>
  );
}

function EditorialRelations({ items, title, en }) {
  if (!Array.isArray(items) || items.length === 0) return null;

  return (
    <div>
      <SectionTitle title={title} />
      <motion.div
        className="mt-8 border-t border-[var(--color-border-strong)]"
        initial="hidden"
        variants={staggerContainer}
        viewport={viewportOnce}
        whileInView="visible"
      >
        {items.map((item, index) => (
          <MotionLink
            className="group grid min-h-20 grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-[var(--color-border)] py-4"
            key={item.to}
            to={item.to}
            variants={cardItem}
          >
            <span className="text-xs font-black text-[var(--color-accent-strong)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <strong className="text-lg text-[var(--color-heading)]">
              {item.title}
            </strong>
            <span aria-hidden="true" className="editorial-arrow text-[var(--color-accent-strong)]">
              {en ? "→" : "←"}
            </span>
          </MotionLink>
        ))}
      </motion.div>
    </div>
  );
}

export default function DevicePageTemplate({ device: rawDevice }) {
  const location = useLocation();
  const { lang } = useOutletContext();
  const shouldReduceMotion = useReducedMotion();
  const en = lang === "en";
  const device = rawDevice ? getDeviceDetail(rawDevice.slug, lang) : null;
  useTrackedView(
    ANALYTICS_EVENTS.DEVICE_VIEW,
    {
      category: rawDevice?.category,
      device_slug: rawDevice?.slug,
      language: lang,
      path: getCurrentPath(location),
    },
    Boolean(device),
  );

  if (!device) {
    return (
      <>
        <Seo canonicalPath={location.pathname} description={en ? "The requested device was not found among Kadina's devices." : "الجهاز المطلوب غير موجود ضمن أجهزة كادينا."} noindex title={en ? "Device Not Found" : "الجهاز غير موجود"} />
        <section className="min-h-[70vh] px-4 pb-20 pt-32 sm:px-5 lg:px-8">
          <motion.div animate="visible" className="mx-auto max-w-3xl border-y border-[var(--color-border-strong)] py-12 text-center" initial="hidden" variants={fadeUp}>
            <h1 className="text-3xl font-black text-[var(--color-heading)]">{en ? "Device Not Found" : "الجهاز غير موجود"}</h1>
            <p className="mt-4 leading-8 text-[var(--color-text-muted)]">{en ? "We could not find the requested device." : "لم نتمكن من العثور على الجهاز المطلوب."}</p>
            <Link className="ds-button ds-button-primary mt-7" to="/technology">{en ? "Back to Devices" : "العودة إلى الأجهزة"}</Link>
          </motion.div>
        </section>
      </>
    );
  }

  const relatedDevices = device.relatedDevices
    .map((slug) => getDeviceDetail(slug, lang))
    .filter(Boolean);
  const relatedSolutions = Array.isArray(device.relatedSolutions) ? device.relatedSolutions : [];
  const relatedDoctors = Array.isArray(device.relatedDoctors) ? device.relatedDoctors : [];
  const comparisons = Array.isArray(device.comparisons) ? device.comparisons : [];
  const whatsappUrl = createWhatsappUrl(device.whatsappMessage);
  const secondaryName = en ? rawDevice.arabicName : device.englishName;
  const metadata = [
    device.company ? { label: en ? "Company" : "الشركة", value: device.company } : null,
    device.country ? { label: en ? "Origin" : "بلد المنشأ", value: device.country } : null,
    device.category ? { label: en ? "Category" : "الفئة", value: device.category } : null,
  ].filter(Boolean);
  const metadataColumns = metadata.length === 1
    ? "lg:grid-cols-1"
    : metadata.length === 2
      ? "lg:grid-cols-2"
      : "lg:grid-cols-3";
  const copyPosition = en ? "lg:col-start-1" : "lg:col-start-2";
  const visualPosition = en ? "lg:col-start-2" : "lg:col-start-1";

  return (
    <div>
      <Seo
        canonicalPath={`/technology/${device.slug}`}
        description={device.tagline}
        image={device.image}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "Technology & Devices" : "التقنيات والأجهزة", path: "/technology" },
            { name: device.arabicName, path: `/technology/${device.slug}` },
          ]),
          createWebPageSchema({
            type: "MedicalWebPage",
            name: `${device.arabicName} ${device.englishName || ""}`.trim(),
            description: device.tagline,
            path: `/technology/${device.slug}`,
          }),
        ]}
        title={`${device.arabicName} — ${device.englishName || (en ? "Kadina Devices" : "أجهزة كادينا")}`}
      />

      <section className="relative overflow-hidden bg-[var(--color-surface-muted)] pb-14 pt-24 sm:pb-16 sm:pt-28 lg:pb-12 lg:pt-28">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_12%,rgba(214,163,91,.19),transparent_38%)]" />
        <motion.div
          animate="visible"
          className="ds-container relative"
          initial={shouldReduceMotion ? false : "hidden"}
          variants={staggerFast}
        >
          <motion.div
            className="min-w-0 [&_li:last-child]:hidden sm:[&_li:last-child]:flex"
            variants={textReveal}
          >
            <Breadcrumbs
              items={[
                { label: en ? "Technology & Devices" : "التقنيات والأجهزة", to: "/technology" },
                { label: device.arabicName },
              ]}
            />
          </motion.div>

          <div className="mt-7 grid gap-7 lg:grid-cols-2 lg:grid-rows-[auto_1fr] lg:gap-x-14 xl:gap-x-20">
            <motion.div className={`${copyPosition} lg:row-start-1`} variants={textReveal}>
              <p className="text-xs font-black tracking-[.14em] text-[var(--color-accent-strong)]">
                {en ? "AVAILABLE AT KADINA" : "متوفر في كادينا"}
              </p>
              <h1 className="mt-5 max-w-full break-words text-[clamp(1.75rem,3vw,2.625rem)] font-black leading-[1.1] text-[var(--color-heading)] [text-wrap:wrap]">
                {device.arabicName}
              </h1>
              {secondaryName ? (
                <p
                  className="mt-4 break-words text-lg font-black text-[var(--color-accent-strong)] sm:text-2xl"
                  dir={en ? "rtl" : "ltr"}
                >
                  {secondaryName}
                </p>
              ) : null}
            </motion.div>

            <motion.div
              className={`relative mx-auto flex w-full max-w-[26rem] aspect-[5/4] max-h-[26rem] min-h-0 items-center justify-center overflow-hidden border border-[var(--color-border)] bg-[var(--surface-muted)] p-4 sm:aspect-[5/4] sm:p-5 lg:row-span-2 lg:row-start-1 lg:max-w-none lg:aspect-auto lg:min-h-[24rem] ${visualPosition}`}
              variants={imageReveal}
            >
              <span
                aria-hidden="true"
                className="absolute bottom-4 start-5 text-7xl font-black tracking-[-.08em] text-[var(--color-heading)]/[.045] sm:text-9xl"
              >
                01
              </span>
              <img
                alt={`${device.arabicName} — ${secondaryName || ""}`}
                className="relative z-10 h-[90%] w-[92%] object-contain"
                decoding="async"
                fetchPriority="high"
                height="1200"
                src={device.image}
                width="1000"
              />
            </motion.div>

            <motion.div className={`${copyPosition} lg:row-start-2`} variants={textReveal}>
              <p className="mt-1 max-w-2xl text-base font-medium leading-8 text-[var(--color-text)] sm:text-lg">
                {device.tagline}
              </p>

              {metadata.length > 0 ? (
                <dl className={`device-metadata-strip mt-8 grid border-y border-[var(--color-border-strong)] ${metadataColumns}`}>
                  {metadata.map((item) => (
                    <div className="device-metadata-item py-5 sm:px-5" key={item.label}>
                      <dt className="text-[.7rem] font-black tracking-[.12em] text-[var(--color-accent-strong)]">{item.label}</dt>
                      <dd className="mt-2 break-words text-base font-black text-[var(--color-heading)]">{item.value}</dd>
                    </div>
                  ))}
                </dl>
              ) : null}

              <a
                aria-label={en ? "Ask about this device on WhatsApp (opens in a new window)" : "استفسر عن هذا الجهاز عبر واتساب (يفتح في نافذة جديدة)"}
                className="ds-button ds-button-primary mt-8 w-full sm:w-auto"
                href={whatsappUrl}
                onClick={() =>
                  trackContactAction(ANALYTICS_EVENTS.WHATSAPP_CLICK, {
                    language: lang,
                    page_type: "device",
                    slug: device.slug,
                    source_section: SOURCE_SECTIONS.DEVICE_DETAIL,
                  })
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                {en ? "Ask on WhatsApp" : "استفسر عبر واتساب"}
              </a>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {device.intro ? (
        <motion.section className="ds-section-compact bg-[var(--color-surface)]" initial="hidden" variants={fadeUp} viewport={viewportOnce} whileInView="visible">
          <div className="ds-container">
            <p className="max-w-4xl text-xl font-medium leading-[2] text-[var(--color-text)] sm:text-2xl sm:leading-[1.9]">{device.intro}</p>
          </div>
        </motion.section>
      ) : null}

      {device.mechanism && (
        <motion.section className="ds-section border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]" initial="hidden" variants={fadeUp} viewport={viewportOnce} whileInView="visible">
          <div className="ds-container grid gap-10 lg:grid-cols-[minmax(0,.6fr)_minmax(0,1.4fr)] lg:gap-20">
            <SectionTitle eyebrow={en ? "Technology" : "التقنية"} title={en ? "How It Works" : "آلية العمل"} />
            <p className="border-t border-[var(--color-border-strong)] pt-8 text-lg font-medium leading-9 text-[var(--color-text)] sm:text-xl lg:mt-14 lg:pt-10">{device.mechanism}</p>
          </div>
        </motion.section>
      )}

      {(device.uses.length > 0 || device.benefits.length > 0) && (
        <section className="ds-section bg-[var(--color-surface)]">
          <div className="ds-container grid gap-14 lg:grid-cols-2 lg:gap-16">
            {device.uses.length > 0 && (
              <div>
                <SectionTitle title={en ? "Uses" : "الاستخدامات"} />
                <EditorialList items={device.uses} />
              </div>
            )}
            {device.benefits.length > 0 && (
              <div>
                <SectionTitle title={en ? "Benefits" : "المميزات"} />
                <EditorialList items={device.benefits} />
              </div>
            )}
          </div>
        </section>
      )}

      {device.suitableFor.length > 0 && (
        <section className="ds-section border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="ds-container max-w-5xl">
            <SectionTitle eyebrow={en ? "Assessment" : "التقييم"} title={en ? "Who Is It For?" : "لمن يناسب"} />
            <EditorialList items={device.suitableFor} />
          </div>
        </section>
      )}

      {(device.relatedService || relatedDevices.length > 0) && (
        <section className="ds-section bg-[var(--color-surface)]">
          <div className="ds-container grid gap-14 lg:grid-cols-2 lg:gap-20">
            {device.relatedService && (
              <div>
                <SectionTitle title={en ? "Related Service" : "الخدمة المرتبطة"} />
                <Link className="group mt-8 inline-flex min-h-11 items-center gap-2 border-b border-[var(--color-border-strong)] pb-1 font-black text-[var(--color-accent-strong)]" to={device.relatedService.to}>
                  {device.relatedService.title}
                  <span aria-hidden="true" className="editorial-arrow">{en ? "→" : "←"}</span>
                </Link>
              </div>
            )}

            {relatedDevices.length > 0 && (
              <div>
                <SectionTitle title={en ? "Related Devices" : "أجهزة ذات صلة"} />
                <motion.div className="mt-8 border-t border-[var(--color-border-strong)]" initial="hidden" variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
                  {relatedDevices.map((relatedDevice, index) => (
                    <MotionLink className="group grid min-h-20 grid-cols-[3rem_1fr_auto] items-center gap-3 border-b border-[var(--color-border)] py-4" key={relatedDevice.slug} to={`/technology/${relatedDevice.slug}`} variants={cardItem}>
                      <span className="text-xs font-black text-[var(--color-accent-strong)]">{String(index + 1).padStart(2, "0")}</span>
                      <span>
                        <strong className="block text-lg text-[var(--color-heading)]">{relatedDevice.arabicName}</strong>
                        {relatedDevice.englishName && <span className="mt-1 block text-sm font-bold text-[var(--color-text-muted)]" dir="ltr">{relatedDevice.englishName}</span>}
                      </span>
                      <span aria-hidden="true" className="editorial-arrow text-[var(--color-accent-strong)]">{en ? "→" : "←"}</span>
                    </MotionLink>
                  ))}
                </motion.div>
              </div>
            )}
          </div>
        </section>
      )}

      {(relatedSolutions.length > 0 || relatedDoctors.length > 0 || comparisons.length > 0) ? (
        <section className="ds-section border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
          <div className="ds-container grid gap-14 lg:grid-cols-3 lg:gap-12">
            <EditorialRelations items={relatedSolutions} title={en ? "Related Solutions" : "الحلول المرتبطة"} en={en} />
            <EditorialRelations items={relatedDoctors} title={en ? "Related Doctors" : "الأطباء المرتبطون"} en={en} />
            <EditorialRelations items={comparisons} title={en ? "Device Comparisons" : "مقارنات الأجهزة"} en={en} />
          </div>
        </section>
      ) : null}

      <div className="ds-container pb-[var(--section-space)] text-center">
        <Link className="inline-flex min-h-11 items-center border-b border-[var(--color-border-strong)] text-sm font-black text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent-strong)]" to="/technology">{en ? "Back to All Devices" : "العودة إلى جميع الأجهزة"}</Link>
      </div>
    </div>
  );
}
