import { useState } from "react";

export default function Navbar({ t, lang, onLanguageToggle }) {
  const [isOpen, setIsOpen] = useState(false);
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-[#4c2c00]/10 bg-[#fff7eb]/90 shadow-[0_16px_45px_rgba(76,44,0,0.08)] backdrop-blur-xl">
      <div className="mx-auto flex h-24 max-w-7xl items-center justify-between px-5 lg:px-8">
        <a href="#home" className="flex items-center gap-3" aria-label={t.center.name}>
          <img src="/kadina-logo.svg" alt={t.center.name} className="h-14 w-40 object-contain" />
        </a>

        <nav className="hidden items-center gap-7 lg:flex">
          {t.nav.map((link) => (
            <a
              key={link.id}
              href={link.href}
              className="text-sm font-semibold text-[#4c2c00]/75 transition hover:text-[#cf7d11]"
            >
              {link.title}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <button
            type="button"
            onClick={onLanguageToggle}
            className="rounded-full border border-[#4c2c00]/15 bg-white/50 px-4 py-2 text-sm font-bold text-[#4c2c00] transition hover:border-[#f8aa2d] hover:bg-[#f8aa2d]/15"
          >
            {t.langLabel}
          </button>

          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-full bg-[#f8aa2d] px-6 py-3 text-sm font-bold text-[#4c2c00] shadow-[0_12px_28px_rgba(248,170,45,0.35)] transition hover:bg-[#cf7d11] hover:text-white"
          >
            {lang === "ar" ? "واتساب" : "WhatsApp"}
          </a>
        </div>

        <button
          type="button"
          className="rounded-2xl border border-[#4c2c00]/10 bg-white/60 px-4 py-2 text-2xl text-[#4c2c00] lg:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          {isOpen ? "×" : "☰"}
        </button>
      </div>

      {isOpen && (
        <div className="border-t border-[#4c2c00]/10 bg-[#fff7eb] lg:hidden">
          <div className="mx-auto flex max-w-7xl flex-col gap-3 p-5">
            {t.nav.map((link) => (
              <a
                key={link.id}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-2xl px-4 py-3 font-semibold text-[#4c2c00] transition hover:bg-[#f8aa2d]/15"
              >
                {link.title}
              </a>
            ))}

            <button
              type="button"
              onClick={onLanguageToggle}
              className="rounded-2xl border border-[#4c2c00]/15 px-4 py-3 text-center font-bold text-[#4c2c00]"
            >
              {t.langLabel}
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-2xl bg-[#f8aa2d] px-4 py-3 text-center font-bold text-[#4c2c00]"
            >
              {t.contact.whatsappCta}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
