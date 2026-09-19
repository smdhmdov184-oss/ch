import { Instagram, MessageCircle } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { scrollToSection } from "../hooks/useScrollAnimation";
import { siteConfig, isConfigured } from "../config/siteConfig";
import { telUrl, whatsappUrl, hasWhatsapp } from "../config/links";
import { Logo, DESKTOP_NAV } from "./Header";
import { formatHours } from "./Location";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Footer() {
  const { lang, t } = useLanguage();
  const f = t.footer;
  const tel = telUrl();
  const heading = "text-sm font-semibold text-ink";

  return (
    <footer className="border-t border-line bg-blush/40">
      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.2fr]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">{f.description}</p>
          <div className="mt-6 flex gap-3">
            {isConfigured(siteConfig.instagramUrl) && (
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={t.location.instagram} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-rose">
                <Instagram aria-hidden="true" className="h-5 w-5" />
              </a>
            )}
            {hasWhatsapp() && (
              <a href={whatsappUrl(t.wa.reserve)} target="_blank" rel="noopener noreferrer" aria-label={t.location.whatsapp} className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-ink transition-colors hover:border-rose">
                <MessageCircle aria-hidden="true" className="h-5 w-5" />
              </a>
            )}
          </div>
        </div>

        <nav aria-label={f.navigate}>
          <h2 className={heading}>{f.navigate}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {DESKTOP_NAV.map((id) => (
              <li key={id}>
                <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToSection(id); }} className="hover:text-ink">
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className={heading}>{f.hours}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            {siteConfig.openingHours.map((h) => (
              <li key={h.key}>
                <span className="inline-block min-w-[6.5rem] text-ink">{t.location.hoursLabels[h.key]}</span>
                {formatHours(h)}
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className={heading}>{f.contact}</h2>
          <ul className="mt-4 space-y-2 text-sm text-muted">
            <li>{tel ? <a href={tel} className="hover:text-ink">{siteConfig.phone}</a> : t.location.pending}</li>
            {isConfigured(siteConfig.address[lang]) && <li>{siteConfig.address[lang]}</li>}
          </ul>
          <h2 className={`${heading} mt-8`}>{f.language}</h2>
          <LanguageSwitcher className="-ml-2 mt-2" />
        </div>
      </div>

      <div className="border-t border-line">
        <p className="container-x py-6 text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.restaurantName}. {f.rights}
        </p>
      </div>
    </footer>
  );
}
