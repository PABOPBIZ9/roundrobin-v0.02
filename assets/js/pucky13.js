/** Pucky 13 — oracle chat, free dailies, tips + paid services */
(function () {
  const TIP_KEY = "pgb-pucky13-tips";
  const JOKE_KEY = "pgb-pucky13-joke-day";
  const STAR_KEY = "pgb-pucky13-star-day";

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

  function addService(svc) {
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
      { open: true }
    );
    toast("Added to bag — finish at checkout");
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

  function reply(q) {
    const s = String(q || "").toLowerCase().trim();
    if (!s) {
      return {
        msg: "Ask me anything — advice, Expansion Weekend, #13 lore, jokes, stars… or tip me. I'm vigilant.",
        links: [
          { label: "Daily joke", seed: "tell me a dad joke" },
          { label: "Stars", seed: "daily astrology" },
          { label: "Tip $13", seed: "I want to tip you" },
        ],
      };
    }
    if (/tip|donate|sol|coffee|badger/.test(s)) {
      return {
        msg: "YES. Tip jar open. $3.50 coffee, lucky $13, or go huge on the deep astrology report. SOL rail coming — USD bag works now. Heh heh.",
        links: [
          { label: "Tip $3.50", action: "tip35" },
          { label: "Tip $13", action: "tip13" },
          { label: "Daily stars $3.50", action: "dailyAstro" },
        ],
      };
    }
    if (/joke|dad|funny|laugh/.test(s)) {
      return {
        msg: `${freeJoke()} — free today. Premium pack = 13 days of premium dad chaos for $13.`,
        links: [
          { label: "Another free joke", seed: "another joke" },
          { label: "Premium pack $13", action: "dadJokes" },
        ],
      };
    }
    if (/astro|star|horoscope|zodiac|birth chart|reading/.test(s)) {
      const star = freeStar();
      return {
        msg: `Free vibe · ${star.sign}: ${star.line} ${star.tease} Deep 30–50 page custom report is $350 — Hasek-level detail.`,
        links: [
          { label: "Unlock daily $3.50", action: "dailyAstro" },
          { label: "Deep report $350", action: "deepAstro" },
        ],
      };
    }
    if (/kane|patrick|88|blackhawk|shootout|hasek|dominik|sabre|datsyuk|pavel|13|swift|swiftie|taylor/.test(s)) {
      return {
        msg: "I'm #13 — Swiftie lucky number energy + Kane mythology. Kane grew up loving Hasek in Buffalo, worshipped Datsyuk's hands (#13), later wore the Hawk sweater where legends collide. Me? Vigilante oracle with a tip jar and a gold smile.",
        links: [
          { label: "Read my lore", href: "#lore" },
          { label: "Tip the myth $13", action: "tip13" },
          { label: "Listen XP", href: "listen.html?show=voice-roster-showcase" },
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
    if (/advice|help|what should|confused|anxious|coach/.test(s)) {
      return {
        msg: "Advice from #13: protect your crease, take the open ice, tip your oracle, and don't ghost the $36 OG if you're farming all weekend. Want stars or jokes with that?",
        links: [
          { label: "Daily stars", seed: "daily astrology" },
          { label: "Dad joke", seed: "dad joke" },
          { label: "Tip $3.50", action: "tip35" },
        ],
      };
    }
    return {
      msg: "I'm listening — Expansion, OG Pass, jokes, astrology, Kane/Swift lore, or tips. Be specific and I'll be useful. Then tip me. Vigilante rules.",
      links: [
        { label: "Free joke", seed: "joke" },
        { label: "Astrology", seed: "astrology" },
        { label: "Tip jar", action: "tip13" },
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
            if (l.action && SERVICES[l.action]) addService(SERVICES[l.action]);
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
    addBubble(msgs, q, "user");
    setTimeout(() => {
      const { msg, links } = reply(q);
      addBubble(msgs, msg, "bot", links);
      maybeBadger();
    }, 380);
  }

  function renderDailies() {
    const joke = freeJoke();
    const star = freeStar();
    const jEl = document.getElementById("pk13Joke");
    const sEl = document.getElementById("pk13Star");
    if (jEl) jEl.textContent = joke;
    if (sEl) sEl.textContent = `${star.sign}: ${star.line}`;
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

  function mount() {
    renderDailies();
    maybeBadger();
    const msgs = document.getElementById("pk13Msgs");
    if (msgs && !msgs.childElementCount) {
      addBubble(
        msgs,
        "Heeey bestie — I'm Pucky 13. Swiftie. Kane mythology. Vigilante tip-badger. Ask advice, grab free jokes & star vibes, or unlock premium chaos.",
        "bot",
        [
          { label: "Dad joke", seed: "dad joke" },
          { label: "Astrology", seed: "astrology" },
          { label: "Why 13?", seed: "why number 13 kane swift" },
          { label: "Tip me", action: "tip13" },
        ]
      );
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
        if (SERVICES[key]) addService(SERVICES[key]);
      });
    });
    document.getElementById("pk13RefreshJoke")?.addEventListener("click", () => {
      localStorage.removeItem(JOKE_KEY);
      renderDailies();
      toast("New free joke unlocked");
    });
    document.getElementById("pk13RefreshStar")?.addEventListener("click", () => {
      localStorage.removeItem(STAR_KEY);
      renderDailies();
      toast("New free star vibe");
    });
    document.getElementById("pk13OpenTip")?.addEventListener("click", openTipModal);
    document.getElementById("pk13TipBarBtn")?.addEventListener("click", openTipModal);
    document.querySelectorAll("[data-pk-tip-close]").forEach((b) => b.addEventListener("click", closeTipModal));
    document.querySelectorAll("[data-pk-tip]").forEach((b) => {
      b.addEventListener("click", () => {
        const key = b.getAttribute("data-pk-tip");
        if (SERVICES[key]) {
          recordTip(SERVICES[key].price);
          addService(SERVICES[key]);
          closeTipModal();
        }
      });
    });
    document.getElementById("pk13SolNote")?.addEventListener("click", () => {
      toast("SOL wallet rail next — $ checkout works today");
    });

    // periodic tip badger
    setInterval(maybeBadger, 16000);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", mount);
  else mount();
})();
