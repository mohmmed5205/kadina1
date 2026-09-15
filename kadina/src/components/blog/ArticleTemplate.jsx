import { motion } from "framer-motion";
import { useLocation, useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";
import Breadcrumbs from "../common/Breadcrumbs";
import SectionTitle from "../common/SectionTitle";
import DirectAnswer from "../content/DirectAnswer";
import MedicalReviewBy from "../content/MedicalReviewBy";
import Seo from "../seo/Seo";
import {
  absoluteUrl,
  createBreadcrumbSchema,
  createFaqSchema,
  createWebPageSchema,
} from "../seo/seoUtils";
import { createWhatsappUrl } from "../../utils/whatsapp";
import { getMedicalReviewer } from "../../utils/medicalReview";
import { getArticle } from "../../data/articles";
import { useTrackedView } from "../../hooks/useAnalytics";
import {
  ANALYTICS_EVENTS,
  SOURCE_SECTIONS,
  getCurrentPath,
  trackContactAction,
} from "../../utils/analytics";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";

const MotionLink = motion.create(Link);

export default function ArticleTemplate({ article: rawArticle }) {
  const location = useLocation();
  const { lang } = useOutletContext();
  const en = lang === "en";
  const article = rawArticle ? getArticle(rawArticle.slug, lang) : null;
  const published = article?.status === "published";
  useTrackedView(
    ANALYTICS_EVENTS.ARTICLE_VIEW,
    {
      article_slug: rawArticle?.slug,
      language: lang,
      path: getCurrentPath(location),
    },
    published,
  );

  if (!published) {
    return (
      <>
        <Seo
          canonicalPath={location.pathname}
          description={en ? "The requested article is not currently available for publication." : "المقال المطلوب غير متاح للنشر حاليًا."}
          noindex
          title={en ? "Article Currently Unavailable" : "المقال غير متاح حاليًا"}
        />
        <section className="min-h-[70vh] px-4 pb-20 pt-32 sm:px-5 lg:px-8">
          <motion.div
            animate="visible"
            className="mx-auto max-w-3xl rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-muted)] p-8 text-center shadow-[var(--shadow-card)] sm:p-12"
            initial="hidden"
            variants={fadeUp}
          >
            <h1 className="text-3xl font-black text-[var(--color-heading)]">
              {en ? "Article Currently Unavailable" : "المقال غير متاح حاليًا"}
            </h1>
            <p className="mt-4 leading-8 text-[var(--color-text-muted)]">
              {en ? "Return to the blog to view available articles." : "يمكنك العودة إلى المدونة للاطلاع على المقالات المتاحة."}
            </p>
            <Link
              className="mt-7 inline-block rounded-full bg-[var(--color-accent)] px-6 py-3 font-black text-[var(--color-ink)] transition hover:bg-[var(--color-accent-hover)] hover:text-[var(--color-ink)]"
              to="/blog"
            >
              {en ? "Back to Blog" : "العودة إلى المدونة"}
            </Link>
          </motion.div>
        </section>
      </>
    );
  }

  const canonicalPath = `/blog/${article.slug}`;
  const seoDescription = article.excerpt || article.title;
  const medicalReview = article.medicalReviewBy
    ? {
        ...article.medicalReviewBy,
        lastReviewedDate:
          article.lastReviewedDate || article.medicalReviewBy.lastReviewedDate,
      }
    : null;
  const reviewer = getMedicalReviewer(medicalReview, lang);
  const articleSchema = {
    "@type": "BlogPosting",
    headline: article.title,
    description: seoDescription,
    articleSection: article.category,
    url: absoluteUrl(canonicalPath),
    ...(article.publishedAt && { datePublished: article.publishedAt }),
    ...(article.updatedAt && { dateModified: article.updatedAt }),
    ...(article.coverImage && { image: absoluteUrl(article.coverImage) }),
    ...(reviewer && {
      reviewedBy: {
        "@type": "Person",
        name: reviewer.doctor.name,
        url: absoluteUrl(`/doctors/${reviewer.doctor.slug}`),
      },
    }),
  };
  const relatedLinks = [
    article.relatedService,
    article.relatedProcedure,
    article.relatedDoctor,
    article.relatedDevice,
    article.relatedSolution,
    ...(article.relatedServices || []),
    ...(article.relatedProcedures || []),
    ...(article.relatedDoctors || []),
    ...(article.relatedDevices || []),
    ...(article.relatedSolutions || []),
  ].filter(Boolean);
  const whatsappUrl = createWhatsappUrl(article.whatsappMessage);

  return (
    <article>
      <Seo
        canonicalPath={canonicalPath}
        description={seoDescription}
        image={article.coverImage}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "Blog" : "المدونة", path: "/blog" },
            { name: article.title, path: canonicalPath },
          ]),
          createWebPageSchema({
            name: article.title,
            description: seoDescription,
            path: canonicalPath,
          }),
          articleSchema,
          article.faq?.length ? createFaqSchema(article.faq) : null,
        ]}
        ogType="article"
        title={article.title}
      />
      <header className="relative overflow-hidden border-b border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 pb-14 pt-28 sm:px-5 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--color-accent-wash),transparent_38%)]" />
        <motion.div
          animate="visible"
          className="relative mx-auto max-w-5xl"
          initial="hidden"
          variants={fadeUp}
        >
          <Breadcrumbs
            items={[
              { label: en ? "Blog" : "المدونة", to: "/blog" },
              { label: article.title },
            ]}
          />
          <p className="mt-8 text-sm font-black text-[var(--color-accent)]">
            {article.category}
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-[var(--color-heading)] sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-[var(--color-text-muted)]">
            {article.publishedAt && (
              <span>{en ? "Published" : "تاريخ النشر"}: {article.publishedAt}</span>
            )}
            {article.updatedAt && (
              <span>{en ? "Last Updated" : "آخر تحديث"}: {article.updatedAt}</span>
            )}
            {article.readingTime && (
              <span>{en ? "Reading Time" : "وقت القراءة"}: {article.readingTime}</span>
            )}
          </div>
        </motion.div>
      </header>

      <DirectAnswer
        answer={article.directAnswer?.answer}
        lang={lang}
        question={article.directAnswer?.question}
      />

      {article.coverImage && (
        <motion.div
          className="px-4 pt-14 sm:px-5 lg:px-8"
          initial="hidden"
          variants={fadeUp}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[var(--color-border)]">
            <img
              alt={article.title}
              className="max-h-[36rem] w-full object-cover"
              decoding="async"
              loading="lazy"
              src={article.coverImage}
            />
          </div>
        </motion.div>
      )}

      {article.sections?.length > 0 && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <motion.div
            className="mx-auto max-w-4xl space-y-12"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewportOnce}
            whileInView="visible"
          >
            {article.sections.map((section, index) => (
              <motion.section
                key={`article-section-${index}`}
                variants={cardItem}
              >
                {section.heading && <SectionTitle title={section.heading} />}
                {typeof section.body === "string" && (
                  <p className="mt-5 text-lg font-medium leading-9 text-[var(--color-text-muted)]">
                    {section.body}
                  </p>
                )}
                {Array.isArray(section.body) && (
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph, paragraphIndex) => (
                      <p
                        className="text-lg font-medium leading-9 text-[var(--color-text-muted)]"
                        key={`article-paragraph-${index}-${paragraphIndex}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                {section.items?.length > 0 && (
                  <ul className="mt-5 list-disc space-y-3 ps-6 text-lg font-medium leading-8 text-[var(--color-text-muted)]">
                    {section.items.map((item, itemIndex) => (
                      <li key={`article-item-${index}-${itemIndex}`}>{item}</li>
                    ))}
                  </ul>
                )}
              </motion.section>
            ))}
          </motion.div>
        </section>
      )}

      {article.comparisonPoints?.length > 0 && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionTitle title={en ? "Comparison" : "المقارنة"} />
            <div className="mt-7 overflow-x-auto">
              <table className="w-full min-w-[42rem] border-collapse text-start">
                <thead>
                  <tr className="border-y border-[var(--color-border)]">
                    <th className="p-4 text-start">{en ? "Point" : "النقطة"}</th>
                    <th className="p-4 text-start">{article.itemA?.title}</th>
                    <th className="p-4 text-start">{article.itemB?.title}</th>
                  </tr>
                </thead>
                <tbody>
                  {article.comparisonPoints.map((point, index) => (
                    <tr className="border-b border-[var(--color-border)]" key={`comparison-point-${index}`}>
                      <th className="p-4 text-start">{point.label}</th>
                      <td className="p-4">{point.itemA}</td>
                      <td className="p-4">{point.itemB}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {article.faq?.length > 0 && (
        <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-4xl">
            <SectionTitle title={en ? "Frequently Asked Questions" : "الأسئلة الشائعة"} />
            <div className="mt-7 border-t border-[var(--color-border)]">
              {article.faq.map((item, index) => (
                <div className="border-b border-[var(--color-border)] py-6" key={`article-faq-${index}`}>
                  <h3 className="text-lg font-black text-[var(--color-heading)]">{item.question}</h3>
                  <p className="mt-3 leading-8 text-[var(--color-text-muted)]">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <MedicalReviewBy lang={lang} review={medicalReview} />

      {relatedLinks.length > 0 && (
        <section className="bg-[var(--color-surface-muted)] px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
          <div className="mx-auto max-w-5xl">
            <SectionTitle title={en ? "Related Links" : "روابط ذات صلة"} />
            <motion.div
              className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
              initial="hidden"
              variants={staggerContainer}
              viewport={viewportOnce}
              whileInView="visible"
            >
              {relatedLinks.map((relatedLink) => (
                <MotionLink
                  className="rounded-[1.5rem] border border-[var(--color-border)] bg-[var(--color-surface-raised)] p-5 font-black text-[var(--color-heading)] transition hover:-translate-y-1 hover:border-[var(--color-border)] hover:text-[var(--color-accent)]"
                  key={relatedLink.to}
                  to={relatedLink.to}
                  variants={cardItem}
                >
                  {relatedLink.title}
                </MotionLink>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      <motion.section
        className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
        initial="hidden"
        variants={fadeUp}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-dark)] px-6 py-10 text-center shadow-[var(--shadow-card)] sm:px-10 sm:py-12">
          <h2 className="text-2xl font-black text-[var(--color-text-on-dark)] sm:text-3xl">
            {en ? "Ask About This Article" : "استفسر عن موضوع المقال"}
          </h2>
          <a
            aria-label={en ? "Ask on WhatsApp (opens in a new window)" : "استفسر عبر واتساب (يفتح في نافذة جديدة)"}
            className="mt-7 inline-block rounded-full bg-[var(--color-accent)] px-6 py-3 font-black text-[var(--color-ink)] transition hover:bg-[var(--color-accent-hover)] hover:text-[var(--color-ink)]"
            href={whatsappUrl}
            onClick={() =>
              trackContactAction(ANALYTICS_EVENTS.WHATSAPP_CLICK, {
                language: lang,
                page_type: "article",
                slug: article.slug,
                source_section: SOURCE_SECTIONS.ARTICLE_DETAIL,
              })
            }
            rel="noopener noreferrer"
            target="_blank"
          >
            {en ? "Ask on WhatsApp" : "استفسر عبر واتساب"}
          </a>
        </div>
      </motion.section>
    </article>
  );
}
