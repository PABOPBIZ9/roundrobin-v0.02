/**
 * Procedural digital character art — logos, player collectibles, kit silhouettes.
 * PNG drops in vault folders override these when present.
 */
(function () {
  const UID = () => Math.random().toString(36).slice(2, 8);

  function teamTheme(slug) {
    return window.PGBCharacters?.teamMeta(slug)?.theme || "gecko";
  }

  /** Team logo / app icon — mascot badge */
  function logoSvg(slug, team, uid) {
    const c = team.color || "#163a74";
    const d = team.colorDeep || "#0b1220";
    const gid = `lg-${slug}-${uid || UID()}`;
    const theme = teamTheme(slug);

    if (theme === "gecko") {
      return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs><radialGradient id="${gid}" cx="40%" cy="35%"><stop offset="0%" stop-color="${c}"/><stop offset="100%" stop-color="${d}"/></radialGradient></defs>
        <circle cx="60" cy="60" r="56" fill="url(#${gid})" stroke="#fff" stroke-width="2.5"/>
        <ellipse cx="60" cy="68" rx="28" ry="24" fill="${c}" opacity=".95"/>
        <circle cx="48" cy="58" r="9" fill="#fff"/><circle cx="48" cy="58" r="5" fill="#111"/>
        <circle cx="72" cy="58" r="9" fill="#fff"/><circle cx="72" cy="58" r="5" fill="#111"/>
        <circle cx="49" cy="56" r="2" fill="${c}"/><circle cx="73" cy="56" r="2" fill="${c}"/>
        <path d="M52 78 Q60 86 68 78" stroke="#111" stroke-width="2" fill="none"/>
        <path d="M82 62 Q96 58 92 72 L84 70 Z" fill="${d}"/>
        <path d="M34 64 Q22 72 28 82 L36 76 Z" fill="${d}"/>
        <text x="60" y="108" text-anchor="middle" fill="#fff" font-family="Arial Black,sans-serif" font-size="11" font-weight="900" letter-spacing=".12em">GECKZ</text>
      </svg>`;
    }
    if (theme === "cardinal") {
      return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="${d}" stroke="${c}" stroke-width="3"/>
        <path d="M60 24 C42 38 34 58 38 78 C48 66 54 54 60 48 C66 54 72 66 82 78 C86 58 78 38 60 24Z" fill="${c}"/>
        <circle cx="52" cy="52" r="7" fill="#fff"/><circle cx="52" cy="52" r="3.5" fill="#111"/>
        <circle cx="68" cy="52" r="7" fill="#fff"/><circle cx="68" cy="52" r="3.5" fill="#111"/>
        <path d="M54 66 Q60 72 66 66" stroke="#f5e6b3" stroke-width="2" fill="none"/>
        <path d="M48 78 L44 92 L52 84 Z M72 78 L76 92 L68 84 Z" fill="#f5e6b3"/>
        <text x="60" y="108" text-anchor="middle" fill="#f5e6b3" font-family="Arial Black,sans-serif" font-size="10" font-weight="900">CARDINALS</text>
      </svg>`;
    }
    if (theme === "dome") {
      return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="${d}" stroke="${c}" stroke-width="3"/>
        <ellipse cx="60" cy="62" rx="32" ry="28" fill="${c}"/>
        <ellipse cx="60" cy="48" rx="26" ry="18" fill="#e5e7eb" opacity=".9"/>
        <circle cx="50" cy="58" r="8" fill="#fff"/><circle cx="50" cy="58" r="4" fill="#111"/>
        <circle cx="70" cy="58" r="8" fill="#fff"/><circle cx="70" cy="58" r="4" fill="#111"/>
        <path d="M52 72 Q60 78 68 72" stroke="#111" stroke-width="2" fill="none"/>
        <path d="M28 38 L38 28 L92 28 L102 38 L92 48 L38 48 Z" fill="#fff" opacity=".85"/>
        <text x="60" y="108" text-anchor="middle" fill="#fff" font-family="Arial Black,sans-serif" font-size="14" font-weight="900">W!</text>
      </svg>`;
    }
    if (theme === "train") {
      return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <circle cx="60" cy="60" r="56" fill="${d}" stroke="${c}" stroke-width="3"/>
        <rect x="32" y="44" width="56" height="36" rx="8" fill="${c}"/>
        <circle cx="48" cy="58" r="10" fill="#fff" opacity=".95"/><circle cx="48" cy="58" r="5" fill="#111"/>
        <circle cx="72" cy="58" r="10" fill="#fff" opacity=".95"/><circle cx="72" cy="58" r="5" fill="#111"/>
        <rect x="44" y="34" width="32" height="14" rx="4" fill="#f5e6b3"/>
        <circle cx="60" cy="41" r="6" fill="#fff"/><circle cx="60" cy="41" r="3" fill="#fbbf24"/>
        <rect x="38" y="80" width="44" height="8" rx="2" fill="#64748b"/>
        <ellipse cx="60" cy="32" rx="8" ry="6" fill="#94a3b8" opacity=".6"/>
        <text x="60" y="108" text-anchor="middle" fill="#f5e6b3" font-family="Arial Black,sans-serif" font-size="10" font-weight="900">CHOO CHOO</text>
      </svg>`;
    }
    if (theme === "genie") {
      return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <defs><radialGradient id="${gid}" cx="50%" cy="30%"><stop offset="0%" stop-color="#fde68a"/><stop offset="100%" stop-color="${d}"/></radialGradient></defs>
        <circle cx="60" cy="60" r="56" fill="url(#${gid})" stroke="${c}" stroke-width="3"/>
        <path d="M36 88 Q60 40 84 88 Q60 72 36 88Z" fill="${c}" opacity=".85"/>
        <circle cx="50" cy="56" r="8" fill="#fff"/><circle cx="50" cy="56" r="4" fill="#111"/>
        <circle cx="70" cy="56" r="8" fill="#fff"/><circle cx="70" cy="56" r="4" fill="#111"/>
        <path d="M54 68 Q60 74 66 68" stroke="#fde68a" stroke-width="2" fill="none"/>
        <ellipse cx="60" cy="28" rx="14" ry="8" fill="#fde68a" opacity=".9"/>
        <path d="M48 24 Q60 12 72 24" stroke="#fbbf24" stroke-width="2" fill="none"/>
        <text x="60" y="108" text-anchor="middle" fill="#fde68a" font-family="Arial Black,sans-serif" font-size="10" font-weight="900">JINNI</text>
      </svg>`;
    }
    return `<svg viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" fill="${d}"/><text x="60" y="72" text-anchor="middle" fill="#fff" font-size="40">${team.mono || "?"}</text></svg>`;
  }

  function powerFx(powerId, cx, cy, scale) {
    const s = scale || 1;
    if (powerId === "laser-eyes" || powerId === "ruby-focus" || powerId === "reef-vision" || powerId === "perch-vision") {
      return `<line x1="${cx - 14 * s}" y1="${cy - 2}" x2="${cx - 28 * s}" y2="${cy - 8}" stroke="#ef4444" stroke-width="2" opacity=".9"/>
        <line x1="${cx + 14 * s}" y1="${cy - 2}" x2="${cx + 28 * s}" y2="${cy - 8}" stroke="#ef4444" stroke-width="2" opacity=".9"/>
        <circle cx="${cx - 14 * s}" cy="${cy - 2}" r="3" fill="#ef4444" opacity=".8"/>
        <circle cx="${cx + 14 * s}" cy="${cy - 2}" r="3" fill="#ef4444" opacity=".8"/>`;
    }
    if (powerId === "lightning-shot" || powerId === "thunder-rush" || powerId === "conductor-bolt" || powerId === "whoomp-clap") {
      return `<path d="M${cx} ${cy - 18 * s} L${cx - 6 * s} ${cy - 2} L${cx + 4 * s} ${cy - 2} L${cx - 2 * s} ${cy + 14 * s} L${cx + 8 * s} ${cy - 6} L${cx - 2 * s} ${cy - 6} Z" fill="#fbbf24" stroke="#f59e0b" stroke-width="1"/>`;
    }
    if (powerId === "neon-dash" || powerId === "sunset-flash" || powerId === "glow-dash" || powerId === "tail-whip") {
      return `<path d="M${cx - 20 * s} ${cy} Q${cx} ${cy - 12 * s} ${cx + 20 * s} ${cy}" stroke="${cx > 50 ? "#2dd4bf" : "#c084fc"}" stroke-width="3" fill="none" opacity=".7"/>
        <circle cx="${cx + 18 * s}" cy="${cy}" r="4" fill="#2dd4bf" opacity=".8"/>`;
    }
    if (powerId === "steam-burst" || powerId === "lamp-smoke" || powerId === "smoke-screen") {
      return `<ellipse cx="${cx - 8}" cy="${cy - 16}" rx="6" ry="8" fill="#94a3b8" opacity=".5"/>
        <ellipse cx="${cx + 6}" cy="${cy - 20}" rx="8" ry="10" fill="#cbd5e1" opacity=".45"/>`;
    }
    return `<circle cx="${cx + 20}" cy="${cy - 12}" r="5" fill="#fbbf24" opacity=".75"/>`;
  }

  /** Collectible player headshot — big eyes, power FX, jersey # */
  function playerAvatarSvg(player, team, char, uid) {
    const c = team.color || "#163a74";
    const d = team.colorDeep || "#0b1220";
    const theme = char?.teamMeta?.theme || teamTheme(team.slug);
    const power = char?.power || "neon-dash";
    const cx = 40;
    const cy = 38;
    const gid = `av-${player.id}-${uid || UID()}`;

    let body = "";
    if (theme === "gecko") {
      body = `<ellipse cx="${cx}" cy="${cy + 6}" rx="22" ry="20" fill="${c}"/>
        <circle cx="${cx - 10}" cy="${cy - 2}" r="7" fill="#fff"/><circle cx="${cx - 10}" cy="${cy - 2}" r="3.5" fill="#111"/>
        <circle cx="${cx + 10}" cy="${cy - 2}" r="7" fill="#fff"/><circle cx="${cx + 10}" cy="${cy - 2}" r="3.5" fill="#111"/>
        <path d="M${cx - 4} ${cy + 10} Q${cx} ${cy + 14} ${cx + 4} ${cy + 10}" stroke="#111" stroke-width="1.5" fill="none"/>
        <path d="M${cx + 18} ${cy + 4} L${cx + 28} ${cy + 8} L${cx + 24} ${cy + 14} Z" fill="${d}"/>`;
    } else if (theme === "cardinal") {
      body = `<path d="M${cx} ${cy - 14} C${cx - 16} ${cy} ${cx - 14} ${cy + 18} ${cx} ${cy + 22} C${cx + 14} ${cy + 18} ${cx + 16} ${cy} ${cx} ${cy - 14}Z" fill="${c}"/>
        <circle cx="${cx - 8}" cy="${cy}" r="6" fill="#fff"/><circle cx="${cx - 8}" cy="${cy}" r="3" fill="#111"/>
        <circle cx="${cx + 8}" cy="${cy}" r="6" fill="#fff"/><circle cx="${cx + 8}" cy="${cy}" r="3" fill="#111"/>
        <path d="M${cx - 6} ${cy + 10} Q${cx} ${cy + 14} ${cx + 6} ${cy + 10}" stroke="#f5e6b3" stroke-width="1.5" fill="none"/>`;
    } else if (theme === "dome") {
      body = `<ellipse cx="${cx}" cy="${cy + 4}" rx="20" ry="18" fill="${c}"/>
        <ellipse cx="${cx}" cy="${cy - 6}" rx="16" ry="12" fill="#e5e7eb" opacity=".85"/>
        <circle cx="${cx - 9}" cy="${cy + 2}" r="6" fill="#fff"/><circle cx="${cx - 9}" cy="${cy + 2}" r="3" fill="#111"/>
        <circle cx="${cx + 9}" cy="${cy + 2}" r="6" fill="#fff"/><circle cx="${cx + 9}" cy="${cy + 2}" r="3" fill="#111"/>`;
    } else if (theme === "train") {
      body = `<rect x="${cx - 18}" y="${cy - 8}" width="36" height="28" rx="6" fill="${c}"/>
        <circle cx="${cx - 8}" cy="${cy + 4}" r="7" fill="#fff"/><circle cx="${cx - 8}" cy="${cy + 4}" r="3.5" fill="#111"/>
        <circle cx="${cx + 8}" cy="${cy + 4}" r="7" fill="#fff"/><circle cx="${cx + 8}" cy="${cy + 4}" r="3.5" fill="#111"/>
        <rect x="${cx - 10}" y="${cy - 14}" width="20" height="8" rx="2" fill="#f5e6b3"/>
        <circle cx="${cx}" cy="${cy - 10}" r="4" fill="#fbbf24"/>`;
    } else if (theme === "genie") {
      body = `<path d="M${cx - 16} ${cy + 20} Q${cx} ${cy - 10} ${cx + 16} ${cy + 20} Q${cx} ${cy + 8} ${cx - 16} ${cy + 20}Z" fill="${c}"/>
        <circle cx="${cx - 8}" cy="${cy + 2}" r="6" fill="#fff"/><circle cx="${cx - 8}" cy="${cy + 2}" r="3" fill="#111"/>
        <circle cx="${cx + 8}" cy="${cy + 2}" r="6" fill="#fff"/><circle cx="${cx + 8}" cy="${cy + 2}" r="3" fill="#111"/>
        <ellipse cx="${cx}" cy="${cy - 12}" rx="8" ry="5" fill="#fde68a"/>`;
    }

    return `<svg class="pgb-char-avatar" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg" aria-label="${char?.displayName || player.name}">
      <defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${c}"/><stop offset="100%" stop-color="${d}"/></linearGradient></defs>
      <rect width="80" height="80" rx="12" fill="url(#${gid})"/>
      ${body}
      ${powerFx(power, cx, cy, 1)}
      <rect x="24" y="58" width="32" height="14" rx="4" fill="${d}" stroke="#fff" stroke-width="1"/>
      <text x="40" y="69" text-anchor="middle" fill="#fff" font-family="Arial Black,sans-serif" font-size="11" font-weight="900">#${player.num}</text>
    </svg>`;
  }

  /** Full kit character — jersey, pads, helmet, skates */
  function kitCharacterSvg(team, kit, player, char, uid) {
    const shell = kit?.shell || team.colorDeep || "#111";
    const accent = kit?.accent || team.color || "#d4af37";
    const sec = kit?.secondary || "#fff";
    const num = player?.num || team.mono || "?";
    const gid = `kit-${team.slug}-${uid != null ? uid : UID()}`;
    const theme = char?.teamMeta?.theme || teamTheme(team.slug);
    const power = char?.power || "";

    let face = "";
    if (theme === "gecko") {
      face = `<circle cx="100" cy="34" r="5" fill="#fff"/><circle cx="100" cy="34" r="2.5" fill="#111"/>
        <circle cx="112" cy="34" r="5" fill="#fff"/><circle cx="112" cy="34" r="2.5" fill="#111"/>`;
    } else {
      face = `<circle cx="104" cy="34" r="4" fill="#fff"/><circle cx="104" cy="34" r="2" fill="#111"/>
        <circle cx="112" cy="34" r="4" fill="#fff"/><circle cx="112" cy="34" r="2" fill="#111"/>`;
    }

    return `<svg class="lv-sil pgb-kit-char" viewBox="0 0 200 280" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="55%" stop-color="${shell}"/>
      <stop offset="100%" stop-color="${shell}"/>
    </linearGradient>
  </defs>
  <path d="M40 48 L70 40 L80 70 L100 62 L120 70 L130 40 L160 48 L175 95 L155 105 L150 200 L50 200 L45 105 L25 95 Z"
        fill="url(#${gid})" stroke="${sec}" stroke-width="2"/>
  <text x="100" y="138" text-anchor="middle" fill="${sec}" font-family="Arial Black,sans-serif" font-size="42" font-weight="900">${num}</text>
  <path d="M55 200 L145 200 L150 250 L125 255 L100 220 L75 255 L50 250 Z" fill="${shell}" stroke="${accent}" stroke-width="2"/>
  <ellipse cx="70" cy="110" rx="14" ry="22" fill="${accent}" opacity=".55"/>
  <ellipse cx="130" cy="110" rx="14" ry="22" fill="${accent}" opacity=".55"/>
  <ellipse cx="100" cy="28" rx="28" ry="22" fill="${shell}" stroke="${sec}" stroke-width="2"/>
  <rect x="78" y="32" width="44" height="10" rx="2" fill="${sec}" opacity=".35"/>
  ${face}
  ${power ? powerFx(power, 100, 30, 0.8) : ""}
  <ellipse cx="28" cy="120" rx="12" ry="16" fill="${accent}"/>
  <ellipse cx="172" cy="120" rx="12" ry="16" fill="${accent}"/>
  <path d="M60 255 L85 255 L88 268 L58 268 Z" fill="#222" stroke="${sec}" stroke-width="1"/>
  <path d="M115 255 L140 255 L142 268 L112 268 Z" fill="#222" stroke="${sec}" stroke-width="1"/>
</svg>`;
  }

  function gearSvg(slotId, team, kit) {
    const shell = kit?.shell || team.colorDeep;
    const accent = kit?.accent || team.color;
    const theme = teamTheme(team.slug);
    if (slotId === "helmet") {
      const visor = theme === "dome" ? `<ellipse cx="24" cy="22" rx="10" ry="6" fill="#e5e7eb" opacity=".7"/>` : "";
      return `<svg viewBox="0 0 48 48"><ellipse cx="24" cy="20" rx="16" ry="12" fill="${shell}" stroke="${accent}" stroke-width="2"/>
        ${visor}<rect x="12" y="22" width="24" height="6" rx="2" fill="${accent}" opacity=".5"/></svg>`;
    }
    if (slotId === "pads") {
      return `<svg viewBox="0 0 48 48"><ellipse cx="16" cy="24" rx="8" ry="14" fill="${accent}" opacity=".75"/>
        <ellipse cx="32" cy="24" rx="8" ry="14" fill="${accent}" opacity=".75"/>
        <line x1="16" y1="14" x2="16" y2="34" stroke="${shell}" stroke-width="1" opacity=".5"/>
        <line x1="32" y1="14" x2="32" y2="34" stroke="${shell}" stroke-width="1" opacity=".5"/></svg>`;
    }
    if (slotId === "jersey") {
      return `<svg viewBox="0 0 48 48"><path d="M10 14 L18 10 L24 18 L30 10 L38 14 L42 26 L36 30 L34 42 L14 42 L12 30 L6 26 Z" fill="${shell}" stroke="${accent}" stroke-width="1.5"/>
        <text x="24" y="30" text-anchor="middle" fill="${accent}" font-family="Arial Black,sans-serif" font-size="10" font-weight="900">${team.code?.slice(0, 2) || ""}</text></svg>`;
    }
    if (slotId === "gloves") {
      return `<svg viewBox="0 0 48 48"><ellipse cx="24" cy="24" rx="14" ry="16" fill="${accent}" stroke="${shell}" stroke-width="1.5"/></svg>`;
    }
    if (slotId === "skates") {
      return `<svg viewBox="0 0 48 48"><path d="M8 28 L40 28 L42 36 L6 36 Z" fill="#222" stroke="${accent}" stroke-width="1.5"/>
        <path d="M12 36 L14 42 L18 42 L16 36 M28 36 L30 42 L34 42 L32 36" stroke="${accent}" stroke-width="2"/></svg>`;
    }
    return "";
  }

  function logoSources(slug) {
    if (window.PGBTeamBrand?.logoSources) return window.PGBTeamBrand.logoSources(slug);
    const base = `assets/teams/${slug}/01-Logos-Marks`;
    return [`${base}/primary.png`, `${base}/primary.svg`, `${base}/app-icon.png`, `${base}/secondary.png`, `${base}/mono.png`];
  }

  function playerSources(team, slot) {
    const base = `${team.folder}04-Players/${slot}`;
    return [`${base}/headshot.png`, `${base}/headshot.svg`, `${base}/photo.png`, `${base}/character.png`];
  }

  window.PGBCharacterArt = {
    logoSvg,
    playerAvatarSvg,
    kitCharacterSvg,
    gearSvg,
    logoSources,
    playerSources,
    powerFx,
  };
})();
