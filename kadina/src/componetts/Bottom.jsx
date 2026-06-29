export default function Bottom({ t }) {
  return (
    <footer className="bg-[#2b1b08] py-10 text-[#fff7eb]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-5 text-center md:flex-row lg:px-8">
        <img src="/kadina-logo.svg" alt={t.center.name} className="h-12 w-36 object-contain" />
        <p className="font-semibold">{t.footer.note}</p>
        <p className="text-sm text-[#fff7eb]/70">2026 - {t.footer.rights}</p>
      </div>
    </footer>
  );
}
