# PRD: Birthday Wishing Website for Devanshi

**Type:** Static, 2-page website
**Build tool:** Google Antigravity
**Stack:** HTML, CSS, vanilla JavaScript (optional: `canvas-confetti`)
**Audience:** Devanshi, mostly on a phone

---

## 1. Summary

Exactly **two pages**:

| Page | File | What it shows |
|------|------|---------------|
| Page 1 | `index.html` | Birthday cake with candles and the wish **"Happy Birthday Devanshi"** |
| Page 2 | `letter.html` | A sealed envelope that opens to reveal a letter |

**Flow:** Devanshi opens the link, sees the cake, blows out the candles, celebrates, taps "Open your letter", and reads the letter.

## 2. Goals and Non-Goals

**Goals:** Feel personal and handmade, work smoothly on a phone, load fast, and make her smile within 10 seconds.
**Non-goals:** No backend, no login, no extra pages.

## 3. Folder Structure

```
birthday-site/
├── index.html
├── letter.html
├── css/   (base.css, cake.css, letter.css)
├── js/    (cake.js, letter.js, shared.js)
├── assets/ (audio, images, fonts)
└── PRD_Birthday_Website.md
```

---

## 4. Phases

Complete and check one phase before starting the next.

### Phase 0: Planning and Setup
**Goal:** Lock the direction and create the empty project.
- Choose the mood (pastel, dreamy night, or cozy), a 4 to 5 color palette, and two fonts (one handwritten, one clean).
- Collect the assets: song (mp3), optional photo, and your letter draft.
- Create the project in Antigravity, add this PRD to the root, create the folder structure, and make the first Git commit.

**Done when:** Palette, fonts and assets are decided, and the folder structure exists.

### Phase 1: Foundation (Both Pages)
**Goal:** Two linked pages sharing one look.
- Create `index.html` and `letter.html` with the viewport meta tag, title and favicon.
- In `base.css`, define color variables, fonts, a CSS reset, a centered full-height layout and a reusable button style.
- Add a placeholder button on page 1 linking to page 2, and a back link on page 2.

**Done when:** Both pages open, look consistent, and link to each other.

### Phase 2: Page 1 Visuals (Cake and Wish)
**Goal:** A beautiful cake page.
- Layout from top to bottom: headline, cake, hint text, hidden button.
- Build the cake in inline SVG or CSS: 2 to 3 tiers, frosting, sprinkles and a plate.
- Add candles with flickering flames (CSS keyframes) and a soft glow.
- Animate the headline **"Happy Birthday Devanshi"** on load (letter-by-letter fade or gentle bounce), with plain text if `prefers-reduced-motion` is on.
- Add a few slow floating stars or hearts in the background (about 15 to 25 maximum).

**Done when:** The cake and headline look great on phone and desktop, and fit in one screen height.

### Phase 3: Page 1 Interaction (Blow Out and Celebrate)
**Goal:** The wish moment.
- Tap the candles or a "Blow" button to put out the flames one by one, with a small smoke wisp.
- Optional: microphone blow detection, always keeping the tap fallback.
- When the last candle goes out, fire confetti and release floating balloons or stars, then change the hint to "Your wish is on its way ✨".
- Reveal the **"Open your letter 💌"** button with a fade or pop, and navigate to page 2 with a smooth fade.
- Add a music toggle (starts only after the first tap), and remember its state across pages with `sessionStorage`.

**Done when:** The full flow, from tapping to arriving on page 2, works on iPhone and Android.

### Phase 4: Page 2 Visuals (Envelope and Letter)
**Goal:** The envelope scene and the letter.
- Build a closed envelope (CSS or SVG) with a wax seal or heart sticker and a "Tap to open" hint.
- Make the letter paper: cream background, handwritten font, soft shadow, scrollable if long.
- Write the letter (about 120 to 200 words): greeting, a favorite memory, what she means to you, a wish for her year, and a sign-off. Keep the text in one easy-to-edit block.
- Optional: a polaroid photo (compressed under 200 KB) tucked in the envelope.

**Done when:** The closed envelope and the finished letter both display well at all sizes.

### Phase 5: Page 2 Interaction (Open and Reveal)
**Goal:** A satisfying reveal.
- On tap: the seal breaks, the flap opens, and the letter slides up and scales into view (CSS transitions or GSAP).
- Reveal the letter text with a typewriter or line-by-line fade.
- After it opens, add floating hearts or sparkles.
- Add a **"Replay 🎂"** button that goes back to page 1.

**Done when:** The envelope opens smoothly, the letter is readable, and replay works.

### Phase 6: Polish, Testing and Launch
**Goal:** Ship it.
- **Responsive:** test at 320, 375, 414, 768 and 1280 px; no horizontal scroll or cut-off elements.
- **Accessibility:** alt text, aria-labels, good contrast, keyboard support (Enter and Space), reduced-motion support.
- **Performance:** compress images and audio, aim for under 2 MB per page.
- **Testing:** have the Antigravity browser agent click through the full flow and report bugs; check Chrome, Safari (iPhone) and Android.
- **Content check:** confirm the spelling of "Devanshi" everywhere and re-read the letter.
- **Deploy:** push to GitHub, deploy on Vercel, Netlify or GitHub Pages, and use a clean URL. Test the live link on a phone, then send it at the planned time.

**Done when:** The live link works end to end on a real phone with no console errors.

---

## 5. Final Checklist

- [ ] Page 1 shows the cake and "Happy Birthday Devanshi"
- [ ] Candles flicker and can be blown out
- [ ] Confetti and floating elements play after the wish
- [ ] "Open your letter" leads to page 2
- [ ] Envelope opens smoothly and the letter is readable
- [ ] Music toggle works across both pages
- [ ] Works on phone and desktop
- [ ] Deployed and tested on a real phone

## 6. Risks

| Risk | Fix |
|------|-----|
| Audio autoplay blocked | Start music only after a tap |
| Microphone permission denied | Keep the tap-to-blow fallback |
| Animation lag on old phones | Limit particles, use CSS transforms |
| Mobile address bar changes height | Use `dvh` and test on a real phone |

## 7. Antigravity Prompt Pattern

> "Read `PRD_Birthday_Website.md`. Complete **Phase N** only. Do not start the next phase. When done, open the site in the browser, verify the 'Done when' check, and summarize what changed."
