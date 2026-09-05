/**
 * Division / pool team logos — vault PNG first, premium SVG crest fallback.
 */
(function () {
  const MARKS = {
    "dubai-dragons": {
      c: "#b45309",
      d: "#78350f",
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#1a1208" stroke="#d97706" stroke-width="3"/><path d="M38 78 Q48 42 60 36 Q72 42 82 78 Q72 68 60 64 Q48 68 38 78Z" fill="#f59e0b"/><path d="M44 52 Q60 28 76 52 L70 58 Q60 46 50 58Z" fill="#fde68a"/><circle cx="50" cy="54" r="4" fill="#111"/><circle cx="70" cy="54" r="4" fill="#111"/><path d="M34 62 L24 48 L38 50 Z M86 62 L96 48 L82 50 Z" fill="#d97706"/></svg>`,
    },
    "nashville-snakes": {
      c: "#166534",
      d: "#052e16",
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#052e16" stroke="#22c55e" stroke-width="3"/><path d="M28 72 Q40 28 60 32 Q80 28 92 72 Q78 58 60 54 Q42 58 28 72Z" fill="none" stroke="#4ade80" stroke-width="8" stroke-linecap="round"/><circle cx="44" cy="58" r="5" fill="#fef08a"/><circle cx="44" cy="58" r="2.5" fill="#111"/><path d="M38 56 L32 52" stroke="#111" stroke-width="1.5"/></svg>`,
    },
    "berlin-blackout": {
      c: "#374151",
      d: "#0f172a",
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#0f172a" stroke="#6b7280" stroke-width="3"/><path d="M60 28 L72 44 L68 72 L60 88 L52 72 L48 44 Z" fill="#374151"/><rect x="54" y="38" width="12" height="28" fill="#111"/><path d="M36 78 L44 64 L76 64 L84 78 Z" fill="#1f2937"/></svg>`,
    },
    "tokyo-oni": {
      c: "#dc2626",
      d: "#450a0a",
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#450a0a" stroke="#ef4444" stroke-width="3"/><path d="M42 44 Q60 32 78 44 L74 72 Q60 84 46 72 Z" fill="#dc2626"/><path d="M38 36 L44 48 M82 36 L76 48" stroke="#fde68a" stroke-width="4" stroke-linecap="round"/><circle cx="48" cy="56" r="6" fill="#fff"/><circle cx="72" cy="56" r="6" fill="#fff"/><circle cx="48" cy="56" r="3" fill="#111"/><circle cx="72" cy="56" r="3" fill="#111"/><path d="M52 68 Q60 76 68 68" stroke="#111" stroke-width="2" fill="none"/></svg>`,
    },
    "paris-bub-phoenixes": {
      c: "#7c3aed",
      d: "#3b0764",
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#3b0764" stroke="#a78bfa" stroke-width="3"/><path d="M60 88 Q38 64 44 40 Q52 52 60 48 Q68 52 76 40 Q82 64 60 88Z" fill="#7c3aed"/><path d="M48 48 Q60 24 72 48" stroke="#fde68a" stroke-width="3" fill="none"/><circle cx="60" cy="58" r="8" fill="#fbbf24"/></svg>`,
    },
    "sao-paulo-shadow-punks": {
      c: "#0f172a",
      d: "#020617",
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#020617" stroke="#64748b" stroke-width="3"/><circle cx="60" cy="54" r="22" fill="#0f172a" stroke="#94a3b8" stroke-width="2"/><circle cx="52" cy="50" r="5" fill="#22d3ee"/><circle cx="68" cy="50" r="5" fill="#22d3ee"/><path d="M48 64 Q60 72 72 64" stroke="#94a3b8" stroke-width="2" fill="none"/><path d="M44 38 L52 46 M76 38 L68 46" stroke="#f43f5e" stroke-width="3"/></svg>`,
    },
    "london-crown": {
      c: "#1d4ed8",
      d: "#1e3a8a",
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#1e3a8a" stroke="#93c5fd" stroke-width="3"/><path d="M32 72 L40 44 L52 56 L60 36 L68 56 L80 44 L88 72 Z" fill="#fbbf24" stroke="#b45309" stroke-width="1.5"/><rect x="34" y="72" width="52" height="10" rx="2" fill="#1d4ed8"/></svg>`,
    },
    "lagos-voltage": {
      c: "#ca8a04",
      d: "#713f12",
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#713f12" stroke="#fbbf24" stroke-width="3"/><path d="M66 28 L44 68 H58 L54 92 L82 48 H66 Z" fill="#fde047" stroke="#ca8a04" stroke-width="1"/></svg>`,
    },
    "seoul-neon": {
      c: "#0891b2",
      d: "#164e63",
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#164e63" stroke="#22d3ee" stroke-width="3"/><path d="M42 78 V42 H58 L72 58 H58 V78 Z" fill="#22d3ee"/><rect x="74" y="42" width="8" height="36" fill="#f0abfc"/></svg>`,
    },
    "mumbai-monsoon": {
      c: "#0369a1",
      d: "#0c4a6e",
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#0c4a6e" stroke="#38bdf8" stroke-width="3"/><ellipse cx="60" cy="48" rx="28" ry="16" fill="#64748b"/><path d="M48 56 L44 78 M56 54 L52 82 M64 54 L68 82 M72 56 L76 78" stroke="#38bdf8" stroke-width="3" stroke-linecap="round"/></svg>`,
    },
    "mexico-city-solar": {
      c: "#ea580c",
      d: "#7c2d12",
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#7c2d12" stroke="#fb923c" stroke-width="3"/><circle cx="60" cy="58" r="18" fill="#fbbf24"/><path d="M60 28 V38 M60 78 V88 M28 58 H38 M82 58 H92 M36 36 L44 44 M76 76 L84 84 M84 36 L76 44 M44 76 L36 84" stroke="#fde68a" stroke-width="3" stroke-linecap="round"/></svg>`,
    },
    "sydney-surge": {
      c: "#059669",
      d: "#064e3b",
      svg: `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="#064e3b" stroke="#34d399" stroke-width="3"/><path d="M24 72 Q44 48 60 52 Q76 48 96 72 Q76 64 60 68 Q44 64 24 72Z" fill="#059669"/><path d="M48 56 Q60 40 72 56" stroke="#a7f3d0" stroke-width="3" fill="none"/></svg>`,
    },
  };

  function sources(slug, color) {
    const base = `assets/teams/${slug}/01-Logos-Marks`;
    const chain = [`${base}/primary.png`, `${base}/app-icon.png`, `${base}/secondary.png`, `${base}/primary.svg`, `${base}/mono.png`];
    if (window.PGBTeamBrand?.logoSources) return window.PGBTeamBrand.logoSources(slug);
    return chain;
  }

  function markSvg(slug, team) {
    if (MARKS[slug]) return MARKS[slug].svg;
    const t = team || {};
    if (window.PGBCharacterArt?.logoSvg && window.PGBTeams?.bySlug(slug)) {
      return window.PGBCharacterArt.logoSvg(slug, window.PGBTeams.bySlug(slug), slug);
    }
    const c = t.color || "#163a74";
    const d = t.colorDeep || "#0b1220";
    const code = (t.code || slug.slice(0, 2)).toUpperCase();
    return `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg"><circle cx="60" cy="60" r="56" fill="${d}" stroke="${c}" stroke-width="3"/><text x="60" y="72" text-anchor="middle" fill="#fff" font-family="Arial Black,sans-serif" font-size="28" font-weight="900">${code}</text></svg>`;
  }

  function logoHtml(slug, team, size) {
    const uid = `dl-${slug}-${Math.random().toString(36).slice(2, 7)}`;
    const sz = size || 40;
    return `<span class="division-logo" data-team-logo="${slug}" style="width:${sz}px;height:${sz}px">
      <img alt="" hidden data-logo-img>
      <span class="division-logo-fb" data-logo-fb>${markSvg(slug, team)}</span>
    </span>`;
  }

  function teamRowHtml(t, tag) {
    const label =
      tag ||
      (t.founding
        ? '<span class="division-tag">Founding</span>'
        : '<span class="division-tag division-tag-global">Global</span>');
    const href = t.slug ? `team.html?team=${encodeURIComponent(t.slug)}` : "#";
    return `<a class="division-team" href="${href}">
      ${logoHtml(t.slug, t)}
      <span class="division-team-name">${t.name}</span>
      ${label}
    </a>`;
  }

  function exTeamHtml(t) {
    const href = t.slug ? `team.html?team=${encodeURIComponent(t.slug)}` : "#";
    const tag = t.founding
      ? '<span class="ex-founding">Founding</span>'
      : '<span class="ex-global">Global</span>';
    return `<a class="ex-team" href="${href}">
      ${logoHtml(t.slug, t, 36)}
      <span>${t.name}</span>${tag}
    </a>`;
  }

  function tryImages(srcs, onHit, onMiss) {
    let i = 0;
    const next = () => {
      if (i >= srcs.length) {
        onMiss && onMiss();
        return;
      }
      const src = srcs[i++];
      if (!src) return next();
      const img = new Image();
      img.onload = () => onHit(src);
      img.onerror = next;
      img.src = src;
    };
    next();
  }

  function hydrate(root) {
    (root || document).querySelectorAll("[data-team-logo]").forEach((wrap) => {
      const slug = wrap.dataset.teamLogo;
      const img = wrap.querySelector("[data-logo-img]");
      const fb = wrap.querySelector("[data-logo-fb]");
      if (!slug || !img) return;
      tryImages(
        sources(slug),
        (src) => {
          img.src = src;
          img.hidden = false;
          if (fb) fb.hidden = true;
        },
        () => {
          img.hidden = true;
          if (fb) fb.hidden = false;
        }
      );
    });
  }

  window.PGBDivisionLogos = { MARKS, logoHtml, teamRowHtml, exTeamHtml, hydrate, markSvg, sources };
})();
