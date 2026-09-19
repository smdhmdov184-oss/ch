import { useLanguage } from "../hooks/useLanguage";
import { siteConfig } from "../config/siteConfig";
import ImageWithFallback from "./ImageWithFallback";
import OrderButton from "./OrderButton";

export default function MenuCard({ item }) {
  const { lang, t } = useLanguage();
  const tr = item.translations[lang];

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-line bg-white transition-all duration-500 hover:-translate-y-1.5 hover:border-rose/60 hover:shadow-[0_28px_50px_-30px_rgba(232,121,169,0.55)] focus-within:border-rose/60">
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-petal/0 blur-2xl transition-colors duration-500 group-hover:bg-petal/40" />
      <div className="relative aspect-[4/3] overflow-hidden bg-blush">
        <ImageWithFallback
          src={item.image}
          alt={tr.name}
          width={900}
          height={675}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.07]"
        />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-deep backdrop-blur">{t.menu.categories[item.category]}</span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-display text-[1.7rem] font-medium leading-[1.1]">{tr.name}</h3>
          <p className="shrink-0 pt-1 text-lg font-semibold text-deep">
            {item.price} {siteConfig.currency}
          </p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">{tr.description}</p>
        <p className="mt-4 text-xs leading-relaxed text-muted">
          <span className="font-semibold text-ink">{t.menu.ingredients}: </span>
          {tr.ingredients.join(", ")}
        </p>
        <div className="cta-reveal mt-auto pt-6 transition-all duration-500">
          <OrderButton itemName={tr.name} className="btn btn-primary w-full" />
        </div>
      </div>
    </article>
  );
}
