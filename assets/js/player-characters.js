/**
 * Digital character collectibles — Space Jam / VeeFriends-style roster.
 * Each player is a mascot-class character with a special power + vibe stats.
 */
(function () {
  const POWERS = {
    "reef-vision": { name: "Reef Vision", type: "IQ", icon: "👁", desc: "Sees three passes ahead through neon reef glass." },
    "neon-dash": { name: "Neon Dash", type: "Speed", icon: "💨", desc: "Bursts past defenders in a teal streak." },
    "laser-eyes": { name: "Laser Eyes", type: "Shot", icon: "🔴", desc: "Red beam release — sniper from the slot." },
    "tide-wall": { name: "Tide Wall", type: "Defense", icon: "🌊", desc: "Closes gaps like a reef barrier." },
    "tail-whip": { name: "Tail Whip", type: "Speed", icon: "🦎", desc: "Spins off contact with gecko tail torque." },
    "reef-barrier": { name: "Reef Barrier", type: "Goalie", icon: "🧱", desc: "Pads swallow pucks in neon mist." },
    "sticky-grip": { name: "Sticky Grip", type: "Vibe", icon: "✋", desc: "PK pest — steals pucks with gecko hands." },
    "sand-screen": { name: "Sand Screen", type: "Power", icon: "🏖", desc: "Net-front traffic that blocks sightlines." },
    "glow-dash": { name: "Glow Dash", type: "Speed", icon: "✨", desc: "Extra D with reef swagger on the rush." },
    "perch-vision": { name: "Perch Vision", type: "IQ", icon: "👁", desc: "Chess-match reads from the high slot." },
    "talon-slice": { name: "Talon Slice", type: "Shot", icon: "🪶", desc: "Board battle into clean wrister." },
    "ruby-focus": { name: "Ruby Focus", type: "Shot", icon: "💎", desc: "Cold release, colder stare." },
    "frost-read": { name: "Frost Read", type: "Defense", icon: "❄", desc: "First-pair gap control." },
    "branch-shield": { name: "Branch Shield", type: "Power", icon: "🛡", desc: "Heavy edge, light feet on the hit." },
    "nest-wall": { name: "Nest Wall", type: "Goalie", icon: "🥅", desc: "Quiet pads, loud saves." },
    "cardinal-flare": { name: "Cardinal Flare", type: "Vibe", icon: "🔥", desc: "Faceoff specialist spark." },
    "wind-cycle": { name: "Wind Cycle", type: "IQ", icon: "🌀", desc: "Cycle engine — keeps possession alive." },
    "perch-dive": { name: "Perch Dive", type: "Defense", icon: "🦅", desc: "Depth D, PK first — blocks lanes." },
    "monument-pulse": { name: "Monument Pulse", type: "IQ", icon: "🏛", desc: "District pulse on the draw." },
    "thunder-rush": { name: "Thunder Rush", type: "Power", icon: "⚡", desc: "North-south hammer through the middle." },
    "lightning-shot": { name: "Lightning Shot", type: "Shot", icon: "⚡", desc: "Showtime finish with capital thunder." },
    "dome-shield": { name: "Dome Shield", type: "Defense", icon: "🛡", desc: "Gap control like a sapphire dome." },
    "capital-crush": { name: "Capital Crush", type: "Power", icon: "💥", desc: "Physical, proud, reliable hits." },
    "vault-wall": { name: "Vault Wall", type: "Goalie", icon: "🏦", desc: "Capital calm between the pipes." },
    "sonic-spark": { name: "Sonic Spark", type: "Vibe", icon: "🔊", desc: "Energy-line center buzz." },
    "whoomp-clap": { name: "Whoomp Clap", type: "Power", icon: "👏", desc: "Forecheck dog — rattles the boards." },
    "sapphire-edge": { name: "Sapphire Edge", type: "Defense", icon: "💠", desc: "Big hits from the blue line." },
    "conductor-bolt": { name: "Conductor Bolt", type: "IQ", icon: "⚡", desc: "Lines up the train — conductor of the rush." },
    "steam-burst": { name: "Steam Burst", type: "Power", icon: "💨", desc: "Work-rate engine — never stops chugging." },
    "terminal-spark": { name: "Terminal Spark", type: "Shot", icon: "✨", desc: "Terminal spark off the half wall." },
    "steel-rails": { name: "Steel Rails", type: "Defense", icon: "🛤", desc: "Stay-at-home steel on the blue line." },
    "copper-heart": { name: "Copper Heart", type: "Vibe", icon: "❤", desc: "Sportsmanship standard-bearer energy." },
    "last-stop": { name: "Last Stop", type: "Goalie", icon: "🛑", desc: "Final line — the last stop before the net." },
    "freight-glue": { name: "Freight Glue", type: "IQ", icon: "🔗", desc: "Bottom-six glue — holds the line." },
    "coal-fury": { name: "Coal Fury", type: "Power", icon: "🔥", desc: "Net-front crash and tip-ins." },
    "iron-edge": { name: "Iron Edge", type: "Defense", icon: "⚙", desc: "Call-up D with terminal grit." },
    "three-wishes": { name: "Three Wishes", type: "IQ", icon: "🪔", desc: "Wish-maker on the dot — LA tempo dictator." },
    "lamp-smoke": { name: "Lamp Smoke", type: "Shot", icon: "💨", desc: "Silk hands, smoke-release wrister." },
    "sunset-flash": { name: "Sunset Flash", type: "Speed", icon: "🌅", desc: "Sunset rush specialist on the wing." },
    "genie-drift": { name: "Genie Drift", type: "Defense", icon: "🌫", desc: "Gap wizard with lamp-light poise." },
    "sand-vortex": { name: "Sand Vortex", type: "Power", icon: "🌀", desc: "Physical edge, Hollywood finish." },
    "wish-wall": { name: "Wish Wall", type: "Goalie", icon: "🧞", desc: "Saves like granted wishes." },
    "mirage-step": { name: "Mirage Step", type: "Vibe", icon: "✨", desc: "Energy-line spark — appears from smoke." },
    "smoke-screen": { name: "Smoke Screen", type: "Power", icon: "💨", desc: "Net-front smoke screens." },
    "gold-dust": { name: "Gold Dust", type: "Defense", icon: "✨", desc: "Depth D, PK lamp-bearer." },
  };

  const TEAMS = {
    "miami-mighty-geckz": {
      mascot: { name: "Gecko Gus", trait: "Perseverance", catch: "Quick feet, big heart!" },
      species: "Neon Geckz",
      theme: "gecko",
    },
    "mclean-cardinals": {
      mascot: { name: "Cardy", trait: "Discipline", catch: "Practice makes perfect!" },
      species: "Climate Cardinal",
      theme: "cardinal",
    },
    "washington-whoomp": {
      mascot: { name: "Dome-ster", trait: "Smart teamwork", catch: "Let's think it through!" },
      species: "District Dome",
      theme: "dome",
    },
    "chattanooga-choo-choo": {
      mascot: { name: "Chuggy", trait: "Heart & hustle", catch: "All aboard for effort!" },
      species: "Terminal Engine",
      theme: "train",
    },
    "la-hibibi-jinni": {
      mascot: { name: "Jinni J", trait: "Wish craft", catch: "Rub the ice — make a wish!" },
      species: "Sunset Genie",
      theme: "genie",
    },
  };

  /** player id → collectible character */
  const BY_ID = {
    "kai-sandoval": { codename: "Reef Nine", power: "reef-vision", stats: { speed: 88, vibe: 92, power: 76, ice: 85 } },
    "milo-reyes": { codename: "Neon Milo", power: "neon-dash", stats: { speed: 94, vibe: 86, power: 70, ice: 78 } },
    "dashiell-cruz": { codename: "Laser Cruz", power: "laser-eyes", stats: { speed: 82, vibe: 88, power: 91, ice: 80 } },
    "tobias-marsh": { codename: "Tide Marsh", power: "tide-wall", stats: { speed: 74, vibe: 80, power: 85, ice: 90 } },
    "ronan-vega": { codename: "Tail Vega", power: "tail-whip", stats: { speed: 86, vibe: 78, power: 72, ice: 84 } },
    "emmett-solis": { codename: "Reef Wall", power: "reef-barrier", stats: { speed: 68, vibe: 84, power: 88, ice: 93 } },
    "jaz-orin": { codename: "Sticky Jaz", power: "sticky-grip", stats: { speed: 80, vibe: 90, power: 74, ice: 82 } },
    "nico-bale": { codename: "Sand Bale", power: "sand-screen", stats: { speed: 72, vibe: 76, power: 88, ice: 79 } },
    "rio-santana": { codename: "Glow Rio", power: "glow-dash", stats: { speed: 84, vibe: 82, power: 70, ice: 86 } },
    "nathaniel-cross": { codename: "Perch Cross", power: "perch-vision", stats: { speed: 86, vibe: 90, power: 82, ice: 91 } },
    "julian-ashford": { codename: "Talon Jules", power: "talon-slice", stats: { speed: 80, vibe: 84, power: 86, ice: 83 } },
    "desmond-pierce": { codename: "Ruby Des", power: "ruby-focus", stats: { speed: 78, vibe: 86, power: 90, ice: 85 } },
    "harrison-wells": { codename: "Frost Wells", power: "frost-read", stats: { speed: 76, vibe: 82, power: 84, ice: 92 } },
    "sebastian-kane": { codename: "Branch Kane", power: "branch-shield", stats: { speed: 74, vibe: 78, power: 92, ice: 88 } },
    "theodore-lang": { codename: "Nest Lang", power: "nest-wall", stats: { speed: 66, vibe: 86, power: 90, ice: 94 } },
    "cole-meridian": { codename: "Cardinal Cole", power: "cardinal-flare", stats: { speed: 82, vibe: 88, power: 72, ice: 84 } },
    "evan-brook": { codename: "Wind Brook", power: "wind-cycle", stats: { speed: 78, vibe: 80, power: 74, ice: 86 } },
    "griffin-vale": { codename: "Perch Vale", power: "perch-dive", stats: { speed: 72, vibe: 76, power: 80, ice: 90 } },
    "marcus-doyle": { codename: "Monument Marc", power: "monument-pulse", stats: { speed: 84, vibe: 92, power: 86, ice: 88 } },
    "elliot-graves": { codename: "Thunder Elliot", power: "thunder-rush", stats: { speed: 88, vibe: 82, power: 92, ice: 80 } },
    "preston-hale": { codename: "Lightning Pres", power: "lightning-shot", stats: { speed: 82, vibe: 90, power: 94, ice: 82 } },
    "oliver-banks": { codename: "Dome Banks", power: "dome-shield", stats: { speed: 76, vibe: 80, power: 86, ice: 91 } },
    "damian-rourke": { codename: "Capital Dam", power: "capital-crush", stats: { speed: 74, vibe: 78, power: 93, ice: 87 } },
    "felix-ward": { codename: "Vault Ward", power: "vault-wall", stats: { speed: 68, vibe: 88, power: 90, ice: 95 } },
    "andre-quinn": { codename: "Sonic Andre", power: "sonic-spark", stats: { speed: 86, vibe: 92, power: 76, ice: 80 } },
    "tyson-reed": { codename: "Whoomp Ty", power: "whoomp-clap", stats: { speed: 84, vibe: 84, power: 90, ice: 78 } },
    "caleb-frost": { codename: "Sapphire Caleb", power: "sapphire-edge", stats: { speed: 70, vibe: 74, power: 88, ice: 89 } },
    "wyatt-combs": { codename: "Conductor Wyatt", power: "conductor-bolt", stats: { speed: 82, vibe: 90, power: 78, ice: 86 } },
    "gunnar-voss": { codename: "Steam Gunnar", power: "steam-burst", stats: { speed: 80, vibe: 86, power: 88, ice: 82 } },
    "silas-bratton": { codename: "Terminal Silas", power: "terminal-spark", stats: { speed: 84, vibe: 84, power: 82, ice: 80 } },
    "coen-whitfield": { codename: "Steel Coen", power: "steel-rails", stats: { speed: 72, vibe: 78, power: 86, ice: 91 } },
    "boone-larkin": { codename: "Copper Boone", power: "copper-heart", stats: { speed: 76, vibe: 94, power: 80, ice: 84 } },
    "asher-doss": { codename: "Last Stop Ash", power: "last-stop", stats: { speed: 66, vibe: 86, power: 88, ice: 92 } },
    "reed-holloway": { codename: "Freight Reed", power: "freight-glue", stats: { speed: 78, vibe: 80, power: 74, ice: 86 } },
    "jax-porter": { codename: "Coal Jax", power: "coal-fury", stats: { speed: 82, vibe: 78, power: 90, ice: 76 } },
    "heath-carver": { codename: "Iron Heath", power: "iron-edge", stats: { speed: 70, vibe: 72, power: 84, ice: 88 } },
    "amir-noor": { codename: "Wish Amir", power: "three-wishes", stats: { speed: 88, vibe: 94, power: 82, ice: 86 } },
    "leila-saffron": { codename: "Lamp Leila", power: "lamp-smoke", stats: { speed: 84, vibe: 90, power: 88, ice: 82 } },
    "romeo-vale": { codename: "Sunset Romeo", power: "sunset-flash", stats: { speed: 92, vibe: 86, power: 80, ice: 78 } },
    "dante-mir": { codename: "Genie Dante", power: "genie-drift", stats: { speed: 76, vibe: 84, power: 82, ice: 91 } },
    "khalid-rose": { codename: "Sand Khalid", power: "sand-vortex", stats: { speed: 74, vibe: 80, power: 92, ice: 86 } },
    "sage-lumen": { codename: "Wish Sage", power: "wish-wall", stats: { speed: 68, vibe: 90, power: 88, ice: 94 } },
    "nico-palm": { codename: "Mirage Nico", power: "mirage-step", stats: { speed: 86, vibe: 92, power: 74, ice: 80 } },
    "ivy-canyon": { codename: "Smoke Ivy", power: "smoke-screen", stats: { speed: 80, vibe: 82, power: 88, ice: 78 } },
    "omar-dusk": { codename: "Gold Omar", power: "gold-dust", stats: { speed: 72, vibe: 76, power: 80, ice: 89 } },
  };

  function forPlayer(player, team) {
    const raw = BY_ID[player.id] || {
      codename: player.name.split(" ").pop(),
      power: "neon-dash",
      stats: { speed: 75, vibe: 75, power: 75, ice: 75 },
    };
    const powerDef = POWERS[raw.power] || { name: raw.power, type: "Vibe", icon: "✨", desc: "" };
    const teamMeta = TEAMS[team.slug] || { mascot: { name: team.short }, species: "Digital Skater", theme: "gecko" };
    return {
      ...raw,
      powerDef,
      teamMeta,
      displayName: raw.codename,
    };
  }

  function teamMeta(slug) {
    return TEAMS[slug] || null;
  }

  window.PGBCharacters = {
    POWERS,
    TEAMS,
    forPlayer,
    teamMeta,
    powerBadge(powerId) {
      const p = POWERS[powerId];
      if (!p) return "";
      return `<span class="pgb-power-badge" title="${p.desc}">${p.icon} ${p.name}</span>`;
    },
  };
})();
