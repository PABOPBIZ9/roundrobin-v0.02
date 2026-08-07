/**
 * PuckGold LockerVision — kit editions, gear layers, rink stages.
 * Drop art into paths returned by PGBLockerVision.paths().
 */
(function () {
  const EDITIONS = [
    {
      id: "home",
      name: "Home Ice",
      nbaAnalog: "Association",
      blurb: "Primary home colors — what the crowd sees when the Founding Four own their sheet.",
    },
    {
      id: "away",
      name: "Road White",
      nbaAnalog: "Icon",
      blurb: "Road kits built for hostile barns — light shells, bold marks, travel swagger.",
    },
    {
      id: "alternate",
      name: "Alternate Night",
      nbaAnalog: "Statement",
      blurb: "Third kits and special-night colorways for playoffs, rivalry, and tip-off heat.",
    },
    {
      id: "classic",
      name: "Classic Throwback",
      nbaAnalog: "Classic",
      blurb: "Retro '94 energy — shimmer crests, vintage blocks, and league throwback nights.",
    },
    {
      id: "goalie",
      name: "Goalie Pad Set",
      nbaAnalog: "Specialty",
      blurb: "Full crease kit — mask, pads, blocker, trapper matched to each edition night.",
    },
  ];

  /** Per-team kit catalog (names + story + default gear colors). */
  const TEAM_KITS = {
    "miami-mighty-geckz": {
      home: {
        name: "Neon Reef Home",
        story:
          "Teal shell over reef-night ice. Center crest hits under the Neon Reef scoreboard lights; sock stripes echo Biscayne neon.",
        accent: "#2dd4bf",
        shell: "#0f766e",
        secondary: "#f0d78c",
      },
      away: {
        name: "Reef Road Teal",
        story: "White road shell with teal shoulders — built for road barns and Champions Night travel.",
        accent: "#2dd4bf",
        shell: "#f5f7fa",
        secondary: "#0f766e",
      },
      alternate: {
        name: "Champions Night Neon",
        story: "Cup-night neon — black base, electric teal piping, gold shimmer on the hem.",
        accent: "#f0d78c",
        shell: "#0b1220",
        secondary: "#2dd4bf",
      },
      classic: {
        name: "Retro Reef '94",
        story: "16-bit throwback block — PGB Retro League energy on Miami ice.",
        accent: "#f0d78c",
        shell: "#134e4a",
        secondary: "#fff",
      },
      goalie: {
        name: "Wall of the Reef",
        story: "Emmett Solis crease set — mask art, teal pads, gold trapper flash.",
        accent: "#2dd4bf",
        shell: "#0f766e",
        secondary: "#f0d78c",
      },
    },
    "mclean-cardinals": {
      home: {
        name: "Gardens Ruby Home",
        story: "Ruby home at Cardinal Perch Gardens — precision red, cream trim, garden-glass sheen.",
        accent: "#ef4444",
        shell: "#991b1b",
        secondary: "#f5e6b3",
      },
      away: {
        name: "Perch Road White",
        story: "Clean road white with cardinal wing stripe — composure on hostile ice.",
        accent: "#ef4444",
        shell: "#f8fafc",
        secondary: "#991b1b",
      },
      alternate: {
        name: "Perch Final White",
        story: "Golden Final road — champagne collar, ruby numbers, playoff trim.",
        accent: "#d4af37",
        shell: "#fff",
        secondary: "#991b1b",
      },
      classic: {
        name: "Classic Perch",
        story: "Throwback block letters and vintage ruby — '94 league night ready.",
        accent: "#d4af37",
        shell: "#7f1d1d",
        secondary: "#f5e6b3",
      },
      goalie: {
        name: "Quiet Pads",
        story: "Theodore Lang set — ruby pads, cream mask cage, calm crease geometry.",
        accent: "#ef4444",
        shell: "#991b1b",
        secondary: "#f5e6b3",
      },
    },
    "washington-whoomp": {
      home: {
        name: "District Dome Blue",
        story: "Capital blue under the Dome — sapphire shoulders, monument energy on home ice.",
        accent: "#3f6db8",
        shell: "#1e3a8a",
        secondary: "#e5e7eb",
      },
      away: {
        name: "Capital Road",
        story: "Road white with district blue bars — make history on the road.",
        accent: "#3f6db8",
        shell: "#f8fafc",
        secondary: "#1e3a8a",
      },
      alternate: {
        name: "Capital Alternate",
        story: "Statement night navy — Whoomp! thunder stripe and platinum numbers.",
        accent: "#e5e7eb",
        shell: "#0b1220",
        secondary: "#3f6db8",
      },
      classic: {
        name: "Classic Capital",
        story: "Retro Dome kit — block W and championship gold piping.",
        accent: "#d4af37",
        shell: "#1e3a8a",
        secondary: "#fff",
      },
      goalie: {
        name: "Capital Calm",
        story: "Felix Ward pads — navy shells, sapphire blocker, Dome logo mask.",
        accent: "#3f6db8",
        shell: "#1e3a8a",
        secondary: "#e5e7eb",
      },
    },
    "chattanooga-choo-choo": {
      home: {
        name: "Terminal Home Copper",
        story: "Terminal energy — copper and cream on Chattanooga home ice.",
        accent: "#c2410c",
        shell: "#7c2d12",
        secondary: "#f5e6b3",
      },
      away: {
        name: "Terminal Road Cream",
        story: "Cream road shell with copper shoulders — rail-line stripe down the sleeve.",
        accent: "#c2410c",
        shell: "#faf6ef",
        secondary: "#7c2d12",
      },
      alternate: {
        name: "Terminal Night",
        story: "Blackout night kit — copper flashes and whistle-stop numbers.",
        accent: "#f5e6b3",
        shell: "#1c1917",
        secondary: "#c2410c",
      },
      classic: {
        name: "Classic Choo Choo",
        story: "Throwback terminal mark — vintage cream and copper '94 blocks.",
        accent: "#d4af37",
        shell: "#7c2d12",
        secondary: "#faf6ef",
      },
      goalie: {
        name: "Terminal Wall",
        story: "Crease copper pads and cream mask — stops on the whistle.",
        accent: "#c2410c",
        shell: "#7c2d12",
        secondary: "#f5e6b3",
      },
    },
  };

  /** Map outfit display names from PGB_GAMES → kit edition ids */
  const OUTFIT_TO_KIT = {
    "Neon Reef Home": "home",
    "Perch Road White": "away",
    "District Dome Blue": "home",
    "Terminal Road Cream": "away",
    "Gardens Ruby Home": "home",
    "Capital Road": "away",
    "Capital Alternate": "alternate",
    "Reef Road Teal": "away",
    "Terminal Cream": "away",
    "Champions Road": "away",
    "Champions Night Neon": "alternate",
    "Perch Final White": "alternate",
    "Season Two Reveal": "home",
    "Terminal Home Copper": "home",
    "Terminal Night": "alternate",
  };

  const GEAR_SLOTS = [
    { id: "jersey", label: "Jersey", file: "jersey.png" },
    { id: "pants", label: "Pants / Socks", file: "pants.png" },
    { id: "pads", label: "Shoulder / Elbow Pads", file: "pads.png" },
    { id: "helmet", label: "Helmet", file: "helmet.png" },
    { id: "gloves", label: "Gloves", file: "gloves.png" },
    { id: "skates", label: "Skates", file: "skates.png" },
  ];

  const GOALIE_SLOTS = [
    { id: "mask", label: "Mask", file: "mask.png" },
    { id: "leg-pads", label: "Leg Pads", file: "leg-pads.png" },
    { id: "blocker", label: "Blocker", file: "blocker.png" },
    { id: "trapper", label: "Trapper", file: "trapper.png" },
    { id: "chest", label: "Chest / Arm", file: "chest.png" },
  ];

  function teamBySlug(slug) {
    return window.PGBTeams?.bySlug?.(slug) || null;
  }

  function kitFor(teamSlug, kitId) {
    const kits = TEAM_KITS[teamSlug];
    if (!kits) return null;
    return kits[kitId] || null;
  }

  function kitIdFromOutfitName(name) {
    return OUTFIT_TO_KIT[name] || "home";
  }

  function paths(teamSlug, kitId) {
    const base = `assets/teams/${teamSlug}/05-Jerseys-Uniforms`;
    const kitBase = `${base}/${kitId}`;
    return {
      hero: `${kitBase}/hero.png`,
      jersey: `${kitBase}/jersey.png`,
      pants: `${kitBase}/pants.png`,
      pads: `${kitBase}/pads.png`,
      helmet: `${kitBase}/helmet.png`,
      gloves: `${kitBase}/gloves.png`,
      skates: `${kitBase}/skates.png`,
      mask: `${kitBase}/mask.png`,
      "leg-pads": `${kitBase}/leg-pads.png`,
      blocker: `${kitBase}/blocker.png`,
      trapper: `${kitBase}/trapper.png`,
      chest: `${kitBase}/chest.png`,
      flat: `${base}/${kitId}.png`,
      homeFlat: `${base}/home.png`,
      awayFlat: `${base}/away.png`,
      rink: `assets/vault/rinks/${teamSlug}.png`,
      game: (gameId, side) => `assets/vault/games/outfits/${gameId}/${side}.png`,
    };
  }

  function rinkForVenue(venue) {
    const map = {
      "Neon Reef Stadium": "miami-mighty-geckz",
      "Cardinal Perch Gardens": "mclean-cardinals",
      "The District Dome": "washington-whoomp",
    };
    const slug = map[venue] || "miami-mighty-geckz";
    return `assets/vault/rinks/${slug}.png`;
  }

  function gamesForTeam(slug) {
    return (window.PGB_GAMES || []).filter((g) => g.home === slug || g.away === slug);
  }

  function enrichGame(g) {
    const homeKit = kitIdFromOutfitName(g.outfitHome);
    const awayKit = kitIdFromOutfitName(g.outfitAway);
    return {
      ...g,
      homeKit,
      awayKit,
      homeKitMeta: kitFor(g.home, homeKit),
      awayKitMeta: kitFor(g.away, awayKit),
    };
  }

  window.PGBLockerVision = {
    editions: EDITIONS,
    teamKits: TEAM_KITS,
    gearSlots: GEAR_SLOTS,
    goalieSlots: GOALIE_SLOTS,
    kitFor,
    kitIdFromOutfitName,
    paths,
    rinkForVenue,
    gamesForTeam,
    enrichGame,
    teamBySlug,
    allEnrichedGames() {
      return (window.PGB_GAMES || []).map(enrichGame);
    },
  };
})();
