// Canonical review architecture. Keep this collection empty until every review
// can be traced to a public source supplied or approved by Kadina.
export const reviews = Object.freeze([]);

export const reviewSummary = Object.freeze({
  overallRating: null,
  reviewCount: null,
  googleBusinessProfileUrl: null,
});

export function getReviews({ locale, serviceSlug, doctorSlug } = {}) {
  const relatedReviews = reviews.filter((review) => {
    if (serviceSlug && review.serviceSlug !== serviceSlug) return false;
    if (doctorSlug && review.doctorSlug !== doctorSlug) return false;
    return true;
  });

  if (!locale) return relatedReviews;

  const localizedReviews = relatedReviews.filter(
    (review) => review.locale === locale,
  );

  // Preserve original review language when no review exists in the active
  // locale. The UI labels this explicitly instead of inventing a translation.
  return localizedReviews.length > 0 ? localizedReviews : relatedReviews;
}

export function getServiceReviews(serviceSlug, locale) {
  return getReviews({ locale, serviceSlug });
}

export function getDoctorReviews(doctorSlug, locale) {
  return getReviews({ doctorSlug, locale });
}
