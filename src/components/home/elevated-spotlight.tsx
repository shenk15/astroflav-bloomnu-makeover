import { ArrowRight, Plus, Star } from "lucide-react";

const points = [
  "Increase testosterone by 250+ points",
  "Improve energy, drive and focus",
  "Boost your libido",
];

export function ElevatedSpotlight() {
  return (
    <section id="story" className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:pb-24">
      <div className="relative overflow-hidden rounded-3xl border border-border">
        <img
          src="/images/categories/elevated-banner.png"
          alt="AstroFlav Elevated natural testosterone booster"
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/20"
          aria-hidden
        />

        <div className="relative max-w-xl p-8 sm:p-12 lg:p-16">
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Featured — Elevated
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            The natural way to raise testosterone
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            Tongkat Ali, KSM-66® Ashwagandha and Fadogia Agrestis — clinically-backed
            ingredients, proven to:
          </p>

          <ul className="mt-6 space-y-3">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-3 text-sm font-semibold text-foreground">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary">
                  <Plus className="h-3.5 w-3.5 text-primary-foreground" aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#best-sellers"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              Shop Elevated
              <ArrowRight className="h-4 w-4" aria-hidden />
            </a>
            <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Star className="h-4 w-4 fill-foreground text-foreground" aria-hidden />
              4.8/5.0 average rating
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
