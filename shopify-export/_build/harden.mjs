// Post-processes the compiled Tailwind CSS so no Shopify theme rule can win.
// 1. Every selector is scoped to .astroflav-root (repeated 3x for specificity).
// 2. @layer wrappers are flattened so unlayered theme CSS cannot outrank us.
// Usage: bun _build/harden.mjs <in.css> <out.css>
import { readFileSync, writeFileSync } from "node:fs";
import postcss from "postcss";

const SCOPE = ".astroflav-root";
const S3 = `${SCOPE}${SCOPE}${SCOPE}`;

const scopeSelector = (sel) => {
  const s = sel.trim();
  if (!s) return s;
  if (s.startsWith("@")) return s;
  if (s === ":root" || s === "html" || s === "body") return S3;
  if (s.includes(SCOPE)) return s.replace(SCOPE, S3);
  // universal / bare selectors -> descendants of the scope (plus the root itself)
  if (s === "*" || s === ":before" || s === ":after" || s === "::backdrop" ||
      s === "::before" || s === "::after") {
    return s === "*" ? `${S3}, ${S3} *` : `${S3}${s}, ${S3} *${s}`;
  }
  return `${S3} ${s}`;
};

const inKeyframes = (node) => {
  for (let p = node.parent; p; p = p.parent) {
    if (p.type === "atrule" && /keyframes/.test(p.name)) return true;
  }
  return false;
};

const plugin = {
  postcssPlugin: "astroflav-harden",
  OnceExit(root) {
    // flatten @layer
    root.walkAtRules("layer", (at) => {
      if (at.nodes) at.replaceWith(at.nodes);
      else at.remove();
    });
    root.walkRules((rule) => {
      if (inKeyframes(rule)) return;
      // PostCSS already separates selector lists safely. Splitting the scoped
      // selector string on commas corrupts escaped commas inside Tailwind
      // arbitrary values such as:
      //   .lg\:grid-cols-\[minmax\(0\,1fr\)_...\]
      // Those classes power the hero and Subscribe & Save desktop grids.
      rule.selectors = rule.selectors.map(scopeSelector);
    });
  },
};
plugin.postcss = true;
const pluginFactory = () => plugin;
pluginFactory.postcss = true;

const [, , inFile, outFile] = process.argv;
const css = readFileSync(inFile, "utf8");
const out = await postcss([pluginFactory]).process(css, { from: inFile, to: outFile });
writeFileSync(outFile, out.css);
console.log("hardened ->", outFile, out.css.length, "bytes");
