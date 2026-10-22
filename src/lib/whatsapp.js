import { blessings } from '../data/weddingData.js';

/** Builds the formatted blessing text exactly as it appears in WhatsApp. */
export function formatBlessing(name, message) {
  return `${blessings.messageTitle}\n\nFrom: ${name.trim()}\n\n${message.trim()}`;
}

/** Link that opens a chat with the family number, with the blessing pre-filled. */
export function blessingWhatsAppUrl(name, message) {
  return `https://wa.me/${blessings.whatsappNumber}?text=${encodeURIComponent(formatBlessing(name, message))}`;
}

/** Link that lets the visitor forward the invitation to any of their own contacts. */
export function shareWhatsAppUrl(text, url) {
  return `https://wa.me/?text=${encodeURIComponent(url ? `${text}\n\n${url}` : text)}`;
}
