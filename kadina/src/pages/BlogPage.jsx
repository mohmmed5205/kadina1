import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import ArticleCard from "../components/blog/ArticleCard";
import PageHero from "../components/common/PageHero";
import SectionTitle from "../components/common/SectionTitle";
import Seo from "../components/seo/Seo";
import {
  createBreadcrumbSchema,
  createWebPageSchema,
} from "../components/seo/seoUtils";
import { articleCategories, getArticles } from "../data/articles";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../componetts/motionPresets";

export default function BlogPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const localizedCategories = en ? ["Skin Care", "Hair", "Laser", "Cosmetic Injectables", "Plastic Surgery", "Before & After Procedures"] : articleCategories;
  const publishedArticles = getArticles(lang).filter(
    (article) => article.status === "published",
  );

  return (
    <div>
      <Seo
        canonicalPath="/blog"
        description={en ? "Kadina Medical Blog. Medical articles appear here only after their content and review data are approved." : "مدونة كادينا الطبية. لا تظهر المقالات الطبية هنا إلا بعد اعتماد محتواها وبيانات مراجعتها."}
        jsonLd={[
          createBreadcrumbSchema([
            { name: en ? "Home" : "الرئيسية", path: "/" },
            { name: en ? "Blog" : "المدونة", path: "/blog" },
          ]),
          createWebPageSchema({
            name: en ? "Kadina Medical Blog" : "مدونة كادينا الطبية",
            description: en ? "Approved medical articles from Kadina Medical Center." : "مقالات طبية معتمدة من مركز كادينا الطبي.",
            path: "/blog",
          }),
        ]}
        title={en ? "Kadina Medical Blog" : "مدونة كادينا الطبية"}
      />
      <PageHero
        breadcrumbLabel={en ? "Blog" : "المدونة"}
        eyebrow={en ? "Kadina Blog" : "مدونة كادينا"}
        title={en ? "Your medical guide before an aesthetic decision" : "دليلك الطبي... قبل أي قرار تجميلي"}
        description={en ? "Useful medical content will appear here after its material and review data are approved." : "سيظهر هنا المحتوى الطبي المفيد بعد اعتماد مادته وبيانات مراجعته."}
      />

      <section className="px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={en ? "Categories" : "التصنيفات"}
            title={en ? "Browse by Interest" : "تصفّح حسب اهتمامك"}
            description={en ? "The upcoming medical content plan for Kadina's blog." : "خطة المحتوى الطبي القادمة في مدونة كادينا."}
          />
          <motion.div
            className="mt-7 flex flex-wrap gap-3"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewportOnce}
            whileInView="visible"
          >
            {localizedCategories.map((category, index) => (
              <motion.span
                className="rounded-full border border-[var(--color-border)] bg-[var(--color-surface-muted)] px-4 py-2 text-sm font-black text-[var(--color-heading)]"
                key={`article-category-${index}`}
                variants={cardItem}
              >
                {category}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="bg-[var(--color-surface-muted)] px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-7xl">
          {publishedArticles.length > 0 ? (
            <>
              <SectionTitle
                eyebrow={en ? "Articles" : "المقالات"}
                title={en ? "Latest Kadina Articles" : "أحدث مقالات كادينا"}
              />
              <motion.div
                className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
                initial="hidden"
                variants={staggerContainer}
                viewport={viewportOnce}
                whileInView="visible"
              >
                {publishedArticles.map((article) => (
                  <motion.div key={article.slug} variants={cardItem}>
                    <ArticleCard article={article} />
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <motion.div
              className="rounded-[2rem] border border-[var(--color-border)] bg-[var(--color-surface-raised)] px-6 py-14 text-center shadow-[var(--shadow-card)] sm:px-10"
              initial="hidden"
              variants={fadeUp}
              viewport={viewportOnce}
              whileInView="visible"
            >
              <h2 className="text-2xl font-black text-[var(--color-heading)] sm:text-3xl">
                {en ? "Articles Coming Soon" : "المقالات قريبًا"}
              </h2>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-[var(--color-text-muted)]">
                {en ? "No medical article has completed the approval and review workflow yet." : "لا يوجد حتى الآن مقال طبي أكمل مسار الاعتماد والمراجعة."}
              </p>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}
