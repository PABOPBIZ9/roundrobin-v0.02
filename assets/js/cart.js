(function () {
  const KEY = "pgb-cart-v1";
  const OG_OFFER = {
    id: "og-gold-puck-pass",
    name: "$36 OG Pass — Limited Edition Puck + 1-Yr Pass",
    maker: "PuckGoldBiz · Founding",
    price: 36,
    qty: 1,
    img: "assets/brand/lockup/primary-master.png?v=3",
  };

  function read() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY) || "[]");
      return sanitize(Array.isArray(raw) ? raw : []);
    } catch (_) {
      return [];
    }
  }

  /** Collapse duplicate lines, cap OG at 1, prevent runaway qty spam */
  function sanitize(items) {
    const map = new Map();
    items.forEach((i) => {
      if (!i || !i.id) return;
      const qty = Math.max(1, Math.min(Number(i.qty) || 1, i.id === OG_OFFER.id ? 1 : 12));
      const prev = map.get(i.id);
      if (prev) prev.qty = Math.min(prev.qty + qty, i.id === OG_OFFER.id ? 1 : 12);
      else map.set(i.id, { ...i, qty });
    });
    if (map.has(OG_OFFER.id)) map.set(OG_OFFER.id, { ...OG_OFFER, qty: 1 });
    return Array.from(map.values());
  }

  function write(items) {
    const clean = sanitize(items);
    localStorage.setItem(KEY, JSON.stringify(clean));
    window.dispatchEvent(new CustomEvent("pgb-cart", { detail: clean }));
    render();
  }

  function count(items) {
    return items.reduce((n, i) => n + (i.qty || 1), 0);
  }

  function money(n) {
    return `$${Number(n).toFixed(2)}`;
  }

  function addItem(item, opts) {
    const items = read();
    const found = items.find((i) => i.id === item.id);
    if (item.id === OG_OFFER.id) {
      addOgOffer(opts);
      return;
    }
    if (found) found.qty = Math.min((found.qty || 1) + (item.qty || 1), 12);
    else items.push({ ...item, qty: Math.min(item.qty || 1, 12) });
    write(items);
    if (!opts || opts.open !== false) open();
  }

  /** Claim the founding $36 OG Pass (one line item — no duplicate qty spam) */
  function addOgOffer(opts) {
    const items = read();
    if (items.some((i) => i.id === OG_OFFER.id)) {
      render();
      if (!opts || opts.open !== false) open();
      return OG_OFFER;
    }
    addItem({ ...OG_OFFER }, opts);
    return OG_OFFER;
  }

  function removeItem(id) {
    write(read().filter((i) => i.id !== id));
  }

  function clearCart() {
    write([]);
  }

  function setQty(id, qty) {
    let items = read();
    items = items
      .map((i) => (i.id === id ? { ...i, qty } : i))
      .filter((i) => i.qty > 0);
    write(items);
  }

  function ensureDrawer() {
    if (document.getElementById("cartDrawer")) return;
    const el = document.createElement("div");
    el.className = "cart-drawer";
    el.id = "cartDrawer";
    el.innerHTML = `
      <div class="cart-backdrop" data-cart-close></div>
      <aside class="cart-panel" role="dialog" aria-label="Shopping bag">
        <div class="cart-head">
          <h2>YOUR BAG</h2>
          <button type="button" class="cart-close" data-cart-close aria-label="Close">×</button>
        </div>
        <div class="cart-body" id="cartBody"></div>
        <div class="cart-foot">
          <div class="cart-total"><span>Subtotal</span><span id="cartSubtotal">$0.00</span></div>
          <a class="btn btn-signin btn-block" href="checkout.html">Checkout</a>
          <button type="button" class="btn btn-ghost btn-block cart-empty-btn" id="cartEmptyBtn" style="margin-top:.5rem;border-color:rgba(18,24,38,.15);color:#121826">Empty bag</button>
          <a class="btn btn-ghost btn-block" href="shop.html" style="margin-top:.35rem;border-color:rgba(18,24,38,.15);color:#121826">Continue shopping</a>
        </div>
      </aside>
    `;
    document.body.appendChild(el);
    el.addEventListener("click", (e) => {
      if (e.target.closest("[data-cart-close]")) close();
      if (e.target.closest("#cartEmptyBtn")) clearCart();
    });
  }

  function render() {
    ensureDrawer();
    const items = read();
    const body = document.getElementById("cartBody");
    const sub = document.getElementById("cartSubtotal");
    const badge = document.getElementById("navBagCount");
    const shopBadge = document.getElementById("bagCount");
    const dockBadge = document.getElementById("bagCountDock");
    const n = count(items);
    if (badge) {
      badge.textContent = n ? String(n) : "";
      badge.dataset.count = String(n);
    }
    if (shopBadge) shopBadge.textContent = String(n);
    if (dockBadge) dockBadge.textContent = String(n);

    if (!body) return;
    if (!items.length) {
      body.innerHTML = `<div class="cart-empty">Your bag is empty.<br><a href="shop.html" style="color:#163a74;text-decoration:underline">Shop Best Sellers</a></div>`;
      if (sub) sub.textContent = "$0.00";
      return;
    }
    let total = 0;
    body.innerHTML = items
      .map((i) => {
        total += i.price * i.qty;
        const img = i.img
          ? `<img src="${i.img}" alt="">`
          : `<span style="font-family:var(--display);font-size:1.1rem">${(i.name || "PGB").slice(0, 4)}</span>`;
        return `
        <div class="cart-item" data-id="${i.id}">
          <div class="thumb">${img}</div>
          <div>
            <h3>${i.name}</h3>
            <div class="meta">${i.maker || "PuckGold"}</div>
            <div class="qty">
              <button type="button" data-qty="-1" aria-label="Decrease">−</button>
              <span>${i.qty}</span>
              <button type="button" data-qty="1" aria-label="Increase">+</button>
            </div>
            <button type="button" class="cart-remove" data-remove aria-label="Remove item">Remove</button>
          </div>
          <div class="price">${money(i.price * i.qty)}</div>
        </div>`;
      })
      .join("");
    if (sub) sub.textContent = money(total);

    body.querySelectorAll(".cart-item").forEach((row) => {
      row.querySelectorAll("[data-qty]").forEach((btn) => {
        btn.addEventListener("click", () => {
          const id = row.getAttribute("data-id");
          const delta = Number(btn.getAttribute("data-qty"));
          const item = read().find((x) => x.id === id);
          if (!item) return;
          setQty(id, item.qty + delta);
        });
      });
      row.querySelector("[data-remove]")?.addEventListener("click", () => {
        removeItem(row.getAttribute("data-id"));
      });
    });
  }

  function open() {
    ensureDrawer();
    render();
    document.getElementById("cartDrawer")?.classList.add("open");
    document.documentElement.style.overflow = "hidden";
  }

  function close() {
    document.getElementById("cartDrawer")?.classList.remove("open");
    document.documentElement.style.overflow = "";
  }

  function bindAddButtons() {
    document.querySelectorAll("[data-add-cart]").forEach((el) => {
      if (el.dataset.cartBound) return;
      el.dataset.cartBound = "1";
      el.addEventListener("click", (e) => {
        e.preventDefault();
        addItem({
          id: el.getAttribute("data-id") || el.getAttribute("data-add-cart"),
          name: el.getAttribute("data-name") || "PGB Item",
          maker: el.getAttribute("data-maker") || "PuckGold",
          price: Number(el.getAttribute("data-price") || 0),
          img: el.getAttribute("data-img") || "",
          qty: 1,
        });
      });
    });
  }

  document.addEventListener("DOMContentLoaded", () => {
    ensureDrawer();
    write(read()); /* migrate / sanitize persisted bag on every page load */
    bindAddButtons();
    document.querySelectorAll("[data-open-cart], #navBagBtn").forEach((el) => {
      if (el.dataset.cartOpenBound) return;
      el.dataset.cartOpenBound = "1";
      el.addEventListener("click", (e) => {
        e.preventDefault();
        open();
      });
    });
    // Re-bind after dynamic tabs hide/show
    const obs = new MutationObserver(bindAddButtons);
    obs.observe(document.body, { childList: true, subtree: true });
  });

  // Deep-link: checkout.html?offer=og | any page ?claim=og
  document.addEventListener("DOMContentLoaded", () => {
    try {
      const q = new URLSearchParams(location.search);
      if (q.get("offer") === "og" || q.get("claim") === "og") {
        addOgOffer({ open: false });
      }
    } catch (_) {}

    // Any [data-claim-og] → bag + checkout (works outside header too)
    document.querySelectorAll("[data-claim-og]").forEach((a) => {
      if (a.dataset.claimBound) return;
      a.dataset.claimBound = "1";
      a.addEventListener("click", (e) => {
        e.preventDefault();
        addOgOffer({ open: false });
        location.href = "checkout.html?offer=og";
      });
    });
  });

  window.PGBCart = { addItem, addOgOffer, open, close, read, render, clearCart, removeItem, OG_OFFER };
})();
