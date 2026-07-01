const WHY_ICONS = ["✦", "◐", "✧", "♡"];

export default function WhyUs({ t }) {
  return (
    <section id="why-us" className="bg-[#f8ead8] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto mb-16 max-w-3xl text-center">
          <span className="section-eyebrow">{t.whyUs.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {t.whyUs.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
            {t.whyUs.description}
          </p>
        </div>

        {/* Cards */}
        <div className="reveal-stagger grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {t.whyUs.items.map((item, i) => (
            <article
              key={item.title}
              className="group rounded-[2rem] border border-[#4c2c00]/10 bg-[#fff7eb]/80 p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-[#f8aa2d]/50 hover:bg-white hover:shadow-xl"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f8aa2d]/20 text-2xl text-[#cf7d11] transition-all duration-300 group-hover:bg-[#f8aa2d] group-hover:text-[#4c2c00] group-hover:scale-110">
                {WHY_ICONS[i % WHY_ICONS.length]}
              </div>
              <h3 className="text-xl font-black text-[#2b1b08]">{item.title}</h3>
              <p className="mt-4 leading-8 text-[#4c2c00]/65">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
