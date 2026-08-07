/**
 * Fan social profiles — Snapchat/TikTok style share, Reddit votes, likes, comments.
 * Points flow through PGBAuth.awardPoints (5× for OG Pass+).
 */
(function () {
  const PROFILE_KEY = "pgb-fan-profile";
  const PROFILES_KEY = "pgb-profiles";
  const COMMENTS_KEY = "pgb-profile-comments";
  const UPS_KEY = "pgb-profile-ups";
  const DOWNS_KEY = "pgb-profile-downs";
  const LIKES_KEY = "pgb-profile-likes";
  const FEED_KEY = "pgb-feed";
  const FEED_LIKES_KEY = "pgb-feed-likes";
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

  const POINT_TABLE = {
    comment: 8,
    upvote: 3,
    downvote: 1,
    like: 2,
    unlike: 0,
    subscribe: 20,
    "claim-handle": 25,
    "feed-post": 12,
    "feed-like": 2,
    tip: 5,
  };

  function slugify(s) {
    return String(s || "")
      .toLowerCase()
      .replace(/[^a-z0-9_]+/g, "")
      .slice(0, 24);
  }

  function uid(prefix) {
    return (prefix || "c_") + Math.random().toString(36).slice(2, 10);
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
    if (window.PGBAuth?.awardPoints) {
      return window.PGBAuth.awardPoints(pts, reason);
    }
    const n = Number(pts) || 0;
    const prev = readJSON(PLAY_KEY, {});
    prev.points = (prev.points || 0) + n;
    prev.xp = (prev.xp || 0) + n;
    prev.socialFarm = (prev.socialFarm || 0) + n;
    prev.lastSocial = { pts: n, reason, at: new Date().toISOString() };
    writeJSON(PLAY_KEY, prev);
    window.dispatchEvent(new CustomEvent("pgb-play-update"));
    return { awarded: n, base: n, mult: 1, reason };
  }

  function defaultProfile() {
    return {
      handle: "",
      displayName: "PuckGold Fan",
      bio: "Farming gifts · climbing the board · Founding Four energy.",
      avatar: "🏒",
      signId: "",
      signLabel: "",
      signEmoji: "",
      likes: 0,
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
      signId: p.signId || "",
      signLabel: p.signLabel || "",
      signEmoji: p.signEmoji || "",
      likes: p.likes || 0,
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
    addXp(POINT_TABLE["claim-handle"], "claim-handle");
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
      const r = addXp(meta.pts, "social-verify-" + platform);
      return { ok: true, pts: r.awarded, base: meta.pts, mult: r.mult };
    }
    return { ok: true, pts: 0, base: 0, mult: 1 };
  }

  /* —— Comments / Reddit votes / TikTok like —— */
  function comments(handle) {
    const all = readJSON(COMMENTS_KEY, {});
    return all[slugify(handle)] || [];
  }

  function addComment(handle, text, fromName) {
    const h = slugify(handle);
    const all = readJSON(COMMENTS_KEY, {});
    const list = all[h] || [];
    const mine = myProfile();
    const c = {
      id: uid("c_"),
      from: fromName || mine.displayName || "Fan",
      fromHandle: mine.handle || "",
      fromAvatar: mine.avatar || "🏒",
      text: String(text || "").slice(0, 280),
      at: new Date().toISOString(),
      ups: 0,
      downs: 0,
      likes: 0,
    };
    list.unshift(c);
    all[h] = list.slice(0, 80);
    writeJSON(COMMENTS_KEY, all);
    const r = addXp(POINT_TABLE.comment, "comment");
    return { comment: c, points: r };
  }

  function voteState(commentId) {
    const ups = readJSON(UPS_KEY, {});
    const downs = readJSON(DOWNS_KEY, {});
    if (ups[commentId]) return "up";
    if (downs[commentId]) return "down";
    return null;
  }

  function upvote(commentId, handle) {
    const ups = readJSON(UPS_KEY, {});
    const downs = readJSON(DOWNS_KEY, {});
    if (ups[commentId]) return { ok: false, already: true };
    const h = slugify(handle);
    const all = readJSON(COMMENTS_KEY, {});
    const list = all[h] || [];
    const c = list.find((x) => x.id === commentId);
    if (!c) return { ok: false };

    if (downs[commentId]) {
      delete downs[commentId];
      c.downs = Math.max(0, (c.downs || 0) - 1);
      writeJSON(DOWNS_KEY, downs);
    }
    ups[commentId] = true;
    writeJSON(UPS_KEY, ups);
    c.ups = (c.ups || 0) + 1;
    all[h] = list;
    writeJSON(COMMENTS_KEY, all);
    const r = addXp(POINT_TABLE.upvote, "upvote");
    return { ok: true, points: r };
  }

  function downvote(commentId, handle) {
    const ups = readJSON(UPS_KEY, {});
    const downs = readJSON(DOWNS_KEY, {});
    if (downs[commentId]) return { ok: false, already: true };
    const h = slugify(handle);
    const all = readJSON(COMMENTS_KEY, {});
    const list = all[h] || [];
    const c = list.find((x) => x.id === commentId);
    if (!c) return { ok: false };

    if (ups[commentId]) {
      delete ups[commentId];
      c.ups = Math.max(0, (c.ups || 0) - 1);
      writeJSON(UPS_KEY, ups);
    }
    downs[commentId] = true;
    writeJSON(DOWNS_KEY, downs);
    c.downs = (c.downs || 0) + 1;
    all[h] = list;
    writeJSON(COMMENTS_KEY, all);
    const r = addXp(POINT_TABLE.downvote, "downvote");
    return { ok: true, points: r };
  }

  function likeComment(commentId, handle) {
    const likes = readJSON(LIKES_KEY, {});
    const key = commentId;
    const h = slugify(handle);
    const all = readJSON(COMMENTS_KEY, {});
    const list = all[h] || [];
    const c = list.find((x) => x.id === commentId);
    if (!c) return { ok: false };

    if (likes[key]) {
      delete likes[key];
      c.likes = Math.max(0, (c.likes || 0) - 1);
      writeJSON(LIKES_KEY, likes);
      all[h] = list;
      writeJSON(COMMENTS_KEY, all);
      return { ok: true, liked: false, points: { awarded: 0 } };
    }
    likes[key] = true;
    writeJSON(LIKES_KEY, likes);
    c.likes = (c.likes || 0) + 1;
    all[h] = list;
    writeJSON(COMMENTS_KEY, all);
    const r = addXp(POINT_TABLE.like, "like");
    return { ok: true, liked: true, points: r };
  }

  function isLiked(commentId) {
    return !!readJSON(LIKES_KEY, {})[commentId];
  }

  /* —— TikTok-style micro feed on profile —— */
  function feed(handle) {
    const all = readJSON(FEED_KEY, {});
    return all[slugify(handle)] || [];
  }

  function addFeedPost(text) {
    const mine = ensureHandle();
    const h = mine.handle;
    if (!h) return { ok: false };
    const all = readJSON(FEED_KEY, {});
    const list = all[h] || [];
    const post = {
      id: uid("p_"),
      text: String(text || "").slice(0, 220),
      at: new Date().toISOString(),
      likes: 0,
      avatar: mine.avatar,
      name: mine.displayName,
    };
    list.unshift(post);
    all[h] = list.slice(0, 40);
    writeJSON(FEED_KEY, all);
    const r = addXp(POINT_TABLE["feed-post"], "feed-post");
    return { ok: true, post, points: r };
  }

  function likeFeed(postId, handle) {
    const likes = readJSON(FEED_LIKES_KEY, {});
    const key = postId;
    const h = slugify(handle);
    const all = readJSON(FEED_KEY, {});
    const list = all[h] || [];
    const p = list.find((x) => x.id === postId);
    if (!p) return { ok: false };
    if (likes[key]) {
      delete likes[key];
      p.likes = Math.max(0, (p.likes || 0) - 1);
      writeJSON(FEED_LIKES_KEY, likes);
      all[h] = list;
      writeJSON(FEED_KEY, all);
      return { ok: true, liked: false };
    }
    likes[key] = true;
    writeJSON(FEED_LIKES_KEY, likes);
    p.likes = (p.likes || 0) + 1;
    all[h] = list;
    writeJSON(FEED_KEY, all);
    // bump profile likes counter for TikTok vibe
    const map = allProfiles();
    if (map[h]) {
      map[h].likes = (map[h].likes || 0) + 1;
      writeJSON(PROFILES_KEY, map);
    }
    const mine = myProfile();
    if (mine.handle === h) saveMyProfile({ likes: (mine.likes || 0) + 1 });
    const r = addXp(POINT_TABLE["feed-like"], "feed-like");
    return { ok: true, liked: true, points: r };
  }

  function isFeedLiked(postId) {
    return !!readJSON(FEED_LIKES_KEY, {})[postId];
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
    const r = addXp(POINT_TABLE.subscribe, "subscribe");
    return { ok: true, points: r };
  }

  function isSubscribed(handle) {
    return !!readJSON(SUBS_KEY, {})[slugify(handle)];
  }

  function tip(handle, coins) {
    const h = slugify(handle);
    const n = Math.max(1, Math.floor(Number(coins) || 0));
    let pts = null;
    if (window.PGBGems?.tipCoins) {
      const r = window.PGBGems.tipCoins(n);
      if (r === false || r?.ok === false) return { ok: false, reason: "coins" };
      // gems tipCoins already farms XP (with multiplier)
      pts = { awarded: 0, note: "via-gems" };
    } else {
      const base = Math.max(POINT_TABLE.tip, Math.floor(n / 10));
      pts = addXp(base, "tip");
    }
    const map = allProfiles();
    if (map[h]) {
      map[h].tipsReceived = (map[h].tipsReceived || 0) + n;
      writeJSON(PROFILES_KEY, map);
    }
    const mine = myProfile();
    if (mine.handle === h) saveMyProfile({ tipsReceived: (mine.tipsReceived || 0) + n });
    return { ok: true, coins: n, points: pts };
  }

  function seedDemoFans() {
    const map = allProfiles();
    if (Object.keys(map).length >= 4) return;
    const demos = [
      { handle: "neonfarmr", displayName: "NeonFarmr", avatar: "🔥", signEmoji: "♌", signLabel: "Leo", bio: "5× grinding · gift whale.", likes: 420, subscribers: 88, tipsReceived: 1200 },
      { handle: "perchpulse", displayName: "PerchPulse", avatar: "🐧", signEmoji: "♒", signLabel: "Aquarius", bio: "Clip Crown clips all day.", likes: 310, subscribers: 54, tipsReceived: 800 },
      { handle: "goldrushgus", displayName: "GoldRushGus", avatar: "👑", signEmoji: "♈", signLabel: "Aries", bio: "OG Pass · board chaser.", likes: 990, subscribers: 210, tipsReceived: 4000 },
      { handle: "clipqueen", displayName: "ClipQueen", avatar: "💅", signEmoji: "♏", signLabel: "Scorpio", bio: "TikTok energy on ice.", likes: 640, subscribers: 140, tipsReceived: 2100 },
    ];
    demos.forEach((d) => {
      if (!map[d.handle]) {
        map[d.handle] = { ...d, links: [], upvotes: 12, updatedAt: new Date().toISOString() };
      }
    });
    writeJSON(PROFILES_KEY, map);

    // seed a couple feed posts / comments for goldrushgus so browsing feels alive
    const feedAll = readJSON(FEED_KEY, {});
    if (!feedAll.goldrushgus) {
      feedAll.goldrushgus = [
        { id: "p_seed1", text: "Just locked the $36 OG — 5× points go brrr 🏒💎", at: new Date(Date.now() - 3600000).toISOString(), likes: 48, avatar: "👑", name: "GoldRushGus" },
        { id: "p_seed2", text: "Who else farming the Expansion giveaway??", at: new Date(Date.now() - 7200000).toISOString(), likes: 31, avatar: "👑", name: "GoldRushGus" },
      ];
      writeJSON(FEED_KEY, feedAll);
    }
  }

  function leaderboardSlice() {
    seedDemoFans();
    const play = readJSON(PLAY_KEY, {});
    const pts = play.points || play.xp || 0;
    const mine = myProfile();
    const map = allProfiles();
    const bots = Object.values(map)
      .filter((p) => p.handle && p.handle !== mine.handle)
      .map((p) => ({
        handle: p.handle,
        name: p.displayName,
        avatar: p.avatar || "🏒",
        pts: Math.max(120, (p.likes || 0) * 8 + (p.subscribers || 0) * 15 + (p.tipsReceived || 0) / 5),
        premium: false,
      }));
    // fixed high scores so farming feels competitive
    const floors = {
      neonfarmr: 820,
      perchpulse: 640,
      goldrushgus: 12480,
      clipqueen: 2100,
    };
    bots.forEach((b) => {
      if (floors[b.handle]) b.pts = Math.max(b.pts, floors[b.handle]);
    });
    const you = {
      handle: mine.handle || "you",
      name: (mine.displayName || "You") + " (you)",
      avatar: mine.avatar || "🏒",
      pts,
      you: true,
      premium: !!(window.PGBAuth?.isPremium?.()),
    };
    return [...bots, you].sort((a, b) => b.pts - a.pts).map((r, i) => ({ ...r, rank: i + 1 }));
  }

  function unlockTiers(pts) {
    const p = pts != null ? pts : readJSON(PLAY_KEY, {}).points || 0;
    const premium = !!(window.PGBAuth?.isPremium?.());
    return [
      { id: "chat", label: "Profile comments", need: 0, unlocked: true },
      { id: "tip", label: "Tip with Coins", need: 50, unlocked: p >= 50 },
      { id: "frame", label: "Gold profile frame", need: 200, unlocked: p >= 200 || premium },
      { id: "whale", label: "Whale gift presets", need: 400, unlocked: p >= 400 },
      { id: "live", label: "Live tip alerts (demo)", need: 800, unlocked: p >= 800 },
      { id: "og", label: "5× OG Pass multiplier", need: 0, unlocked: premium },
    ];
  }

  // seed once on load
  try {
    seedDemoFans();
  } catch (_) {}

  window.PGBProfile = {
    PLATFORMS,
    POINT_TABLE,
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
    downvote,
    voteState,
    likeComment,
    isLiked,
    feed,
    addFeedPost,
    likeFeed,
    isFeedLiked,
    subscribe,
    isSubscribed,
    tip,
    leaderboardSlice,
    unlockTiers,
    addXp,
    slugify,
    seedDemoFans,
  };
})();
