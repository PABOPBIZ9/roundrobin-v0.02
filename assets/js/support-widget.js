/** Pucky — talks (TTS + mic) and routes fans to Pass, gems, gifts, franchise, LV, and more */
(function () {
  if (window.__pgbSupportMounted) return;
  window.__pgbSupportMounted = true;

  const PUCKY_SVG = `<img class="pucky-face" src="assets/brand/pucky/pucky-13.png" width="48" height="48" alt="" />`;

  const INTENTS = [
    {
      id: "weekend",
      re: /weekend|expansion|faceoff|countdown|this weekend|first ?16|prize vault/,
      msg: "Expansion Weekend is live on the clock — Aura Vote, Clip Crown, Conductor’s Crest, and the thirty-six dollar OG Offer all ride faceoff.",
      links: [
        { href: "expansion.html", label: "Expansion hub" },
        { href: "aura-vote.html", label: "Aura Vote live" },
        { href: "clip-crown.html", label: "Submit Clip Crown" },
        { href: "checkout.html?offer=og", label: "$36 OG Offer" },
      ],
      follow: "Aura, Clip Crown, or the founding offer?",
    },
    {
      id: "aura",
      re: /aura|teal|pink|gold clutch|vote window|aura vote/,
      msg: "Aura Vote windows are open — tap teal rush, pink chaos, or gold clutch and farm XP. OG Pass multiplies at five times.",
      links: [
        { href: "aura-vote.html", label: "Open Aura Vote" },
        { href: "checkout.html?offer=og", label: "Unlock 5× · $36" },
        { href: "format.html#aura", label: "How auras work" },
      ],
      follow: "Want the live meter or the OG boost?",
    },
    {
      id: "clip",
      re: /clip crown|submit clip|viral clip|tiktok clip|reel/,
      msg: "Clip Crown is open Sat through Sunday horn — paste your public clip link and grab submission XP.",
      links: [
        { href: "clip-crown.html", label: "Submit Clip Crown" },
        { href: "listen.html", label: "Listen for vibes" },
        { href: "awards.html#clip-crown", label: "Clip Crown hardware" },
      ],
      follow: "Ready to submit, or need Listen inspiration?",
    },
    {
      id: "crest",
      re: /conductor|crest|sportsmanship|choo ?choo heart/,
      msg: "Conductor’s Crest fan vote crowns weekend sportsmanship — one vote a day, XP on every cast.",
      links: [
        { href: "conductor-crest.html", label: "Cast Crest vote" },
        { href: "news-article.html?id=choochoo-heart", label: "Choo Choo heart story" },
        { href: "awards.html#conductors-crest", label: "Hardware" },
      ],
      follow: "Vote now or read the lore?",
    },
    {
      id: "listen",
      re: /listen|podcast|booth|jack jet|miracle game audio|broadcast/,
      msg: "Listen has Voice Roster, Founding Four player bites, Miracle Booth, Backstory, and Gold on 1 — finish tracks for Expansion XP.",
      links: [
        { href: "listen.html?show=founding-four-player-bites", label: "36 player bites" },
        { href: "listen.html?show=voice-roster-showcase", label: "Voice Roster + Pucky" },
        { href: "listen.html?show=maxxer-promo-pack", label: "MAXXER promo pack" },
        { href: "listen.html?show=booth-sample-pack", label: "Booth Sample Pack" },
      ],
      follow: "Player bites or Miracle booth?",
    },
    {
      id: "pass",
      re: /pass|membership|ticket|sign ?up|join|founding|\$36|league pass|og offer|gold puck|assinatura|abonnement|会員/,
      msg: "Founding membership locks a free limited gold puck plus a year of Premium League Pass for thirty-six dollars — and five-times XP on Fan Zone farms.",
      links: [
        { href: "checkout.html?offer=og", label: "$36 OG Offer" },
        { href: "join.html", label: "Pass details" },
        { href: "expansion.html", label: "Expansion Weekend clock" },
      ],
      follow: "Claim the offer, or see Pass details?",
    },
    {
      id: "gems",
      re: /sapphire|ruby|gem|coin|digital gift|bits|robux|douyin|wallet/,
      msg: "Sapphires, Rubies, and Coins power PuckGold digital gifts. Buy packs, tip creators, stack your wallet.",
      links: [
        { href: "gems.html", label: "Buy Sapphires" },
        { href: "gems.html?tab=gifts", label: "Digital gifts" },
        { href: "gifts.html", label: "Gift cards · 35% bonus" },
      ],
      follow: "Packs, gifts, or gift cards — which lane?",
    },
    {
      id: "gifts",
      re: /gift card|gift pack|pack rip|virtual gift|bonus|35%/,
      msg: "Gift cards come with a thirty-five percent bonus plus OG digital drops. You can also send a friend a viral pack-rip reveal.",
      links: [
        { href: "gifts.html", label: "Gift cards" },
        { href: "gifts.html#send", label: "Send a gift pack" },
        { href: "gems.html", label: "Gems & digital gifts" },
      ],
      follow: "Buying for yourself or sending a pack?",
    },
    {
      id: "franchise",
      re: /franchise|owner|operator|team owner|own a team|franquia|フランチャイズ|프랜차이즈|加盟|франшиз/,
      msg: "Franchise and owner-operator applications are open for Founding Four and the First Thirty-Two. I’ll walk you to the apply desk.",
      links: [
        { href: "apply.html", label: "Franchise / Owner apply" },
        { href: "expansion.html", label: "Expansion Weekend" },
        { href: "advertise.html#lead", label: "Launch lead gen" },
      ],
      follow: "Ready to start the application?",
    },
    {
      id: "lockervision",
      re: /locker|outfit|jersey|pads|uniform|kit studio|generator|rink|lv\b/,
      msg: "LockerVision shows every game outfit — and Kit Studio lets you build jerseys, stages, and marketing exports. Randomize, share, download.",
      links: [
        { href: "kit-studio.html", label: "Open Kit Studio" },
        { href: "lockervision.html", label: "LockerVision home" },
        { href: "lv-edition.html?edition=home", label: "Browse editions" },
      ],
      follow: "Kit Studio, a team locker, or editions?",
    },
    {
      id: "teams",
      re: /team audio|goal horn|goal call|walkout|arena pack|stadium sound|geckz|cardinals|whoomp|choo ?choo/,
      msg: "Founding Four arena packs are live — walkouts, goal calls, PA blasts, and win outros on every team page plus Listen.",
      links: [
        { href: "listen.html?show=founding-four-arena-pack", label: "Arena Pack on Listen" },
        { href: "team.html?team=miami-mighty-geckz#audio", label: "Geckz stadium sound" },
        { href: "teams.html", label: "All teams" },
      ],
      follow: "Listen pack or a team vault?",
    },
    {
      id: "maxxer",
      re: /maxxer|hype voice|promo host|celebrity clone|brand factory voice/,
      msg: "MAXXER is live — cloned promo host for Founding Four launch, Brand Factory, and OG Offer hype. Track 1 on Listen now.",
      links: [
        { href: "listen.html?show=maxxer-promo-pack", label: "Play MAXXER promo" },
        { href: "brand-factory/studio.html", label: "Brand Factory" },
        { href: "pucky13.html#maxxer", label: "Preview on Pucky 13" },
      ],
      follow: "Promo pack, Brand Factory, or Pucky?",
    },
    {
      id: "pucky13",
      re: /pucky ?13|oracle|astrology|dad joke|tip jar|swiftie|patrick kane|number 13|horoscope/,
      msg: "Pucky 13 is live — chat, free daily jokes & star vibes, tip jar, daily astrology, and the $350 deep report. I'm a vigilante Swiftie with Kane mythology.",
      links: [
        { href: "pucky13.html", label: "Open Pucky 13" },
        { href: "pucky13.html#services", label: "Paid services" },
        { href: "pucky13.html#chat", label: "Chat now" },
      ],
      follow: "Chat, tips, or the deep report?",
    },
    {
      id: "retro",
      re: /retro|throwback|nhl.?94|sixteen.?bit|16.?bit|pixel|shimmer/,
      msg: "PGB Retro League is our nineteen ninety-four throwback — shimmer logo, championship crests, Game Zone energy.",
      links: [
        { href: "retro.html", label: "Retro League page" },
        { href: "brand.html#retro", label: "Brand kit · Retro" },
        { href: "play.html", label: "Game Zone" },
      ],
      follow: "Crests, shimmer motion, or Game Zone?",
    },
    {
      id: "schedule",
      re: /schedule|scores|standings|stats|bracket|when|game night|faceoff/,
      msg: "Scores, schedule, stats, standings, and the playoff bracket are all live. Outfit links jump straight into LockerVision.",
      links: [
        { href: "schedule.html", label: "Schedule" },
        { href: "scores.html", label: "Scores" },
        { href: "standings.html", label: "Standings" },
        { href: "stats.html", label: "Stats" },
      ],
      follow: "Scores, standings, or outfit schedule?",
    },
    {
      id: "play",
      re: /quiz|game zone|farm|xp|leaderboard|play zone/,
      msg: "Game Zone is timed quizzes, daily farms, and fan XP. Climb the board while you learn the league.",
      links: [
        { href: "play.html", label: "Open Game Zone" },
        { href: "play.html#board", label: "Fan leaderboard" },
        { href: "lockervision.html", label: "LockerVision" },
      ],
      follow: "Quiz, farm quests, or the leaderboard?",
    },
    {
      id: "dev",
      re: /dev|lens|studio|camera kit|sdk|api|ar\b|spectacles|ice studio/,
      msg: "Developer Hub has Ice Studio, Camera Kit, Puck Kit, Games, Marketing API, and founding developer drops.",
      links: [
        { href: "developers.html", label: "Developer Hub" },
        { href: "talent.html?role=creator", label: "Creator / talent signup" },
        { href: "gems.html", label: "Gems for creators" },
      ],
      follow: "Studio, Camera Kit, or founding dev drop?",
    },
    {
      id: "ads_aff",
      re: /advertise affiliate|ad spend|ads affiliate|b2b affiliate/,
      msg: "Advertise Affiliate pays up to thirty percent on ad spend you refer. B2B lane.",
      links: [
        { href: "ads-affiliate.html", label: "Advertise Affiliate" },
        { href: "advertise.html", label: "Advertise / Launch" },
      ],
      follow: "Want the affiliate FAQ or the apply form?",
    },
    {
      id: "affiliate",
      re: /affiliate|creator|clipper|influencer|аффил|アフィリ|제휴|联盟|afiliad|partner/,
      msg: "Consumer affiliates and the Talent Community — create links, earn, and grow with Founding Four drops.",
      links: [
        { href: "affiliates.html", label: "Consumer Affiliates" },
        { href: "talent.html?role=affiliate", label: "Talent signup" },
        { href: "partners.html", label: "Brand partners" },
      ],
      follow: "Creator links or Talent Community signup?",
    },
    {
      id: "advertise",
      re: /advertise|launch|campaign|brand|sponsor|广告|publicit|werbung/,
      msg: "Advertise and Launch covers brand campaigns and franchise lead gen. Let’s get your brief in.",
      links: [
        { href: "advertise.html#lead", label: "Start a launch" },
        { href: "partners.html", label: "Partners" },
        { href: "developers.html#promos", label: "Sponsored Lenses promo" },
      ],
      follow: "Brand campaign or franchise leads?",
    },
    {
      id: "shop",
      re: /shop|merch|order|track|shipping|jersey|hat|puck|pedido|commande|注文|주문|заказ/,
      msg: "Official Shop has jerseys, hats, pucks, and Founding Four drops. Digital lives in gifts and gems.",
      links: [
        { href: "shop.html", label: "Shop" },
        { href: "gifts.html", label: "Gift cards" },
        { href: "gems.html", label: "Gems" },
      ],
      follow: "Physical merch or digital gifts?",
    },
    {
      id: "experience",
      re: /event|venue|stadium|party|experience|fan village|会場|경기장/,
      msg: "Event Experience covers Fan Village, Party Zone, and the soundtrack — game-day energy beyond the glass.",
      links: [
        { href: "experience.html", label: "Event Experience" },
        { href: "schedule.html", label: "Schedule" },
        { href: "join.html", label: "Get $36 OG Pass" },
      ],
      follow: "Village, Party Zone, or OG Pass?",
    },
    {
      id: "signin",
      re: /sign ?in|log ?in|account|password|auth|dynamic|whop/,
      msg: "Sign In is live as a member gate. Full Dynamic wallet login and Whop checkout are next on the wiring list — you can still join founding now.",
      links: [
        { href: "signin.html", label: "Sign in" },
        { href: "join.html", label: "Join · $36 founding" },
        { href: "support.html", label: "Help Center" },
      ],
      follow: "Sign in page or founding join?",
    },
    {
      id: "help",
      re: /help|support|human|agent|call|phone|contact|faq/,
      msg: "I’ve got you. Help Center for self-serve, or Contact for a human. You can also email hello at puckgold.com.",
      links: [
        { href: "support.html", label: "Help Center" },
        { href: "contact.html", label: "Contact Us" },
        { href: "mailto:hello@puckgold.com", label: "hello@puckgold.com" },
      ],
      follow: "Help Center or a human contact form?",
    },
    {
      id: "earn",
      re: /sell|sales|revenue|money|earn|monet|make money/,
      msg: "Ways to ball out: gift cards, gems, consumer affiliates, ads affiliate, Talent, or own a franchise.",
      links: [
        { href: "gifts.html", label: "Gift cards" },
        { href: "gems.html", label: "Gems economy" },
        { href: "affiliates.html", label: "Affiliates" },
        { href: "ads-affiliate.html", label: "Ads Affiliate" },
        { href: "apply.html", label: "Own a team" },
      ],
      follow: "Affiliate, gems, or franchise?",
    },
    {
      id: "hello",
      re: /^(hi|hey|hello|yo|sup|hola|bonjour|hallo)\b|how are you|who are you|what can you/,
      msg: "Hey — I’m Pucky, your PuckGold guide. Expansion Weekend is live — I can route you to Aura Vote, Clip Crown, Listen XP, or the thirty-six dollar OG Offer.",
      links: [
        { href: "aura-vote.html", label: "Aura Vote" },
        { href: "clip-crown.html", label: "Clip Crown" },
        { href: "checkout.html?offer=og", label: "$36 OG" },
        { href: "expansion.html", label: "Weekend hub" },
      ],
      follow: "Aura, Clip Crown, or founding offer?",
    },
  ];

  const FOLLOW_MAP = {
    pass: { yes: "checkout.html?offer=og", open: "checkout.html?offer=og", founding: "checkout.html?offer=og", monthly: "join.html", claim: "checkout.html?offer=og", offer: "checkout.html?offer=og" },
    weekend: { aura: "aura-vote.html", clip: "clip-crown.html", offer: "checkout.html?offer=og", founding: "checkout.html?offer=og" },
    aura: { meter: "aura-vote.html", live: "aura-vote.html", boost: "checkout.html?offer=og", og: "checkout.html?offer=og" },
    clip: { submit: "clip-crown.html", listen: "listen.html", ready: "clip-crown.html" },
    crest: { vote: "conductor-crest.html", lore: "news-article.html?id=choochoo-heart", now: "conductor-crest.html" },
    listen: {
      booth: "listen.html?show=booth-sample-pack",
      backstory: "listen.html?show=backstory-pregame-miracle",
      roster: "listen.html?show=voice-roster-showcase",
      maxxer: "listen.html?show=maxxer-promo-pack",
      open: "listen.html?show=voice-roster-showcase",
    },
    gems: { packs: "gems.html", gifts: "gems.html?tab=gifts", cards: "gifts.html" },
    gifts: { myself: "gifts.html", send: "gifts.html#send", pack: "gifts.html#send" },
    franchise: { yes: "apply.html", apply: "apply.html", start: "apply.html" },
    lockervision: { team: "lv-team.html", game: "lv-schedule.html", schedule: "lv-schedule.html", studio: "kit-studio.html", kit: "kit-studio.html", open: "kit-studio.html" },
    schedule: { scores: "scores.html", standings: "standings.html", outfit: "lv-schedule.html" },
  };

  const QUICK = [
    { label: "Pucky 13", q: "open pucky 13 oracle" },
    { label: "Aura Vote", q: "open aura vote" },
    { label: "Clip Crown", q: "submit clip crown" },
    { label: "$36 OG", q: "I want the $36 OG offer" },
    { label: "Weekend", q: "expansion weekend" },
    { label: "MAXXER", q: "play maxxer promo hype" },
    { label: "Listen", q: "open voice roster with pucky" },
    { label: "Crest vote", q: "conductor crest vote" },
    { label: "Gems", q: "Tell me about sapphires and gems" },
  ];

  let lastIntent = null;
  let speakOn = localStorage.getItem("pgb-pucky-speak") !== "0";
  let listening = false;
  let recognition = null;

  /** Chatterbox Pucky bites (high + mischievous) — falls back to browser TTS */
  const PUCKY_VOICE_CLIPS = {
    greet: "assets/vault/content/broadcast/voice-roster-showcase/00_pucky.wav",
    close: "assets/vault/content/broadcast/voice-roster-showcase/15_pucky.wav",
    pass: "assets/vault/content/broadcast/pucky-intent-pack/00_pucky.wav",
    aura: "assets/vault/content/broadcast/pucky-intent-pack/01_pucky.wav",
    clip: "assets/vault/content/broadcast/pucky-intent-pack/02_pucky.wav",
    listen: "assets/vault/content/broadcast/pucky-intent-pack/03_pucky.wav",
    weekend: "assets/vault/content/broadcast/pucky-intent-pack/04_pucky.wav",
    maxxer: "assets/vault/content/broadcast/maxxer-promo-pack/00_maxxer.wav",
  };
  const PUCKY_INTENT_CLIP = {
    pass: "pass",
    aura: "aura",
    clip: "clip",
    listen: "listen",
    weekend: "weekend",
    maxxer: "maxxer",
  };
  let puckyAudio = null;

  function speakPuckyClip(key) {
    const src = PUCKY_VOICE_CLIPS[key];
    if (!speakOn || !src) return false;
    try {
      stopSpeak();
      if (!puckyAudio) puckyAudio = new Audio();
      puckyAudio.src = src;
      puckyAudio.currentTime = 0;
      const play = puckyAudio.play();
      if (play && typeof play.catch === "function") play.catch(() => {});
      return true;
    } catch (_) {
      return false;
    }
  }

  function speakText(text) {
    if (!speakOn || !window.speechSynthesis) return;
    try {
      window.speechSynthesis.cancel();
      if (puckyAudio) {
        try {
          puckyAudio.pause();
        } catch (_) {}
      }
      const clean = String(text || "")
        .replace(/[🏒💎🎁🎟️❄⭐❓📢🔗💬←→]/g, "")
        .replace(/\s+/g, " ")
        .trim();
      if (!clean) return;
      // High-pitch friendly + tiny Chucky wink via browser TTS when no clip
      const u = new SpeechSynthesisUtterance(clean);
      u.rate = 1.14;
      u.pitch = 1.48;
      u.volume = 1;
      const lang = window.PGB_I18N?.getLang?.() || "en";
      u.lang = lang === "en" ? "en-US" : lang;
      const voices = window.speechSynthesis.getVoices?.() || [];
      const prefer =
        voices.find((v) => /en(-|_)US/i.test(v.lang) && /female|samantha|karen|victoria|google US/i.test(v.name)) ||
        voices.find((v) => /^en/i.test(v.lang));
      if (prefer) u.voice = prefer;
      window.speechSynthesis.speak(u);
    } catch (_) {}
  }

  function stopSpeak() {
    try {
      window.speechSynthesis?.cancel();
    } catch (_) {}
    if (puckyAudio) {
      try {
        puckyAudio.pause();
        puckyAudio.currentTime = 0;
      } catch (_) {}
    }
  }

  function getRecognition() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return null;
    if (recognition) return recognition;
    recognition = new SR();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";
    return recognition;
  }

  function replyFor(text) {
    const q = String(text || "").toLowerCase().trim();
    if (!q) {
      return {
        msg: "Say something — Pass, gems, LockerVision, franchise — I’m listening.",
        links: QUICK.slice(0, 4).map((x) => ({ href: "#", label: x.label, seed: x.q })),
        intent: null,
      };
    }

    // Follow-up shortcuts after last intent
    if (lastIntent && /^(yes|yeah|yep|ok|okay|sure|do it|open|show me|please)\b/.test(q)) {
      const map = FOLLOW_MAP[lastIntent.id];
      const href = map?.yes || map?.open || lastIntent.links?.[0]?.href;
      if (href) {
        return {
          msg: `On it — opening ${lastIntent.links?.[0]?.label || "that page"} for you.`,
          links: [{ href, label: "Open now" }, ...(lastIntent.links || []).slice(0, 2)],
          intent: lastIntent,
          navigate: href,
        };
      }
    }

    if (lastIntent && /more|tell me more|details|how|price|cost|what/.test(q)) {
      return {
        msg: `${lastIntent.msg} ${lastIntent.follow || ""}`,
        links: lastIntent.links,
        intent: lastIntent,
      };
    }

    let best = null;
    let bestScore = 0;
    for (const intent of INTENTS) {
      if (intent.re.test(q)) {
        const score = (q.match(intent.re) || []).length + (intent.id === lastIntent?.id ? 0.5 : 0);
        if (score >= bestScore) {
          bestScore = score;
          best = intent;
        }
      }
    }

    if (!best) {
      return {
        msg: "I can help with Expansion Weekend — Aura Vote, Clip Crown, Conductor’s Crest, Listen XP, the thirty-six dollar OG Offer — plus gems, LockerVision, franchise, and more. What do you want?",
        links: [
          { href: "aura-vote.html", label: "Aura Vote" },
          { href: "checkout.html?offer=og", label: "$36 OG" },
          { href: "join.html", label: "League Pass" },
          { href: "gems.html", label: "Gems" },
          { href: "lockervision.html", label: "LockerVision" },
          { href: "apply.html", label: "Franchise" },
          { href: "developers.html", label: "Dev Hub" },
        ],
        intent: null,
      };
    }

    return {
      msg: `${best.msg}${best.follow ? " " + best.follow : ""}`,
      links: best.links,
      intent: best,
    };
  }

  function ensureCss() {
    if (document.querySelector("link[data-pgb-support-css]")) return;
    const l = document.createElement("link");
    l.rel = "stylesheet";
    l.href = "assets/css/support-widget.css?v=5";
    l.dataset.pgbSupportCss = "1";
    document.head.appendChild(l);
  }

  function mount() {
    ensureCss();
    if (document.getElementById("pgbSupportRoot")) return;

    // Warm voices for TTS
    try {
      window.speechSynthesis?.getVoices?.();
      window.speechSynthesis?.addEventListener?.("voiceschanged", () => {
        window.speechSynthesis.getVoices();
      });
    } catch (_) {}

    const root = document.createElement("div");
    root.id = "pgbSupportRoot";
    root.innerHTML = `
      <div class="pgb-pucky-bubble" id="pgbPuckyNudge">Need a hand? Tap me — I talk and can get you Pass, gems, or a franchise app.</div>
      <button type="button" class="pgb-support-fab" id="pgbSupportFab" aria-label="Chat with Pucky" aria-expanded="false">
        ${PUCKY_SVG}
        <span class="dot" aria-hidden="true"></span>
      </button>
      <div class="pgb-support-panel" id="pgbSupportPanel" role="dialog" aria-label="Pucky">
        <div class="pgb-support-head">
          ${PUCKY_SVG}
          <div class="who">
            <strong>Pucky</strong>
            <small id="pgbPuckyStatus">Online · talks &amp; listens</small>
          </div>
          <button type="button" class="pgb-speak-btn" id="pgbSpeakToggle" aria-pressed="${speakOn ? "true" : "false"}" title="Voice on/off">${speakOn ? "🔊" : "🔇"}</button>
          <button type="button" id="pgbSupportClose" aria-label="Close">×</button>
        </div>
        <div id="pgbSupportHome" class="pgb-support-home">
          <p class="pgb-support-disc">I speak answers out loud, hear your mic, and route you to signups, LockerVision, gems, gifts, franchise &amp; more.</p>
          <div class="pgb-quick" id="pgbQuick"></div>
          <div class="pgb-support-menu">
            <button type="button" data-act="chat"><span class="ico">💬</span><span>Chat with Pucky</span></button>
            <a href="pucky13.html"><span class="ico">13</span><span>Pucky 13 · Oracle page</span></a>
            <a href="join.html"><span class="ico">🎟️</span><span>$36 OG Pass · founding</span></a>
            <a href="gems.html"><span class="ico">💎</span><span>Sapphires · Rubies · Coins</span></a>
            <a href="gifts.html"><span class="ico">🎁</span><span>Gift cards · 35% bonus</span></a>
            <a href="lockervision.html"><span class="ico">👕</span><span>LockerVision outfits</span></a>
            <a href="apply.html"><span class="ico">🏒</span><span>Franchise / own a team</span></a>
            <a href="affiliates.html"><span class="ico">🔗</span><span>Affiliates</span></a>
            <a href="advertise.html"><span class="ico">📢</span><span>Advertise / Launch</span></a>
            <a href="developers.html"><span class="ico">❄</span><span>Developer Hub</span></a>
            <a href="support.html"><span class="ico">❓</span><span>Help Center</span></a>
          </div>
          <div class="pgb-support-foot">
            <a href="contact.html">Prefer a human? Contact us →</a>
          </div>
        </div>
        <div class="pgb-chat" id="pgbChat">
          <button type="button" class="pgb-chat-back" id="pgbChatBack">← Menu</button>
          <div class="pgb-chat-msgs" id="pgbChatMsgs" role="log" aria-live="polite"></div>
          <form class="pgb-chat-form" id="pgbChatForm">
            <button type="button" class="pgb-mic" id="pgbMicBtn" aria-label="Talk to Pucky" title="Hold to talk">🎤</button>
            <input id="pgbChatInput" placeholder="Type or tap mic…" autocomplete="off" enterkeyhint="send">
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
    const status = document.getElementById("pgbPuckyStatus");
    const speakBtn = document.getElementById("pgbSpeakToggle");
    const micBtn = document.getElementById("pgbMicBtn");
    const input = document.getElementById("pgbChatInput");

    quick.innerHTML = QUICK.map((q) => `<button type="button" data-q="${q.q}">${q.label}</button>`).join("");

    if (!getRecognition()) {
      micBtn.hidden = true;
      micBtn.title = "Voice input not supported in this browser";
    }

    function setStatus(text) {
      if (status) status.textContent = text;
    }

    function refreshLangLabel() {
      const code = window.PGB_I18N?.getLang() || "en";
      const meta = window.PGB_I18N?.languages?.find((l) => l.code === code);
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
      if (links?.length) {
        const wrap = document.createElement("div");
        wrap.className = "pgb-bubble bot pgb-bubble-links";
        const stack = document.createElement("div");
        stack.className = "cta-stack";
        links.forEach((l) => {
          if (l.seed) {
            const b = document.createElement("button");
            b.type = "button";
            b.className = "pgb-seed";
            b.textContent = "→ " + l.label;
            b.addEventListener("click", () => ask(l.seed));
            stack.appendChild(b);
            return;
          }
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
      return div;
    }

    function showTyping() {
      const el = document.createElement("div");
      el.className = "pgb-bubble bot pgb-typing";
      el.innerHTML = `<span></span><span></span><span></span>`;
      el.dataset.typing = "1";
      msgs.appendChild(el);
      msgs.scrollTop = msgs.scrollHeight;
      return el;
    }

    function ask(text) {
      const q = String(text || "").trim();
      if (!q) return;
      addBubble(q, "user");
      setStatus("Pucky is thinking…");
      const typing = showTyping();
      const delay = 380 + Math.min(900, q.length * 12);

      setTimeout(() => {
        typing.remove();
        const { msg, links, intent, navigate } = replyFor(q);
        if (intent) lastIntent = intent;
        addBubble(msg, "bot", links);
        setStatus(speakOn ? "Speaking…" : "Online · talks & listens");
        const clipKey = intent ? PUCKY_INTENT_CLIP[intent.id] : null;
        if (!clipKey || !speakPuckyClip(clipKey)) speakText(msg);
        if (speakOn) {
          const done = () => setStatus("Online · talks & listens");
          setTimeout(done, Math.min(12000, msg.length * 55));
        }
        try {
          const key = "pgb-support-chat";
          const prev = JSON.parse(localStorage.getItem(key) || "[]");
          prev.push({ q, intent: intent?.id || null, at: new Date().toISOString() });
          localStorage.setItem(key, JSON.stringify(prev.slice(-40)));
        } catch (_) {}
        if (navigate && /^(yes|yeah|yep|ok|open|do it)/i.test(q)) {
          setTimeout(() => {
            location.href = navigate;
          }, 1200);
        }
      }, delay);
    }

    function openChat(seed) {
      home.style.display = "none";
      chat.classList.add("is-on");
      panel.classList.add("is-chat");
      nudge?.classList.remove("is-on");
      if (!msgs.childElementCount) {
        const intro =
          "Hey — I’m Pucky. I talk out loud and I listen on the mic. Ask about League Pass, gems, gift cards, LockerVision, franchise, affiliates, or developers.";
        addBubble(intro, "bot", [
          { href: "join.html", label: "League Pass" },
          { href: "gems.html", label: "Gems" },
          { href: "lockervision.html", label: "LockerVision" },
          { href: "apply.html", label: "Franchise" },
        ]);
        if (!speakPuckyClip("greet")) speakText(intro);
      }
      if (seed) setTimeout(() => ask(seed), 280);
      input?.focus();
    }

    function showHome() {
      stopSpeak();
      chat.classList.remove("is-on");
      panel.classList.remove("is-chat");
      home.style.display = "";
      setStatus("Online · talks & listens");
    }

    function openPanel(seed) {
      panel.classList.add("is-open");
      fab.setAttribute("aria-expanded", "true");
      nudge?.classList.remove("is-on");
      if (seed) openChat(seed);
      else showHome();
    }

    function toggleListen() {
      const rec = getRecognition();
      if (!rec) {
        addBubble("Voice input isn’t available in this browser. Type your question instead.", "bot");
        return;
      }
      if (listening) {
        try {
          rec.stop();
        } catch (_) {}
        listening = false;
        micBtn.classList.remove("is-hot");
        setStatus("Online · talks & listens");
        return;
      }
      stopSpeak();
      listening = true;
      micBtn.classList.add("is-hot");
      setStatus("Listening… speak now");
      rec.onresult = (ev) => {
        const said = ev.results?.[0]?.[0]?.transcript || "";
        listening = false;
        micBtn.classList.remove("is-hot");
        if (said) {
          input.value = said;
          ask(said);
          input.value = "";
        } else {
          setStatus("Didn’t catch that — try again");
        }
      };
      rec.onerror = () => {
        listening = false;
        micBtn.classList.remove("is-hot");
        setStatus("Mic error — type instead");
        addBubble("I couldn’t hear that. Check mic permissions, or type your question.", "bot");
      };
      rec.onend = () => {
        listening = false;
        micBtn.classList.remove("is-hot");
      };
      try {
        rec.start();
      } catch (_) {
        listening = false;
        micBtn.classList.remove("is-hot");
        setStatus("Mic busy — try again");
      }
    }

    speakBtn?.addEventListener("click", () => {
      speakOn = !speakOn;
      localStorage.setItem("pgb-pucky-speak", speakOn ? "1" : "0");
      speakBtn.setAttribute("aria-pressed", speakOn ? "true" : "false");
      speakBtn.textContent = speakOn ? "🔊" : "🔇";
      if (!speakOn) stopSpeak();
      else if (!speakPuckyClip("greet")) speakText("Voice on. I’m Pucky.");
      setStatus(speakOn ? "Voice on" : "Voice muted");
    });

    micBtn?.addEventListener("click", toggleListen);

    fab?.addEventListener("click", () => {
      const open = panel.classList.toggle("is-open");
      fab.setAttribute("aria-expanded", open ? "true" : "false");
      if (open) {
        showHome();
        nudge?.classList.remove("is-on");
        if (speakOn && !speakPuckyClip("greet")) {
          speakText("Hey, I’m Pucky. Tap chat and ask me anything.");
        }
      } else {
        stopSpeak();
      }
    });
    document.getElementById("pgbSupportClose")?.addEventListener("click", () => {
      panel.classList.remove("is-open");
      fab.setAttribute("aria-expanded", "false");
      stopSpeak();
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
      const text = (input?.value || "").trim();
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
        lockervision: "lockervision outfits",
      };
      openPanel(map[prompt] || prompt || "");
    });

    // Public API for pages
    window.Pucky = {
      open: openPanel,
      ask: (q) => {
        openPanel();
        openChat(q);
      },
      speak: speakText,
      setSpeak(on) {
        speakOn = !!on;
        localStorage.setItem("pgb-pucky-speak", speakOn ? "1" : "0");
      },
    };

    refreshLangLabel();
    window.PGB_I18N?.apply(document);

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
