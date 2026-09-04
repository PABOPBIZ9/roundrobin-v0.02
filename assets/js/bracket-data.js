/** NHL-style bracket trees — Underdog Golden Final + Global Power knockout */
window.PGB_BRACKETS = {
  goldenFinal: {
    id: "golden-final",
    label: "Underdog Division · Season One",
    title: "Golden Final Bracket",
    subtitle: "Founding Four · Best-of-two aggregate · Miracle Game OT",
    season: "2026",
    trophy: "The Puck Gold One",
    trophyHref: "awards.html#puck-gold-one",
    champion: { code: "MMG", name: "Miami Mighty Geckz", slug: "miami-mighty-geckz", color: "#0f766e" },
    rounds: {
      left: [
        {
          id: "r1",
          label: "SF",
          series: [
            {
              id: "sf1",
              label: "Semifinal · #1 vs #4",
              teams: [
                { code: "MC", name: "McLean Climate Cardinals", slug: "mclean-cardinals", seed: "D1", color: "#991b1b", score: 6, winner: true },
                { code: "CCC", name: "Chattanooga Choo Choos", slug: "chattanooga-choo-choo", seed: "D4", color: "#78350f", score: 2, winner: false },
              ],
              result: "McLean advances 6–2",
            },
          ],
        },
      ],
      final: {
        id: "final",
        label: "Golden Final",
        aggregate: "6–5",
        teams: [
          { code: "MMG", name: "Miami Mighty Geckz", slug: "miami-mighty-geckz", seed: "D3", color: "#0f766e", score: 6, winner: true },
          { code: "MC", name: "McLean Climate Cardinals", slug: "mclean-cardinals", seed: "D1", color: "#991b1b", score: 5, winner: false },
        ],
        games: ["G1 · McLean 3–1", "G2 · Miami 5–4 (OT) — down 3–1, storm back"],
        result: "Miami Mighty Geckz · Season One champions",
      },
      right: [
        {
          id: "r1",
          label: "SF",
          series: [
            {
              id: "sf2",
              label: "Semifinal · #2 vs #3",
              teams: [
                { code: "MMG", name: "Miami Mighty Geckz", slug: "miami-mighty-geckz", seed: "D3", color: "#0f766e", score: 3, winner: true },
                { code: "WW", name: "Washington Whoomp!", slug: "washington-whoomp", seed: "D2", color: "#1e3a8a", score: 2, winner: false },
              ],
              result: "Miami advances 3–2 (OT)",
            },
          ],
        },
      ],
    },
    seeds: [
      { rank: 1, code: "MC", name: "McLean Climate Cardinals" },
      { rank: 2, code: "WW", name: "Washington Whoomp!" },
      { rank: 3, code: "MMG", name: "Miami Mighty Geckz" },
      { rank: 4, code: "CCC", name: "Chattanooga Choo Choos" },
    ],
  },

  globalPower: {
    id: "global-power",
    label: "Global Power Division · Expansion Weekend",
    title: "Expansion Cup Bracket",
    subtitle: "Pool winners + wild cards · QF → SF → Expansion Cup · Sudden Death Strobe OT",
    season: "2026",
    trophy: "Expansion Cup",
    trophyHref: "expansion.html",
    champion: null,
    rounds: {
      left: [
        {
          id: "r1",
          label: "R1",
          series: [
            {
              id: "qf1",
              label: "QF · Pool A/B",
              live: true,
              teams: [
                { code: "DD", name: "Dubai Dragons", slug: "dubai-dragons", seed: "A1", color: "#b45309", score: 0, winner: null },
                { code: "SP", name: "São Paulo Shadow Punks", slug: "sao-paulo-shadow-punks", seed: "WC", color: "#0f172a", score: 0, winner: null },
              ],
              result: "Neon Reef · locks after pool play",
            },
            {
              id: "qf2",
              label: "QF · Pool B/A",
              teams: [
                { code: "PB", name: "Paris BUB Phoenixes", slug: "paris-bub-phoenixes", seed: "B1", color: "#7c3aed", score: 0, winner: null },
                { code: "NS", name: "Nashville Snakes", slug: "nashville-snakes", seed: "WC", color: "#166534", score: 0, winner: null },
              ],
              result: "Locks after pool play",
            },
          ],
        },
        {
          id: "r2",
          label: "SF",
          series: [
            {
              id: "sf1",
              label: "Semifinal · West path",
              teams: [
                { code: "QF1", name: "Winner QF1", slug: null, seed: "—", color: "#163a74", score: 0, winner: null },
                { code: "QF2", name: "Winner QF2", slug: null, seed: "—", color: "#0b1220", score: 0, winner: null },
              ],
              result: "Sunday board",
            },
          ],
        },
      ],
      final: {
        id: "final",
        label: "Expansion Cup",
        aggregate: null,
        teams: [
          { code: "SF1", name: "Winner SF1", slug: null, seed: "—", color: "#f0d78c", score: 0, winner: null },
          { code: "SF2", name: "Winner SF2", slug: null, seed: "—", color: "#163a74", score: 0, winner: null },
        ],
        games: ["Sudden Death Strobe OT · first goal wins"],
        result: "Global Power champion · Sunday horn",
      },
      right: [
        {
          id: "r2",
          label: "SF",
          series: [
            {
              id: "sf2",
              label: "Semifinal · East path",
              teams: [
                { code: "QF3", name: "Winner QF3", slug: null, seed: "—", color: "#0a2a28", score: 0, winner: null },
                { code: "QF4", name: "Winner QF4", slug: null, seed: "—", color: "#7a1524", score: 0, winner: null },
              ],
              result: "Sunday board",
            },
          ],
        },
        {
          id: "r1",
          label: "R1",
          series: [
            {
              id: "qf3",
              label: "QF · Pool C/D",
              teams: [
                { code: "SN", name: "Seoul Neon Knights", slug: "seoul-neon", seed: "C1", color: "#0891b2", score: 0, winner: null },
                { code: "HJ", name: "Los Angeles Hibibi Jinni", slug: "la-hibibi-jinni", seed: "WC", color: "#7e22ce", score: 0, winner: null },
              ],
              result: "Locks after pool play",
            },
            {
              id: "qf4",
              label: "QF · Pool D/C",
              teams: [
                { code: "SS", name: "Sydney Surge", slug: "sydney-surge", seed: "D1", color: "#059669", score: 0, winner: null },
                { code: "MX", name: "Mexico City Solar", slug: "mexico-city-solar", seed: "WC", color: "#ea580c", score: 0, winner: null },
              ],
              result: "Locks after pool play",
            },
          ],
        },
      ],
    },
  },

  underdogCup: {
    id: "underdog-cup",
    label: "Underdog Adults League · Expansion Weekend",
    title: "Underdog Cup Bracket",
    subtitle: "Founding Four only · separate from Global Power · Sunday Underdog Cup final",
    season: "2026",
    trophy: "Underdog Cup",
    trophyHref: "awards.html#underdog-division-crown",
    champion: null,
    rounds: {
      left: [
        {
          id: "r1",
          label: "SF",
          series: [
            {
              id: "usf1",
              label: "Semifinal · Round robin seeds",
              teams: [
                { code: "MC", name: "McLean Climate Cardinals", slug: "mclean-cardinals", seed: "D1", color: "#991b1b", score: 0, winner: null },
                { code: "CCC", name: "Chattanooga Choo Choos", slug: "chattanooga-choo-choo", seed: "D4", color: "#78350f", score: 0, winner: null },
              ],
              result: "Sunday · Underdog path",
            },
          ],
        },
      ],
      final: {
        id: "final",
        label: "Underdog Cup",
        teams: [
          { code: "SF1", name: "Winner SF1", slug: null, seed: "—", color: "#f0d78c", score: 0, winner: null },
          { code: "SF2", name: "Winner SF2", slug: null, seed: "—", color: "#163a74", score: 0, winner: null },
        ],
        games: ["Sudden Death Strobe OT"],
        result: "Underdog Adults League champion",
      },
      right: [
        {
          id: "r1",
          label: "SF",
          series: [
            {
              id: "usf2",
              label: "Semifinal · Round robin seeds",
              teams: [
                { code: "WW", name: "Washington Whoomp!", slug: "washington-whoomp", seed: "D2", color: "#1e3a8a", score: 0, winner: null },
                { code: "MMG", name: "Miami Mighty Geckz", slug: "miami-mighty-geckz", seed: "D3", color: "#0f766e", score: 0, winner: null },
              ],
              result: "Sunday · Underdog path",
            },
          ],
        },
      ],
    },
  },
};
