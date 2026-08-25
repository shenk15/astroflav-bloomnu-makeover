import { RefreshCw, Star } from "lucide-react";
import { subscribeSave, type Product } from "@/lib/products";

function SubscribeCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col rounded-3xl border border-border bg-card p-4 transition-colors duration-300 hover:border-primary/60">
      <div className="card-sheen relative aspect-square overflow-hidden rounded-2xl">
        <span className="absolute left-3 top-3 z-10 rounded-full bg-primary px-4 py-2 text-sm font-extrabold uppercase leading-none tracking-wider text-primary-foreground shadow-lg shadow-primary/30 ring-2 ring-primary-foreground/20 sm:text-base">
          Save 15%
        </span>

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
          <div className="flex items-baseline gap-2">
            <span className="text-base font-extrabold text-foreground">{product.subscribePrice}</span>
            <span className="text-xs font-medium text-muted-foreground line-through">
              {product.price}
            </span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:scale-105"
          >
            <RefreshCw className="h-3.5 w-3.5" aria-hidden />
            Subscribe
          </button>
        </div>
      </div>
    </article>
  );
}

export function SubscribeSave() {
  return (
    <section id="subscribe-save" className="border-y border-border bg-card/40">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
              Subscribe &amp; Save
            </span>
            <h2 className="mt-4 font-display text-4xl uppercase leading-none tracking-tight text-foreground sm:text-5xl">
              Never run <span className="text-primary">empty</span>
            </h2>
            <p className="mt-3 max-w-md text-sm font-medium text-muted-foreground">
              15% off every order, free shipping, and swap or cancel anytime — no lock-in.
            </p>
          </div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Delivered every 30 days
          </span>
        </div>

        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {subscribeSave.map((product) => (
            <SubscribeCard key={product.name} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
