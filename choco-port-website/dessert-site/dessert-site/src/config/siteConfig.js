/**
 * Central configuration. Replace every value starting with "YOUR_" (or "Restaurant Name").
 * Anything left as a placeholder is hidden or replaced by a graceful fallback in the UI.
 */
export const siteConfig = {
  restaurantName: "Restaurant Name",
  phone: "YOUR_PHONE", // e.g. "+994 50 000 00 00"
  whatsapp: "YOUR_NUMBER", // international format, digits only, e.g. "994500000000"
  address: {
    az: "YOUR_ADDRESS",
    ru: "YOUR_ADDRESS",
    en: "YOUR_ADDRESS",
  },
  // Google Maps EMBED url: Google Maps → Share → Embed a map → copy the iframe src
  googleMapsUrl: "YOUR_GOOGLE_MAPS_URL",
  // Plain link to the place on Google Maps (for the "Open in Google Maps" button)
  googleMapsLink: "YOUR_GOOGLE_MAPS_LINK",
  instagramUrl: "YOUR_INSTAGRAM_URL",
  splineUrl: "YOUR_SPLINE_URL", // e.g. "https://prod.spline.design/xxxx/scene.splinecode"
  siteUrl: "YOUR_SITE_URL", // e.g. "https://your-domain.com"
  ogImage: "YOUR_OG_IMAGE_URL",
  /**
   * Optional: endpoint that accepts POST JSON {name, phone, date, time, guests, message}.
   * Leave empty to use the WhatsApp reservation flow (no fake "booked" confirmation is ever shown).
   */
  reservationEndpoint: "",
  currency: "₼",
  // Sample values: replace with the real ones
  openingHours: [
    { key: "weekdays", days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "10:00", closes: "23:00" },
    { key: "weekend", days: ["Saturday", "Sunday"], opens: "10:00", closes: "00:00" },
  ],
  // Sample values for the About counters: replace with real numbers
  stats: [
    { key: "years", value: 10, suffix: "+" },
    { key: "guests", value: 50, suffix: "K+" },
    { key: "desserts", value: 30, suffix: "+" },
    { key: "fresh", value: 100, suffix: "%" },
  ],
};

export const isConfigured = (v) =>
  typeof v === "string" && v.trim() !== "" && !v.trim().startsWith("YOUR_");
