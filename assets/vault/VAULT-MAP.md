# PuckGold Vault Map

## Team vaults (canonical)

```
assets/teams/miami-mighty-geckz/
assets/teams/mclean-cardinals/
assets/teams/washington-whoomp/
assets/teams/chattanooga-choo-choo/
```

Matches puckgold.com team pages: logos, brand kit, **3 stadiums**, **9 players**, jerseys, posters, swag, pucks, goal horn / booth audio, playlists, media, games.

## League vault

```
assets/vault/
  brand-kits/     # league + downloadable kits
  shopping/       # merch SKUs / product photography
  swag-items/     # giveaways, Fan Zone prizes
  logos/          # league masters
  games/          # bracket / broadcast / overlays
  content/        # newsroom, comics, trailers
  audio/          # shared beds / VO
  partners/       # partner logos
```

## Site wiring

| Surface | Reads from |
|---------|------------|
| `team.html?team=…` | `assets/teams/{slug}/` |
| Shop / gifts | `assets/vault/shopping`, `swag-items` |
| Brand kit page | `brand-kit/` + `assets/vault/brand-kits` |
| Media hub | `assets/media-hub/` + `assets/vault/content` |
| Partners | `assets/partners/` + `assets/vault/partners` |
| Game Zone / quizzes | `assets/vault/games/{quizzes,quests,badges}` |
| LockerVision outfits | `assets/vault/games/outfits/{gameid}/` + team `05-Jerseys-Uniforms` |
| Standings | `assets/js/standings-data.js` (table) · `standings.html` |
| Trophies / Awards | `assets/hardware/trophies/{id}/` (+ vault alias) · `awards.html` |
| League format | `format.html` |
| Franchise apply | `apply.html` · `contact.html` |
| Scores / Schedule / Stats | `scores.html` · `schedule.html` · `stats.html` · `standings-data.js` |
| Condensed / Recaps | `assets/vault/content/{condensed,recaps}/{gameid}/` · `video-watch.html` |
| Puck Personality | `assets/vault/content/puck-personality/{slug}/` |
| Podcasts | `assets/vault/content/podcasts/{slug}/` |
| Transcripts (ASAP desk) | `assets/vault/content/transcripts/{event}/` · `transcripts.html` |
| Event roundels | `assets/media-hub/event-logos/{slug}.svg` |
| Media Hub videos | `media-videos.html` · `assets/media-hub/DROP-VIDEO-HERE/` |

## Audio slots (per team)

- `09-Audio/goal-horn/main.mp3`
- `09-Audio/walkout-intro/main.mp3`
- `09-Audio/goal-call/main.mp3`
- `09-Audio/win-outro/main.mp3`
