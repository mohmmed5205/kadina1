export default function Stats({ t }) {
  return (
    <section className="bg-[#2b1b08] py-20">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="reveal-stagger grid gap-5 text-center md:grid-cols-2 lg:grid-cols-4">
          {t.stats.map((item) => (
            <div
              key={item.title}
              className="group rounded-[2rem] border border-white/10 bg-white/08 p-8 backdrop-blur-sm transition-all duration-300 hover:bg-white/15 hover:border-[#f8aa2d]/30"
            >
              <h2 className="text-4xl font-black text-[#f8aa2d] transition-transform duration-300 group-hover:scale-110 md:text-5xl">
                {item.number}
              </h2>
              <p className="mt-3 text-base font-semibold text-[#fff7eb]/80">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
