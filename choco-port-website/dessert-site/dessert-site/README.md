# Dessert Restaurant Website

React + Vite + Tailwind CSS + Framer Motion + Lucide + Spline. Languages: AZ (default), RU, EN.

```bash
npm install
npm run dev      # local development
npm run build    # production build in /dist
```

## Configure (one file)

Edit `src/config/siteConfig.js`. Anything still starting with `YOUR_` is hidden or replaced by a safe fallback:

| Key | What it does |
| --- | --- |
| `restaurantName`, `phone`, `address` | Header, footer, location, SEO |
| `whatsapp` | Digits only, e.g. `994500000000`. Enables WhatsApp reservation and ordering |
| `googleMapsUrl` | Google Maps **embed** URL (Share → Embed a map → iframe `src`) |
| `splineUrl` | Your `.splinecode` scene URL. Without it the built-in dessert illustration is shown |
| `reservationEndpoint` | Optional POST endpoint. Empty = WhatsApp flow (no fake "booked" message) |
| `siteUrl`, `ogImage`, `instagramUrl` | SEO / social |

Replace demo content: menu in `src/data/menuData.js`, photos in `src/data/galleryData.js`
(current images are stock placeholders, not photos of your restaurant), text in `src/data/translations.js`.
Sample prices, opening hours and the About counters are placeholders: replace them with real values.
