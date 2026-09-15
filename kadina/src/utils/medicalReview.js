import { getDoctorDetail } from "../data/doctors";

export function getMedicalReviewer(review, lang = "ar") {
  if (!review?.doctorSlug || !review?.lastReviewedDate) return null;
  const doctor = getDoctorDetail(review.doctorSlug, lang);
  if (!doctor) return null;
  return { doctor, lastReviewedDate: review.lastReviewedDate };
}
