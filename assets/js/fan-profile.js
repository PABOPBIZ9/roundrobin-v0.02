/**
 * Fan social profiles — shareable URLs, Linktree verifies, tips, comments, subs.
 * Demo storage in localStorage (cloud later).
 */
(function () {
  const PROFILE_KEY = "pgb-fan-profile"; // your profile
  const PROFILES_KEY = "pgb-profiles"; // map of public profiles
  const COMMENTS_KEY = "pgb-profile-comments";
  const UPS_KEY = "pgb-profile-ups";
  const SUBS_KEY = "pgb-subs";
  const PLAY_KEY = "pgb-play";

  const PLATFORMS = [
    { id: "tiktok", label: "TikTok", pts: 40 },
    { id: "instagram", label: "Instagram", pts: 40 },
    { id: "snapchat", label: "Snapchat", pts: 30 },
    { id: "youtube", label: "YouTube", pts: 40 },
    { id: "x", label: "X / Twitter", pts: 30 },
    { id: "twitch", label: "Twitch", pts: 40 },
    { id: "whatnot", label: "Whatnot", pts: 50 },
    { id: "linktree", label: "Linktree", pts: 25 },
    { id: "discord", label: "Discord", pts: 25 },
  ];

  function slugify(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "")
      .slice(0, 24);
  }

  function uid() {
    return "c_" + Math.random().toString(36).slice(2, 10);
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

  function addXp(pts, reason) {
    try {
      const prev = readJSON(PLAY_KEY, {});
      const n = Number(pts) || 0;
      prev.points = (prev.points || 0) + n;
      prev.xp = (prev.xp || 0) + n;
      prev.socialFarm = (prev.socialFarm || 0) + n;
      prev.lastSocial = { pts: n, reason, at: new Date().toISOString() };
      writeJSON(PLAY_KEY, prev);
      window.dispatchEvent(new CustomEvent("pgb-play-update"));
    } catch (_) {}
    if (window.PGBGiftPack?.addFarmPoints && reason?.startsWith("gift")) {
      /* already handled */
    }
  }

  function defaultProfile() {
    return {
      handle: "",
      displayName: "PuckGold Fan",
      bio: "Farming gifts · climbing the board · Founding Four energy.",
      avatar: "🏒",
      links: [],
      createdAt: new Date().toISOString(),
      tipsReceived: 0,
      subscribers: 0,
      upvotes: 0,
    };
  }

  function myProfile() {
    let p = readJSON(PROFILE_KEY, null);
    if (!p) {
      p = defaultProfile();
      writeJSON(PROFILE_KEY, p);
    }
    return p;
  }

  function saveMyProfile(patch) {
    const p = { ...myProfile(), ...patch, updatedAt: new Date().toISOString() };
    if (patch.handle != null) p.handle = slugify(patch.handle);
    writeJSON(PROFILE_KEY, p);
    if (p.handle) publish(p);
    return p;
  }

  function allProfiles() {
    return readJSON(PROFILES_KEY, {});
  }

  function publish(p) {
    if (!p.handle) return;
    const map = allProfiles();
    map[p.handle] = {
      handle: p.handle,
      displayName: p.displayName,
      bio: p.bio,
      avatar: p.avatar,
      links: p.links || [],
      tipsReceived: p.tipsReceived || 0,
      subscribers: p.subscribers || 0,
      upvotes: p.upvotes || 0,
      updatedAt: new Date().toISOString(),
    };
    writeJSON(PROFILES_KEY, map);
  }

  function getByHandle(handle) {
    const h = slugify(handle);
    if (!h) return null;
    const mine = myProfile();
    if (mine.handle === h) return mine;
    return allProfiles()[h] || null;
  }

  function ensureHandle(preferred) {
    let p = myProfile();
    if (p.handle) return p;
    const base = slugify(preferred || p.displayName || "fan" + Math.floor(Math.random() * 9999));
    let h = base || "fan" + Date.now().toString(36).slice(-6);
    const map = allProfiles();
    let i = 0;
    while (map[h] && map[h].displayName !== p.displayName) {
      i += 1;
      h = (base + i).slice(0, 24);
    }
    p = saveMyProfile({ handle: h });
    addXp(25, "claim-handle");
    return p;
  }

  function profileUrl(handle) {
    const h = slugify(handle || myProfile().handle);
    return new URL(`profile.html?u=${encodeURIComponent(h)}`, location.href).href;
  }

  function shareUrl(handle) {
    const url = new URL(profileUrl(handle));
    const ref = localStorage.getItem("pgb-aff-code") || myProfile().handle;
    if (ref) url.searchParams.set("ref", ref);
    url.searchParams.set("utm_source", "profile");
    url.searchParams.set("utm_medium", "share");
    return url.href;
  }

  /* —— Linktree-style verify —— */
  function setLink(platform, url) {
    const p = myProfile();
    const links = (p.links || []).filter((l) => l.platform !== platform);
    links.push({
      platform,
      url: String(url || "").trim(),
      verified: false,
      verifiedAt: null,
    });
    return saveMyProfile({ links });
  }

  function verifyLink(platform) {
    const p = myProfile();
    const links = (p.links || []).map((l) => {
      if (l.platform !== platform) return l;
      return { ...l, verified: true, verifiedAt: new Date().toISOString() };
    });
    const meta = PLATFORMS.find((x) => x.id === platform);
    const already = (p.links || []).find((l) => l.platform === platform && l.verified);
    saveMyProfile({ links });
    if (!already && meta) {
      addXp(meta.pts, "social-verify-" + platform);
      return { ok: true, pts: meta.pts };
    }
    return { ok: true, pts: 0 };
  }

  /* —— Comments / upvotes / tip / subscribe —— */
  function comments(handle) {
    const all = readJSON(COMMENTS_KEY, {});
    return all[slugify(handle)] || [];
  }

  function addComment(handle, text, fromName) {
    const h = slugify(handle);
    const all = readJSON(COMMENTS_KEY, {});
    const list = all[h] || [];
    const c = {
      id: uid(),
      from: fromName || myProfile().displayName || "Fan",
      fromHandle: myProfile().handle || "",
      text: String(text || "").slice(0, 280),
      at: new Date().toISOString(),
      ups: 0,
    };
    list.unshift(c);
    all[h] = list.slice(0, 80);
    writeJSON(COMMENTS_KEY, all);
    addXp(8, "comment");
    return c;
  }

  function upvote(commentId, handle) {
    const ups = readJSON(UPS_KEY, {});
    if (ups[commentId]) return false;
    ups[commentId] = true;
    writeJSON(UPS_KEY, ups);
    const h = slugify(handle);
    const all = readJSON(COMMENTS_KEY, {});
    const list = all[h] || [];
    const c = list.find((x) => x.id === commentId);
    if (c) c.ups = (c.ups || 0) + 1;
    all[h] = list;
    writeJSON(COMMENTS_KEY, all);
    addXp(3, "upvote");
    return true;
  }

  function subscribe(handle) {
    const h = slugify(handle);
    const mine = myProfile();
    if (!h || h === mine.handle) return { ok: false };
    const subs = readJSON(SUBS_KEY, {});
    if (subs[h]) return { ok: true, already: true };
    subs[h] = { at: new Date().toISOString() };
    writeJSON(SUBS_KEY, subs);
    const map = allProfiles();
    if (map[h]) {
      map[h].subscribers = (map[h].subscribers || 0) + 1;
      writeJSON(PROFILES_KEY, map);
    }
    if (mine.handle === h) {
      saveMyProfile({ subscribers: (mine.subscribers || 0) + 1 });
    }
    addXp(20, "subscribe");
    return { ok: true };
  }

  function isSubscribed(handle) {
    return !!readJSON(SUBS_KEY, {})[slugify(handle)];
  }

  function tip(handle, coins) {
    const h = slugify(handle);
    const n = Math.max(1, Math.floor(Number(coins) || 0));
    if (window.PGBGems?.tipCoins) {
      const r = window.PGBGems.tipCoins(n);
      if (r === false || r?.ok === false) return { ok: false, reason: "coins" };
    }
    const map = allProfiles();
    if (map[h]) {
      map[h].tipsReceived = (map[h].tipsReceived || 0) + n;
      writeJSON(PROFILES_KEY, map);
    }
    const mine = myProfile();
    if (mine.handle === h) saveMyProfile({ tipsReceived: (mine.tipsReceived || 0) + n });
    addXp(Math.max(5, Math.floor(n / 10)), "tip");
    return { ok: true, coins: n };
  }

  function leaderboardSlice() {
    const play = readJSON(PLAY_KEY, {});
    const pts = play.points || play.xp || 0;
    const mine = myProfile();
    const bots = [
      { handle: "neonfarmr", name: "NeonFarmr", pts: 820 },
      { handle: "perchpulse", name: "PerchPulse", pts: 640 },
      { handle: "domedash", name: "DomeDash", pts: 510 },
      { handle: "whalegift", name: "WhaleGift", pts: 440 },
      { handle: "terminalxp", name: "TerminalXP", pts: 390 },
    ];
    const you = {
      handle: mine.handle || "you",
      name: (mine.displayName || "You") + " (you)",
      pts,
      you: true,
    };
    return [...bots, you].sort((a, b) => b.pts - a.pts).map((r, i) => ({ ...r, rank: i + 1 }));
  }

  function unlockTier(pts) {
    const p = pts != null ? pts : readJSON(PLAY_KEY, {}).points || 0;
    return [
      { id: "chat", label: "Profile comments", need: 0, unlocked: true },
      { id: "tip", label: "Tip with Coins", need: 50, unlocked: p >= 50 },
      { id: "frame", label: "Gold profile frame", need: 200, unlocked: p >= 200 },
      { id: "whale", label: "Whale gift presets", need: 400, unlocked: p >= 400 },
      { id: "live", label: "Live tip alerts (demo)", need: 800, unlocked: p >= 800 },
    ];
  }

  window.PGBProfile = {
    PLATFORMS,
    myProfile,
    saveMyProfile,
    ensureHandle,
    getByHandle,
    profileUrl,
    shareUrl,
    setLink,
    verifyLink,
    comments,
    addComment,
    upvote,
    subscribe,
    isSubscribed,
    tip,
    leaderboardSlice,
    unlockTiers,
    addXp,
    slugify,
  };
})();
