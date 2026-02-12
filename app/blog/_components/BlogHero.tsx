import { SmartImage } from "./SmartImage";

type BlogHeroProps = {
  title: string;
  imageUrl: string;
  category?: string | null;
  publishedAt?: string | null;
};

export function BlogHero({ title, imageUrl, category, publishedAt }: BlogHeroProps) {
  return (
    <div className="w-full">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-[16/7] overflow-hidden rounded-3xl border border-white/20 bg-white/60 shadow-[0_24px_60px_-45px_rgba(15,23,42,0.35)] backdrop-blur">
          <SmartImage
            src={imageUrl}
            alt={title}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 92vw, 1100px"
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/15 to-transparent" />
          <div className="absolute inset-0 flex items-end">
            <div className="p-6 sm:p-8 lg:p-10">
              {category ? (
                <span className="inline-flex items-center rounded-full border border-white/30 bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur">
                  {category}
                </span>
              ) : null}
              <h1 className="mt-4 text-2xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
                {title}
              </h1>
              {publishedAt ? (
                <p className="mt-3 text-xs uppercase tracking-[0.25em] text-white/80">
                  {publishedAt}
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
