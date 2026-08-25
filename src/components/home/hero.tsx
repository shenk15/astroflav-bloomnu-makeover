import { ArrowRight, FlaskConical, Leaf, ShieldCheck, Star } from "lucide-react";

const trustItems = [
  { icon: ShieldCheck, label: "Third-Party Tested" },
  { icon: FlaskConical, label: "No Fillers" },
  { icon: Leaf, label: "30-Day Guarantee" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Oversized outline word behind everything */}
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute -top-4 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[22vw] uppercase leading-none opacity-60"
      >
        Elevated
      </span>

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-14 sm:px-6 lg:grid-cols-2 lg:gap-6 lg:pb-24 lg:pt-20">
        {/* Copy */}
        <div className="relative z-10 text-center lg:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            New — Elevated T-Booster
          </span>

          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.95] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            More energy.
            <br />
            More <span className="text-primary">strength.</span>
            <br />
            More drive.
          </h1>

          <div className="mt-5 flex items-center justify-center gap-2 lg:justify-start">
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
              ))}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              4.8/5 from 3,000+ verified customers
            </span>
          </div>

          <p className="mx-auto mt-5 max-w-md text-base leading-relaxed text-muted-foreground lg:mx-0">
            Premium performance supplements built on clinically-dosed ingredients.
            USA made, third-party tested, zero fillers — ever.
          </p>

          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#best-sellers"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.03] sm:w-auto"
            >
              Shop best sellers
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#subscribe-save"
              className="inline-flex w-full items-center justify-center rounded-full border border-border bg-transparent px-8 py-4 text-sm font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-accent sm:w-auto"
            >
              Subscribe &amp; save 15%
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-start">
            {trustItems.map((item) => (
              <li
                key={item.label}
                className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground"
              >
                <item.icon className="h-4 w-4 text-primary" aria-hidden />
                {item.label}
              </li>
            ))}
          </ul>
        </div>

        {/* Product */}
        <div className="relative z-10 mx-auto w-full max-w-md lg:max-w-none">
          <div className="hero-glow absolute inset-0" aria-hidden />
          <img
            src="/images/products/elevated.png"
            alt="AstroFlav Elevated natural testosterone booster bottle"
            className="relative mx-auto w-full max-w-sm drop-shadow-[0_40px_60px_rgba(0,0,0,0.6)] lg:max-w-md"
            loading="eager"
          />
          <span className="absolute right-2 top-8 rotate-6 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg sm:right-10">
            30 servings
          </span>
          <span className="absolute bottom-10 left-2 -rotate-6 rounded-full border border-border bg-card px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground shadow-lg sm:left-6">
            +250 T-points
          </span>
        </div>
      </div>
    </section>
  );
}
