export default function BeforeAfter({ t }) {
  const data = t.beforeAfter;

  return (
    <section id="before-after" className="bg-[#f8ead8] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full bg-white/70 px-5 py-2 text-sm font-bold text-[#cf7d11]">
            {data.eyebrow}
          </span>
          <h2 className="mt-6 text-3xl font-black text-[#2b1b08] md:text-5xl">
            {data.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
            {data.description}
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-2">
          {data.cases.map((item) => (
            <article key={item.title} className="rounded-3xl border border-[#4c2c00]/10 bg-[#fff7eb]/80 p-5 shadow-lg">
              <h3 className="mb-6 text-center text-2xl font-black text-[#2b1b08]">
                {item.title}
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <p className="mb-3 text-center font-bold text-[#4c2c00]/70">{data.before}</p>
                  <img src={item.before} alt={data.before} className="h-72 w-full rounded-3xl object-cover" />
                </div>
                <div>
                  <p className="mb-3 text-center font-bold text-[#cf7d11]">{data.after}</p>
                  <img src={item.after} alt={data.after} className="h-72 w-full rounded-3xl object-cover" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
