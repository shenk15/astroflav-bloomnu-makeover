import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/home/site-header";
import { Hero } from "@/components/home/hero";
import { BestSellers } from "@/components/home/best-sellers";
import { SubscribeSave } from "@/components/home/subscribe-save";
import { CategoryTiles } from "@/components/home/category-tiles";
import { UgcCarousel } from "@/components/home/ugc-carousel";
import { SiteFooter } from "@/components/home/site-footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AstroFlav | Premium Performance Supplements" },
      {
        name: "description",
        content:
          "Shop AstroFlav best sellers — Elevated T-Booster, Full Tank workout fuel, One Scoop Only pre-workout and more. USA made, third-party tested, no fillers. Free shipping over $99.",
      },
      { property: "og:title", content: "AstroFlav | Premium Performance Supplements" },
      {
        property: "og:description",
        content:
          "Shop AstroFlav best sellers — Elevated T-Booster, Full Tank workout fuel, One Scoop Only pre-workout and more. USA made, third-party tested, no fillers.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "AstroFlav",
          url: "https://astroflav.com",
          description:
            "Premium performance supplements — USA made, third-party tested, no fillers.",
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <BestSellers />
        <SubscribeSave />
        <CategoryTiles />
        <UgcCarousel />
      </main>
      <SiteFooter />
    </div>
  );
}
