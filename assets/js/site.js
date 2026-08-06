(function () {
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const active = path === "" ? "index.html" : path;

  const links = [
    { href: "teams.html", label: "Teams" },
    { href: "rosters.html", label: "Rosters" },
    { href: "stadiums.html", label: "Stadiums" },
    { href: "bracket.html", label: "Bracket" },
    { href: "brand.html", label: "Brand kit" },
    { href: "media.html", label: "Media" },
    { href: "awards.html", label: "Awards" },
  ];

  const actionLinks = [
    { href: "fantasy.html", label: "Fan Zone", cls: "btn btn-sapphire btn-sm" },
    { href: "shop.html", label: "Shop", cls: "btn btn-platinum btn-sm" },
    { href: "signin.html", label: "Sign In", cls: "btn btn-ghost btn-sm" },
  ];

  function navHtml(isActive) {
    return links
      .map(
        (l) =>
          `<a href="${l.href}" class="${isActive(l.href) ? "active" : ""}">${l.label}</a>`
      )
      .join("");
  }

  function mount() {
    const header = document.getElementById("site-header");
    const footer = document.getElementById("site-footer");
    if (!header) return;

    const isActive = (href) => active === href.toLowerCase();

    header.innerHTML = `
      <div class="nav-wrap">
        <a class="logo-link" href="index.html" aria-label="PuckGold home">
          <img class="logo-mark" src="assets/img/logo-pgb.svg" alt="PGB crest" width="48" height="56">
          <div>
            <div class="logo-word">PUCK<span>GOLD</span></div>
            <span class="logo-sub">PGB LEAGUE</span>
          </div>
        </a>
        <nav class="nav-links" aria-label="Primary">${navHtml(isActive)}</nav>
        <div class="nav-actions">
          <a href="join.html" class="btn btn-og btn-sm">$36 OG Gold Puck</a>
          ${actionLinks
            .map((a) => `<a href="${a.href}" class="${a.cls} hide-sm">${a.label}</a>`)
            .join("")}
          <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="mobileDrawer" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-drawer" id="mobileDrawer">
        ${navHtml(isActive)}
        <a href="fantasy.html" class="${isActive("fantasy.html") ? "active" : ""}">Fan Zone</a>
        <a href="shop.html" class="${isActive("shop.html") ? "active" : ""}">Shop</a>
        <a href="signin.html" class="${isActive("signin.html") ? "active" : ""}">Sign In</a>
        <div class="drawer-ctas">
          <a href="join.html" class="btn btn-og btn-block">Join — $36 OG Gold Puck</a>
          <a href="fantasy.html" class="btn btn-sapphire btn-block">Enter Fan Zone</a>
          <a href="shop.html" class="btn btn-platinum btn-block">Shop merch</a>
        </div>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `@media (max-width:979px){.hide-sm{display:none!important}}`;
    document.head.appendChild(style);

    const btn = document.getElementById("menuBtn");
    const drawer = document.getElementById("mobileDrawer");
    btn?.addEventListener("click", () => {
      const open = drawer.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    if (footer) {
      footer.innerHTML = `
        <h2 class="display">The Golden Age Begins.</h2>
        <p>Join the Founding Four era. Support the league. Claim your OG Gold Puck.</p>
        <div class="cta-row" style="justify-content:center">
          <a href="join.html" class="btn btn-og">Get the $36 OG Gold Puck</a>
          <a href="fantasy.html" class="btn btn-champagne">Fan Zone</a>
          <a href="shop.html" class="btn btn-platinum">Shop</a>
        </div>
        <div class="foot-links">
          <a href="teams.html">Teams</a>
          <a href="bracket.html">Bracket</a>
          <a href="media.html">Media</a>
          <a href="brand.html">Brand kit</a>
          <a href="awards.html">Awards</a>
          <a href="signin.html">Sign In</a>
        </div>
        <div class="foot-note">PuckGoldBiz (PGB) Hockey League — Founding Four — Season One</div>
      `;
    }
  }

  // Fantasy countdown (7 days from first visit, stored)
  function initCountdown() {
    const root = document.getElementById("countdown");
    if (!root) return;
    const key = "pgb-fomo-end";
    let end = localStorage.getItem(key);
    if (!end) {
      end = String(Date.now() + 7 * 24 * 60 * 60 * 1000);
      localStorage.setItem(key, end);
    }
    end = Number(end);
    const tick = () => {
      const diff = Math.max(0, end - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      root.innerHTML = `
        <div><strong>${d}</strong><span>Days</span></div>
        <div><strong>${String(h).padStart(2, "0")}</strong><span>Hrs</span></div>
        <div><strong>${String(m).padStart(2, "0")}</strong><span>Min</span></div>
        <div><strong>${String(s).padStart(2, "0")}</strong><span>Sec</span></div>
      `;
    };
    tick();
    setInterval(tick, 1000);
  }

  document.addEventListener("DOMContentLoaded", () => {
    mount();
    initCountdown();
  });
})();
