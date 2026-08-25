import { ArrowRight, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Wordmark } from "./wordmark";

const columns = [
  {
    title: "Shop",
    links: ["Supplements", "Stacks", "Bundle Builder", "Best Sellers", "Gift Cards"],
  },
  {
    title: "Company",
    links: ["About Us", "Articles", "Our Guarantee", "Wholesale", "Ambassadors"],
  },
  {
    title: "Support",
    links: ["FAQ", "Shipping", "Returns", "Contact Us", "Privacy Policy"],
  },
];

const socials = [
  { icon: Instagram, label: "Instagram" },
  { icon: Facebook, label: "Facebook" },
  { icon: Twitter, label: "Twitter" },
  { icon: Youtube, label: "YouTube" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_2fr]">
          {/* Brand + newsletter */}
          <div>
            <Wordmark className="text-3xl" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium performance supplements. USA made, third-party tested, and
              never any fillers or added sugar.
            </p>

            <form
              className="mt-6 flex max-w-sm items-center gap-2"
              onSubmit={(e) => e.preventDefault()}
            >
              <label htmlFor="newsletter-email" className="sr-only">
                Email address
              </label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="Email for exclusive drops"
                className="h-12 w-full rounded-full border border-input bg-card px-5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                aria-label="Subscribe"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform hover:scale-105"
              >
                <ArrowRight className="h-5 w-5" aria-hidden />
              </button>
            </form>

            <div className="mt-6 flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href="/"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                >
                  <social.icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="text-xs font-bold uppercase tracking-[0.25em] text-primary">
                  {column.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link}>
                      <a
                        href="/"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 AstroFlav. All rights reserved.
          </p>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
            USA Made • Third-Party Tested • No Fillers
          </p>
        </div>
      </div>
    </footer>
  );
}
