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

  // VeeFriends-style sound + preview toggle (starts ON)
  function initAVExperience() {
    const STORAGE_KEY = "pgb-av-on";
    const playlist = [
      "assets/media/majestic-frost.mp3",
      "assets/media/sport-action.mp3",
    ];
    const saved = localStorage.getItem(STORAGE_KEY);
    // Default ON unless user previously turned it off
    let enabled = saved === null ? true : saved === "1";
    let trackIndex = 0;

    const audio = new Audio(playlist[trackIndex]);
    audio.preload = "auto";
    audio.volume = 0.55;
    audio.addEventListener("ended", () => {
      trackIndex = (trackIndex + 1) % playlist.length;
      audio.src = playlist[trackIndex];
      if (enabled) audio.play().catch(() => {});
    });

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "av-toggle";
    btn.id = "avToggle";
    btn.innerHTML = `
      <span class="av-toggle-tip" id="avTip">Sound on</span>
      <span class="av-bars" aria-hidden="true">
        <span></span><span></span><span></span><span></span>
      </span>
    `;
    document.body.appendChild(btn);

    const stages = document.querySelectorAll("[data-av-stage]");
    const scenes = Array.from(document.querySelectorAll(".hero-scene"));
    const video = document.getElementById("heroVideo");
    if (video) {
      video.muted = true;
      video.playsInline = true;
      video.loop = true;
    }

    let sceneTimer = null;
    let sceneIndex = 0;
    let unlockBound = false;

    function setUi() {
      btn.setAttribute("aria-pressed", enabled ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        enabled ? "Mute sound and pause previews" : "Play sound and previews"
      );
      const tip = document.getElementById("avTip");
      if (tip) tip.textContent = enabled ? "Sound on" : "Sound off";
      stages.forEach((el) => {
        el.classList.toggle("is-av-on", enabled);
        el.classList.toggle("is-av-off", !enabled);
      });
      document.documentElement.classList.toggle("av-on", enabled);
      document.documentElement.classList.toggle("av-off", !enabled);
    }

    function syncVideo() {
      if (!video) return;
      const isVideoScene = scenes[sceneIndex]?.classList.contains("hero-scene-video");
      if (enabled && isVideoScene) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    }

    function showScene(i) {
      if (!scenes.length) return;
      scenes.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
      syncVideo();
    }

    function startScenes() {
      if (!scenes.length) return;
      showScene(sceneIndex);
      if (sceneTimer) return;
      const tick = () => {
        if (!enabled) return;
        const delay = scenes[sceneIndex]?.classList.contains("hero-scene-video") ? 10000 : 5200;
        sceneTimer = setTimeout(() => {
          sceneIndex = (sceneIndex + 1) % scenes.length;
          showScene(sceneIndex);
          tick();
        }, delay);
      };
      tick();
    }

    function stopScenes() {
      if (sceneTimer) {
        clearTimeout(sceneTimer);
        sceneTimer = null;
      }
      if (video) video.pause();
    }

    async function tryPlay() {
      if (!enabled) return;
      try {
        await audio.play();
        syncVideo();
      } catch (_) {
        // Autoplay with sound blocked — keep UI ON and unlock on first gesture
        if (!unlockBound) {
          unlockBound = true;
          const unlock = async () => {
            if (!enabled) return;
            try {
              await audio.play();
              syncVideo();
            } catch (_) {}
            window.removeEventListener("pointerdown", unlock);
            window.removeEventListener("keydown", unlock);
            unlockBound = false;
          };
          window.addEventListener("pointerdown", unlock, { once: true });
          window.addEventListener("keydown", unlock, { once: true });
        }
      }
    }

    function apply() {
      localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
      setUi();
      if (enabled) {
        startScenes();
        tryPlay();
      } else {
        audio.pause();
        stopScenes();
      }
    }

    btn.addEventListener("click", () => {
      enabled = !enabled;
      apply();
    });

    // Kick off in ON state (or restore prior preference)
    apply();
  }

  document.addEventListener("DOMContentLoaded", () => {
    mount();
    initCountdown();
    initAVExperience();
  });
})();

