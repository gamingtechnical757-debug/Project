import { useState } from "react";
import { ImageOff } from "lucide-react";

interface ResilientImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackLabel?: string;
  loading?: "eager" | "lazy";
}

export function ResilientImage({
  src,
  alt,
  className = "",
  fallbackLabel,
  loading = "lazy",
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#161B24] via-[#10131A] to-[#0A0C10] text-[#94A3B8] border border-[#232834] ${className}`}
      >
        <ImageOff className="w-8 h-8 text-[#F59E0B]/70 mb-2" />
        <span className="text-xs font-medium tracking-wide text-[#CBD5E1] px-3 text-center">
          {fallbackLabel || alt}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
