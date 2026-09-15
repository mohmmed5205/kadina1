import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Link from "../components/routing/LocalizedLink";
import { getPrimaryNavigation } from "../data/navigation";
import { getContactAddress, getContactItems } from "../data/contact";
import { createWhatsappUrl } from "../utils/whatsapp";
import { fadeUp, viewportOnce } from "./motionPresets";
import { ANALYTICS_EVENTS, SOURCE_SECTIONS, getPageType, trackContactAction } from "../utils/analytics";

const serviceLinks = [
  { to: "/services/dermatology", ar: "الجلدية", en: "Dermatology" },
  { to: "/services/laser", ar: "الليزر", en: "Laser" },
  { to: "/services/plastic-surgery", ar: "جراحة التجميل", en: "Plastic surgery" },
  { to: "/services/hair", ar: "الشعر", en: "Hair" },
];

export default function Bottom({ t, lang }) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const en = lang === "en";
  const navigationItems = getPrimaryNavigation(lang).filter((item) => ["about", "services", "doctors", "contact"].includes(item.id));
  const contactItems = getContactItems(lang);
  const address = getContactAddress(lang);
  const whatsappUrl = createWhatsappUrl(t.contact.whatsappCta);

  return (
    <footer className="relative overflow-hidden border-t border-[var(--color-border-on-dark)] bg-[var(--surface-dark-footer)] text-[var(--color-text-on-dark)]" id="footer">
      <motion.div className="ds-container relative py-9 lg:py-12" initial={shouldReduceMotion ? false : "hidden"} variants={fadeUp} viewport={viewportOnce} whileInView="visible">
        <div className="grid grid-cols-2 gap-7 lg:grid-cols-[1.15fr_.75fr_.85fr_1.15fr] lg:gap-10">
          <div className="col-span-2 sm:col-span-1">
            <Link aria-label={t.center.name} className="inline-flex" to="/">
              <img alt={t.center.name} className="h-14 w-auto brightness-0 invert" decoding="async" height="284" loading="lazy" src="/kadina-logo3.webp" width="284" />
            </Link>
            <p className="mt-6 max-w-xs text-base font-bold leading-8 text-[var(--color-text-on-dark-muted)]">{t.footer.note}</p>
            <a aria-label={`${t.contact.whatsappCta} (${en ? "opens in a new window" : "يفتح في نافذة جديدة"})`} className="ds-button ds-button-primary mt-7" href={whatsappUrl} onClick={() => trackContactAction(ANALYTICS_EVENTS.WHATSAPP_CLICK, { language: lang, page_type: getPageType(location.pathname), source_section: SOURCE_SECTIONS.FOOTER })} rel="noopener noreferrer" target="_blank">
              <FaWhatsapp aria-hidden="true" />
              <span>{t.contact.whatsappCta}</span>
            </a>
          </div>

          <nav aria-label={en ? "Footer navigation" : "روابط تذييل الموقع"}>
            <h2 className="text-sm font-black !text-[var(--color-accent)]">{en ? "Quick links" : "روابط سريعة"}</h2>
            <div className="mt-5 flex flex-col">
              {navigationItems.map((link) => <Link className="flex min-h-11 items-center border-b border-[var(--color-border-on-dark)] text-sm font-bold text-[var(--color-text-on-dark-muted)] hover:text-[var(--color-accent)]" key={link.to} to={link.to}>{link.title}</Link>)}
              <Link className="flex min-h-11 items-center border-b border-[var(--color-border-on-dark)] text-sm font-bold text-[var(--color-text-on-dark-muted)] hover:text-[var(--color-accent)]" to="/booking">{en ? "Booking" : "حجز موعد"}</Link>
            </div>
          </nav>

          <nav aria-label={en ? "Service links" : "روابط الخدمات"}>
            <h2 className="text-sm font-black !text-[var(--color-accent)]">{en ? "Departments" : "الأقسام"}</h2>
            <div className="mt-5 flex flex-col">
              {serviceLinks.map((link) => <Link className="flex min-h-11 items-center border-b border-[var(--color-border-on-dark)] text-sm font-bold text-[var(--color-text-on-dark-muted)] hover:text-[var(--color-accent)]" key={link.to} to={link.to}>{link[lang]}</Link>)}
            </div>
          </nav>

          <div className="col-span-2 sm:col-span-1">
            <h2 className="text-sm font-black !text-[var(--color-accent)]">{en ? "Contact" : "بيانات التواصل"}</h2>
            <div className="mt-5 space-y-4 text-sm font-bold leading-7 text-[var(--color-text-on-dark-muted)]">
              <a className="flex min-h-11 items-center hover:text-[var(--color-accent)]" href={contactItems[0].href}>{contactItems[0].value}</a>
              <a className="flex min-h-11 items-center break-words hover:text-[var(--color-accent)]" href={contactItems[2].href}>{contactItems[2].value}</a>
              <p>{address}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2">
              {t.contact.socials.map((social) => <a aria-label={`${social.label} (${en ? "opens in a new window" : "يفتح في نافذة جديدة"})`} className="inline-flex min-h-11 items-center border-b border-[var(--color-border-on-dark)] text-sm font-bold text-[var(--color-text-on-dark-muted)] hover:text-[var(--color-accent)]" href={social.url} key={social.key} rel="noopener noreferrer" target="_blank">{social.label}</a>)}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 border-t border-[var(--color-border-on-dark)] pt-5 text-xs leading-6 text-[var(--color-text-on-dark-muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>{new Date().getFullYear()} &copy; {t.footer.rights}</p>
          <p>KADINA MEDICAL CENTER · RIYADH</p>
        </div>
      </motion.div>
    </footer>
  );
}
