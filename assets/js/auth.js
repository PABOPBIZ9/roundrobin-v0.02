/**
 * PGBAuth — local session, Snapchat-style onboarding, membership multipliers.
 * Real payments later; demo checkout can grant OG Pass for 5× points.
 */
(function () {
  const SESSION_KEY = "pgb-auth";
  const MEMBER_KEY = "pgb-membership";
  const PLAY_KEY = "pgb-play";

  const AVATARS = [
    "🏒", "🐐", "🐯", "🦊", "🐺", "🐻", "🦁", "🐲", "🦄", "🐧",
    "🦈", "🦅", "🔥", "⚡", "💎", "👑", "🌟", "🎯", "🚀", "🧿",
    "😎", "🥶", "😈", "🤖", "👾", "🎭", "🥷", "👻", "🧠", "💪",
  ];

  const SIGNS = [
    { id: "aries", label: "Aries", emoji: "♈" },
    { id: "taurus", label: "Taurus", emoji: "♉" },
    { id: "gemini", label: "Gemini", emoji: "♊" },
    { id: "cancer", label: "Cancer", emoji: "♋" },
    { id: "leo", label: "Leo", emoji: "♌" },
    { id: "virgo", label: "Virgo", emoji: "♍" },
    { id: "libra", label: "Libra", emoji: "♎" },
    { id: "scorpio", label: "Scorpio", emoji: "♏" },
    { id: "sagittarius", label: "Sagittarius", emoji: "♐" },
    { id: "capricorn", label: "Capricorn", emoji: "♑" },
    { id: "aquarius", label: "Aquarius", emoji: "♒" },
    { id: "pisces", label: "Pisces", emoji: "♓" },
  ];

  const NAME_A = [
    "Neon", "Ice", "Gold", "Puck", "Clip", "Horn", "Reef", "Blitz",
    "Vault", "Strobe", "Perch", "Dome", "Banana", "Crown", "Sapphire",
    "Ruby", "Frost", "Turbo", "Pixel", "Shadow", "Lucky", "Chaos",
  ];
  const NAME_B = [
    "Rush", "Viper", "Ghost", "Farmr", "Pulse", "Dash", "Whale",
    "King", "Ace", "Fox", "Wolf", "Spark", "Drift", "Nova", "Bolt",
    "Sniper", "Captain", "Kid", "Beast", "Legend", "Bot", "Storm",
  ];

  const TIERS = {
    free: { id: "free", label: "Fan", multiplier: 1, min: 0 },
    og: { id: "og", label: "OG Pass", multiplier: 5, min: 36 },
    pro: { id: "pro", label: "Pro Pass", multiplier: 5, min: 60 },
    legend: { id: "legend", label: "Legend Pass", multiplier: 5, min: 100 },
  };

  function uid() {
    return "u_" + Math.random().toString(36).slice(2, 10);
  }

  function readJSON(key, fallback) {
    try {
      return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback));
    } catch (_) {
      return fallback;
    }
  }

  function writeJSON(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  }

  function pick(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  function randomAvatar() {
    return pick(AVATARS);
  }

  function randomSign() {
    return pick(SIGNS);
  }

  function randomDisplayName() {
    return pick(NAME_A) + pick(NAME_B) + String(Math.floor(Math.random() * 90) + 10);
  }

  function randomHandle(base) {
    const raw = String(base || randomDisplayName())
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "")
      .slice(0, 18);
    return (raw || "fan") + Math.floor(Math.random() * 90);
  }

  function shuffleKit() {
    const sign = randomSign();
    const displayName = randomDisplayName();
    return {
      avatar: randomAvatar(),
      signId: sign.id,
      signLabel: sign.label,
      signEmoji: sign.emoji,
      displayName,
      handle: randomHandle(displayName),
      bio: `${sign.emoji} ${sign.label} energy · farming the board · Founding Four.`,
    };
  }

  function session() {
    return readJSON(SESSION_KEY, null);
  }

  function isSignedIn() {
    const s = session();
    return !!(s && s.uid && s.email);
  }

  function isOnboarded() {
    const s = session();
    return !!(s && s.onboarded);
  }

  function membership() {
    const m = readJSON(MEMBER_KEY, null);
    if (!m || !m.tier) return { ...TIERS.free, at: null, source: null };
    const tier = TIERS[m.tier] || TIERS.free;
    return { ...tier, at: m.at || null, source: m.source || null, expiresAt: m.expiresAt || null };
  }

  function multiplier() {
    return membership().multiplier || 1;
  }

  function isPremium() {
    return multiplier() >= 5;
  }

  function grantMembership(tier, source) {
    const t = TIERS[tier] || TIERS.og;
    const payload = {
      tier: t.id,
      source: source || "demo",
      at: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString(),
    };
    writeJSON(MEMBER_KEY, payload);
    window.dispatchEvent(new CustomEvent("pgb-membership", { detail: payload }));
    return membership();
  }

  function awardPoints(base, reason) {
    const n = Math.max(0, Math.floor(Number(base) || 0));
    if (!n) return { awarded: 0, base: 0, mult: 1, reason };
    const mult = multiplier();
    const awarded = n * mult;
    const prev = readJSON(PLAY_KEY, {});
    prev.points = (prev.points || 0) + awarded;
    prev.xp = (prev.xp || 0) + awarded;
    prev.socialFarm = (prev.socialFarm || 0) + awarded;
    prev.lastSocial = {
      pts: awarded,
      base: n,
      mult,
      reason: reason || "action",
      at: new Date().toISOString(),
    };
    if (!prev.name && session()?.displayName) prev.name = session().displayName;
    writeJSON(PLAY_KEY, prev);
    window.dispatchEvent(
      new CustomEvent("pgb-play-update", { detail: { awarded, base: n, mult, reason } })
    );
    return { awarded, base: n, mult, reason, total: prev.points };
  }

  function signIn(email, opts) {
    const clean = String(email || "")
      .trim()
      .toLowerCase();
    if (!clean || !clean.includes("@")) return { ok: false, error: "email" };
    const existing = session();
    const s = {
      uid: existing?.uid || uid(),
      email: clean,
      onboarded: !!(existing?.onboarded || opts?.onboarded),
      displayName: existing?.displayName || null,
      createdAt: existing?.createdAt || new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
    };
    writeJSON(SESSION_KEY, s);
    window.dispatchEvent(new CustomEvent("pgb-auth", { detail: s }));
    return { ok: true, session: s, needsOnboarding: !s.onboarded };
  }

  function completeOnboarding(kit) {
    const s = session();
    if (!s) return { ok: false, error: "auth" };
    const data = {
      avatar: kit.avatar || randomAvatar(),
      displayName: kit.displayName || randomDisplayName(),
      handle: kit.handle,
      bio: kit.bio,
      signId: kit.signId,
      signLabel: kit.signLabel,
      signEmoji: kit.signEmoji,
    };

    if (window.PGBProfile) {
      window.PGBProfile.saveMyProfile({
        displayName: data.displayName,
        handle: data.handle,
        bio: data.bio || `${data.signEmoji || ""} ${data.signLabel || ""} · PuckGold farm.`.trim(),
        avatar: data.avatar,
        signId: data.signId,
        signLabel: data.signLabel,
        signEmoji: data.signEmoji,
      });
      window.PGBProfile.ensureHandle(data.handle);
    }

    const play = readJSON(PLAY_KEY, {});
    play.name = data.displayName;
    writeJSON(PLAY_KEY, play);

    const next = {
      ...s,
      onboarded: true,
      displayName: data.displayName,
      handle: (window.PGBProfile?.myProfile()?.handle || data.handle || "").toLowerCase(),
      avatar: data.avatar,
      signId: data.signId,
      signEmoji: data.signEmoji,
    };
    writeJSON(SESSION_KEY, next);

    // Welcome farm burst
    awardPoints(50, "onboard-welcome");

    window.dispatchEvent(new CustomEvent("pgb-auth", { detail: next }));
    return { ok: true, session: next, profile: window.PGBProfile?.myProfile?.() };
  }

  function signOut() {
    localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new CustomEvent("pgb-auth", { detail: null }));
  }

  function requireAuth(redirect) {
    if (isSignedIn() && isOnboarded()) return true;
    const next = redirect || location.pathname.split("/").pop() || "profile.html";
    location.href = `signin.html?next=${encodeURIComponent(next)}`;
    return false;
  }

  function navChip() {
    if (!isSignedIn()) return null;
    const s = session();
    const p = window.PGBProfile?.myProfile?.() || {};
    const m = membership();
    return {
      avatar: p.avatar || s.avatar || "🏒",
      handle: p.handle || s.handle || "fan",
      displayName: p.displayName || s.displayName || "Fan",
      premium: m.multiplier >= 5,
      mult: m.multiplier,
      tierLabel: m.label,
    };
  }

  window.PGBAuth = {
    AVATARS,
    SIGNS,
    TIERS,
    session,
    isSignedIn,
    isOnboarded,
    membership,
    multiplier,
    isPremium,
    grantMembership,
    awardPoints,
    signIn,
    completeOnboarding,
    signOut,
    requireAuth,
    navChip,
    shuffleKit,
    randomAvatar,
    randomSign,
    randomDisplayName,
    randomHandle,
  };
})();
