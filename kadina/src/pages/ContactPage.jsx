import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import PageHero from "../components/common/PageHero";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import {
  contactMapUrl,
  getContactAddress,
  getContactHours,
  getContactItems,
} from "../data/contact";
import { businessMaps } from "../data/business";
import {
  ANALYTICS_EVENTS,
  SOURCE_SECTIONS,
  getContactEventName,
  trackContactAction,
} from "../utils/analytics";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

export default function ContactPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const localizedItems = getContactItems(lang);
  const localizedAddress = getContactAddress(lang);
  const localizedHours = getContactHours(lang);
  const whatsappItem = localizedItems[1];
  const trackContactItem = (href) => {
    const eventName = getContactEventName(href);
    if (!eventName) return;
    trackContactAction(eventName, {
      language: lang,
      page_type: "contact",
      source_section: SOURCE_SECTIONS.CONTACT,
    });
  };

  return (
    <div>
      <Seo
        canonicalPath="/contact"
        description={
          en
            ? "Contact Kadina Center in Riyadh by phone, WhatsApp or email."
            : "تواصل مع مركز كادينا في الرياض عبر الهاتف أو واتساب أو البريد الإلكتروني."
        }
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            {
              name: en ? "Contact Us" : "تواصل معنا",
              path: "/contact",
            },
          ]),
          createWebPageSchema({
            name: en ? "Contact Kadina" : "تواصل مع كادينا",
            description: en
              ? "Contact details, location and opening hours for Kadina Center in Riyadh."
              : "بيانات التواصل والموقع ومواعيد مركز كادينا في الرياض.",
            path: "/contact",
          }),
        ]}
        title={en ? "Contact Kadina" : "تواصل مع كادينا"}
      />

      <PageHero
        breadcrumbLabel={en ? "Contact Us" : "تواصل معنا"}
        description={
          en
            ? "Contact Kadina Center in Riyadh by phone, WhatsApp or email."
            : "تواصل مع مركز كادينا في الرياض عبر الهاتف أو واتساب أو البريد."
        }
        eyebrow={en ? "Contact Us" : "تواصل معنا"}
        title={en ? "We listen before we treat" : "نسمعك... قبل أن نعالجك"}
        variant="utility"
      />

      <motion.section
        className="ds-section"
        initial="hidden"
        variants={fadeUp}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div className="ds-container">
          <p className="section-title-eyebrow">
            {en ? "Contact Details" : "بيانات التواصل"}
          </p>
          <h2 className="mt-4 max-w-5xl text-[length:var(--text-heading)] font-black leading-tight text-[var(--color-heading)]">
            {en ? "We Are Here to Answer" : "نحن هنا للإجابة عنك"}
          </h2>
          <div className="mt-9 h-px w-20 bg-[var(--color-accent)]" />
        </div>
      </motion.section>

      <motion.section
        className="border-y border-[var(--color-border-on-dark)] bg-[var(--color-surface-dark)]"
        initial="hidden"
        variants={fadeUp}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div className="ds-container grid gap-7 py-10 sm:py-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-black text-[var(--color-accent)]">
              {whatsappItem.title}
            </p>
            <p className="mt-3 text-2xl font-black !text-[var(--color-text-on-dark)] sm:text-3xl">
              {whatsappItem.value}
            </p>
          </div>
          <a
            aria-label={`${whatsappItem.label} (${en ? "opens in a new window" : "يفتح في نافذة جديدة"})`}
            className="ds-button ds-button-primary w-full sm:w-auto"
            href={whatsappItem.href}
            onClick={() => trackContactItem(whatsappItem.href)}
            rel="noopener noreferrer"
            target="_blank"
          >
            <FaWhatsapp aria-hidden="true" className="text-lg" />
            {whatsappItem.label}
          </a>
        </div>
      </motion.section>

      <section className="ds-section">
        <div className="ds-container">
          <motion.div
            className="grid border-t border-[var(--color-border)] md:grid-cols-2"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewportOnce}
            whileInView="visible"
          >
            {localizedItems.map((item, index) => (
              <motion.article
                className={`border-b border-[var(--color-border)] py-7 md:py-9 ${index % 2 === 0 ? "md:pe-8" : "md:border-s md:ps-8"}`}
                key={item.href}
                variants={cardItem}
              >
                <h3 className="text-sm font-black text-[var(--color-accent-strong)]">
                  {item.title}
                </h3>
                <p
                  className="mt-3 break-words text-xl font-bold text-[var(--color-heading)] sm:text-2xl"
                  dir={index === 0 || index === 2 ? "ltr" : undefined}
                >
                  {item.value}
                </p>
                <a
                  aria-label={
                    item.external
                      ? `${item.label} (${en ? "opens in a new window" : "يفتح في نافذة جديدة"})`
                      : undefined
                  }
                  className="mt-4 inline-flex min-h-11 items-center font-black text-[var(--color-accent-strong)] transition-colors hover:text-[var(--color-heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-strong)]"
                  href={item.href}
                  onClick={() => trackContactItem(item.href)}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  target={item.external ? "_blank" : undefined}
                >
                  {item.label}
                </a>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="border-y border-[var(--color-border)] bg-[var(--color-surface-muted)]">
        <div className="ds-container grid md:grid-cols-2">
          <motion.article
            className="py-12 md:pe-10 lg:py-16 lg:pe-16"
            initial="hidden"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <p className="section-title-eyebrow">
              {en ? "Location" : "الموقع"}
            </p>
            <h2 className="mt-4 text-3xl font-black text-[var(--color-heading)] sm:text-4xl">
              {localizedAddress}
            </h2>
            <a
              aria-label={
                en
                  ? "Open map (opens in a new window)"
                  : "افتح الخريطة (يفتح في نافذة جديدة)"
              }
              className="mt-6 inline-flex min-h-11 items-center font-black text-[var(--color-accent-strong)]"
              href={contactMapUrl}
              onClick={() =>
                trackContactAction(ANALYTICS_EVENTS.MAP_CLICK, {
                  language: lang,
                  page_type: "contact",
                  source_section: SOURCE_SECTIONS.CONTACT,
                })
              }
              rel="noopener noreferrer"
              target="_blank"
            >
              {en ? "Open Map" : "افتح الخريطة"}
            </a>
          </motion.article>

          <motion.article
            className="border-t border-[var(--color-border)] py-12 md:border-s md:border-t-0 md:ps-10 lg:py-16 lg:ps-16"
            initial="hidden"
            variants={fadeUp}
            viewport={viewportOnce}
            whileInView="visible"
          >
            <p className="section-title-eyebrow">
              {en ? "Hours" : "المواعيد"}
            </p>
            <h2 className="mt-4 text-3xl font-black text-[var(--color-heading)] sm:text-4xl">
              {localizedHours.days}
            </h2>
            <p className="mt-4 text-xl font-bold text-[var(--color-text-muted)]">
              {localizedHours.time}
            </p>
          </motion.article>
        </div>
      </section>

      <motion.section
        className="ds-section"
        initial="hidden"
        variants={fadeUp}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div className="ds-container">
          <iframe
            className="h-[340px] w-full border-0 sm:h-[380px]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={businessMaps.embedCandidate}
            title={
              en
                ? "Kadina Medical Center location map"
                : "خريطة موقع مركز كادينا الطبي"
            }
          />
        </div>
      </motion.section>
    </div>
  );
}
