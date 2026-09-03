/** Team vault sections — maps folder IDs to on-site pages (not raw asset dirs). */
window.PGBTeamVault = {
  sections: {
    "01-Logos-Marks": {
      title: "Logos & marks",
      desc: "Primary, secondary, mono, app icons, and wordmarks.",
      subs: [
        { label: "Primary mark", file: "primary.png" },
        { label: "Secondary mark", file: "secondary.png" },
        { label: "Mono / one-color", file: "mono.png" },
        { label: "App icon", file: "app-icon.png" },
      ],
    },
    "02-Brand-Kit": {
      title: "Brand kit",
      desc: "Guidelines, colorways, typography, and co-marketing templates.",
      subs: [
        { label: "Brand guidelines PDF", file: "guidelines.pdf" },
        { label: "Color palette", file: "colors.json" },
        { label: "Typography sheet", file: "typography.pdf" },
        { label: "Co-mark lockups", file: "co-mark/" },
      ],
    },
    "03-Stadiums": {
      title: "Stadiums",
      desc: "stadium-01 · stadium-02 · stadium-03 + lore and arena film.",
      teamAnchor: "stadiums",
    },
    "04-Players": {
      title: "Players",
      desc: "Nine-player vault — bios, headshots, clips.",
      teamAnchor: "roster",
    },
    "05-Jerseys-Uniforms": {
      title: "Jerseys & uniforms",
      desc: "Home, away, alternate, and goalie flats.",
      subs: [
        { label: "Home jersey", file: "home/" },
        { label: "Away jersey", file: "away/" },
        { label: "Alternate", file: "classic/" },
        { label: "Goalie", file: "goalie/" },
      ],
      extraLinks: [{ href: "lockervision.html", label: "LockerVision outfits" }],
    },
    "06-Posters": {
      title: "Posters",
      desc: "Promo posters and arena art.",
      subs: [{ label: "Poster drops", file: "posters/" }],
    },
    "07-Swag-Kits": {
      title: "Swag kits",
      desc: "Streetwear, hats, pins, retail kits.",
      subs: [{ label: "Swag kit pack", file: "swag-kit/" }],
      extraLinks: [{ href: "shop.html#best", label: "Team store" }],
    },
    "08-Pucks-Collectibles": {
      title: "Pucks & collectibles",
      desc: "Founders puck, badges, limited drops.",
      subs: [{ label: "Founders puck art", file: "founders-puck/" }],
      extraLinks: [{ href: "join.html", label: "$36 OG Pass · founders puck" }],
    },
    "09-Audio": {
      title: "Stadium sound",
      desc: "Goal horn, walkout, booth calls.",
      teamAnchor: "audio",
    },
    "10-Vibe-Playlists": {
      title: "Vibe playlists",
      desc: "Walkout, warm-up, and victory playlists.",
      extraLinks: [{ href: "listen.html", label: "Listen · Season One" }],
    },
  },

  section(id) {
    return this.sections[id] || null;
  },

  vaultUrl(teamSlug, sectionId) {
    return `team-vault.html?team=${encodeURIComponent(teamSlug)}&section=${encodeURIComponent(sectionId)}`;
  },

  async probeAsset(url) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      return res.ok;
    } catch (_) {
      return false;
    }
  },

  async listSubAssets(team, sectionId, subs) {
    const base = `${team.folder}${sectionId}/`;
    const out = [];
    for (const sub of subs || []) {
      const path = sub.file.endsWith("/") ? base + sub.file.slice(0, -1) + "/README.md" : base + sub.file;
      const ok = await this.probeAsset(path);
      out.push({ ...sub, path, ok, isFolder: sub.file.endsWith("/") });
    }
    return out;
  },
};
