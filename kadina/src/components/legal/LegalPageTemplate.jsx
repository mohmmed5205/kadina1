import { useOutletContext } from "react-router-dom";
import Breadcrumbs from "../common/Breadcrumbs";
import Seo from "../seo/Seo";
import { getLegalPage } from "../../data/legal";

export default function LegalPageTemplate({ type }) {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const page = getLegalPage(type, lang);

  if (!page) return null;

  return (
    <article className="min-h-screen bg-[var(--color-surface)]">
      <Seo
        alternateLanguages={false}
        canonicalPath={`/${page.slug}`}
        description={page.description}
        noindex={!page.indexable}
        title={page.title}
      />

      <header className="border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] pt-[calc(var(--nav-h,4.25rem)+2.5rem)]">
        <div className="ds-container pb-12 sm:pb-16 lg:pb-20">
          <Breadcrumbs items={[{ label: page.title }]} />
          <p className="section-title-eyebrow mt-7">{page.eyebrow}</p>
          <h1 className="mt-4 max-w-4xl text-4xl font-black leading-tight text-[var(--color-heading)] sm:text-5xl lg:text-6xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-3xl text-lg font-medium leading-9 text-[var(--color-text-muted)]">
            {page.description}
          </p>
        </div>
      </header>

      <div className="ds-container py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <aside
            aria-label={
              en ? "Legal content review status" : "حالة مراجعة المحتوى القانوني"
            }
            className="border-s-4 border-[var(--color-accent)] bg-[var(--color-surface-raised)] px-5 py-5 sm:px-7"
          >
            <p className="text-xs font-black uppercase tracking-[.08em] text-[var(--color-accent-strong)]">
              {en ? "Administrative Review" : "مراجعة إدارية"}
            </p>
            <p className="mt-3 font-bold leading-8 text-[var(--color-heading)]">
              {page.reviewNotice}
            </p>
          </aside>

          <div className="mt-12 space-y-12">
            {page.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-black leading-tight text-[var(--color-heading)] sm:text-3xl">
                  {section.heading}
                </h2>
                <p className="mt-4 text-lg font-medium leading-9 text-[var(--color-text-muted)]">
                  {section.body}
                </p>
              </section>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
