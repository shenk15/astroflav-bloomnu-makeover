import { ArrowRight } from "lucide-react";

const ingredients = [
  {
    name: "Tongkat Ali",
    detail: "Root extract · Drive + stamina",
    index: "01",
  },
  {
    name: "KSM-66 Ashwagandha",
    detail: "Full-spectrum root · Resilience",
    index: "02",
  },
  {
    name: "Fadogia Agrestis",
    detail: "Botanical extract · Vitality",
    index: "03",
  },
];

const proofPoints = ["USA Made", "Third-Party Tested", "No Fillers"];

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background">
      <img
        src="/images/hero-elevated.jpg"
        alt="AstroFlav Elevated advanced testosterone booster bottle floating above wet stone with botanical roots"
        loading="eager"
        className="pointer-events-none absolute inset-0 h-full w-full object-cover object-center opacity-90"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_25%,hsl(var(--background)/0.75)_75%)]"
        aria-hidden
      />
      <div
        className="absolute inset-y-0 left-0 w-full bg-gradient-to-r from-background via-background/40 to-transparent lg:w-1/2"
        aria-hidden
      />
      <div
        className="absolute inset-y-0 right-0 w-full bg-gradient-to-l from-background via-background/40 to-transparent lg:w-1/2"
        aria-hidden
      />
      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl gap-14 px-4 pb-20 pt-16 sm:px-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)_minmax(0,1fr)] lg:gap-8 lg:pb-28 lg:pt-24">
        {/* Left — headline */}
        <div className="lg:pt-10">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-primary" aria-hidden />
            <span className="text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
              Advanced botanical performance
            </span>
          </div>

          <h1 className="mt-6 font-display text-6xl uppercase leading-[0.82] tracking-tight text-foreground sm:text-7xl xl:text-8xl">
            Elev
            <br />
            <span className="text-muted-foreground">
              ated<span className="text-primary">.</span>
            </span>
          </h1>

          <p className="mt-7 font-display text-2xl uppercase leading-tight tracking-tight text-foreground sm:text-3xl">
            More energy.
            <br />
            More strength.
            <br />
            <span className="text-primary">More drive.</span>
          </p>

          <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A considered blend of time-tested botanicals, built to support the way you
            train, recover, and show up.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="#best-sellers"
              className="inline-flex items-center gap-3 rounded-none bg-foreground px-8 py-4 text-sm font-bold uppercase tracking-wider text-background transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Shop Elevated
              <ArrowRight className="h-4 w-4" />
            </a>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              30 Servings · 120 Capsules
            </span>
          </div>

          <ul className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            {proofPoints.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ul>
        </div>

        {/* Center — reserved space so the bottle stays clear */}
        <div className="hidden lg:block" aria-hidden />

        {/* Right — formula */}
        <div className="lg:pt-10">
          <span className="text-[11px] font-semibold uppercase tracking-[0.24em] text-muted-foreground">
            The formula, in focus
          </span>

          <h2 className="mt-3 font-display text-4xl uppercase leading-[0.9] tracking-tight text-foreground sm:text-5xl">
            Built
            <br />
            <span className="text-primary">Different.</span>
          </h2>

          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Three purposeful botanicals. One daily baseline for the work ahead.
          </p>

          <ul className="mt-8 space-y-px">
            {ingredients.map((item, i) => (
              <li
                key={item.name}
                className={`border-l-2 py-4 pl-4 pr-3 backdrop-blur-sm transition-colors ${
                  i === 0
                    ? "border-primary bg-card/70"
                    : "border-border bg-transparent hover:bg-card/40"
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="flex items-center gap-2.5 text-sm font-bold uppercase tracking-wide text-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden />
                    {item.name}
                  </span>
                  <span className="text-xs font-semibold text-muted-foreground">
                    {item.index}
                  </span>
                </div>
                <p className="mt-1.5 pl-[18px] text-xs uppercase tracking-wide text-muted-foreground">
                  {item.detail}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-8 border-t border-border pt-5 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            No proprietary fog.
            <br />
            <span className="font-bold text-foreground">Know what you&apos;re taking.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
