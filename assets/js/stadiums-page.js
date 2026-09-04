/**
 * Stadiums page — HQ tour player + brand logos
 */
(function () {
  const META = {
    "miami-mighty-geckz": {
      tags: ["Oceanfront ice", "Neon boards", "Night games"],
      color: "#2dd4bf",
      tourLabel: "PUCKGOLD · Neon Reef flythrough",
    },
    "mclean-cardinals": {
      tags: ["Garden glass", "Ruby boards", "Championship plaza"],
      color: "#ef4444",
      tourLabel: "PUCKGOLD · Climate Cardinal Gardens",
    },
    "washington-whoomp": {
      tags: ["Domed roof", "360° ring", "Capital ice"],
      color: "#3f6db8",
      tourLabel: "PUCKGOLD · District Dome tour",
    },
    "chattanooga-choo-choo": {
      tags: ["Terminal hall", "Steam horn", "Riverfront sheet"],
      color: "#c07a3e",
      tourLabel: "PUCKGOLD · Terminal Arena",
    },
  };

  function logoUrl(slug, team) {
    if (window.PGBTeamBrand?.logoUrl) return window.PGBTeamBrand.logoUrl(slug);
    return `${team.folder}01-Logos-Marks/primary.png`;
  }

  function posterUrl(slug, team) {
    if (window.PGBTeamBrand?.posterUrl) return window.PGBTeamBrand.posterUrl(slug);
    const p = `${team.folder}03-Stadiums/stadium-01/poster.jpg`;
    return p;
  }

  function tourList(slug, catalog, team) {
    const entry = catalog[slug] || {};
    const main = entry.stadiums?.["stadium-01"] || `${team.folder}03-Stadiums/stadium-01/film.mp4`;
    const tours = entry.tours?.length ? entry.tours : [main];
    const gallery = entry.gallery || [];
    const merged = [main];
    tours.forEach((t) => {
      if (t && !merged.includes(t)) merged.push(t);
    });
    gallery.forEach((g) => {
      if (g && !merged.includes(g)) merged.push(g);
    });
    return merged;
  }

  function bindPlayer(card, tours) {
    const video = card.querySelector("video");
    const poster = card.querySelector(".st-poster");
    const btns = card.querySelectorAll(".st-play-btn");
    if (!video || !btns.length) return;

    const playClip = (src, btn) => {
      btns.forEach((b) => b.classList.toggle("is-active", b === btn));
      if (video.getAttribute("src") !== src) video.setAttribute("src", src);
      video.play().catch(() => {});
      card.querySelector(".st-card-player")?.classList.add("is-playing");
    };

    btns.forEach((btn, i) => {
      btn.addEventListener("click", () => playClip(tours[i] || tours[0], btn));
    });

    video.addEventListener("play", () => card.querySelector(".st-card-player")?.classList.add("is-playing"));
    video.addEventListener("pause", () => {
      if (video.currentTime < 0.05) card.querySelector(".st-card-player")?.classList.remove("is-playing");
    });
    if (poster) {
      video.addEventListener("loadeddata", () => {
        if (video.paused) card.querySelector(".st-card-player")?.classList.remove("is-playing");
      });
    }
  }

  async function init() {
    const root = document.getElementById("stadiumList");
    if (!root || !window.PGBTeams) return;

    let catalog = {};
    try {
      const res = await fetch("assets/js/stadium-videos.json?v=3");
      if (res.ok) catalog = await res.json();
    } catch (_) {}

    const founding = window.PGBTeams.all().filter((t) => META[t.slug]);

    root.innerHTML = founding
      .map((team) => {
        const m = META[team.slug];
        const tours = tourList(team.slug, catalog, team);
        const logo = logoUrl(team.slug, team);
        const poster = posterUrl(team.slug, team);
        const main = tours[0];
        const playlist = tours
          .map(
            (src, i) =>
              `<button type="button" class="st-play-btn${i === 0 ? " is-active" : ""}" data-src="${src}">Tour ${i + 1}</button>`
          )
          .join("");

        return `
        <article class="st-card" data-team="${team.slug}">
          <div class="st-card-head">
            <img class="st-card-logo" src="${logo}" alt="${team.name} logo" width="52" height="52" loading="lazy">
            <div class="st-card-brand">
              <h2>${team.arena}</h2>
              <div class="team-line">Home of <em style="color:${m.color}">${team.name}</em></div>
            </div>
          </div>
          <div class="st-card-player">
            <img class="st-poster" src="${poster}" alt="" loading="lazy" onerror="this.hidden=true">
            <video controls playsinline preload="metadata" poster="${poster}" src="${main}"></video>
            <div class="st-tour-meta">
              <span class="st-tour-badge">${tours.length} clips</span>
              <span>${m.tourLabel}</span>
            </div>
          </div>
          <div class="st-card-body">
            <p>${team.blurb}</p>
            <div class="st-tags">${m.tags.map((x) => `<span>${x}</span>`).join("")}<span>Full broadcast tour</span></div>
            <div class="st-playlist" role="tablist" aria-label="Stadium tour playlist">${playlist}</div>
            <div class="st-card-actions">
              <a class="btn btn-og btn-sm" href="team.html?team=${encodeURIComponent(team.slug)}#stadiums">Team vault</a>
              <a class="btn btn-ghost btn-sm" href="team-vault.html?team=${encodeURIComponent(team.slug)}">Brand kit</a>
            </div>
          </div>
        </article>`;
      })
      .join("");

    root.querySelectorAll(".st-card").forEach((card) => {
      const slug = card.dataset.team;
      const team = window.PGBTeams.bySlug(slug);
      bindPlayer(card, tourList(slug, catalog, team));
    });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
