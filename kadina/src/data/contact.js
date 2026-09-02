import { createWhatsappUrl } from "../utils/whatsapp";
import {
  businessAddress,
  businessContact,
  businessHours,
  businessMaps,
} from "./business";

export const contactPhone = businessContact.phone.local;
export const contactEmail = businessContact.email.value;
export const contactAddress = businessAddress.activeDisplayCandidate.ar;
export const contactHours = businessHours.activeDisplayCandidate.ar;
export const contactMapUrl = businessMaps.activeDisplayCandidate;

export function getContactAddress(lang = "ar") {
  return businessAddress.activeDisplayCandidate[lang] || contactAddress;
}

export function getContactHours(lang = "ar") {
  return businessHours.activeDisplayCandidate[lang] || contactHours;
}

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

export function getContactItems(lang = "ar") {
  if (lang !== "en") return contactItems;

  return contactItems.map((item, index) => ({
    ...item,
    title: ["Phone", "WhatsApp", "Email"][index],
    value: index === 1 ? "Instant chat" : item.value,
    label: ["Call Now", "Start Chat", "Send Email"][index],
    href:
      index === 1
        ? createWhatsappUrl(
            "Hello, I would like to book or ask about Kadina services.",
          )
        : item.href,
  }));
}
