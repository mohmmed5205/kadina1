import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { FaWhatsapp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { getPrimaryNavigation } from "../data/navigation";
import { cardItem, smoothEase, staggerContainer } from "./motionPresets";
import { createWhatsappUrl } from "../utils/whatsapp";

export default function Navbar({ t, lang, onLanguageToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);
  const location = useLocation();
  const whatsappUrl = createWhatsappUrl(t.contact.whatsappCta);
  const navigationItems = getPrimaryNavigation(lang);
  const isCurrentLink = (to) => {
    if (to === "/") {
      return location.pathname === "/" && !location.hash;
    }

    return (
      location.pathname === to ||
      (to !== "/" && location.pathname.startsWith(`${to}/`))
    );
  };

  useEffect(() => {
    const onScroll = () => {
      const nextScrollY = window.scrollY;
      setScrolled(nextScrollY > 18);
      setScrollingDown(
        nextScrollY > 150 && nextScrollY > lastScrollY.current + 4,
      );
      lastScrollY.current = nextScrollY;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setIsOpen(false));
    return () => window.cancelAnimationFrame(frame);
  }, [location.pathname, location.search, location.hash]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const previousOverflow = document.body.style.overflow;
    const previousOverscroll = document.body.style.overscrollBehavior;
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";

    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.overscrollBehavior = previousOverscroll;
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;

    const frame = window.requestAnimationFrame(() => {
      menuPanelRef.current?.querySelector("[data-mobile-nav-link]")?.focus();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape" && isOpen) {
        setIsOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  const handleLanguageToggle = () => {
    setIsOpen(false);
    onLanguageToggle();
    window.requestAnimationFrame(() => menuButtonRef.current?.focus());
  };

  const navLabel = lang === "ar" ? "القائمة الرئيسية" : "Main navigation";
  const menuLabel = isOpen
    ? lang === "ar"
      ? "إغلاق القائمة"
      : "Close menu"
    : lang === "ar"
      ? "فتح القائمة"
      : "Open menu";

  return (
    <motion.header
      initial={shouldReduceMotion ? false : { opacity: 0, y: -18 }}
      animate={{
        opacity: 1,
        y: shouldReduceMotion ? 0 : scrollingDown && !isOpen ? -14 : 0,
      }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: smoothEase }}
      className={clsx(
        "fixed inset-x-0 top-0 z-[70] isolate w-full border-b pt-[env(safe-area-inset-top)] transition-all duration-300",
        scrolled
          ? "border-[var(--color-border)] bg-[var(--color-glass)] shadow-[var(--shadow-card)] backdrop-blur-2xl"
          : "border-[var(--color-border)] bg-[var(--color-glass)] backdrop-blur-xl"
      )}
    >
      <div className={clsx("ds-container flex items-center justify-between transition-[height] duration-300", scrolled ? "h-[4rem] lg:h-[4.5rem]" : "h-[var(--nav-h,4.25rem)]")}>
        <motion.div
          className="shrink-0"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
        >
          <Link
            aria-label={t.center.name}
            className="flex items-center gap-2"
            to="/"
          >
            <img
              src="/kadina-logo3.webp"
              alt={t.center.name}
              decoding="async"
              height="284"
              width="284"
              className="h-14 w-auto object-contain sm:h-16 lg:h-20"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/kadina-logo.webp";
              }}
            />
          </Link>
        </motion.div>

        <nav
          aria-label={navLabel}
          className="hidden items-center gap-1 rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)]/65 px-2 py-2 backdrop-blur-xl xl:flex"
        >
          {navigationItems.map((link) => (
            <motion.div
              key={link.to}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                className={clsx(
                  "relative block rounded-full px-2 py-2 text-[0.72rem] font-bold transition-all duration-200 2xl:px-3 2xl:text-[0.82rem]",
                  isCurrentLink(link.to)
                    ? "text-[var(--color-accent-strong)]"
                    : "text-[var(--color-text-muted)] hover:bg-[rgba(214,163,91,0.1)] hover:text-[var(--color-accent-strong)]",
                )}
                to={link.to}
              >
                {isCurrentLink(link.to) && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-0 -z-10 rounded-full bg-[rgba(214,163,91,0.14)]"
                    layoutId="desktop-nav-active"
                    transition={{ duration: 0.32, ease: smoothEase }}
                  />
                )}
                <span className="relative">{link.title}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <motion.button
            type="button"
            onClick={handleLanguageToggle}
            className="ds-button ds-button-secondary min-h-11 px-4 py-2 text-sm backdrop-blur"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.langLabel}
          </motion.button>

          <motion.a
            href={whatsappUrl}
            aria-label={`${lang === "ar" ? "تواصل معنا" : "Contact us"} (${lang === "ar" ? "يفتح في نافذة جديدة" : "opens in a new window"})`}
            target="_blank"
            rel="noopener noreferrer"
            className="ds-button ds-button-primary min-h-11 px-5 py-2 text-sm"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWhatsapp className="text-base" aria-hidden="true" />
            <span>{lang === "ar" ? "تواصل معنا" : "Contact us"}</span>
          </motion.a>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--color-border)] bg-[var(--color-surface-raised)]/65 text-[var(--color-heading)] backdrop-blur transition hover:border-[var(--color-accent)] hover:bg-[rgba(214,163,91,0.12)] xl:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-label={menuLabel}
        >
          <span className="relative h-5 w-5" aria-hidden="true">
            <span
              className={clsx(
                "absolute start-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                isOpen ? "top-1/2 rotate-45" : "top-1"
              )}
            />
            <span
              className={clsx(
                "absolute start-0 top-1/2 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                isOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={clsx(
                "absolute start-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                isOpen ? "top-1/2 -rotate-45" : "top-4"
              )}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={menuPanelRef}
            data-mobile-menu
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: smoothEase }}
            className="absolute inset-x-0 top-full z-[80] h-[calc(100dvh-var(--nav-h,4.25rem)-env(safe-area-inset-top))] overflow-y-auto overscroll-contain border-t border-[var(--color-border)] bg-[var(--color-surface)]/[0.985] pb-[env(safe-area-inset-bottom)] shadow-[var(--shadow-floating)] backdrop-blur-2xl xl:hidden"
          >
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={staggerContainer}
              className="mx-auto flex min-h-full max-w-2xl flex-col gap-1 px-5 py-6 sm:px-8"
            >
              {navigationItems.map((link) => (
                <motion.div
                  key={link.to}
                  onClick={() => setIsOpen(false)}
                  variants={cardItem}
                >
                  <Link
                    data-mobile-nav-link
                    className={clsx(
                      "flex min-h-12 items-center rounded-[var(--radius-md)] border px-4 py-3 text-lg font-bold transition-all duration-200 hover:border-[var(--color-accent)] hover:bg-[rgba(214,163,91,0.1)] hover:text-[var(--color-accent-strong)]",
                      isCurrentLink(link.to)
                        ? "border-[var(--color-accent)] bg-[rgba(214,163,91,0.12)] text-[var(--color-accent-strong)]"
                        : "border-transparent text-[var(--color-text)]",
                    )}
                    to={link.to}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-auto grid gap-3 border-t border-[var(--color-border)] pt-5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleLanguageToggle}
                  className="ds-button ds-button-secondary w-full"
                >
                  {t.langLabel}
                </button>

                <a
                  href={whatsappUrl}
                  aria-label={`${t.contact.whatsappCta} (${lang === "ar" ? "يفتح في نافذة جديدة" : "opens in a new window"})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="ds-button ds-button-primary w-full"
                >
                  <FaWhatsapp aria-hidden="true" />
                  <span>{t.contact.whatsappCta}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
