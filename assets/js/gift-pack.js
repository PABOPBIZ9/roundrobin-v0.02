/** PuckGold virtual gift packs — bonus rolls, send/open, leaderboard XP */
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
  ];

  const TRACKS = [
    { id: "silent", name: "No music", src: "" },
    { id: "pulse", name: "Ice Pulse (synth)", src: "" },
    { id: "horn", name: "Horn Ready", src: "" },
    { id: "strobe", name: "Strobe OT", src: "" },
  ];

  /** Weighted pack rip — averages ~18–35% with rare god-tier hits up to 1000× */
  function rollBonus() {
    const r = Math.random();
    let mult;
    let tier;
    if (r < 0.62) {
      // Common: 5%–40% → avg ~22%
      mult = 1 + (0.05 + Math.random() * 0.35);
      tier = "Common";
    } else if (r < 0.88) {
      // Uncommon: 40%–120%
      mult = 1 + (0.4 + Math.random() * 0.8);
      tier = "Uncommon";
    } else if (r < 0.97) {
      // Rare: 2×–10×
      mult = 2 + Math.random() * 8;
      tier = "Rare";
    } else if (r < 0.995) {
      // Epic: 10×–100×
      mult = 10 + Math.random() * 90;
      tier = "Epic";
    } else {
      // Legendary: 100×–1000×
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

  function createGift(payload) {
    const id = uid();
    const map = readGifts();
    const gift = {
      id,
      createdAt: new Date().toISOString(),
      openedAt: null,
      amount: Number(payload.amount) || 25,
      bonusPctFixed: 35,
      toEmail: payload.toEmail || "",
      toName: payload.toName || "Friend",
      fromName: payload.fromName || "A PuckGold fan",
      note: payload.note || "",
      vibe: payload.vibe || "sapphire",
      music: payload.music || "silent",
      countdownSec: payload.countdownSec || 8.5,
      status: "sent",
      reveal: null,
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
    const og = pickOgDrops(2 + Math.floor(Math.random() * 2)); // 2–3
    const base = g.amount;
    const withCardBonus = base * 1.35; // advertised 35% card bonus
    const final = withCardBonus * roll.mult;
    const farmPts = Math.round(50 + base * 2 + Math.min(roll.mult, 50) * 10);
    g.reveal = {
      roll,
      og,
      base,
      withCardBonus: Math.round(withCardBonus * 100) / 100,
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
      prev.xp = (prev.xp || 0) + pts;
      prev.giftFarm = (prev.giftFarm || 0) + pts;
      prev.lastGift = { pts, reason, at: new Date().toISOString() };
      localStorage.setItem(PLAY_KEY, JSON.stringify(prev));
    } catch (_) {}
  }

  function giftUrl(id) {
    return new URL(`gift-open.html?g=${encodeURIComponent(id)}`, location.href).href;
  }

  window.PGBGiftPack = {
    VIBES,
    OG_DROPS,
    TRACKS,
    rollBonus,
    pickOgDrops,
    createGift,
    getGift,
    openGift,
    giftUrl,
    addFarmPoints,
  };
})();
