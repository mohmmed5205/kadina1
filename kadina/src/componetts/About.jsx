export default function About({ t }) {
  return (
    <section id="about" className="bg-[#f8ead8] py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        {/* Image */}
        <div className="reveal order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop"
              alt={t.about.eyebrow}
              className="h-[520px] w-full object-cover transition duration-700 hover:scale-105"
              loading="lazy"
            />
            {/* Overlay accent */}
            <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-[#f8aa2d]/20" />
          </div>
        </div>

        {/* Content */}
        <div className="reveal order-1 lg:order-2" style={{ transitionDelay: "100ms" }}>
          <span className="section-eyebrow">{t.about.eyebrow}</span>

          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {t.about.title}
          </h2>

          <p className="mt-6 text-lg leading-9 text-[#4c2c00]/70">
            {t.about.description}
          </p>

          {/* Vision & Mission */}
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-[#f8aa2d]/20 bg-[#fff7eb] p-6 shadow-sm transition hover:shadow-md">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8aa2d]/20 text-lg text-[#cf7d11]">
                ◎
              </span>
              <h3 className="text-lg font-black text-[#4c2c00]">{t.about.visionTitle}</h3>
              <p className="mt-3 leading-7 text-[#4c2c00]/65">{t.about.visionText}</p>
            </div>

            <div className="rounded-3xl border border-[#f8aa2d]/20 bg-[#fff7eb] p-6 shadow-sm transition hover:shadow-md">
              <span className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#f8aa2d]/20 text-lg text-[#cf7d11]">
                ♡
              </span>
              <h3 className="text-lg font-black text-[#4c2c00]">{t.about.missionTitle}</h3>
              <p className="mt-3 leading-7 text-[#4c2c00]/65">{t.about.missionText}</p>
            </div>
          </div>

          {/* Bullets */}
          <div className="mt-8 grid gap-3">
            {t.about.bullets.map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 rounded-2xl border border-[#4c2c00]/08 bg-white/60 px-4 py-3 font-semibold text-[#4c2c00] backdrop-blur-sm transition hover:border-[#f8aa2d]/30 hover:bg-white"
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f8aa2d] text-sm font-black text-[#4c2c00]">
                  ✓
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
