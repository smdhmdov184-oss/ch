import { useCallback, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { useLanguage } from "../hooks/useLanguage";
import { galleryImages } from "../data/galleryData";
import ImageWithFallback from "./ImageWithFallback";
import Lightbox from "./Lightbox";

export default function Gallery() {
  const { lang, t } = useLanguage();
  const [openIndex, setOpenIndex] = useState(null);
  const opener = useRef(null);

  const open = (i) => {
    opener.current = document.activeElement;
    setOpenIndex(i);
  };
  const close = useCallback(() => {
    setOpenIndex(null);
    opener.current?.focus?.();
  }, []);

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="section-y">
      <div className="container-x">
        <div className="max-w-xl">
          <p className="eyebrow">{t.gallery.eyebrow}</p>
          <h2 id="gallery-title" className="display mt-3 text-[clamp(2.4rem,6vw,4.4rem)]">
            {t.gallery.title}
          </h2>
        </div>

        <ul className="mt-12 grid auto-rows-[9.5rem] grid-flow-dense grid-cols-2 gap-3 sm:auto-rows-[13rem] sm:gap-4 md:grid-cols-4">
          {galleryImages.map((img, i) => (
            <li key={img.id} className={img.span}>
              <button type="button" data-cursor="VIEW" onClick={() => open(i)} aria-label={`${t.gallery.open}: ${img.alt[lang]}`} className="group relative block h-full w-full overflow-hidden rounded-3xl bg-blush">
                <ImageWithFallback src={img.src} alt={img.alt[lang]} width={800} height={800} className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.08]" />
                <span aria-hidden="true" className="absolute inset-0 flex items-end justify-end bg-gradient-to-t from-ink/35 via-transparent to-transparent p-4 opacity-100 transition-opacity duration-500 [@media(hover:hover)]:opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <Maximize2 className="h-5 w-5 text-white" />
                </span>
              </button>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>{openIndex !== null && <Lightbox images={galleryImages} index={openIndex} onClose={close} onChange={setOpenIndex} />}</AnimatePresence>
    </section>
  );
}
