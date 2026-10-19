# Bluethroat

A speculative site for Bluethroat, the two railway-arch cocktail bars in Deptford (Arch 2, Deptford Station, est. 2020) and Brixton (51 Atlantic Road, est. 2023). It is a front-end demo on static data: there is no CMS, booking backend or payment, and forms only show a confirmation state.

Live: https://alexwilder-dev.github.io/bluethroat/

## What's here

- **Tonight.** The two arches side by side with live open/closed status in London time, how late each pours, directions, what's on the menu and a review nudge once the night is under way.
- **Twelve words.** Every cocktail on Edition 12 has one flavour word on the printed menu. Pick a word to meet the drink, priced for your bar, with an alcohol-free filter.
- **Menu.** Edition 12 (Autumn & Winter 2026) as a web page: cocktails on a marble bar top that matches each bar (white at Deptford, black at Brixton), plus wines, beers and snacks.
- **Visit.** Address, Google/Apple Maps, opening hours with tonight highlighted, access, house rules and the FAQ.
- **Private hire.** A planner for bar, night and guests that shows capacity, minimum spend, service and the £500 fee, then an enquiry form pre-filled from it.
- **Bar switch.** Deptford/Brixton carries through prices, wines, hours, access and hire figures, and is remembered between visits.

All facts live in [`src/data/bluethroat.ts`](src/data/bluethroat.ts), split by bar. Research, sources and design notes are in [`research/notes.md`](research/notes.md).

## Develop

```bash
npm install
npm run dev
npm run build      # outputs dist/ for GitHub Pages (base /bluethroat/)
```

Add `?at=2026-10-23T22:30` before the `#` to pin the clock, for example to show a Friday night:
`https://alexwilder-dev.github.io/bluethroat/?at=2026-10-23T22:30#/`

### One-off scripts

- `npm run images` resizes the bar's own photos from `research/` into `public/img/`, cuts the bird from their sign, and makes the favicons from their monogram.
- `npm run og` builds `public/og.jpg` (1200×630) from the Deptford bar photo, with their bird and wordmark set in Marcellus.

## Deploy

`.github/workflows/deploy.yml` builds and publishes `dist/` to GitHub Pages on every push to `main` or the current default branch. Pages is set to "GitHub Actions" in the repository settings.

## Credits

Photographs, logo and menu content belong to Bluethroat. Type: Marcellus and Poppins (SIL Open Font License; see `scripts/fonts/`).

Site by AlexWilder-Dev.
