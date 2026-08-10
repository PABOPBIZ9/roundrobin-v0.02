/**
 * LockerVision Kit Studio — layered kit compositor (canvas).
 * Procedural layers until PNG drops land in team jersey folders.
 */
(function () {
  const SIZE = 720;

  const BACKGROUNDS = [
    { id: "none", label: "None", type: "none" },
    { id: "ice", label: "Ice white", type: "solid", color: "#eef4ff" },
    { id: "navy", label: "Deep navy", type: "solid", color: "#0b1220" },
    { id: "reef", label: "Neon Reef", type: "radial", c0: "#0f766e", c1: "#0b1220" },
    { id: "perch", label: "Perch ruby", type: "radial", c0: "#991b1b", c1: "#0b1220" },
    { id: "dome", label: "District blue", type: "radial", c0: "#163a74", c1: "#0b1220" },
    { id: "terminal", label: "Terminal copper", type: "radial", c0: "#78350f", c1: "#0b1220" },
    { id: "gold", label: "Champagne", type: "radial", c0: "#f0d78c", c1: "#163a74" },
    { id: "weekend", label: "Expansion flash", type: "radial", c0: "#163a74", c1: "#7a1524" },
  ];

  const STAGES = [
    { id: "none", label: "None" },
    { id: "rink", label: "Center ice" },
    { id: "crest-mark", label: "Crest mark" },
    { id: "story-bar", label: "Story bar" },
  ];

  const HELMETS = [
    { id: "classic", label: "Classic" },
    { id: "visor", label: "Visor" },
    { id: "cage", label: "Cage" },
    { id: "none", label: "Bare" },
  ];

  const SPECIALS = [
    { id: "none", label: "None" },
    { id: "og", label: "OG badge" },
    { id: "clip", label: "Clip Crown" },
    { id: "cup", label: "Cup night" },
    { id: "expansion", label: "Expansion" },
  ];

  const EXPORTS = [
    { id: "square", label: "1:1", w: 1080, h: 1080 },
    { id: "story", label: "9:16", w: 1080, h: 1920 },
    { id: "wide", label: "16:9", w: 1920, h: 1080 },
  ];

  const CATS = [
    { id: "kit", label: "Kit", icon: "🏒" },
    { id: "background", label: "Background", icon: "▢" },
    { id: "stage", label: "Stage", icon: "◈" },
    { id: "jersey", label: "Jersey", icon: "👕" },
    { id: "helmet", label: "Helmet", icon: "⛑" },
    { id: "number", label: "Number", icon: "#" },
    { id: "specialty", label: "Specialty", icon: "◆" },
    { id: "player", label: "Player", icon: "★" },
  ];

  function teams() {
    return (window.PGBTeams?.all() || []).slice(0, 4);
  }

  function stateFromUrl() {
    const q = new URLSearchParams(location.search);
    const t = teams();
    return {
      team: q.get("team") || t[0]?.slug || "miami-mighty-geckz",
      kit: q.get("kit") || "home",
      background: q.get("bg") || "reef",
      stage: q.get("stage") || "rink",
      jersey: q.get("jersey") || "shell",
      helmet: q.get("helmet") || "classic",
      number: q.get("num") || "auto",
      specialty: q.get("spec") || "none",
      player: q.get("player") || "captain",
      export: q.get("export") || "square",
      locked: new Set((q.get("lock") || "").split(",").filter(Boolean)),
    };
  }

  function writeUrl(state) {
    const q = new URLSearchParams();
    q.set("team", state.team);
    q.set("kit", state.kit);
    q.set("bg", state.background);
    q.set("stage", state.stage);
    q.set("jersey", state.jersey);
    q.set("helmet", state.helmet);
    q.set("num", state.number);
    q.set("spec", state.specialty);
    q.set("player", state.player);
    q.set("export", state.export);
    if (state.locked.size) q.set("lock", [...state.locked].join(","));
    history.replaceState(null, "", `kit-studio.html?${q}`);
  }

  function kitMeta(state) {
    return window.PGBLockerVision?.kitFor(state.team, state.kit) || {
      name: state.kit,
      shell: "#163a74",
      accent: "#f0d78c",
      secondary: "#fff",
      story: "",
    };
  }

  function teamMeta(state) {
    return window.PGBTeams?.bySlug?.(state.team) || teams()[0] || { slug: state.team, short: "PGB", mono: "P", color: "#163a74", colorDeep: "#0b1220" };
  }

  function playerNum(state) {
    if (state.number !== "auto") return state.number;
    const team = teamMeta(state);
    const players = team.players || [];
    if (state.player === "captain") {
      const c = players.find((p) => p.role === "Captain") || players[0];
      return String(c?.num ?? 9);
    }
    if (state.player === "goalie") {
      const g = players.find((p) => p.pos === "G") || players[players.length - 1];
      return String(g?.num ?? 30);
    }
    const skater = players.find((p) => p.pos !== "G") || players[0];
    return String(skater?.num ?? 14);
  }

  function playerLabel(state) {
    const team = teamMeta(state);
    const players = team.players || [];
    if (state.player === "captain") return (players.find((p) => p.role === "Captain") || players[0])?.name || "Captain";
    if (state.player === "goalie") return (players.find((p) => p.pos === "G") || players[0])?.name || "Goalie";
    return (players.find((p) => p.pos !== "G" && p.role !== "Captain") || players[1] || players[0])?.name || "Skater";
  }

  function fillBg(ctx, bg, w, h) {
    if (!bg || bg.type === "none") {
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, w, h);
      return;
    }
    if (bg.type === "solid") {
      ctx.fillStyle = bg.color;
      ctx.fillRect(0, 0, w, h);
      return;
    }
    const g = ctx.createRadialGradient(w * 0.7, h * 0.2, 20, w * 0.5, h * 0.6, w * 0.85);
    g.addColorStop(0, bg.c0);
    g.addColorStop(1, bg.c1);
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);
  }

  function drawStage(ctx, stageId, team, kit, w, h) {
    if (stageId === "none") return;
    if (stageId === "rink" || stageId === "crest-mark") {
      const pad = w * 0.08;
      ctx.save();
      ctx.translate(pad, h * 0.58);
      const rw = w - pad * 2;
      const rh = h * 0.32;
      ctx.fillStyle = "rgba(255,255,255,.88)";
      roundRect(ctx, 0, 0, rw, rh, 28);
      ctx.fill();
      ctx.strokeStyle = kit.shell || team.colorDeep;
      ctx.lineWidth = 4;
      roundRect(ctx, 4, 4, rw - 8, rh - 8, 24);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(rw / 2, 4);
      ctx.lineTo(rw / 2, rh - 4);
      ctx.strokeStyle = kit.accent || team.color;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(rw / 2, rh / 2, Math.min(rw, rh) * 0.18, 0, Math.PI * 2);
      ctx.stroke();
      if (stageId === "crest-mark") {
        ctx.fillStyle = kit.accent || team.color;
        ctx.globalAlpha = 0.35;
        ctx.font = `900 ${Math.floor(rh * 0.28)}px Arial Black, sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText(team.mono || "P", rw / 2, rh / 2 + rh * 0.1);
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    }
    if (stageId === "story-bar") {
      ctx.fillStyle = "rgba(10,22,44,.82)";
      ctx.fillRect(0, h * 0.78, w, h * 0.22);
      ctx.fillStyle = "#f0d78c";
      ctx.font = `800 ${Math.floor(w * 0.035)}px system-ui,sans-serif`;
      ctx.fillText("PUCKGOLD · LOCKERVISION", w * 0.06, h * 0.86);
      ctx.fillStyle = "#fff";
      ctx.font = `700 ${Math.floor(w * 0.045)}px system-ui,sans-serif`;
      ctx.fillText(`${team.short} · ${kit.name || "Kit"}`, w * 0.06, h * 0.93);
    }
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawPlayer(ctx, state, team, kit, w, h) {
    const shell = state.jersey === "inverse" ? kit.secondary || "#fff" : kit.shell || team.colorDeep;
    const accent = state.jersey === "gold-trim" ? "#f0d78c" : kit.accent || team.color;
    const sec = state.jersey === "inverse" ? kit.shell || team.colorDeep : kit.secondary || "#fff";
    const cx = w / 2;
    const top = h * 0.12;
    const scale = Math.min(w, h) / 720;

    ctx.save();
    ctx.translate(cx, top);
    ctx.scale(scale, scale);

    // torso / jersey
    ctx.beginPath();
    ctx.moveTo(-90, 40);
    ctx.lineTo(-55, 28);
    ctx.lineTo(-40, 70);
    ctx.lineTo(0, 58);
    ctx.lineTo(40, 70);
    ctx.lineTo(55, 28);
    ctx.lineTo(90, 40);
    ctx.lineTo(110, 110);
    ctx.lineTo(85, 125);
    ctx.lineTo(75, 250);
    ctx.lineTo(-75, 250);
    ctx.lineTo(-85, 125);
    ctx.lineTo(-110, 110);
    ctx.closePath();
    const grad = ctx.createLinearGradient(0, 20, 0, 250);
    grad.addColorStop(0, accent);
    grad.addColorStop(0.45, shell);
    grad.addColorStop(1, shell);
    ctx.fillStyle = grad;
    ctx.fill();
    ctx.strokeStyle = sec;
    ctx.lineWidth = 3;
    ctx.stroke();

    // number
    const num = playerNum(state);
    ctx.fillStyle = sec;
    ctx.font = "900 92px Arial Black, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(num, 0, 175);

    // pants
    ctx.beginPath();
    ctx.moveTo(-70, 250);
    ctx.lineTo(70, 250);
    ctx.lineTo(78, 320);
    ctx.lineTo(40, 330);
    ctx.lineTo(0, 280);
    ctx.lineTo(-40, 330);
    ctx.lineTo(-78, 320);
    ctx.closePath();
    ctx.fillStyle = shell;
    ctx.fill();
    ctx.strokeStyle = accent;
    ctx.stroke();

    // pads
    ctx.fillStyle = accent;
    ctx.globalAlpha = 0.55;
    ctx.beginPath();
    ctx.ellipse(-48, 120, 18, 28, 0, 0, Math.PI * 2);
    ctx.ellipse(48, 120, 18, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;

    // gloves
    ctx.beginPath();
    ctx.ellipse(-118, 130, 16, 20, 0, 0, Math.PI * 2);
    ctx.ellipse(118, 130, 16, 20, 0, 0, Math.PI * 2);
    ctx.fillStyle = accent;
    ctx.fill();

    // helmet
    if (state.helmet !== "none") {
      ctx.beginPath();
      ctx.ellipse(0, 10, 38, 30, 0, 0, Math.PI * 2);
      ctx.fillStyle = shell;
      ctx.fill();
      ctx.strokeStyle = sec;
      ctx.lineWidth = 3;
      ctx.stroke();
      if (state.helmet === "visor") {
        ctx.fillStyle = "rgba(80,140,200,.45)";
        ctx.fillRect(-28, 8, 56, 14);
      }
      if (state.helmet === "cage") {
        ctx.strokeStyle = sec;
        ctx.lineWidth = 2;
        for (let i = -18; i <= 18; i += 9) {
          ctx.beginPath();
          ctx.moveTo(i, 2);
          ctx.lineTo(i, 22);
          ctx.stroke();
        }
      }
    } else {
      // head silhouette
      ctx.beginPath();
      ctx.ellipse(0, 8, 28, 32, 0, 0, Math.PI * 2);
      ctx.fillStyle = "#c4b5a0";
      ctx.fill();
    }

    // skates
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(-55, 330, 40, 16);
    ctx.fillRect(15, 330, 40, 16);

    ctx.restore();
  }

  function drawSpecialty(ctx, specId, team, kit, w, h) {
    if (!specId || specId === "none") return;
    const labels = {
      og: "OG · 5×",
      clip: "CLIP CROWN",
      cup: "CUP NIGHT",
      expansion: "EXPANSION",
    };
    const label = labels[specId] || specId;
    ctx.save();
    ctx.fillStyle = "rgba(10,22,44,.9)";
    roundRect(ctx, w * 0.62, h * 0.08, w * 0.3, h * 0.08, 999);
    ctx.fill();
    ctx.strokeStyle = "#f0d78c";
    ctx.lineWidth = 2;
    roundRect(ctx, w * 0.62, h * 0.08, w * 0.3, h * 0.08, 999);
    ctx.stroke();
    ctx.fillStyle = "#f0d78c";
    ctx.font = `800 ${Math.floor(w * 0.028)}px system-ui,sans-serif`;
    ctx.textAlign = "center";
    ctx.fillText(label, w * 0.77, h * 0.132);
    ctx.restore();
  }

  function renderToCanvas(canvas, state, opts = {}) {
    const exportMeta = EXPORTS.find((e) => e.id === state.export) || EXPORTS[0];
    const w = opts.w || SIZE;
    const h = opts.h || SIZE;
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d");
    const team = teamMeta(state);
    const kit = kitMeta(state);
    const bg = BACKGROUNDS.find((b) => b.id === state.background) || BACKGROUNDS[0];

    fillBg(ctx, bg, w, h);
    drawStage(ctx, state.stage, team, kit, w, h);
    drawPlayer(ctx, state, team, kit, w, h);
    drawSpecialty(ctx, state.specialty, team, kit, w, h);

    // watermark
    ctx.fillStyle = bg?.type === "solid" && bg.color === "#eef4ff" ? "rgba(11,18,32,.35)" : "rgba(255,255,255,.35)";
    ctx.font = `700 ${Math.floor(w * 0.028)}px system-ui,sans-serif`;
    ctx.textAlign = "left";
    ctx.fillText("PGB · Kit Studio", w * 0.04, h * 0.96);

    return { team, kit, exportMeta, player: playerLabel(state), num: playerNum(state) };
  }

  function thumbCanvas(drawFn) {
    const c = document.createElement("canvas");
    c.width = 120;
    c.height = 120;
    const ctx = c.getContext("2d");
    drawFn(ctx, 120, 120);
    return c;
  }

  window.PGBKitStudio = {
    SIZE,
    BACKGROUNDS,
    STAGES,
    HELMETS,
    SPECIALS,
    EXPORTS,
    CATS,
    teams,
    stateFromUrl,
    writeUrl,
    kitMeta,
    teamMeta,
    playerNum,
    playerLabel,
    renderToCanvas,
    thumbCanvas,
    fillBg,
  };
})();
