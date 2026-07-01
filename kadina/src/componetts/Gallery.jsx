export default function Gallery({ t }) {
  return (
    <section id="gallery" className="bg-[#fff7eb] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        {/* Header */}
        <div className="reveal mx-auto mb-16 max-w-3xl text-center">
          <span className="section-eyebrow">{t.gallery.eyebrow}</span>
          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {t.gallery.title}
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
            {t.gallery.description}
          </p>
        </div>

        {/* Grid */}
        <div className="reveal-stagger grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.gallery.images.map((image, i) => (
            <figure
              key={image.src}
              className="group overflow-hidden rounded-[2rem] border border-[#4c2c00]/10 bg-white/60 p-3 shadow-sm transition-all duration-300 hover:shadow-xl hover:border-[#f8aa2d]/30"
            >
              <div className="overflow-hidden rounded-[1.5rem]">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="h-72 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
              </div>
              {image.alt && (
                <figcaption className="mt-3 px-1 pb-1 text-center text-sm font-semibold text-[#4c2c00]/60">
                  {image.alt}
                </figcaption>
              )}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
