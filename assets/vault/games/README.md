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

Wire-up:
- `play.html` — timed quizzes, learning quests, daily farm, fan XP board
- `lockervision.html?gameid=` — game outfits
- `standings.html` — NHL/NBA-style division table
