import { MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { contactUrl, hasWhatsapp, orderMessage } from "../config/links";
import { scrollToSection } from "../hooks/useScrollAnimation";

/** Opens a pre-filled WhatsApp order (or a phone call). Falls back to the Location section if neither is configured. */
export default function OrderButton({ itemName, className = "btn btn-primary" }) {
  const { t } = useLanguage();
  const href = contactUrl(orderMessage(t, itemName));
  const Icon = hasWhatsapp() ? MessageCircle : Phone;

  if (!href) {
    return (
      <button type="button" onClick={() => scrollToSection("location")} className={className}>
        {t.cta.order}
      </button>
    );
  }
  const external = href.startsWith("http");
  return (
    <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} className={className} aria-label={`${t.cta.order}: ${itemName}`}>
      <Icon aria-hidden="true" className="h-4 w-4" />
      {t.cta.order}
    </a>
  );
}
