export default function Hero({ t }) {
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#fff7eb] pt-28">
      <div className="absolute -right-24 top-40 h-72 w-72 rounded-full bg-[#f8aa2d]/15 blur-3xl" />
      <div className="absolute -left-24 bottom-10 h-80 w-80 rounded-full bg-[#4c2c00]/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-24">
        <div className="text-center lg:text-start">
          <span className="inline-flex rounded-full border border-[#f8aa2d]/30 bg-white/60 px-5 py-2 text-sm font-bold text-[#cf7d11] shadow-sm">
            {t.hero.eyebrow}
          </span>

          <h1 className="mt-7 text-4xl font-black leading-tight text-[#2b1b08] md:text-6xl">
            {t.hero.title}
          </h1>

          <p className="mt-5 text-xl font-bold text-[#cf7d11] md:text-2xl">
            {t.hero.highlight}
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-[#4c2c00]/75 lg:mx-0">
            {t.hero.description}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#f8aa2d] px-8 py-4 text-center font-bold text-[#4c2c00] shadow-xl transition hover:bg-[#cf7d11] hover:text-white"
            >
              {t.hero.primaryCta}
            </a>

            <a
              href="#services"
              className="rounded-full border border-[#4c2c00]/20 bg-white/60 px-8 py-4 text-center font-bold text-[#4c2c00] transition hover:border-[#f8aa2d] hover:bg-white"
            >
              {t.hero.secondaryCta}
            </a>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-3 rounded-3xl border border-[#4c2c00]/10 bg-white/55 p-3 shadow-xl backdrop-blur">
            {t.hero.metrics.map((item) => (
              <div key={item.label} className="rounded-2xl bg-[#fff7eb] p-4 text-center">
                <h3 className="text-2xl font-black text-[#cf7d11] md:text-3xl">{item.number}</h3>
                <p className="mt-1 text-xs font-semibold text-[#4c2c00]/70 md:text-sm">{item.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-xl">
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/50 p-4 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1100&auto=format&fit=crop"
              alt={t.hero.imageAlt}
              className="h-[460px] w-full rounded-[2rem] object-cover md:h-[620px]"
            />

            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/70 bg-[#fff7eb]/90 p-5 shadow-xl backdrop-blur">
              <p className="text-sm font-bold leading-7 text-[#4c2c00] md:text-base">
                {t.hero.trust}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
