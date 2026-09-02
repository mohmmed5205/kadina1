import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import SectionTitle from "../common/SectionTitle";
import {
  cardItem,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";
import {
  contactMapUrl,
  getContactAddress,
  getContactHours,
  getContactItems,
} from "../../data/contact";
import {
  ANALYTICS_EVENTS,
  SOURCE_SECTIONS,
  getContactEventName,
  trackContactAction,
} from "../../utils/analytics";

export default function HomeContactSection() {
  const { lang } = useOutletContext();
  const localizedItems = getContactItems(lang);
  const localizedAddress = getContactAddress(lang);
  const localizedHours = getContactHours(lang);
  const trackContactItem = (href) => {
    const eventName = getContactEventName(href);
    if (!eventName) return;
    trackContactAction(eventName, {
      language: lang,
      page_type: "home",
      source_section: SOURCE_SECTIONS.HOME_CONTACT,
    });
  };

  return (
    <section
      className="ds-section scroll-mt-24 bg-[var(--color-surface-muted)]"
      id="contact"
    >
      <div className="ds-container">
        <SectionTitle
          eyebrow={lang === "ar" ? "تواصل معنا" : "Contact Us"}
          title={
            lang === "ar" ? "نسمعك قبل أن نعالجك" : "We listen before we treat"
          }
          description={
            lang === "ar"
              ? "تواصل مع مركز كادينا في الرياض عبر الهاتف أو واتساب أو البريد."
              : "Contact Kadina Center in Riyadh by phone, WhatsApp or email."
          }
        />

        <motion.div
          className="mt-10 grid border-t border-[var(--color-border-strong)] lg:mt-14 lg:grid-cols-[1.25fr_.75fr]"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <div className="lg:pe-12">
            {localizedItems.map((item) => (
              <motion.article
                className="grid gap-3 border-b border-[var(--color-border)] py-7 sm:grid-cols-[10rem_1fr_auto] sm:items-center sm:gap-6"
                key={item.href}
                variants={cardItem}
              >
                <h3 className="text-sm font-black text-[var(--color-accent-strong)]">
                  {item.title}
                </h3>
                <p className="break-words text-lg font-bold text-[var(--color-heading)]">
                  {item.value}
                </p>
                <a
                  aria-label={
                    item.external
                      ? `${item.label} (${lang === "ar" ? "يفتح في نافذة جديدة" : "opens in a new window"})`
                      : undefined
                  }
                  className="inline-flex min-h-11 items-center font-black text-[var(--color-accent-strong)] underline decoration-[var(--color-accent)]/45 underline-offset-8"
                  href={item.href}
                  onClick={() => trackContactItem(item.href)}
                  rel={item.external ? "noopener noreferrer" : undefined}
                  target={item.external ? "_blank" : undefined}
                >
                  {item.label}
                </a>
              </motion.article>
            ))}
          </div>

          <div className="border-[var(--color-border-strong)] lg:border-s lg:ps-12">
            <motion.article
              className="border-b border-[var(--color-border)] py-7"
              variants={cardItem}
            >
              <h3 className="text-sm font-black text-[var(--color-accent-strong)]">
                {lang === "ar" ? "الموقع" : "Location"}
              </h3>
              <p className="mt-3 text-lg font-bold leading-8 text-[var(--color-heading)]">
                {localizedAddress}
              </p>
              <a
                aria-label={
                  lang === "ar"
                    ? "افتح الخريطة (يفتح في نافذة جديدة)"
                    : "Open map (opens in a new window)"
                }
                className="mt-5 inline-flex min-h-11 items-center font-black text-[var(--color-accent-strong)] underline decoration-[var(--color-accent)]/45 underline-offset-8"
                href={contactMapUrl}
                onClick={() =>
                  trackContactAction(ANALYTICS_EVENTS.MAP_CLICK, {
                    language: lang,
                    page_type: "home",
                    source_section: SOURCE_SECTIONS.HOME_CONTACT,
                  })
                }
                rel="noopener noreferrer"
                target="_blank"
              >
                {lang === "ar" ? "افتح الخريطة" : "Open Map"}
              </a>
            </motion.article>

            <motion.article className="py-7" variants={cardItem}>
              <h3 className="text-sm font-black text-[var(--color-accent-strong)]">
                {lang === "ar" ? "المواعيد" : "Hours"}
              </h3>
              <p className="mt-3 text-lg font-bold leading-8 text-[var(--color-heading)]">
                {localizedHours.days}
                <br />
                {localizedHours.time}
              </p>
            </motion.article>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
