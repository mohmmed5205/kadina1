export const WHATSAPP_NUMBER = "966114555444";

export function createWhatsappUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
