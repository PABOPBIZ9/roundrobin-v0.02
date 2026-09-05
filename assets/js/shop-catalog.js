/**
 * Shop product art — vault jerseys, logos, keyart, swag.
 */
(function () {
  const T = (slug) => `assets/teams/${slug}`;
  const B = "assets/brand";

  const TEAM = {
    geckz: {
      slug: "miami-mighty-geckz",
      jersey: `${T("miami-mighty-geckz")}/05-Jerseys-Uniforms/home/jersey.png`,
      away: `${T("miami-mighty-geckz")}/05-Jerseys-Uniforms/away/jersey.png`,
      logo: `${T("miami-mighty-geckz")}/01-Logos-Marks/primary.png`,
      keyart: `${T("miami-mighty-geckz")}/02-Brand-Kit/keyart.png`,
      swag: `${T("miami-mighty-geckz")}/07-Swag-Kits/swag-kit/hero.png`,
      grad: "linear-gradient(160deg,#0e463f,#234020)",
    },
    cards: {
      slug: "mclean-cardinals",
      jersey: `${T("mclean-cardinals")}/05-Jerseys-Uniforms/home/jersey.png`,
      classic: `${T("mclean-cardinals")}/05-Jerseys-Uniforms/classic/jersey.png`,
      logo: `${T("mclean-cardinals")}/01-Logos-Marks/primary.png`,
      keyart: `${T("mclean-cardinals")}/02-Brand-Kit/keyart.png`,
      swag: `${T("mclean-cardinals")}/07-Swag-Kits/swag-kit/hero.png`,
      grad: "linear-gradient(160deg,#451212,#33260a)",
    },
    whoomp: {
      slug: "washington-whoomp",
      jersey: `${T("washington-whoomp")}/05-Jerseys-Uniforms/home/jersey.png`,
      away: `${T("washington-whoomp")}/05-Jerseys-Uniforms/away/jersey.png`,
      logo: `${T("washington-whoomp")}/01-Logos-Marks/primary.png`,
      keyart: `${T("washington-whoomp")}/02-Brand-Kit/keyart.png`,
      swag: `${T("washington-whoomp")}/07-Swag-Kits/swag-kit/hero.png`,
      grad: "linear-gradient(160deg,#12233d,#202c3d)",
    },
    choo: {
      slug: "chattanooga-choo-choo",
      jersey: `${T("chattanooga-choo-choo")}/05-Jerseys-Uniforms/home/jersey.png`,
      logo: `${T("chattanooga-choo-choo")}/01-Logos-Marks/primary.png`,
      keyart: `${T("chattanooga-choo-choo")}/02-Brand-Kit/keyart.png`,
      swag: `${T("chattanooga-choo-choo")}/07-Swag-Kits/swag-kit/hero.png`,
      grad: "linear-gradient(160deg,#2f2f31,#43301a)",
    },
    league: {
      logo: `${B}/lockup/primary-master.png?v=3`,
      icon: `${B}/app/apple-touch-icon.png?v=3`,
      emblem: `${B}/icon/emblem-circle-gold.png?v=3`,
      grad: "linear-gradient(160deg,#10203a,#163a74)",
    },
  };

  /** Product id → viz + cart thumbnail */
  const PRODUCTS = {
    "mighty-geckz-champions-home-jersey": { team: "geckz", img: "jersey", viz: "jersey" },
    "cardinals-9seventy-pro-hat": { team: "cards", img: "logo", viz: "logo" },
    "whoomp-district-dome-hoodie": { team: "whoomp", img: "keyart", viz: "keyart" },
    "choo-choo-terminal-arena-tee": { team: "choo", img: "jersey", viz: "jersey" },
    "pgb-crest-snapback": { team: "league", img: "icon", viz: "icon" },
    "mighty-geckz-neon-reef-polo": { team: "geckz", img: "away", viz: "away" },
    "pgb-circle-emblem-hat": { team: "league", img: "emblem", viz: "emblem" },
    "mighty-geckz-9forty-legacy-hat": { team: "geckz", img: "logo", viz: "logo" },
    "cardinals-classic-logo-hat": { team: "cards", img: "logo", viz: "logo" },
    "whoomp-low-profile-team-hat": { team: "whoomp", img: "logo", viz: "logo" },
    "cardinals-perch-performance-hat": { team: "cards", img: "logo", viz: "logo" },
  };

  function asset(teamKey, field) {
    return TEAM[teamKey]?.[field] || TEAM.league.logo;
  }

  function productImg(id) {
    const p = PRODUCTS[id];
    if (!p) return null;
    return asset(p.team, p.img);
  }

  function productViz(id) {
    const p = PRODUCTS[id];
    if (!p) return null;
    const t = TEAM[p.team];
    return { src: asset(p.team, p.viz), grad: t?.grad || TEAM.league.grad };
  }

  function hydrateShop() {
    document.querySelectorAll("[data-add-cart]").forEach((a) => {
      const id = a.dataset.id;
      const src = productImg(id);
      if (src) a.dataset.img = src;
    });

    document.querySelectorAll(".shop-product").forEach((card) => {
      const cart = card.querySelector("[data-add-cart]");
      const id = cart?.dataset.id || card.dataset.productId;
      const viz = id ? productViz(id) : null;
      const vizEl = card.querySelector(".viz");
      if (!vizEl || !viz) return;
      if (viz.grad) vizEl.style.background = viz.grad;
      const mono = vizEl.querySelector(".mono-mark");
      if (mono) mono.remove();
      let img = vizEl.querySelector("img.product-shot");
      if (!img) {
        img = document.createElement("img");
        img.className = "product-shot";
        img.alt = "";
        vizEl.appendChild(img);
      }
      img.src = viz.src;
      img.classList.toggle("product-shot--logo", p.viz === "logo" || p.viz === "icon" || p.viz === "emblem");
    });

    const promo = document.querySelector(".shop-promo-visual img");
    if (promo && TEAM.cards.keyart) promo.src = TEAM.cards.keyart;

    const banner = document.querySelector(".shop-banner");
    if (banner && TEAM.geckz.keyart) {
      banner.style.setProperty("--shop-banner-img", `url(${TEAM.geckz.keyart})`);
    }
  }

  window.PGBShopCatalog = { TEAM, PRODUCTS, hydrateShop, productImg, productViz };
})();
