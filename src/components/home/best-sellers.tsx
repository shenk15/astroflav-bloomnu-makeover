import { useRef } from "react";
import { ChevronLeft, ChevronRight, Plus, Star, Truck } from "lucide-react";
import { bestSellers, type Product } from "@/lib/products";

function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex w-[240px] shrink-0 snap-start flex-col rounded-3xl border border-border bg-card p-4 transition-colors duration-300 hover:border-primary/60 sm:w-[280px] lg:w-[calc((100%-4.5rem)/4)]">
      <div className="card-sheen relative aspect-square overflow-hidden rounded-2xl">
        {product.badge && (
          <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
            {product.badge}
          </span>
        )}
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <div className="flex items-center gap-1" aria-label="5 star rating">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-3 w-3 fill-foreground text-foreground" aria-hidden />
          ))}
        </div>
        <h3 className="mt-2 text-sm font-bold leading-snug text-foreground">{product.name}</h3>
        <p className="mt-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          {product.detail}
        </p>
        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-base font-extrabold text-foreground">{product.price}</span>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-bold uppercase tracking-wider text-background transition-transform hover:scale-105"
          >
            <Plus className="h-3.5 w-3.5" aria-hidden />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

export function BestSellers() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollBy = (direction: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const amount = track.clientWidth / (window.innerWidth >= 1024 ? 4 : 1.2);
    track.scrollBy({ left: direction * amount, behavior: "smooth" });
  };

  return (
    <section id="best-sellers" className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:py-14">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-4 sm:flex sm:justify-between">
        <div className="min-w-0">
          <h2 className="font-display text-4xl uppercase leading-none tracking-tight text-foreground sm:text-5xl">
            Shop our <span className="text-primary">best sellers</span>
          </h2>
          <p className="mt-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Truck className="h-4 w-4 shrink-0 text-primary" aria-hidden />
            Free shipping on US orders over $99
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Previous products"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/60"
          >
            <ChevronLeft className="h-5 w-5" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Next products"
            className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-primary/60"
          >
            <ChevronRight className="h-5 w-5" aria-hidden />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:gap-6"
      >
        {bestSellers.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </section>
  );
}
