import { Link, useLocation } from "react-router-dom";
import Breadcrumbs from "../common/Breadcrumbs";
import SectionTitle from "../common/SectionTitle";
import Seo from "../seo/Seo";
import {
  absoluteUrl,
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../seo/seoUtils";
import { createWhatsappUrl } from "../../utils/whatsapp";

export default function ArticleTemplate({ article }) {
  const location = useLocation();

  if (!article || article.status !== "published") {
    return (
      <>
        <Seo
          canonicalPath={location.pathname}
          description="المقال المطلوب غير متاح للنشر حاليًا."
          noindex
          title="المقال غير متاح حاليًا"
        />
        <section
          className="min-h-[70vh] px-4 pb-20 pt-32 sm:px-5 lg:px-8"
          dir="rtl"
        >
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-8 text-center shadow-[0_20px_60px_rgba(76,44,0,0.1)] sm:p-12">
            <h1 className="text-3xl font-black text-[#4c2c00]">
              المقال غير متاح حاليًا
            </h1>
            <p className="mt-4 leading-8 text-[#4c2c00]/68">
              يمكنك العودة إلى المدونة للاطلاع على المقالات المتاحة.
            </p>
            <Link
              className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
              to="/blog"
            >
              العودة إلى المدونة
            </Link>
          </div>
        </section>
      </>
    );
  }

  const canonicalPath = `/blog/${article.slug}`;
  const seoDescription = article.excerpt || article.title;
  const articleSchema = {
    "@type": "BlogPosting",
    headline: article.title,
    description: seoDescription,
    articleSection: article.category,
    url: absoluteUrl(canonicalPath),
    ...(article.publishedAt && { datePublished: article.publishedAt }),
    ...(article.updatedAt && { dateModified: article.updatedAt }),
    ...(article.coverImage && { image: absoluteUrl(article.coverImage) }),
    ...(article.reviewedBy && {
      reviewedBy: {
        "@type": "Person",
        name: article.reviewedBy,
      },
    }),
  };
  const relatedLinks = [
    article.relatedService,
    article.relatedDevice,
    article.relatedSolution,
  ].filter(Boolean);
  const whatsappUrl = createWhatsappUrl(article.whatsappMessage);

  return (
    <article dir="rtl">
      <Seo
        canonicalPath={canonicalPath}
        description={seoDescription}
        image={article.coverImage}
        jsonLd={[
          createBreadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "المدونة", path: "/blog" },
            { name: article.title, path: canonicalPath },
          ]),
          createWebPageSchema({
            name: article.title,
            description: seoDescription,
            path: canonicalPath,
          }),
          articleSchema,
        ]}
        ogType="article"
        title={article.title}
      />
      <header className="relative overflow-hidden border-b border-[#f8aa2d]/20 bg-[#fff7eb] px-4 pb-14 pt-28 sm:px-5 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,170,45,0.2),transparent_38%)]" />
        <div className="relative mx-auto max-w-5xl">
          <Breadcrumbs
            items={[
              { label: "المدونة", to: "/blog" },
              { label: article.title },
            ]}
          />
          <p className="mt-8 text-sm font-black text-[#cf7d11]">
            {article.category}
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-[#4c2c00] sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-[#4c2c00]/60">
            {article.publishedAt && (
              <span>تاريخ النشر: {article.publishedAt}</span>
            )}
            {article.updatedAt && (
              <span>آخر تحديث: {article.updatedAt}</span>
            )}
            {article.readingTime && (
              <span>وقت القراءة: {article.readingTime}</span>
            )}
          </div>
          {article.reviewedBy && (
            <p className="mt-4 font-bold text-[#4c2c00]/65">
              راجعه طبيًا: {article.reviewedBy}
            </p>
          )}
        </div>
      </header>

      {article.coverImage && (
        <div className="px-4 pt-14 sm:px-5 lg:px-8">
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#f8aa2d]/25">
            <img
              alt={article.title}
              className="max-h-[36rem] w-full object-cover"
              decoding="async"
              loading="lazy"
              src={article.coverImage}
            />
          </div>
        </div>
      )}

      {article.sections.length > 0 && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl space-y-12">
            {article.sections.map((section, index) => (
              <section key={section.heading || index}>
                {section.heading && <SectionTitle title={section.heading} />}
                {section.body && (
                  <p className="mt-5 text-lg font-medium leading-9 text-[#4c2c00]/72">
                    {section.body}
                  </p>
                )}
              </section>
            ))}
          </div>
        </section>
      )}

      {relatedLinks.length > 0 && (
        <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionTitle title="روابط ذات صلة" />
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {relatedLinks.map((relatedLink) => (
                <Link
                  className="rounded-[1.5rem] border border-[#f8aa2d]/25 bg-white/70 p-5 font-black text-[#4c2c00] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55 hover:text-[#cf7d11]"
                  key={relatedLink.to}
                  to={relatedLink.to}
                >
                  {relatedLink.title}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#f8aa2d]/30 bg-[#4c2c00] px-6 py-10 text-center shadow-[0_24px_70px_rgba(76,44,0,0.2)] sm:px-10 sm:py-12">
          <h2 className="text-2xl font-black text-[#fff7eb] sm:text-3xl">
            استفسر عن موضوع المقال
          </h2>
          <a
            aria-label="استفسر عبر واتساب (يفتح في نافذة جديدة)"
            className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
            href={whatsappUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            استفسر عبر واتساب
          </a>
        </div>
      </section>
    </article>
  );
}
