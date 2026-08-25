import { ArrowRight, Check } from "lucide-react";

const benefits = [
  {
    title: "Save up to 20% on every stack",
    copy: "The more you build, the more you save — automatically applied.",
  },
  {
    title: "Free priority shipping, always",
    copy: "Every bundle ships free with U.S. priority delivery.",
  },
  {
    title: "Modify or swap anytime",
    copy: "Change products, pause, or cancel — no lock-in, no hassle.",
  },
];

export function BundleSave() {
  return (
    <section id="bundle-save" className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Bundle Builder
          </span>
          <h2 className="mt-4 font-display text-4xl uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
            Performance <span className="text-primary">on repeat</span>
          </h2>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            Stack your favorites and keep the momentum going. Build a custom bundle
            around your goal and save on every order.
          </p>

          <ul className="mt-8 space-y-5">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="flex gap-4">
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-border bg-background">
                  <Check className="h-4 w-4 text-primary" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-foreground">
                    {benefit.title}
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{benefit.copy}</p>
                </div>
              </li>
            ))}
          </ul>

          <a
            href="#categories"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Start building
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="relative">
          <img
            src="/images/categories/bundle.jpg"
            alt="AstroFlav supplement bundle stacked together"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl border border-border object-cover"
          />
          <span className="absolute -left-3 top-6 -rotate-6 rounded-full bg-primary px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-primary-foreground shadow-xl sm:-left-6">
            Save 20%
          </span>
        </div>
      </div>
    </section>
  );
}
