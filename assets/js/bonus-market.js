/**
 * Live FOMO bonus market — card % and SOL boost tick every ~2 minutes.
 * Synced across tabs via time buckets so everyone sees the same pulse.
 */
(function () {
  const KEY = "pgb-bonus-market";
  const TICK_MS = 120000; // 2 minutes

  function bucket() {
    return Math.floor(Date.now() / TICK_MS);
  }

  function seeded(n) {
    // deterministic 0–1 from bucket
    const x = Math.sin(n * 12.9898 + 78.233) * 43758.5453;
    return x - Math.floor(x);
  }

  function compute(b) {
    // Card bonus swings 12%–48%, spends more time around 18–35%
    const wave = Math.sin(b / 2.2) * 0.5 + 0.5; // 0–1
    const jitter = seeded(b) * 0.22;
    let card = 12 + wave * 28 + jitter * 8; // ~12–48
    card = Math.round(Math.min(48, Math.max(12, card)) * 10) / 10;

    // SOL extra on top of card: +4% to +22%
    const solWave = Math.cos(b / 1.7) * 0.5 + 0.5;
    let sol = 4 + solWave * 14 + seeded(b + 9) * 4;
    sol = Math.round(Math.min(22, Math.max(4, sol)) * 10) / 10;

    // Big-stack FOMO: larger packs get a tiny display boost label
    const whale = card >= 30 ? "HOT" : card >= 22 ? "LIVE" : "OPEN";

    const endsAt = (b + 1) * TICK_MS;
    return {
      bucket: b,
      cardBonusPct: card,
      solBonusPct: sol,
      label: whale,
      endsAt,
      tickMs: TICK_MS,
    };
  }

  function getMarket() {
    const m = compute(bucket());
    try {
      localStorage.setItem(KEY, JSON.stringify({ ...m, cachedAt: Date.now() }));
    } catch (_) {}
    return m;
  }

  function msLeft() {
    return Math.max(0, getMarket().endsAt - Date.now());
  }

  function formatCountdown(ms) {
    const s = Math.ceil(ms / 1000);
    const m = Math.floor(s / 60);
    const r = s % 60;
    return `${String(m).padStart(2, "0")}:${String(r).padStart(2, "0")}`;
  }

  function creditFor(amount, opts = {}) {
    const m = getMarket();
    const cardPct = opts.cardBonusPct != null ? opts.cardBonusPct : m.cardBonusPct;
    const solPct = opts.paySol ? (opts.solBonusPct != null ? opts.solBonusPct : m.solBonusPct) : 0;
    const base = Number(amount) || 0;
    const withCard = base * (1 + cardPct / 100);
    const withSol = withCard * (1 + solPct / 100);
    return {
      amount: base,
      cardBonusPct: cardPct,
      solBonusPct: solPct,
      withCard: Math.round(withCard * 100) / 100,
      total: Math.round(withSol * 100) / 100,
      market: m,
    };
  }

  /** Subscribe to ticks — cb(market) every second for countdown UI */
  function watch(cb) {
    let lastBucket = bucket();
    const tick = () => {
      const m = getMarket();
      if (m.bucket !== lastBucket) {
        lastBucket = m.bucket;
        try {
          window.dispatchEvent(new CustomEvent("pgb:bonus-tick", { detail: m }));
        } catch (_) {}
      }
      cb(m, msLeft());
    };
    tick();
    return setInterval(tick, 1000);
  }

  window.PGBBonusMarket = {
    TICK_MS,
    getMarket,
    msLeft,
    formatCountdown,
    creditFor,
    watch,
  };
})();
