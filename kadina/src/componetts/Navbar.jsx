import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import clsx from "clsx";
import { FaWhatsapp } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { getPrimaryNavigation } from "../data/navigation";
import { smoothEase } from "./motionPresets";
import { createWhatsappUrl } from "../utils/whatsapp";

export default function Navbar({ t, lang, onLanguageToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const whatsappUrl = createWhatsappUrl(t.contact.whatsappCta);
  const navigationItems = getPrimaryNavigation(lang);
  const isCurrentLink = (to) => {
    if (to === "/") {
      return location.pathname === "/" && !location.hash;
    }

    return location.pathname === "/" && location.hash === to.slice(1);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);

  const handleLanguageToggle = () => {
    setIsOpen(false);
    onLanguageToggle();
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
    <header
      className={clsx(
        "fixed left-0 top-0 z-50 w-full border-b transition-all duration-300",
        scrolled
          ? "border-[#f8aa2d]/20 bg-[#fff7eb]/96 shadow-[0_18px_48px_rgba(0,0,0,0.2)] backdrop-blur-2xl"
          : "border-[#f8aa2d]/15 bg-[#fff7eb]/88 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex h-[var(--nav-h,4.25rem)] max-w-7xl items-center justify-between px-4 sm:px-5 lg:px-8">
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
              className="h-20 w-auto object-contain lg:h-20"
              onError={(event) => {
                event.currentTarget.onerror = null;
                event.currentTarget.src = "/kadina-logo.webp";
              }}
            />
          </Link>
        </motion.div>

        <nav
          aria-label={navLabel}
          className="hidden items-center gap-1 rounded-full border border-[#4c2c00]/10 bg-white/45 px-2 py-2 shadow-[0_14px_34px_rgba(0,0,0,0.12)] backdrop-blur-xl xl:flex"
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
                    ? "bg-[#f8aa2d]/18 text-[#cf7d11] shadow-inner"
                    : "text-[#4c2c00]/75 hover:bg-white/8 hover:text-[#f8aa2d]",
                )}
                to={link.to}
              >
                {link.title}
              </Link>
            </motion.div>
          ))}
        </nav>

        <div className="hidden items-center gap-3 xl:flex">
          <motion.button
            type="button"
            onClick={handleLanguageToggle}
            className="rounded-full border border-[#4c2c00]/15 bg-white/55 px-4 py-2.5 text-sm font-black text-[#4c2c00] shadow-sm backdrop-blur transition-all duration-200 hover:border-[#f8aa2d]/45 hover:bg-[#f8aa2d]/15 hover:text-[#f8aa2d]"
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
            className="inline-flex items-center gap-2 rounded-full bg-[#f8aa2d] px-5 py-2.5 text-sm font-black text-[#2b1b08] shadow-[0_12px_30px_rgba(207,125,17,0.32)] transition-all duration-200 hover:bg-[#cf7d11] hover:text-white"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaWhatsapp className="text-base" aria-hidden="true" />
            <span>{lang === "ar" ? "تواصل معنا" : "Contact us"}</span>
          </motion.a>
        </div>

        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#4c2c00]/15 bg-white/55 text-[#4c2c00] shadow-sm backdrop-blur transition hover:border-[#f8aa2d]/40 hover:bg-[#f8aa2d]/18 xl:hidden"
          onClick={() => setIsOpen((current) => !current)}
          aria-expanded={isOpen}
          aria-label={menuLabel}
        >
          <span className="relative h-5 w-5" aria-hidden="true">
            <span
              className={clsx(
                "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                isOpen ? "top-1/2 rotate-45" : "top-1"
              )}
            />
            <span
              className={clsx(
                "absolute left-0 top-1/2 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                isOpen ? "opacity-0" : "opacity-100"
              )}
            />
            <span
              className={clsx(
                "absolute left-0 h-0.5 w-5 rounded-full bg-current transition-all duration-200",
                isOpen ? "top-1/2 -rotate-45" : "top-4"
              )}
            />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: smoothEase }}
            className="overflow-hidden border-t border-[#f8aa2d]/15 bg-[#fff7eb]/98 shadow-[0_22px_50px_rgba(0,0,0,0.22)] backdrop-blur-2xl xl:hidden"
          >
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.045 } },
              }}
              className="mx-auto flex max-w-7xl flex-col gap-1 p-4"
            >
              {navigationItems.map((link) => (
                <motion.div
                  key={link.to}
                  onClick={() => setIsOpen(false)}
                  variants={{
                    hidden: { opacity: 0, y: -8 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  <Link
                    className={clsx(
                      "flex items-center rounded-2xl border px-4 py-3 text-base font-bold transition-all duration-200 hover:border-[#f8aa2d]/35 hover:bg-[#f8aa2d]/12 hover:text-[#cf7d11]",
                      isCurrentLink(link.to)
                        ? "border-[#f8aa2d]/30 bg-[#f8aa2d]/15 text-[#cf7d11]"
                        : "border-transparent text-[#4c2c00]",
                    )}
                    to={link.to}
                  >
                    {link.title}
                  </Link>
                </motion.div>
              ))}

              <div className="mt-3 grid gap-3 border-t border-[#4c2c00]/10 pt-4 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleLanguageToggle}
                  className="rounded-2xl border border-[#4c2c00]/15 bg-white/55 px-4 py-3 text-center font-black text-[#4c2c00] transition hover:border-[#f8aa2d]/40 hover:bg-[#f8aa2d]/12"
                >
                  {t.langLabel}
                </button>

                <a
                  href={whatsappUrl}
                  aria-label={`${t.contact.whatsappCta} (${lang === "ar" ? "يفتح في نافذة جديدة" : "opens in a new window"})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#f8aa2d] px-4 py-3 text-center font-black text-[#2b1b08] shadow-[0_12px_28px_rgba(207,125,17,0.28)] transition hover:bg-[#cf7d11] hover:text-white"
                >
                  <FaWhatsapp aria-hidden="true" />
                  <span>{t.contact.whatsappCta}</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
