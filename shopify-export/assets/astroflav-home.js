/* AstroFlav homepage — vanilla JS replacement for the React behaviour.
   Covers: rotating announcement bar, mobile menu, best-seller carousel arrows,
   UGC carousel arrows, click-to-play videos, ingredient toggles, add-to-cart. */
(function () {
  "use strict";

  function init(root) {
    if (!root || root.dataset.afInit === "1") return;
    root.dataset.afInit = "1";

    /* ── 1. Rotating announcement bar (was useState + useEffect/setInterval) ── */
    var bar = root.querySelector("[data-af-announcement-bar]");
    if (bar) {
      var texts = [bar.dataset.textOne, bar.dataset.textTwo].filter(Boolean);
      var icons = [
        bar.querySelector("[data-af-icon-0]"),
        bar.querySelector("[data-af-icon-1]"),
      ];
      var textEl = bar.querySelector("[data-af-announcement-text]");
      var iconEl = bar.querySelector("[data-af-announcement-icon]");
      var line = bar.querySelector("[data-af-announcement]");
      var i = 0;
      if (texts.length > 1) {
        setInterval(function () {
          i = (i + 1) % texts.length;
          textEl.textContent = texts[i];
          var tpl = icons[i];
          if (tpl && tpl.content) iconEl.innerHTML = tpl.innerHTML;
          /* restart the fade animation */
          line.classList.remove("af-fade");
          void line.offsetWidth;
          line.classList.add("af-fade");
        }, 4000);
      }
    }

    /* ── 2. Mobile menu toggle (was lg:hidden button with no handler) ── */
    var menuBtn = root.querySelector("[data-af-menu-toggle]");
    var mobileNav = root.querySelector("[data-af-mobile-nav]");
    if (menuBtn && mobileNav) {
      menuBtn.addEventListener("click", function () {
        mobileNav.hidden = !mobileNav.hidden;
      });
      mobileNav.addEventListener("click", function (e) {
        if (e.target.tagName === "A") mobileNav.hidden = true;
      });
    }

    /* ── 3. Carousel arrows (was useRef + scrollBy) ── */
    root.querySelectorAll("[data-af-scroll]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var track = document.getElementById(btn.dataset.afScroll);
        if (!track) return;
        var dir = parseInt(btn.dataset.afDir, 10) || 1;
        var step = btn.dataset.afStep
          ? parseInt(btn.dataset.afStep, 10)
          : track.clientWidth / (window.innerWidth >= 1024 ? 4 : 1.2);
        track.scrollBy({ left: dir * step, behavior: "smooth" });
      });
    });

    /* ── 4. UGC click-to-open lightbox with sound ── */
    var modal = root.querySelector("[data-af-video-modal]");
    var modalVideo = root.querySelector("[data-af-modal-video]");

    function closeVideoModal() {
      if (!modal) return;
      if (modalVideo) {
        modalVideo.pause();
        modalVideo.removeAttribute("src");
        modalVideo.load();
      }
      modal.style.display = "none";
      document.body.style.overflow = "";
    }

    if (modal && modalVideo) {
      root.querySelectorAll("[data-af-video-toggle]").forEach(function (btn) {
        var card = btn.closest(".group");
        var video = card && card.querySelector("[data-af-video]");
        var src = video && video.getAttribute("src");
        if (!src) {
          btn.style.display = "none";
          return;
        }
        btn.addEventListener("click", function () {
          modalVideo.src = src;
          modalVideo.muted = false;
          modal.style.display = "flex";
          document.body.style.overflow = "hidden";
          var p = modalVideo.play();
          if (p && p.catch) p.catch(function () {});
        });
      });
      modal.addEventListener("click", function (e) {
        if (e.target === modal) closeVideoModal();
      });
      var closeBtn = modal.querySelector("[data-af-video-close]");
      if (closeBtn) closeBtn.addEventListener("click", closeVideoModal);
      document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") closeVideoModal();
      });
    }

    /* ── 5. Hero ingredient toggle (was activeIngredient state) ── */
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

    /* ── 6. Add to cart — real Shopify cart (was local addToBag store) ── */
    root.querySelectorAll("[data-af-add-to-cart]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var id = btn.getAttribute("data-af-add-to-cart");
        if (!id) return;
        btn.disabled = true;
        fetch(window.Shopify && window.Shopify.routes ? window.Shopify.routes.root + "cart/add.js" : "/cart/add.js", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({ items: [{ id: Number(id), quantity: 1 }] }),
        })
          .then(function (r) { return r.json(); })
          .then(function () { return refreshCartCount(root); })
          .then(function () {
            /* Let the theme's cart drawer / apps know something changed. */
            document.dispatchEvent(new CustomEvent("cart:refresh", { bubbles: true }));
            document.dispatchEvent(new CustomEvent("cart:build", { bubbles: true }));
          })
          .catch(function (e) { console.error("[astroflav] add to cart failed", e); })
          .finally(function () { btn.disabled = false; });
      });
    });
  }

  function refreshCartCount(root) {
    return fetch("/cart.js", { headers: { Accept: "application/json" } })
      .then(function (r) { return r.json(); })
      .then(function (cart) {
        root.querySelectorAll("[data-af-cart-count]").forEach(function (el) {
          el.textContent = cart.item_count;
        });
      });
  }

  function boot() {
    document.querySelectorAll("[data-astroflav-home]").forEach(init);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
  /* Theme Editor re-render support */
  document.addEventListener("shopify:section:load", boot);
})();
