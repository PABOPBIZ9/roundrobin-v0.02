/** Pucky 13 entitlements — unlocks after checkout / tip */
(function () {
  const KEY = "pgb-pucky13-entitlements";
  const INTAKE_KEY = "pgb-pucky13-deep-intake";
  const SOL_KEY = "pgb-pucky-sol-address";

  const SKU_MAP = {
    "pucky-tip-13": { tip: true, label: "Lucky 13 tip" },
    "pucky-tip-3-50": { tip: true, label: "Coffee tip" },
    "pucky-daily-astro": { dailyAstro: true, days: 1, label: "Daily astrology" },
    "pucky-premium-dad-jokes": { dadJokes: true, days: 13, label: "Premium dad jokes" },
    "pucky-deep-astro": { deepAstro: true, label: "Deep astrology report" },
  };

  function read() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (_) {
      return {};
    }
  }

  function write(data) {
    localStorage.setItem(KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent("pgb-pucky-entitlements", { detail: data }));
  }

  function grantFromItems(items) {
    const data = read();
    const now = Date.now();
    const granted = [];
    (items || []).forEach((item) => {
      const map = SKU_MAP[item.id];
      if (!map) return;
      if (map.tip) {
        data.tips = (data.tips || 0) + (item.price || 0) * (item.qty || 1);
        data.lastTipAt = new Date().toISOString();
        granted.push(map.label);
      }
      if (map.dailyAstro) {
        const add = (map.days || 1) * 24 * 60 * 60 * 1000 * (item.qty || 1);
        data.dailyAstroUntil = Math.max(data.dailyAstroUntil || 0, now) + add;
        granted.push(map.label);
      }
      if (map.dadJokes) {
        const add = (map.days || 13) * 24 * 60 * 60 * 1000 * (item.qty || 1);
        data.dadJokesUntil = Math.max(data.dadJokesUntil || 0, now) + add;
        granted.push(map.label);
      }
      if (map.deepAstro) {
        data.deepAstro = true;
        data.deepAstroAt = new Date().toISOString();
        data.deepAstroStatus = data.deepIntake ? "queued" : "needs-intake";
        granted.push(map.label);
      }
    });
    if (granted.length) write(data);
    return granted;
  }

  function hasDailyAstro() {
    return (read().dailyAstroUntil || 0) > Date.now();
  }
  function hasDadJokes() {
    return (read().dadJokesUntil || 0) > Date.now();
  }
  function hasDeep() {
    return !!read().deepAstro;
  }
  function tipTotal() {
    return Number(read().tips || 0);
  }

  function saveIntake(intake) {
    localStorage.setItem(INTAKE_KEY, JSON.stringify({ ...intake, at: new Date().toISOString() }));
    const data = read();
    data.deepIntake = true;
    if (data.deepAstro && data.deepAstroStatus === "needs-intake") data.deepAstroStatus = "queued";
    write(data);
  }

  function readIntake() {
    try {
      return JSON.parse(localStorage.getItem(INTAKE_KEY) || "null");
    } catch (_) {
      return null;
    }
  }

  function solAddress() {
    try {
      const q = new URLSearchParams(location.search).get("setSol");
      if (q && /^[1-9A-HJ-NP-Za-km-z]{32,48}$/.test(q)) {
        localStorage.setItem(SOL_KEY, q);
        history.replaceState(null, "", location.pathname + location.hash);
      }
    } catch (_) {}
    return (
      window.PGB_PUCKY_SOL_ADDRESS ||
      localStorage.getItem(SOL_KEY) ||
      ""
    );
  }

  window.PGBPucky = {
    SKU_MAP,
    read,
    grantFromItems,
    hasDailyAstro,
    hasDadJokes,
    hasDeep,
    tipTotal,
    saveIntake,
    readIntake,
    solAddress,
    dailySol: 0.035,
    tip13Sol: 0.13,
  };
})();
