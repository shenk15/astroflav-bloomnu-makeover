# AstroFlav homepage — Shopify export

A pixel-for-pixel port of the Lovable homepage into a single Shopify section.
Product pages, cart, checkout, apps, and the rest of your theme are untouched:
everything here is scoped to `.astroflav-root` and nothing overrides theme CSS
globally (Tailwind's global reset is deliberately **not** included).

The compiled CSS is **theme-proof by construction**: every selector is scoped to
`.astroflav-root` repeated three times (e.g. `.astroflav-root.astroflav-root.astroflav-root .grid`)
and utilities are emitted with `!important`, so no Shopify theme rule — even one using
`!important` on generic names like `.grid`, `.hidden`, `ul li`, or `h2` — can outrank it.
A scoped neutralisation layer also resets theme bullets, heading margins, forced fonts
and colors inside the section only. Nothing leaks out: product pages, cart, checkout
and apps are untouched. Regenerate with:

```
bunx @tailwindcss/cli -i _build/tailwind-input.css -o /tmp/raw.css --minify
bun _build/harden.mjs /tmp/raw.css assets/astroflav-home.css
```

## Files

| File | Goes to | What it is |
|---|---|---|
| `sections/astroflav-home.liquid` | `sections/` | All markup for the 5 sections + header + footer, inlined SVG icons, and the `{% schema %}` so everything is editable in the Theme Editor |
| `assets/astroflav-home.css` | `assets/` | Compiled CSS (Tailwind utilities used on the page + the design tokens, hero cinematic treatment, animations, responsive rules) |
| `assets/astroflav-home.js` | `assets/` | ~200 lines of vanilla JS replacing all React interactivity |
| `assets/*.png`, `assets/*.jpg` | `assets/` | Logo, hero botanical background, hero bottle, category tiles, demo product shots |
| `templates/index.json` | `templates/` | Wires the section to the homepage with the correct default blocks |
| `_build/tailwind-input.css` | — | **Not uploaded.** Source used to regenerate the CSS (see below) |

## Install

1. Shopify admin → **Online Store → Themes → ⋯ → Edit code** (duplicate your theme first).
2. **Assets → Add a new asset** → upload every file in `assets/` (CSS, JS, and all images). Keep the filenames exactly as-is — the Liquid and CSS reference them by name.
3. **Sections → Add a new section** → name it `astroflav-home` → paste in `sections/astroflav-home.liquid`.
4. **Templates → `index.json`** → replace its contents with `templates/index.json`.
   (Alternatively, keep your `index.json` and add the section from **Customize → Add section → AstroFlav Homepage**.)
5. Open **Customize** and connect real data (below).

## Connect it to your real store data

Everything is editable in the Theme Editor — no code changes needed:

- **Best sellers** — pick a collection in *Best sellers → Collection*. Until you do, the four demo cards render from the bundled images. With a collection selected, titles, images, prices, links, and Add-to-Cart all come from Shopify.
- **Subscribe & Save** — pick the product/collection the CTA links to.
- **Hero** — pick the hero product (button links to it) and optionally override the bottle image and background.
- **Categories** — 4 category blocks; each takes a collection, a label, and an image.
- **UGC videos** — 4 video blocks; paste a video file URL (upload under Content → Files) and optionally a poster image.
- **Header / footer** — the section renders its own header and footer to match the design. If you'd rather keep your theme's, toggle *Show header* / *Show footer* off in the section settings.
- **Product card subtitle** ("Blue Slushy", "30 Day Supply") reads the `custom.card_detail` metafield, falling back to product type, then vendor.

## Fonts

Anton (display) and Archivo (body) load from Google Fonts via a `<link>` at the top of the section. To self-host instead, upload the woff2 files to `assets/` and swap the `<link>` for an `@font-face` block.

## Add to cart

`data-af-add-to-cart` buttons POST to Shopify's `/cart/add.js`, then dispatch both `cart:refresh` and a `publish('cart-items:updated')`-style event plus refresh the cart-count bubble — that covers Dawn and most OS 2.0 themes. If your theme uses a custom cart drawer that doesn't open, tell me which theme and I'll wire its specific event.

## What was React and is now vanilla JS

| Was (React) | Now |
|---|---|
| `useState` + `useEffect` rotating announcement bar | `setInterval` swapping text/icon with a CSS fade class |
| Mobile menu `useState` | `classList.toggle` + `aria-expanded` |
| Best-sellers carousel `useRef` + `scrollBy` | `data-af-scroll` buttons calling `scrollBy` on the track |
| UGC carousel + play-on-click `useState` | `data-af-video-toggle` play/pause, overlay hidden while playing |
| Hero ingredient card selection state | `data-af-ingredient` click handler toggling `aria-pressed` + dot/border classes |
| Product/category data from `src/lib/products.ts` and `ugc-videos.ts` | Liquid `collections` / `section.blocks` loops, with hardcoded fallbacks |
| `lucide-react` icon components | Raw inline `<svg>` captured once at the top of the section |
| Tailwind JIT at build time | Pre-compiled `astroflav-home.css` |
| TanStack Router `<Link>` | `<a href="{{ product.url }}">` / `{{ routes.* }}` |

Nothing else in the page depended on React.

## Regenerating the CSS

If you edit classes in the Liquid file, recompile so the new utilities exist:

```bash
npx @tailwindcss/cli \
  -i shopify-export/_build/tailwind-input.css \
  -o shopify-export/assets/astroflav-home.css --minify
```

The build input scans `sections/` and `assets/astroflav-home.js`, so any class you add there is picked up automatically.

---

# AstroFlav product page — one template for every product

`sections/astroflav-product.liquid` + `templates/product.astroflav.json` render
**every** product with the same AstroFlav/Bloom-style layout. Title, images,
variants, price, description, availability, and related products all come from
Shopify, so you never rebuild a page per product — you just assign the template.

## Install

1. **Assets → Add a new asset**: upload `assets/astroflav-product.css` and
   `assets/astroflav-product.js` (the image assets are the same ones the
   homepage uses — if they're already uploaded, skip them).
2. **Sections → Add a new section** → name it `astroflav-product` → paste in
   `sections/astroflav-product.liquid`.
3. **Templates → Add a new template** → for **product** → *JSON* → name it
   `astroflav` → replace its contents with `templates/product.astroflav.json`.
4. Assign the template to products:
   - one product: Admin → Products → *product* → **Theme template → astroflav**
   - all products: Products → select all → **Bulk edit** → add the *Theme
     template* column → set `astroflav` → Save.

## What's on the page

Gallery with thumbnails · title, rating row, price/compare-at · variant pills ·
one-time vs **Subscribe & Save** (shown automatically when the product has
selling plans from your subscription app) · quantity stepper · AJAX add to cart ·
proof pills + free-shipping line · benefit icon row · key ingredients ·
Description / How to use / Supplement facts / FAQ accordions · UGC video
carousel with sound-on lightbox · "You may also like" carousel · sticky mobile
buy bar · matching header + footer (both toggleable in section settings).

## Per-product content (optional metafields)

Create these under Settings → Custom data → Products. Every one has a fallback
in the section settings, so products without them still look complete.

| Metafield | Type | Format |
|---|---|---|
| `custom.card_detail` | Single line text | Subtitle/eyebrow, e.g. "30 Day Supply" |
| `custom.benefits` | Multi-line text | One per line — `Label :: detail` (first 4 used) |
| `custom.ingredients` | Multi-line text | One per line — `Name :: detail` |
| `custom.how_to_use` | Multi-line text | Directions |
| `custom.supplement_facts` | Multi-line text | Panel copy |
| `custom.faq` | Multi-line text | One per line — `Question :: answer` |

## Notes

- Add to cart posts to `/cart/add.js` (with `selling_plan` when Subscribe &
  Save is selected), so your existing cart, checkout, and apps keep working.
- CSS is the same hardened, `.astroflav-root`-scoped build as the homepage —
  it can't leak into the rest of the theme, and the theme can't break it.
- Regenerate CSS after editing classes:
  `bunx @tailwindcss/cli -i _build/tailwind-input.css -o /tmp/raw.css --minify && bun _build/harden.mjs /tmp/raw.css assets/astroflav-home.css && cp assets/astroflav-home.css assets/astroflav-product.css`
