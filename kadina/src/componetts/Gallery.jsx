export default function Gallery({ t }) {
  return (
    <section id="gallery" className="bg-[#fff7eb] py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="inline-flex rounded-full border border-[#f8aa2d]/30 bg-white/60 px-5 py-2 text-sm font-bold text-[#cf7d11]">
            {t.gallery.eyebrow}
          </span>

          <h2 className="mt-6 text-3xl font-black leading-tight text-[#2b1b08] md:text-5xl">
            {t.gallery.title}
          </h2>

          <p className="mt-5 text-lg leading-8 text-[#4c2c00]/70">
            {t.gallery.description}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {t.gallery.images.map((image) => (
            <figure
              key={image.src}
              className="group overflow-hidden rounded-[2rem] border border-[#4c2c00]/10 bg-white/60 p-3 shadow-sm"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="h-80 w-full rounded-[1.5rem] object-cover transition duration-500 group-hover:scale-105"
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
