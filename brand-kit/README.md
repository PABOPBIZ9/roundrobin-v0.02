# PGB Brand Kit

Official asset library for **PuckGoldBiz (PGB)** — structured like a production brand portal (Uber Assets style).

Drop new files into the matching `DROP-*` folders. Keep the naming convention below so partners and tools can find assets fast.

---

## Quick start

| Need | Use this |
|------|----------|
| Website header / nav | `Logos/Horizontal/Color/` or `Logos/Primary/Color/` |
| Dark UI / video endcards | `Logos/Primary/Gold/` or `Logos/Icon/Gold/` |
| Light print / merch | `Logos/Primary/Midnight/` or `Logos/Badge/Full-Color/` |
| Favicon | `Favicon/favicon.ico` |
| App / PWA | `App-Icons/iOS/` + `App-Icons/Android/` |
| Partner co-branding | `Partnerships/Co-Marketing/` + `Guidelines/06-Co-Marketing.md` |
| Full rules | `Guidelines/` |

**Download pack:** `Downloads/PGB-Brand-Kit.zip`

---

## Folder map

```
brand-kit/
├── Guidelines/          ← rules, clearspace, do/don't, co-marketing
├── Logos/
│   ├── Primary/         ← vertical badge (Color · Midnight · White · Gold · Platinum)
│   ├── Horizontal/      ← wide lockup
│   ├── Badge/           ← shield/badge colorways
│   ├── Icon/            ← mark-only + circle emblem
│   └── Wordmark/        ← PGB letterforms
├── App-Icons/           ← iOS · Android · Social
├── Favicon/             ← 16–512 + .ico
├── Colors/              ← tokens + swatch PNGs
├── Typography/          ← DROP fonts here
├── Photography/         ← DROP photos here
├── Illustrations/       ← DROP illustrations here
├── Partnerships/        ← co-marketing + partner logo drop
├── Templates/           ← Social · Email · Presentations · Merch
├── Mockups/             ← in-situ usage
├── Motion/              ← DROP video / audio here
├── Source/              ← masters + original sheets
└── Downloads/           ← packaged ZIPs
```

---

## Naming convention

```
PGB_{Type}_{Colorway}_RGB_{Background}.{ext}
```

Examples:
- `PGB_Primary_Color_RGB_Transparent.png`
- `PGB_Icon_Gold_RGB_On-Midnight.png`
- `PGB_Horizontal_Color.svg`

Colorways: `Color` · `Midnight` · `White` · `Gold` · `Platinum` · `MonoLight` · `MonoDark`

Backgrounds: `Transparent` · `On-White` · `On-Midnight` · `Square`

---

## Official colors

| Token | Hex |
|-------|-----|
| Platinum | `#E5E7EB` |
| Championship Gold | `#D4AF37` |
| Champagne | `#F5E6B3` |
| Ruby | `#A6122F` |
| Sapphire | `#0047A1` |
| Midnight | `#000000` |

See `Colors/colors.json` and `Colors/swatches/`.

---

## Production site paths

Live site continues to serve optimized copies from `assets/brand/` (for performance).  
**This `brand-kit/` folder is the master library** for design, partners, and downloads.
