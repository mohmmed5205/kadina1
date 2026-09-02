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
            className="mx-auto max-w-3xl rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] p-8 text-center shadow-[0_20px_60px_rgba(76,44,0,0.1)] sm:p-12"
            initial="hidden"
            variants={fadeUp}
          >
            <h1 className="text-3xl font-black text-[#4c2c00]">
              {en ? "Article Currently Unavailable" : "المقال غير متاح حاليًا"}
            </h1>
            <p className="mt-4 leading-8 text-[#4c2c00]/68">
              {en ? "Return to the blog to view available articles." : "يمكنك العودة إلى المدونة للاطلاع على المقالات المتاحة."}
            </p>
            <Link
              className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
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
      <header className="relative overflow-hidden border-b border-[#f8aa2d]/20 bg-[#fff7eb] px-4 pb-14 pt-28 sm:px-5 sm:pb-16 sm:pt-32 lg:px-8 lg:pb-20">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(248,170,45,0.2),transparent_38%)]" />
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
          <p className="mt-8 text-sm font-black text-[#cf7d11]">
            {article.category}
          </p>
          <h1 className="mt-3 text-3xl font-black leading-tight text-[#4c2c00] sm:text-4xl lg:text-5xl">
            {article.title}
          </h1>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm font-bold text-[#4c2c00]/60">
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
          <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-[#f8aa2d]/25">
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
                  <p className="mt-5 text-lg font-medium leading-9 text-[#4c2c00]/72">
                    {section.body}
                  </p>
                )}
                {Array.isArray(section.body) && (
                  <div className="mt-5 space-y-4">
                    {section.body.map((paragraph, paragraphIndex) => (
                      <p
                        className="text-lg font-medium leading-9 text-[#4c2c00]/72"
                        key={`article-paragraph-${index}-${paragraphIndex}`}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
                {section.items?.length > 0 && (
                  <ul className="mt-5 list-disc space-y-3 ps-6 text-lg font-medium leading-8 text-[#4c2c00]/72">
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
                  <tr className="border-y border-[#f8aa2d]/35">
                    <th className="p-4 text-start">{en ? "Point" : "النقطة"}</th>
                    <th className="p-4 text-start">{article.itemA?.title}</th>
                    <th className="p-4 text-start">{article.itemB?.title}</th>
                  </tr>
                </thead>
                <tbody>
                  {article.comparisonPoints.map((point, index) => (
                    <tr className="border-b border-[#f8aa2d]/20" key={`comparison-point-${index}`}>
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
            <div className="mt-7 border-t border-[#f8aa2d]/25">
              {article.faq.map((item, index) => (
                <div className="border-b border-[#f8aa2d]/25 py-6" key={`article-faq-${index}`}>
                  <h3 className="text-lg font-black text-[#4c2c00]">{item.question}</h3>
                  <p className="mt-3 leading-8 text-[#4c2c00]/72">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <MedicalReviewBy lang={lang} review={medicalReview} />

      {relatedLinks.length > 0 && (
        <section className="bg-[#fff7eb]/65 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
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
                  className="rounded-[1.5rem] border border-[#f8aa2d]/25 bg-white/70 p-5 font-black text-[#4c2c00] transition hover:-translate-y-1 hover:border-[#f8aa2d]/55 hover:text-[#cf7d11]"
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
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-[#f8aa2d]/30 bg-[#4c2c00] px-6 py-10 text-center shadow-[0_24px_70px_rgba(76,44,0,0.2)] sm:px-10 sm:py-12">
          <h2 className="text-2xl font-black text-[#fff7eb] sm:text-3xl">
            {en ? "Ask About This Article" : "استفسر عن موضوع المقال"}
          </h2>
          <a
            aria-label={en ? "Ask on WhatsApp (opens in a new window)" : "استفسر عبر واتساب (يفتح في نافذة جديدة)"}
            className="mt-7 inline-block rounded-full bg-[#f8aa2d] px-6 py-3 font-black text-[#2b1b08] transition hover:bg-[#cf7d11] hover:text-white"
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
