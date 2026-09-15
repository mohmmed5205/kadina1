import { useOutletContext } from "react-router-dom";
import Link from "../routing/LocalizedLink";

export default function ArticleCard({ article }) {
  const { lang } = useOutletContext();
  return (
    <article className="overflow-hidden rounded-[1.75rem] border border-[var(--color-border)] bg-[var(--color-surface-raised)] shadow-[var(--shadow-card)]">
      <div className="flex min-h-52 items-center justify-center overflow-hidden bg-[var(--color-surface-raised)]">
        {article.coverImage ? (
          <img
            alt={article.title}
            className="h-52 w-full object-cover"
            decoding="async"
            loading="lazy"
            src={article.coverImage}
          />
        ) : (
          <span className="p-6 text-center text-xl font-black text-[var(--color-heading)]">
            {article.category}
          </span>
        )}
      </div>
      <div className="p-6">
        <span className="text-sm font-black text-[var(--color-accent)]">
          {article.category}
        </span>
        <h2 className="mt-3 text-xl font-black leading-8 text-[var(--color-heading)]">
          {article.title}
        </h2>
        {article.excerpt && (
          <p className="mt-4 leading-7 text-[var(--color-text-muted)]">
            {article.excerpt}
          </p>
        )}
        <Link
          className="mt-5 inline-block font-black text-[var(--color-accent)]"
          to={`/blog/${article.slug}`}
        >
          {lang === "ar" ? "اقرأ المقال" : "Read Article"}
        </Link>
      </div>
    </article>
  );
}
