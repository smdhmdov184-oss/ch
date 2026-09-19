import { useState } from "react";
import { Cherry } from "lucide-react";

/** <img> that never shows a broken-image icon: falls back to a soft pink tile. */
export default function ImageWithFallback({ src, alt, className = "", width, height, eager = false }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-blush via-white to-blush text-gold ${className}`}
      >
        <Cherry aria-hidden="true" className="h-10 w-10 opacity-70" strokeWidth={1.25} />
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
