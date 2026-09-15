import { useOutletContext } from "react-router-dom";
import BookingForm from "../booking/BookingForm";
import { SOURCE_SECTIONS } from "../../utils/analytics";

export default function HomeBookingSection() {
  const { lang } = useOutletContext();

  return (
    <section className="home-booking ds-section overflow-hidden bg-[var(--color-surface-muted)]" id="booking" aria-labelledby="home-booking-title">
      <div className="ds-container grid gap-7 lg:grid-cols-[minmax(0,.72fr)_minmax(0,1.28fr)] lg:items-start lg:gap-14">
        <div className="max-w-xl lg:sticky lg:top-28">
          <p className="section-title-eyebrow">{lang === "ar" ? "هل تحتاج مساعدة؟" : "Need help choosing?"}</p>
          <h2 className="mt-5 text-[clamp(1.75rem,3vw,2.5rem)] font-black leading-[1] tracking-[-.045em] text-[var(--color-heading)]" id="home-booking-title">
            {lang === "ar" ? "ابدأ بطلب موعد واضح" : "Start with a clear appointment request"}
          </h2>
          <p className="mt-5 max-w-lg text-base leading-8 text-[var(--color-text-muted)] sm:text-base lg:leading-8">
            {lang === "ar" ? "شارك البيانات الأساسية فقط، وسيتواصل معك فريق كادينا لمتابعة الطلب وتحديد الخطوة المناسبة." : "Share only the essential details. The Kadina team will contact you to follow up and help determine the appropriate next step."}
          </p>
          <p className="mt-6 border-s border-[var(--color-accent-strong)] ps-5 text-sm font-bold leading-7 text-[var(--color-text-muted)]">
            {lang === "ar" ? "إرسال النموذج لا يعني تأكيد الموعد، ويرجى عدم كتابة معلومات طبية في الملاحظة." : "Submitting the form does not confirm an appointment. Please do not include medical information in the note."}
          </p>
        </div>
        <BookingForm idPrefix="home-booking" sourceSection={SOURCE_SECTIONS.HOME_BOOKING} />
      </div>
    </section>
  );
}
