/**
 * Founding Expansion Weekend — 16 teams, starts ~24h from first site visit
 * (persisted so the countdown stays locked for sales urgency).
 */
(function () {
  const KEY = "pgb-expansion-start";
  let start = localStorage.getItem(KEY);
  if (!start) {
    // Default: 24 hours from now — "this weekend" push
    start = String(Date.now() + 24 * 60 * 60 * 1000);
    localStorage.setItem(KEY, start);
  }
  start = Number(start);

  const startDate = new Date(start);
  const endDate = new Date(start + 2.5 * 24 * 60 * 60 * 1000); // ~weekend window

  function fmt(d) {
    return d.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  }

  window.PGB_EXPANSION = {
    id: "founding-expansion-weekend",
    name: "Founding Expansion Weekend",
    tagline: "Founding 4 → First 16 on the ice",
    blurb:
      "Eight new invite markets join the Founding Four for a lightning weekend — Banana Hockey format, Clip Crown energy, and founding merch on fire.",
    startMs: start,
    endMs: endDate.getTime(),
    startLabel: fmt(startDate),
    endLabel: fmt(endDate),
    venue: "Neon Reef · Multi-rink broadcast",
    format: "4 pools of 4 · Sunday knockout · Sudden Death Strobe OT",
    shopPush: "Weekend founding kit · free gold puck with Premium Pass",
    teams: [
      { slug: "miami-mighty-geckz", name: "Miami Mighty Geckz", code: "MMG", pool: "A", founding: true, color: "#0f766e" },
      { slug: "mclean-cardinals", name: "McLean Cardinals", code: "MC", pool: "A", founding: true, color: "#991b1b" },
      { slug: "brooklyn-breakaways", name: "Brooklyn Breakaways", code: "BB", pool: "A", founding: false, color: "#1e3a8a" },
      { slug: "austin-hot-sauce", name: "Austin Hot Sauce", code: "AHS", pool: "A", founding: false, color: "#9a3412" },
      { slug: "washington-whoomp", name: "Washington Whoomp!", code: "WW", pool: "B", founding: true, color: "#1e3a8a" },
      { slug: "chattanooga-choo-choo", name: "Chattanooga Choo Choo", code: "CCC", pool: "B", founding: true, color: "#78350f" },
      { slug: "denver-powder-kegs", name: "Denver Powder Kegs", code: "DPK", pool: "B", founding: false, color: "#334155" },
      { slug: "toronto-night-owls", name: "Toronto Night Owls", code: "TNO", pool: "B", founding: false, color: "#0f172a" },
      { slug: "vegas-mirage", name: "Vegas Mirage", code: "VM", pool: "C", founding: false, color: "#6b21a8" },
      { slug: "boston-harbor-howl", name: "Boston Harbor Howl", code: "BHH", pool: "C", founding: false, color: "#1e40af" },
      { slug: "portland-foghorns", name: "Portland Foghorns", code: "PF", pool: "C", founding: false, color: "#14532d" },
      { slug: "nashville-neon-rails", name: "Nashville Neon Rails", code: "NNR", pool: "C", founding: false, color: "#831843" },
      { slug: "chicago-wind-chill", name: "Chicago Wind Chill", code: "CWC", pool: "D", founding: false, color: "#0c4a6e" },
      { slug: "atlanta-peach-puck", name: "Atlanta Peach Puck", code: "APP", pool: "D", founding: false, color: "#9d174d" },
      { slug: "seattle-rainmakers", name: "Seattle Rainmakers", code: "SR", pool: "D", founding: false, color: "#134e4a" },
      { slug: "philly-liberty-ice", name: "Philly Liberty Ice", code: "PLI", pool: "D", founding: false, color: "#7f1d1d" },
    ],
    schedule: [
      { day: "Fri · Faceoff", items: ["Pool openers (A–D)", "Media night + Fan Zone XP 2×", "Shop flash: jerseys −15%"] },
      { day: "Sat · Heat", items: ["Pool round 2–3", "Aura vote windows live", "Clip Crown submissions open"] },
      { day: "Sun · Knockout", items: ["QF → SF → Expansion Cup", "Sudden Death Strobe OT", "Founding Pass + puck push"] },
    ],
  };

  window.PGB_NEWS = [
    {
      id: "expansion-24h",
      cat: "Breaking",
      date: "2026-08-06",
      title: "Founding Expansion Weekend tips off in 24 hours",
      dek: "Sixteen teams. One weekend. Founding merch and Premium League Pass on a sales clock.",
      href: "news-article.html?id=expansion-24h",
      hero: true,
    },
    {
      id: "golden-final-recap",
      cat: "Recap",
      date: "2026-02-08",
      title: "Down 3–1, Miami storms back — Golden Final G2 OT classic",
      dek: "Kai Sandoval’s strobe finish lifts the Geckz. Full recap, three stars, condensed cut.",
      href: "news-article.html?id=golden-final-recap",
    },
    {
      id: "media-guide-drop",
      cat: "Media",
      date: "2026-08-06",
      title: "Season One Media Guide is live for press & partners",
      dek: "LIV-style booklet: league, teams, results, records — plus accreditation links.",
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
      title: "The Hardware: Firehorse MVP, Clip Crown, and The Puck Gold One",
      dek: "Full trophy case with render folders ready for hi-res drops.",
      href: "news-article.html?id=hardware-stack",
    },
    {
      id: "how-to-watch-weekend",
      cat: "Preview",
      date: "2026-08-06",
      title: "How to watch Expansion Weekend — streams, auras, and shop windows",
      dek: "Pool map, OT rules, and the founding offer clock.",
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
