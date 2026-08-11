/** Pucky 13 — oracle chat, free/paid unlocks, SOL tip rail, deep intake */
(function () {
  const TIP_KEY = "pgb-pucky13-tips";
  const JOKE_KEY = "pgb-pucky13-joke-day";
  const STAR_KEY = "pgb-pucky13-star-day";
  const MEM_KEY = "pgb-pucky13-memory";

  const SERVICES = {
    tip13: { id: "pucky-tip-13", name: "Tip Pucky · Lucky 13", price: 13, maker: "PuckGoldBiz · Pucky 13" },
    tip35: { id: "pucky-tip-3-50", name: "Tip Pucky · Coffee", price: 3.5, maker: "PuckGoldBiz · Pucky 13" },
    dailyAstro: {
      id: "pucky-daily-astro",
      name: "Pucky Daily Astrology Reading",
      price: 3.5,
      maker: "Pucky 13 · 0.035 SOL equiv",
    },
    deepAstro: {
      id: "pucky-deep-astro",
      name: "Pucky Deep Research Astrology Report (30–50p)",
      price: 350,
      maker: "Pucky 13 · Custom deep dive",
    },
    dadJokes: {
      id: "pucky-premium-dad-jokes",
      name: "Premium Dad Joke Pack · 13 days",
      price: 13,
      maker: "Pucky 13 · Vigilante comedy",
    },
  };

  const DAD_JOKES = [
    "Why did the puck go to therapy? Too many unresolved issues in the crease.",
    "I told my stick it needed boundaries. It said, 'I'm already taped.'",
    "Taylor said it's a lucky day. The scoreboard said 'prove it, number 13.'",
    "What's a goalie's favorite snack? Save-ory bites.",
    "Patrick practiced dekes. I practice asking for tips. Different arts. Same greatness.",
    "Why don't pucks ever get lost? They always find the net… eventually… heh heh.",
    "Hasek said butterfly. I say tip jar. Both catch everything.",
    "What's sticky, lucky, and slightly menacing? Me. Also maple syrup. But mostly me.",
    "I asked the stars for advice. They said tip the mascot first.",
    "Why was the ice jealous of me? Because I'm well-rounded.",
    "Datsyuk hands, Swiftie heart, tip-jar hustle. That's the trinity.",
    "A referee walked into a bar. I yelled offsides. Bad joke. Great energy.",
    "Daily affirmation: you are enough… but thirteen bucks would help.",
  ];

  const PREMIUM_JOKES = [
    "Premium tier: Why did Kane bring a ladder to the rink? To reach new heights on the shootout. Tip jar says same.",
    "Premium tier: Hasek's pads were bigger than my patience for unpaid advice.",
    "Premium tier: Swift drops eras. I drop invoices. Both chart.",
    "Premium tier: Datsyuk deked defenders. I deke your wallet — consensually.",
    "Premium tier: What's a power play? When you tip twice before asking for stars.",
  ];

  const STAR_BITS = [
    { sign: "Aries", line: "Charge the net. Don't dump-and-chase your dreams today." },
    { sign: "Taurus", line: "Hold the blue line. Patience wins the late period." },
    { sign: "Gemini", line: "Two-way game: text the play, then take the shot." },
    { sign: "Cancer", line: "Protect the house. Soft hands, hard boundaries." },
    { sign: "Leo", line: "Main-character energy. Walk out like the PA called your name." },
    { sign: "Virgo", line: "Tape your stick. Systems beat vibes — then vibes win." },
    { sign: "Libra", line: "Balance the cycle. Pass first, highlight second." },
    { sign: "Scorpio", line: "Power-play stare. Secret plans. Lucky thirteen pulse." },
    { sign: "Sagittarius", line: "Stretch pass across the continent. Say yes to the rush." },
    { sign: "Capricorn", line: "Structure like a Cardinals bench. Climb quietly." },
    { sign: "Aquarius", line: "Weird is winning. Neon ideas. Tip the oracle." },
    { sign: "Pisces", line: "Feel the ice under chaos. Soft vision, sharp finish." },
  ];

  const BADGERS = [
    "Heeey — tips keep the oracle online… heh heh… lucky thirteen?",
    "Don't be shy. Tip the puck. Swiftie karma is real.",
    "I can advise for free… but I badger better when tipped.",
    "0.035 SOL for daily stars. Or thirteen bucks because I'm thirteen. Math!",
  ];

  let memory = loadMemory();

  function loadMemory() {
    try {
      return JSON.parse(localStorage.getItem(MEM_KEY) || '{"turns":[]}');
    } catch (_) {
      return { turns: [] };
    }
  }
  function saveMemory() {
    localStorage.setItem(MEM_KEY, JSON.stringify(memory));
  }
  function rememberTurn(role, text) {
    memory.turns = (memory.turns || []).concat([{ role, text, at: Date.now() }]).slice(-12);
    const name = String(text).match(/(?:i'?m|i am|my name is)\s+([A-Za-z]{2,20})/i);
    if (name) memory.name = name[1];
    saveMemory();
  }

  function dayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function toast(msg) {
    const el = document.getElementById("pk13Toast");
    if (!el) return;
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("is-on"), 2800);
  }

  function addService(svc, opts) {
    if (!window.PGBCart?.addItem) {
      location.href = "checkout.html";
      return;
    }
    window.PGBCart.addItem(
      {
        id: svc.id,
        name: svc.name,
        maker: svc.maker,
        price: svc.price,
        qty: 1,
        img: "assets/brand/pucky/pucky-13.png",
      },
      { open: opts?.open !== false }
    );
    toast(opts?.toast || "Added to bag — finish at checkout");
  }

  function addCustomTip(amount, opts) {
    const n = Math.round(Number(amount) * 100) / 100;
    if (!Number.isFinite(n) || n < 1) {
      toast("Enter at least $1");
      return;
    }
    const label = opts?.label || "Custom tip";
    const cents = Math.round(n * 100);
    addService(
      {
        id: `pucky-tip-custom-${cents}`,
        name: `${label} · $${n.toFixed(2)}`,
        maker: "Pucky 13 · Patreon-style tip",
        price: n,
      },
      { toast: opts?.toast || `$${n.toFixed(2)} tip added to bag`, open: opts?.open }
    );
    recordTip(n);
    closeTipModal();
  }

  function addWish(btn) {
    const price = Number(btn.getAttribute("data-price"));
    const name = btn.getAttribute("data-name") || "Pucky wish";
    const slug = btn.getAttribute("data-pk-wish") || "item";
    if (!Number.isFinite(price) || price < 1) return;
    addService(
      {
        id: `pucky-wish-${slug}`,
        name,
        maker: "Pucky 13 · Wish list",
        price,
      },
      { toast: `${name} added — thank you` }
    );
    recordTip(price);
  }

  function recordTip(amount) {
    try {
      const prev = JSON.parse(localStorage.getItem(TIP_KEY) || "[]");
      prev.push({ amount, at: new Date().toISOString() });
      localStorage.setItem(TIP_KEY, JSON.stringify(prev.slice(-40)));
    } catch (_) {}
  }

  function freeJoke() {
    const d = dayKey();
    try {
      const saved = JSON.parse(localStorage.getItem(JOKE_KEY) || "null");
      if (saved?.day === d) return saved.line;
    } catch (_) {}
    const line = DAD_JOKES[Math.floor(Math.random() * DAD_JOKES.length)];
    localStorage.setItem(JOKE_KEY, JSON.stringify({ day: d, line }));
    return line;
  }

  function premiumJoke() {
    return PREMIUM_JOKES[Math.floor(Math.random() * PREMIUM_JOKES.length)];
  }

  function freeStar() {
    const d = dayKey();
    try {
      const saved = JSON.parse(localStorage.getItem(STAR_KEY) || "null");
      if (saved?.day === d) return saved;
    } catch (_) {}
    const bit = STAR_BITS[Math.floor(Math.random() * STAR_BITS.length)];
    const out = {
      day: d,
      sign: bit.sign,
      line: bit.line,
      tease: "Full personalized daily chart unlocks for $3.50 / ~0.035 SOL.",
    };
    localStorage.setItem(STAR_KEY, JSON.stringify(out));
    return out;
  }

  function premiumStar() {
    const base = freeStar();
    return {
      ...base,
      full:
        `${base.sign} premium daily · ${base.line} Midday: take the high-percentage play — one clear ask, one clear shot. Night: protect your crease (sleep, boundaries, tip jar optional). Lucky window pairs with Expansion farm energy — Aura + Listen before you force the highlight.`,
    };
  }

  function reply(q) {
    const s = String(q || "").toLowerCase().trim();
    const nameBit = memory.name ? ` ${memory.name},` : "";
    const tipped = (window.PGBPucky?.tipTotal?.() || 0) > 0;

    if (!s) {
      return {
        msg: `Ask me anything${nameBit} — advice, Expansion, #13 lore, jokes, stars… or tip me. I'm vigilant.`,
        links: [
          { label: "Daily joke", seed: "tell me a dad joke" },
          { label: "Stars", seed: "daily astrology" },
          { label: "Tip $13", seed: "I want to tip you" },
        ],
      };
    }

    if (/my name is|i'?m [a-z]{2,20}$/i.test(q) || /call me /.test(s)) {
      rememberTurn("user", q);
      return {
        msg: `Got it${memory.name ? `, ${memory.name}` : ""}. I'll remember. Now — jokes, stars, or tips?`,
        links: [
          { label: "Stars", seed: "astrology" },
          { label: "Tip me", action: "tip13" },
        ],
      };
    }

    if (/tip|donate|sol|coffee|badger|wallet|patreon|custom tip|wish ?list|macbook|bomb ?pop|dr pepper|bank|sim|cricket|boost|airpods|dream machine|vibecoder|airbnb|applebee|chili/.test(s)) {
      return {
        msg: tipped
          ? `Tipper club${nameBit} — respect. Wish list still open: phone/SIM, $3,500 bank goal, domains/hosting, AirPods, MacBook Pro, Dream Machine VibeCoder kit, plus cheers gift cards.`
          : `YES. Critical now: Boost/Cricket SIM (no working phone), wireless keyboard (iMac spacebar popped), AirPods, $3,500 bank goal. Also domains/hosting, Airbnb, MacBook Pro, full Dream Machine setup — or tip any amount for the grind.`,
        links: [
          { label: "Wish list", href: "#wishlist" },
          { label: "Bank goal", href: "#pk13BankGoal" },
          { label: "Dream Machine", href: "#wishlist" },
        ],
      };
    }

    if (/joke|dad|funny|laugh/.test(s)) {
      if (window.PGBPucky?.hasDadJokes?.()) {
        return {
          msg: `${premiumJoke()} Premium pack active — ask again anytime.`,
          links: [{ label: "Another premium joke", seed: "another premium joke" }, { label: "Tip more", action: "tip13" }],
        };
      }
      return {
        msg: `${freeJoke()} — free today. Premium pack = 13 days of premium dad chaos for $13.`,
        links: [
          { label: "Another free joke", seed: "another joke" },
          { label: "Premium pack $13", action: "dadJokes" },
        ],
      };
    }

    if (/astro|star|horoscope|zodiac|birth chart|reading/.test(s)) {
      if (window.PGBPucky?.hasDailyAstro?.()) {
        const star = premiumStar();
        return {
          msg: star.full + " Want the 30–50 page monster? That's $350 + intake.",
          links: [
            { label: "Deep report intake", href: "#deep" },
            { label: "Tip the stars", action: "tip13" },
          ],
        };
      }
      const star = freeStar();
      return {
        msg: `Free vibe · ${star.sign}: ${star.line} ${star.tease}`,
        links: [
          { label: "Unlock daily $3.50", action: "dailyAstro" },
          { label: "Deep report $350", href: "#deep" },
        ],
      };
    }

    if (/deep report|intake|350|custom report/.test(s)) {
      return {
        msg: "Deep report = $350 custom 30–50 pager. Fill intake (birth data + focus), add to bag, checkout — then you're queued.",
        links: [
          { label: "Open intake", href: "#deep" },
          { label: "Add $350", action: "deepAstro" },
        ],
      };
    }

    if (/kane|patrick|88|blackhawk|shootout|hasek|dominik|sabre|datsyuk|pavel|13|swift|swiftie|taylor/.test(s)) {
      return {
        msg: "I'm #13 — Swiftie lucky number energy + Kane mythology. Kane grew up loving Hasek in Buffalo, worshipped Datsyuk's hands (#13), later wore the Hawk sweater where legends collide. Me? Vigilante oracle with a tip jar and a gold smile.",
        links: [
          { label: "Read my lore", href: "#lore" },
          { label: "Tip the myth $13", action: "tip13" },
        ],
      };
    }

    if (/og|pass|\$36|36|founding|gold puck/.test(s)) {
      return {
        msg: "Smart. $36 OG Offer = gold puck + year Pass + 5× XP. I still want a tip though… heh heh.",
        links: [
          { label: "$36 OG Offer", href: "checkout.html?offer=og" },
          { label: "Tip Pucky", action: "tip13" },
        ],
      };
    }

    if (/aura|clip|expansion|weekend|listen|farm|xp/.test(s)) {
      return {
        msg: "Expansion farm loop: Aura Vote, Clip Crown, Listen XP, then OG for 5×. I can route you — tips appreciated for moral support.",
        links: [
          { label: "Aura Vote", href: "aura-vote.html" },
          { label: "Clip Crown", href: "clip-crown.html" },
          { label: "Listen", href: "listen.html" },
        ],
      };
    }

    if (/advice|help|what should|confused|anxious|coach|decide/.test(s)) {
      return {
        msg: `Advice from #13${nameBit}: protect your crease, take the open ice, tip your oracle, and don't ghost the $36 OG if you're farming all weekend.`,
        links: [
          { label: "Daily stars", seed: "daily astrology" },
          { label: "Dad joke", seed: "dad joke" },
          { label: "Tip $3.50", action: "tip35" },
        ],
      };
    }

    // light memory callback
    if (memory.turns?.length > 2 && /again|more|continue|and\?/.test(s)) {
      return {
        msg: `Continuing${nameBit}: stay on one job — farm XP or buy the reading. Split focus loses periods. Want stars or the deep intake?`,
        links: [
          { label: "Stars", seed: "astrology" },
          { label: "Deep intake", href: "#deep" },
        ],
      };
    }

    return {
      msg: `I'm listening${nameBit} — Expansion, OG Pass, jokes, astrology, Kane/Swift lore, or tips. Be specific. Then tip me. Vigilante rules.`,
      links: [
        { label: "Free joke", seed: "joke" },
        { label: "Astrology", seed: "astrology" },
        { label: "Tip jar", href: "#sol" },
        { label: "$36 OG", href: "checkout.html?offer=og" },
      ],
    };
  }

  function addBubble(msgs, text, who, links) {
    const el = document.createElement("div");
    el.className = `pk13-bubble ${who}`;
    el.innerHTML = `<div>${text}</div>`;
    if (links?.length) {
      const row = document.createElement("div");
      row.className = "links";
      links.forEach((l) => {
        if (l.href) {
          const a = document.createElement("a");
          a.href = l.href;
          a.textContent = l.label;
          row.appendChild(a);
        } else {
          const b = document.createElement("button");
          b.type = "button";
          b.textContent = l.label;
          b.addEventListener("click", () => {
            if (l.action === "deepAstro") {
              openDeep();
              addService(SERVICES.deepAstro);
            } else if (l.action && SERVICES[l.action]) addService(SERVICES[l.action]);
            else if (l.seed) ask(l.seed);
          });
          row.appendChild(b);
        }
      });
      el.appendChild(row);
    }
    msgs.appendChild(el);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function ask(text) {
    const msgs = document.getElementById("pk13Msgs");
    const input = document.getElementById("pk13Input");
    const q = String(text || input?.value || "").trim();
    if (!q || !msgs) return;
    if (input) input.value = "";
    rememberTurn("user", q);
    addBubble(msgs, q, "user");
    setTimeout(() => {
      const { msg, links } = reply(q);
      rememberTurn("bot", msg);
      addBubble(msgs, msg, "bot", links);
      maybeBadger();
    }, 380);
  }

  function renderDailies() {
    const jokeEl = document.getElementById("pk13Joke");
    const starEl = document.getElementById("pk13Star");
    const jokeTag = document.getElementById("pk13JokeTag");
    const starTag = document.getElementById("pk13StarTag");
    if (window.PGBPucky?.hasDadJokes?.()) {
      if (jokeTag) jokeTag.textContent = "Unlocked · Premium jokes";
      if (jokeEl) jokeEl.textContent = premiumJoke();
    } else {
      if (jokeTag) jokeTag.textContent = "Free · Dad joke";
      if (jokeEl) jokeEl.textContent = freeJoke();
    }
    if (window.PGBPucky?.hasDailyAstro?.()) {
      const star = premiumStar();
      if (starTag) starTag.textContent = "Unlocked · Daily astrology";
      if (starEl) starEl.textContent = star.full;
    } else {
      const star = freeStar();
      if (starTag) starTag.textContent = "Free · Star vibe";
      if (starEl) starEl.textContent = `${star.sign}: ${star.line}`;
    }
  }

  const BANK_GOAL = 3500;

  function renderBankGoal() {
    const tips = window.PGBPucky?.tipTotal?.() || 0;
    const pct = Math.min(100, Math.round((tips / BANK_GOAL) * 100));
    const meta = document.getElementById("pk13BankGoalMeta");
    const fill = document.getElementById("pk13BankGoalFill");
    if (meta) meta.textContent = `$${tips.toFixed(0)} / $3,500`;
    if (fill) fill.style.width = `${pct}%`;
  }

  function renderEntitlements() {
    const el = document.getElementById("pk13Vault");
    if (!el || !window.PGBPucky) return;
    const tips = window.PGBPucky.tipTotal();
    const deep = window.PGBPucky.hasDeep();
    const intake = window.PGBPucky.readIntake();
    const status = window.PGBPucky.read()?.deepAstroStatus;
    const bits = [];
    if (tips) bits.push(`Tips received: $${tips.toFixed(2)}`);
    if (tips) bits.push(`Bank goal progress: $${Math.min(tips, BANK_GOAL).toFixed(0)} / $3,500`);
    if (window.PGBPucky.hasDailyAstro()) bits.push("Daily astrology unlocked");
    if (window.PGBPucky.hasDadJokes()) bits.push("Premium dad jokes unlocked");
    if (deep) {
      bits.push(
        status === "queued" || intake
          ? "Deep report queued — Pucky is on the 30–50 pager"
          : "Deep report paid — finish intake below"
      );
    }
    el.innerHTML = bits.length
      ? `<strong>Your Pucky vault</strong><ul>${bits.map((b) => `<li>${b}</li>`).join("")}</ul>`
      : `<strong>Your Pucky vault</strong><p>No unlocks yet — tip, grab daily stars, or start the deep report.</p>`;
    renderBankGoal();
  }

  function maybeBadger() {
    const bar = document.getElementById("pk13TipMsg");
    if (!bar) return;
    bar.innerHTML = `<strong>Pucky:</strong> ${BADGERS[Math.floor(Math.random() * BADGERS.length)]}`;
  }

  function openTipModal() {
    document.getElementById("pk13TipModal")?.removeAttribute("hidden");
  }
  function closeTipModal() {
    document.getElementById("pk13TipModal")?.setAttribute("hidden", "");
  }
  function openDeep() {
    document.getElementById("pk13DeepModal")?.removeAttribute("hidden");
    document.getElementById("deep")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  function closeDeep() {
    document.getElementById("pk13DeepModal")?.setAttribute("hidden", "");
  }

  function renderSol() {
    const addr = window.PGBPucky?.solAddress?.() || "";
    const box = document.getElementById("pk13SolAddr");
    const meta = document.getElementById("pk13SolMeta");
    const qrWrap = document.getElementById("pk13SolQrWrap");
    const qr = document.getElementById("pk13SolQr");
    const fallback = document.getElementById("pk13SolFallback");
    const setForm = document.getElementById("pk13SolSetForm");
    const published = !!(window.PGB_PUCKY_SOL_ADDRESS && String(window.PGB_PUCKY_SOL_ADDRESS).trim());

    if (box) {
      box.textContent = addr || "No tip wallet set yet";
      box.dataset.addr = addr;
      box.classList.toggle("is-empty", !addr);
    }
    if (meta) {
      meta.textContent = addr
        ? `Daily ≈ ${window.PGBPucky?.dailySol ?? 0.035} SOL · Lucky tip ≈ ${window.PGBPucky?.tip13Sol ?? 0.13} SOL · $350 runway ≈ ${window.PGBPucky?.tip350Sol ?? 3.5} SOL · or pay USD in bag`
        : "Paste a Solana address below, or tip in USD from services / wish list.";
    }
    if (qrWrap && qr) {
      if (addr) {
        const pay = window.PGBPucky.solPayUri?.(0.13) || addr;
        qr.src = `https://api.qrserver.com/v1/create-qr-code/?size=168x168&margin=8&data=${encodeURIComponent(pay)}`;
        qrWrap.hidden = false;
      } else {
        qrWrap.hidden = true;
      }
    }
    if (fallback) fallback.hidden = !!addr;
    if (setForm) setForm.hidden = published;
  }

  async function copySol(amountSol) {
    const addr = window.PGBPucky?.solAddress?.() || "";
    if (!addr) {
      toast("Set SOL address first — paste below or use USD tip");
      document.getElementById("sol")?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    try {
      await navigator.clipboard.writeText(addr);
      toast(amountSol ? `Address copied — send ${amountSol} SOL` : "SOL address copied");
      if (amountSol) recordTip(amountSol === 0.13 ? 13 : amountSol === 0.035 ? 3.5 : amountSol === 3.5 ? 350 : 0);
    } catch (_) {
      toast(addr);
    }
  }

  function openPhantom(amountSol) {
    const addr = window.PGBPucky?.solAddress?.() || "";
    if (!addr) {
      toast("Set SOL address first — paste below or use USD tip");
      return;
    }
    const deep = window.PGBPucky.phantomBrowseUri?.(amountSol) || window.PGBPucky.solPayUri?.(amountSol);
    if (!deep) return;
    window.location.href = deep;
    if (amountSol) recordTip(amountSol === 0.13 ? 13 : amountSol === 0.035 ? 3.5 : amountSol === 3.5 ? 350 : 0);
    toast(amountSol ? `Opening Phantom · ${amountSol} SOL` : "Opening Phantom");
  }

  function mount() {
    renderDailies();
    renderEntitlements();
    renderBankGoal();
    renderSol();
    maybeBadger();

    // Prefill intake if saved
    const intake = window.PGBPucky?.readIntake?.();
    if (intake) {
      const map = {
        pkDeepName: intake.name,
        pkDeepEmail: intake.email,
        pkDeepBirth: intake.birthDate,
        pkDeepTime: intake.birthTime,
        pkDeepPlace: intake.birthPlace,
        pkDeepFocus: intake.focus,
      };
      Object.entries(map).forEach(([id, val]) => {
        const el = document.getElementById(id);
        if (el && val) el.value = val;
      });
    }

    const msgs = document.getElementById("pk13Msgs");
    if (msgs && !msgs.childElementCount) {
      const greet = memory.name
        ? `Heeey ${memory.name} — Pucky 13 back on the ice. Tips, stars, jokes, deep report. What do you need?`
        : "Heeey bestie — I'm Pucky 13. Swiftie. Kane mythology. Vigilante tip-badger. Ask advice, grab free jokes & star vibes, or unlock premium chaos.";
      addBubble(msgs, greet, "bot", [
        { label: "Dad joke", seed: "dad joke" },
        { label: "Astrology", seed: "astrology" },
        { label: "Why 13?", seed: "why number 13 kane swift" },
        { label: "Tip SOL/$", href: "#sol" },
      ]);
    }

    document.getElementById("pk13Form")?.addEventListener("submit", (e) => {
      e.preventDefault();
      ask();
    });
    document.getElementById("pk13Quick")?.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-q]");
      if (b) ask(b.dataset.q);
    });
    document.querySelectorAll("[data-pk-svc]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const key = btn.getAttribute("data-pk-svc");
        if (key === "deepAstro") {
          openDeep();
          return;
        }
        if (SERVICES[key]) addService(SERVICES[key]);
      });
    });
    document.getElementById("pk13RefreshJoke")?.addEventListener("click", () => {
      localStorage.removeItem(JOKE_KEY);
      renderDailies();
      toast(window.PGBPucky?.hasDadJokes?.() ? "New premium joke" : "New free joke");
    });
    document.getElementById("pk13RefreshStar")?.addEventListener("click", () => {
      localStorage.removeItem(STAR_KEY);
      renderDailies();
      toast(window.PGBPucky?.hasDailyAstro?.() ? "New premium reading" : "New free star vibe");
    });
    document.getElementById("pk13OpenTip")?.addEventListener("click", openTipModal);
    document.getElementById("pk13TipBarBtn")?.addEventListener("click", openTipModal);
    document.querySelectorAll("[data-pk-tip-close]").forEach((b) => b.addEventListener("click", closeTipModal));
    document.querySelectorAll("[data-pk-deep-close]").forEach((b) => b.addEventListener("click", closeDeep));
    document.querySelectorAll("[data-pk-tip]").forEach((b) => {
      b.addEventListener("click", () => {
        const key = b.getAttribute("data-pk-tip");
        if (key === "deepAstro") {
          closeTipModal();
          openDeep();
          return;
        }
        if (SERVICES[key]) {
          recordTip(SERVICES[key].price);
          addService(SERVICES[key]);
          closeTipModal();
        }
      });
    });
    document.getElementById("pk13SolNote")?.addEventListener("click", () => {
      closeTipModal();
      document.getElementById("sol")?.scrollIntoView({ behavior: "smooth" });
    });
    document.getElementById("pk13WishNote")?.addEventListener("click", (e) => {
      e.preventDefault();
      closeTipModal();
      document.getElementById("wishlist")?.scrollIntoView({ behavior: "smooth" });
    });
    document.querySelectorAll("[data-pk-custom-tip]").forEach((form) => {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        const input = form.querySelector('input[type="number"]');
        addCustomTip(input?.value, { label: form.getAttribute("data-pk-custom-label") || "Custom tip" });
        if (input) input.value = "";
      });
    });
    document.querySelectorAll("[data-pk-custom]").forEach((btn) => {
      btn.addEventListener("click", () => addCustomTip(btn.getAttribute("data-pk-custom")));
    });
    document.querySelectorAll("[data-pk-wish]").forEach((btn) => {
      btn.addEventListener("click", () => addWish(btn));
    });
    document.getElementById("pk13CopySol")?.addEventListener("click", () => copySol());
    document.getElementById("pk13OpenPhantom")?.addEventListener("click", () => openPhantom(0.13));
    document.querySelectorAll("[data-pk-sol-amt]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const amt = Number(btn.getAttribute("data-pk-sol-amt"));
        copySol(amt);
        openPhantom(amt);
      });
    });
    document.getElementById("pk13SolCustom")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = e.target.querySelector('input[type="number"]');
      const amt = Number(input?.value);
      if (!Number.isFinite(amt) || amt <= 0) {
        toast("Enter a SOL amount");
        return;
      }
      openPhantom(amt);
    });
    document.getElementById("pk13SolSetForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const raw = document.getElementById("pk13SolSetInput")?.value?.trim() || "";
      if (!/^[1-9A-HJ-NP-Za-km-z]{32,48}$/.test(raw)) {
        toast("That doesn't look like a Solana address");
        return;
      }
      try {
        localStorage.setItem("pgb-pucky-sol-address", raw);
      } catch (_) {}
      renderSol();
      toast("Tip wallet saved on this device");
    });
    // legacy ids (safe no-ops if removed)
    document.getElementById("pk13CopySolDaily")?.addEventListener("click", () => copySol(0.035));
    document.getElementById("pk13CopySol13")?.addEventListener("click", () => copySol(0.13));

    document.getElementById("pk13DeepForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const intake = {
        name: document.getElementById("pkDeepName")?.value?.trim(),
        email: document.getElementById("pkDeepEmail")?.value?.trim(),
        birthDate: document.getElementById("pkDeepBirth")?.value,
        birthTime: document.getElementById("pkDeepTime")?.value?.trim(),
        birthPlace: document.getElementById("pkDeepPlace")?.value?.trim(),
        focus: document.getElementById("pkDeepFocus")?.value?.trim(),
      };
      if (!intake.name || !intake.email || !intake.birthDate || !intake.birthPlace) {
        toast("Name, email, birth date, and place required");
        return;
      }
      window.PGBPucky?.saveIntake?.(intake);
      addService(SERVICES.deepAstro, { toast: "Intake saved · $350 added to bag" });
      closeDeep();
      renderEntitlements();
      toast("Intake locked — checkout to queue the report");
    });

    document.getElementById("pk13OpenDeep")?.addEventListener("click", openDeep);
    document.getElementById("pk13OpenDeepInline")?.addEventListener("click", openDeep);

    window.addEventListener("pgb-pucky-entitlements", () => {
      renderDailies();
      renderEntitlements();
    });

    // Welcome back after checkout
    try {
      const params = new URLSearchParams(location.search);
      if (params.get("unlocked") === "1") {
        toast("Unlocks active — check your vault");
        history.replaceState(null, "", "pucky13.html" + location.hash);
      }
    } catch (_) {}

    setInterval(maybeBadger, 16000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
