import { ArrowUpRight } from "lucide-react";

const categories = [
  {
    label: "Supplements",
    copy: "Singles for every goal",
    image: "/images/categories/supplements.jpg",
  },
  {
    label: "Stacks",
    copy: "Goal-matched combos",
    image: "/images/categories/stacks.jpg",
  },
  {
    label: "Bundle & Save",
    copy: "Build yours, save 20%",
    image: "/images/categories/bundle.jpg",
  },
  {
    label: "Pre / Intra Workout",
    copy: "Fuel every session",
    image: "/images/categories/pre-intra.png",
  },
];

export function CategoryTiles() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
      <div className="text-center">
        <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
          Find your lane
        </span>
        <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight text-foreground sm:text-5xl">
          Premium performance supplements
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
        {categories.map((category) => (
          <a
            key={category.label}
            href="#best-sellers"
            className="group relative block aspect-[4/5] overflow-hidden rounded-3xl border border-border"
          >
            <img
              src={category.image}
              alt={category.label}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent"
              aria-hidden
            />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 p-5">
              <div>
                <h3 className="font-display text-xl uppercase leading-tight tracking-wide text-foreground sm:text-2xl">
                  {category.label}
                </h3>
                <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {category.copy}
                </p>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform group-hover:scale-110">
                <ArrowUpRight className="h-5 w-5" aria-hidden />
              </span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
