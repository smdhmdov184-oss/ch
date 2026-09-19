import { useEffect } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { siteConfig, isConfigured } from "../config/siteConfig";

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/** Keeps <title>, meta tags and JSON-LD in sync with the selected language. Renders nothing. */
export default function SeoHead() {
  const { lang, t } = useLanguage();

  useEffect(() => {
    const title = `${siteConfig.restaurantName} — ${t.meta.title}`;
    document.title = title;
    setMeta("name", "description", t.meta.description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", t.meta.description);
    if (isConfigured(siteConfig.ogImage)) setMeta("property", "og:image", siteConfig.ogImage);
    if (isConfigured(siteConfig.siteUrl)) setMeta("property", "og:url", siteConfig.siteUrl);

    const data = {
      "@context": "https://schema.org",
      "@type": "Restaurant",
      name: siteConfig.restaurantName,
      description: t.meta.description,
      servesCuisine: "Desserts",
    };
    if (isConfigured(siteConfig.siteUrl)) data.url = siteConfig.siteUrl;
    if (isConfigured(siteConfig.ogImage)) data.image = siteConfig.ogImage;
    if (isConfigured(siteConfig.phone)) data.telephone = siteConfig.phone;
    if (isConfigured(siteConfig.address[lang])) {
      data.address = { "@type": "PostalAddress", streetAddress: siteConfig.address[lang] };
    }
    if (isConfigured(siteConfig.instagramUrl)) data.sameAs = [siteConfig.instagramUrl];
    if (siteConfig.openingHours?.length) {
      data.openingHoursSpecification = siteConfig.openingHours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      }));
    }

    let script = document.getElementById("ld-json");
    if (!script) {
      script = document.createElement("script");
      script.id = "ld-json";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(data);
  }, [lang, t]);

  return null;
}
