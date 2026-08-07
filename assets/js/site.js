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

  // Capture affiliate / profile share refs (7-day window)
  try {
    const ref = new URLSearchParams(location.search).get("ref");
    if (ref) {
      localStorage.setItem("pgb-aff-ref", ref);
      localStorage.setItem("pgb-aff-ref-at", String(Date.now()));
    }
  } catch (_) {}

  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const active = path === "" ? "index.html" : path;

  // LIV-clean IA — Bracket / Leaderboard appears once only
  const teamsLinks = [
    { href: "teams.html", label: "All Teams" },
    { href: "team.html?team=miami-mighty-geckz", label: "Mighty Geckz" },
    { href: "team.html?team=mclean-cardinals", label: "Cardinals" },
    { href: "team.html?team=washington-whoomp", label: "Whoomp!" },
    { href: "team.html?team=chattanooga-choo-choo", label: "Choo Choo" },
    { href: "rosters.html", label: "Full Rosters" },
    { href: "stadiums.html", label: "Stadiums" },
  ];

  const newsLinks = [
    { href: "news.html", label: "Newsroom" },
    { href: "media-guide.html", label: "2026 Media Guide" },
    { href: "fact-sheet.html", label: "League Fact Sheet" },
    { href: "media-rosters.html", label: "2026 Rosters (Press)" },
    { href: "media-guidelines.html", label: "Media Guidelines" },
    { href: "transcripts.html", label: "Transcripts" },
    { href: "expansion.html", label: "Expansion Weekend" },
    { href: "media.html", label: "Media Hub" },
    { href: "media-videos.html", label: "Media Videos" },
    { href: "video-condensed.html", label: "Condensed Games" },
    { href: "video-recaps.html", label: "Game Recaps" },
    { href: "puck-personality.html", label: "Puck Personality" },
    { href: "podcasts.html", label: "Podcasts" },
    { href: "media-videos.html", label: "All Video" },
    { href: "hype.html", label: "Hype Trailer" },
  ];

  const formatLinks = [
    { href: "about.html", label: "About PuckGold" },
    { href: "format.html", label: "How PuckGold works" },
    { href: "standings.html", label: "Player standings" },
    { href: "standings.html?view=teams", label: "Team standings" },
    { href: "bracket.html", label: "Playoff bracket" },
    { href: "awards.html", label: "The Hardware · Trophies" },
    { href: "apply.html", label: "Franchise / Owner apply" },
    { href: "advertise.html", label: "Advertise / Launch" },
    { href: "ads-affiliate.html", label: "Advertise Affiliate" },
    { href: "affiliates.html", label: "Consumer Affiliates" },
    { href: "talent.html", label: "Talent Community" },
    { href: "developers.html", label: "Developer Hub" },
    { href: "partners.html", label: "Partners" },
    { href: "brand.html", label: "Brand Kit" },
    { href: "retro.html", label: "Retro League · '94" },
  ];

  const fanLinks = [
    { href: "promos.html", label: "Promotions" },
    { href: "experience.html", label: "Event Experience" },
    { href: "play.html", label: "Game Zone · Play" },
    { href: "play.html#board", label: "Fan leaderboard" },
    { href: "retro.html", label: "Retro League · '94" },
    { href: "lockervision.html", label: "LockerVision" },
    { href: "lv-schedule.html", label: "LV · Outfit schedule" },
    { href: "fantasy.html", label: "Fantasy & Giveaway" },
    { href: "fantasy.html#prizes", label: "Prizes" },
    { href: "gems.html", label: "Sapphires · Rubies · Coins" },
    { href: "gems.html?tab=gifts", label: "Digital gifts" },
    { href: "gifts.html", label: "Gift Cards · Live FOMO" },
    { href: "gifts.html#send", label: "Send a gift pack" },
    { href: "profile.html", label: "My profile · share link" },
    { href: "join.html", label: "$36 OG Pass · Plans" },
  ];

  const socials = [
    { name: "X", cls: "soc-x", href: "https://x.com/puckgoldbiz", path: "M18 2h3l-7 8 8 10h-6l-5-6-5 6H0l8-9L1 2h6l4 5 5-5z" },
    { name: "TikTok", cls: "soc-tiktok", href: "https://www.tiktok.com/@puckgoldbiz", path: "M14 2c1 2.5 2.8 4 5.5 4.3V9c-1.7 0-3.2-.5-4.5-1.4V15a6 6 0 11-6-6c.3 0 .7 0 1 .1V12a3.2 3.2 0 100 6.3A3.2 3.2 0 0013.2 15V2h.8z" },
    { name: "YouTube", cls: "soc-youtube", href: "https://www.youtube.com/@puckgoldbiz", path: "M2 6.5A2.5 2.5 0 014.5 4h11A2.5 2.5 0 0118 6.5v7a2.5 2.5 0 01-2.5 2.5h-11A2.5 2.5 0 012 13.5v-7zM9 8.2v5.6l5-2.8-5-2.8z" },
    { name: "Instagram", cls: "soc-instagram", href: "https://www.instagram.com/puckgoldbiz", path: "M7 2h6a5 5 0 015 5v6a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm6.5 2.2a1 1 0 100 2 1 1 0 000-2zM10 6.5A3.5 3.5 0 1010 13.5 3.5 3.5 0 0010 6.5z" },
    { name: "Facebook", cls: "soc-facebook", href: "https://www.facebook.com/puckgoldbiz", path: "M11 20V11h3l.5-3H11V6.2c0-.9.3-1.5 1.6-1.5H15V2.1C14.5 2 13.5 2 12.4 2 9.8 2 8 3.5 8 6.5V8H5.5v3H8v9h3z" },
    { name: "Twitch", cls: "soc-twitch", href: "https://www.twitch.tv/puckgoldbiz", path: "M3 2h14v10l-3 3h-3l-2 2H7v-2H3V2zm2 2v8h3v2l2-2h3l2-2V4H5zm7 2h2v4h-2V6zM8 6h2v4H8V6z" },
    { name: "Kick", cls: "soc-kick", href: "https://kick.com/puckgoldbiz", path: "M3 2h4v6l4-6h5L10 10l6 8h-5l-4-6v6H3V2z" },
    { name: "Club", cls: "soc-club", href: "https://club.com/", path: "M10 2a6 6 0 016 6c0 4-6 10-6 10S4 12 4 8a6 6 0 016-6zm0 3.5A2.5 2.5 0 1010 10.5 2.5 2.5 0 0010 5.5z" },
    { name: "Discord", cls: "soc-discord", href: "https://discord.gg/puckgoldbiz", path: "M15.5 4A11 11 0 0012.7 3l-.3.6A10 10 0 017.6 3l-.3-.1A11 11 0 004.5 4C2 7.6 1.5 11.1 1.7 14.5A11 11 0 006 16.7l.5-.8a7 7 0 01-1.3-.6l.3-.2a7.8 7.8 0 009 0l.3.2c-.4.3-.9.5-1.3.6l.5.8a11 11 0 004.3-2.2c.3-3.8-.5-7.3-2.8-10.5zM7.3 12.4c-.7 0-1.3-.7-1.3-1.5S6.6 9.4 7.3 9.4s1.3.7 1.3 1.5-.6 1.5-1.3 1.5zm5.4 0c-.7 0-1.3-.7-1.3-1.5s.6-1.5 1.3-1.5 1.3.7 1.3 1.5-.6 1.5-1.3 1.5z" },
    { name: "Telegram", cls: "soc-telegram", href: "https://t.me/puckgoldbiz", path: "M2 10l16-7-3.2 14.2-4.4-3.4-2.4 2.3-.4-4.2L15 6.5 7.3 11.2 2 10z" },
    { name: "WhatsApp", cls: "soc-whatsapp", href: "https://wa.me/", path: "M10 2a8 8 0 00-6.9 12.1L2 18l4-1a8 8 0 104-15zm0 2.3A5.7 5.7 0 1110 15.7c-.6 0-1.2-.1-1.8-.3l-.4-.1-2.3.6.6-2.2-.1-.4A5.7 5.7 0 0110 4.3zm3 7.3c-.2-.1-1-.5-1.1-.5s-.3-.1-.4.1-.5.5-.6.6-.2.1-.4 0a4.6 4.6 0 01-2.3-2c-.2-.3.2-.3.5-.7l.2-.3c.1-.1 0-.2 0-.3s-.4-1-.6-1.3-.3-.2-.4-.2h-.4c-.1 0-.3.1-.5.3s-.6.6-.6 1.5.7 1.7.8 1.9 1.3 2.1 3.3 2.8c1.2.4 1.7.4 2.3.3.4-.1 1.1-.5 1.3-1s.2-.8.1-.9-.1-.2-.3-.3z" },
    { name: "LinkedIn", cls: "soc-linkedin", href: "https://www.linkedin.com/company/puckgoldbiz", path: "M4 7H1V19h3V7zm.2-4.2A1.8 1.8 0 112.4 4.6 1.8 1.8 0 014.2 2.8zM19 19h-3v-5.7c0-1.5-.5-2.5-1.8-2.5A2 2 0 0012 12.7V19H9V7h3v1.5A3.2 3.2 0 0115 7c2.4 0 4 1.5 4 4.7V19z" },
    { name: "Threads", cls: "soc-threads", href: "https://www.threads.net/@puckgoldbiz", path: "M12.3 7.2c.5-2.2-.4-3.8-2.5-3.8-2.4 0-3.6 1.9-3.6 4.5 0 3.3 1.7 5 4.5 5 1.3 0 2.5-.3 3.5-.8V14c-.8.4-1.8.6-3 .6-4 0-6.6-2.5-6.6-6.7C4.6 3.7 7 1.5 10.3 1.5c3 0 5 1.8 4.7 5.1-.1 1.5-.7 2.6-1.8 3.3.8-.2 1.4-.6 1.8-1.1.7-1 1-2.4 1-3.8h2c0 1.9-.4 3.7-1.5 5.1-.8 1-2 1.8-3.5 2.2v2.3c1.4-.3 2.7-.9 3.7-1.8 1.6-1.5 2.5-3.7 2.5-6.4H23c0 3.4-1.2 6.1-3.4 8-1.5 1.3-3.4 2.1-5.6 2.4v-2.3c3-.7 4.9-2.8 5-6.2-.1 1.7-.8 3.1-1.9 4-.5.4-1.1.7-1.8.9V12c1.2-.5 2-1.4 2.2-2.8.2-1.1 0-2.1-.5-2.9z" },
    { name: "Pinterest", cls: "soc-pinterest", href: "https://www.pinterest.com/puckgoldbiz", path: "M10 2a8 8 0 00-2.9 15.5c0-.7.1-1.7.4-2.5l1.4-5.8s-.3-.7-.3-1.7c0-1.6 1-2.8 2.1-2.8 1 0 1.5.8 1.5 1.7 0 1-.7 2.6-1 4-.3 1.2.6 2.2 1.8 2.2 2.1 0 3.6-2.7 3.6-5.8 0-2.4-1.6-4.2-4.5-4.2A4.7 4.7 0 005.8 8.6c0 1 .3 1.7.8 2.2l.2.2c-.1.3-.2.7-.2.9 0 .3-.2.7-.4.9A7 7 0 0110 3.5 6.5 6.5 0 0116.6 10c0 4.1-2.3 7.1-5.4 7.1-1.1 0-2.1-.6-2.4-1.3l-.7 2.5A8 8 0 0010 18a8 8 0 000-16z" },
    { name: "Snapchat", cls: "soc-snapchat", href: "https://www.snapchat.com/add/puckgoldbiz", path: "M10 2c3 0 5.2 2 5.2 5.2 0 1.7-.4 2.8-.4 4.1 0 .7.4 1.1 1.1 1.4.6.2 1.3.5 1.3 1.2 0 .7-.8 1.1-1.5 1.3-.3.1-.5.2-.5.4 0 .7.9 1.4 1.7 1.8.5.2.7.5.7.8 0 .7-1.1 1.2-2.6 1.2-1 0-1.6-.2-2.3-.2-.7 0-1.2.3-2.2.8-.6.3-1.3.5-2 .5C5.3 20 3 18.7 3 16.8c0-.6.3-1 .9-1.3.8-.4 1.8-1.1 1.8-1.9 0-.2-.2-.3-.5-.4C4.4 13 3.5 12.5 3.5 11.7c0-.7.7-1 1.3-1.2.7-.3 1.1-.7 1.1-1.4 0-1.3-.4-2.4-.4-4.1C5.5 4 7.2 2 10 2z" },
    { name: "Spotify", cls: "soc-spotify", href: "https://open.spotify.com/user/puckgoldbiz", path: "M10 2a8 8 0 100 16 8 8 0 000-16zm3.6 11.5a.6.6 0 01-.8.2c-2.2-1.3-5-1.6-8.2-.9a.6.6 0 11-.3-1.2c3.5-.8 6.6-.4 9.1 1a.6.6 0 01.2.9zm1-2.3a.7.7 0 01-1 .3c-2.5-1.5-6.3-2-9.3-1.1a.7.7 0 01-.4-1.4c3.4-1 7.6-.4 10.5 1.3a.7.7 0 01.2 1zm.1-2.4C11.6 7.6 6.7 7.4 4 8.2a.9.9 0 11-.5-1.7c3.1-.9 8.5-.7 12 1.4a.9.9 0 01-.8 1.6z" },
    { name: "Rumble", cls: "soc-rumble", href: "https://rumble.com/c/puckgoldbiz", path: "M3 5h4l3 5 3-5h4l-5 7.5L17 20h-4l-3-5-3 5H3l5-7.5L3 5z" },
    { name: "Whatnot", cls: "soc-whatnot", href: "https://www.whatnot.com/", path: "M3 4h14v3H3V4zm0 5h10v3H3V9zm0 5h14v3H3v-3z" },
    { name: "Parti", cls: "soc-parti", href: "https://parti.com/", path: "M10 2l2.4 5.2L18 8l-4 3.6L15.2 18 10 14.8 4.8 18 6 11.6 2 8l5.6-.8L10 2z" },
    { name: "Substack", cls: "soc-substack", href: "https://substack.com/@puckgoldbiz", path: "M2 3h16v2.5H2V3zm0 4.5h16V18l-8-4.5L2 18V7.5z" },
    { name: "Medium", cls: "soc-medium", href: "https://medium.com/@puckgoldbiz", path: "M2 5.5c0-.4.2-.6.5-.7l3.4-1.6c.2-.1.4 0 .4.2v11.7c0 .2-.1.3-.3.4l-3.3 1.6c-.4.2-.7 0-.7-.4V5.5zm5.2-.2l3.7 6.1v.1l3.7-6.1V16h-1.7V8.5L10.8 14h-.7L7.9 8.5V16H6.2V5.3h1zM18.4 5l1.4-.7c.3-.1.5 0 .5.3v10.8c0 .5-.3 1-.8 1.2l-1.6.7V5z" },
  ];

  function ddLinks(items, isActive) {
    return items
      .map((l) => `<a href="${l.href}" class="${isActive(l.href.split("#")[0]) ? "active" : ""}">${l.label}</a>`)
      .join("");
  }

  function mount() {
    const header = document.getElementById("site-header");
    const footer = document.getElementById("site-footer");
    if (!header) return;

    const isActive = (href) => active === href.toLowerCase();
    const teamsActive =
      isActive("teams.html") ||
      isActive("rosters.html") ||
      isActive("stadiums.html") ||
      isActive("team.html") ||
      isActive("player.html");
    const newsActive =
      newsLinks.some((l) => isActive(l.href)) ||
      active.startsWith("media-") ||
      active.startsWith("video-") ||
      active.startsWith("news") ||
      isActive("puck-personality.html") ||
      isActive("podcasts.html") ||
      isActive("expansion.html") ||
      isActive("media-guide.html") ||
      active.startsWith("transcript");
    const formatActive =
      (formatLinks.some((l) => isActive(l.href.split("#")[0])) &&
        !isActive("standings.html") &&
        !isActive("stats.html")) ||
      isActive("about.html") ||
      isActive("format.html") ||
      isActive("bracket.html") ||
      isActive("awards.html") ||
      isActive("apply.html") ||
      isActive("talent.html") ||
      isActive("advertise.html") ||
      isActive("ads-affiliate.html") ||
      isActive("developers.html") ||
      active.startsWith("affiliates");
    const fanActive =
      isActive("fantasy.html") ||
      isActive("gifts.html") ||
      isActive("gems.html") ||
      isActive("gift-open.html") ||
      isActive("profile.html") ||
      isActive("play.html") ||
      isActive("lockervision.html") ||
      isActive("lv-game.html") ||
      isActive("lv-team.html") ||
      isActive("lv-outfit.html") ||
      isActive("lv-edition.html") ||
      isActive("lv-schedule.html") ||
      isActive("lv-about.html") ||
      isActive("experience.html") ||
      isActive("promos.html") ||
      isActive("join.html");
    const scoresActive = isActive("scores.html");
    const scheduleActive = isActive("schedule.html");
    const standingsActive = isActive("standings.html");
    const statsActive = isActive("stats.html");

    header.innerHTML = `
      <div class="nav-wrap nav-liv">
        <a class="logo-link" href="index.html" aria-label="PuckGold home">
          <img class="logo-mark" src="assets/brand/lockup/primary-master.png?v=3" alt="PGB" width="40" height="40">
          <div>
            <div class="logo-word">PUCK<span>GOLD</span></div>
            <span class="logo-sub">PGB LEAGUE</span>
          </div>
        </a>
        <nav class="nav-links" aria-label="Primary">
          <a href="scores.html" class="${scoresActive ? "active" : ""}">Scores</a>
          <a href="schedule.html" class="${scheduleActive ? "active" : ""}">Schedule</a>
          <a href="stats.html" class="${statsActive ? "active" : ""}">Stats</a>
          <a href="standings.html" class="${standingsActive ? "active" : ""}">Standings</a>
          <div class="nav-dd" data-dd>
            <button type="button" class="${teamsActive ? "active" : ""}" aria-expanded="false" aria-haspopup="true">Teams <span class="chev">▾</span></button>
            <div class="nav-dd-menu">${ddLinks(teamsLinks, isActive)}</div>
          </div>
          <div class="nav-dd" data-dd>
            <button type="button" class="${newsActive ? "active" : ""}" aria-expanded="false" aria-haspopup="true">News <span class="chev">▾</span></button>
            <div class="nav-dd-menu">${ddLinks(newsLinks, isActive)}</div>
          </div>
          <div class="nav-dd" data-dd>
            <button type="button" class="${formatActive ? "active" : ""}" aria-expanded="false" aria-haspopup="true">PGB <span class="chev">▾</span></button>
            <div class="nav-dd-menu">${ddLinks(formatLinks, isActive)}</div>
          </div>
          <div class="nav-dd" data-dd>
            <button type="button" class="${fanActive ? "active" : ""}" aria-expanded="false" aria-haspopup="true">Fan Zone <span class="chev">▾</span></button>
            <div class="nav-dd-menu">${ddLinks(fanLinks, isActive)}</div>
          </div>
        </nav>
        <div class="nav-actions">
          <a href="join.html" class="nav-pill nav-pill-og" title="$36 OG Offer — Gold Puck + 1-year Premium League Pass">
            <span class="og-short">$36 OG</span>
            <span class="og-full">$36 OG Offer</span>
          </a>
          <button type="button" class="nav-bag" id="navBagBtn" data-open-cart aria-label="Open bag">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 016 0"/></svg>
            <span class="bag-count" id="navBagCount" data-count="0"></span>
          </button>
          <a href="signin.html" class="nav-pill nav-pill-signin">Sign In</a>
          <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="mobileDrawer" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="mobile-drawer" id="mobileDrawer">
        <a href="scores.html" class="${scoresActive ? "active" : ""}">Scores</a>
        <a href="schedule.html" class="${scheduleActive ? "active" : ""}">Schedule</a>
        <a href="stats.html" class="${statsActive ? "active" : ""}">Stats</a>
        <a href="standings.html" class="${standingsActive ? "active" : ""}">Standings</a>
        <a href="play.html">Game Zone</a>
        <div class="drawer-group">Teams &amp; Players</div>
        <a href="teams.html">Teams</a>
        <a href="rosters.html">Rosters</a>
        <a href="stadiums.html">Stadiums</a>
        <a href="lockervision.html">LockerVision</a>
        <a href="lv-schedule.html">LV · Outfit schedule</a>
        <a href="awards.html">Trophies &amp; Awards</a>
        <div class="drawer-group">News &amp; Video</div>
        <a href="expansion.html">Expansion Weekend · 24h</a>
        <a href="news.html">Newsroom</a>
        <a href="media-guide.html">2026 Media Guide</a>
        <a href="media.html">Media Hub</a>
        <a href="video-condensed.html">Condensed Games</a>
        <a href="video-recaps.html">Game Recaps</a>
        <a href="puck-personality.html">Puck Personality</a>
        <a href="podcasts.html">Podcasts</a>
        <a href="media-videos.html">All Videos</a>
        <div class="drawer-group">Fan Zone</div>
        <a href="promos.html">Promotions</a>
        <a href="join.html">$36 OG Pass · Plans</a>
        <a href="experience.html">Event Experience</a>
        <a href="play.html">Game Zone · Play</a>
        <a href="play.html#board">Fan leaderboard</a>
        <a href="lockervision.html">LockerVision</a>
        <a href="lv-schedule.html">LV · Outfit schedule</a>
        <a href="retro.html">Retro League · '94</a>
        <a href="fantasy.html">Fantasy &amp; Giveaway</a>
        <a href="gems.html">Sapphires · Rubies · Coins</a>
        <a href="gems.html?tab=gifts">Digital gifts</a>
        <a href="gifts.html">Gift Cards · Live FOMO</a>
        <a href="profile.html">My profile · share link</a>
        <div class="drawer-group">More</div>
        <a href="about.html">About PuckGold</a>
        <a href="format.html">League Format</a>
        <a href="standings.html">Player Standings</a>
        <a href="standings.html?view=teams">Team Standings</a>
        <a href="apply.html">Franchise / Owner apply</a>
        <a href="advertise.html">Advertise / Launch</a>
        <a href="ads-affiliate.html">Advertise Affiliate</a>
        <a href="affiliates.html">Consumer Affiliates</a>
        <a href="talent.html">Talent Community</a>
        <a href="developers.html">Developer Hub</a>
        <a href="support.html">Help Center</a>
        <a href="contact.html">Contact</a>
        <a href="partners.html">Partners</a>
        <a href="brand.html">Brand Kit</a>
        <a href="retro.html">Retro League · '94</a>
        <div class="drawer-ctas">
          <a href="join.html" class="btn btn-founding btn-block">$36 OG Offer · Gold Puck + Pass</a>
          <a href="shop.html" class="btn btn-sapphire btn-block">Shop</a>
          <a href="signin.html" class="btn btn-signin btn-block">Sign In</a>
          <button class="theme-toggle theme-toggle-drawer" id="themeToggle" type="button" aria-pressed="false" aria-label="Switch to light mode" title="Light mode">
            <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 0110.5 3 7 7 0 1019 16.5c.7-.6 1.4-1.3 2-2z"/></svg>
            <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
            <span class="theme-toggle-label">Theme</span>
          </button>
        </div>
      </div>
    `;

    const btn = document.getElementById("menuBtn");
    const drawer = document.getElementById("mobileDrawer");
    const setDrawerOpen = (open) => {
      drawer?.classList.toggle("open", open);
      btn?.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("drawer-open", !!open);
    };
    btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      setDrawerOpen(!drawer?.classList.contains("open"));
    });
    // Keep wheel/trackpad scroll inside the drawer (don't fight the page)
    drawer?.addEventListener(
      "wheel",
      (e) => {
        e.stopPropagation();
      },
      { passive: true }
    );
    drawer?.addEventListener(
      "touchmove",
      (e) => {
        e.stopPropagation();
      },
      { passive: true }
    );

    const closeAllDds = () => {
      document.querySelectorAll(".nav-dd.open").forEach((d) => {
        d.classList.remove("open");
        d.querySelector("button")?.setAttribute("aria-expanded", "false");
      });
    };

    // Dropdowns — open on hover (no click required); wheel scrolls the panel itself
    document.querySelectorAll("[data-dd]").forEach((dd) => {
      const b = dd.querySelector("button");
      const menu = dd.querySelector(".nav-dd-menu");
      let leaveTimer = 0;
      const openDd = (hardPin) => {
        clearTimeout(leaveTimer);
        document.querySelectorAll(".nav-dd.open").forEach((d) => {
          if (d !== dd) {
            d.classList.remove("open");
            d.dataset.pinned = "0";
            d.querySelector("button")?.setAttribute("aria-expanded", "false");
          }
        });
        dd.classList.add("open");
        if (hardPin) dd.dataset.pinned = "1";
        b?.setAttribute("aria-expanded", "true");
      };
      const closeDd = () => {
        dd.classList.remove("open");
        dd.dataset.pinned = "0";
        b?.setAttribute("aria-expanded", "false");
      };

      b?.addEventListener("click", (e) => {
        e.stopPropagation();
        if (dd.classList.contains("open") && dd.dataset.pinned === "1") closeDd();
        else openDd(true);
      });

      dd.addEventListener("pointerenter", () => openDd(false));
      dd.addEventListener("pointerleave", () => {
        if (dd.dataset.pinned === "1") return;
        leaveTimer = window.setTimeout(closeDd, 220);
      });

      menu?.addEventListener("click", (e) => e.stopPropagation());
      menu?.addEventListener(
        "wheel",
        (e) => {
          openDd(true); // stay open while scrolling — no prior click needed
          const el = menu;
          const canScroll = el.scrollHeight > el.clientHeight + 1;
          if (!canScroll) {
            e.preventDefault();
            e.stopPropagation();
            return;
          }
          const before = el.scrollTop;
          el.scrollTop += e.deltaY;
          e.preventDefault();
          e.stopPropagation();
          if (el.scrollTop === before && Math.abs(e.deltaY) > 0) {
            /* at edge — already consumed so page doesn't jump */
          }
        },
        { passive: false }
      );
      menu?.addEventListener(
        "touchstart",
        () => {
          openDd(true);
        },
        { passive: true }
      );
      menu?.addEventListener(
        "touchmove",
        (e) => {
          e.stopPropagation();
        },
        { passive: true }
      );
    });
    document.addEventListener("click", (e) => {
      if (e.target.closest?.("[data-dd]")) return;
      document.querySelectorAll("[data-dd]").forEach((d) => {
        d.dataset.pinned = "0";
      });
      closeAllDds();
      if (drawer?.classList.contains("open") && !e.target.closest?.("#menuBtn, #mobileDrawer")) {
        setDrawerOpen(false);
      }
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll("[data-dd]").forEach((d) => {
          d.dataset.pinned = "0";
        });
        closeAllDds();
        setDrawerOpen(false);
      }
    });

    applyTheme(getTheme());
    document.getElementById("themeToggle")?.addEventListener("click", () => {
      const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
    });

    initFomoClocks();

    if (footer) {
      const socialHtml = socials
        .map(
          (s) => `
          <a class="${s.cls}" href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}" title="${s.name}">
            <svg viewBox="0 0 20 20" aria-hidden="true"><path d="${s.path}"/></svg>
          </a>`
        )
        .join("");

      const deskOpen = typeof window.matchMedia === "function" && window.matchMedia("(min-width:900px)").matches;
      const openAttr = deskOpen ? " open" : "";

      footer.innerHTML = `
        <div class="footer-shell">
          <div class="footer-top">
            <div class="footer-brand">
              <a class="footer-logo" href="index.html" aria-label="PuckGold home">
                <img src="assets/brand/lockup/primary-master.png?v=3" alt="PGB" width="56" height="80">
                <div class="logo-word">PUCK<span>GOLD</span></div>
              </a>
              <p>PuckGoldBiz (PGB) — the Founding Four era. Premium membership, Fan Zone rewards, and the coldest game on earth.</p>
              <div class="cta-row">
                <a href="join.html" class="btn btn-founding btn-sm">Become a founding member</a>
                <a href="fantasy.html" class="btn btn-sapphire btn-sm">Fan Zone</a>
              </div>
            </div>
            <details class="footer-col"${openAttr}>
              <summary>League</summary>
              <div class="footer-links">
                <a href="schedule.html">Schedule</a>
                <a href="scores.html">Scores</a>
                <a href="stats.html">Stats</a>
                <a href="bracket.html">Leaderboard</a>
                <a href="teams.html">Teams</a>
                <a href="rosters.html">Rosters</a>
                <a href="stadiums.html">Stadiums</a>
                <a href="format.html">Format</a>
              </div>
            </details>
            <details class="footer-col"${openAttr}>
              <summary>Fans</summary>
              <div class="footer-links">
                <a href="fantasy.html">Fan Zone</a>
                <a href="lockervision.html">LockerVision</a>
                <a href="shop.html">Shop</a>
                <a href="gems.html">Gems &amp; Coins</a>
                <a href="gifts.html">Gift Cards</a>
                <a href="gifts.html#send">Send a gift</a>
                <a href="profile.html">My profile</a>
                <a href="join.html">$36 OG Pass</a>
                <a href="promos.html">Promotions</a>
                <a href="experience.html">Experience</a>
                <a href="awards.html">Awards</a>
                <a href="lv-schedule.html">LV schedule</a>
              </div>
            </details>
            <details class="footer-col"${openAttr}>
              <summary>Company</summary>
              <div class="footer-links">
                <a href="about.html">About</a>
                <a href="apply.html">Franchise apply</a>
                <a href="advertise.html">Advertise</a>
                <a href="talent.html">Talent</a>
                <a href="developers.html">Developers</a>
                <a href="partners.html">Partners</a>
                <a href="brand.html">Brand Kit</a>
                <a href="retro.html">Retro · '94</a>
                <a href="media.html">Media Hub</a>
              </div>
            </details>
            <details class="footer-col"${openAttr}>
              <summary data-i18n="footer.support">Support</summary>
              <div class="footer-links">
                <a href="support.html" data-i18n="footer.help">Help Center</a>
                <a href="contact.html" data-i18n="footer.contact">Contact</a>
                <a href="affiliates-faqs.html" data-i18n="footer.faq">FAQs</a>
                <a href="support.html?support=chat" data-i18n="support.chat">Chat with us</a>
                <a href="#" data-i18n="footer.accessibility">Accessibility</a>
                <a href="ads-affiliate.html" data-i18n="footer.adsAff">Ad Affiliate</a>
                <a href="affiliates.html" data-i18n="footer.consAff">Fan Affiliates</a>
              </div>
            </details>
          </div>
          <div class="footer-social-label">Follow PGB</div>
          <div class="social-grid" aria-label="Social media">${socialHtml}</div>
          <div class="footer-bottom">
            <div class="foot-note">© 2026 PuckGoldBiz (PGB). All rights reserved.</div>
            <div class="footer-legal">
              <a href="#" data-i18n="footer.privacy">Privacy</a>
              <a href="#" data-i18n="footer.terms">Terms</a>
              <a href="#">Cookies</a>
              <a href="#" data-i18n="footer.accessibility">Accessibility</a>
              <a href="support.html" data-i18n="footer.help">Help Center</a>
            </div>
          </div>
        </div>
      `;

      // Keep accordion columns open on desktop when resizing up
      const cols = footer.querySelectorAll("details.footer-col");
      const mq = window.matchMedia("(min-width:900px)");
      const syncFooterOpen = () => {
        cols.forEach((d) => {
          if (mq.matches) d.open = true;
        });
      };
      mq.addEventListener?.("change", syncFooterOpen);
    }
  }

  function parts(ms) {
    const diff = Math.max(0, ms);
    return {
      d: Math.floor(diff / 86400000),
      h: Math.floor((diff % 86400000) / 3600000),
      m: Math.floor((diff % 3600000) / 60000),
      s: Math.floor((diff % 60000) / 1000),
    };
  }

  function clockHtml(ms) {
    const { d, h, m, s } = parts(ms);
    return `
      <div><strong>${d}</strong><span>Days</span></div>
      <div><strong>${String(h).padStart(2, "0")}</strong><span>Hrs</span></div>
      <div><strong>${String(m).padStart(2, "0")}</strong><span>Min</span></div>
      <div><strong>${String(s).padStart(2, "0")}</strong><span>Sec</span></div>
    `;
  }

  function livClock(ms) {
    const { d, h, m, s } = parts(ms);
    const p = (n) => String(n).padStart(2, "0");
    return `${p(d)} : ${p(h)} : ${p(m)} : ${p(s)}`;
  }

  /** Nav + hero countdowns — Expansion Weekend (~24h from first visit) */
  function initFomoClocks() {
    const expKey = "pgb-expansion-start";
    let EVENT_END = localStorage.getItem(expKey);
    if (!EVENT_END) {
      EVENT_END = String(Date.now() + 24 * 60 * 60 * 1000);
      localStorage.setItem(expKey, EVENT_END);
    }
    EVENT_END = Number(EVENT_END);

    const ogKey = "pgb-og-deal-end";
    let ogEnd = localStorage.getItem(ogKey);
    if (!ogEnd) {
      ogEnd = String(Date.now() + 14 * 24 * 60 * 60 * 1000);
      localStorage.setItem(ogKey, ogEnd);
    }
    ogEnd = Number(ogEnd);

    const navEl = null;
    const navLabel = null;
    const heroEl = document.getElementById("heroCountdown");
    const heroBoxes = document.getElementById("heroCountdownBoxes");
    const ogEl = document.getElementById("ogCountdown");
    const eventEl = document.getElementById("eventCountdown");

    const tick = () => {
      const left = EVENT_END - Date.now();
      if (heroEl) heroEl.textContent = left <= 0 ? "LIVE" : livClock(left);
      if (heroBoxes) heroBoxes.innerHTML = clockHtml(left);
      if (eventEl) eventEl.innerHTML = clockHtml(left);
      if (ogEl) ogEl.innerHTML = clockHtml(ogEnd - Date.now());
    };
    tick();
    setInterval(tick, 1000);
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
      root.innerHTML = clockHtml(end - Date.now());
    };
    tick();
    setInterval(tick, 1000);
  }

  // Sound + icon/text scene carousel (no tip labels)
  function initAVExperience() {
    const STORAGE_KEY = "pgb-av-on";
    function abs(path) {
      try {
        return new URL(path, document.baseURI || window.location.href).href;
      } catch (_) {
        return path;
      }
    }
    const playlist = [
      abs("assets/media/majestic-frost.mp3"),
      abs("assets/media/sport-action.mp3"),
    ];
    const saved = localStorage.getItem(STORAGE_KEY);
    // Default OFF so the VeeFriends pulse rings invite the first tap
    let enabled = saved === "1";
    let trackIndex = 0;

    const audio = new Audio();
    audio.preload = "auto";
    audio.volume = 0.8;
    audio.loop = false;
    audio.src = playlist[trackIndex];
    audio.addEventListener("ended", () => {
      trackIndex = (trackIndex + 1) % playlist.length;
      audio.src = playlist[trackIndex];
      audio.load();
      if (enabled) audio.play().catch(() => {});
    });
    audio.addEventListener("error", () => {
      trackIndex = (trackIndex + 1) % playlist.length;
      audio.src = playlist[trackIndex];
      audio.load();
    });

    // Always rebuild — remove any stale play/pause control from older caches
    document.getElementById("avToggle")?.remove();
    document.querySelectorAll("button.av-toggle").forEach((el) => el.remove());

    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "av-toggle";
    btn.id = "avToggle";
    // VeeFriends-style: pulsing rings when off, dancing EQ when on (same on every page)
    btn.innerHTML = `
      <span class="av-eq" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span>
      <span class="av-label">Turn sound on</span>
    `;
    const heroSlot = document.getElementById("heroAvSlot");
    if (heroSlot) {
      heroSlot.appendChild(btn);
    } else {
      btn.classList.add("av-float");
      document.body.appendChild(btn);
    }

    const stages = document.querySelectorAll("[data-av-stage]");
    const scenes = Array.from(document.querySelectorAll(".hero-scene"));
    const label = btn.querySelector(".av-label");

    let sceneTimer = null;
    let sceneIndex = 0;

    function setUi() {
      btn.classList.toggle("on", enabled);
      btn.setAttribute("aria-pressed", enabled ? "true" : "false");
      btn.setAttribute("aria-label", enabled ? "Turn sound off" : "Turn sound on");
      btn.title = enabled ? "Sound on — tap to mute" : "Sound off — tap to play";
      if (label) label.textContent = enabled ? "Turn sound off" : "Turn sound on";
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
        if (audio.readyState < 2) audio.load();
        await audio.play();
      } catch (_) {
        // Browser blocked autoplay — next user gesture on the sapphire button will play
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

    // Click is a user gesture — play/pause reliably here
    btn.addEventListener("click", async () => {
      enabled = !enabled;
      localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
      setUi();
      if (enabled) {
        startScenes();
        try {
          audio.currentTime = Math.min(audio.currentTime || 0, 0.01);
          if (!audio.src) audio.src = playlist[trackIndex];
          await audio.play();
        } catch (err) {
          // Force reload then retry once
          audio.src = playlist[trackIndex];
          audio.load();
          try {
            await audio.play();
          } catch (_) {}
        }
      } else {
        audio.pause();
        stopScenes();
      }
    });

    apply();
  }

  function ensureStack() {
    const base = document.querySelector('script[src*="site.js"]');
    const root = (base && base.getAttribute("src").includes("/"))
      ? base.getAttribute("src").replace(/assets\/js\/site\.js.*/, "")
      : "";
    function inject(src, attr) {
      if (document.querySelector(`script[${attr}]`)) return;
      const s = document.createElement("script");
      s.src = root + src;
      s.setAttribute(attr, "1");
      document.body.appendChild(s);
    }
    if (!window.PGB_I18N) inject("assets/js/i18n.js?v=1", "data-pgb-i18n");
    inject("assets/js/support-widget.js?v=1", "data-pgb-support");
    const applyI18n = () => window.PGB_I18N?.apply(document);
    if (window.PGB_I18N) applyI18n();
    else {
      let n = 0;
      const t = setInterval(() => {
        n++;
        if (window.PGB_I18N) {
          clearInterval(t);
          applyI18n();
        } else if (n > 40) clearInterval(t);
      }, 50);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    mount();
    initCountdown();
    initAVExperience();
    ensureStack();
  });
})();

