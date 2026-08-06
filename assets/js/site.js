(function () {
  const THEME_KEY = "pgb-theme";
  function getTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme === "light" ? "light" : "dark");
    localStorage.setItem(THEME_KEY, theme === "light" ? "light" : "dark");
    const btn = document.getElementById("themeToggle");
    if (btn) {
      const isLight = theme === "light";
      btn.setAttribute("aria-pressed", isLight ? "true" : "false");
      btn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
      btn.title = isLight ? "Dark mode" : "Light mode";
    }
  }
  applyTheme(getTheme());

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
    { href: "fantasy.html", label: "Fan Zone", cls: "nav-chip" },
    { href: "shop.html", label: "Shop", cls: "nav-chip" },
    { href: "media.html", label: "Watch", cls: "nav-chip" },
    { href: "bracket.html", label: "Live Bracket", cls: "nav-chip" },
  ];

  const socials = [
    { name: "X", href: "https://x.com/puckgoldbiz", path: "M18 2h3l-7 8 8 10h-6l-5-6-5 6H0l8-9L1 2h6l4 5 5-5z" },
    { name: "TikTok", href: "https://www.tiktok.com/@puckgoldbiz", path: "M14 2c1 2.5 2.8 4 5.5 4.3V9c-1.7 0-3.2-.5-4.5-1.4V15a6 6 0 11-6-6c.3 0 .7 0 1 .1V12a3.2 3.2 0 100 6.3A3.2 3.2 0 0013.2 15V2h.8z" },
    { name: "YouTube", href: "https://www.youtube.com/@puckgoldbiz", path: "M2 6.5A2.5 2.5 0 014.5 4h11A2.5 2.5 0 0118 6.5v7a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 012 13.5v-7zM9 8.2v5.6l5-2.8-5-2.8z" },
    { name: "Instagram", href: "https://www.instagram.com/puckgoldbiz", path: "M7 2h6a5 5 0 015 5v6a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm6.5 2.2a1 1 0 100 2 1 1 0 000-2zM10 6.5A3.5 3.5 0 1010 13.5 3.5 3.5 0 0010 6.5z" },
    { name: "Facebook", href: "https://www.facebook.com/puckgoldbiz", path: "M11 20V11h3l.5-3H11V6.2c0-.9.3-1.5 1.6-1.5H15V2.1C14.5 2 13.5 2 12.4 2 9.8 2 8 3.5 8 6.5V8H5.5v3H8v9h3z" },
    { name: "Twitch", href: "https://www.twitch.tv/puckgoldbiz", path: "M3 2h14v10l-3 3h-3l-2 2H7v-2H3V2zm2 2v8h3v2l2-2h3l2-2V4H5zm7 2h2v4h-2V6zM8 6h2v4H8V6z" },
    { name: "Kick", href: "https://kick.com/puckgoldbiz", path: "M3 2h4v6l4-6h5L10 10l6 8h-5l-4-6v6H3V2z" },
    { name: "Club", href: "https://club.com/", path: "M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6zm0 3.5A2.5 2.5 0 1010 10.5 2.5 2.5 0 0010 5.5z" },
    { name: "Discord", href: "https://discord.gg/puckgoldbiz", path: "M15.5 4A11 11 0 0012.7 3l-.3.6A10 10 0 017.6 3l-.3-.1A11 11 0 004.5 4C2 7.6 1.5 11.1 1.7 14.5A11 11 0 006 16.7l.5-.8a7 7 0 01-1.3-.6l.3-.2a7.8 7.8 0 009 0l.3.2c-.4.3-.9.5-1.3.6l.5.8a11 11 0 004.3-2.2c.3-3.8-.5-7.3-2.8-10.5zM7.3 12.4c-.7 0-1.3-.7-1.3-1.5S6.6 9.4 7.3 9.4s1.3.7 1.3 1.5-.6 1.5-1.3 1.5zm5.4 0c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5z" },
    { name: "Telegram", href: "https://t.me/puckgoldbiz", path: "M2 10l16-7-3.2 14.2-4.4-3.4-2.4 2.3-.4-4.2L15 6.5 7.3 11.2 2 10z" },
    { name: "WhatsApp", href: "https://wa.me/", path: "M10 2a8 8 0 00-6.9 12.1L2 18l4-1a8 8 0 104-15zm0 2.3A5.7 5.7 0 1110 15.7c-.6 0-1.2-.1-1.8-.3l-.4-.1-2.3.6.6-2.2-.1-.4A5.7 5.7 0 0110 4.3zm3 7.3c-.2-.1-1-.5-1.1-.5s-.3-.1-.4.1-.5.5-.6.6-.2.1-.4 0a4.6 4.6 0 01-2.3-2c-.2-.3.2-.3.5-.7l.2-.3c.1-.1 0-.2 0-.3s-.4-1-.6-1.3-.3-.2-.4-.2h-.4c-.1 0-.3.1-.5.3s-.6.6-.6 1.5.7 1.7.8 1.9 1.3 2.1 3.3 2.8c1.2.4 1.7.4 2.3.3.4-.1 1.1-.5 1.3-1s.2-.8.1-.9-.1-.2-.3-.3z" },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/puckgoldbiz", path: "M4 7H1V19h3V7zm.2-4.2A1.8 1.8 0 112.4 4.6 1.8 1.8 0 014.2 2.8zM19 19h-3v-5.7c0-1.5-.5-2.5-1.8-2.5A2 2 0 0012 12.7V19H9V7h3v1.5A3.2 3.2 0 0115 7c2.4 0 4 1.5 4 4.7V19z" },
    { name: "Threads", href: "https://www.threads.net/@puckgoldbiz", path: "M12.3 7.2c.5-2.2-.4-3.8-2.5-3.8-2.4 0-3.6 1.9-3.6 4.5 0 3.3 1.7 5 4.5 5 1.3 0 2.5-.3 3.5-.8V14c-.8.4-1.8.6-3 .6-4 0-6.6-2.5-6.6-6.7C4.6 3.7 7 1.5 10.3 1.5c3 0 5 1.8 4.7 5.1-.1 1.5-.7 2.6-1.8 3.3.8-.2 1.4-.6 1.8-1.1.7-1 1-2.4 1-3.8h2c0 1.9-.4 3.7-1.5 5.1-.8 1-2 1.8-3.5 2.2v2.3c1.4-.3 2.7-.9 3.7-1.8 1.6-1.5 2.5-3.7 2.5-6.4H23c0 3.4-1.2 6.1-3.4 8-1.5 1.3-3.4 2.1-5.6 2.4v-2.3c3-.7 4.9-2.8 5-6.2-.1 1.7-.8 3.1-1.9 4-.5.4-1.1.7-1.8.9V12c1.2-.5 2-1.4 2.2-2.8.2-1.1 0-2.1-.5-2.9z" },
    { name: "Pinterest", href: "https://www.pinterest.com/puckgoldbiz", path: "M10 2a8 8 0 00-2.9 15.5c0-.7.1-1.7.4-2.5l1.4-5.8s-.3-.7-.3-1.7c0-1.6 1-2.8 2.1-2.8 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.1 0 3.6-2.7 3.6-5.8 0-2.4-1.6-4.2-4.5-4.2A4.7 4.7 0 005.8 8.6c0 1 .3 1.7.8 2.2l.2.2c-.1.3-.2.7-.2.9 0 .3-.2.7-.4.9A7 7 0 0110 3.5 6.5 6.5 0 0116.6 10c0 4.1-2.3 7.1-5.4 7.1-1.1 0-2.1-.6-2.4-1.3l-.7 2.5A8 8 0 0010 18a8 8 0 000-16z" },
    { name: "Snapchat", href: "https://www.snapchat.com/add/puckgoldbiz", path: "M10 2c3 0 5.2 2 5.2 5.2 0 1.7-.4 2.8-.4 4.1 0 .7.4 1.1 1.1 1.4.6.2 1.3.5 1.3 1.2 0 .7-.8 1.1-1.5 1.3-.3.1-.5.2-.5.4 0 .7.9 1.4 1.7 1.8.5.2.7.5.7.8 0 .7-1.1 1.2-2.6 1.2-1 0-1.6-.2-2.3-.2-.7 0-1.2.3-2.2.8-.6.3-1.3.5-2 .5C5.3 20 3 18.7 3 16.8c0-.6.3-1 .9-1.3.8-.4 1.8-1.1 1.8-1.9 0-.2-.2-.3-.5-.4C4.4 13 3.5 12.5 3.5 11.7c0-.7.7-1 1.3-1.2.7-.3 1.1-.7 1.1-1.4 0-1.3-.4-2.4-.4-4.1C5.5 4 7.2 2 10 2z" },
    { name: "Spotify", href: "https://open.spotify.com/user/puckgoldbiz", path: "M10 2a8 8 0 100 16 8 8 0 000-16zm3.6 11.5a.6.6 0 01-.8.2c-2.2-1.3-5-1.6-8.2-.9a.6.6 0 11-.3-1.2c3.5-.8 6.6-.4 9.1 1a.6.6 0 01.2.9zm1-2.3a.7.7 0 01-1 .3c-2.5-1.5-6.3-2-9.3-1.1a.7.7 0 01-.4-1.4c3.4-1 7.6-.4 10.5 1.3a.7.7 0 01.2 1zm.1-2.4C11.6 7.6 6.7 7.4 4 8.2a.9.9 0 11-.5-1.7c3.1-.9 8.5-.7 12 1.4a.9.9 0 01-.8 1.6z" },
    { name: "Rumble", href: "https://rumble.com/c/puckgoldbiz", path: "M3 5h4l3 5 3-5h4l-5 7.5L17 20h-4l-3-5-3 5H3l5-7.5L3 5z" },
    { name: "Whatnot", href: "https://www.whatnot.com/", path: "M3 4h14v3H3V4zm0 5h10v3H3V9zm0 5h14v3H3v-3z" },
    { name: "Parti", href: "https://parti.com/", path: "M10 2l2.4 5.2L18 8l-4 3.6L15.2 18 10 14.8 4.8 18 6 11.6 2 8l5.6-.8L10 2z" },
    { name: "Substack", href: "https://substack.com/@puckgoldbiz", path: "M2 3h16v2.5H2V3zm0 4.5h16V18l-8-4.5L2 18V7.5z" },
    { name: "Medium", href: "https://medium.com/@puckgoldbiz", path: "M2 5.5c0-.4.2-.6.5-.7l3.4-1.6c.2-.1.4 0 .4.2v11.7c0 .2-.1.3-.3.4l-3.3 1.6c-.4.2-.7 0-.7-.4V5.5zm5.2-.2l3.7 6.1v.1l3.7-6.1V16h-1.7V8.5L10.8 14h-.7L7.9 8.5V16H6.2V5.3h1zM18.4 5l1.4-.7c.3-.1.5 0 .5.3v10.8c0 .5-.3 1-.8 1.2l-1.6.7V5z" },
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
          <img class="logo-mark" src="assets/brand/lockup/primary-master.png?v=3" alt="PGB" width="42" height="70" style="width:42px;height:auto;object-fit:contain">
          <div>
            <div class="logo-word">PUCK<span>GOLD</span></div>
            <span class="logo-sub">PGB LEAGUE</span>
          </div>
        </a>
        <nav class="nav-links" aria-label="Primary">${navHtml(isActive)}</nav>
        <div class="nav-actions">
          <div class="nav-chips hide-sm">
            ${actionLinks
              .map((a) => `<a href="${a.href}" class="${a.cls}${isActive(a.href) ? " active" : ""}">${a.label}</a>`)
              .join("")}
          </div>
          <button class="theme-toggle" id="themeToggle" type="button" aria-pressed="false" aria-label="Switch to light mode" title="Light mode">
            <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 0110.5 3 7 7 0 1019 16.5c.7-.6 1.4-1.3 2-2z"/></svg>
            <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          </button>
          <a href="join.html" class="btn btn-og btn-sm">$36 OG Gold Puck</a>
          <a href="signin.html" class="btn btn-ghost btn-sm hide-sm">Sign In</a>
          <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="mobileDrawer" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-drawer" id="mobileDrawer">
        ${navHtml(isActive)}
        <a href="fantasy.html" class="${isActive("fantasy.html") ? "active" : ""}">Fan Zone</a>
        <a href="shop.html" class="${isActive("shop.html") ? "active" : ""}">Shop</a>
        <a href="media.html" class="${isActive("media.html") ? "active" : ""}">Watch</a>
        <a href="bracket.html" class="${isActive("bracket.html") ? "active" : ""}">Live Bracket</a>
        <a href="signin.html" class="${isActive("signin.html") ? "active" : ""}">Sign In</a>
        <div class="drawer-ctas">
          <a href="join.html" class="btn btn-og btn-block">Join — $36 OG Gold Puck</a>
        </div>
      </div>
    `;

    const style = document.createElement("style");
    style.textContent = `
      @media (max-width:1100px){.hide-sm{display:none!important}}
      .nav-chips{display:flex;align-items:center;gap:.35rem;margin-right:.15rem}
      .nav-chip{
        font-size:.68rem;font-weight:700;letter-spacing:.06em;text-transform:uppercase;
        color:var(--muted);padding:.45rem .65rem;border-radius:999px;border:1px solid transparent;
      }
      .nav-chip:hover,.nav-chip.active{color:var(--gold-bright);border-color:rgba(212,175,55,.35);background:rgba(212,175,55,.08)}
    `;
    document.head.appendChild(style);

    const btn = document.getElementById("menuBtn");
    const drawer = document.getElementById("mobileDrawer");
    btn?.addEventListener("click", () => {
      const open = drawer.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    applyTheme(getTheme());
    document.getElementById("themeToggle")?.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });

    if (footer) {
      const socialHtml = socials
        .map(
          (s) => `
          <a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}" title="${s.name}">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="${s.path}"/></svg>
          </a>`
        )
        .join("");

      footer.innerHTML = `
        <div class="footer-shell">
          <div class="footer-top">
            <div class="footer-brand">
              <a class="footer-logo" href="index.html" aria-label="PuckGold home">
                <img src="assets/brand/lockup/primary-master.png?v=3" alt="PGB" width="56" height="80">
                <div class="logo-word">PUCK<span>GOLD</span></div>
              </a>
              <p>PuckGoldBiz (PGB) — the Founding Four era. Premium membership, Fan Zone rewards, and the coldest game on earth.</p>
              <div class="cta-row" style="margin-top:1rem">
                <a href="join.html" class="btn btn-og btn-sm">$36 OG Gold Puck</a>
                <a href="fantasy.html" class="btn btn-sapphire btn-sm">Fan Zone</a>
              </div>
            </div>
            <div class="footer-col">
              <h4>League</h4>
              <a href="teams.html">Teams</a>
              <a href="rosters.html">Rosters</a>
              <a href="stadiums.html">Stadiums</a>
              <a href="bracket.html">Live Bracket</a>
              <a href="awards.html">Awards</a>
              <a href="standings.html" onclick="location.href='bracket.html';return false;">Standings</a>
            </div>
            <div class="footer-col">
              <h4>Fans</h4>
              <a href="fantasy.html">Fan Zone / Fantasy</a>
              <a href="shop.html">Shop</a>
              <a href="media.html">Watch</a>
              <a href="join.html">Membership</a>
              <a href="signin.html">Sign In</a>
              <a href="brand.html">Brand Kit</a>
            </div>
            <div class="footer-col">
              <h4>Company</h4>
              <a href="https://puckgold.com" target="_blank" rel="noopener">PuckGold.com</a>
              <a href="https://x.com/puckgoldbiz" target="_blank" rel="noopener">Newsroom / X</a>
              <a href="media.html">Media Center</a>
              <a href="mailto:hello@puckgold.com">Contact</a>
              <a href="signin.html">Support</a>
            </div>
          </div>
          <div class="social-grid" aria-label="Social media">${socialHtml}</div>
          <div class="footer-bottom">
            <div class="foot-note">© 2026 PuckGoldBiz (PGB). All rights reserved.</div>
            <div class="footer-legal">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Cookies</a>
              <a href="#">Accessibility</a>
            </div>
          </div>
        </div>
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

  // Sound + icon/text scene carousel (no video)
  function initAVExperience() {
    const STORAGE_KEY = "pgb-av-on";
    const playlist = [
      "assets/media/majestic-frost.mp3",
      "assets/media/sport-action.mp3",
    ];
    const saved = localStorage.getItem(STORAGE_KEY);
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
    const heroSlot = document.getElementById("heroAvSlot");
    if (heroSlot) {
      heroSlot.appendChild(btn);
    } else {
      document.body.appendChild(btn);
    }

    const stages = document.querySelectorAll("[data-av-stage]");
    const scenes = Array.from(document.querySelectorAll(".hero-scene"));

    let sceneTimer = null;
    let sceneIndex = 0;
    let unlockBound = false;

    function setUi() {
      btn.setAttribute("aria-pressed", enabled ? "true" : "false");
      btn.setAttribute(
        "aria-label",
        enabled ? "Mute sound and pause scene previews" : "Play sound and scene previews"
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

    function showScene(i) {
      if (!scenes.length) return;
      scenes.forEach((s, idx) => s.classList.toggle("is-active", idx === i));
    }

    function startScenes() {
      if (!scenes.length) return;
      showScene(sceneIndex);
      if (sceneTimer) return;
      const tick = () => {
        if (!enabled) return;
        sceneTimer = setTimeout(() => {
          sceneIndex = (sceneIndex + 1) % scenes.length;
          showScene(sceneIndex);
          tick();
        }, 4800);
      };
      tick();
    }

    function stopScenes() {
      if (sceneTimer) {
        clearTimeout(sceneTimer);
        sceneTimer = null;
      }
    }

    async function tryPlay() {
      if (!enabled) return;
      try {
        await audio.play();
      } catch (_) {
        if (!unlockBound) {
          unlockBound = true;
          const unlock = async () => {
            if (!enabled) return;
            try {
              await audio.play();
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

    apply();
  }

  document.addEventListener("DOMContentLoaded", () => {
    mount();
    initCountdown();
    initAVExperience();
  });
})();

