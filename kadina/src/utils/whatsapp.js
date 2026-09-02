import { businessContact } from "../data/business";

export const WHATSAPP_NUMBER = businessContact.whatsapp.number;

export function createWhatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
