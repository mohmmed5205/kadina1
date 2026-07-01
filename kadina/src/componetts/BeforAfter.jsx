export default function BeforeAfter({ t }) {
  const data = t.beforeAfter;

  return (
    <section id="before-after" className="bg-[#f8ead8] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto mb-16 max-w-3xl text-center">
          <span className="section-eyebrow">{data.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black text-[#2b1b08] md:text-5xl">
            {data.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
            {data.description}
          </p>
        </div>

        {/* Cases */}
        <div className="reveal-stagger grid gap-8 lg:grid-cols-2">
          {data.cases.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-3xl border border-[#4c2c00]/10 bg-[#fff7eb]/80 p-6 shadow-lg transition hover:shadow-xl"
            >
              <h3 className="mb-6 text-center text-xl font-black text-[#2b1b08]">
                {item.title}
              </h3>

              <div className="grid gap-4 md:grid-cols-2">
                {/* Before */}
                <div>
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#4c2c00]/40" />
                    <p className="text-center text-sm font-bold text-[#4c2c00]/65">{data.before}</p>
                  </div>
                  <div className="overflow-hidden rounded-2xl">
                    <img
                      src={item.before}
                      alt={data.before}
                      className="h-64 w-full object-cover transition duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>

                {/* After */}
                <div>
                  <div className="mb-3 flex items-center justify-center gap-2">
                    <span className="inline-block h-2 w-2 rounded-full bg-[#cf7d11]" />
                    <p className="text-center text-sm font-bold text-[#cf7d11]">{data.after}</p>
                  </div>
                  <div className="overflow-hidden rounded-2xl ring-2 ring-[#f8aa2d]/30">
                    <img
                      src={item.after}
                      alt={data.after}
                      className="h-64 w-full object-cover transition duration-500 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
