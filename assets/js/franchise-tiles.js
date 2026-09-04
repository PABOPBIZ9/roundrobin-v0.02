/**
 * Founding Four franchise tiles — logos, kit gear, roster strip.
 * Tries vault PNG paths first; SVG / kit silhouettes until assets drop.
 */
(function () {
  const TILE_CLASS = {
    "miami-mighty-geckz": "t-miami",
    "mclean-cardinals": "t-mclean",
    "washington-whoomp": "t-wash",
    "chattanooga-choo-choo": "t-chatt",
  };

  const ARENA_SHORT = {
    "miami-mighty-geckz": "Neon Reef — Miami",
    "mclean-cardinals": "Climate Cardinal Gardens — McLean",
    "washington-whoomp": "District Dome — Wash.",
    "chattanooga-choo-choo": "Terminal Arena — Chatt.",
  };

  const DISPLAY_NAME = {
    "miami-mighty-geckz": "Mighty Geckz",
    "mclean-cardinals": "Climate Cardinals",
    "washington-whoomp": "Whoomp!",
    "chattanooga-choo-choo": "Choo Choo",
  };

  /** Primary stadium film per team — never cross-wire Founding Four arenas */
  const STADIUM_FILM = {
    "miami-mighty-geckz": "assets/teams/miami-mighty-geckz/03-Stadiums/stadium-01/film.mp4",
    "mclean-cardinals": "assets/teams/mclean-cardinals/03-Stadiums/stadium-01/film.mp4",
    "washington-whoomp": "assets/teams/washington-whoomp/03-Stadiums/stadium-01/film.mp4",
    "chattanooga-choo-choo": "assets/teams/chattanooga-choo-choo/03-Stadiums/stadium-01/film.mp4",
  };

  let stadiumCatalog = null;

  async function loadStadiumCatalog() {
    if (stadiumCatalog) return stadiumCatalog;
    try {
      const res = await fetch("assets/js/stadium-videos.json?v=2");
      if (res.ok) stadiumCatalog = await res.json();
    } catch (_) {}
    stadiumCatalog = stadiumCatalog || {};
    return stadiumCatalog;
  }

  function stadiumSrc(slug, team) {
    const fromJson = stadiumCatalog?.[slug]?.stadiums?.["stadium-01"];
    if (fromJson) return fromJson;
    if (STADIUM_FILM[slug]) return STADIUM_FILM[slug];
    return `${team.folder}03-Stadiums/stadium-01/film.mp4`;
  }

  function logoSources(slug) {
    if (window.PGBCharacterArt?.logoSources) return window.PGBCharacterArt.logoSources(slug);
    const base = `assets/teams/${slug}/01-Logos-Marks`;
    return [`${base}/primary.png`, `${base}/secondary.png`, `${base}/app-icon.png`, `${base}/mono.png`];
  }

  function crestSvg(slug, team, uid) {
    if (window.PGBCharacterArt?.logoSvg) return window.PGBCharacterArt.logoSvg(slug, team, uid);
    const c = team.color || "#163a74";
    const d = team.colorDeep || "#0b1220";
    const gid = `crest-${slug}-${uid}`;
    const maps = {
      "miami-mighty-geckz": `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="${d}" stroke="${c}" stroke-width="3"/>
        <path d="M38 72 Q60 38 82 72 L72 78 Q60 58 48 78 Z" fill="${c}"/>
        <circle cx="48" cy="52" r="5" fill="#fff"/><circle cx="48" cy="52" r="2.5" fill="${d}"/>
        <path d="M78 48 L92 44 L88 56 Z" fill="${c}"/>
      </svg>`,
      "mclean-cardinals": `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="${d}" stroke="${c}" stroke-width="3"/>
        <path d="M60 28 C44 40 36 58 40 76 C48 68 52 58 60 52 C68 58 72 68 80 76 C84 58 76 40 60 28Z" fill="${c}"/>
        <path d="M52 64 L48 82 L56 74 Z M68 64 L72 82 L64 74 Z" fill="#f5e6b3"/>
      </svg>`,
      "washington-whoomp": `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="${d}" stroke="${c}" stroke-width="3"/>
        <text x="60" y="78" text-anchor="middle" fill="${c}" font-family="Arial Black,sans-serif" font-size="52" font-weight="900">W</text>
        <path d="M28 38 L38 28 L92 28 L102 38 L92 48 L38 48 Z" fill="#e5e7eb" opacity=".85"/>
      </svg>`,
      "chattanooga-choo-choo": `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="${d}" stroke="${c}" stroke-width="3"/>
        <circle cx="60" cy="60" r="22" fill="none" stroke="${c}" stroke-width="6"/>
        <circle cx="60" cy="60" r="8" fill="${c}"/>
        <rect x="34" y="78" width="52" height="14" rx="4" fill="${c}"/>
        <rect x="42" y="34" width="36" height="18" rx="3" fill="#f5e6b3"/>
      </svg>`,
    };
    return maps[slug] || `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="${d}"/><text x="60" y="72" text-anchor="middle" fill="#fff" font-size="40">${team.mono || "?"}</text></svg>`;
  }

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

  function gearSources(team, slot) {
    const LV = window.PGBLockerVision;
    if (!LV) return [];
    const p = LV.paths(team.slug, "home");
    const file = slot.file;
    return [`${p.hero.replace(/hero\.png$/, file)}`, p[ slot.id ] || `${p.jersey.replace(/jersey\.png$/, file)}`].filter(Boolean);
  }

  function miniGearSvg(slotId, team, kit) {
    if (window.PGBCharacterArt?.gearSvg) {
      const svg = window.PGBCharacterArt.gearSvg(slotId, team, kit);
      if (svg) return svg;
    }
    const shell = kit?.shell || team.colorDeep;
    const accent = kit?.accent || team.color;
    if (slotId === "helmet") {
      return `<svg viewBox="0 0 48 48"><ellipse cx="24" cy="20" rx="16" ry="12" fill="${shell}" stroke="${accent}" stroke-width="2"/><rect x="12" y="22" width="24" height="6" rx="2" fill="${accent}" opacity=".5"/></svg>`;
    }
    if (slotId === "pads") {
      return `<svg viewBox="0 0 48 48"><ellipse cx="16" cy="24" rx="8" ry="14" fill="${accent}" opacity=".75"/><ellipse cx="32" cy="24" rx="8" ry="14" fill="${accent}" opacity=".75"/></svg>`;
    }
    if (slotId === "jersey") {
      return `<svg viewBox="0 0 48 48"><path d="M10 14 L18 10 L24 18 L30 10 L38 14 L42 26 L36 30 L34 42 L14 42 L12 30 L6 26 Z" fill="${shell}" stroke="${accent}" stroke-width="1.5"/></svg>`;
    }
    return "";
  }

  function hydrateGearSlot(el, team, slot, kit) {
    const img = el.querySelector(".franchise-gear-img");
    const fb = el.querySelector(".franchise-gear-fb");
    const sources = gearSources(team, slot);
    tryImages(
      sources,
      (src) => {
        img.src = src;
        img.hidden = false;
        fb.hidden = true;
      },
      () => {
        img.hidden = true;
        fb.hidden = false;
        fb.innerHTML = miniGearSvg(slot.id, team, kit);
      }
    );
  }

  function playerChipHtml(p, team, captain) {
    const char = window.PGBCharacters?.forPlayer(p, team);
    const avatar =
      window.PGBCharacterArt?.playerAvatarSvg(p, team, char, p.id) ||
      `<span class="franchise-player-fb">${p.num}</span>`;
    const power = char?.powerDef
      ? `<span class="franchise-power" title="${char.powerDef.desc}">${char.powerDef.icon}</span>`
      : "";
    return `<span class="franchise-player${captain ? " is-captain" : ""}" title="${char?.displayName || p.name} · ${char?.powerDef?.name || ""}">
      <img class="franchise-player-img" alt="" hidden data-player="${p.slot}">
      <span class="franchise-player-viz">${avatar}</span>
      ${power}
      <em>${captain ? "C · " : ""}${char?.codename || p.name.split(" ").pop()}</em>
    </span>`;
  }

  function tileHtml(team, uid) {
    const cls = TILE_CLASS[team.slug] || "";
    const kit = window.PGBLockerVision?.kitFor(team.slug, "home");
    const captain = team.players.find((p) => p.role === "Captain") || team.players[0];
    const roster = team.players.filter((p) => p !== captain);
    const mascot = window.PGBCharacters?.teamMeta(team.slug)?.mascot;
    const gearSlots = window.PGBLockerVision?.gearSlots?.slice(0, 3) || [
      { id: "jersey", label: "Jersey", file: "jersey.png" },
      { id: "helmet", label: "Helmet", file: "helmet.png" },
      { id: "pads", label: "Pads", file: "pads.png" },
    ];
    const stadium = stadiumSrc(team.slug, team);

    return `
    <a class="tile franchise-tile ${cls}" href="team.html?team=${encodeURIComponent(team.slug)}" data-team="${team.slug}">
      <span class="seed">#${team.seed} Seed</span>
      <div class="franchise-visual">
        <div class="franchise-logo-wrap">
          <img class="franchise-logo" alt="${team.name} logo" hidden>
          <div class="franchise-logo-fb">${crestSvg(team.slug, team, uid)}</div>
        </div>
        <div class="franchise-kit-stage franchise-stadium-stage" style="--team:${team.color};--deep:${team.colorDeep}">
          <video class="franchise-stadium-vid" muted playsinline loop preload="metadata" src="${stadium}" aria-label="${team.arena} arena"></video>
          <div class="franchise-kit-ice"></div>
          <img class="franchise-kit-img" alt="${team.short} home kit" hidden data-team="${team.slug}" data-kit="home">
          <div class="franchise-kit-fb">${window.PGBLockerVisionUI?.kitSilhouette(team, kit, uid) || ""}</div>
        </div>
      </div>
      <div class="franchise-gear" aria-label="Home kit gear">
        ${gearSlots
          .map(
            (s) => `
          <div class="franchise-gear-slot" data-gear="${s.id}" title="${s.label}">
            <img class="franchise-gear-img" alt="${s.label}" hidden>
            <div class="franchise-gear-fb"></div>
            <span>${s.label}</span>
          </div>`
          )
          .join("")}
      </div>
      <h3>${DISPLAY_NAME[team.slug] || team.short}</h3>
      ${mascot ? `<div class="franchise-mascot">${mascot.name} · ${mascot.trait}</div>` : ""}
      <div class="arena">${ARENA_SHORT[team.slug] || team.city}</div>
      <div class="motto">"${team.motto}"</div>
      <div class="franchise-players" aria-label="9 digital characters">
        ${captain ? playerChipHtml(captain, team, true) : ""}
        ${roster.map((p) => playerChipHtml(p, team, false)).join("")}
      </div>
      <div class="record">${team.record}</div>
      <span class="franchise-lv-link">LockerVision kit →</span>
    </a>`;
  }

  function hydrateTile(tile) {
    const slug = tile.dataset.team;
    const team = window.PGBTeams?.bySlug(slug);
    if (!team) return;
    const kit = window.PGBLockerVision?.kitFor(slug, "home");

    const logoImg = tile.querySelector(".franchise-logo");
    const logoFb = tile.querySelector(".franchise-logo-fb");
    tryImages(
      logoSources(slug),
      (src) => {
        logoImg.src = src;
        logoImg.hidden = false;
        logoFb.hidden = true;
      },
      () => {
        logoImg.hidden = true;
        logoFb.hidden = false;
      }
    );

    const kitImg = tile.querySelector(".franchise-kit-img");
    const kitFb = tile.querySelector(".franchise-kit-fb");
    const stadiumVid = tile.querySelector(".franchise-stadium-vid");
    if (stadiumVid) {
      stadiumVid.addEventListener("loadeddata", () => {
        stadiumVid.classList.add("is-ready");
        if (kitFb) kitFb.style.opacity = "0.35";
      });
      stadiumVid.addEventListener("error", () => {
        stadiumVid.hidden = true;
      });
    }
    if (kitImg && window.PGBLockerVisionUI) {
      window.PGBLockerVisionUI.resolveKitHero(slug, "home", null, null, kitImg, kitFb);
    }

    tile.querySelectorAll(".franchise-gear-slot").forEach((slotEl) => {
      const id = slotEl.dataset.gear;
      const slot = window.PGBLockerVision?.gearSlots?.find((g) => g.id === id);
      if (slot) hydrateGearSlot(slotEl, team, slot, kit);
    });

    tile.querySelectorAll(".franchise-player").forEach((chip) => {
      const img = chip.querySelector(".franchise-player-img");
      if (!img) return;
      const slot = img.dataset.player;
      const fb = chip.querySelector(".franchise-player-viz");
      const player = team.players.find((p) => p.slot === slot);
      const sources = window.PGBCharacterArt?.playerSources
        ? window.PGBCharacterArt.playerSources(team, slot)
        : [`${team.folder}04-Players/${slot}/headshot.png`, `${team.folder}04-Players/${slot}/photo.png`];
      tryImages(
        sources,
        (src) => {
          img.src = src;
          img.hidden = false;
          if (fb) fb.hidden = true;
        },
        () => {
          img.hidden = true;
          if (fb) fb.hidden = false;
        }
      );
    });
  }

  async function render(containerId) {
    const root = document.getElementById(containerId);
    if (!root || !window.PGBTeams) return;
    await loadStadiumCatalog();
    const teams = window.PGBTeams.all()
      .filter((t) => !t.expansion)
      .sort((a, b) => (a.seed || 99) - (b.seed || 99));
    root.innerHTML = teams.map((t, i) => tileHtml(t, i)).join("");
    root.querySelectorAll(".franchise-tile").forEach(hydrateTile);
    root.querySelectorAll(".franchise-stadium-vid").forEach((v) => {
      v.play().catch(() => {});
    });
  }

  window.PGBFranchiseTiles = { render, logoSources, crestSvg };
})();
