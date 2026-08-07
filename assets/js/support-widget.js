/** Pucky — friendly character AI that drives help + conversions */
(function () {
  if (window.__pgbSupportMounted) return;
  window.__pgbSupportMounted = true;

  const PUCKY_SVG = `<svg class="pucky-face" viewBox="0 0 64 64" aria-hidden="true">
    <defs>
      <linearGradient id="pg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#f0d78c"/><stop offset="100%" stop-color="#d4af37"/>
      </linearGradient>
    </defs>
    <circle cx="32" cy="32" r="30" fill="url(#pg)"/>
    <circle cx="32" cy="34" r="22" fill="#0b1220"/>
    <circle cx="32" cy="34" r="18" fill="#163a74"/>
    <ellipse cx="32" cy="38" rx="10" ry="6" fill="#0b1220" opacity=".35"/>
    <circle cx="24" cy="30" r="3.2" fill="#fff"/>
    <circle cx="40" cy="30" r="3.2" fill="#fff"/>
    <circle cx="25" cy="30.5" r="1.3" fill="#0b1220"/>
    <circle cx="41" cy="30.5" r="1.3" fill="#0b1220"/>
    <path d="M26 42c2.5 3 9.5 3 12 0" stroke="#f0d78c" stroke-width="2.2" fill="none" stroke-linecap="round"/>
    <circle cx="14" cy="18" r="3" fill="#fff" opacity=".55"/>
  </svg>`;

  function t(key) {
    return window.PGB_I18N ? window.PGB_I18N.t(key) : key;
  }

  function replyFor(text) {
    const q = String(text || "").toLowerCase();
    const links = [];
    let msg = "";

    if (/dev|lens|studio|camera kit|sdk|api|ar\b|spectacles/.test(q)) {
      msg = "Pucky here 🏒 — Developer Hub has Ice Studio, Camera Kit, unique items, and founding dev promos.";
      links.push({ href: "developers.html", label: "Developer Hub" });
      links.push({ href: "talent.html?role=creator", label: "Creator / talent signup" });
      links.push({ href: "gems.html", label: "Gems for creators" });
    } else if (/franchise|owner|operator|team owner|franquia|フランチャイズ|프랜차이즈|加盟|франшиз/.test(q)) {
      msg = "Want to own a team? I’ll walk you to the franchise desk — Founding Four / First 32.";
      links.push({ href: "apply.html", label: "Franchise / Owner apply" });
      links.push({ href: "expansion.html", label: "Expansion Weekend" });
      links.push({ href: "advertise.html#lead", label: "Launch lead gen" });
    } else if (/affiliate|аффил|アフィリ|제휴|联盟|afiliad/.test(q) && /ad|advertise|spend|b2b|广告/.test(q)) {
      msg = "Advertise Affiliate — earn up to 30% on ad spend you refer.";
      links.push({ href: "ads-affiliate.html", label: "Advertise Affiliate" });
      links.push({ href: "advertise.html", label: "Advertise / Launch" });
    } else if (/affiliate|creator|clipper|influencer|аффил|アフィリ|제휴|联盟|afiliad|partner/.test(q)) {
      msg = "Creators & affiliates — consumer links + Talent Community.";
      links.push({ href: "affiliates.html", label: "Consumer Affiliates" });
      links.push({ href: "talent.html?role=affiliate", label: "Talent signup" });
      links.push({ href: "partners.html", label: "Brand partners" });
    } else if (/advertise|launch|campaign|brand|sponsor|广告|publicit|werbung/.test(q)) {
      msg = "Let’s launch — brand campaigns and franchise lead gen.";
      links.push({ href: "advertise.html#lead", label: "Start a launch" });
      links.push({ href: "partners.html", label: "Partners" });
      links.push({ href: "developers.html#promos", label: "Sponsored Lenses promo" });
    } else if (/sapphire|ruby|gem|coin|digital gift|bits|robux|douyin/.test(q)) {
      msg = "Sapphires, Rubies, Coins — buy packs and send digital gifts TikTok/Twitch style.";
      links.push({ href: "gems.html", label: "Buy Sapphires" });
      links.push({ href: "gems.html?tab=gifts", label: "Digital gifts" });
      links.push({ href: "gifts.html", label: "Gift cards · 35% bonus" });
    } else if (/gift card|gift pack|pack rip|virtual gift/.test(q)) {
      msg = "Gift cards with +35% bonus + OG drops — or send a viral pack-rip to a friend.";
      links.push({ href: "gifts.html", label: "Gift cards" });
      links.push({ href: "gifts.html#send", label: "Send a gift pack" });
      links.push({ href: "gems.html", label: "Gems & digital gifts" });
    } else if (/pass|membership|ticket|sign ?up|join|founding|assinatura|abonnement|会員/.test(q)) {
      msg = "Founding membership + Premium League Pass — puck shipped on the $36 deal.";
      links.push({ href: "join.html", label: "League Pass / Founding" });
      links.push({ href: "signin.html", label: "Sign in" });
      links.push({ href: "promos.html", label: "Promotions" });
    } else if (/shop|merch|order|track|shipping|pedido|commande|注文|주문|заказ/.test(q)) {
      msg = "Shop physical + digital — or load gems for live gifts.";
      links.push({ href: "shop.html", label: "Shop" });
      links.push({ href: "gifts.html", label: "Gift cards" });
      links.push({ href: "gems.html", label: "Gems" });
    } else if (/language|idioma|langue|sprache|язык|语言|言語|언어/.test(q)) {
      msg = "Pick your language / region from the bar at the bottom of any page.";
      links.push({ href: "#", label: "Open languages", action: "lang" });
    } else if (/event|venue|stadium|party|experience|会場|경기장/.test(q)) {
      msg = "Fan Village, Party Zone, soundtrack — Event Experience.";
      links.push({ href: "experience.html", label: "Event Experience" });
      links.push({ href: "schedule.html", label: "Schedule" });
      links.push({ href: "join.html", label: "Get tickets / Pass" });
    } else if (/help|support|human|agent|call|phone/.test(q)) {
      msg = "I’ve got you — Help Center or a human.";
      links.push({ href: "support.html", label: "Help Center" });
      links.push({ href: "contact.html", label: "Contact Us" });
      links.push({ href: "mailto:hello@puckgold.com", label: "hello@puckgold.com" });
    } else if (/sell|sales|revenue|money|earn|monet/.test(q)) {
      msg = "Ways to ball out: gift cards, gems, affiliates, advertise, or own a franchise.";
      links.push({ href: "gifts.html", label: "Sell gift cards vibe" });
      links.push({ href: "gems.html", label: "Gems economy" });
      links.push({ href: "affiliates.html", label: "Affiliates" });
      links.push({ href: "ads-affiliate.html", label: "Ads Affiliate" });
      links.push({ href: "apply.html", label: "Own a team" });
    } else {
      msg =
        "Hey — I’m Pucky 🏒 Your friendly PuckGold guide. I can help with League Pass, gems, gift cards, affiliates, franchise ownership, Advertise, or the Developer Hub.";
      links.push({ href: "join.html", label: "Sign up / League Pass" });
      links.push({ href: "gems.html", label: "Buy Sapphires" });
      links.push({ href: "gifts.html", label: "Gift cards · 35%" });
      links.push({ href: "apply.html", label: "Own a franchise" });
      links.push({ href: "affiliates.html", label: "Affiliates" });
      links.push({ href: "developers.html", label: "Developer Hub" });
      links.push({ href: "advertise.html", label: "Advertise / Launch" });
    }

    return { msg, links };
  }

  const QUICK = [
    { label: "League Pass", q: "league pass signup" },
    { label: "Gems", q: "sapphires gems" },
    { label: "Gift cards", q: "gift cards" },
    { label: "Own a team", q: "franchise owner" },
    { label: "Affiliates", q: "affiliate creator" },
    { label: "Advertise", q: "advertise launch" },
    { label: "Developers", q: "developer ice studio" },
    { label: "Help", q: "help support" },
  ];

  function ensureCss() {
    if (document.querySelector("link[data-pgb-support-css]")) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "assets/css/support-widget.css?v=2";
    l.dataset.pgbSupportCss = "1";
    document.head.appendChild(l);
  }

  function mount() {
    ensureCss();
    if (document.getElementById("pgbSupportRoot")) return;

    const root = document.createElement("div");
    root.id = "pgbSupportRoot";
    root.innerHTML = `
      <div class="pgb-pucky-bubble" id="pgbPuckyNudge">Need a hand? I can get you Pass, gems, gifts, or a franchise app 🏒</div>
      <button type="button" class="pgb-support-fab" id="pgbSupportFab" aria-label="Chat with Pucky" aria-expanded="false">
        ${PUCKY_SVG}
        <span class="dot" aria-hidden="true"></span>
      </button>
      <div class="pgb-support-panel" id="pgbSupportPanel" role="dialog" aria-label="Pucky">
        <div class="pgb-support-head">
          ${PUCKY_SVG}
          <div class="who">
            <strong>Pucky</strong>
            <small>Friendly AI · here to help you ball out</small>
          </div>
          <button type="button" id="pgbSupportClose" aria-label="Close">×</button>
        </div>
        <div id="pgbSupportHome">
          <p class="pgb-support-disc">I route you to signups, sales, partnerships, affiliates, franchise, gift cards, gems &amp; more.</p>
          <div class="pgb-quick" id="pgbQuick"></div>
          <div class="pgb-support-menu">
            <button type="button" data-act="chat"><span class="ico">💬</span><span>Chat with Pucky</span></button>
            <a href="join.html"><span class="ico">🎟️</span><span>League Pass / founding</span></a>
            <a href="gems.html"><span class="ico">💎</span><span>Sapphires · Rubies · Coins</span></a>
            <a href="gifts.html"><span class="ico">🎁</span><span>Gift cards · 35% bonus</span></a>
            <a href="apply.html"><span class="ico">🏒</span><span>Franchise / own a team</span></a>
            <a href="affiliates.html"><span class="ico">🔗</span><span>Affiliates</span></a>
            <a href="advertise.html"><span class="ico">📢</span><span>Advertise / Launch</span></a>
            <a href="developers.html"><span class="ico">❄</span><span>Developer Hub</span></a>
            <a href="talent.html"><span class="ico">⭐</span><span>Talent Community</span></a>
            <a href="support.html"><span class="ico">❓</span><span>Help Center</span></a>
          </div>
          <div class="pgb-support-foot">
            <a href="contact.html">Prefer a human? Contact us →</a>
          </div>
        </div>
        <div class="pgb-chat" id="pgbChat">
          <button type="button" class="pgb-chat-back" id="pgbChatBack">← Menu</button>
          <div class="pgb-chat-msgs" id="pgbChatMsgs"></div>
          <form class="pgb-chat-form" id="pgbChatForm">
            <input id="pgbChatInput" placeholder="Ask Pucky anything…" autocomplete="off">
            <button type="submit">Send</button>
          </form>
        </div>
      </div>
      <div class="pgb-lang-pop" id="pgbLangPop" aria-hidden="true">
        <div class="pgb-lang-sheet" role="dialog" aria-label="Language">
          <button type="button" class="close" id="pgbLangClose" aria-label="Close">×</button>
          <h3 data-i18n="lang.label">Language / Region</h3>
          <div id="pgbLangList"></div>
        </div>
      </div>
    `;
    document.body.appendChild(root);

    const footer = document.getElementById("site-footer");
    if (footer && !document.getElementById("pgbLangBar")) {
      const bar = document.createElement("div");
      bar.className = "pgb-lang-bar";
      bar.id = "pgbLangBar";
      bar.innerHTML = `
        <span><span data-i18n="widget.region">Browse in</span>: <strong id="pgbLangCurrent">English — Global</strong></span>
        <button type="button" class="pgb-lang-btn" id="pgbLangOpen" data-i18n="lang.change">Change language</button>
      `;
      footer.parentNode.insertBefore(bar, footer);
    }

    const panel = document.getElementById("pgbSupportPanel");
    const fab = document.getElementById("pgbSupportFab");
    const home = document.getElementById("pgbSupportHome");
    const chat = document.getElementById("pgbChat");
    const msgs = document.getElementById("pgbChatMsgs");
    const langPop = document.getElementById("pgbLangPop");
    const nudge = document.getElementById("pgbPuckyNudge");
    const quick = document.getElementById("pgbQuick");

    quick.innerHTML = QUICK.map((q) => `<button type="button" data-q="${q.q}">${q.label}</button>`).join("");

    function refreshLangLabel() {
      const code = window.PGB_I18N?.getLang() || "en";
      const meta = window.PGB_I18N?.languages.find((l) => l.code === code);
      const el = document.getElementById("pgbLangCurrent");
      if (el) el.textContent = meta ? meta.label : code;
    }

    function fillLangList() {
      const list = document.getElementById("pgbLangList");
      if (!list || !window.PGB_I18N) return;
      const cur = window.PGB_I18N.getLang();
      list.innerHTML = window.PGB_I18N.languages
        .map((l) => `<button type="button" data-lang="${l.code}" class="${l.code === cur ? "is-on" : ""}">${l.label}</button>`)
        .join("");
    }

    function openLang() {
      fillLangList();
      langPop.classList.add("is-open");
      langPop.setAttribute("aria-hidden", "false");
    }
    function closeLang() {
      langPop.classList.remove("is-open");
      langPop.setAttribute("aria-hidden", "true");
    }

    function addBubble(text, who, links) {
      const div = document.createElement("div");
      div.className = `pgb-bubble ${who}`;
      div.textContent = text;
      msgs.appendChild(div);
      if (links && links.length) {
        const wrap = document.createElement("div");
        wrap.className = "pgb-bubble bot";
        const stack = document.createElement("div");
        stack.className = "cta-stack";
        links.forEach((l) => {
          const a = document.createElement("a");
          a.href = l.href || "#";
          a.textContent = "→ " + l.label;
          if (l.action === "lang") {
            a.addEventListener("click", (e) => {
              e.preventDefault();
              openLang();
            });
          }
          stack.appendChild(a);
        });
        wrap.appendChild(stack);
        msgs.appendChild(wrap);
      }
      msgs.scrollTop = msgs.scrollHeight;
    }

    function ask(text) {
      addBubble(text, "user");
      const { msg, links } = replyFor(text);
      setTimeout(() => addBubble(msg, "bot", links), 220);
      try {
        const key = "pgb-support-chat";
        const prev = JSON.parse(localStorage.getItem(key) || "[]");
        prev.push({ q: text, at: new Date().toISOString() });
        localStorage.setItem(key, JSON.stringify(prev.slice(-40)));
      } catch (_) {}
    }

    function openChat(seed) {
      home.style.display = "none";
      chat.classList.add("is-on");
      nudge?.classList.remove("is-on");
      if (!msgs.childElementCount) {
        addBubble(
          "Hey — I’m Pucky 🏒 Tap a shortcut or tell me what you want: Pass, gems, gifts, franchise, affiliates, advertise, or developers.",
          "bot",
          [
            { href: "join.html", label: "League Pass" },
            { href: "gems.html", label: "Gems" },
            { href: "apply.html", label: "Franchise" },
            { href: "developers.html", label: "Dev Hub" },
          ]
        );
      }
      if (seed) setTimeout(() => ask(seed), 280);
      document.getElementById("pgbChatInput")?.focus();
    }

    function showHome() {
      chat.classList.remove("is-on");
      home.style.display = "";
    }

    function openPanel(seed) {
      panel.classList.add("is-open");
      fab.setAttribute("aria-expanded", "true");
      nudge?.classList.remove("is-on");
      if (seed) openChat(seed);
      else showHome();
    }

    fab?.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      fab.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        showHome();
        nudge?.classList.remove("is-on");
      }
    });
    document.getElementById("pgbSupportClose")?.addEventListener("click", () => {
      panel.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
    });
    document.querySelector('[data-act="chat"]')?.addEventListener("click", () => openChat());
    document.getElementById("pgbChatBack")?.addEventListener("click", showHome);

    quick?.addEventListener("click", (e) => {
      const b = e.target.closest("button[data-q]");
      if (!b) return;
      openChat(b.dataset.q);
    });

    document.getElementById("pgbChatForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("pgbChatInput");
      const text = (input.value || "").trim();
      if (!text) return;
      input.value = "";
      ask(text);
    });

    document.getElementById("pgbLangOpen")?.addEventListener("click", openLang);
    document.getElementById("pgbLangClose")?.addEventListener("click", closeLang);
    langPop?.addEventListener("click", (e) => {
      if (e.target === langPop) closeLang();
    });
    document.getElementById("pgbLangList")?.addEventListener("click", (e) => {
      const btn = e.target.closest("button[data-lang]");
      if (!btn || !window.PGB_I18N) return;
      window.PGB_I18N.setLang(btn.dataset.lang);
      refreshLangLabel();
      closeLang();
      window.PGB_I18N.apply(document);
    });

    window.addEventListener("pgb:lang", () => {
      refreshLangLabel();
      window.PGB_I18N?.apply(document);
    });

    window.addEventListener("pgb:open-pucky", (e) => {
      const prompt = e.detail?.prompt;
      const map = {
        developer: "developer ice studio",
        franchise: "franchise owner",
        gems: "sapphires gems",
        gifts: "gift cards",
        affiliate: "affiliate creator",
      };
      openPanel(map[prompt] || prompt || "");
    });

    refreshLangLabel();
    window.PGB_I18N?.apply(document);

    // Gentle nudge once per session
    try {
      if (!sessionStorage.getItem("pgb-pucky-nudge")) {
        setTimeout(() => {
          if (!panel.classList.contains("is-open")) nudge?.classList.add("is-on");
          sessionStorage.setItem("pgb-pucky-nudge", "1");
          setTimeout(() => nudge?.classList.remove("is-on"), 8000);
        }, 4500);
      }
    } catch (_) {}

    if (new URLSearchParams(location.search).get("support") === "chat") {
      openPanel();
      openChat();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
