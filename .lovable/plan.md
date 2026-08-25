# Shopify Liquid Export of the AstroFlav Homepage

Goal: produce a self-contained, copy-paste bundle that recreates this exact homepage inside an existing Shopify theme, without touching product pages, cart, checkout, apps, or backend.

## What gets produced

A new `shopify-export/` folder in this project (build artifacts only — the live React homepage stays untouched):

```text
shopify-export/
  sections/astroflav-home.liquid   all HTML + inline {% schema %} + <style> + <script>
  assets/astroflav-home.css        all CSS (optional split; also inlinable)
  assets/astroflav-home.js         all JS (carousels, announcement rotator, video play, mobile menu)
  templates/index.json             wires the section to the Shopify homepage
  README.md                        install steps + asset upload list
```

The Liquid section is intentionally one file so it can be dropped into any theme with one paste. CSS/JS are also mirrored as separate assets for themes that prefer `{{ 'file.css' | asset_url }}`.

## Conversion approach

- **Markup**: JSX from `site-header`, `hero`, `best-sellers`, `subscribe-save`, `category-tiles`, `ugc-carousel`, `site-footer`, `wordmark` is flattened into static HTML with the exact same Tailwind class strings.
- **Tailwind**: the theme almost certainly has no Tailwind build. Rather than requiring one, the export ships a compiled CSS file — the Tailwind output for exactly the classes used on this page, plus the custom rules from `src/styles.css` (design tokens, `.ingredient-hero` spotlight layers, animations, media queries). Class names in the HTML stay identical, so the rendering is pixel-identical.
- **Design tokens**: the `:root` OKLCH variables, dark palette, `--font-display` / body font, and the `#49d6f3`-family accent tokens are copied verbatim and scoped to the section wrapper so they can't leak into the rest of the theme.
- **Fonts**: Anton + Archivo currently load via `<link>` in `__root.tsx`; they move into the section as `<link rel="preconnect">` + stylesheet tags.
- **Icons**: every `lucide-react` icon in use (ArrowRight, ArrowLeft, ArrowUpRight, ChevronLeft/Right, Play, Plus, Star, Truck, Layers, Menu, Search, ShoppingBag, User, Mail, Package, Pencil, DollarSign, Facebook, Instagram, Twitter, Youtube) is inlined as raw SVG — no icon package needed.
- **Images**: currently `/images/...` paths. Each is listed in the README for upload to Shopify Files/Assets, and referenced in Liquid as `{{ 'name.png' | asset_url }}`, with product images optionally driven by the section's schema settings so they're editable in the Theme Editor.

## React → vanilla JavaScript

These are the only interactive pieces, all rewritten in ~120 lines of plain JS:

| Current React | Replacement |
| --- | --- |
| `site-header`: `useState`/`useEffect` announcement rotator (4s) | `setInterval` swapping text + icon, same fade class |
| `site-header`: `useBagCount()` bag badge | Shopify's real `cart.item_count` in Liquid, live-updated from the theme's cart events |
| `best-sellers`: ref + `scrollBy` arrows | `querySelector` + `scrollBy`, identical snap behavior |
| `ugc-carousel`: `useState` active video, arrows | click handler toggles poster→`<video>` playback; same arrow scroll logic |
| `hero` / product cards: `addToBag()` local store | `POST /cart/add.js` against the real Shopify cart |
| Mobile menu toggle | `classList.toggle` |
| TanStack `<Link>` / anchors | Liquid URLs (`{{ product.url }}`, `/collections/...`) or in-page `#anchors` |

Nothing else in the page depends on React — the remaining ~90% is static markup.

## Shopify wiring (kept minimal and non-destructive)

- Section schema exposes: announcement messages, hero headline/subcopy/image, the four best-seller products (product pickers), subscribe-save copy/image, four category links, four UGC video URLs + posters.
- Add-to-bag buttons post to `/cart/add.js` with the selected variant ID, so the theme's existing cart drawer, apps, and checkout keep working untouched.
- Header/footer in the export are optional: the README explains how to drop them if the theme's own header/footer should stay.

## Deliverable

Along with the files, a short mapping doc: each current component → where it lives in the Liquid file, and the exact list of assets to upload.
