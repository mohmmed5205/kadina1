import { useOutletContext } from "react-router-dom";
import BookingForm from "../components/booking/BookingForm";
import PageHero from "../components/common/PageHero";
import Seo from "../components/seo/Seo";
import { createWhatsappUrl } from "../utils/whatsapp";
import { SOURCE_SECTIONS } from "../utils/analytics";

export default function BookingPage() {
  const { lang } = useOutletContext();
  const en = lang === "en";
  const whatsappUrl = createWhatsappUrl(
    en
      ? "Hello, I would like to ask about booking an appointment at Kadina Center."
      : "مرحبًا، أرغب في الاستفسار عن حجز موعد في مركز كادينا.",
  );

  return (
    <div>
      <Seo
        canonicalPath="/booking"
        description={en ? "Send an appointment request to Kadina Medical Center. The team will contact you to follow up; the request does not confirm an appointment." : "أرسل طلب موعد إلى مركز كادينا الطبي، وسيتواصل معك الفريق للمتابعة؛ إرسال الطلب لا يعني تأكيد الموعد."}
        noindex
        title={en ? "Appointment Request" : "طلب موعد"}
      />
      <PageHero
        breadcrumbLabel={en ? "Booking" : "الحجز"}
        description={en ? "Share the essential details below. The Kadina team will contact you to follow up on your appointment request." : "شاركنا البيانات الأساسية أدناه، وسيتواصل معك فريق كادينا لمتابعة طلب الموعد."}
        eyebrow={en ? "Booking" : "الحجز"}
        title={en ? "Request an appointment" : "اطلب موعدك"}
        variant="utility"
      />

      <section className="ds-section bg-[var(--color-surface-muted)]">
        <div className="ds-container grid gap-8 lg:grid-cols-[minmax(0,.68fr)_minmax(0,1.32fr)] lg:gap-14">
          <div className="max-w-xl lg:pt-8">
            <p className="section-title-eyebrow">{en ? "Appointment request" : "طلب موعد"}</p>
            <h2 className="mt-4 text-[clamp(1.5rem,3vw,2.5rem)] font-black leading-[1.1] tracking-[-.035em] text-[var(--color-heading)]">
              {en ? "A clear first step" : "خطوتك الأولى بوضوح"}
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-text-muted)] sm:text-base">
              {en ? "This form sends an appointment request, not a confirmed booking. Please do not include medical details in the note." : "هذا النموذج يرسل طلب موعد وليس تأكيدًا نهائيًا للحجز. يرجى عدم كتابة تفاصيل طبية في الملاحظة."}
            </p>
            <a className="mt-7 inline-flex min-h-12 items-center border-b border-[var(--color-accent-strong)] font-black text-[var(--color-accent-strong)]" href={whatsappUrl} rel="noopener noreferrer" target="_blank">
              {en ? "Prefer WhatsApp?" : "تفضّل واتساب؟"}
            </a>
          </div>

          <BookingForm idPrefix="booking" sourceSection={SOURCE_SECTIONS.BOOKING_FORM} />
        </div>
      </section>
    </div>
  );
}
