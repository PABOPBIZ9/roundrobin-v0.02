/**
 * Founding Four + LA brand kit — NHL-style logo paths.
 */
(function () {
  const base = (slug) => `assets/teams/${slug}/01-Logos-Marks`;

  const BRAND = {
    "miami-mighty-geckz": {
      logo: `${base("miami-mighty-geckz")}/primary.png`,
      secondary: `${base("miami-mighty-geckz")}/secondary.png`,
      mono: `${base("miami-mighty-geckz")}/mono.png`,
      crest: `${base("miami-mighty-geckz")}/crest.svg`,
      appIcon: `${base("miami-mighty-geckz")}/app-icon.png`,
      keyart: `${base("miami-mighty-geckz")}/02-Brand-Kit/keyart.png`,
      swag: `${base("miami-mighty-geckz")}/07-Swag-Kits/swag-kit/hero.png`,
      poster: `${base("miami-mighty-geckz")}/03-Stadiums/stadium-01/poster.jpg`,
    },
    "mclean-cardinals": {
      logo: `${base("mclean-cardinals")}/primary.png`,
      secondary: `${base("mclean-cardinals")}/secondary.png`,
      mono: `${base("mclean-cardinals")}/mono.png`,
      crest: `${base("mclean-cardinals")}/crest.svg`,
      appIcon: `${base("mclean-cardinals")}/app-icon.png`,
      keyart: `${base("mclean-cardinals")}/02-Brand-Kit/keyart.png`,
      swag: `${base("mclean-cardinals")}/07-Swag-Kits/swag-kit/hero.png`,
      poster: `${base("mclean-cardinals")}/03-Stadiums/stadium-01/poster.jpg`,
    },
    "washington-whoomp": {
      logo: `${base("washington-whoomp")}/primary.png`,
      secondary: `${base("washington-whoomp")}/secondary.png`,
      mono: `${base("washington-whoomp")}/mono.png`,
      crest: `${base("washington-whoomp")}/crest.svg`,
      appIcon: `${base("washington-whoomp")}/app-icon.png`,
      keyart: `${base("washington-whoomp")}/02-Brand-Kit/keyart.png`,
      swag: `${base("washington-whoomp")}/07-Swag-Kits/swag-kit/hero.png`,
      poster: `${base("washington-whoomp")}/03-Stadiums/stadium-01/poster.jpg`,
    },
    "chattanooga-choo-choo": {
      logo: `${base("chattanooga-choo-choo")}/primary.png`,
      secondary: `${base("chattanooga-choo-choo")}/secondary.png`,
      mono: `${base("chattanooga-choo-choo")}/mono.png`,
      crest: `${base("chattanooga-choo-choo")}/crest.svg`,
      appIcon: `${base("chattanooga-choo-choo")}/app-icon.png`,
    },
    "la-hibibi-jinni": {
      logo: `${base("la-hibibi-jinni")}/primary.png`,
      secondary: `${base("la-hibibi-jinni")}/secondary.png`,
      mono: `${base("la-hibibi-jinni")}/mono.png`,
      crest: `${base("la-hibibi-jinni")}/crest.svg`,
      appIcon: `${base("la-hibibi-jinni")}/app-icon.png`,
    },
  };

  function logoUrl(slug) {
    return BRAND[slug]?.logo || `${base(slug)}/primary.png`;
  }

  function posterUrl(slug) {
    return BRAND[slug]?.poster || `assets/teams/${slug}/03-Stadiums/stadium-01/poster.jpg`;
  }

  function logoSources(slug) {
    const b = BRAND[slug];
    const root = base(slug);
    const chain = [];
    if (b?.logo) chain.push(b.logo);
    chain.push(
      `${root}/primary.png`,
      `${root}/app-icon.png`,
      `${root}/secondary.png`,
      `${root}/crest.svg`,
      `${root}/primary.svg`,
      `${root}/mono.png`
    );
    return [...new Set(chain)];
  }

  window.PGBTeamBrand = { BRAND, logoUrl, posterUrl, logoSources };
})();
