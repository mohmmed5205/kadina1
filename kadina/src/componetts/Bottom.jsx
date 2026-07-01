export default function Bottom({ t }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#2b1b08]">
      {/* Top border accent */}
      <div className="h-px bg-gradient-to-r from-transparent via-[#f8aa2d]/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-5 py-10 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          {/* Logo */}
          <a href="#home" aria-label={t.center.name}>
            <img
              src="/kadina-logo.svg"
              alt={t.center.name}
              className="h-12 w-36 object-contain brightness-0 invert"
            />
          </a>

          {/* Tagline */}
          <p className="font-semibold text-[#f8aa2d]/90 tracking-wide">
            {t.footer.note}
          </p>

          {/* Rights */}
          <p className="text-sm text-[#fff7eb]/50">
            {currentYear} &copy; {t.footer.rights}
          </p>
        </div>
      </div>
    </footer>
  );
}
