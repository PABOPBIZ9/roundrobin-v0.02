(function () {
  const EVENTS = [
    {
      id: "expansion-weekend",
      city: "Expand",
      short: "Founding Expansion Weekend",
      badge: "16",
      badgeClass: "b-finals",
      dates: "THIS WEEKEND",
      year: "2026",
      venue: "Neon Reef · Multi-rink broadcast",
      href: "expansion.html",
      format: "Founding 4 + 12 invite · 4 pools · Sunday knockout",
      prize: "Founding Pass + gold puck sales clock · 24h countdown",
    },
    {
      id: "miami-opening",
      city: "Miami",
      short: "Opening Faceoff",
      badge: "M",
      badgeClass: "b-miami",
      dates: "AUG 15–17",
      year: "2026",
      venue: "Neon Reef Arena — Miami, USA",
      href: "media-event-miami.html",
      format: "Founding Four · Round Robin opener",
      prize: "Fan Zone XP boost + shop credit raffle",
    },
    {
      id: "mclean-clash",
      city: "McLean",
      short: "Cardinal Clash",
      badge: "C",
      badgeClass: "b-mclean",
      dates: "AUG 29–31",
      year: "2026",
      venue: "Cardinal Perch — McLean, USA",
      href: "media-event-mclean.html",
      format: "Semifinal heat · Team + fantasy dual track",
      prize: "$50 gift cards + jersey giveaway",
    },
    {
      id: "wash-showdown",
      city: "Wash.",
      short: "District Showdown",
      badge: "W",
      badgeClass: "b-wash",
      dates: "SEP 12–14",
      year: "2026",
      venue: "District Dome — Washington, USA",
      href: "media-event-wash.html",
      format: "Prime-time weekend · Media night Friday",
      prize: "Digital suite passes + sticker packs",
    },
    {
      id: "chatt-terminal",
      city: "Chatt.",
      short: "Terminal Cup",
      badge: "T",
      badgeClass: "b-chatt",
      dates: "SEP 26–28",
      year: "2026",
      venue: "Terminal Arena — Chattanooga, USA",
      href: "media-event-chatt.html",
      format: "Sportsmanship spotlight + local partner night",
      prize: "Local partner prizes + merch kit",
    },
    {
      id: "founding-finals",
      city: "Finals",
      short: "Founding Four Finals",
      badge: "PGB",
      badgeClass: "b-finals",
      dates: "OCT 10–12",
      year: "2026",
      venue: "TBD · Championship weekend",
      href: "media-event-finals.html",
      format: "Championship · Best-of energy",
      prize: "OG Gold Puck entries + championship kit",
    },
  ];

  function mountSubnav(active) {
    const el = document.getElementById("mhSubnav");
    if (!el) return;
    const links = [
      { href: "media-schedule.html", label: "Schedule", key: "schedule" },
      { href: "media-resources.html", label: "Resources", key: "resources" },
      { href: "media-videos.html", label: "Video Content", key: "videos" },
      { href: "listen.html", label: "Listen", key: "listen" },
      { href: "podcasts.html", label: "Podcasts", key: "podcasts" },
      { href: "transcripts.html", label: "Transcripts", key: "transcripts" },
      { href: "media-guide.html", label: "Media Guide", key: "guide" },
      { href: "news.html", label: "Newsroom", key: "news" },
      { href: "expansion.html", label: "Expansion", key: "expansion" },
      { href: "media-guidelines.html", label: "Guidelines", key: "guidelines" },
    ];
    el.innerHTML = `
      <div class="mh-subnav-inner">
        <a class="mh-brand" href="media.html">
          <img src="assets/brand/favicon/favicon-32.png?v=3" alt="">
          PUCKGOLD <span>| Media Hub</span>
        </a>
        <nav class="mh-links" aria-label="Media Hub">
          ${links
            .map(
              (l) =>
                `<a href="${l.href}" class="${active === l.key ? "active" : ""}">${l.label}</a>`
            )
            .join("")}
        </nav>
        <a class="mh-acred" href="media-accreditation.html">Apply for Accreditation</a>
      </div>`;
  }

  function eventCards(limit) {
    const list = typeof limit === "number" ? EVENTS.slice(0, limit) : EVENTS;
    return list
      .map(
        (e) => `
      <article class="mh-event">
        <div class="mh-event-cover" data-event-cover="${e.id}">
          <img alt="" class="mh-event-img" hidden data-event-img>
          <div class="mh-badge ${e.badgeClass}" aria-hidden="true">${e.badge}<small>${e.short}</small></div>
        </div>
        <hr>
        <div class="meta">
          <b>${e.dates}</b>
          ${e.venue}
        </div>
        <a class="btn-details" href="${e.href}">Event Details</a>
      </article>`
      )
      .join("");
  }

  function scheduleRows() {
    return EVENTS.map(
      (e) => `
      <article class="mh-sched-row">
        <div class="dates">${e.dates}<small>${e.year}</small></div>
        <div>
          <h3>${e.short} · ${e.city}</h3>
          <p>${e.venue}<br>${e.format} · ${e.prize}</p>
        </div>
        <a class="btn-details" href="${e.href}" style="justify-self:start">Event Details</a>
      </article>`
    ).join("");
  }

  document.addEventListener("DOMContentLoaded", () => {
    const active = document.body.getAttribute("data-mh") || "home";
    mountSubnav(active);

    const upcoming = document.getElementById("mhUpcoming");
    if (upcoming) upcoming.innerHTML = eventCards(3);

    const allEvents = document.getElementById("mhAllEvents");
    if (allEvents) allEvents.innerHTML = eventCards();

    const sched = document.getElementById("mhSchedule");
    if (sched) sched.innerHTML = scheduleRows();

    document.getElementById("mhSubscribe")?.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = new FormData(e.target).get("email");
      try {
        localStorage.setItem("pgb-media-alerts", String(email || ""));
      } catch (_) {}
      e.target.reset();
      const note = document.getElementById("mhSubNote");
      if (note) {
        note.hidden = false;
        note.textContent = "You're on the list — media alerts locked in.";
      }
    });

    window.PGBMediaCatalog?.hydrate(document);
  });

  window.PGBMediaHub = { EVENTS, eventCards, scheduleRows };
})();
