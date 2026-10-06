import { useOutletContext } from "react-router-dom";
import { getHomePageContent } from "../../data/pagesContent";

export default function HomeAboutSection() {
  const { lang, t } = useOutletContext();
  return (
    <section className="home-why home-section" id="why-kadina" aria-labelledby="home-why-title">
      <div className="ds-container home-why-layout">
        <div>
          <p className="section-title-eyebrow">{t.whyUs.eyebrow}</p>
          <h2 id="home-why-title">{t.whyUs.title}</h2>
          <p className="home-why-description">{t.whyUs.description}</p>
        </div>
        <ul className="home-why-list">
          {getHomePageContent(lang).whyKadina.map((item, index) => (
            <li key={item.title}>
              <span className="home-check" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{item.title}</h3><p>{item.description}</p></div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
