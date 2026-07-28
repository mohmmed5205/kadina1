import { Link } from "react-router-dom";

export default function ArticleCard({ article }) {
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-[#f8aa2d]/25 bg-white/75 shadow-[0_18px_45px_rgba(76,44,0,0.07)]">
      <div className="flex min-h-52 items-center justify-center overflow-hidden bg-[linear-gradient(135deg,rgba(248,170,45,0.2),rgba(255,247,235,0.9))]">
        {article.coverImage ? (
          <img
            alt={article.title}
            className="h-52 w-full object-cover"
            decoding="async"
            loading="lazy"
            src={article.coverImage}
          />
        ) : (
          <span className="p-6 text-center text-xl font-black text-[#4c2c00]">
            {article.category}
          </span>
        )}
      </div>
      <div className="p-6">
        <span className="text-sm font-black text-[#cf7d11]">
          {article.category}
        </span>
        <h2 className="mt-3 text-xl font-black leading-8 text-[#4c2c00]">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="mt-4 leading-7 text-[#4c2c00]/68">
            {article.excerpt}
          </p>
        )}
        <Link
          className="mt-5 inline-block font-black text-[#cf7d11]"
          to={`/blog/${article.slug}`}
        >
          اقرأ المقال
        </Link>
      </div>
    </article>
  );
}
