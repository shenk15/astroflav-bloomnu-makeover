import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { addToBag } from "@/lib/cart-store";

const ingredients = [
  { name: "Tongkat Ali", detail: "Root extract · drive + stamina", index: "01" },
  { name: "KSM-66 Ashwagandha", detail: "Full-spectrum root · resilience", index: "02" },
  { name: "Fadogia Agrestis", detail: "Standardized extract · vitality", index: "03" },
];

const proofPoints = ["USA Made", "Third-Party Tested", "No Fillers"];

export function Hero() {
  const [activeIngredient, setActiveIngredient] = useState<string | null>(null);

  return (
    <section className="ingredient-hero isolate flex items-center">
      <div className="ingredient-hero-content mx-auto w-full max-w-7xl px-4 pb-12 pt-6 sm:px-6 sm:pb-14 sm:pt-8 lg:pb-16 lg:pt-10">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.95fr)_minmax(0,1fr)] lg:gap-8">
          {/* Left: headline */}
          <div className="order-1 text-center lg:text-left">
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-primary">
              Natural Testosterone Support
            </p>
            <h1 className="mt-4 whitespace-nowrap font-display text-6xl leading-[0.86] tracking-tight text-foreground sm:text-7xl lg:text-8xl">
              Elevated
              <span className="text-primary">.</span>
            </h1>
            <p className="mt-5 font-display text-2xl leading-tight text-foreground sm:text-3xl">
              More energy.
              <br />
              More strength.
              <br />
              More drive.
            </p>

            <div className="mt-7 flex flex-col items-center gap-4 lg:items-start">
              <button
                type="button"
                onClick={() => addToBag()}
                className="inline-flex items-center gap-2 rounded-full bg-foreground px-8 py-4 text-xs font-bold uppercase tracking-[0.18em] text-background transition-transform hover:scale-[1.03] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
              >
                Shop Elevated
                <ArrowRight className="h-4 w-4" aria-hidden />
              </button>
              <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground/70">
                30 Servings · 120 Capsules
              </p>
            </div>

            <ul className="mt-7 flex flex-wrap items-center justify-center gap-2 lg:justify-start">
              {proofPoints.map((point) => (
                <li
                  key={point}
                  className="rounded-full border border-border px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground/80"
                >
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Center: product */}
          <div className="relative order-2 flex items-center justify-center py-6 lg:py-0">
            <div
              className="pointer-events-none absolute inset-0 flex items-center justify-center"
              aria-hidden
            >
              <div className="animate-ring-pulse aspect-square w-[86%] max-w-[420px] rounded-full border border-primary/25" />
              <div className="animate-ring-pulse absolute aspect-square w-[64%] max-w-[320px] rounded-full border border-primary/20 [animation-delay:1.5s]" />
              <div className="hero-glow absolute inset-0" />
            </div>
            <img
              src="/images/products/elevated-bottle.png"
              alt="AstroFlav Elevated advanced testosterone booster, 120 capsules"
              loading="eager"
              className="animate-hero-float relative w-[62%] max-w-[300px] drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)] sm:w-[48%] lg:w-full lg:max-w-[360px]"
            />
          </div>

          {/* Right: ingredients */}
          <div className="order-3 text-center lg:text-left">
            <h2 className="font-display text-4xl leading-[0.9] tracking-tight text-foreground sm:text-5xl">
              Built
              <br />
              Different<span className="text-primary">.</span>
            </h2>

            <ul className="mt-6 space-y-3">
              {ingredients.map((item) => {
                const isActive = activeIngredient === item.name;
                return (
                  <li key={item.name}>
                    <button
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setActiveIngredient(isActive ? null : item.name)}
                      className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3.5 text-left transition-colors ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : "border-border bg-card/40 hover:border-primary/50"
                      }`}
                    >
                      <span
                        className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                          isActive ? "bg-primary" : "bg-primary/40"
                        }`}
                        aria-hidden
                      />
                      <span className="min-w-0">
                        <span className="block text-xs font-bold uppercase tracking-[0.16em] text-foreground">
                          {item.name}
                        </span>
                        <span className="mt-1 block text-[11px] text-muted-foreground/70">
                          {item.detail}
                        </span>
                      </span>
                      <span className="ml-auto shrink-0 text-[10px] font-bold tracking-[0.2em] text-muted-foreground/50">
                        {item.index}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
