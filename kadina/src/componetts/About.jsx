export default function About({ t }) {
  return (
    <section id="about" className="bg-[#f8ead8] py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
        <div className="order-2 lg:order-1">
          <img
            src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1000&auto=format&fit=crop"
            alt={t.about.eyebrow}
            className="h-[520px] w-full rounded-[2rem] object-cover shadow-2xl"
          />
        </div>

        <div className="order-1 lg:order-2">
          <span className="inline-flex rounded-full border border-[#f8aa2d]/30 bg-white/60 px-5 py-2 text-sm font-bold text-[#cf7d11]">
            {t.about.eyebrow}
          </span>

          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {t.about.title}
          </h2>

          <p className="mt-6 text-lg leading-9 text-[#4c2c00]/75">
            {t.about.description}
          </p>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            <div className="rounded-3xl border border-[#4c2c00]/10 bg-[#fff7eb] p-6 shadow-sm">
              <h3 className="text-xl font-black text-[#4c2c00]">{t.about.visionTitle}</h3>
              <p className="mt-3 leading-7 text-[#4c2c00]/70">{t.about.visionText}</p>
            </div>

            <div className="rounded-3xl border border-[#4c2c00]/10 bg-[#fff7eb] p-6 shadow-sm">
              <h3 className="text-xl font-black text-[#4c2c00]">{t.about.missionTitle}</h3>
              <p className="mt-3 leading-7 text-[#4c2c00]/70">{t.about.missionText}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-3">
            {t.about.bullets.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-2xl bg-white/60 p-4 font-semibold text-[#4c2c00]">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f8aa2d] text-[#4c2c00]">✓</span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
