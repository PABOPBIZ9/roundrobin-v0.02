/** PuckGold virtual gift packs — custom amounts, FOMO bonus, SOL boost, farm XP */
(function () {
  const GIFTS_KEY = "pgb-virtual-gifts";
  const PLAY_KEY = "pgb-play";

  const VIBES = [
    { id: "sapphire", name: "Sapphire Ice", gradient: "linear-gradient(145deg,#0b1220,#163a74,#3d6fbf)" },
    { id: "champagne", name: "Champagne Drop", gradient: "linear-gradient(145deg,#1a1408,#d4af37,#f0d78c)" },
    { id: "ruby", name: "Ruby Horn", gradient: "linear-gradient(145deg,#1a0c10,#7a1524,#c23b4a)" },
    { id: "platinum", name: "Platinum Vault", gradient: "linear-gradient(145deg,#121826,#eef1f4,#8a93a3)" },
    { id: "reef", name: "Geckz Reef", gradient: "linear-gradient(145deg,#042f2e,#0f766e,#5eead4)" },
    { id: "perch", name: "Cardinal Perch", gradient: "linear-gradient(145deg,#450a0a,#991b1b,#fca5a5)" },
  ];

  const OG_DROPS = [
    { id: "og-puck", name: "OG Gold Puck (Digital)", rarity: "Legendary" },
    { id: "og-horn", name: "Founding Horn Drop", rarity: "Epic" },
    { id: "og-suite", name: "Virtual Suite Key (7d)", rarity: "Rare" },
    { id: "og-stickers", name: "Founding Four Sticker Pack", rarity: "Rare" },
    { id: "og-aura", name: "Aura Vote Boost ×3", rarity: "Epic" },
    { id: "og-frame", name: "Profile Frame · Gold", rarity: "Epic" },
    { id: "og-badge", name: "Whale Farmer Badge", rarity: "Legendary" },
  ];

  const TRACKS = [
    { id: "silent", name: "No music", src: "" },
    { id: "pulse", name: "Ice Pulse (synth)", src: "" },
    { id: "horn", name: "Horn Ready", src: "" },
    { id: "strobe", name: "Strobe OT", src: "" },
  ];

  /** Preset gift stack sizes */
  const PRESETS = [
    { amt: 35, name: "Starter Stack", tag: "ENTRY", tone: "" },
    { amt: 88, name: "Lucky Eighty-Eight", tag: "HOT", tone: "hot" },
    { amt: 150, name: "Mid Ice", tag: "", tone: "" },
    { amt: 350, name: "Whale Pack", tag: "PUSH", tone: "whale" },
    { amt: 1000, name: "Vault Key", tag: "MAX", tone: "whale" },
  ];

  const MIN_AMT = 10;
  const MAX_AMT = 5000;

  function clampAmount(n) {
    const v = Math.round(Number(n) || 0);
    return Math.min(MAX_AMT, Math.max(MIN_AMT, v));
  }

  function rollBonus() {
    const r = Math.random();
    let mult;
    let tier;
    if (r < 0.62) {
      mult = 1 + (0.05 + Math.random() * 0.35);
      tier = "Common";
    } else if (r < 0.88) {
      mult = 1 + (0.4 + Math.random() * 0.8);
      tier = "Uncommon";
    } else if (r < 0.97) {
      mult = 2 + Math.random() * 8;
      tier = "Rare";
    } else if (r < 0.995) {
      mult = 10 + Math.random() * 90;
      tier = "Epic";
    } else {
      mult = 100 + Math.random() * 900;
      tier = "Legendary";
    }
    const pct = (mult - 1) * 100;
    return {
      mult: Math.round(mult * 100) / 100,
      pct: Math.round(pct * 10) / 10,
      tier,
      display: mult >= 2 ? `${mult.toFixed(mult >= 10 ? 0 : 1)}×` : `+${pct.toFixed(1)}%`,
    };
  }

  function pickOgDrops(n) {
    const pool = OG_DROPS.slice().sort(() => Math.random() - 0.5);
    return pool.slice(0, n);
  }

  function uid() {
    return "pgb_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
  }

  function readGifts() {
    try {
      return JSON.parse(localStorage.getItem(GIFTS_KEY) || "{}");
    } catch (_) {
      return {};
    }
  }

  function writeGifts(map) {
    localStorage.setItem(GIFTS_KEY, JSON.stringify(map));
  }

  function snapshotBonus(paySol) {
    const m = window.PGBBonusMarket?.getMarket?.() || { cardBonusPct: 35, solBonusPct: 10 };
    return {
      cardBonusPct: m.cardBonusPct,
      solBonusPct: paySol ? m.solBonusPct : 0,
      marketLabel: m.label || "LIVE",
      snapAt: new Date().toISOString(),
    };
  }

  function createGift(payload) {
    const id = uid();
    const map = readGifts();
    const amount = clampAmount(payload.amount);
    const paySol = !!payload.paySol;
    const snap = snapshotBonus(paySol);
    const gift = {
      id,
      createdAt: new Date().toISOString(),
      openedAt: null,
      amount,
      bonusPctFixed: snap.cardBonusPct,
      solBonusPct: snap.solBonusPct,
      paySol,
      payMethod: paySol ? "sol" : "card",
      toEmail: payload.toEmail || "",
      toName: payload.toName || "Friend",
      fromName: payload.fromName || "A PuckGold fan",
      fromHandle: payload.fromHandle || "",
      note: payload.note || "",
      vibe: payload.vibe || "sapphire",
      music: payload.music || "silent",
      countdownSec: payload.countdownSec || 8.5,
      status: "sent",
      reveal: null,
      marketSnap: snap,
    };
    map[id] = gift;
    writeGifts(map);
    return gift;
  }

  function getGift(id) {
    return readGifts()[id] || null;
  }

  function openGift(id) {
    const map = readGifts();
    const g = map[id];
    if (!g) return null;
    if (g.reveal) return g;
    const roll = rollBonus();
    const og = pickOgDrops(2 + Math.floor(Math.random() * 2));
    const base = g.amount;
    const cardPct = g.bonusPctFixed != null ? g.bonusPctFixed : 35;
    const solPct = g.paySol ? g.solBonusPct || 0 : 0;
    const withCardBonus = base * (1 + cardPct / 100);
    const withSol = withCardBonus * (1 + solPct / 100);
    const final = withSol * roll.mult;
    const farmPts = Math.round(50 + base * 2 + Math.min(roll.mult, 50) * 10 + (g.paySol ? 40 : 0));
    g.reveal = {
      roll,
      og,
      base,
      cardBonusPct: cardPct,
      solBonusPct: solPct,
      paySol: !!g.paySol,
      withCardBonus: Math.round(withCardBonus * 100) / 100,
      withSolBonus: Math.round(withSol * 100) / 100,
      finalCredit: Math.round(final * 100) / 100,
      farmPts,
    };
    g.openedAt = new Date().toISOString();
    g.status = "opened";
    map[id] = g;
    writeGifts(map);
    addFarmPoints(farmPts, "gift-open");
    return g;
  }

  function addFarmPoints(pts, reason) {
    try {
      const prev = JSON.parse(localStorage.getItem(PLAY_KEY) || "{}");
      const n = Number(pts) || 0;
      // Unify ledger: points drives leaderboard; xp kept as alias
      prev.points = (prev.points || 0) + n;
      prev.xp = (prev.xp || 0) + n;
      if ((prev.xp || 0) > (prev.points || 0) && !prev._migratedXp) {
        prev.points = Math.max(prev.points || 0, prev.xp || 0);
        prev._migratedXp = true;
      }
      prev.giftFarm = (prev.giftFarm || 0) + n;
      prev.lastGift = { pts: n, reason, at: new Date().toISOString() };
      localStorage.setItem(PLAY_KEY, JSON.stringify(prev));
      try {
        window.dispatchEvent(new CustomEvent("pgb-play-update"));
      } catch (_) {}
    } catch (_) {}
  }

  function giftUrl(id) {
    return new URL(`gift-open.html?g=${encodeURIComponent(id)}`, location.href).href;
  }

  function previewCredit(amount, paySol) {
    if (window.PGBBonusMarket) return window.PGBBonusMarket.creditFor(clampAmount(amount), { paySol });
    const base = clampAmount(amount);
    const withCard = base * 1.35;
    return {
      amount: base,
      cardBonusPct: 35,
      solBonusPct: paySol ? 10 : 0,
      withCard: Math.round(withCard * 100) / 100,
      total: Math.round(withCard * (paySol ? 1.1 : 1) * 100) / 100,
    };
  }

  window.PGBGiftPack = {
    VIBES,
    OG_DROPS,
    TRACKS,
    PRESETS,
    MIN_AMT,
    MAX_AMT,
    clampAmount,
    rollBonus,
    pickOgDrops,
    createGift,
    getGift,
    openGift,
    giftUrl,
    addFarmPoints,
    previewCredit,
  };
})();
