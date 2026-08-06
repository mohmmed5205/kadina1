import { createWhatsappUrl } from "../utils/whatsapp";

export const contactPhone = "0114555444";
export const contactEmail = "info@kadina.com.sa";
export const contactAddress = "الرياض   —  الحي المروج  -  مخرج 5   ";
export const contactHours = {
  days: "السبت – الخميس",
  time: "9:00 ص – 10:00 م",
};
export const contactMapUrl =
  "https://maps.app.goo.gl/cLeVtBdTjNd71GrPA?g_st=ic";

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
