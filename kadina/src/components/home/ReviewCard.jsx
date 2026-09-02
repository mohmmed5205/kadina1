function Rating({ value, lang }) {
  if (!Number.isFinite(value)) return null;

  const accessibleLabel =
    lang === "ar" ? `${value} من 5` : `${value} out of 5`;

  return (
    <div
      aria-label={accessibleLabel}
      className="inline-flex items-center gap-2 text-[var(--color-accent-strong)]"
      role="img"
    >
      <span aria-hidden="true" className="text-xl leading-none">
        ★
      </span>
      <span aria-hidden="true" className="font-black tabular-nums">
        {value}/5
      </span>
    </div>
  );
}

export default function ReviewCard({ featured = false, lang, review }) {
  const isOriginalLanguage = review.locale && review.locale !== lang;
  const sourceContent = (
    <>
      {review.source}
      {review.sourceUrl && (
        <span aria-hidden="true" className="editorial-arrow">
          ↗
        </span>
      )}
    </>
  );

  return (
    <article
      className={`flex h-full flex-col border-t border-[var(--color-border-strong)] py-7 sm:py-9 ${
        featured ? "lg:pe-12" : ""
      }`}
    >
      <div className="flex min-h-11 items-center justify-between gap-4">
        <Rating lang={lang} value={review.rating} />
        {isOriginalLanguage && (
          <span className="text-xs font-bold text-[var(--color-text-muted)]">
            {lang === "ar" ? "باللغة الأصلية" : "Original review"}
          </span>
        )}
      </div>

      <blockquote
        className={`mt-6 font-bold text-[var(--color-heading)] ${
          featured
            ? "text-[clamp(1.65rem,3.5vw,3.25rem)] leading-[1.45]"
            : "text-xl leading-9 sm:text-2xl"
        }`}
        dir={review.locale === "ar" ? "rtl" : review.locale === "en" ? "ltr" : undefined}
      >
        “{review.text}”
      </blockquote>

      <footer className="mt-auto flex flex-wrap items-end justify-between gap-5 pt-8">
        <div>
          {review.author && (
            <p className="font-black text-[var(--color-heading)]">
              {review.author}
            </p>
          )}
          {review.date && (
            <time
              className="mt-1 block text-sm text-[var(--color-text-muted)]"
              dateTime={review.date}
            >
              {review.date}
            </time>
          )}
        </div>

        {review.source &&
          (review.sourceUrl ? (
            <a
              className="inline-flex min-h-11 items-center gap-2 border-b border-[var(--color-accent)] text-sm font-black text-[var(--color-heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-strong)]"
              href={review.sourceUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              {sourceContent}
            </a>
          ) : (
            <span className="inline-flex min-h-11 items-center text-sm font-black text-[var(--color-text-muted)]">
              {sourceContent}
            </span>
          ))}
      </footer>
    </article>
  );
}
