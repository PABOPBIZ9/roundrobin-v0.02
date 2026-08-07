/** PuckGold gems economy — Sapphires / Rubies / Coins + digital gifts (TikTok/Robux/Twitch-style) */
(function () {
  const WALLET_KEY = "pgb-gems-wallet";
  const INV_KEY = "pgb-gems-inventory";
  const SENT_KEY = "pgb-gems-sent";
  const PLAY_KEY = "pgb-play";

  const PACKS = [
    { id: "pack-80", usd: 0.99, sapphires: 80, rubies: 0, coins: 0, tag: "Starter", bonus: "" },
    { id: "pack-500", usd: 4.99, sapphires: 500, rubies: 5, coins: 200, tag: "Popular", bonus: "+5 Rubies" },
    { id: "pack-1200", usd: 9.99, sapphires: 1200, rubies: 20, coins: 600, tag: "Best value", bonus: "+20 Rubies · +600 Coins", hot: true },
    { id: "pack-2800", usd: 19.99, sapphires: 2800, rubies: 60, coins: 1500, tag: "Pro", bonus: "+60 Rubies" },
    { id: "pack-6500", usd: 39.99, sapphires: 6500, rubies: 180, coins: 4000, tag: "Whale", bonus: "+180 Rubies · +4K Coins" },
    { id: "pack-15000", usd: 79.99, sapphires: 15000, rubies: 500, coins: 10000, tag: "Founding vault", bonus: "+500 Rubies · +10K Coins", hot: true },
  ];

  const GIFTS = [
    { id: "gift-puck", name: "Ice Puck", priceS: 1, priceR: 0, emoji: "🏒", vibe: "Tip the ice", tier: "Common" },
    { id: "gift-flame", name: "Horn Flame", priceS: 9, priceR: 0, emoji: "🔥", vibe: "Goal energy", tier: "Common" },
    { id: "gift-rose", name: "Rose Gold", priceS: 49, priceR: 0, emoji: "🌹", vibe: "Soft flex", tier: "Uncommon" },
    { id: "gift-diamond", name: "Platinum Diamond", priceS: 99, priceR: 0, emoji: "💎", vibe: "Vault drip", tier: "Uncommon" },
    { id: "gift-lion", name: "Whoomp Thunder", priceS: 299, priceR: 0, emoji: "⚡", vibe: "District power", tier: "Rare" },
    { id: "gift-train", name: "Choo Choo Express", priceS: 499, priceR: 1, emoji: "🚂", vibe: "Terminal flex", tier: "Rare" },
    { id: "gift-cardinal", name: "Perch Crown", priceS: 899, priceR: 2, emoji: "👑", vibe: "Royalty drop", tier: "Epic" },
    { id: "gift-gecko", name: "Reef God", priceS: 1299, priceR: 5, emoji: "🦎", vibe: "Miami mythic", tier: "Epic" },
    { id: "gift-universe", name: "Universe On Ice", priceS: 4999, priceR: 25, emoji: "🌌", vibe: "Screen-takeover", tier: "Legendary" },
    { id: "gift-og", name: "OG Gold Puck", priceS: 0, priceR: 50, emoji: "🥇", vibe: "Ruby-only OG", tier: "Legendary" },
    { id: "gift-strobe", name: "Sudden Death Strobe", priceS: 1999, priceR: 10, emoji: "💥", vibe: "OT chaos", tier: "Epic" },
    { id: "gift-suite", name: "Virtual Suite Key", priceS: 799, priceR: 3, emoji: "🔑", vibe: "Lounge pass", tier: "Rare" },
  ];

  const GOODS = [
    { id: "good-badge", name: "Animated Profile Badge", priceS: 150, priceR: 0, type: "Profile", desc: "Permanent flair on Fan Zone" },
    { id: "good-emotes", name: "Founding Four Emote Pack", priceS: 250, priceR: 0, type: "Emotes", desc: "Chat / stream emotes" },
    { id: "good-frame", name: "Champagne Cam Frame", priceS: 400, priceR: 2, type: "Overlay", desc: "Live stream cam border" },
    { id: "good-alert", name: "Horn Alert Bundle", priceS: 600, priceR: 5, type: "Alerts", desc: "Twitch/TikTok-style gift alerts" },
    { id: "good-locker", name: "LockerVision Skin Drop", priceS: 900, priceR: 8, type: "Outfit", desc: "Exclusive outfit unlock" },
    { id: "good-boost", name: "Aura Vote ×10", priceS: 120, priceR: 0, type: "Boost", desc: "Instant Fan Zone power" },
  ];

  function defaultWallet() {
    return { sapphires: 0, rubies: 0, coins: 0, spentUsd: 0, giftsSent: 0, updatedAt: null };
  }

  function readWallet() {
    try {
      return Object.assign(defaultWallet(), JSON.parse(localStorage.getItem(WALLET_KEY) || "{}"));
    } catch (_) {
      return defaultWallet();
    }
  }

  function writeWallet(w) {
    w.updatedAt = new Date().toISOString();
    localStorage.setItem(WALLET_KEY, JSON.stringify(w));
    window.dispatchEvent(new CustomEvent("pgb:wallet", { detail: w }));
    return w;
  }

  function readInv() {
    try {
      return JSON.parse(localStorage.getItem(INV_KEY) || "[]");
    } catch (_) {
      return [];
    }
  }

  function writeInv(list) {
    localStorage.setItem(INV_KEY, JSON.stringify(list));
  }

  function buyPack(packId) {
    const pack = PACKS.find((p) => p.id === packId);
    if (!pack) return { ok: false, error: "Pack not found" };
    const w = readWallet();
    w.sapphires += pack.sapphires;
    w.rubies += pack.rubies;
    w.coins += pack.coins;
    w.spentUsd = Math.round((w.spentUsd + pack.usd) * 100) / 100;
    writeWallet(w);
    addXp(Math.round(pack.usd * 10), "gem-pack");
    return { ok: true, wallet: w, pack };
  }

  function canAfford(priceS, priceR) {
    const w = readWallet();
    return w.sapphires >= (priceS || 0) && w.rubies >= (priceR || 0);
  }

  function spend(priceS, priceR) {
    const w = readWallet();
    if (w.sapphires < (priceS || 0) || w.rubies < (priceR || 0)) return null;
    w.sapphires -= priceS || 0;
    w.rubies -= priceR || 0;
    return writeWallet(w);
  }

  function buyGood(goodId) {
    const g = GOODS.find((x) => x.id === goodId);
    if (!g) return { ok: false, error: "Not found" };
    if (!canAfford(g.priceS, g.priceR)) return { ok: false, error: "Not enough Sapphires/Rubies" };
    spend(g.priceS, g.priceR);
    const inv = readInv();
    inv.push({ ...g, at: new Date().toISOString(), kind: "good" });
    writeInv(inv);
    addXp(25, "digital-good");
    return { ok: true, item: g, wallet: readWallet() };
  }

  function sendGift(giftId, toName, note) {
    const g = GIFTS.find((x) => x.id === giftId);
    if (!g) return { ok: false, error: "Gift not found" };
    if (!canAfford(g.priceS, g.priceR)) return { ok: false, error: "Not enough Sapphires/Rubies — buy a pack" };
    const w = spend(g.priceS, g.priceR);
    w.giftsSent = (w.giftsSent || 0) + 1;
    writeWallet(w);
    const row = {
      id: "sg_" + Math.random().toString(36).slice(2, 9),
      gift: g,
      toName: toName || "Streamer",
      note: note || "",
      at: new Date().toISOString(),
    };
    try {
      const prev = JSON.parse(localStorage.getItem(SENT_KEY) || "[]");
      prev.unshift(row);
      localStorage.setItem(SENT_KEY, JSON.stringify(prev.slice(0, 50)));
    } catch (_) {}
    addXp(15 + Math.min(g.priceS, 200), "digital-gift-send");
    return { ok: true, sent: row, wallet: readWallet() };
  }

  function tipCoins(amount, toName) {
    const n = Math.max(1, Math.floor(Number(amount) || 0));
    const w = readWallet();
    if (w.coins < n) return { ok: false, error: "Not enough Coins" };
    w.coins -= n;
    writeWallet(w);
    addXp(Math.max(5, Math.floor(n / 20)), "coin-tip");
    return { ok: true, wallet: w, toName: toName || "Creator" };
  }

  function addXp(pts, reason) {
    if (window.PGBAuth?.awardPoints) {
      const r = window.PGBAuth.awardPoints(pts, reason || "gems");
      try {
        const prev = JSON.parse(localStorage.getItem(PLAY_KEY) || "{}");
        prev.gemFarm = (prev.gemFarm || 0) + (r.awarded || 0);
        prev.lastGem = { pts: r.awarded, base: r.base, mult: r.mult, reason, at: new Date().toISOString() };
        localStorage.setItem(PLAY_KEY, JSON.stringify(prev));
      } catch (_) {}
      return r;
    }
    try {
      const prev = JSON.parse(localStorage.getItem(PLAY_KEY) || "{}");
      prev.points = (prev.points || 0) + pts;
      prev.xp = (prev.xp || 0) + pts;
      prev.gemFarm = (prev.gemFarm || 0) + pts;
      prev.lastGem = { pts, reason, at: new Date().toISOString() };
      localStorage.setItem(PLAY_KEY, JSON.stringify(prev));
      window.dispatchEvent(new CustomEvent("pgb-play-update"));
    } catch (_) {}
  }

  function sentHistory() {
    try {
      return JSON.parse(localStorage.getItem(SENT_KEY) || "[]");
    } catch (_) {
      return [];
    }
  }

  window.PGBGems = {
    PACKS,
    GIFTS,
    GOODS,
    readWallet,
    buyPack,
    buyGood,
    sendGift,
    tipCoins,
    readInv,
    sentHistory,
    canAfford,
  };
})();
