import { Phone } from "lucide-react";
import { useOutletContext } from "react-router-dom";
import BookingForm from "../booking/BookingForm";
import { getContactItems } from "../../data/contact";
import { SOURCE_SECTIONS } from "../../utils/analytics";

export default function HomeBookingSection() {
  const { lang } = useOutletContext();
  const phone = getContactItems(lang)[0];
  return (
    <>
      <section className="home-help ds-container" id="help" aria-labelledby="home-help-title">
        <div className="home-help-panel">
          <span className="home-help-icon" aria-hidden="true"><Phone size={28} /></span>
          <div><h2 id="home-help-title">{lang === "ar" ? "هل تحتاج مساعدة؟" : "Need a hand?"}</h2>
          <p>{lang === "ar" ? "فريق كادينا معك لاختيار التخصص والموعد المناسبين." : "The Kadina team can help you choose a specialty and a suitable appointment."}</p></div>
          <a dir="ltr" href={phone.href}>{phone.value}</a>
        </div>
      </section>
      <section className="home-booking home-section kadina-pattern" id="booking" aria-labelledby="home-booking-title">
        <div className="ds-container">
          <div className="home-heading">
            <p className="section-title-eyebrow">{lang === "ar" ? "طلب موعد" : "Appointment request"}</p>
            <h2 id="home-booking-title">{lang === "ar" ? "نموذج الحجز" : "Request an appointment"}</h2>
            <p>{lang === "ar" ? "شارك بياناتك وسيتواصل معك فريق كادينا لمتابعة طلب الموعد." : "Share your details and our team will follow up on your appointment request."}</p>
          </div>
          <BookingForm idPrefix="home-booking" sourceSection={SOURCE_SECTIONS.HOME_BOOKING} />
        </div>
      </section>
    </>
  );
}
