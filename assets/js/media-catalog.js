/**
 * Media Hub art — vault posters, keyart, logos, and press drops.
 */
(function () {
  const T = (slug) => `assets/teams/${slug}`;
  const MH = "assets/media-hub";
  const BR = "assets/brand";
  const VAULT = "assets/vault";

  const FOUNDING = {
    geckz: {
      keyart: `${T("miami-mighty-geckz")}/02-Brand-Kit/keyart.png`,
      poster: `${T("miami-mighty-geckz")}/03-Stadiums/stadium-01/poster.jpg`,
      swag: `${T("miami-mighty-geckz")}/07-Swag-Kits/swag-kit/hero.png`,
      logo: `${T("miami-mighty-geckz")}/01-Logos-Marks/primary.png`,
      banner: `${T("miami-mighty-geckz")}/02-Brand-Kit/brand-banner.png`,
    },
    cards: {
      keyart: `${T("mclean-cardinals")}/02-Brand-Kit/keyart.png`,
      poster: `${T("mclean-cardinals")}/03-Stadiums/stadium-01/poster.jpg`,
      swag: `${T("mclean-cardinals")}/07-Swag-Kits/swag-kit/hero.png`,
      logo: `${T("mclean-cardinals")}/01-Logos-Marks/primary.png`,
      banner: `${T("mclean-cardinals")}/02-Brand-Kit/brand-banner.jpg`,
      clash: `${MH}/mclean-cardinals/cardinal-clash-poster.jpg`,
    },
    whoomp: {
      keyart: `${T("washington-whoomp")}/02-Brand-Kit/keyart.png`,
      poster: `${T("washington-whoomp")}/03-Stadiums/stadium-01/poster.jpg`,
      swag: `${T("washington-whoomp")}/07-Swag-Kits/swag-kit/hero.png`,
      logo: `${T("washington-whoomp")}/01-Logos-Marks/primary.png`,
    },
    choo: {
      keyart: `${T("chattanooga-choo-choo")}/02-Brand-Kit/keyart.png`,
      swag: `${T("chattanooga-choo-choo")}/07-Swag-Kits/swag-kit/hero.png`,
      logo: `${T("chattanooga-choo-choo")}/01-Logos-Marks/primary.png`,
    },
  };

  const EVENT_COVERS = {
    "expansion-weekend": [
      `${MH}/mclean-cardinals/founding-four-recap.jpg`,
      FOUNDING.geckz.keyart,
      `${MH}/event-logos/expansion.svg`,
    ],
    "miami-opening": [FOUNDING.geckz.poster, FOUNDING.geckz.keyart, `${MH}/event-logos/opening-faceoff.svg`],
    "mclean-clash": [FOUNDING.cards.clash, FOUNDING.cards.poster, FOUNDING.cards.keyart],
    "wash-showdown": [FOUNDING.whoomp.poster, FOUNDING.whoomp.keyart, FOUNDING.whoomp.logo],
    "chatt-terminal": [FOUNDING.choo.keyart, FOUNDING.choo.swag, FOUNDING.choo.logo],
    "founding-finals": [
      `${VAULT}/logos/retro/pgb-championship-league.png`,
      `${MH}/event-logos/golden-final.svg`,
      FOUNDING.cards.keyart,
    ],
  };

  const THUMBS = {
    "audio-founder-vibe": [FOUNDING.geckz.swag, FOUNDING.geckz.banner, FOUNDING.geckz.keyart],
    "audio-maxxer": [`${MH}/mclean-cardinals/founding-four-recap.jpg`, FOUNDING.geckz.keyart],
    "audio-arena-pack": [FOUNDING.geckz.poster, FOUNDING.cards.poster, FOUNDING.whoomp.poster],
    "audio-player-bites": [`${MH}/mclean-cardinals/cardinals-laughing.jpg`, FOUNDING.cards.keyart],
    "audio-voice-roster": [FOUNDING.geckz.logo, FOUNDING.cards.logo, FOUNDING.whoomp.logo],
    "audio-booth-miracle": [FOUNDING.cards.clash, `${MH}/mclean-cardinals/cardinals-laughing.png`],
    "audio-backstory": [`${MH}/event-logos/expansion.svg`, `${MH}/mclean-cardinals/founding-four-recap.jpg`],
    "audio-post-cup": [`${VAULT}/logos/retro/pgb-league-shimmer-still.png`, FOUNDING.cards.swag],
    "video-stadiums": [FOUNDING.geckz.poster, FOUNDING.cards.poster, FOUNDING.whoomp.poster],
    "video-golden-age": [FOUNDING.geckz.keyart, FOUNDING.geckz.poster],
    "video-opening-faceoff": [FOUNDING.geckz.poster, FOUNDING.geckz.keyart],
    "video-gold-puck": [`${VAULT}/logos/retro/pgb-retro-league.png`, FOUNDING.geckz.swag],
  };

  const RES_ICONS = {
    listen: [FOUNDING.geckz.swag, `${BR}/app/apple-touch-icon.png?v=3`],
    resources: [`${MH}/DROP-DOCS-HERE/REFERENCE-fact-sheet-preview.png`, FOUNDING.geckz.keyart],
    guidelines: [`${MH}/DROP-DOCS-HERE/REFERENCE-rosters-preview.png`, `${BR}/lockup/primary-master.png?v=3`],
    accreditation: [`${MH}/event-logos/opening-faceoff.svg`, FOUNDING.geckz.logo],
  };

  const HERO = [
    `${MH}/mclean-cardinals/founding-four-recap.jpg`,
    FOUNDING.geckz.poster,
    FOUNDING.geckz.keyart,
  ];

  const SUBSCRIBE_BG = [
    `${MH}/mclean-cardinals/founding-four-recap.jpg`,
    FOUNDING.cards.clash,
    FOUNDING.geckz.keyart,
  ];

  const ALERT_ART = [
    `${MH}/DROP-DOCS-HERE/REFERENCE-fact-sheet-preview.png`,
    `${MH}/mclean-cardinals/cardinal-clash-poster.jpg`,
  ];

  function tryImages(srcs, onHit) {
    let i = 0;
    const next = () => {
      if (i >= srcs.length) return;
      const src = srcs[i++];
      if (!src) return next();
      const img = new Image();
      img.onload = () => onHit(src);
      img.onerror = next;
      img.src = src;
    };
    next();
  }

  function setImg(el, src) {
    if (!el || !src) return;
    el.src = src;
    el.hidden = false;
    el.removeAttribute("hidden");
    el.closest(".mh-thumb, .mh-event-cover, .mh-subscribe, .mh-alert-card, .mh-hero-bg, .mh-res")?.classList.add("has-photo");
  }

  function hydrateThumb(wrap) {
    const key = wrap.dataset.mhThumb;
    const img = wrap.querySelector("[data-thumb-img], .mh-thumb-img");
    if (!key || !img || !THUMBS[key]) return;
    tryImages(THUMBS[key], (src) => setImg(img, src));
  }

  function hydrateRes(wrap) {
    const key = wrap.dataset.mhRes;
    const img = wrap.querySelector("img");
    if (!key || !img || !RES_ICONS[key]) return;
    tryImages(RES_ICONS[key], (src) => {
      setImg(img, src);
      wrap.classList.add("has-photo");
      const fb = wrap.querySelector(".ico-fb");
      if (fb) fb.hidden = true;
    });
  }

  function hydrate(root) {
    const scope = root || document;

    const heroBg = scope.querySelector("[data-mh-hero]");
    const heroImg = heroBg?.querySelector("[data-hero-img]");
    if (heroImg) tryImages(HERO, (src) => setImg(heroImg, src));

    scope.querySelectorAll("[data-mh-subscribe-bg]").forEach((box) => {
      const img = box.querySelector("[data-subscribe-img]");
      if (img) tryImages(SUBSCRIBE_BG, (src) => setImg(img, src));
    });

    scope.querySelectorAll("[data-mh-alert-art]").forEach((img) => {
      tryImages(ALERT_ART, (src) => setImg(img, src));
    });

    scope.querySelectorAll("[data-mh-thumb]").forEach(hydrateThumb);
    scope.querySelectorAll("[data-mh-res]").forEach(hydrateRes);

    scope.querySelectorAll("[data-event-cover]").forEach((wrap) => {
      const id = wrap.dataset.eventCover;
      const img = wrap.querySelector("[data-event-img]");
      if (!id || !img || !EVENT_COVERS[id]) return;
      tryImages(EVENT_COVERS[id], (src) => setImg(img, src));
    });
  }

  window.PGBMediaCatalog = {
    FOUNDING,
    EVENT_COVERS,
    THUMBS,
    RES_ICONS,
    coverFor: (id) => EVENT_COVERS[id]?.[0] || null,
    thumbFor: (key) => THUMBS[key]?.[0] || null,
    hydrate,
  };
})();
