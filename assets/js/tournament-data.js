/**
 * Weekend tourneys — Underdog Adults League (Founding Four) + Global Power Division
 * (persisted countdown for sales urgency).
 */
(function () {
  const KEY = "pgb-expansion-start";
  let start = localStorage.getItem(KEY);
  if (!start) {
    start = String(Date.now() + 24 * 60 * 60 * 1000);
    localStorage.setItem(KEY, start);
  }
  start = Number(start);

  const startDate = new Date(start);
  const endDate = new Date(start + 2.5 * 24 * 60 * 60 * 1000);

  function fmt(d) {
    return d.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  const foundingFour = [
    { slug: "miami-mighty-geckz", name: "Miami Mighty Geckz", code: "MMG", founding: true, division: "underdog", color: "#0f766e" },
    { slug: "mclean-cardinals", name: "McLean Climate Cardinals", code: "MC", founding: true, division: "underdog", color: "#991b1b" },
    { slug: "washington-whoomp", name: "Washington Whoomp!", code: "WW", founding: true, division: "underdog", color: "#1e3a8a" },
    { slug: "chattanooga-choo-choo", name: "Chattanooga Choo Choos", code: "CCC", founding: true, division: "underdog", color: "#78350f" },
  ];

  /** Global Power only — founding teams never appear in these pools */
  const expansionGlobal = [
    { slug: "dubai-dragons", name: "Dubai Dragons", code: "DD", pool: "A", founding: false, division: "global", color: "#b45309" },
    { slug: "nashville-snakes", name: "Nashville Snakes", code: "NS", pool: "A", founding: false, division: "global", color: "#166534" },
    { slug: "berlin-blackout", name: "Berlin Blackout", code: "BB", pool: "A", founding: false, division: "global", color: "#374151" },
    { slug: "tokyo-oni", name: "Tokyo Oni FC", code: "TO", pool: "A", founding: false, division: "global", color: "#dc2626" },
    { slug: "paris-bub-phoenixes", name: "Paris BUB Phoenixes", code: "PB", pool: "B", founding: false, division: "global", color: "#7c3aed" },
    { slug: "sao-paulo-shadow-punks", name: "São Paulo Shadow Punks", code: "SP", pool: "B", founding: false, division: "global", color: "#0f172a" },
    { slug: "london-crown", name: "London Crown Royals", code: "LC", pool: "B", founding: false, division: "global", color: "#1d4ed8" },
    { slug: "lagos-voltage", name: "Lagos Voltage", code: "LV", pool: "B", founding: false, division: "global", color: "#ca8a04" },
    { slug: "seoul-neon", name: "Seoul Neon Knights", code: "SN", pool: "C", founding: false, division: "global", color: "#0891b2" },
    { slug: "mumbai-monsoon", name: "Mumbai Monsoon", code: "MM", pool: "C", founding: false, division: "global", color: "#0369a1" },
    { slug: "mexico-city-solar", name: "Mexico City Solar", code: "MX", pool: "C", founding: false, division: "global", color: "#ea580c" },
    { slug: "sydney-surge", name: "Sydney Surge", code: "SS", pool: "D", founding: false, division: "global", color: "#059669" },
    { slug: "la-hibibi-jinni", name: "Los Angeles Hibibi Jinni", code: "HJ", pool: "D", founding: false, division: "global", color: "#7e22ce" },
  ];

  const underdogLeague = {
    id: "underdog-adults-league",
    name: "Underdog Adults League",
    tagline: "Founding Four · separate bracket",
    blurb: "The sacred founding underdogs run their own adults league tourney — round robin into Sunday Underdog Cup. Not mixed into Global Power pools.",
    format: "4-team round robin · Sunday Underdog Cup final · Sudden Death Strobe OT",
    teams: foundingFour,
    schedule: [
      { day: "Fri · Founding faceoff", items: ["Underdog Adults League openers", "Miracle Game lore block", "Fan Zone XP 2× for founding picks"] },
      { day: "Sat · Underdog heat", items: ["Round robin continues", "Conductor's Crest vote window", "Clip Crown founding cuts"] },
      { day: "Sun · Underdog Cup", items: ["Semifinals → Underdog Cup final", "Champions Miami defend the lore", "Separate from Global Power knockout"] },
    ],
  };

  const globalPower = {
    id: "global-power-division",
    name: "Global Power Division",
    tagline: "Expansion weekend · power markets only",
    blurb: "Twelve global franchises in four pools — nonstop Banana Hockey all weekend. Founding underdogs stay in their own league.",
    format: "4 pools · 12 teams (8–16 field) · Nonstop weekend · Expansion Cup knockout",
    teams: expansionGlobal,
    schedule: [
      { day: "Fri · Global faceoff", items: ["Pool openers (A–D)", "Global Power intros — Dubai · Nashville · Berlin lead Pool A", "Shop flash + Fan Zone XP 2×"] },
      { day: "Sat · Pool heat", items: ["Pool round 2–3 nonstop", "Aura vote windows live", "Clip Crown global submissions"] },
      { day: "Sun · Expansion Cup", items: ["QF → SF → Expansion Cup", "Sudden Death Strobe OT", "Global champion crowned — separate from Underdog Cup"] },
    ],
  };

  window.PGB_EXPANSION = {
    id: "expansion-weekend-dual",
    name: "Expansion Weekend · Dual tourneys",
    tagline: "Underdog Adults League + Global Power Division",
    blurb:
      "Two brackets this weekend: the Founding Four run their own Underdog Adults League tourney, while twelve global power markets battle in separate Expansion pools — nonstop action, zero crossover.",
    startMs: start,
    endMs: endDate.getTime(),
    startLabel: fmt(startDate),
    endLabel: fmt(endDate),
    venue: "Neon Reef · Multi-rink broadcast",
    format: "Dual tourneys · Underdog Cup + Expansion Cup",
    shopPush: "OG Limited Edition puck + 1-yr Premium Pass · handwritten note from the founders",
    foundingFour,
    expansionGlobal,
    underdogLeague,
    globalPower,
    /** Global Power pool teams only (legacy pages filter by pool) */
    teams: expansionGlobal,
    allTeams: [...foundingFour, ...expansionGlobal],
    schedule: [
      { day: "Fri · Faceoff", items: ["Underdog Adults League + Global Power both drop puck", "Founding lore block · Global pool intros", "Fan Zone XP 2×"] },
      { day: "Sat · Heat", items: ["Underdog round robin + Global pools nonstop", "Aura vote · Clip Crown open", "Separate standings per tourney"] },
      { day: "Sun · Finals", items: ["Underdog Cup final (Founding Four)", "Expansion Cup knockout (Global Power)", "Two champions · one weekend"] },
    ],
  };

  window.PGB_NEWS = [
    {
      id: "founding-four-recap",
      cat: "Championship",
      date: "2026-02-08",
      title: "The Founding Four: How Miami stole the first-ever PuckGold Cup",
      dek: "McLean looked unbeatable. Neon Reef wrote a different ending — Miracle Game OT, aggregate 6–5.",
      href: "news-article.html?id=founding-four-recap",
      hero: true,
    },
    {
      id: "expansion-prizes",
      cat: "Breaking",
      date: "2026-08-07",
      title: "Expansion Weekend prize vault unlocked — merch kits, Clip Crown, 5× farm",
      dek: "Underdog Adults League + Global Power Division. Major fan prizes all weekend. OG Pass members farm at 5×.",
      href: "news-article.html?id=expansion-prizes",
    },
    {
      id: "expansion-24h",
      cat: "Preview",
      date: "2026-08-06",
      title: "Dual tourneys tip off — Underdog Adults League + Global Power Division",
      dek: "Founding Four in their own bracket. Twelve global markets in separate pools. Sunday double finals.",
      href: "news-article.html?id=expansion-24h",
    },
    {
      id: "miracle-game",
      cat: "Recap",
      date: "2026-02-08",
      title: "The Miracle Game — period by period at Neon Reef",
      dek: "Down 5–1 aggregate after one. Triple-deke OT winner. Golden confetti. First champions.",
      href: "news-article.html?id=miracle-game",
    },
    {
      id: "golden-final-recap",
      cat: "Recap",
      date: "2026-02-08",
      title: "Down 3–1, Miami storms back — Golden Final G2 OT classic",
      dek: "Short cut of the night that made Season One lore.",
      href: "news-article.html?id=golden-final-recap",
    },
    {
      id: "empire-fallen",
      cat: "Feature",
      date: "2026-02-09",
      title: "Empire fallen: McLean played five-and-a-half perfect periods",
      dek: "It didn't matter. Inside the Cardinals' Golden Final that slipped away.",
      href: "news-article.html?id=empire-fallen",
    },
    {
      id: "choochoo-heart",
      cat: "Feature",
      date: "2026-02-09",
      title: "0–3 and everyone's second favorite — Chattanooga wins the Conductor's Crest",
      dek: "Nothing in the standings. Everything in the fans' hearts.",
      href: "news-article.html?id=choochoo-heart",
    },
    {
      id: "media-guide-drop",
      cat: "Media",
      date: "2026-08-06",
      title: "Season One Media Guide is live for press & partners",
      dek: "Broadcast booklet: league, teams, results, records — plus accreditation links.",
      href: "news-article.html?id=media-guide-drop",
    },
    {
      id: "booth-bomb-audio",
      cat: "Audio",
      date: "2026-02-09",
      title: "Booth Bomb: Miami’s late-night radio call goes viral",
      dek: "Walkout, goal call, win outro — drop the vault audio and ride the horn.",
      href: "news-article.html?id=booth-bomb-audio",
    },
    {
      id: "hardware-stack",
      cat: "Awards",
      date: "2026-02-10",
      title: "Trophy case: Cup, Golden Gecko, Wall, Conductor's Crest, Clutch",
      dek: "Full Season One hardware — render folders ready for hi-res drops.",
      href: "news-article.html?id=hardware-stack",
    },
    {
      id: "how-to-watch-weekend",
      cat: "Preview",
      date: "2026-08-06",
      title: "How to watch Expansion Weekend — streams, auras, and shop windows",
      dek: "Dual bracket map, OT rules, and the founding offer clock.",
      href: "news-article.html?id=how-to-watch-weekend",
    },
  ];

  window.PGBNews = {
    all() {
      return window.PGB_NEWS;
    },
    byId(id) {
      return window.PGB_NEWS.find((n) => n.id === id) || null;
    },
  };
})();
