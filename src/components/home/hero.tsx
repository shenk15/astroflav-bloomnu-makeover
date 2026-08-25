import { ArrowRight, FlaskConical, Leaf, ShieldCheck, Star, Zap } from "lucide-react";

const hooks = [
  "Raise testosterone 250+ points",
  "More energy, drive & focus",
  "Build lean muscle & strength",
  "Clinically-dosed, no fillers",
];

const trustItems = [
  { icon: ShieldCheck, label: "Third-Party Tested" },
  { icon: FlaskConical, label: "Clinically Dosed" },
  { icon: Leaf, label: "30-Day Guarantee" },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Cinematic product backdrop */}
      <img
        src="/images/hero-elevated.jpg"
        alt="AstroFlav Elevated testosterone booster bottle lit in red studio light"
        loading="eager"
        className="absolute inset-0 h-full w-full object-cover object-center lg:object-right"
      />
      <div
        className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/20"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-16 sm:px-6 lg:pb-28 lg:pt-28">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/80 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-foreground backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            New — Elevated T-Booster
          </span>

          <h1 className="mt-6 font-display text-5xl uppercase leading-[0.92] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
            More energy.
            <br />
            More <span className="text-primary">strength.</span>
            <br />
            More drive.
          </h1>

          <div className="mt-5 flex items-center gap-2">
            <span className="flex" aria-hidden>
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-foreground text-foreground" />
              ))}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              4.8/5 from 3,000+ verified customers
            </span>
          </div>

          <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
            {hooks.map((hook) => (
              <li
                key={hook}
                className="flex items-center gap-2.5 rounded-full border border-border bg-card/70 px-4 py-2.5 text-xs font-semibold uppercase tracking-wide text-foreground backdrop-blur"
              >
                <Zap className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
                {hook}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href="#best-sellers"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.03] sm:w-auto"
            >
              Shop Elevated
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#subscribe-save"
              className="inline-flex w-full items-center justify-center rounded-full border border-border bg-background/60 px-8 py-4 text-sm font-bold uppercase tracking-wider text-foreground backdrop-blur transition-colors hover:bg-accent sm:w-auto"
            >
              Subscribe &amp; save 20%
            </a>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
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
      </div>
    </section>
  );
}
