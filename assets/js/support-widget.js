/** Floating support hub + AI helper (Uber/Cartier-style) */
(function () {
  if (window.__pgbSupportMounted) return;
  window.__pgbSupportMounted = true;

  function t(key) {
    return window.PGB_I18N ? window.PGB_I18N.t(key) : key;
  }

  function replyFor(text) {
    const q = text.toLowerCase();
    const links = [];
    let msg = "";

    if (/franchise|owner|operator|team owner|franquia|フランチャイズ|프랜차이즈|加盟|франшиз/.test(q)) {
      msg = "Franchise / owner-operator applications live here:";
      links.push({ href: "apply.html", label: "Franchise / Apply" });
      links.push({ href: "expansion.html", label: "Expansion Weekend" });
    } else if (/affiliate|аффил|アフィリ|제휴|联盟|afiliad/.test(q) && /ad|advertise|spend|b2b|广告/.test(q)) {
      msg = "Advertise Affiliate (earn on referred ad spend):";
      links.push({ href: "ads-affiliate.html", label: "Advertise Affiliate" });
      links.push({ href: "advertise.html", label: "Advertise / Launch" });
    } else if (/affiliate|creator|clipper|influencer|аффил|アフィリ|제휴|联盟|afiliad/.test(q)) {
      msg = "Consumer Affiliates + Talent Community:";
      links.push({ href: "affiliates.html", label: "Consumer Affiliates" });
      links.push({ href: "talent.html?role=affiliate", label: "Talent signup" });
    } else if (/advertise|launch|campaign|brand|广告|publicit|werbung/.test(q)) {
      msg = "Advertise / Launch lead gen:";
      links.push({ href: "advertise.html#lead", label: "Start a launch" });
      links.push({ href: "partners.html", label: "Partners" });
    } else if (/pass|membership|ticket|assinatura|abonnement|会員/.test(q)) {
      msg = "Premium League Pass & founding deal:";
      links.push({ href: "join.html", label: "League Pass plans" });
      links.push({ href: "promos.html", label: "Promotions" });
    } else if (/order|track|shipping|pedido|commande|注文|주문|заказ/.test(q)) {
      msg = "Shop & gift orders — track from your account when signed in, or email shop support:";
      links.push({ href: "shop.html", label: "Shop" });
      links.push({ href: "gifts.html", label: "Gift cards" });
      links.push({ href: "mailto:hello@puckgold.com", label: "hello@puckgold.com" });
    } else if (/language|idioma|langue|sprache|язык|语言|言語|언어/.test(q)) {
      msg = "Open the language / region picker from the bar at the bottom of any page.";
      links.push({ href: "#", label: "Open languages", action: "lang" });
    } else if (/event|venue|stadium|party|experience|会場|경기장/.test(q)) {
      msg = "Events & Fan Village:";
      links.push({ href: "experience.html", label: "Event Experience" });
      links.push({ href: "stadiums.html", label: "Stadiums" });
      links.push({ href: "schedule.html", label: "Schedule" });
    } else if (/human|agent|person|call|phone|live/.test(q)) {
      msg = "Reach a human:";
      links.push({ href: "contact.html", label: "Contact Us" });
      links.push({ href: "mailto:hello@puckgold.com", label: "hello@puckgold.com" });
      links.push({ href: "tel:+18007285463", label: "Call +1 800 PUCK GOLD" });
    } else {
      msg = t("support.aiHello");
      links.push({ href: "support.html", label: t("footer.help") });
      links.push({ href: "join.html", label: "League Pass" });
      links.push({ href: "apply.html", label: "Franchise" });
      links.push({ href: "affiliates.html", label: "Affiliates" });
    }

    return { msg, links };
  }

  function ensureCss() {
    if (document.querySelector("link[data-pgb-support-css]")) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "assets/css/support-widget.css?v=1";
    l.dataset.pgbSupportCss = "1";
    document.head.appendChild(l);
  }

  function mount() {
    ensureCss();
    if (document.getElementById("pgbSupportRoot")) return;

    const root = document.createElement("div");
    root.id = "pgbSupportRoot";
    root.innerHTML = `
      <button type="button" class="pgb-support-fab" id="pgbSupportFab" data-i18n-aria="support.open" aria-expanded="false">
        <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 4h16v12H7l-3 3V4zm4 4v2h8V8H8zm0 4v2h5v-2H8z"/></svg>
        <span data-i18n="support.open">Support</span>
      </button>
      <div class="pgb-support-panel" id="pgbSupportPanel" role="dialog" aria-label="Support">
        <div class="pgb-support-head">
          <strong data-i18n="support.ai">PuckGold AI Support</strong>
          <button type="button" id="pgbSupportClose" aria-label="Close">×</button>
        </div>
        <div id="pgbSupportHome">
          <p class="pgb-support-disc" data-i18n="support.disclaimer"></p>
          <div class="pgb-support-menu">
            <button type="button" data-act="chat"><span class="ico">💬</span><span data-i18n="support.chat">Chat with us</span></button>
            <a href="tel:+18007285463"><span class="ico">📞</span><span data-i18n="support.call">Call us</span></a>
            <a href="mailto:hello@puckgold.com"><span class="ico">✉️</span><span data-i18n="support.email">Email us</span></a>
            <a href="contact.html"><span class="ico">📅</span><span data-i18n="support.book">Book an appointment</span></a>
            <a href="experience.html"><span class="ico">📍</span><span data-i18n="support.find">Find an event / venue</span></a>
            <a href="shop.html"><span class="ico">🛍️</span><span data-i18n="support.track">Track your order</span></a>
            <a href="apply.html"><span class="ico">🏒</span><span data-i18n="support.franchise">Franchise / own a team</span></a>
            <a href="affiliates.html"><span class="ico">🔗</span><span data-i18n="support.affiliate">Affiliates & advertise</span></a>
          </div>
          <div class="pgb-support-foot">
            <a href="support.html" data-i18n="support.more">For more ways to contact us, open Contact.</a>
          </div>
        </div>
        <div class="pgb-chat" id="pgbChat">
          <button type="button" class="pgb-chat-back" id="pgbChatBack">← Menu</button>
          <div class="pgb-chat-msgs" id="pgbChatMsgs"></div>
          <form class="pgb-chat-form" id="pgbChatForm">
            <input id="pgbChatInput" data-i18n-placeholder="support.aiPlaceholder" placeholder="Type a message…" autocomplete="off">
            <button type="submit" data-i18n="support.send">Send</button>
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

    // Language bar above footer
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
        .map(
          (l) =>
            `<button type="button" data-lang="${l.code}" class="${l.code === cur ? "is-on" : ""}">${l.label}</button>`
        )
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
        wrap.style.display = "grid";
        wrap.style.gap = ".35rem";
        links.forEach((l) => {
          const a = document.createElement("a");
          a.href = l.href || "#";
          a.textContent = l.label;
          a.style.color = "#163a74";
          a.style.fontWeight = "800";
          a.style.fontSize = ".82rem";
          if (l.action === "lang") {
            a.addEventListener("click", (e) => {
              e.preventDefault();
              openLang();
            });
          }
          wrap.appendChild(a);
        });
        msgs.appendChild(wrap);
      }
      msgs.scrollTop = msgs.scrollHeight;
    }

    function openChat() {
      home.style.display = "none";
      chat.classList.add("is-on");
      if (!msgs.childElementCount) {
        addBubble(t("support.aiHello"), "bot");
      }
      document.getElementById("pgbChatInput")?.focus();
    }

    function showHome() {
      chat.classList.remove("is-on");
      home.style.display = "";
    }

    fab?.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      fab.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) showHome();
    });
    document.getElementById("pgbSupportClose")?.addEventListener("click", () => {
      panel.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
    });
    document.querySelector('[data-act="chat"]')?.addEventListener("click", openChat);
    document.getElementById("pgbChatBack")?.addEventListener("click", showHome);

    document.getElementById("pgbChatForm")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("pgbChatInput");
      const text = (input.value || "").trim();
      if (!text) return;
      addBubble(text, "user");
      input.value = "";
      const { msg, links } = replyFor(text);
      setTimeout(() => addBubble(msg, "bot", links), 280);
      try {
        const key = "pgb-support-chat";
        const prev = JSON.parse(localStorage.getItem(key) || "[]");
        prev.push({ q: text, at: new Date().toISOString(), lang: window.PGB_I18N?.getLang() });
        localStorage.setItem(key, JSON.stringify(prev.slice(-40)));
      } catch (_) {}
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

    refreshLangLabel();
    window.PGB_I18N?.apply(document);

    // Deep link ?support=chat
    if (new URLSearchParams(location.search).get("support") === "chat") {
      panel.classList.add("is-open");
      openChat();
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount);
  } else {
    mount();
  }
})();
