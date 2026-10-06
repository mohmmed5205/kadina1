import { useOutletContext } from "react-router-dom";
import { getHomePageContent } from "../../data/pagesContent";

export default function HomeNumbersSection() {
  const { lang } = useOutletContext();
  return (
    <section className="home-numbers home-section kadina-pattern" id="numbers" aria-labelledby="home-numbers-title">
      <div className="ds-container">
        <div className="home-heading">
          <p className="section-title-eyebrow">{lang === "ar" ? "كادينا في أرقام" : "Kadina in numbers"}</p>
          <h2 id="home-numbers-title">{lang === "ar" ? "خبرة تراكمت.. وثقة صنعتها التفاصيل" : "Experience built over time, trust earned in the details"}</h2>
        </div>
        <div className="home-metrics">
          {getHomePageContent(lang).trustMetrics.map(metric => (
            <article key={metric.label}>
              <p className="home-metric-value" dir="ltr">{metric.value}</p>
              <p>{metric.label}</p>
              <span aria-hidden="true" />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
