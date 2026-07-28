import { createWhatsappUrl } from "../utils/whatsapp";

export const contactPhone = "0114555444";
export const contactEmail = "info@kadina.com.sa";
export const contactAddress = "الرياض — الطريق الدائري الشمالي";
export const contactHours = {
  days: "الاثنين – الجمعة",
  time: "9:00 ص – 10:00 م",
};
export const contactMapUrl =
  "https://www.google.com/maps/search/?api=1&query=%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6+%D8%A7%D9%84%D8%B7%D8%B1%D9%8A%D9%82+%D8%A7%D9%84%D8%AF%D8%A7%D8%A6%D8%B1%D9%8A+%D8%A7%D9%84%D8%B4%D9%85%D8%A7%D9%84%D9%8A";

// TODO: Confirm contact data before publishing. The PDF email differs from the
// current project data, and it mentions WhatsApp without a separate number.
// These values intentionally preserve the current ContactPage content.
export const contactItems = [
  {
    title: "الهاتف",
    value: contactPhone,
    href: `tel:${contactPhone}`,
    label: "اتصال مباشر",
  },
  {
    title: "واتساب",
    value: "محادثة فورية",
    href: createWhatsappUrl("للحجز والاستفسار"),
    label: "ابدأ المحادثة",
    external: true,
  },
  {
    title: "البريد",
    value: contactEmail,
    href: `mailto:${contactEmail}`,
    label: "أرسل بريدًا",
  },
];
