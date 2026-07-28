import { Link } from "react-router-dom";
import ArticleCard from "../blog/ArticleCard";
import SectionTitle from "../common/SectionTitle";
import { articles } from "../../data/articles";

export default function HomeBlogSection() {
  const publishedArticles = articles.filter(
    (article) => article.status === "published",
  );

  return (
    <section
      className="scroll-mt-24 px-4 py-14 sm:px-5 sm:py-16 lg:px-8 lg:py-20"
      id="blog"
    >
      <div className="mx-auto max-w-7xl">
        <SectionTitle
          eyebrow="مدونة كادينا"
          title="دليلك الطبي قبل أي قرار تجميلي"
          description="مقالات يكتبها ويراجعها استشاريو كادينا، بلا مبالغة ولا تسويق مقنّع."
        />
        {publishedArticles.length > 0 ? (
          <div className="mt-9 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {publishedArticles.map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        ) : (
          <div className="mt-9 rounded-[2rem] border border-[#f8aa2d]/25 bg-[#fff7eb] px-6 py-12 text-center shadow-[0_18px_45px_rgba(76,44,0,0.07)]">
            <h3 className="text-2xl font-black text-[#4c2c00]">
              المقالات قريبًا
            </h3>
          </div>
        )}
        <div className="mt-8 text-center">
          <Link
            className="font-black text-[#cf7d11] underline decoration-[#f8aa2d]/40 underline-offset-8"
            to="/blog"
          >
            زيارة المدونة
          </Link>
        </div>
      </div>
    </section>
  );
}
