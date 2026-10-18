# Bluethroat: research notes

Researched 18 October 2026. Sources, in order of trust:

1. **bluethroatbar.com** (fetched today): home, /deptford, /brixton, /private-hire, /faq, site CSS.
2. **Their PDFs** (in `pdf/`): Deptford and Brixton menus (Oct 2026, Edition 12) and Deptford and Brixton private-hire packs (Oct 2026, 9 pages each).
3. **London Cocktail Week** bar listing for Brixton (londoncocktailweek.com/bars/41230). Undated, 2025 festival.
4. **Wharf Life**, 16 March 2022: "Why Bluethroat in Deptford Market Yard wants to make a name for itself" (Jon Massey).
5. **Brixton Buzz**, 14 June 2023: "Bluethroat Cocktail Bar coming to Atlantic Road, Brixton".
6. Old or aggregator listings, used only to spot conflicts: First Table (Deptford), InTravel (Brixton), inkl guide.

**Could not reach:** Instagram @bluethroatbars (HTTP 429 / login wall) and both Google Maps listings (the place panel renders empty for automated browsers). So I have no Google reviews, rating, Maps hours or recent Instagram posts. The Google listings do exist: both `maps.app.goo.gl` links on their site resolve to "Bluethroat Deptford" (51.47884, -0.02642) and "Bluethroat Brixton" (51.46200, -0.11182).

---

## Trading and hours

- Both bars are trading. The site carries this month's **Edition 12, Autumn & Winter 2026** menus for both bars, and I found no closure news anywhere.
- Hours from the site footer today (also given in the brief):
  - **Deptford:** Wed–Thu 5pm–12am, Fri–Sat 5pm–1am.
  - **Brixton:** Wed–Thu 5pm–1am, Fri–Sat 5pm–2am.
- Older listings disagree (LCW: Brixton Tue–Thu 5–12, Fri–Sat 5–1; First Table: Deptford Wed–Sun with food). They predate the current site, so I ignored them.
- I could not cross-check hours on Google Maps or Instagram.

## Real review links (from the QR codes on their own menus)

The menus say "We'd love your feedback on Google / SCAN TO LEAVE A QUICK REVIEW". The QR codes go through qrco.de to Google's own review links:

- Deptford: `https://g.page/r/CVIaAtlR08VYEAE/review` (place 0x58c5d351d9021a52)
- Brixton: `https://g.page/r/CZNQpyoeZA56EAE/review` (place 0x7a0e641e2aa75093)

The site links straight to these and skips the qrco.de redirect.

## Brand

- **Signage mark** (photos `pdf-images/hire/brx-000.jpg`, `dep-000.jpg`, `img/deptford--27b2a91a--Philosopher.PNG`): an engraved songbird perched on a leafy branch over **BLUETHROAT** in wide-tracked Roman capitals. In Brixton it is gold leaf on a matte black plate lit by a teal downlight; on the Deptford brick wall it is the same plate; over the Deptford Station arch it is dark ink on a white lightbox.
  - I cut the bird out of the Brixton sign photo as a transparent PNG (`brand/bird-*.png`).
  - Gold sampled from the letters: `#dabf7e`, highlight `#e9cf92`.
- **Squarespace "logo"** (`img/logo-blue.png`): a 300×300 PNG holding a small black bar with "BLUETHROAT BARS" in white spaced sans. This is what the link preview shows today, a tiny square.
- **Favicon** (`img/favicon-orig.png`): an overlapping "BB" serif monogram, white on black, with BLUETHROAT BARS across it.
- **Fonts**
  - Site CSS: Poppins throughout (300 body, 500 headings, no tracking).
  - Menus PDF: **Marcellus** (flared Roman serif; its quirky old-style numerals show as "I2 Yr Scotch") with **TT Drugs** (commercial geometric sans) for the caps headings.
  - Hire PDFs: Barlow and Times New Roman Italic.
  - Marcellus is also the closest free match to the sign's wordmark.
- **Colours**
  - Site CSS is greyscale (white 98%, black, grey 86%, dark grey 11%) plus one slate overlay, `hsl(207 23% 28%)` = `#384958`.
  - The menus' glass icons are the same slate family, `#4c5d67`.
  - So Bluethroat's "blue" is a muted slate, not a bright cobalt.
- **Menu iconography:** each cocktail on the printed menu has a thin slate line drawing of its glass.
  - Rocks: Blackberry Smash, Strawberry Sidecar, Pear Pressure, Pomegranate Margarita, Pandan Negroni, Fig Old Fashioned, Burnt Honey.
  - Coupe: Doctor's Orders, Hibiscus Martinez, Cinema Butter, Apples to Lemons.
  - Highball: Bitter Paloma.
- **Flavour words** are letter-spaced on the menu ("T a r t", "A r o m a t i c"). That spacing is part of their typography.
- **Name:** Wharf Life says Bluethroat is "named for a small member of the thrush family with a distinctive blue collar and a powerful song".

## The two arches

### Deptford (est. 2020), Arch 2, Deptford Station, SE8

- **Setting:** a Victorian brick railway arch directly under Deptford Station's "Deptford Station" lettering, in Deptford Market Yard (Wharf Life 2022; the map shows Market Yard right below the station).
  - Outside: a cobbled yard with a roped-off terrace of bistro tables (`Philosopher.PNG`, night) and timber benches by a black glass door, beside a potted olive tree (`IMG_6627`).
  - The sign plate sits on bare brick.
- **Bar:** a long **white marble** bar (grey veining) under a brick barrel vault, lit by a row of glass dome pendants. Dark ribbed wood front, high-backed dark leather bar chairs, a wall of back-lit bottle shelves (`DSC07440`, `dep-003`).
- **Seating:** a moss-green buttoned velvet banquette against dark ribbed panelling with a timber table, and a framed print with a yellow ground (`IMG_3983`, their hire image).
  - Gold cordless table lamps on the marble (`DB503BB4…`).
  - Capacity for exclusive hire: 70.
- **Light:** warm. Daylight raking across white marble in the drink shots (`DSC08730`, `3F153D4D…`), then pendants and amber shelves at night. Wharf Life: "extensive collection of bottles, rich brown hues and speakeasy vibe".
- **Access:** wheelchair accessible (FAQ).
- **People and story** (Wharf Life, 2022):
  - Ari has lived in Deptford since 1997.
  - He spent 20 years in central London bars (Cuckoo Club, Chinawhite, ran the bar at Maddox for about six years).
  - Landi has been in Deptford since 2001.
  - The brothers built the bar "from scratch" from a shell, which took about a year.
  - They opened days before the first national lockdown.
  - Ari: "Ultimately we want to be known as one of the best cocktail bars in London."
  - The 2022 food menu and happy hour have since gone. The October 2026 hire pack says "We are a drinks-led cocktail bar and do not have a kitchen."

### Brixton (est. 2023), 51 Atlantic Road, SW9 8JL

- **Setting:** a railway arch on Atlantic Road, "close to the junction with Coldharbour Lane" (Brixton Buzz 2023). LCW places it "in the heart of Brixton Market".
- **Room:** the vault is lined with **glazed olive-green tiles** set in curved courses that follow the arch; uplit, they glow gold (`tempImageJ2ULKr` / `brx-003`). Below are dark walls and a low banquette.
  - **Teal-blue leather** high stools at small round tables, each with a candle in cut glass (`DSC00001-3`, their hire image).
- **Bar:** a **black marble** top with white veins (`DSC00322`, `DSC00467`, `DSC00505`). The **lit back bar** is the centrepiece: warm amber, slightly pink-lit glass shelves (`DSC08955`, `DSC08968`, `tempImageUSrFQf`).
- **Staff:** bartenders in denim aprons with terracotta leather straps.
- **Menus:** charcoal covers with a terracotta spine.
- **Sign:** gold bird sign under a single teal downlight (`brx-000`).
- **LCW, verbatim:**
  - "low-key, super sultry cocktail bar"
  - "The team here focus on classics done well and offer pared back, minimally garnished cocktails with excellent ice."
  - "The dark walls and gorgeous black marble bar top allow the back bar to be the real show stopper - with beautifully lit shelves showing off the array of bottles."
  - "If you're an ice geek, be sure to take note of the quality they have here."
- **Capacity for exclusive hire:** 60.
- **Access:** no wheelchair access (FAQ).

### Who comes when

- Both bars open from 5pm, Wednesday to Saturday only.
- Late finishes (Brixton to 2am on Fri–Sat) and "primarily a walk-in bar … encourage you to drop by on the day" (FAQ) point to people deciding on the night, often already out.
- The photos show couples and small groups at the bar (`DSC08955`), a full standing room by late evening under the Brixton vault (`DSC08968`), and outdoor drinking in Deptford Market Yard (`Philosopher.PNG`).
- Groups of 10+ may face a minimum spend. Exclusive hire is pitched for parties with outside caterers.

### Photo index (which bar)

- **Brixton:** `tempImageJ2ULKr` (tiled vault, blue stools), `DSC00322` (menu + red drink, black marble), `DSC08955` (back bar, two guests), `DSC00393-2` (coupe, black marble), `DSC00505` (pour into rocks, apron), `DSC08968` (crowd under vault, lit back bar), `tempImage5ZIJN7` (strain into coupe), `tempImageUSrFQf` (highball pour, pink back bar), `DSC00467` (green drink, black marble), `DSC00001-3` (blue stools, candles), `tempImageVtvCGR` (two coupes, black bar), `tempImagemyv89T` (orange coupe at bar), `DSC09208` (dark booth room, orange lamp, street window), hire PDF `brx-000` (gold sign), `brx-002` (blurred stools), `brx-004` (menu + yellow drink).
- **Deptford:** `DSC07440` (long bar, pendants), `IMG_3983` (green velvet banquette), `Philosopher.PNG` (station arch exterior, terrace), `IMG_6627` (entrance, sign, benches), `8DFFD2C2` (amber rocks, white marble), `DSC09480` (green coupe, white marble), `DSC00362` (salt-rim highball), `DSC00059` (two dark coupes), `3F153D4D` (clear rocks), `DSC08202` (coupe, lemon twist), `DB503BB4` (strain into coupe, gold lamp), `DSC08730` (rocks, sunlight), `DSC08301` (pour into rocks, white marble), hire PDF `dep-000` (sign on brick, olive tree), `dep-001` (coupe, white marble), `dep-004` (sour with red dust).
- I have **not** matched any photo to a named cocktail on the current menu. Several drinks pictured (the salt-rim highball, for example) don't match Edition 12's glassware, so they are probably older serves.

## Reviews

- No direct access to Google reviews.
- Aggregator (InTravel) shows Brixton at 4.9 from 121 Google reviews. I can't verify it, so it is not used.
- The only quotable third-party praise is the London Cocktail Week editorial above, used once with credit.
- Complaints: none found.

## What's weak in the current site

- **Menus:** only as landscape A4 PDFs, unreadable on a phone at the bar door.
- **Dead menu links:** the "VIEW MENU" buttons on **both** /deptford and /brixton point to April 2026 PDFs that now **404**. Only the home page links the October menus.
- **Addresses:** not on the page anywhere, only "MAP" links in the footer.
- **Hours:** only in the footer, as one line per bar, with no "open now" and no way to tell it's Tuesday and both are shut.
- **Private hire:** two 9-page PDFs, and the PDFs contradict themselves.
  - Minimum spend: the FAQ page says a flat "£2,800" while page 1 says Tue–Thu £1,800 and Fri–Sat £2,800 (Deptford) / £3,000 (Brixton).
  - Enquiry email: page 1 says brixton@ or deptford@, page 2 says hello@.
  - Every enquiry starts with a vague email, followed by back-and-forth.
- **Metadata:** empty meta description. The title is spelled "B L U E T H R O A T", so search results and screen readers spell it out. The link preview is a 300×300 logo, a small square in WhatsApp.
- **Leftovers and gaps:**
  - An empty Squarespace cart icon.
  - Gallery alt text is camera filenames, and nothing says which bar a photo is from.
  - Alcohol-free options and the Google-review ask exist only inside the PDF.
  - No Instagram handle shown, only an icon.

## Design reasoning (Step 2)

- **Palette from the room, not from "cocktail bar".**
  - Ground: near-black with a cool green cast `#0c0f0f`, the dark walls and black marble.
  - Gold `#dabf7e`, the sign leaf: the wordmark and key numbers only.
  - Slate `#4c5d67` / `#384958`, the menu glass icons and the site's one colour: lines and icons.
  - Bone `#e9e6df`, Deptford's white marble: the light surface for menu cards.
  - Amber `#eba253`, the lit back bar: the "open now" glow.
  - Two quiet accents: terracotta `#bb5f33` from the menu spines and apron straps, and tile olive `#77571a` from the Brixton vault.
- **Type:**
  - **Marcellus** (their menu serif, matches the sign) for the wordmark and display, with the wordmark set as real text with CSS tracking.
  - **Poppins** (their site font) for small caps labels, tracked like the TT Drugs headings on the menu, and UI.
  - Flavour words tracked wide, as printed.
- **Shape:** the arch. Both bars are railway arches and their line is "modern hospitality in beautiful railway arches", so photos sit in arch-topped windows and the first screen is two arches side by side, one per bar. No full-bleed hero.
- **Surface follows the bar:** with Deptford selected, menu cards sit on white-veined marble; with Brixton, on black marble with white veins, matching each real bar top.
- **Motion:** slow and soft, "nights that unfold slowly". Arches open like a vault from the springing line, the glass icons draw themselves line by line like the menu drawings, and nothing bounces.
- **Phone-first:** a bottom tab bar within thumb reach (Tonight, Menu, Visit, Hire). The first screen states which arch, open or closed, and until when, in London time.

## What the owners most want this site to do

1. **Get walk-ins to the right arch tonight.** They call themselves "primarily a walk-in bar" and print the hours on every page, so the site should say open now, how late, where exactly, and what's pouring.
2. **Turn private hire into clear, pre-qualified enquiries.** Private hire is the only reason they publish email addresses at all, so the site should replace the 9-page PDFs and the back-and-forth with a planner that shows capacity, minimum spend, the £500 fee and service, then a filled-in enquiry.
3. **Make the drinks look as serious as they are, then ask happy guests for a Google review.** That means Ari's "one of the best cocktail bars in London", LCW's "classics done well … excellent ice", and the review ask already printed on every menu.
