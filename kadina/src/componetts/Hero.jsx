import Link from "../components/routing/LocalizedLink";

export default function Hero({ t, lang = "ar" }) {
  return (
    <section className="home-hero" id="home">
      <img alt={t.hero.imageAlt} className="home-hero-image" decoding="async" fetchPriority="high" loading="eager" src="/homeBG.webp" />
      <div className="home-hero-shade" aria-hidden="true" />
      <div className="home-hero-mark" aria-hidden="true" />
      <div className="ds-container home-hero-copy">
      <div className="home-hero-content">
        <p className="section-title-eyebrow">{lang === "ar" ? "مركز كادينا الطبي — الرياض" : "Kadina Medical Center — Riyadh"}</p>
        <h1>{t.hero.title}</h1>
        <p>{t.hero.highlight}</p>
        <Link className="ds-button ds-button-primary" to="/booking"><span>{lang === "ar" ? "احجز موعدك الآن" : "Book your appointment"}</span><span aria-hidden="true" className="hero-cta-arrow">{lang === "ar" ? "↖" : "↗"}</span></Link>
      </div>
      </div>
    </section>
  );
}
