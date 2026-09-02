import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import Link from "../components/routing/LocalizedLink";
import { getPrimaryNavigation } from "../data/navigation";
import { createWhatsappUrl } from "../utils/whatsapp";
import { fadeUp, viewportOnce } from "./motionPresets";
import {
  ANALYTICS_EVENTS,
  SOURCE_SECTIONS,
  getPageType,
  trackContactAction,
} from "../utils/analytics";

export default function Bottom({ t, lang }) {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const en = lang === "en";
  const currentYear = new Date().getFullYear();
  const primaryItems = getPrimaryNavigation(lang).filter(
    (item) => item.to !== "/",
  );
  const blogItem = { to: "/blog", title: en ? "Blog" : "المدونة" };
  const navigationItems = primaryItems.some((item) => item.to === "/blog")
    ? primaryItems
    : primaryItems.flatMap((item) =>
        item.to === "/contact" ? [blogItem, item] : [item],
      );
  const whatsappUrl = createWhatsappUrl(t.contact.whatsappCta);

  return (
    <footer className="relative overflow-hidden bg-[var(--color-surface-dark)] text-[var(--color-text-on-dark)]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(214,163,91,.13),transparent_34%)]" />

      <motion.div
        className="ds-container relative py-14 lg:py-18"
        initial={shouldReduceMotion ? false : "hidden"}
        variants={fadeUp}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div className="grid gap-12 lg:grid-cols-[1.1fr_1.35fr_.9fr] lg:gap-16">
          <div>
            <Link
              aria-label={t.center.name}
              className="inline-flex min-h-24 items-center rounded-[var(--radius-md)] bg-[var(--color-surface-raised)] px-6 py-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
              to="/"
            >
              <img
                alt={t.center.name}
                className="h-20 w-auto object-contain"
                decoding="async"
                height="284"
                loading="lazy"
                src="/kadina-logo.webp"
                width="284"
              />
            </Link>
            <p className="mt-6 text-lg font-black text-[var(--color-accent)]">
              {t.footer.note}
            </p>
          </div>

          <nav aria-label={en ? "Footer navigation" : "روابط تذييل الموقع"}>
            <h2 className="text-sm font-black !text-[var(--color-accent)]">
              {en ? "Navigation" : "روابط الموقع"}
            </h2>
            <div className="mt-5 grid grid-cols-1 gap-x-7 sm:grid-cols-2">
              {navigationItems.map((link) => (
                <Link
                  className="flex min-h-11 items-center border-b border-white/12 py-2 text-sm font-bold text-[var(--color-text-on-dark-muted)] transition-colors hover:text-[var(--color-accent)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--color-accent)]"
                  key={link.to}
                  to={link.to}
                >
                  {link.title}
                </Link>
              ))}
            </div>
          </nav>

          <div>
            <h2 className="text-sm font-black !text-[var(--color-accent)]">
              {t.contact.socialLabel}
            </h2>
            <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
              {t.contact.socials.map((social) => (
                <a
                  aria-label={`${social.label} (${en ? "opens in a new window" : "يفتح في نافذة جديدة"})`}
                  className="inline-flex min-h-11 min-w-11 items-center justify-center border-b border-white/15 px-1 text-sm font-bold text-[var(--color-text-on-dark-muted)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] sm:justify-start"
                  href={social.url}
                  key={social.key}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <a
              aria-label={`${t.contact.whatsappCta} (${en ? "opens in a new window" : "يفتح في نافذة جديدة"})`}
              className="ds-button ds-button-primary mt-7 w-full sm:w-auto"
              href={whatsappUrl}
              onClick={() =>
                trackContactAction(ANALYTICS_EVENTS.WHATSAPP_CLICK, {
                  language: lang,
                  page_type: getPageType(location.pathname),
                  source_section: SOURCE_SECTIONS.FOOTER,
                })
              }
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaWhatsapp aria-hidden="true" />
              <span>{t.contact.whatsappCta}</span>
            </a>
          </div>
        </div>

        <div className="mt-12 border-t border-white/15 pt-6">
          <p className="text-sm leading-7 text-[var(--color-text-on-dark-muted)]">
            {currentYear} &copy; {t.footer.rights}
          </p>
        </div>
      </motion.div>
    </footer>
  );
}
