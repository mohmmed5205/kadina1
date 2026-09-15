import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import { getReviews, reviewSummary } from "../../data/reviews";
import {
  cardItem,
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "../../componetts/motionPresets";
import ReviewCard from "./ReviewCard";

export default function HomeReviewsSection() {
  const { lang } = useOutletContext();
  const availableReviews = getReviews({ locale: lang });

  if (availableReviews.length === 0) return null;

  const [featuredReview, ...additionalReviews] = availableReviews;
  const hasVerifiedSummary =
    Number.isFinite(reviewSummary.overallRating) &&
    Number.isInteger(reviewSummary.reviewCount);

  return (
    <section
      aria-labelledby="home-reviews-title"
      className="overflow-hidden bg-[var(--color-surface-muted)]"
      id="reviews"
    >
      <div className="ds-container ds-section">
        <motion.header
          className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end"
          initial="hidden"
          variants={fadeUp}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <div>
            <p className="section-title-eyebrow">
              {lang === "ar" ? "تجارب موثقة" : "Verified Experiences"}
            </p>
            <h2
              className="mt-4 max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-black leading-[1.05] text-[var(--color-heading)]"
              id="home-reviews-title"
            >
              {lang === "ar" ? "ما شاركه عملاء كادينا" : "What Kadina clients shared"}
            </h2>
          </div>

          {hasVerifiedSummary && (
            <div className="border-s border-[var(--color-accent)] ps-5">
              <p className="text-4xl font-black tabular-nums text-[var(--color-heading)]">
                {reviewSummary.overallRating}
                <span className="ms-2 text-base text-[var(--color-text-muted)]">
                  {lang === "ar" ? "من 5" : "out of 5"}
                </span>
              </p>
              <p className="mt-1 text-sm font-bold text-[var(--color-text-muted)]">
                {lang === "ar"
                  ? `${reviewSummary.reviewCount} تقييمًا`
                  : `${reviewSummary.reviewCount} reviews`}
              </p>
            </div>
          )}
        </motion.header>

        <motion.div
          className="mt-12 grid gap-x-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(20rem,.75fr)]"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <motion.div variants={cardItem}>
            <ReviewCard featured lang={lang} review={featuredReview} />
          </motion.div>

          {additionalReviews.length > 0 && (
            <div className="grid sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-1">
              {additionalReviews.map((review) => (
                <motion.div key={review.id} variants={cardItem}>
                  <ReviewCard lang={lang} review={review} />
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        {reviewSummary.googleBusinessProfileUrl && (
          <motion.a
            className="mt-10 inline-flex min-h-12 items-center gap-3 border-b border-[var(--color-accent)] pb-1 font-black text-[var(--color-heading)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent-strong)]"
            href={reviewSummary.googleBusinessProfileUrl}
            rel="noopener noreferrer"
            target="_blank"
            variants={fadeUp}
          >
            {lang === "ar"
              ? "عرض المزيد من التقييمات على Google"
              : "View more reviews on Google"}
            <span aria-hidden="true">↗</span>
          </motion.a>
        )}
      </div>
    </section>
  );
}
