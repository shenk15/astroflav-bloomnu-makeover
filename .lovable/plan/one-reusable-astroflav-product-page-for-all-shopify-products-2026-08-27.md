# One Reusable AstroFlav Product Page for All Shopify Products

Goal: every product page (Elevated, Full Tank, RF-350, etc.) renders in the same Bloom-style layout with AstroFlav branding, and new products automatically inherit it — you only swap product info in Shopify admin, never in code.

## The easiest approach

Build **one** Shopify product section + template, driven entirely by Shopify product data:

```text
shopify-export/
  sections/astroflav-product.liquid    the whole product page layout
  assets/astroflav-product.css         scoped, theme-proof styles (same hardening as the homepage)
  assets/astroflav-product.js          gallery, variant/subscription toggle, accordions, sticky bar
  templates/product.astroflav.json     the template that uses the section
```

Assign `product.astroflav` as the template for one product, confirm it looks right, then bulk-assign it to all products (Products → select all → Edit products → Theme template). New products get it by default once it's set as the theme's product template.

## Page layout (mirrors the Bloom product page, AstroFlav styling)

1. **Gallery + buy box** (two columns desktop, stacked mobile)
   - Left: main image with thumbnail strip, from `product.images`
   - Right: title, star/review slot, price + compare-at, short description, variant/flavor selector, one-time vs Subscribe & Save 20% toggle, quantity, Add to Cart (white pill), 30-day money-back badge, free-shipping line
2. **Benefit icon row** — 3–4 icons + labels
3. **Key ingredients** — the same interactive ingredient cards used on the homepage hero
4. **Supplement facts / how to use** — accordion
5. **UGC video carousel** — reuses the homepage "Real People. Real Results." component with popup playback
6. **Best sellers / you may also like** — product carousel from a collection
7. **FAQ accordion** + footer CTA

## Where the per-product info comes from

| Content | Source | You edit it in |
|---|---|---|
| Title, price, images, variants, availability | Native product fields | Product admin |
| Short description / long description | `product.description` | Product admin |
| Benefit bullets, ingredients (name + blurb), how-to-use, FAQ | Product **metafields** (`custom.benefits`, `custom.ingredients`, `custom.how_to_use`, `custom.faq`) | Product admin, per product |
| Section headings, icon row, UGC videos, related collection | Section/block settings | Theme Editor |

Every metafield has a sensible fallback, so a product with nothing filled in still renders a clean page.

## Technical notes

- Same theme-proofing as the homepage: all selectors triple-scoped under `.astroflav-product-root`, `!important` utilities, plus the Horizon neutralization layer (`grid-template-areas: none`, `font-style: normal`, forced uppercase) that fixed the desktop spacing and slanted-font issues.
- Add to Cart posts to `/cart/add.js` with the selected variant, so your existing cart drawer, apps, and checkout stay untouched.
- Subscribe toggle targets your subscription app's selling plans when present; otherwise it hides itself.
- Shared CSS/JS between home and product pages stays separate — installing this does not change the homepage files already live.
- Delivered as an updated ZIP with README install + bulk-template-assign steps.

## Before I build

I need the exact metafield setup to be right the first time — see the questions below.
