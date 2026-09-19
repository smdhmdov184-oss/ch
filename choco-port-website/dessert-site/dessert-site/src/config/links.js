import { siteConfig, isConfigured } from "./siteConfig";

const digits = (v) => String(v || "").replace(/\D/g, "");

export const hasWhatsapp = () => isConfigured(siteConfig.whatsapp) && digits(siteConfig.whatsapp).length >= 7;
export const hasPhone = () => isConfigured(siteConfig.phone);

export const whatsappUrl = (text = "") =>
  hasWhatsapp() ? `https://wa.me/${digits(siteConfig.whatsapp)}?text=${encodeURIComponent(text)}` : null;

export const telUrl = () => (hasPhone() ? `tel:${siteConfig.phone.replace(/[^\d+]/g, "")}` : null);

/** WhatsApp if configured, otherwise a phone link, otherwise null. */
export const contactUrl = (text) => whatsappUrl(text) || telUrl();

export function reservationMessage(t, v) {
  const l = t.wa.labels;
  return [
    t.wa.reserve,
    "",
    `${l.name}: ${v.name}`,
    `${l.phone}: ${v.phone}`,
    `${l.date}: ${v.date}`,
    `${l.time}: ${v.time}`,
    `${l.guests}: ${v.guests}`,
    v.message ? `${l.message}: ${v.message}` : null,
  ]
    .filter((x) => x !== null)
    .join("\n");
}

export const orderMessage = (t, itemName) => t.wa.order.replace("{item}", itemName);
