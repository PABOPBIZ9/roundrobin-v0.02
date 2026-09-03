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
    const isLight = theme === "light";
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.setAttribute("aria-pressed", isLight ? "true" : "false");
      btn.setAttribute("aria-label", isLight ? "Switch to dark mode" : "Switch to light mode");
      btn.title = isLight ? "Dark mode" : "Light mode";
    });
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
    { href: "founding-four.html", label: "Championship Book · How Miami Stole the Cup" },
    { href: "news-article.html?id=expansion-prizes", label: "Expansion Prize Vault" },
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
    { href: "listen.html", label: "Listen · Season One" },
    { href: "pucky13.html", label: "Pucky 13 · Oracle" },
    { href: "clip-crown.html", label: "Clip Crown submit" },
    { href: "conductor-crest.html", label: "Conductor’s Crest vote" },
    { href: "aura-vote.html", label: "Aura Vote live" },
    { href: "hype.html", label: "Hype Trailer" },
  ];

  const formatLinks = [
    { href: "about.html", label: "About PuckGold" },
    { href: "format.html", label: "How PuckGold works" },
    { href: "standings.html", label: "Player standings" },
    { href: "standings.html?view=teams", label: "Team standings" },
    { href: "bracket.html", label: "Playoff bracket" },
    { href: "founding-four.html", label: "Founding Four lore" },
    { href: "awards.html", label: "The Hardware · Trophies" },
    { href: "apply.html", label: "Franchise / Owner apply" },
    { href: "advertise.html", label: "Advertise / Launch" },
    { href: "ads-affiliate.html", label: "Advertise Affiliate" },
    { href: "affiliates.html", label: "Consumer Affiliates" },
    { href: "talent.html", label: "Talent Community" },
    { href: "developers.html", label: "Developer Hub" },
    { href: "partners.html", label: "Partners" },
    { href: "brand.html", label: "Brand Kit" },
    { href: "brand-factory/studio.html", label: "Brand Factory · Banners" },
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

  /* DraftKings-style product switcher + top bar */
  const productLinks = [
    { href: "index.html", label: "League", ico: "league" },
    { href: "fantasy.html", label: "Fan Zone", ico: "fan" },
    { href: "play.html", label: "Game Zone", ico: "play" },
    { href: "shop.html", label: "Shop", ico: "shop" },
    { href: "lockervision.html", label: "LockerVision", ico: "lv" },
    { href: "retro.html", label: "Retro '94", ico: "retro" },
    { href: "media.html", label: "Media Hub", ico: "media" },
  ];

  const PRODUCT_ICONS = {
    league:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="12" r="1.6" fill="currentColor"/></svg>',
    fan:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M12 3l2.4 5.4 5.9.9-4.3 4.1 1 5.8L12 16.4 6.9 18.2l1-5.8L3.7 9.3l5.9-.9L12 3z"/></svg>',
    play:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M6 9h12a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2a2 2 0 012-2z"/><path fill="currentColor" d="M10 15V9l5 3-5 3z"/></svg>',
    shop:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M6 8h12l-1 12H7L6 8z"/><path fill="none" stroke="currentColor" stroke-width="1.8" d="M9 8a3 3 0 016 0"/></svg>',
    lv:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" d="M6 4h12l1 4H5l1-4z"/><path fill="none" stroke="currentColor" stroke-width="1.8" d="M5 8h14v10a2 2 0 01-2 2H7a2 2 0 01-2-2V8z"/></svg>',
    retro:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="5" width="16" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="none" stroke="currentColor" stroke-width="1.8" d="M8 9h8M8 13h5"/><text x="12" y="12.5" text-anchor="middle" fill="currentColor" font-size="5.5" font-weight="800" font-family="system-ui,sans-serif">94</text></svg>',
    media:
      '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/><path fill="currentColor" d="M10 9.5v5l5-2.5-5-2.5z"/></svg>',
  };

  function productIconHtml(ico) {
    return `<span class="ico ico-${ico}">${PRODUCT_ICONS[ico] || ""}</span>`;
  }

  const moreNavLinks = [
    { href: "teams.html", label: "Teams" },
    { href: "schedule.html", label: "Schedule" },
    { href: "standings.html", label: "Standings" },
    { href: "stats.html", label: "Stats" },
    { href: "news.html", label: "News" },
    { href: "founding-four.html", label: "Founding Four" },
    { href: "format.html", label: "How It Works" },
    { href: "experience.html", label: "Event Experience" },
    { href: "support.html", label: "Help Center" },
  ];

  function productLinksHtml(isActive) {
    return productLinks
      .map(
        (l) =>
          `<a href="${l.href}" class="nav-product-item${isActive(l.href.split("#")[0]) ? " active" : ""}">${productIconHtml(l.ico)}${l.label}</a>`
      )
      .join("");
  }

  function signInHref() {
    return "signin.html?next=checkout.html%3Foffer%3Dog";
  }

  /* Monochrome footer icons — Simple Icons glyphs, 24×24 viewBox */
  const socials = [
    { name: "X", href: "https://x.com/puckgoldbiz", path: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' },
    { name: "TikTok", href: "https://www.tiktok.com/@puckgoldbiz", path: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
    { name: "YouTube", href: "https://www.youtube.com/@puckgoldbiz", path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
    { name: "Instagram", href: "https://www.instagram.com/puckgoldbiz", path: 'M7.0301.084c-1.2768.0602-2.1487.264-2.911.5634-.7888.3075-1.4575.72-2.1228 1.3877-.6652.6677-1.075 1.3368-1.3802 2.127-.2954.7638-.4956 1.6365-.552 2.914-.0564 1.2775-.0689 1.6882-.0626 4.947.0062 3.2586.0206 3.6671.0825 4.9473.061 1.2765.264 2.1482.5635 2.9107.308.7889.72 1.4573 1.388 2.1228.6679.6655 1.3365 1.0743 2.1285 1.38.7632.295 1.6361.4961 2.9134.552 1.2773.056 1.6884.069 4.9462.0627 3.2578-.0062 3.668-.0207 4.9478-.0814 1.28-.0607 2.147-.2652 2.9098-.5633.7889-.3086 1.4578-.72 2.1228-1.3881.665-.6682 1.0745-1.3378 1.3795-2.1284.2957-.7632.4966-1.636.552-2.9124.056-1.2809.0692-1.6898.063-4.948-.0063-3.2583-.021-3.6668-.0817-4.9465-.0607-1.2797-.264-2.1487-.5633-2.9117-.3084-.7889-.72-1.4568-1.3876-2.1228C21.2982 1.33 20.628.9208 19.8378.6165 19.074.321 18.2017.1197 16.9244.0645 15.6471.0093 15.236-.005 11.977.0014 8.718.0076 8.31.0215 7.0301.0839m.1402 21.6932c-1.17-.0509-1.8053-.2453-2.2287-.408-.5606-.216-.96-.4771-1.3819-.895-.422-.4178-.6811-.8186-.9-1.378-.1644-.4234-.3624-1.058-.4171-2.228-.0595-1.2645-.072-1.6442-.079-4.848-.007-3.2037.0053-3.583.0607-4.848.05-1.169.2456-1.805.408-2.2282.216-.5613.4762-.96.895-1.3816.4188-.4217.8184-.6814 1.3783-.9003.423-.1651 1.0575-.3614 2.227-.4171 1.2655-.06 1.6447-.072 4.848-.079 3.2033-.007 3.5835.005 4.8495.0608 1.169.0508 1.8053.2445 2.228.408.5608.216.96.4754 1.3816.895.4217.4194.6816.8176.9005 1.3787.1653.4217.3617 1.056.4169 2.2263.0602 1.2655.0739 1.645.0796 4.848.0058 3.203-.0055 3.5834-.061 4.848-.051 1.17-.245 1.8055-.408 2.2294-.216.5604-.4763.96-.8954 1.3814-.419.4215-.8181.6811-1.3783.9-.4224.1649-1.0577.3617-2.2262.4174-1.2656.0595-1.6448.072-4.8493.079-3.2045.007-3.5825-.006-4.848-.0608M16.953 5.5864A1.44 1.44 0 1 0 18.39 4.144a1.44 1.44 0 0 0-1.437 1.4424M5.8385 12.012c.0067 3.4032 2.7706 6.1557 6.173 6.1493 3.4026-.0065 6.157-2.7701 6.1506-6.1733-.0065-3.4032-2.771-6.1565-6.174-6.1498-3.403.0067-6.156 2.771-6.1496 6.1738M8 12.0077a4 4 0 1 1 4.008 3.9921A3.9996 3.9996 0 0 1 8 12.0077' },
    { name: "Facebook", href: "https://www.facebook.com/puckgoldbiz", path: 'M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z' },
    { name: "Twitch", href: "https://www.twitch.tv/puckgoldbiz", path: 'M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z' },
    { name: "Kick", href: "https://kick.com/puckgoldbiz", path: 'M1.333 0h8v5.333H12V2.667h2.667V0h8v8H20v2.667h-2.667v2.666H20V16h2.667v8h-8v-2.667H12v-2.666H9.333V24h-8Z' },
    { name: "Discord", href: "https://discord.gg/puckgoldbiz", path: 'M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z' },
    { name: "Telegram", href: "https://t.me/puckgoldbiz", path: 'M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z' },
    { name: "WhatsApp", href: "https://wa.me/", path: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z' },
    { name: "LinkedIn", href: "https://www.linkedin.com/company/puckgoldbiz", path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
    { name: "Threads", href: "https://www.threads.net/@puckgoldbiz", path: 'M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Zm1.003-11.69c-.242 0-.487.007-.739.021-1.836.103-2.98.946-2.916 2.143.067 1.256 1.452 1.839 2.784 1.767 1.224-.065 2.818-.543 3.086-3.71a10.5 10.5 0 0 0-2.215-.221z' },
    { name: "Pinterest", href: "https://www.pinterest.com/puckgoldbiz", path: 'M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z' },
    { name: "Snapchat", href: "https://www.snapchat.com/add/puckgoldbiz", path: 'M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z' },
    { name: "Spotify", href: "https://open.spotify.com/user/puckgoldbiz", path: 'M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z' },
    { name: "Rumble", href: "https://rumble.com/c/puckgoldbiz", path: 'M14.4528 13.5458c.8064-.6542.9297-1.8381.2756-2.6445a1.8802 1.8802 0 0 0-.2756-.2756 21.2127 21.2127 0 0 0-4.3121-2.776c-1.066-.51-2.256.2-2.4261 1.414a23.5226 23.5226 0 0 0-.14 5.5021c.116 1.23 1.292 1.964 2.372 1.492a19.6285 19.6285 0 0 0 4.5062-2.704v-.008zm6.9322-5.4002c2.0335 2.228 2.0396 5.637.014 7.8723A26.1487 26.1487 0 0 1 8.2946 23.846c-2.6848.6713-5.4168-.914-6.1662-3.5781-1.524-5.2002-1.3-11.0803.17-16.3045.772-2.744 3.3521-4.4661 6.0102-3.832 4.9242 1.174 9.5443 4.196 13.0764 8.0121v.002z' },
    { name: "Substack", href: "https://substack.com/@puckgoldbiz", path: 'M22.539 8.242H1.46V5.406h21.08v2.836zM1.46 10.812V24L12 18.11 22.54 24V10.812H1.46zM22.54 0H1.46v2.836h21.08V0z' },
    { name: "Medium", href: "https://medium.com/@puckgoldbiz", path: 'M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z' },
  ];

  function ddLinks(items, isActive) {
    return items
      .map((l) => `<a href="${l.href}" class="${isActive(l.href.split("#")[0]) ? "active" : ""}">${l.label}</a>`)
      .join("");
  }

  function readAuthChip() {
    try {
      const s = JSON.parse(localStorage.getItem("pgb-auth") || "null");
      if (!s || !s.email) return null;
      const p = JSON.parse(localStorage.getItem("pgb-fan-profile") || "{}");
      const m = JSON.parse(localStorage.getItem("pgb-membership") || "null");
      const premium = m && m.tier && m.tier !== "free";
      return {
        avatar: p.avatar || s.avatar || "🏒",
        handle: p.handle || s.handle || "fan",
        premium,
        onboarded: !!s.onboarded,
      };
    } catch (_) {
      return null;
    }
  }

  function navAuthHtml() {
    const chip = readAuthChip();
    if (!chip) {
      return `<a href="${signInHref()}" class="nav-cta-login">Sign Up or Log In</a>`;
    }
    if (!chip.onboarded) {
      return `<a href="${signInHref()}" class="nav-cta-login">Finish setup</a>`;
    }
    return `<a href="profile.html" class="nav-me" title="@${chip.handle}">
      <span class="nav-me-av">${chip.avatar}</span>
      <span class="nav-me-handle">@${chip.handle}</span>
      ${chip.premium ? `<span class="nav-me-badge">5×</span>` : ""}
    </a>`;
  }

  function navAuthDrawerHtml() {
    const chip = readAuthChip();
    if (!chip) {
      return `<a href="${signInHref()}" class="btn btn-founding btn-block">Sign Up or Log In</a>`;
    }
    if (!chip.onboarded) {
      return `<a href="${signInHref()}" class="btn btn-founding btn-block">Finish profile setup</a>`;
    }
    return `<a href="profile.html" class="btn btn-sapphire btn-block">${chip.avatar} @${chip.handle}${chip.premium ? " · 5×" : ""}</a>
      <a href="fantasy.html#board" class="btn btn-ghost btn-block">Farm &amp; leaderboard</a>`;
  }

  function refreshNavLangCode() {
    if (!window.PGB_I18N) return;
    const code = window.PGB_I18N.getLang();
    const meta = window.PGB_I18N.languages.find((l) => l.code === code);
    const flagEl = document.getElementById("navLangFlag");
    const codeEl = document.getElementById("navLangCode");
    if (flagEl) flagEl.textContent = meta?.flag || "🌐";
    if (codeEl) codeEl.textContent = meta?.short || code.split("-")[0].toUpperCase();
  }

  function initLangPicker() {
    const wrap = document.getElementById("navLangWrap");
    const btn = document.getElementById("navLangBtn");
    const menu = document.getElementById("navLangMenu");
    const list = document.getElementById("pgbLangList");
    if (!wrap || !btn || !menu || !list) return;

    const renderList = () => {
      if (!window.PGB_I18N) return;
      const cur = window.PGB_I18N.getLang();
      list.innerHTML = window.PGB_I18N.languages
        .map((l) => {
          const name = l.label.includes(" — ") ? l.label.split(" — ")[0] : l.label;
          const on = l.code === cur;
          return `<button type="button" role="option" data-lang="${l.code}" class="nav-lang-opt${on ? " is-on" : ""}" aria-selected="${on ? "true" : "false"}">
            <span class="nav-lang-opt-flag" aria-hidden="true">${l.flag || "🌐"}</span>
            <span class="nav-lang-opt-label">${name}</span>
            <span class="nav-lang-opt-check" aria-hidden="true">✓</span>
          </button>`;
        })
        .join("");
    };

    const close = () => {
      wrap.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      menu.setAttribute("aria-hidden", "true");
    };
    const open = () => {
      renderList();
      wrap.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      menu.setAttribute("aria-hidden", "false");
    };
    const toggle = () => {
      if (wrap.classList.contains("is-open")) close();
      else open();
    };

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggle();
    });
    document.getElementById("footerLangBtn")?.addEventListener("click", (e) => {
      e.preventDefault();
      toggle();
    });
    document.getElementById("pgbLangOpen")?.addEventListener("click", (e) => {
      e.preventDefault();
      toggle();
    });
    list.addEventListener("click", (e) => {
      const opt = e.target.closest("[data-lang]");
      if (!opt || !window.PGB_I18N) return;
      window.PGB_I18N.setLang(opt.dataset.lang);
      refreshNavLangCode();
      close();
    });
    document.addEventListener("click", (e) => {
      if (!wrap.contains(e.target)) close();
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") close();
    });
    window.addEventListener("pgb:lang", refreshNavLangCode);
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
      isActive("listen.html") ||
      isActive("clip-crown.html") ||
      isActive("conductor-crest.html") ||
      isActive("aura-vote.html") ||
      isActive("expansion.html") ||
      isActive("founding-four.html") ||
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
      isActive("signin.html") ||
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
    const homeActive = isActive("index.html");
    const myPassActive =
      isActive("profile.html") ||
      isActive("signin.html") ||
      isActive("fantasy.html") ||
      isActive("play.html");
    const liveActive =
      isActive("aura-vote.html") ||
      isActive("clip-crown.html") ||
      isActive("conductor-crest.html") ||
      isActive("scores.html");
    const rewardsActive = isActive("join.html") || isActive("checkout.html") || isActive("promos.html");
    const shopActive = isActive("shop.html") || isActive("gems.html") || isActive("gifts.html");
    const moreActive = moreNavLinks.some((l) => isActive(l.href.split("#")[0]));

    header.innerHTML = `
      <div class="nav-wrap nav-dk">
        <div class="nav-left">
          <a class="logo-link logo-link-home" href="index.html" aria-label="PuckGold home">
            <img class="logo-mark" src="assets/brand/lockup/primary-master.png?v=3" alt="PGB" width="36" height="36">
            <span class="logo-word">PUCK<span>GOLD</span></span>
          </a>
          <div class="nav-product nav-dd" data-dd>
            <button type="button" class="nav-product-btn" aria-expanded="false" aria-haspopup="true">
              <span class="nav-product-name">League</span>
              <span class="chev" aria-hidden="true">▾</span>
            </button>
            <div class="nav-product-panel nav-dd-menu">
              <div class="nav-product-kicker">Play on Puck Gold</div>
              ${productLinksHtml(isActive)}
            </div>
          </div>
        </div>
        <nav class="nav-links nav-links-dk" aria-label="Primary">
          <a href="index.html" class="${homeActive ? "active" : ""}">Home</a>
          <a href="profile.html" class="${myPassActive ? "active" : ""}">My Pass</a>
          <a href="aura-vote.html" class="${liveActive ? "active" : ""}">Live</a>
          <a href="join.html" class="${rewardsActive ? "active" : ""}">Rewards</a>
          <a href="scores.html" class="${scoresActive ? "active" : ""}">Scores</a>
          <a href="shop.html" class="${shopActive ? "active" : ""}">Shop</a>
          <div class="nav-dd" data-dd>
            <button type="button" class="${moreActive ? "active" : ""}" aria-expanded="false" aria-haspopup="true">More <span class="chev">▾</span></button>
            <div class="nav-dd-menu nav-dd-menu-compact">${ddLinks(moreNavLinks, isActive)}</div>
          </div>
        </nav>
        <div class="nav-actions">
          <span class="nav-av-slot" id="navAvSlot" aria-hidden="true"></span>
          <div class="nav-lang-wrap" id="navLangWrap">
            <button type="button" class="nav-icon-btn nav-lang-btn" id="navLangBtn" aria-expanded="false" aria-haspopup="listbox" aria-label="Language" title="Language">
              <span class="nav-lang-flag" id="navLangFlag" aria-hidden="true">🌐</span>
              <span class="nav-lang-code" id="navLangCode">EN</span>
            </button>
            <div class="nav-lang-menu" id="navLangMenu" aria-hidden="true" role="listbox" aria-label="Language">
              <div class="nav-lang-list" id="pgbLangList"></div>
            </div>
          </div>
          <button type="button" class="theme-toggle theme-toggle-nav nav-icon-btn" aria-pressed="false" aria-label="Switch to light mode" title="Light mode">
            <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 0110.5 3 7 7 0 1019 16.5c.7-.6 1.4-1.3 2-2z"/></svg>
            <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
          </button>
          <button type="button" class="nav-bag nav-icon-btn" id="navBagBtn" data-open-cart aria-label="Open bag">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8a3 3 0 016 0"/></svg>
            <span class="bag-count" id="navBagCount" data-count="0"></span>
          </button>
          ${navAuthHtml()}
          <button class="menu-btn nav-icon-btn" id="menuBtn" aria-expanded="false" aria-controls="mobileDrawer" aria-label="Open menu">
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
      <div class="drawer-backdrop" id="drawerBackdrop" aria-hidden="true"></div>
      <div class="mobile-drawer" id="mobileDrawer" aria-hidden="true">
        <div class="drawer-head">
          <a class="logo-link logo-link-home" href="index.html" aria-label="PuckGold home">
            <img class="logo-mark" src="assets/brand/lockup/primary-master.png?v=3" alt="PGB" width="32" height="32">
            <span class="logo-word">PUCK<span>GOLD</span></span>
          </a>
          <button type="button" class="drawer-close nav-icon-btn" id="drawerClose" aria-label="Close menu">×</button>
        </div>
        <div class="drawer-scroll">
        <div class="drawer-ctas drawer-ctas-top">
          ${navAuthDrawerHtml()}
        </div>
        <div class="drawer-group">Play on Puck Gold</div>
        ${productLinks.map((l) => `<a href="${l.href}" class="${isActive(l.href.split("#")[0]) ? "active" : ""}">${productIconHtml(l.ico)} ${l.label}</a>`).join("")}
        <div class="drawer-group">League</div>
        <a href="index.html" class="${homeActive ? "active" : ""}">Home</a>
        <a href="profile.html" class="${myPassActive ? "active" : ""}">My Pass</a>
        <a href="aura-vote.html" class="${liveActive ? "active" : ""}">Live</a>
        <a href="join.html" class="${rewardsActive ? "active" : ""}">Rewards</a>
        <a href="scores.html" class="${scoresActive ? "active" : ""}">Scores</a>
        <a href="shop.html" class="${shopActive ? "active" : ""}">Shop</a>
        <a href="schedule.html" class="${scheduleActive ? "active" : ""}">Schedule</a>
        <a href="standings.html" class="${standingsActive ? "active" : ""}">Standings</a>
        <a href="stats.html" class="${statsActive ? "active" : ""}">Stats</a>
        <div class="drawer-group">More</div>
        ${moreNavLinks.map((l) => `<a href="${l.href}" class="${isActive(l.href.split("#")[0]) ? "active" : ""}">${l.label}</a>`).join("")}
        <div class="drawer-ctas">
          <button class="theme-toggle theme-toggle-drawer" type="button" aria-pressed="false" aria-label="Switch to light mode" title="Light mode">
            <svg class="icon-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14.5A8.5 8.5 0 0110.5 3 7 7 0 1019 16.5c.7-.6 1.4-1.3 2-2z"/></svg>
            <svg class="icon-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>
            <span class="theme-toggle-label">Theme</span>
          </button>
        </div>
        </div>
      </div>
    `;

    const drawerBackdrop = document.getElementById("drawerBackdrop");
    const drawer = document.getElementById("mobileDrawer");
    if (drawerBackdrop?.parentElement === header) document.body.appendChild(drawerBackdrop);
    if (drawer?.parentElement === header) document.body.appendChild(drawer);

    const btn = document.getElementById("menuBtn");
    const drawerClose = document.getElementById("drawerClose");
    const setDrawerOpen = (open) => {
      drawer?.classList.toggle("open", open);
      drawerBackdrop?.classList.toggle("open", open);
      drawer?.setAttribute("aria-hidden", open ? "false" : "true");
      drawerBackdrop?.setAttribute("aria-hidden", open ? "false" : "true");
      btn?.setAttribute("aria-expanded", open ? "true" : "false");
      document.body.classList.toggle("drawer-open", !!open);
      if (open) document.getElementById("navLangWrap")?.classList.remove("is-open");
    };
    btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      setDrawerOpen(!drawer?.classList.contains("open"));
    });
    drawerClose?.addEventListener("click", () => setDrawerOpen(false));
    drawerBackdrop?.addEventListener("click", () => setDrawerOpen(false));
    // Founding offer deep-link from drawer / any [data-claim-og]
    header.querySelectorAll("[data-claim-og]").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        if (window.PGBCart?.addOgOffer) {
          window.PGBCart.addOgOffer({ open: false });
          location.href = "checkout.html?offer=og";
        } else {
          location.href = "checkout.html?offer=og";
        }
      });
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
    document.querySelectorAll(".theme-toggle").forEach((btn) => {
      btn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
        applyTheme(next);
      });
    });

    initLangPicker();
    refreshNavLangCode();

    initFomoClocks();

    if (footer) {
      const socialHtml = socials
        .map(
          (s) => `
          <a href="${s.href}" target="_blank" rel="noopener noreferrer" aria-label="${s.name}" title="${s.name}">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="${s.path}"/></svg>
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
                <img src="assets/brand/lockup/primary-master.png?v=3" alt="PGB" width="40" height="40">
                <div class="logo-word">PUCK<span>GOLD</span></div>
              </a>
              <p>The Founding Four era — Fan Zone, Premium Pass, global ice.</p>
            </div>
            <details class="footer-col"${openAttr}>
              <summary>League</summary>
              <div class="footer-links">
                <a href="schedule.html">Schedule</a>
                <a href="scores.html">Scores</a>
                <a href="stats.html">Stats</a>
                <a href="teams.html">Teams</a>
                <a href="stadiums.html">Stadiums</a>
                <a href="format.html">Format</a>
              </div>
            </details>
            <details class="footer-col"${openAttr}>
              <summary>Fans</summary>
              <div class="footer-links">
                <a href="fantasy.html">Fan Zone</a>
                <a href="shop.html">Shop</a>
                <a href="join.html">$36 OG Pass</a>
                <a href="profile.html">My profile</a>
                <a href="lockervision.html">LockerVision</a>
                <a href="retro.html">Retro '94</a>
              </div>
            </details>
            <details class="footer-col"${openAttr}>
              <summary>Company</summary>
              <div class="footer-links">
                <a href="about.html">About</a>
                <a href="media.html">Media Hub</a>
                <a href="apply.html">Franchise apply</a>
                <a href="brand.html">Brand Kit</a>
                <a href="advertise.html">Advertise</a>
                <a href="developers.html">Developers</a>
              </div>
            </details>
            <details class="footer-col"${openAttr}>
              <summary data-i18n="footer.support">Support</summary>
              <div class="footer-links">
                <a href="support.html" data-i18n="footer.help">Help Center</a>
                <a href="contact.html" data-i18n="footer.contact">Contact</a>
                <a href="affiliates-faqs.html" data-i18n="footer.faq">FAQs</a>
                <a href="support.html?support=chat" data-i18n="support.chat">Chat with us</a>
              </div>
            </details>
          </div>
          <div class="footer-social-row">
            <span class="footer-social-label">Follow PGB</span>
            <div class="social-grid" aria-label="Social media">${socialHtml}</div>
          </div>
          <div class="footer-bottom">
            <div class="foot-note">© 2026 PuckGoldBiz (PGB)</div>
            <div class="footer-legal">
              <a href="#" data-i18n="footer.privacy">Privacy</a>
              <a href="#" data-i18n="footer.terms">Terms</a>
              <a href="support.html" data-i18n="footer.help">Help</a>
              <button type="button" class="footer-lang-link" id="footerLangBtn" data-i18n="lang.change">Language</button>
            </div>
          </div>
        </div>
      `;
      document.getElementById("footerLangBtn")?.addEventListener("click", () => {
        document.getElementById("navLangBtn")?.click();
      });

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

    const heroEl = document.getElementById("heroCountdown");
    const heroBoxes = document.getElementById("heroCountdownBoxes");
    const ogEl = document.getElementById("ogCountdown");
    const eventEl = document.getElementById("eventCountdown");
    const exEl = document.getElementById("exCountdown");
    const exSticky = document.getElementById("exStickyClock");

    const tick = () => {
      const left = EVENT_END - Date.now();
      const face = left <= 0 ? "LIVE" : livClock(left);
      if (heroEl) heroEl.textContent = face;
      if (heroBoxes) heroBoxes.innerHTML = clockHtml(left);
      if (eventEl) eventEl.innerHTML = clockHtml(left);
      if (exEl) exEl.textContent = face;
      if (exSticky) exSticky.textContent = face;
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
  const HERO_LAUNCH_CTA = {
    href: "signin.html?next=checkout.html%3Foffer%3Dog",
    label: "Sign Up or Log In",
  };

  const HERO_LAUNCH_PANEL = {
    kicker: "Launch · Season One",
    line1: "Puck Gold",
    line2: "The coldest game on earth",
    deck: "Become a founding member — OG Limited Edition puck + 1-year Premium League Pass.",
  };

  const HERO_SLIDES = [
    {
      kicker: "Launch · Season One",
      line1: "Puck Gold",
      line2: "The coldest game on earth",
      deck: "Sign in and claim your $36 OG Pass — Limited Edition puck shipped with a handwritten founder note + 1-year Premium League Pass.",
      ctas: [HERO_LAUNCH_CTA],
    },
    {
      kicker: "Founding Four",
      line1: "The Ice Is Real",
      line2: "The Arenas Are Not",
      deck: "Broadcast spectacles built for pressure and chaos. Back the launch with your founding OG Pass.",
      ctas: [HERO_LAUNCH_CTA],
    },
    {
      kicker: "Fan Zone",
      line1: "Fans Decide",
      line2: "In Real Time",
      deck: "Vote. Predict. Influence the game as it happens. Create your account and join with $36.",
      ctas: [HERO_LAUNCH_CTA],
    },
    {
      kicker: "Origin Story",
      line1: "Pulled the Goalie",
      line2: "To Be Born",
      deck: "The league that pulled its goalie to be born. Sign in — OG Limited Edition puck + Premium League Pass.",
      ctas: [HERO_LAUNCH_CTA],
    },
  ];

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
    const navSlot = document.getElementById("navAvSlot");
    const avParent = navSlot || heroSlot;
    if (avParent) {
      avParent.appendChild(btn);
      avParent.setAttribute("aria-hidden", "false");
    } else {
      btn.classList.add("av-float");
      document.body.appendChild(btn);
    }

    const stages = document.querySelectorAll("[data-av-stage]");
    const scenes = Array.from(document.querySelectorAll(".hero-scene"));
    const label = btn.querySelector(".av-label");
    const dotsRoot = document.getElementById("heroDots");
    const heroPanel = document.getElementById("heroPanel");
    const heroKicker = document.getElementById("heroKicker");
    const heroHeadline = document.getElementById("heroHeadline");
    const heroTagline = document.getElementById("heroTagline");
    const heroDeck = document.getElementById("heroDeck");
    const heroActions = document.getElementById("heroActions");

    let sceneTimer = null;
    let sceneIndex = 0;

    function renderHeroCta() {
      if (!heroActions) return;
      heroActions.classList.add("hero-actions-solo");
      heroActions.innerHTML = `<a href="${HERO_LAUNCH_CTA.href}" class="nav-cta-login nav-cta-hero">${HERO_LAUNCH_CTA.label}</a>`;
    }

    function updateHeroPanel(i) {
      const slide = HERO_SLIDES[i];
      if (!slide || !heroPanel) return;
      if (heroKicker) heroKicker.textContent = slide.kicker;
      if (heroHeadline) heroHeadline.textContent = slide.line1;
      if (heroTagline) heroTagline.textContent = slide.line2;
      else if (heroHeadline) heroHeadline.innerHTML = `${slide.line1}<span>${slide.line2}</span>`;
      if (heroDeck) heroDeck.textContent = HERO_LAUNCH_PANEL.deck;
      renderHeroCta();
      heroPanel.classList.remove("is-changing");
      void heroPanel.offsetWidth;
      heroPanel.classList.add("is-changing");
    }

    function sceneDelay(i) {
      const raw = scenes[i]?.dataset.delay;
      const n = raw ? parseInt(raw, 10) : 9000;
      return Number.isFinite(n) ? n : 9000;
    }

    function syncDots() {
      if (!dotsRoot) return;
      dotsRoot.querySelectorAll("button").forEach((dot, idx) => {
        dot.classList.toggle("is-active", idx === sceneIndex);
        dot.setAttribute("aria-current", idx === sceneIndex ? "true" : "false");
      });
    }

    function buildDots() {
      if (!dotsRoot || !scenes.length) return;
      dotsRoot.innerHTML = scenes
        .map(
          (_, idx) =>
            `<button type="button" aria-label="Hero slide ${idx + 1}" aria-current="${idx === 0 ? "true" : "false"}"></button>`
        )
        .join("");
      dotsRoot.querySelectorAll("button").forEach((dot, idx) => {
        dot.addEventListener("click", () => {
          sceneIndex = idx;
          showScene(sceneIndex);
          if (enabled) restartScenes();
        });
      });
      syncDots();
    }

    function pauseAllVideos() {
      scenes.forEach((scene) => {
        const video = scene.querySelector(".hero-video");
        if (video) video.pause();
      });
    }

    function syncVideos() {
      scenes.forEach((scene, idx) => {
        const video = scene.querySelector(".hero-video");
        if (!video) return;
        video.muted = true;
        video.playsInline = true;
        if (!enabled) {
          video.pause();
          return;
        }
        if (idx === sceneIndex) {
          const playPromise = video.play();
          if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
          video.currentTime = 0;
        }
      });
    }

    async function startAv() {
      startScenes();
      syncVideos();
      try {
        if (!audio.src) audio.src = playlist[trackIndex];
        if (audio.readyState < 2) audio.load();
        await audio.play();
      } catch (_) {
        audio.src = playlist[trackIndex];
        audio.load();
        try {
          await audio.play();
        } catch (_) {}
      }
    }

    function stopAv() {
      stopScenes();
      pauseAllVideos();
      audio.pause();
    }

    function setUi() {
      btn.classList.toggle("on", enabled);
      btn.setAttribute("aria-pressed", enabled ? "true" : "false");
      btn.setAttribute("aria-label", enabled ? "Turn sound and video off" : "Turn sound and video on");
      btn.title = enabled ? "Sound & video on — tap to stop" : "Sound & video off — tap to play";
      if (label) label.textContent = enabled ? "Turn off" : "Turn on";
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
      updateHeroPanel(i);
      syncVideos();
      syncDots();
    }

    function stopScenes() {
      if (sceneTimer) {
        clearTimeout(sceneTimer);
        sceneTimer = null;
      }
    }

    function restartScenes() {
      stopScenes();
      startScenes();
    }

    function startScenes() {
      if (!scenes.length) return;
      showScene(sceneIndex);
      if (sceneTimer) return;
      const tick = () => {
        if (!enabled) return;
        sceneTimer = setTimeout(() => {
          if (!enabled) return;
          sceneIndex = (sceneIndex + 1) % scenes.length;
          showScene(sceneIndex);
          tick();
        }, sceneDelay(sceneIndex));
      };
      tick();
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
        startAv();
      } else {
        stopAv();
      }
    }

    buildDots();
    showScene(sceneIndex);

    // Click is a user gesture — play/pause audio + video reliably here
    btn.addEventListener("click", async () => {
      enabled = !enabled;
      localStorage.setItem(STORAGE_KEY, enabled ? "1" : "0");
      setUi();
      if (enabled) {
        await startAv();
      } else {
        stopAv();
      }
    });

    // Listen page / podcasts duck ambient so booth audio stays clear
    let ducked = false;
    let wasEnabled = false;
    document.addEventListener("pgb:listen-play", () => {
      if (ducked) return;
      ducked = true;
      wasEnabled = enabled;
      if (enabled) {
        audio.pause();
        pauseAllVideos();
      }
    });
    document.addEventListener("pgb:listen-pause", () => {
      if (!ducked) return;
      ducked = false;
      if (wasEnabled && enabled) startAv();
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
    if (!window.PGBAuth) inject("assets/js/auth.js?v=2", "data-pgb-auth");
    inject("assets/js/support-widget.js?v=13", "data-pgb-support");
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

