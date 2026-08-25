import { ArrowRight, Star } from "lucide-react";

const goals = [
  { label: "Testosterone Support", copy: "Strength • Energy • Vitality" },
  { label: "Muscle & Strength", copy: "Build Lean Muscle" },
  { label: "Energy & Performance", copy: "Focus • Pumps • Endurance" },
  { label: "Fat Loss & Metabolism", copy: "Burn Fat Naturally" },
  { label: "Sleep & Recovery", copy: "Recover While You Sleep" },
  { label: "Health & Wellness", copy: "Everyday Health Support" },
];

export function QuizCta() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:py-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-xs font-semibold text-muted-foreground">
          <Star className="h-3.5 w-3.5 fill-primary text-primary" aria-hidden />
          Trusted by 10,000+ customers
        </span>

        <h2 className="mt-6 font-display text-4xl uppercase leading-[0.95] tracking-tight text-foreground sm:text-5xl">
          Not sure where <span className="text-primary">to start?</span>
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-base leading-relaxed text-muted-foreground">
          Answer one question and we'll recommend the right supplement in seconds.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {goals.map((goal) => (
            <button
              key={goal.label}
              type="button"
              className="group rounded-2xl border border-border bg-background px-6 py-5 text-left transition-colors hover:border-primary"
            >
              <span className="block text-sm font-bold uppercase tracking-wide text-foreground group-hover:text-primary">
                {goal.label}
              </span>
              <span className="mt-1 block text-xs font-medium text-muted-foreground">
                {goal.copy}
              </span>
            </button>
          ))}
        </div>

        <a
          href="#best-sellers"
          className="mt-10 inline-flex items-center gap-2 text-sm font-bold uppercase tracking-[0.15em] text-foreground underline decoration-primary decoration-2 underline-offset-8 transition-colors hover:text-primary"
        >
          Browse customer favorites
          <ArrowRight className="h-4 w-4" aria-hidden />
        </a>
      </div>
    </section>
  );
}
