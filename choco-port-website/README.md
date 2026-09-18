# Choco Port — Website

A cinematic, premium website for Choco Port, a chocolate & dessert café in Baku, Azerbaijan. Built with plain HTML5, CSS3 and vanilla JavaScript (plus GSAP, ScrollTrigger and Lenis from CDN) — no build tools, no Node.js, no framework required.

## 1. Project structure

```
/
├── index.html
├── menu.html
├── about.html
├── gallery.html
├── reservation.html
├── contact.html
├── css/
│   ├── style.css        core design system, layout, components
│   ├── pages.css         menu / gallery / reservation / contact specific styles
│   └── responsive.css     breakpoints
├── js/
│   ├── main.js           image config, preloader, nav, cursor, smooth scroll
│   ├── animations.js      GSAP scroll reveals, hero sequence, horizontal scroll, parallax
│   └── menu.js            menu filter, gallery + lightbox, reservation form validation
├── assets/
│   ├── images/            put your own exported photos here
│   ├── icons/
│   └── logo/
└── README.md
```

## 2. Open it locally

No installation needed.

1. Download / copy the whole folder to your computer, keeping the structure above.
2. Double-click `index.html` (or open it from your browser with File → Open).
3. That's it — every page, animation, filter and form works offline except for the Google Fonts, GSAP/Lenis CDN scripts and the embedded Google Map, which need an internet connection.

## 3. Replace the images with real Choco Port photography

All image URLs live in **one place**: the `CHOCO_IMAGES` object at the top of `js/main.js`. Right now it points to placeholder stock photography (chocolate desserts, waffles, coffee, café interiors) chosen to match Choco Port's real look, since the official Instagram photos at https://www.instagram.com/chocoport/ could not be downloaded directly into this project.

To use the real photos:

1. Save the images you want from Instagram / your own camera roll into `assets/images/` (e.g. `assets/images/hero.jpg`).
2. Open `js/main.js` and find the `CHOCO_IMAGES` object near the top.
3. Replace each URL with your local path, e.g.:
   ```js
   hero: "assets/images/hero.jpg",
   ```
4. For the gallery grid, edit the `gallery` array inside the same object — each entry needs a `src` and a `cat` (`food`, `interior`, or `moments`).

No HTML file needs to change — every `<img data-img="...">` tag pulls its source from this one config object automatically.

## 4. Change menu items and prices

Open `menu.html`. Each dish is one `<article class="menu-item" data-category="...">` block. Edit the name, description and price directly, or duplicate a block for a new item. The `data-category` value must match one of the filter buttons above the grid (`desserts`, `waffles`, `pancakes`, `chocolate`, `coffee`, `drinks`).

## 5. Change colors

Open `css/style.css` and edit the CSS variables at the top of the file, inside `:root`:

```css
--chocolate: #4a2e23;
--dark-chocolate: #221109;
--cream: #f6ede0;
--off-white: #fbf7f2;
--pink-accent: #d99a8f;
--gold: #b98a4e;
--muted-text: #8a7768;
```

Every button, section background, headline and accent color across all six pages is built from these variables, so changing them here updates the whole site consistently.

## 6. Change contact information

- **Address, hours, Instagram:** edit `contact.html` (the `contact-list` block) and `reservation.html` (the `reservation-details` block).
- **Map:** the embedded map in `contact.html` uses a text-based Google Maps search embed for "Choco Port, Baku, Azerbaijan." To use the exact pinned location from Google Maps, open the real map link, click Share → Embed a map, and paste the provided `src` URL into the `<iframe>` in `contact.html`. The button beneath the map links directly to the official Google Maps listing.
- **Footer & mobile menu Instagram link:** search for `instagram.com/chocoport` across the HTML files if the handle ever changes.

## 7. Deploy to Netlify

1. Go to [netlify.com](https://www.netlify.com) and sign in (or create a free account).
2. From your dashboard, choose **Add new site → Deploy manually**.
3. Drag and drop the whole project folder (the one containing `index.html`) onto the upload area.
4. Netlify will publish it instantly and give you a live URL (e.g. `choco-port.netlify.app`).
5. To use a custom domain, go to **Site settings → Domain management** and follow Netlify's instructions to connect your own domain.

Netlify serves static files directly, so no build command or configuration is required — just deploy the folder as-is.

## 8. Notes on content accuracy

- No menu items, prices, awards, reviews, staff names or historical claims have been invented. Placeholder copy ("Ask your server", generic category descriptions) is used wherever real information wasn't available — replace it with confirmed details before launch.
- The reservation form is a front-end demo only: it validates input and shows a success message, but is **not connected to a real booking system, database, or notification service**. To make it functional, wire the `<form class="reservation-form">` in `reservation.html` up to your booking provider, a form service (e.g. Formspree, Netlify Forms), or your own backend.
- Structured data (JSON-LD) in `index.html` intentionally omits phone number, exact coordinates and price range since those weren't confirmed — add them once available.

## 9. Accessibility & performance

- Respects `prefers-reduced-motion`: animations are disabled/minimized automatically for users who request it.
- All interactive elements are keyboard-reachable with visible focus states.
- Images use `loading="lazy"` and `decoding="async"` (except the hero, which loads eagerly).
- The custom cursor and magnetic buttons are automatically disabled on touch devices.
