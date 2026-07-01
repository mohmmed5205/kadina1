export default function Services({ t }) {
  return (
    <section id="services" className="bg-[#fff7eb] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto mb-16 max-w-3xl text-center">
          <span className="section-eyebrow">{t.services.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {t.services.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
            {t.services.description}
          </p>
        </div>

        {/* Cards */}
        <div className="reveal-stagger grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {t.services.items.map((service) => (
            <article
              key={service.title}
              className="group flex flex-col rounded-[2rem] border border-[#4c2c00]/10 bg-white/70 p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#f8aa2d]/50 hover:bg-white hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8aa2d]/15 text-3xl text-[#cf7d11] transition-all duration-300 group-hover:bg-[#f8aa2d] group-hover:text-[#4c2c00] group-hover:scale-110">
                {service.icon}
              </div>

              <h3 className="text-2xl font-black text-[#2b1b08]">{service.title}</h3>

              <p className="mt-4 flex-1 leading-8 text-[#4c2c00]/70">
                {service.description}
              </p>

              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#4c2c00]/15 px-5 py-2.5 text-sm font-bold text-[#4c2c00] transition-all duration-200 hover:border-[#f8aa2d] hover:bg-[#f8aa2d] hover:shadow-md"
              >
                {t.services.more}
                <span className="opacity-60" aria-hidden="true">→</span>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
