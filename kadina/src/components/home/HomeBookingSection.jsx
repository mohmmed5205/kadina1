import { useOutletContext } from "react-router-dom";
import BookingForm from "../booking/BookingForm";
import { SOURCE_SECTIONS } from "../../utils/analytics";
import { getContactItems } from "../../data/contact";

export default function HomeBookingSection() {
  const { lang } = useOutletContext();
  const phone = getContactItems(lang)[0];

  return (
    <section className="border-b border-[var(--color-border)] bg-[var(--color-surface)] py-16 sm:py-20 lg:py-24" id="booking" aria-labelledby="home-booking-title">
      <div className="ds-container !max-w-5xl">
        <div className="rounded-[1.75rem] border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] p-7 sm:p-9">
          <h2 className="text-2xl font-black text-[var(--color-heading)] sm:text-3xl">
            {lang === "ar" ? "هل تحتاج مساعدة؟" : "Need help?"}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-text-muted)]">
            {lang === "ar"
              ? "فريق كادينا جاهز لمساعدتك في اختيار الموعد والتخصص المناسب."
              : "The Kadina team is ready to help you choose the right appointment and specialty."}
          </p>
          <a className="mt-5 inline-flex min-h-11 items-center font-black text-[var(--color-accent)]" href={phone.href} dir="ltr">
            {phone.value}
          </a>
        </div>

        <div className="mt-10 rounded-[1.75rem] border border-[var(--color-border-strong)] bg-[var(--color-surface-raised)] p-5 sm:p-8 lg:p-10">
          <p className="section-title-eyebrow">{lang === "ar" ? "نموذج الحجز" : "Booking form"}</p>
          <h2 className="mt-4 text-[clamp(2rem,4vw,3.25rem)] font-black leading-[1.2] text-[var(--color-heading)]" id="home-booking-title">
            {lang === "ar" ? "اطلب موعدك" : "Request an appointment"}
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--color-text-muted)]">
            {lang === "ar"
              ? "املأ بياناتك وسيتواصل معك فريق كادينا لمتابعة الطلب وتأكيد الموعد."
              : "Share your details and the Kadina team will contact you to follow up and confirm the appointment."}
          </p>
          <div className="mt-7">
            <BookingForm idPrefix="home-booking" sourceSection={SOURCE_SECTIONS.HOME_BOOKING} />
          </div>
        </div>
      </div>
    </section>
  );
}
