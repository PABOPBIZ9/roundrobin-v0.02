/**
 * Founding Four brand kit paths — real logos + key art from vault drops.
 */
(function () {
  const BRAND = {
    "miami-mighty-geckz": {
      logo: "assets/teams/miami-mighty-geckz/01-Logos-Marks/primary.png",
      appIcon: "assets/teams/miami-mighty-geckz/01-Logos-Marks/app-icon.png",
      keyart: "assets/teams/miami-mighty-geckz/02-Brand-Kit/keyart.jpeg",
    },
    "mclean-cardinals": {
      logo: "assets/teams/mclean-cardinals/01-Logos-Marks/primary.png",
      appIcon: "assets/teams/mclean-cardinals/01-Logos-Marks/app-icon.png",
      keyart: "assets/teams/mclean-cardinals/02-Brand-Kit/keyart.jpg",
      poster: "assets/teams/mclean-cardinals/03-Stadiums/stadium-01/poster.jpg",
    },
    "washington-whoomp": {
      logo: "assets/teams/washington-whoomp/01-Logos-Marks/primary.png",
      appIcon: "assets/teams/washington-whoomp/01-Logos-Marks/app-icon.png",
      keyart: "assets/teams/washington-whoomp/02-Brand-Kit/keyart.png",
      poster: "assets/teams/washington-whoomp/03-Stadiums/stadium-01/poster.jpg",
    },
    "chattanooga-choo-choo": {
      logo: "assets/teams/chattanooga-choo-choo/01-Logos-Marks/primary.png",
      appIcon: "assets/teams/chattanooga-choo-choo/01-Logos-Marks/app-icon.png",
      keyart: "assets/teams/chattanooga-choo-choo/02-Brand-Kit/keyart.jpg",
    },
    "la-hibibi-jinni": {
      logo: "assets/teams/la-hibibi-jinni/01-Logos-Marks/primary.svg",
      appIcon: "assets/teams/la-hibibi-jinni/01-Logos-Marks/primary.svg",
    },
  };

  function logoUrl(slug) {
    return BRAND[slug]?.logo || `assets/teams/${slug}/01-Logos-Marks/primary.png`;
  }

  function posterUrl(slug) {
    return BRAND[slug]?.poster || `assets/teams/${slug}/03-Stadiums/stadium-01/poster.jpg`;
  }

  function logoSources(slug) {
    const b = BRAND[slug];
    const base = `assets/teams/${slug}/01-Logos-Marks`;
    const chain = [];
    if (b?.logo) chain.push(b.logo);
    chain.push(
      `${base}/primary.png`,
      `${base}/primary.svg`,
      `${base}/app-icon.png`,
      `${base}/secondary.png`
    );
    return [...new Set(chain)];
  }

  window.PGBTeamBrand = { BRAND, logoUrl, posterUrl, logoSources };
})();
