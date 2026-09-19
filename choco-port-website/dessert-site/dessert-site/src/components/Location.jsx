import { useState } from "react";
import { Clock, Instagram, MapPin, MessageCircle, Phone } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { siteConfig, isConfigured } from "../config/siteConfig";
import { hasWhatsapp, telUrl, whatsappUrl } from "../config/links";

function Row({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blush text-deep">
        <Icon aria-hidden="true" className="h-5 w-5" strokeWidth={1.5} />
      </span>
      <div>
        <h3 className="text-sm font-semibold">{label}</h3>
        <div className="mt-1 text-muted">{children}</div>
      </div>
    </div>
  );
}

export function formatHours(h) {
  return `${h.opens} – ${h.closes}`;
}

export default function Location() {
  const { lang, t } = useLanguage();
  const l = t.location;
  const [mapFailed, setMapFailed] = useState(false);
  const address = siteConfig.address[lang];
  const tel = telUrl();
  const wa = whatsappUrl(t.wa.reserve);
  const mapReady = isConfigured(siteConfig.googleMapsUrl) && !mapFailed;

  return (
    <section id="location" aria-labelledby="location-title" className="section-y">
      <div className="container-x grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <p className="eyebrow">{l.eyebrow}</p>
          <h2 id="location-title" className="display mt-3 text-[clamp(2.4rem,6vw,4.4rem)]">
            {l.title}
          </h2>

          <div className="mt-10 space-y-7">
            <Row icon={MapPin} label={l.address}>
              {isConfigured(address) ? address : l.pending}
            </Row>
            <Row icon={Phone} label={l.phone}>
              {tel ? (
                <a href={tel} className="underline decoration-line underline-offset-4 hover:text-ink">
                  {siteConfig.phone}
                </a>
              ) : (
                l.pending
              )}
            </Row>
            <Row icon={Clock} label={l.hours}>
              <ul className="space-y-1">
                {siteConfig.openingHours.map((h) => (
                  <li key={h.key}>
                    <span className="inline-block min-w-[6.5rem] text-ink">{l.hoursLabels[h.key]}</span>
                    {formatHours(h)}
                  </li>
                ))}
              </ul>
            </Row>
          </div>

          <div className="mt-10 flex flex-wrap gap-3">
            {hasWhatsapp() && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                <MessageCircle aria-hidden="true" className="h-4 w-4" />
                {l.whatsapp}
              </a>
            )}
            {isConfigured(siteConfig.instagramUrl) && (
              <a href={siteConfig.instagramUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <Instagram aria-hidden="true" className="h-4 w-4" />
                {l.instagram}
              </a>
            )}
            {isConfigured(siteConfig.googleMapsLink) && (
              <a href={siteConfig.googleMapsLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <MapPin aria-hidden="true" className="h-4 w-4" />
                {l.openMap}
              </a>
            )}
          </div>
        </div>

        <div className="relative min-h-[20rem] overflow-hidden rounded-[2rem] border border-line bg-blush lg:min-h-[30rem]">
          {mapReady ? (
            <iframe
              title={l.mapTitle}
              src={siteConfig.googleMapsUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              onError={() => setMapFailed(true)}
              className="absolute inset-0 h-full w-full border-0"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8 text-center text-muted">
              <MapPin aria-hidden="true" className="h-9 w-9 text-gold" strokeWidth={1.25} />
              <p>{mapFailed ? l.mapUnavailable : l.pending}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
