function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4 text-[#f8aa2d]">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Reviews({ t }) {
  const data = t.reviews;

  return (
    <section id="reviews" className="bg-[#fff7eb] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto mb-16 max-w-3xl text-center">
          <span className="section-eyebrow">{data.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black text-[#2b1b08] md:text-5xl">
            {data.title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#4c2c00]/70">
            {data.description}
          </p>
        </div>

        {/* Review cards */}
        <div className="reveal-stagger grid gap-6 md:grid-cols-3">
          {data.items.map((item) => (
            <article
              key={item.name}
              className="flex flex-col rounded-3xl border border-[#4c2c00]/10 bg-white/80 p-7 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            >
              <StarRating />

              <p className="mt-5 flex-1 leading-8 text-[#4c2c00]/75">
                "{item.review}"
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-[#4c2c00]/08 pt-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f8aa2d]/20 font-black text-[#cf7d11]">
                  {item.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-black text-[#2b1b08] leading-tight">{item.name}</h3>
                  <p className="text-xs text-[#4c2c00]/50">{item.label}</p>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        {data.google && (
          <div className="reveal mt-10 text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 rounded-full border border-[#4c2c00]/15 bg-white/70 px-7 py-3 font-semibold text-[#4c2c00] backdrop-blur-sm transition hover:border-[#f8aa2d] hover:bg-white hover:shadow-md"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-1 7.28-2.69l-3.57-2.77c-.99.67-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.07c-.22-.67-.35-1.38-.35-2.07s.13-1.4.35-2.07V7.09H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.91l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.09l3.66 2.84c.87-2.6 3.3-4.55 6.16-4.55z"/>
              </svg>
              {data.google}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
