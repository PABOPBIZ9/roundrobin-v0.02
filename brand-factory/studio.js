/** Brand Factory — kit render + promo/fan batch PNG export */
(function () {
  let brands = {};
  let brandId = localStorage.getItem("pgb-bf-brand") || "pumpslut";
  let brand = null;
  const promoCanvases = [];
  const fanCanvases = [];

  function toast(msg) {
    const el = document.getElementById("bfToast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("is-on"), 2400);
  }

  function parseSize(v) {
    const [w, h] = String(v).split("x").map(Number);
    return { w: w || 1200, h: h || 628 };
  }

  function roundRect(ctx, x, y, w, h, r) {
    const rr = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + rr, y);
    ctx.arcTo(x + w, y, x + w, y + h, rr);
    ctx.arcTo(x + w, y + h, x, y + h, rr);
    ctx.arcTo(x, y + h, x, y, rr);
    ctx.arcTo(x, y, x + w, y, rr);
    ctx.closePath();
  }

  function fitText(ctx, text, maxW, base, min) {
    let size = base;
    ctx.font = `800 ${size}px "Bricolage Grotesque", "Space Grotesk", sans-serif`;
    while (size > min && ctx.measureText(text).width > maxW) {
      size -= 2;
      ctx.font = `800 ${size}px "Bricolage Grotesque", "Space Grotesk", sans-serif`;
    }
    return size;
  }

  function drawWordmark(ctx, text, x, y, color, size) {
    ctx.fillStyle = color;
    ctx.font = `800 ${size}px "Bricolage Grotesque", "Space Grotesk", sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(text, x, y);
  }

  function makeLogoCanvas(mode) {
    const c = document.createElement("canvas");
    const stacked = mode === "stacked";
    const icon = mode === "icon-fill" || mode === "icon-outline";
    c.width = stacked ? 640 : icon ? 320 : 900;
    c.height = stacked ? 420 : icon ? 320 : 220;
    const ctx = c.getContext("2d");
    const bg = mode === "icon-outline" ? "#f5f5f5" : brand.colors.bg;
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, c.width, c.height);

    if (icon) {
      const pad = 28;
      roundRect(ctx, pad, pad, c.width - pad * 2, c.height - pad * 2, 48);
      if (mode === "icon-fill") {
        ctx.fillStyle = brand.colors.accent;
        ctx.fill();
        drawWordmark(ctx, brand.name.slice(0, 1), c.width / 2, c.height / 2, brand.colors.primary, 140);
      } else {
        ctx.strokeStyle = brand.colors.primary;
        ctx.lineWidth = 10;
        ctx.stroke();
        drawWordmark(ctx, brand.name.slice(0, 1), c.width / 2, c.height / 2, brand.colors.primary, 140);
      }
      return c;
    }

    if (stacked) {
      roundRect(ctx, 40, 40, c.width - 80, c.height - 80, 28);
      ctx.fillStyle = brand.colors.primary;
      ctx.fill();
      drawWordmark(ctx, brand.name, c.width / 2, c.height / 2 - 24, brand.colors.accent, 64);
      ctx.fillStyle = brand.colors.ink;
      ctx.font = `700 22px "DM Sans", sans-serif`;
      ctx.fillText(brand.domain, c.width / 2, c.height / 2 + 40);
    } else {
      roundRect(ctx, 30, 40, c.width - 60, c.height - 80, 22);
      ctx.fillStyle = brand.colors.primary;
      ctx.fill();
      drawWordmark(ctx, brand.name, c.width / 2, c.height / 2, brand.colors.accent, 56);
    }
    return c;
  }

  function renderKit() {
    document.documentElement.style.setProperty("--bf-accent", brand.colors.accent);
    document.getElementById("kitTitle").textContent = `${brand.name} brand kit`;
    document.getElementById("kitSub").textContent = `${brand.tagline} · ${brand.domain} · mascot: ${brand.mascot}`;
    document.getElementById("typeHint").textContent = `Display: ${brand.fonts.display} · Body: ${brand.fonts.body}`;
    document.getElementById("typeSample").querySelector(".disp").style.fontFamily = `"${brand.fonts.display}", sans-serif`;
    document.getElementById("typeSample").querySelector(".disp").style.color = brand.colors.accent;
    document.getElementById("fanCta").placeholder = brand.fanCta;
    if (!document.getElementById("fanCta").value) document.getElementById("fanCta").value = brand.fanCta;

    const voice = document.getElementById("voiceList");
    voice.innerHTML = [
      `<li><strong>Domain:</strong> ${brand.domain}</li>`,
      `<li><strong>Tagline:</strong> ${brand.tagline}</li>`,
      `<li><strong>Mascot:</strong> ${brand.mascot}</li>`,
      `<li><strong>Primary CTA:</strong> ${brand.cta}</li>`,
      `<li><strong>Fan CTA:</strong> ${brand.fanCta}</li>`,
    ].join("");

    const mount = (id, mode) => {
      const host = document.getElementById(id);
      host.innerHTML = "";
      host.appendChild(makeLogoCanvas(mode));
    };
    mount("logoStacked", "stacked");
    mount("logoHorizontal", "horizontal");
    mount("logoIconFill", "icon-fill");
    mount("logoIconOutline", "icon-outline");

    const keys = [
      ["primary", "Primary"],
      ["secondary", "Secondary"],
      ["accent", "Accent"],
      ["accent2", "Accent 2"],
      ["bg", "Background"],
      ["tileA", "Promo tile A"],
      ["tileB", "Promo tile B"],
      ["tileC", "Promo tile C"],
    ];
    document.getElementById("swatches").innerHTML = keys
      .map(([k, label]) => {
        const hex = brand.colors[k];
        return `<div class="bf-swatch"><div class="chip" style="background:${hex}"></div><div class="meta"><b>${label}</b>${hex}</div></div>`;
      })
      .join("");
  }

  function drawPromo(tpl, size, headline, idx) {
    const { w, h } = size;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    const cA = brand.colors.tileA;
    const cB = brand.colors.tileB;
    const cC = brand.colors.tileC;
    const ink = brand.colors.ink;
    const line = headline || brand.promoHeadlines[idx % brand.promoHeadlines.length];

    if (tpl === "hero") {
      ctx.fillStyle = cA;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = ink;
      ctx.font = `700 ${Math.round(h * 0.07)}px "DM Sans", sans-serif`;
      ctx.fillText("Last call", w * 0.06, h * 0.28);
      const hs = fitText(ctx, line, w * 0.55, Math.round(h * 0.16), 28);
      ctx.font = `800 ${hs}px "Bricolage Grotesque", sans-serif`;
      wrapFill(ctx, line, w * 0.06, h * 0.42, w * 0.55, hs * 1.05);
      // pill CTA
      const bw = Math.min(220, w * 0.28);
      const bh = Math.max(44, h * 0.12);
      roundRect(ctx, w * 0.06, h * 0.72, bw, bh, bh / 2);
      ctx.fillStyle = "#fff";
      ctx.fill();
      ctx.fillStyle = "#111";
      ctx.font = `800 ${Math.round(bh * 0.38)}px "DM Sans", sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(brand.cta, w * 0.06 + bw / 2, h * 0.72 + bh / 2);
      ctx.textAlign = "left";
      // neon frame product block
      roundRect(ctx, w * 0.62, h * 0.18, w * 0.3, h * 0.64, 18);
      ctx.strokeStyle = "rgba(255,255,255,.9)";
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.fillStyle = "rgba(255,255,255,.12)";
      ctx.fill();
      drawWordmark(ctx, brand.name.slice(0, 1), w * 0.77, h * 0.5, ink, Math.round(h * 0.28));
    } else if (tpl === "primebar") {
      ctx.fillStyle = cB;
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = ink;
      const hs = fitText(ctx, line, w * 0.58, Math.round(h * 0.28), 22);
      ctx.font = `800 ${hs}px "Bricolage Grotesque", sans-serif`;
      ctx.textBaseline = "middle";
      ctx.fillText(line, w * 0.05, h / 2);
      const bw = Math.min(200, w * 0.22);
      const bh = Math.max(40, h * 0.45);
      roundRect(ctx, w - bw - w * 0.05, (h - bh) / 2, bw, bh, bh / 2);
      ctx.fillStyle = cC;
      ctx.fill();
      ctx.fillStyle = "#111";
      ctx.font = `800 ${Math.round(bh * 0.35)}px "DM Sans", sans-serif`;
      ctx.textAlign = "center";
      ctx.fillText("Join now", w - bw / 2 - w * 0.05, h / 2);
      ctx.textAlign = "left";
    } else if (tpl === "pricetiles") {
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#111";
      ctx.font = `800 ${Math.round(h * 0.1)}px "Bricolage Grotesque", sans-serif`;
      ctx.fillText(line || "Shop deals by price", w * 0.04, h * 0.18);
      const prices = ["$5", "$10", "$25"];
      const gap = w * 0.03;
      const tw = (w - w * 0.08 - gap * 2) / 3;
      const th = h * 0.62;
      const ty = h * 0.28;
      prices.forEach((p, i) => {
        const x = w * 0.04 + i * (tw + gap);
        roundRect(ctx, x, ty, tw, th, 16);
        ctx.fillStyle = cA;
        ctx.fill();
        ctx.fillStyle = ink;
        ctx.font = `700 ${Math.round(th * 0.14)}px "DM Sans", sans-serif`;
        ctx.textAlign = "center";
        ctx.fillText("under", x + tw / 2, ty + th * 0.35);
        ctx.font = `800 ${Math.round(th * 0.34)}px "Bricolage Grotesque", sans-serif`;
        ctx.fillText(p, x + tw / 2, ty + th * 0.62);
      });
      ctx.textAlign = "left";
    } else if (tpl === "cattiles") {
      ctx.fillStyle = "#f7f7f7";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#111";
      ctx.font = `800 ${Math.round(h * 0.08)}px "Bricolage Grotesque", sans-serif`;
      ctx.fillText(line || "Shop big deals by category", w * 0.04, h * 0.14);
      const cats = [
        { t: "Up to 30% off\nvibes", col: cA },
        { t: "Up to 40% off\ndrops", col: cB },
        { t: "Up to 35% off\ngear", col: cA },
        { t: "Up to 35% off\nflex", col: cC },
      ];
      const gap = w * 0.025;
      const tw = (w - w * 0.08 - gap) / 2;
      const th = (h - h * 0.28 - gap) / 2;
      cats.forEach((cat, i) => {
        const col = i % 2;
        const row = Math.floor(i / 2);
        const x = w * 0.04 + col * (tw + gap);
        const y = h * 0.22 + row * (th + gap);
        roundRect(ctx, x, y, tw, th, 14);
        ctx.fillStyle = cat.col;
        ctx.fill();
        ctx.fillStyle = cat.col === cC ? "#111" : ink;
        ctx.font = `800 ${Math.round(th * 0.18)}px "Bricolage Grotesque", sans-serif`;
        cat.t.split("\n").forEach((ln, li) => {
          ctx.fillText(ln, x + tw * 0.08, y + th * 0.35 + li * th * 0.22);
        });
      });
    } else {
      // premium strip
      ctx.fillStyle = "#b8e0f0";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = "#111";
      const hs = fitText(ctx, line, w * 0.5, Math.round(h * 0.16), 24);
      ctx.font = `800 ${hs}px "Bricolage Grotesque", sans-serif`;
      wrapFill(ctx, line, w * 0.05, h * 0.35, w * 0.48, hs * 1.05);
      ctx.font = `700 ${Math.round(h * 0.06)}px "DM Sans", sans-serif`;
      ctx.fillStyle = cB;
      ctx.fillText("Shop now", w * 0.05, h * 0.72);
      for (let i = 0; i < 3; i++) {
        const cx = w * 0.62 + i * w * 0.1;
        const cy = h * 0.55;
        ctx.beginPath();
        ctx.arc(cx, cy, h * 0.18, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,100,140,.25)";
        ctx.fill();
        drawWordmark(ctx, brand.name.slice(0, 1), cx, cy, brand.colors.primary, Math.round(h * 0.14));
      }
    }
    return c;
  }

  function wrapFill(ctx, text, x, y, maxW, lh) {
    const words = String(text).split(/\s+/);
    let line = "";
    let yy = y;
    ctx.textBaseline = "top";
    words.forEach((word) => {
      const test = line ? `${line} ${word}` : word;
      if (ctx.measureText(test).width > maxW && line) {
        ctx.fillText(line, x, yy);
        line = word;
        yy += lh;
      } else line = test;
    });
    if (line) ctx.fillText(line, x, yy);
  }

  function drawFanBanner(size, handle, emoji, imgUrl, cta) {
    const { w, h } = size;
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    // dark green/black vibe like Cirrus ref, tinted by brand
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, brand.colors.secondary);
    g.addColorStop(1, "#000");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, w, h);

    const frame = Math.min(w, h) * (h > w * 1.2 ? 0.42 : 0.48);
    const fx = (w - frame) / 2;
    const fy = h * 0.1;
    roundRect(ctx, fx, fy, frame, frame, frame * 0.12);
    ctx.fillStyle = brand.colors.bg;
    ctx.fill();
    ctx.strokeStyle = brand.colors.accent;
    ctx.lineWidth = Math.max(8, frame * 0.035);
    ctx.stroke();

    // avatar
    ctx.save();
    roundRect(ctx, fx + 12, fy + 12, frame - 24, frame - 24, frame * 0.1);
    ctx.clip();
    ctx.fillStyle = brand.colors.primary;
    ctx.fillRect(fx + 12, fy + 12, frame - 24, frame - 24);
    if (imgUrl) {
      // placeholder circle if image fails asynchronously — emoji fallback drawn first
    }
    ctx.fillStyle = brand.colors.ink;
    ctx.font = `${Math.round(frame * 0.42)}px "Apple Color Emoji","Segoe UI Emoji",sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(emoji || "🏒", w / 2, fy + frame / 2);
    ctx.restore();

    const clean = String(handle || "fan").replace(/^@/, "");
    const label = `@${clean}`;
    ctx.textAlign = "center";
    ctx.fillStyle = brand.colors.ink;
    const hs = fitText(ctx, label, w * 0.86, Math.round(h * 0.09), 28);
    // gradient-ish gold
    const tg = ctx.createLinearGradient(0, fy + frame + h * 0.04, 0, fy + frame + h * 0.04 + hs);
    tg.addColorStop(0, "#fff");
    tg.addColorStop(1, brand.colors.accent);
    ctx.fillStyle = tg;
    ctx.font = `800 ${hs}px "Bricolage Grotesque", sans-serif`;
    ctx.textBaseline = "top";
    ctx.fillText(label, w / 2, fy + frame + h * 0.05);

    ctx.fillStyle = brand.colors.ink;
    ctx.font = `700 ${Math.round(h * 0.035)}px "DM Sans", sans-serif`;
    ctx.fillText(cta || brand.fanCta, w / 2, fy + frame + h * 0.05 + hs + h * 0.04);

    if (imgUrl) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.onload = () => {
        ctx.save();
        roundRect(ctx, fx + 12, fy + 12, frame - 24, frame - 24, frame * 0.1);
        ctx.clip();
        const scale = Math.max((frame - 24) / img.width, (frame - 24) / img.height);
        const iw = img.width * scale;
        const ih = img.height * scale;
        ctx.drawImage(img, w / 2 - iw / 2, fy + 12 + (frame - 24 - ih) / 2, iw, ih);
        ctx.restore();
      };
    }
    return c;
  }

  function mountGallery(host, canvases, prefix) {
    host.innerHTML = "";
    canvases.length = 0;
    return {
      add(canvas, name) {
        canvases.push({ canvas, name });
        const shot = document.createElement("div");
        shot.className = "bf-shot";
        shot.appendChild(canvas);
        const bar = document.createElement("div");
        bar.className = "bar";
        bar.innerHTML = `<span>${name}</span>`;
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = "Download";
        btn.addEventListener("click", () => downloadCanvas(canvas, name));
        bar.appendChild(btn);
        shot.appendChild(bar);
        host.appendChild(shot);
      },
    };
  }

  function downloadCanvas(canvas, name) {
    const a = document.createElement("a");
    a.href = canvas.toDataURL("image/png");
    a.download = `${name}.png`;
    a.click();
  }

  async function downloadAll(list) {
    if (!list.length) {
      toast("Generate a batch first");
      return;
    }
    for (const item of list) {
      downloadCanvas(item.canvas, item.name);
      await new Promise((r) => setTimeout(r, 180));
    }
    toast(`Downloading ${list.length} PNGs`);
  }

  function setBrand(id) {
    if (!brands[id]) id = "pumpslut";
    brandId = id;
    brand = brands[id];
    localStorage.setItem("pgb-bf-brand", id);
    document.querySelectorAll("#brandSwitch button").forEach((b) => {
      b.classList.toggle("is-on", b.dataset.brand === id);
    });
    renderKit();
    toast(`${brand.name} loaded`);
  }

  function mount() {
    const switcher = document.getElementById("brandSwitch");
    const order = ["pumpslut", "badmonz", "bombpopz", "pgb"];
    switcher.innerHTML = order
      .filter((id) => brands[id])
      .map((id) => `<button type="button" data-brand="${id}">${brands[id].name}</button>`)
      .join("");
    switcher.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-brand]");
      if (b) setBrand(b.dataset.brand);
    });

    document.getElementById("bfTabs")?.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-panel]");
      if (!b) return;
      document.querySelectorAll("#bfTabs button").forEach((x) => x.classList.toggle("is-on", x === b));
      document.querySelectorAll(".bf-panel").forEach((p) => p.classList.toggle("is-on", p.id === `panel-${b.dataset.panel}`));
    });

    document.querySelector("[data-dl=logo]")?.addEventListener("click", () => {
      downloadCanvas(makeLogoCanvas("stacked"), `${brand.id}-logo-stacked`);
    });

    document.getElementById("promoGen")?.addEventListener("click", () => {
      const size = parseSize(document.getElementById("promoSize").value);
      const tpl = document.getElementById("promoTpl").value;
      const count = Math.min(48, Math.max(1, Number(document.getElementById("promoCount").value) || 1));
      const custom = document
        .getElementById("promoLines")
        .value.split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      const gal = mountGallery(document.getElementById("promoGallery"), promoCanvases, "promo");
      for (let i = 0; i < count; i++) {
        const line = custom[i] || brand.promoHeadlines[i % brand.promoHeadlines.length];
        const canvas = drawPromo(tpl, size, line, i);
        gal.add(canvas, `${brand.id}-promo-${tpl}-${i + 1}`);
      }
      toast(`${count} promo banners ready`);
    });

    document.getElementById("promoDlAll")?.addEventListener("click", () => downloadAll(promoCanvases));

    document.getElementById("fanGen")?.addEventListener("click", () => {
      const size = parseSize(document.getElementById("fanSize").value);
      const emoji = document.getElementById("fanEmoji").value || "🏒";
      const img = document.getElementById("fanImg").value.trim();
      const cta = document.getElementById("fanCta").value.trim() || brand.fanCta;
      const handles = document
        .getElementById("fanHandles")
        .value.split("\n")
        .map((s) => s.trim())
        .filter(Boolean);
      if (!handles.length) {
        toast("Add at least one handle");
        return;
      }
      const gal = mountGallery(document.getElementById("fanGallery"), fanCanvases, "fan");
      handles.forEach((h, i) => {
        const canvas = drawFanBanner(size, h, emoji, img, cta);
        const clean = h.replace(/^@/, "");
        gal.add(canvas, `${brand.id}-fan-${clean || i + 1}`);
      });
      toast(`${handles.length} fan banners ready`);
    });

    document.getElementById("fanDlAll")?.addEventListener("click", () => downloadAll(fanCanvases));

    setBrand(brandId);
  }

  fetch("brands.json")
    .then((r) => r.json())
    .then((data) => {
      brands = data;
      mount();
    })
    .catch(() => toast("Could not load brands.json"));
})();
