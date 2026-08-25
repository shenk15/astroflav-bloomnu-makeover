import { Menu, Search, ShoppingBag, Truck, User } from "lucide-react";
import { Wordmark } from "./wordmark";
import { addToBag, useBagCount } from "@/lib/cart-store";


const navItems = [
  { label: "Best Sellers", href: "#best-sellers" },
  { label: "Subscribe & Save", href: "#subscribe-save" },
  { label: "Categories", href: "#categories" },
  { label: "Community", href: "#community" },
];

export function SiteHeader() {
  return (
    <>
      {/* Announcement bar */}
      <div className="border-b border-border bg-card px-4 py-2.5 text-center">
        <p className="flex items-center justify-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-muted-foreground sm:text-xs">
          <Truck className="h-3.5 w-3.5 shrink-0 text-primary" aria-hidden />
          Free U.S. priority shipping on orders over $99
        </p>
      </div>

      {/* Sticky nav */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open menu"
              className="rounded-full p-2 text-foreground transition-colors hover:bg-accent lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Wordmark />
          </div>

          <nav aria-label="Main navigation" className="hidden items-center gap-8 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              aria-label="Search"
              className="rounded-full p-2 text-foreground transition-colors hover:bg-accent"
            >
              <Search className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Account"
              className="hidden rounded-full p-2 text-foreground transition-colors hover:bg-accent sm:block"
            >
              <User className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Cart"
              className="relative rounded-full p-2 text-foreground transition-colors hover:bg-accent"
            >
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                0
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
