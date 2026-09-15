import Link from "../routing/LocalizedLink";
import { getMedicalReviewer } from "../../utils/medicalReview";

export default function MedicalReviewBy({ lang = "ar", review }) {
  const reviewer = getMedicalReviewer(review, lang);
  if (!reviewer) return null;

  const en = lang === "en";
  return (
    <aside
      aria-label={en ? "Medical review information" : "بيانات المراجعة الطبية"}
      className="border-y border-[var(--color-border)] bg-[var(--color-surface-raised)]"
    >
      <dl className="ds-container grid gap-px py-5 sm:grid-cols-2">
        <div>
          <dt className="text-xs font-black text-[var(--color-accent-strong)]">
            {en ? "Medically reviewed by" : "راجعه طبيًا"}
          </dt>
          <dd className="mt-2">
            <Link
              className="inline-flex min-h-11 items-center font-black text-[var(--color-heading)] underline-offset-4 hover:underline"
              to={`/doctors/${reviewer.doctor.slug}`}
            >
              {reviewer.doctor.name}
            </Link>
            <span className="block text-sm font-bold leading-7 text-[var(--color-text-muted)]">
              {reviewer.doctor.specialty}
            </span>
          </dd>
        </div>
        <div>
          <dt className="text-xs font-black text-[var(--color-accent-strong)]">
            {en ? "Last reviewed" : "آخر مراجعة"}
          </dt>
          <dd className="mt-2 font-bold text-[var(--color-heading)]">
            <time dateTime={reviewer.lastReviewedDate}>
              {reviewer.lastReviewedDate}
            </time>
          </dd>
        </div>
      </dl>
    </aside>
  );
}
