export default function Reviews({ t }) {
  const data = t.reviews;

  return (
    <section id="reviews" className="bg-[#fff7eb] py-24">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        <span className="inline-flex rounded-full bg-white/70 px-5 py-2 text-sm font-bold text-[#cf7d11]">
          {data.eyebrow}
        </span>
        <h2 className="mt-6 text-3xl font-black text-[#2b1b08] md:text-5xl">
          {data.title}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#4c2c00]/70">
          {data.description}
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {data.items.map((item) => (
            <article key={item.name} className="rounded-3xl border border-[#4c2c00]/10 bg-white/80 p-7 text-start shadow-sm">
              <p className="text-sm font-black text-[#cf7d11]">5 / 5</p>
              <p className="mt-5 leading-8 text-[#4c2c00]/75">{item.review}</p>
              <h3 className="mt-6 font-black text-[#2b1b08]">{item.name}</h3>
              <p className="text-sm text-[#4c2c00]/55">{item.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
