/**
 * PuckGold Game Zone — quizzes, quests, farming points → fan leaderboard
 * Points persist in localStorage (pgb-play).
 */
(function () {
  const KEY = "pgb-play";
  const DAY_MS = 86400000;

  const QUESTS = [
    {
      id: "daily-checkin",
      type: "daily",
      title: "Daily check-in",
      desc: "Tap once a day to farm +25 XP on the fan board.",
      pts: 25,
    },
    {
      id: "learn-format",
      type: "learn",
      title: "Learn the format",
      desc: "Read how round robin → knockout → Golden Final works.",
      pts: 40,
      href: "bracket.html",
    },
    {
      id: "learn-teams",
      type: "learn",
      title: "Scout the Founding Four",
      desc: "Open a team vault and study logos, stadiums, and roster.",
      pts: 40,
      href: "teams.html",
    },
    {
      id: "outfit-scout",
      type: "learn",
      title: "LockerVision scout",
      desc: "Preview a game outfit — jerseys for home & away.",
      pts: 35,
      href: "lockervision.html",
    },
    {
      id: "quiz-speed",
      type: "quiz",
      title: "Timed league quiz",
      desc: "60 seconds. 5 questions. Streaks pay extra gold.",
      pts: 100,
    },
    {
      id: "quiz-deep",
      type: "quiz",
      title: "Deep ice quiz",
      desc: "Harder set — stadiums, booths, and Golden Final lore.",
      pts: 150,
      hard: true,
    },
  ];

  const QUIZ_EASY = [
    {
      q: "Which team lifted the Season One Golden Final?",
      opts: ["McLean Cardinals", "Miami Mighty Geckz", "Washington Whoomp!", "Chattanooga Choo Choo"],
      a: 1,
    },
    {
      q: "How many players are in each Founding Four vault roster?",
      opts: ["6", "7", "9", "12"],
      a: 2,
    },
    {
      q: "What city do the Cardinals call home?",
      opts: ["Miami", "McLean", "Washington", "Chattanooga"],
      a: 1,
    },
    {
      q: "Season One Golden Final was decided by…",
      opts: ["One game", "Best-of-three", "Best-of-two aggregate", "Shootout only"],
      a: 2,
    },
    {
      q: "Whoomp! plays out of which arena vibe?",
      opts: ["Neon Reef", "Terminal Arena", "District Dome", "Cardinal Perch"],
      a: 2,
    },
  ];

  const QUIZ_HARD = [
    {
      q: "Miami’s booth energy is best described as…",
      opts: ["Chess-match clipped", "Latin-jazz late-night radio", "Train-whistle Southern", "Silent film"],
      a: 1,
    },
    {
      q: "How many stadium slots does each team vault hold?",
      opts: ["1", "2", "3", "5"],
      a: 2,
    },
    {
      q: "Game 2 of the Golden Final ended…",
      opts: ["In regulation for McLean", "5–4 OT for Miami", "Shootout for Whoomp!", "Forfeit"],
      a: 1,
    },
    {
      q: "Chattanooga’s Season One special award was…",
      opts: ["MVP", "Sportsmanship", "Top goalie", "Best logo"],
      a: 1,
    },
    {
      q: "Canonical vault slug for the Geckz is…",
      opts: ["mighty-geckz", "miami-mighty-geckz", "mmg-vault", "geckz-miami"],
      a: 1,
    },
  ];

  function load() {
    try {
      return JSON.parse(localStorage.getItem(KEY) || "{}");
    } catch (_) {
      return {};
    }
  }
  function save(state) {
    localStorage.setItem(KEY, JSON.stringify(state));
  }
  function todayKey() {
    return new Date().toISOString().slice(0, 10);
  }

  function ensure() {
    const s = load();
    if (typeof s.points !== "number") s.points = 0;
    if (typeof s.xp !== "number") s.xp = 0;
    // Migrate gift/gem xp side-ledger into board points once
    if (!s._migratedXp && (s.xp || 0) > (s.points || 0)) {
      s.points = (s.points || 0) + ((s.xp || 0) - (s.points || 0));
      s._migratedXp = true;
      save(s);
    }
    if (typeof s.quizzes !== "number") s.quizzes = 0;
    if (typeof s.streak !== "number") s.streak = 0;
    if (!s.done) s.done = {};
    if (!s.name) s.name = "You";
    return s;
  }

  function addPoints(n, questId) {
    const s = ensure();
    s.points += n;
    s.xp = (s.xp || 0) + n;
    if (questId) {
      s.done[questId] = { at: Date.now(), day: todayKey(), pts: n };
    }
    save(s);
    return s;
  }

  function canDaily(id) {
    const s = ensure();
    const d = s.done[id];
    if (!d) return true;
    return d.day !== todayKey();
  }

  function isComplete(id) {
    const s = ensure();
    const q = QUESTS.find((x) => x.id === id);
    if (!q) return false;
    if (q.type === "daily") return !canDaily(id);
    return !!s.done[id];
  }

  function fanBoard() {
    const s = ensure();
    const bots = [
      { name: "NeonFarmr", pts: 820 },
      { name: "PerchPulse", pts: 640 },
      { name: "DomeDash", pts: 510 },
      { name: "TerminalXP", pts: 390 },
      { name: "GoldHorn", pts: 275 },
      { name: "BoothBot", pts: 180 },
    ];
    const you = { name: s.name + " (you)", pts: s.points, you: true };
    return [...bots, you].sort((a, b) => b.pts - a.pts).map((r, i) => ({ ...r, rank: i + 1 }));
  }

  /* —— Quiz UI —— */
  let quizTimer = null;

  function openQuiz(hard) {
    const bank = (hard ? QUIZ_HARD : QUIZ_EASY).slice();
    const questId = hard ? "quiz-deep" : "quiz-speed";
    const modal = document.getElementById("pzModal");
    const title = document.getElementById("pzModalTitle");
    const timerEl = document.getElementById("pzTimer");
    const qEl = document.getElementById("pzQuestion");
    const optsEl = document.getElementById("pzOpts");
    const foot = document.getElementById("pzModalFoot");
    if (!modal) return;

    let i = 0;
    let score = 0;
    let left = 60;
    title.textContent = hard ? "Deep ice quiz" : "Timed league quiz";
    foot.innerHTML = `<span id="pzScore">0 / ${bank.length}</span><button type="button" class="pz-btn ghost" id="pzClose">Close</button>`;

    function tick() {
      left -= 1;
      timerEl.textContent = "0:" + String(Math.max(0, left)).padStart(2, "0");
      if (left <= 0) finish(true);
    }
    clearInterval(quizTimer);
    quizTimer = setInterval(tick, 1000);
    timerEl.textContent = "1:00";

    function finish(timeout) {
      clearInterval(quizTimer);
      const bonus = score === bank.length ? 50 : 0;
      const earned = score * (hard ? 30 : 20) + bonus;
      const s = addPoints(earned, questId);
      s.quizzes = (s.quizzes || 0) + 1;
      if (score >= 3) s.streak = (s.streak || 0) + 1;
      else s.streak = 0;
      save(s);
      qEl.textContent = timeout
        ? `Time's up — ${score}/${bank.length}. +${earned} XP`
        : `Done — ${score}/${bank.length}. +${earned} XP${bonus ? " (perfect bonus)" : ""}`;
      optsEl.innerHTML = "";
      foot.innerHTML = `<span>+${earned} XP · Total ${s.points}</span><button type="button" class="pz-btn gold" id="pzClose">Claim</button>`;
      bindClose();
      window.dispatchEvent(new CustomEvent("pgb-play-update"));
    }

    function show() {
      if (i >= bank.length) return finish(false);
      const item = bank[i];
      qEl.textContent = item.q;
      optsEl.innerHTML = item.opts
        .map((o, idx) => `<button type="button" data-i="${idx}">${o}</button>`)
        .join("");
      document.getElementById("pzScore").textContent = `${score} / ${bank.length}`;
      optsEl.querySelectorAll("button").forEach((btn) => {
        btn.addEventListener("click", () => {
          const pick = +btn.dataset.i;
          const ok = pick === item.a;
          btn.classList.add(ok ? "correct" : "wrong");
          if (ok) score += 1;
          optsEl.querySelectorAll("button").forEach((b) => (b.disabled = true));
          setTimeout(() => {
            i += 1;
            show();
          }, 450);
        });
      });
    }

    function bindClose() {
      document.getElementById("pzClose")?.addEventListener("click", () => {
        clearInterval(quizTimer);
        modal.hidden = true;
        window.dispatchEvent(new CustomEvent("pgb-play-update"));
      });
    }

    modal.hidden = false;
    bindClose();
    modal.onclick = (e) => {
      if (e.target === modal) {
        clearInterval(quizTimer);
        modal.hidden = true;
      }
    };
    show();
  }

  function claimQuest(id) {
    const q = QUESTS.find((x) => x.id === id);
    if (!q) return;
    if (q.type === "quiz") {
      openQuiz(!!q.hard);
      return;
    }
    if (q.type === "daily") {
      if (!canDaily(id)) return;
      addPoints(q.pts, id);
      window.dispatchEvent(new CustomEvent("pgb-play-update"));
      return;
    }
    if (q.type === "learn") {
      if (!isComplete(id)) addPoints(q.pts, id);
      if (q.href) location.href = q.href;
      window.dispatchEvent(new CustomEvent("pgb-play-update"));
    }
  }

  function renderHub() {
    const root = document.getElementById("pzQuests");
    const stats = document.getElementById("pzStats");
    const board = document.getElementById("pzBoard");
    if (!root) return;
    const s = ensure();

    if (stats) {
      stats.innerHTML = `
        <div class="pz-stat"><span>Your XP</span><strong>${s.points}</strong></div>
        <div class="pz-stat"><span>Quizzes cleared</span><strong>${s.quizzes || 0}</strong></div>
        <div class="pz-stat"><span>Win streak</span><strong>${s.streak || 0}</strong></div>
        <div class="pz-stat"><span>Board rank</span><strong>#${fanBoard().find((r) => r.you)?.rank || "—"}</strong></div>
      `;
    }

    root.innerHTML = QUESTS.map((q) => {
      const done = isComplete(q.id);
      const dailyReady = q.type === "daily" && canDaily(q.id);
      let label = "Start";
      if (q.type === "daily") label = dailyReady ? "Claim +25" : "Claimed today";
      if (q.type === "learn") label = done ? "Replay / open" : `Earn +${q.pts}`;
      if (q.type === "quiz") label = `Play · up to +${q.pts}`;
      return `
        <article class="pz-card">
          <div class="tag">${q.type}</div>
          <h3>${q.title}</h3>
          <p>${q.desc}</p>
          <div class="pts">+${q.pts} XP</div>
          <div class="actions">
            <button type="button" class="pz-btn ${q.type === "quiz" ? "gold" : ""}" data-quest="${q.id}" ${
              q.type === "daily" && !dailyReady ? "disabled" : ""
            }>${label}</button>
          </div>
        </article>`;
    }).join("");

    root.querySelectorAll("[data-quest]").forEach((btn) => {
      btn.addEventListener("click", () => claimQuest(btn.dataset.quest));
    });

    if (board) {
      board.innerHTML = fanBoard()
        .map(
          (r) => `
        <div class="lb-row ${r.you ? "you" : ""}">
          <div class="rank">${r.rank}</div>
          <div class="name">${r.name}</div>
          <div class="pts">${r.pts} XP</div>
        </div>`
        )
        .join("");
    }
  }

  window.PGBPlay = {
    QUESTS,
    ensure,
    claimQuest,
    openQuiz,
    fanBoard,
    renderHub,
  };

  document.addEventListener("DOMContentLoaded", () => {
    if (document.getElementById("pzQuests")) renderHub();
  });
  window.addEventListener("pgb-play-update", renderHub);
})();
