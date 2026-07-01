import { useState, useEffect, useRef } from "react";

export default function Navbar({ t, lang, onLanguageToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;

  /* ── Shadow on scroll ─────────────────────────────── */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* ── Active section highlight ─────────────────────── */
  useEffect(() => {
    const sectionIds = t.nav.map((l) => l.id);
    const observers = [];
    const NAV_H = 100;

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveId(id);
        },
        { rootMargin: `-${NAV_H}px 0px -60% 0px`, threshold: 0 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [t]);

  /* ── Close on Escape ────────────────────────────────── */
  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setIsOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const handleNavClick = () => setIsOpen(false);

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full border-b transition-all duration-300
        ${scrolled
          ? "border-[#4c2c00]/15 bg-[#fff7eb]/95 shadow-[0_8px_40px_rgba(76,44,0,0.12)] backdrop-blur-xl"
          : "border-[#4c2c00]/08 bg-[#fff7eb]/85 backdrop-blur-md"
        }`}
    >
      <div className="mx-auto flex h-[var(--nav-h,5.5rem)] max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 shrink-0" aria-label={t.center.name}>
          <img
            src="/kadina-logo.svg"
            alt={t.center.name}
            className="h-13 w-38 object-contain"
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-6 lg:flex" aria-label="Main navigation">
          {t.nav.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className={`relative text-sm font-semibold transition-colors duration-200 after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0 after:rounded-full after:bg-[#f8aa2d] after:transition-all after:duration-300 hover:text-[#cf7d11] hover:after:w-full
                ${activeId === link.id
                  ? "text-[#cf7d11] after:w-full"
                  : "text-[#4c2c00]/75"
                }`}
            >
              {link.title}
            </a>
          ))}
        </nav>

        {/* Desktop CTAs */}
        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={onLanguageToggle}
            className="rounded-full border border-[#4c2c00]/15 bg-white/50 px-4 py-2 text-sm font-bold text-[#4c2c00] transition-all duration-200 hover:border-[#f8aa2d] hover:bg-[#f8aa2d]/15 hover:text-[#cf7d11]"
          >
            {t.langLabel}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#f8aa2d] px-6 py-2.5 text-sm font-bold text-[#4c2c00] shadow-[0_8px_24px_rgba(248,170,45,0.35)] transition-all duration-200 hover:bg-[#cf7d11] hover:text-white hover:shadow-[0_12px_28px_rgba(207,125,17,0.4)]"
          >
            {lang === "ar" ? "واتساب" : "WhatsApp"}
          </a>
        </div>

        {/* Hamburger (mobile) */}
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#4c2c00]/10 bg-white/60 text-xl text-[#4c2c00] transition hover:bg-[#f8aa2d]/20 lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-expanded={isOpen}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5">
              <path strokeLinecap="round" d="M6 6l12 12M6 18L18 6" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className="h-5 w-5">
              <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="mobile-menu-enter border-t border-[#4c2c00]/10 bg-[#fff7eb]/98 backdrop-blur-xl lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-1 p-5">
            {t.nav.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={handleNavClick}
                className={`flex items-center rounded-xl px-4 py-3 font-semibold transition-all duration-200 hover:bg-[#f8aa2d]/15 hover:text-[#cf7d11]
                  ${activeId === link.id
                    ? "bg-[#f8aa2d]/15 text-[#cf7d11]"
                    : "text-[#4c2c00]"
                  }`}
              >
                {link.title}
              </a>
            ))}

            <div className="mt-3 flex flex-col gap-3 border-t border-[#4c2c00]/10 pt-4">
              <button
                type="button"
                onClick={onLanguageToggle}
                className="rounded-xl border border-[#4c2c00]/15 px-4 py-3 text-center font-bold text-[#4c2c00] transition hover:border-[#f8aa2d] hover:bg-[#f8aa2d]/10"
              >
                {t.langLabel}
              </button>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                onClick={handleNavClick}
                className="rounded-xl bg-[#f8aa2d] px-4 py-3 text-center font-bold text-[#4c2c00] shadow-lg transition hover:bg-[#cf7d11] hover:text-white"
              >
                {t.contact.whatsappCta}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
