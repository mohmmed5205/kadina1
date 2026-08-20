import { motion } from "framer-motion";
import { Link, useLocation, useOutletContext } from "react-router-dom";
import PageHero from "../common/PageHero";
import SectionTitle from "../common/SectionTitle";
import Seo from "../seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../seo/seoUtils";
import { getDeviceDetail } from "../../data/devices";
import { createWhatsappUrl } from "../../utils/whatsapp";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";

const MotionLink = motion.create(Link);

function EditorialList({ items }) {
  return (
    <motion.ol className="device-editorial-list mt-8 border-y border-[var(--color-border-strong)]" initial="hidden" variants={staggerContainer} viewport={viewportOnce} whileInView="visible">
      {items.map((item, index) => (
        <motion.li className="grid min-h-24 grid-cols-[3.25rem_1fr] items-start gap-3 border-b border-[var(--color-border)] py-6 last:border-b-0 sm:grid-cols-[5rem_1fr] sm:py-7" key={`device-list-item-${index}`} variants={cardItem}>
          <span className="pt-1 text-xs font-black text-[var(--color-accent-strong)]">{String(index + 1).padStart(2, "0")}</span>
          <span className="text-lg font-bold leading-8 text-[var(--color-heading)] sm:text-xl">{item}</span>
        </motion.li>
      ))}
    </motion.ol>
  );
}

export default function DevicePageTemplate({ device: rawDevice }) {
  const location = useLocation();
  const { lang } = useOutletContext();
  const en = lang === "en";
  const device = rawDevice ? getDeviceDetail(rawDevice.slug, lang) : null;

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
  const whatsappUrl = createWhatsappUrl(device.whatsappMessage);
  const secondaryName = en ? rawDevice.arabicName : device.englishName;
  const metadata = [
    device.company ? { label: en ? "Company" : "الشركة", value: device.company } : null,
    device.country ? { label: en ? "Origin" : "المنشأ", value: device.country } : null,
    device.category ? { label: en ? "Category" : "الفئة", value: device.category } : null,
  ].filter(Boolean);
  const metadataColumns = metadata.length === 1
    ? "lg:grid-cols-1"
    : metadata.length === 2
      ? "lg:grid-cols-2"
      : "lg:grid-cols-3";

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

      <PageHero
        breadcrumbItems={[
          { label: en ? "Technology & Devices" : "التقنيات والأجهزة", to: "/technology" },
          { label: device.arabicName },
        ]}
        eyebrow={en ? "Available at Kadina" : "متوفر في كادينا"}
        title={device.arabicName}
        secondaryTitle={secondaryName}
        secondaryTitleDir={en ? "rtl" : "ltr"}
        description={device.tagline}
        variant="detail"
        visual={device.image ? {
          alt: `${device.arabicName} - ${secondaryName || ""}`,
          src: device.image,
        } : undefined}
      />

      <motion.section className="ds-section-compact bg-[var(--color-surface)]" initial="hidden" variants={fadeUp} viewport={viewportOnce} whileInView="visible">
        <div className="ds-container">
          {device.intro && (
            <p className="max-w-4xl text-xl font-medium leading-[2] text-[var(--color-text)] sm:text-2xl sm:leading-[1.9]">{device.intro}</p>
          )}

          {metadata.length > 0 && (
            <dl className={`device-metadata-strip grid border-y border-[var(--color-border-strong)] ${device.intro ? "mt-10" : ""} ${metadataColumns}`}>
              {metadata.map((item) => (
                <div className="device-metadata-item py-6 sm:px-6 lg:py-8" key={item.label}>
                  <dt className="text-xs font-black tracking-[0.1em] text-[var(--color-accent-strong)]">{item.label}</dt>
                  <dd className="mt-3 break-words text-lg font-black text-[var(--color-heading)] sm:text-xl">{item.value}</dd>
                </div>
              ))}
            </dl>
          )}

          <a aria-label={en ? "Book your session on WhatsApp (opens in a new window)" : "احجز جلستك عبر واتساب (يفتح في نافذة جديدة)"} className={`ds-button ds-button-primary w-full sm:w-auto ${metadata.length > 0 || device.intro ? "mt-8" : ""}`} href={whatsappUrl} rel="noopener noreferrer" target="_blank">
            {en ? "Book Your Session on WhatsApp" : "احجز جلستك عبر واتساب"}
          </a>
        </div>
      </motion.section>

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

      <div className="ds-container pb-[var(--section-space)] text-center">
        <Link className="inline-flex min-h-11 items-center border-b border-[var(--color-border-strong)] text-sm font-black text-[var(--color-text-muted)] transition-colors hover:text-[var(--color-accent-strong)]" to="/technology">{en ? "Back to All Devices" : "العودة إلى جميع الأجهزة"}</Link>
      </div>
    </div>
  );
}
