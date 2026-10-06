import { useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import { getAboutData } from "../../data/about";

export default function HomeTrustSection() {
  const { lang } = useOutletContext();
  const { content } = getAboutData(lang);
  return (
    <section className="home-about home-section" id="about" aria-labelledby="home-about-title">
      <div className="ds-container">
        <div className="home-heading">
          <p className="section-title-eyebrow">{lang === "ar" ? "عن كادينا" : "About Kadina"}</p>
          <h2 id="home-about-title">{content.intro}</h2>
          <p className="home-about-story">{content.story}</p>
          <Link className="ds-text-link" to="/about">{lang === "ar" ? "اعرف أكثر عن كادينا" : "Discover Kadina"}</Link>
        </div>
        <div className="home-building">
          <img alt={lang === "ar" ? "مبنى مركز كادينا الطبي في الرياض" : "Kadina Medical Center building in Riyadh"} decoding="async" loading="lazy" src="/homeBG.webp" />
        </div>
      </div>
    </section>
  );
}
