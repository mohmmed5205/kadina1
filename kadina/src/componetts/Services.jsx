export default function Services({ t }) {
  return (
    <section id="services" className="bg-[#fff7eb] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#f8aa2d]/30 bg-white/60 px-5 py-2 text-sm font-bold text-[#cf7d11]">
            {t.services.eyebrow}
          </span>

          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {t.services.title}
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
            {t.services.description}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {t.services.items.map((service) => (
            <article
              key={service.title}
              className="group rounded-[2rem] border border-[#4c2c00]/10 bg-white/70 p-7 shadow-sm transition hover:-translate-y-2 hover:border-[#f8aa2d] hover:bg-white hover:shadow-xl"
            >
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f8aa2d]/20 text-3xl text-[#cf7d11] transition group-hover:bg-[#f8aa2d] group-hover:text-[#4c2c00]">
                {service.icon}
              </div>

              <h3 className="text-2xl font-black text-[#2b1b08]">{service.title}</h3>

              <p className="mt-4 min-h-28 leading-8 text-[#4c2c00]/70">
                {service.description}
              </p>

              <a
                href="#contact"
                className="mt-6 inline-flex rounded-full border border-[#4c2c00]/15 px-5 py-3 text-sm font-bold text-[#4c2c00] transition hover:border-[#f8aa2d] hover:bg-[#f8aa2d]"
              >
                {t.services.more}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
