import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";
import { useLocation } from "react-router-dom";
import Link from "../components/routing/LocalizedLink";
import { getPrimaryNavigation } from "../data/navigation";
import { cardItem, smoothEase, staggerContainer } from "./motionPresets";
import { stripLanguagePrefix } from "../utils/languageRouting";

export default function Navbar({
  t,
  lang,
  languageSwitchAvailable,
  onLanguageToggle,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const lastScrollY = useRef(0);
  const menuButtonRef = useRef(null);
  const menuPanelRef = useRef(null);
  const location = useLocation();
  const currentPath = stripLanguagePrefix(location.pathname);
  const navigationItems = getPrimaryNavigation(lang);
  const isCurrentLink = (to) => {
    if (to === "/") {
      return currentPath === "/" && !location.hash;
    }

    return (
      currentPath === to ||
      (to !== "/" && currentPath.startsWith(`${to}/`))
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
        return;
      }

      if (event.key === "Tab" && isOpen && menuPanelRef.current) {
        const focusableElements = Array.from(
          menuPanelRef.current.querySelectorAll(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
          ),
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements.at(-1);

        if (event.shiftKey && document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
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
        "fixed inset-x-0 top-0 z-[70] isolate w-full border-b border-[var(--color-border)] bg-[var(--color-glass)] pt-[env(safe-area-inset-top)] text-[var(--color-heading)] backdrop-blur-xl transition-[box-shadow] duration-300",
        scrolled && "shadow-[0_10px_36px_rgba(48,32,18,.08)]",
      )}
    >
      <div className="ds-container flex h-[var(--nav-h,4.25rem)] items-center justify-between gap-5 lg:h-[var(--nav-h)]">
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
              className="brand-logo-on-dark h-12 w-auto object-contain sm:h-14 lg:h-16"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/kadina-logo.webp";
              }}
            />
          </Link>
        </motion.div>

        <nav
          aria-label={navLabel}
          className="hidden min-w-0 flex-1 items-center justify-center gap-3 xl:flex 2xl:gap-5"
        >
          {navigationItems.map((link) => (
            <motion.div
              key={link.to}
              whileHover={{ y: -1 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                className={clsx(
                  "relative whitespace-nowrap py-3 text-[0.8125rem] font-bold transition-colors duration-200 2xl:text-[0.875rem]",
                  isCurrentLink(link.to)
                    ? "text-[var(--color-accent-strong)]"
                    : "text-[var(--color-text-muted)] hover:text-[var(--color-accent)]",
                )}
                to={link.to}
              >
                {isCurrentLink(link.to) && (
                  <motion.span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-1 h-px bg-[var(--color-accent)]"
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
            aria-label={
              languageSwitchAvailable
                ? lang === "ar"
                  ? "Switch to English"
                  : "التبديل إلى العربية"
                : "English version unavailable for this page"
            }
            disabled={!languageSwitchAvailable}
            type="button"
            onClick={handleLanguageToggle}
            className={clsx(
              "min-h-11 border-0 bg-transparent px-2 py-2 text-sm font-black text-[var(--color-heading)] transition-colors",
              !languageSwitchAvailable && "cursor-not-allowed opacity-45",
            )}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            {t.langLabel}
          </motion.button>

          <motion.div
            className="shrink-0"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <Link className="ds-button ds-button-primary min-h-11 whitespace-nowrap px-5 py-2 text-sm" to="/booking">
              {lang === "ar" ? "احجز موعدك" : "Book an appointment"}
            </Link>
          </motion.div>
        </div>

        <button
          ref={menuButtonRef}
          type="button"
          className={clsx(
            "flex h-11 w-11 items-center justify-center border transition xl:hidden",
            "border-[var(--color-border-strong)] bg-transparent text-[var(--color-heading)]",
          )}
          onClick={() => setIsOpen((current) => !current)}
          aria-controls="mobile-navigation"
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
            id="mobile-navigation"
            data-mobile-menu
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: shouldReduceMotion ? 0 : 0.28, ease: smoothEase }}
            className="fixed inset-x-0 h-[calc(100dvh-var(--nav-h,4.25rem)-env(safe-area-inset-top))] top-[calc(var(--nav-h,4.25rem)+env(safe-area-inset-top))] z-[80] overflow-y-auto overscroll-contain border-t border-[var(--color-border)] bg-[var(--color-surface)] pb-[env(safe-area-inset-bottom)] xl:hidden"
          >
            <motion.div
              initial={shouldReduceMotion ? false : "hidden"}
              animate="visible"
              variants={staggerContainer}
              className="mx-auto flex min-h-full max-w-2xl flex-col px-5 py-6 sm:px-8 sm:py-8"
            >
              {navigationItems.map((link, index) => (
                <motion.div
                  key={link.to}
                  onClick={() => setIsOpen(false)}
                  variants={cardItem}
                >
                  <Link
                    data-mobile-nav-link
                    className={clsx(
                      "flex min-h-14 items-center justify-between border-b border-[var(--color-border-on-dark)] py-3 text-xl font-black transition-colors sm:min-h-16 sm:text-2xl",
                      isCurrentLink(link.to)
                        ? "text-[var(--color-accent-strong)]"
                        : "text-[var(--color-heading)] hover:text-[var(--color-accent-strong)]",
                    )}
                    to={link.to}
                  >
                    <span>{link.title}</span>
                    <span className="text-xs font-bold tracking-[.12em] text-[var(--color-text-muted)]" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <div className="mt-auto grid gap-3 border-t border-[var(--color-border)] pt-7 sm:grid-cols-2">
                <Link className="ds-button ds-button-primary w-full sm:col-span-2" onClick={() => setIsOpen(false)} to="/booking">
                  {lang === "ar" ? "احجز موعدك" : "Book an appointment"}
                </Link>
                <button
                  aria-label={
                    languageSwitchAvailable
                      ? lang === "ar"
                        ? "Switch to English"
                        : "التبديل إلى العربية"
                      : "English version unavailable for this page"
                  }
                  disabled={!languageSwitchAvailable}
                  type="button"
                  onClick={handleLanguageToggle}
                  className={clsx(
                    "ds-button ds-button-secondary w-full",
                    !languageSwitchAvailable && "cursor-not-allowed opacity-45",
                  )}
                >
                  {t.langLabel}
                </button>

                <Link className="ds-button ds-button-secondary w-full" onClick={() => setIsOpen(false)} to="/contact">
                  {lang === "ar" ? "تواصل معنا" : "Contact us"}
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
