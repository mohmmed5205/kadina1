export default function Connect({ t }) {
  const whatsappUrl = `https://wa.me/${t.center.whatsapp}`;

  const info = [
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
        </svg>
      ),
      label: t.contact.phoneLabel,
      value: t.center.phone,
      href: `tel:${t.center.phone}`,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
        </svg>
      ),
      label: t.contact.locationLabel,
      value: t.center.address,
    },
    {
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-6 w-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      label: t.contact.hoursLabel,
      value: t.contact.hoursValue,
    },
  ];

  return (
    <section id="contact" className="bg-[#f8ead8] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto mb-16 max-w-3xl text-center">
          <span className="section-eyebrow">{t.contact.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black text-[#2b1b08] md:text-5xl">
            {t.contact.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#4c2c00]/70">
            {t.contact.description}
          </p>
        </div>

        {/* Info cards */}
        <div className="reveal-stagger mx-auto mb-10 grid max-w-4xl gap-5 md:grid-cols-3">
          {info.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-[#4c2c00]/10 bg-[#fff7eb] p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#f8aa2d]/15 text-[#cf7d11]">
                {item.icon}
              </div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#4c2c00]/50">
                {item.label}
              </p>
              {item.href ? (
                <a href={item.href} className="mt-2 block font-bold text-[#4c2c00] hover:text-[#cf7d11]">
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 font-bold text-[#4c2c00]">{item.value}</p>
              )}
            </div>
          ))}
        </div>

        {/* WhatsApp CTA */}
        <div className="reveal text-center">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 rounded-full bg-[#f8aa2d] px-10 py-4 text-lg font-bold text-[#4c2c00] shadow-[0_16px_40px_rgba(248,170,45,0.4)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#cf7d11] hover:text-white hover:shadow-[0_20px_44px_rgba(207,125,17,0.45)]"
          >
            <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden="true">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {t.contact.whatsappCta}
          </a>
        </div>
      </div>
    </section>
  );
}
