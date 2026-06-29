export default function Connect({ t }) {
  return (
    <section id="contact" className="bg-[#f8ead8] py-20">
      <div className="mx-auto max-w-7xl px-5 text-center lg:px-8">
        <span className="inline-flex rounded-full bg-white/70 px-5 py-2 text-sm font-bold text-[#cf7d11]">
          {t.contact.eyebrow}
        </span>
        <h2 className="mt-6 text-3xl font-black text-[#2b1b08] md:text-5xl">
          {t.contact.title}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-[#4c2c00]/70">
          {t.contact.description}
        </p>
        <div className="mx-auto mt-10 grid max-w-4xl gap-5 md:grid-cols-3">
          <div className="rounded-3xl bg-[#fff7eb] p-6 shadow-sm">{t.center.phone}</div>
          <div className="rounded-3xl bg-[#fff7eb] p-6 shadow-sm">{t.center.address}</div>
          <div className="rounded-3xl bg-[#fff7eb] p-6 shadow-sm">{t.contact.hoursValue}</div>
        </div>
      </div>
    </section>
  );
}
