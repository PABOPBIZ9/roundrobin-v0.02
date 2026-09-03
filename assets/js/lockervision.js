/**
 * Shared LockerVision UI helpers — ice stage, kit cards, image resolve.
 */
(function () {
  const LV = () => window.PGBLockerVision;

  function tryImages(sources, onHit, onMiss) {
    let i = 0;
    const next = () => {
      if (i >= sources.length) {
        onMiss && onMiss();
        return;
      }
      const src = sources[i++];
      if (!src) return next();
      const img = new Image();
      img.onload = () => onHit(src);
      img.onerror = next;
      img.src = src;
    };
    next();
  }

  /** SVG hockey kit silhouette when photos aren't dropped yet */
  function kitSilhouette(team, kit, uid) {
    const shell = kit?.shell || team.colorDeep || "#111";
    const accent = kit?.accent || team.color || "#d4af37";
    const sec = kit?.secondary || "#fff";
    const mono = (team.mono || "?").slice(0, 1);
    const gid = `kit-${team.slug}-${uid != null ? uid : "0"}`;
    return `
<svg class="lv-sil" viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="55%" stop-color="${shell}"/>
      <stop offset="100%" stop-color="${shell}"/>
    </linearGradient>
  </defs>
  <!-- jersey -->
  <path d="M40 48 L70 40 L80 70 L100 62 L120 70 L130 40 L160 48 L175 95 L155 105 L150 200 L50 200 L45 105 L25 95 Z"
        fill="url(#${gid})" stroke="${sec}" stroke-width="2"/>
  <text x="100" y="140" text-anchor="middle" fill="${sec}" font-family="Arial Black, sans-serif" font-size="48" font-weight="900">${mono}</text>
  <!-- pants -->
  <path d="M55 200 L145 200 L150 250 L125 255 L100 220 L75 255 L50 250 Z" fill="${shell}" stroke="${accent}" stroke-width="2"/>
  <!-- pads hint -->
  <ellipse cx="70" cy="110" rx="14" ry="22" fill="${accent}" opacity=".55"/>
  <ellipse cx="130" cy="110" rx="14" ry="22" fill="${accent}" opacity=".55"/>
  <!-- helmet -->
  <ellipse cx="100" cy="28" rx="28" ry="22" fill="${shell}" stroke="${sec}" stroke-width="2"/>
  <rect x="78" y="32" width="44" height="10" rx="2" fill="${sec}" opacity=".35"/>
  <!-- gloves -->
  <ellipse cx="28" cy="120" rx="12" ry="16" fill="${accent}"/>
  <ellipse cx="172" cy="120" rx="12" ry="16" fill="${accent}"/>
  <!-- skates -->
  <path d="M60 255 L85 255 L88 268 L58 268 Z" fill="#222" stroke="${sec}" stroke-width="1"/>
  <path d="M115 255 L140 255 L142 268 L112 268 Z" fill="#222" stroke="${sec}" stroke-width="1"/>
</svg>`;
  }

  function rinkSvg(team) {
    const c = team?.color || "#3f6db8";
    const d = team?.colorDeep || "#1e3a8a";
    return `
<svg class="lv-rink-svg" viewBox="0 0 360 180" xmlns="http://www.w3.org/2000/svg" aria-label="Ice rink schematic">
  <rect width="360" height="180" rx="40" fill="#e8f0f8"/>
  <rect x="6" y="6" width="348" height="168" rx="36" fill="none" stroke="${d}" stroke-width="4"/>
  <line x1="180" y1="6" x2="180" y2="174" stroke="${c}" stroke-width="2"/>
  <circle cx="180" cy="90" r="28" fill="none" stroke="${c}" stroke-width="2"/>
  <circle cx="180" cy="90" r="4" fill="${d}"/>
  <rect x="6" y="55" width="28" height="70" fill="none" stroke="${d}" stroke-width="3"/>
  <rect x="326" y="55" width="28" height="70" fill="none" stroke="${d}" stroke-width="3"/>
  <circle cx="90" cy="90" r="18" fill="none" stroke="#c44" stroke-width="1.5" opacity=".7"/>
  <circle cx="270" cy="90" r="18" fill="none" stroke="#c44" stroke-width="1.5" opacity=".7"/>
  <text x="180" y="96" text-anchor="middle" fill="${d}" font-family="Arial Black,sans-serif" font-size="14" opacity=".35">${team?.code || "PGB"}</text>
</svg>`;
  }

  function resolveKitHero(teamSlug, kitId, gameId, side, imgEl, fallbackEl) {
    const p = LV().paths(teamSlug, kitId);
    const sources = [];
    if (gameId && side) sources.push(p.game(gameId, side));
    sources.push(p.hero, p.jersey, p.flat);
    if (kitId === "home") sources.push(p.homeFlat);
    if (kitId === "away") sources.push(p.awayFlat);
    tryImages(
      sources,
      (src) => {
        imgEl.src = src;
        imgEl.hidden = false;
        if (fallbackEl) fallbackEl.hidden = true;
      },
      () => {
        imgEl.hidden = true;
        if (fallbackEl) fallbackEl.hidden = false;
      }
    );
  }

  function kitCardHTML(team, kitId, opts = {}) {
    const kit = LV().kitFor(team.slug, kitId);
    if (!kit) return "";
    const href = opts.href || `lv-outfit.html?team=${encodeURIComponent(team.slug)}&kit=${kitId}`;
    const ed = LV().editions.find((e) => e.id === kitId);
    return `
      <a class="lv-kit-card" href="${href}" style="--team:${team.color};--deep:${team.colorDeep}">
        <span class="lv-kit-badge" style="background:${team.colorDeep}">${team.short}</span>
        <div class="lv-kit-stage">
          <div class="lv-kit-ice"></div>
          <img class="lv-kit-img" alt="" hidden data-team="${team.slug}" data-kit="${kitId}">
          <div class="lv-kit-fallback">${kitSilhouette(team, kit)}</div>
        </div>
        <div class="lv-kit-meta">
          <strong>${kit.name}</strong>
          <span>${ed?.name || kitId}</span>
        </div>
      </a>`;
  }

  function hydrateKitCards(root = document) {
    root.querySelectorAll(".lv-kit-img[data-team]").forEach((img) => {
      const fallback = img.parentElement.querySelector(".lv-kit-fallback");
      resolveKitHero(img.dataset.team, img.dataset.kit, null, null, img, fallback);
    });
  }

  function gameCardHTML(g) {
    const eg = LV().enrichGame(g);
    const home = LV().teamBySlug(g.home);
    const away = LV().teamBySlug(g.away);
    if (!home || !away) return "";
    const d = new Date(g.date + "T12:00:00");
    const dateLabel = d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" }).toUpperCase();
    return `
      <a class="lv-game-card" href="lv-game.html?gameid=${encodeURIComponent(g.id)}">
        <div class="lv-gc-date">${dateLabel} · ${g.time}</div>
        <div class="lv-gc-match">
          <div class="lv-gc-side">
            <span class="lv-gc-mono" style="background:${away.colorDeep}">${away.mono}</span>
            <b>${away.short}</b>
            <small>${g.outfitAway}</small>
          </div>
          <div class="lv-gc-vs">VS</div>
          <div class="lv-gc-side">
            <span class="lv-gc-mono" style="background:${home.colorDeep}">${home.mono}</span>
            <b>${home.short}</b>
            <small>${g.outfitHome}</small>
          </div>
        </div>
        <div class="lv-gc-foot">${g.venue} · ${g.status}${g.score && g.score !== "Upcoming" ? " · " + g.score : ""}</div>
      </a>`;
  }

  function subnav(active) {
    const links = [
      ["lockervision.html", "Home", "home"],
      ["kit-studio.html", "Kit Studio", "studio"],
      ["lv-schedule.html", "Schedule", "schedule"],
      ["lv-edition.html?edition=home", "Editions", "editions"],
      ["lv-team.html", "Teams", "teams"],
      ["lv-about.html", "About", "about"],
    ];
    return `
      <nav class="lv-subnav" aria-label="LockerVision">
        <a class="lv-brand" href="lockervision.html">
          <img src="assets/brand/retro/pgb-league-shimmer-still.png" alt="" width="28" height="28">
          <span>LockerVision</span>
          <em>| Every Locker, Every Player, Every Game.</em>
        </a>
        <div class="lv-subnav-links" role="list">
          ${links
            .map(
              ([href, label, key]) =>
                `<a href="${href}" class="${active === key ? "is-active" : ""}">${label}</a>`
            )
            .join("")}
          <a href="shop.html#best" class="lv-shop">Shop</a>
        </div>
      </nav>`;
  }

  function mobileDock(links) {
    /* links: [{href, label, primary?}] */
    if (!links?.length) return "";
    return `<nav class="lv-dock" aria-label="Quick actions">${links
      .map(
        (l) =>
          `<a href="${l.href}" class="${l.primary ? "primary" : ""}">${l.label}</a>`
      )
      .join("")}</nav>`;
  }

  function teamFilterBar(activeSlug) {
    const teams = window.PGBTeams?.all() || [];
    return `
      <div class="lv-team-bar" role="navigation" aria-label="Filter by team">
        <a href="lv-schedule.html" class="lv-team-pill ${!activeSlug ? "is-active" : ""}">All</a>
        ${teams
          .map(
            (t) => `
          <a href="lv-team.html?team=${encodeURIComponent(t.slug)}" class="lv-team-pill ${activeSlug === t.slug ? "is-active" : ""}" title="${t.name}">
            <span style="background:${t.colorDeep}">${t.mono}</span>
            ${t.short}
          </a>`
          )
          .join("")}
      </div>`;
  }

  window.PGBLVUI = {
    kitSilhouette,
    rinkSvg,
    resolveKitHero,
    kitCardHTML,
    hydrateKitCards,
    gameCardHTML,
    subnav,
    teamFilterBar,
    mobileDock,
    tryImages,
  };
})();
