import { ArrowRight, DollarSign, Mail, Package, Pencil } from "lucide-react";

const perks = [
  { icon: DollarSign, label: "20% off every order" },
  { icon: Mail, label: "Free shipping, always" },
  { icon: Package, label: "VIP member perks" },
  { icon: Pencil, label: "Modify, pause, or cancel anytime" },
];

export function SubscribeSave() {
  return (
    <section id="subscribe-save" className="border-y border-border bg-card/40">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:gap-14 lg:py-20">
        <div>
          <h2 className="font-display text-4xl uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Save <span className="text-primary">20%</span> with
            <br />
            performance on repeat
          </h2>

          <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4">
            {perks.map((perk) => (
              <li key={perk.label} className="flex flex-col items-center text-center">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-primary text-primary">
                  <perk.icon className="h-6 w-6" aria-hidden />
                </span>
                <p className="mt-3 text-xs font-semibold leading-snug text-muted-foreground">
                  {perk.label}
                </p>
              </li>
            ))}
          </ul>

          <a
            href="#best-sellers"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-9 py-4 text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-[1.03]"
          >
            Subscribe &amp; Save
            <ArrowRight className="h-4 w-4" aria-hidden />
          </a>
        </div>

        <div className="relative">
          <img
            src="/images/categories/bundle.jpg"
            alt="AstroFlav subscription box of performance supplements"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl border border-border object-cover"
          />
          <span className="absolute -left-3 top-6 -rotate-6 rounded-full bg-primary px-6 py-3 font-display text-2xl uppercase tracking-wide text-primary-foreground shadow-xl sm:-left-6 sm:text-3xl">
            Save 20%
          </span>
        </div>
      </div>
    </section>
  );
}
