/* AstroFlav product page — vanilla JS.
   Gallery, variant selection, purchase mode (one-time / subscribe),
   quantity, accordions, carousels, UGC lightbox, sticky mobile bar,
   and real Shopify AJAX add-to-cart. */
(function () {
  "use strict";

  function cartUrl(path) {
    var root = (window.Shopify && window.Shopify.routes && window.Shopify.routes.root) || "/";
    return root + path;
  }

  function refreshCartCount(root) {
    return fetch(cartUrl("cart.js"), { headers: { Accept: "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        root.querySelectorAll("[data-af-cart-count]").forEach(function (el) {
          el.textContent = cart.item_count;
        });
      })
      .catch(function () {});
  }

  function addToCart(root, payload, btn) {
    if (btn) btn.disabled = true;
    return fetch(cartUrl("cart/add.js"), {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    })
      .then(function (r) { return r.json(); })
      .then(function () { return refreshCartCount(root); })
      .then(function () {
        document.dispatchEvent(new CustomEvent("cart:refresh", { bubbles: true }));
        document.dispatchEvent(new CustomEvent("cart:build", { bubbles: true }));
      })
      .catch(function (e) { console.error("[astroflav] add to cart failed", e); })
      .finally(function () { if (btn) btn.disabled = false; });
  }

  function init(root) {
    if (!root || root.dataset.afInit === "1") return;
    root.dataset.afInit = "1";

    /* ── Rotating announcement bar ── */
    var bar = root.querySelector("[data-af-announcement-bar]");
    if (bar) {
      var texts = [bar.dataset.textOne, bar.dataset.textTwo].filter(Boolean);
      var icons = [bar.querySelector("[data-af-icon-0]"), bar.querySelector("[data-af-icon-1]")];
      var textEl = bar.querySelector("[data-af-announcement-text]");
      var iconEl = bar.querySelector("[data-af-announcement-icon]");
      var line = bar.querySelector("[data-af-announcement]");
      var i = 0;
      if (texts.length > 1 && textEl && line) {
        setInterval(function () {
          i = (i + 1) % texts.length;
          textEl.textContent = texts[i];
          var tpl = icons[i];
          if (tpl && iconEl) iconEl.innerHTML = tpl.innerHTML;
          line.classList.remove("af-fade");
          void line.offsetWidth;
          line.classList.add("af-fade");
        }, 4000);
      }
    }

    /* ── Mobile menu ── */
    var menuBtn = root.querySelector("[data-af-menu-toggle]");
    var mobileNav = root.querySelector("[data-af-mobile-nav]");
    if (menuBtn && mobileNav) {
      menuBtn.addEventListener("click", function () { mobileNav.hidden = !mobileNav.hidden; });
      mobileNav.addEventListener("click", function (e) { if (e.target.tagName === "A") mobileNav.hidden = true; });
    }

    /* ── Gallery thumbnails ── */
    var mainImage = root.querySelector("[data-af-main-image]");
    var thumbs = root.querySelectorAll("[data-af-thumb]");
    thumbs.forEach(function (thumb) {
      thumb.addEventListener("click", function () {
        var src = thumb.getAttribute("data-af-image");
        if (src && mainImage) mainImage.setAttribute("src", src);
        thumbs.forEach(function (t) {
          t.classList.remove("border-primary");
          t.classList.add("border-border");
        });
        thumb.classList.remove("border-border");
        thumb.classList.add("border-primary");
      });
    });

    /* ── Variant selection ── */
    var priceEl = root.querySelector("[data-af-price]");
    var compareEl = root.querySelector("[data-af-compare]");
    var stickyPrice = root.querySelector("[data-af-sticky-price]");
    var atc = root.querySelector("[data-af-atc]");
    var atcLabel = root.querySelector("[data-af-atc-label]");
    var variantBtns = root.querySelectorAll("[data-af-variant]");

    variantBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        variantBtns.forEach(function (other) {
          other.setAttribute("aria-pressed", "false");
          other.classList.remove("border-primary", "bg-primary/10", "text-foreground");
          other.classList.add("border-border", "text-muted-foreground");
        });
        btn.setAttribute("aria-pressed", "true");
        btn.classList.remove("border-border", "text-muted-foreground");
        btn.classList.add("border-primary", "bg-primary/10", "text-foreground");

        var price = btn.getAttribute("data-price");
        var compare = btn.getAttribute("data-compare");
        var image = btn.getAttribute("data-image");
        var available = btn.getAttribute("data-available") === "true";

        if (priceEl && price) priceEl.textContent = price;
        if (stickyPrice && price) stickyPrice.textContent = price;
        if (compareEl) {
          if (compare) { compareEl.textContent = compare; compareEl.hidden = false; }
          else compareEl.hidden = true;
        }
        if (image && mainImage) mainImage.setAttribute("src", image);
        if (atc) {
          atc.setAttribute("data-variant-id", btn.getAttribute("data-variant-id"));
          atc.disabled = !available;
          if (atcLabel) atcLabel.textContent = available ? "Add to cart" : "Sold out";
        }

        /* keep the URL shareable, like a native product page */
        try {
          var url = new URL(window.location.href);
          url.searchParams.set("variant", btn.getAttribute("data-variant-id"));
          window.history.replaceState({}, "", url.toString());
        } catch (e) {}
      });
    });

    /* ── Purchase mode: one-time vs subscribe ── */
    var selectedPlan = "";
    var purchaseBtns = root.querySelectorAll("[data-af-purchase]");
    purchaseBtns.forEach(function (btn) {
      btn.addEventListener("click", function () {
        purchaseBtns.forEach(function (other) {
          other.setAttribute("aria-pressed", "false");
          other.classList.remove("border-primary", "bg-primary/10");
          other.classList.add("border-border");
          var r = other.querySelector(".af-radio");
          var d = other.querySelector(".af-radio-dot");
          if (r) { r.classList.remove("border-primary"); r.classList.add("border-border"); }
          if (d) { d.classList.remove("bg-primary"); d.classList.add("bg-transparent"); }
        });
        btn.setAttribute("aria-pressed", "true");
        btn.classList.remove("border-border");
        btn.classList.add("border-primary", "bg-primary/10");
        var radio = btn.querySelector(".af-radio");
        var dot = btn.querySelector(".af-radio-dot");
        if (radio) { radio.classList.remove("border-border"); radio.classList.add("border-primary"); }
        if (dot) { dot.classList.remove("bg-transparent"); dot.classList.add("bg-primary"); }
        selectedPlan = btn.getAttribute("data-plan-id") || "";
      });
    });

    /* ── Quantity stepper ── */
    var qtyInput = root.querySelector("[data-af-qty-input]");
    root.querySelectorAll("[data-af-qty]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (!qtyInput) return;
        var step = parseInt(btn.getAttribute("data-af-qty"), 10) || 1;
        var next = (parseInt(qtyInput.value, 10) || 1) + step;
        qtyInput.value = next < 1 ? 1 : next;
      });
    });

    /* ── Main add to cart ── */
    function currentPayload() {
      var id = atc && atc.getAttribute("data-variant-id");
      var qty = qtyInput ? parseInt(qtyInput.value, 10) || 1 : 1;
      var item = { id: Number(id), quantity: qty };
      /* Skio plan picker (and other subscription apps) set a hidden selling_plan input */
      var planInput = root.querySelector('input[name="selling_plan"]');
      var plan = planInput && planInput.value ? planInput.value : selectedPlan;
      if (plan) item.selling_plan = Number(plan);
      return { items: [item] };
    }

    if (atc) {
      atc.addEventListener("click", function () {
        if (atc.disabled) return;
        addToCart(root, currentPayload(), atc);
      });
    }

    var stickyAtc = root.querySelector("[data-af-sticky-atc]");
    if (stickyAtc) {
      stickyAtc.addEventListener("click", function () {
        addToCart(root, currentPayload(), stickyAtc);
      });
    }

    /* ── Related-product quick add ── */
    root.querySelectorAll("[data-af-add-to-cart]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-af-add-to-cart");
        if (!id) return;
        addToCart(root, { items: [{ id: Number(id), quantity: 1 }] }, btn);
      });
    });

    /* ── Sticky bar visibility (shows once the buy box scrolls away) ── */
    var stickyBar = root.querySelector("[data-af-sticky-bar]");
    if (stickyBar && atc && "IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        stickyBar.hidden = entries[0].isIntersecting;
      }, { rootMargin: "0px 0px -40% 0px" });
      io.observe(atc);
    }

    /* ── Accordions ── */
    root.querySelectorAll("[data-af-accordion]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        var panel = btn.parentNode.querySelector("[data-af-accordion-panel]");
        var icon = btn.querySelector("[data-af-accordion-icon]");
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        if (panel) panel.hidden = open;
        if (icon) icon.style.transform = open ? "" : "rotate(180deg)";
      });
    });

    /* ── Ingredient toggles ── */
    var ingredients = root.querySelectorAll("[data-af-ingredient]");
    ingredients.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var wasActive = btn.getAttribute("aria-pressed") === "true";
        ingredients.forEach(function (other) {
          other.setAttribute("aria-pressed", "false");
          var d = other.querySelector("[data-af-ingredient-dot]");
          if (d) { d.classList.add("bg-primary/40"); d.classList.remove("bg-primary"); }
          other.classList.remove("border-primary/50");
        });
        if (!wasActive) {
          btn.setAttribute("aria-pressed", "true");
          var dot = btn.querySelector("[data-af-ingredient-dot]");
          if (dot) { dot.classList.remove("bg-primary/40"); dot.classList.add("bg-primary"); }
          btn.classList.add("border-primary/50");
        }
      });
    });

    /* ── Carousel arrows ── */
    root.querySelectorAll("[data-af-scroll]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var track = document.getElementById(btn.dataset.afScroll);
        if (!track) return;
        var dir = parseInt(btn.dataset.afDir, 10) || 1;
        var step = track.clientWidth / (window.innerWidth >= 1024 ? 4 : 1.2);
        track.scrollBy({ left: dir * step, behavior: "smooth" });
      });
    });

    /* ── UGC lightbox with sound ── */
    var modal = root.querySelector("[data-af-video-modal]");
    var modalVideo = modal && modal.querySelector("[data-af-modal-video]");
    if (modal && modal.parentNode !== document.body) document.body.appendChild(modal);

    function setStyles(el, styles) {
      Object.keys(styles).forEach(function (k) { el.style.setProperty(k, styles[k], "important"); });
    }

    function closeVideoModal() {
      if (!modal) return;
      if (modalVideo) { modalVideo.pause(); modalVideo.removeAttribute("src"); modalVideo.load(); }
      setStyles(modal, { display: "none" });
      document.body.style.overflow = "";
    }

    if (modal && modalVideo) {
      setStyles(modal, {
        position: "fixed", inset: "0", top: "0", right: "0", bottom: "0", left: "0",
        "z-index": "2147483647", "align-items": "center", "justify-content": "center",
        background: "rgba(0,0,0,.92)", padding: "16px", display: "none",
        visibility: "visible", opacity: "1"
      });

      root.querySelectorAll("[data-af-video-toggle]").forEach(function (btn) {
        var card = btn.closest("[data-af-video-card]");
        var video = card && card.querySelector("[data-af-video]");
        var src = btn.getAttribute("data-af-video-src") ||
          (video && (video.getAttribute("src") ||
            (video.querySelector("source") && video.querySelector("source").getAttribute("src"))));
        if (!src) return;
        btn.style.cursor = "pointer";
        btn.addEventListener("click", function (e) {
          e.preventDefault();
          e.stopPropagation();
          if (video) { try { video.pause(); } catch (err) {} }
          modalVideo.setAttribute("src", src);
          modalVideo.muted = false;
          modalVideo.volume = 1;
          modalVideo.controls = true;
          setStyles(modal, { display: "flex" });
          document.body.style.overflow = "hidden";
          modalVideo.load();
          var p = modalVideo.play();
          if (p && p.catch) p.catch(function () { modalVideo.muted = true; modalVideo.play(); });
        });
      });

      modal.addEventListener("click", function (e) { if (e.target === modal) closeVideoModal(); });
      var closeBtn = modal.querySelector("[data-af-video-close]");
      if (closeBtn) closeBtn.addEventListener("click", closeVideoModal);
      document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeVideoModal(); });
    }
  }

  function boot() {
    document.querySelectorAll("[data-astroflav-product]").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  document.addEventListener("shopify:section:load", boot);
})();
