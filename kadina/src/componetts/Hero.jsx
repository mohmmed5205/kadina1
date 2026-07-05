export default function Hero({ t }) {
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden bg-[#fff7eb] pt-[var(--nav-h,5.5rem)]"
    >
      {/* Background blobs */}
      <div className="pointer-events-none absolute -right-32 top-32 h-[28rem] w-[28rem] rounded-full bg-[#f8aa2d]/12 blur-3xl" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-[32rem] w-[32rem] rounded-full bg-[#4c2c00]/08 blur-3xl" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f8aa2d]/06 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:px-8 lg:py-28">
        {/* Text column */}
        <div className="reveal text-center lg:text-start">
          <span className="section-eyebrow">{t.hero.eyebrow}</span>

          <h1 className="mt-7 text-4xl font-black leading-tight text-[#2b1b08] sm:text-5xl md:text-6xl">
            {t.hero.title}
          </h1>

          <p className="mt-5 text-xl font-bold text-[#cf7d11] md:text-2xl">
            {t.hero.highlight}
          </p>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-9 text-[#4c2c00]/70 lg:mx-0">
            {t.hero.description}
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#f8aa2d] px-8 py-4 text-center font-bold text-[#4c2c00] shadow-[0_12px_32px_rgba(248,170,45,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#cf7d11] hover:text-white hover:shadow-[0_16px_36px_rgba(207,125,17,0.45)]"
            >
              {t.hero.primaryCta}
            </a>

            <a
              href="#services"
              className="rounded-full border border-[#4c2c00]/20 bg-white/60 px-8 py-4 text-center font-bold text-[#4c2c00] backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-[#f8aa2d] hover:bg-white hover:shadow-lg"
            >
              {t.hero.secondaryCta}
            </a>
          </div>

          {/* Metrics */}

        </div>

        {/* Image column */}
        <div className="reveal relative mx-auto w-full max-w-xl" style={{ transitionDelay: "120ms" }}>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-white/70 bg-white/50 p-4 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=1100&auto=format&fit=crop"
              alt={t.hero.imageAlt}
              className="h-[460px] w-full rounded-[2rem] object-cover md:h-[600px]"
              loading="eager"
            />

            <div className="absolute bottom-8 left-8 right-8 rounded-3xl border border-white/60 bg-[#fff7eb]/92 p-5 shadow-xl backdrop-blur-md">
              <p className="text-sm font-bold leading-7 text-[#4c2c00] md:text-base">
                {t.hero.trust}
              </p>
            </div>
          </div>

          {/* Decorative ring */}
          <div className="pointer-events-none absolute -right-6 -top-6 h-32 w-32 rounded-full border-2 border-[#f8aa2d]/30" />
          <div className="pointer-events-none absolute -bottom-6 -left-6 h-24 w-24 rounded-full border-2 border-[#f8aa2d]/20" />
        </div>
      </div>
    </section>
  );
}
