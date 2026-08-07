# Game Zone + LockerVision vault

Inspired by [NBA Play](https://play.nba.com/) and [NBA LockerVision](https://lockervision.nba.com/).

```
games/
  quizzes/     # optional question-bank JSON drops
  quests/      # quest art / badges copy
  outfits/     # per-game kit art
    {gameid}/
      home.png
      away.png
  badges/      # XP / achievement seals
  overlays/    # broadcast / play UI chrome
```

Team jersey fallbacks still live at:
`assets/teams/{slug}/05-Jerseys-Uniforms/home.png` · `away.png`

Kit layers (per team):
`assets/teams/{slug}/05-Jerseys-Uniforms/{home|away|alternate|classic|goalie}/`
→ hero.png, jersey.png, pads.png, helmet.png, gloves.png, pants.png, skates.png

Rink maps: `assets/vault/rinks/{slug}.png`

Wire-up:
- `lockervision.html` — LV hub
- `lv-schedule.html` — outfit schedule
- `lv-game.html?gameid=` — game outfit (jersey + pads + rink)
- `lv-team.html?team=` · `lv-outfit.html?team=&kit=` · `lv-edition.html?edition=`
- `lv-about.html` — about / FAQs
- `play.html` — Game Zone
- Legacy `lockervision.html?gameid=` redirects to `lv-game.html`
