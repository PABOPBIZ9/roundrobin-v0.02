/**
 * Rotate demo "LIVE" markers across game-day cards (Scores / Bracket).
 */
(function () {
  function setLive(card, on) {
    card.classList.toggle("is-live", on);
    const seed = card.querySelector(".seed, .sc-card-top");
    if (!seed) return;
    const tip = seed.querySelector(".sc-tip");
    if (tip) tip.hidden = !!on;
    let badge = seed.querySelector(".live, [data-live-badge]");
    if (on) {
      if (!badge) {
        badge = document.createElement("span");
        badge.className = "live";
        badge.setAttribute("data-live-badge", "1");
        badge.textContent = seed.classList.contains("seed") ? "· LIVE" : "Live";
        seed.appendChild(badge);
      }
      badge.hidden = false;
    } else if (badge && badge.hasAttribute("data-live-badge")) {
      badge.remove();
    } else if (badge) {
      badge.remove();
    }
  }

  window.PGBLiveDemo = {
    rotate(selector, intervalMs) {
      const cards = Array.from(document.querySelectorAll(selector));
      if (cards.length < 2) return null;
      let i = cards.findIndex((c) => c.classList.contains("is-live"));
      if (i < 0) i = 0;
      cards.forEach((c, idx) => setLive(c, idx === i));
      return setInterval(() => {
        setLive(cards[i], false);
        i = (i + 1) % cards.length;
        setLive(cards[i], true);
      }, intervalMs || 9000);
    },
  };
})();
