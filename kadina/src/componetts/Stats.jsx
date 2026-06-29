export default function Stats({ t }) {
  return (
    <section className="bg-[#4c2c00] py-20 text-white">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid gap-5 text-center md:grid-cols-2 lg:grid-cols-4">
          {t.stats.map((item) => (
            <div
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/10 p-8 backdrop-blur transition hover:bg-white/15"
            >
              <h2 className="text-4xl font-black text-[#f8aa2d] md:text-5xl">
                {item.number}
              </h2>
              <p className="mt-3 text-base font-semibold text-[#fff7eb]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
