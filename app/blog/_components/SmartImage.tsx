import Image from "next/image";

type SmartImageProps = {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
};

function isSupabaseStorageUrl(src: string) {
  try {
    const url = new URL(src);
    return (
      url.hostname.includes("supabase") &&
      (url.pathname.includes("/storage/v1/") || url.pathname.includes("/storage/"))
    );
  } catch {
    return false;
  }
}

function isExternalUrl(src: string) {
  return /^https?:\/\//i.test(src) || src.startsWith("data:");
}

export function SmartImage({ src, alt, sizes, priority = false, className }: SmartImageProps) {
  if (!src) return null;

  const useNextImage = !isExternalUrl(src) || isSupabaseStorageUrl(src);

  if (useNextImage) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={`h-full w-full object-cover ${className ?? ""}`}
      loading="lazy"
      decoding="async"
      referrerPolicy="no-referrer"
    />
  );
}
