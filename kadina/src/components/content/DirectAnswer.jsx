function AnswerParagraphs({ answer }) {
  const paragraphs = Array.isArray(answer) ? answer : [answer];

  return paragraphs.filter(Boolean).map((paragraph, index) => (
    <p
      className="text-lg font-bold leading-9 text-[var(--color-text)] sm:text-xl"
      key={`direct-answer-${index}`}
    >
      {paragraph}
    </p>
  ));
}

export default function DirectAnswer({ answer, lang = "ar", question }) {
  if (!question || (!answer && !Array.isArray(answer))) return null;
  if (Array.isArray(answer) && answer.filter(Boolean).length === 0) return null;

  return (
    <section
      aria-labelledby="direct-answer-heading"
      className="border-b border-[var(--color-border)] bg-[var(--color-surface)]"
    >
      <div className="ds-container py-8 sm:py-10">
        <p className="section-title-eyebrow">
          {lang === "en" ? "Direct Answer" : "إجابة مباشرة"}
        </p>
        <h2
          className="mt-3 text-2xl font-black leading-tight text-[var(--color-heading)] sm:text-3xl"
          id="direct-answer-heading"
        >
          {question}
        </h2>
        <div className="mt-5 max-w-4xl space-y-4">
          <AnswerParagraphs answer={answer} />
        </div>
      </div>
    </section>
  );
}
