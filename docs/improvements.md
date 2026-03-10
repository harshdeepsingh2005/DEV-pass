# DEV-pass Portfolio — Improvement Backlog

> Generated from visual audit on 10 March 2026.  
> Organized by priority: 🔴 Critical → 🟠 Visual Quality → 🟡 Polish & Authenticity

---

## 🔴 Sprint 1 — Fix the Broken

These are things that are **defined but unused**, **broken**, or make the portfolio **non-functional**.

### 1. Fix all placeholder contact URLs
**File:** `src/spreads/ContactSpread.jsx`  
All four contact links are fake:
- GitHub → `https://github.com` (should be `https://github.com/harshdeepsingh2005`)
- LinkedIn → `https://linkedin.com` (should be actual profile URL)
- Email → `mailto:hello@example.com` (should be real address)
- Download CV → `#` (should link to a real PDF with `download` attribute)

---

### 2. Apply `gold-foil` shimmer to "DEVELOPER PASSPORT" headline
**File:** `src/spreads/CoverSpread.jsx`  
The `.gold-foil` CSS class with shimmer animation is defined in `global.css` but never applied anywhere in the entire portfolio. The most prominent headline — "DEVELOPER PASSPORT" — should use it for a premium metallic effect.

---

### 3. Fix `drawPath` journey animation — it's never triggered
**File:** `src/spreads/JourneySpread.jsx` + `src/styles/global.css`  
`@keyframes drawPath` (stroke-dashoffset 1000→0) is defined in `global.css`. The `.journey-path` class sets `stroke-dasharray: 6 3` but never applies the animation. The travel path on the map should animate in when the spread enters. Fix: add `animation: drawPath 2s ease forwards` to the SVG path, or drive it via GSAP on spread entry.

---

### 4. Apply `.passport-paper` texture to spread pages
**File:** `src/components/FloatingPassport.jsx`  
The `.passport-paper` class (with ruled-line pseudo-element texture) is defined in `global.css` but never applied to the pages container inside the open passport. All page spreads currently render on a plain beige background with no texture.  
Fix: add `passport-paper` class to the pages container `div`.

---

### 5. Fix invisible photo placeholder in Identity spread
**File:** `src/spreads/IdentitySpread.jsx`  
The passport photo frame contains an SVG silhouette at `opacity-[0.15]` (navy on beige = invisible). The box reads as empty.  
Fix options:
- Add a real photo asset (headshot) to `src/assets/` and import it
- Or replace with a stylized illustrated avatar SVG at full opacity
- Minimum fix: raise the silhouette to `opacity-[0.35]` and add a "Photo" watermark-style label

---

### 6. Add the `gold-foil` animation to `global.css` (it's missing `animation` property)
**File:** `src/styles/global.css`  
The `.gold-foil` class defines `background-size: 200% auto` and the `goldShimmer` keyframes exist, but the `animation` property is never added to `.gold-foil`. Add:
```css
animation: goldShimmer 3s linear infinite;
```

---

## 🟠 Sprint 2 — Visual Quality

Improvements that significantly affect how professional and complete the portfolio looks.

### 7. Scale up typography across all spreads
**Current state:** Most body text is 10–11px, metadata labels are 6–8px, signature text is navy/40 opacity.  
**Fix:** 
- Minimum body text: 11px (`text-[11px]`)
- Minimum metadata labels: 9px (`text-[9px]`)
- Signature: increase opacity from `/40` to `/70`
- All `text-[6px]` instances should be raised to `text-[8px]` minimum

---

### 8. Increase world map visibility in JourneySpread
**File:** `src/spreads/JourneySpread.jsx`  
- World map image: `opacity-10` → raise to `opacity-[0.22]`
- Gold grid overlay: `opacity-[0.04]` → raise to `opacity-[0.08]` or remove
- Continent ellipse decorations: `opacity-[0.04]` → raise to `opacity-[0.12]` or remove entirely
- SVG viewport is cramped (130px tall for a 500px high spread) — expand to use more vertical space

---

### 9. Fix ExperienceSpread timeline — bridge the spine gap
**File:** `src/spreads/ExperienceSpread.jsx`  
The gold `w-px` vertical timeline line ends abruptly at the right edge of the left page and starts fresh on the left edge of the right page. There is no visual connection.  
Fix: add a horizontal gold hairline at the bottom of the last left entry that visually "passes through" the spine, or add a "continued →" indicator between left and right pages.

---

### 10. Add more projects to ProjectsSpread (3 → 5)
**File:** `src/spreads/ProjectsSpread.jsx`  
Currently: 2 cards on the left page, 1 card on the right page (with a large decorative stamp filling dead space).  
The right page is visually half-empty.  
Fix: add 2 more project entries. Suggested additions:
- Reinforcement Learning environment project
- Any ML pipeline / data engineering work
- Each card needs: title, 2-sentence description, 3–4 tech tags, status stamp

---

### 11. Differentiate ResearchSpread from ProjectsSpread
**File:** `src/spreads/ResearchSpread.jsx`  
Both spreads currently list the same 3 projects (CX-Twin, Urban Heat Island, HealthSphere AI). This is redundant — users see the same content twice.  
Fix for ResearchSpread right page:
- Replace generic decorative stamps ("IEEE", "Conference") with **actual publication details**: conference name, year, arXiv ID or DOI if available
- Add paper submission date and current status
- If papers are not yet published, show abstract excerpts instead of stamps

---

### 12. Add per-element stagger animations on spread entry
**File:** `src/components/FloatingPassport.jsx`  
Currently each spread fades in as a single block (`opacity: 0 → 1, x: 25 → 0`). Premium portfolios stagger individual elements.  
Fix: after each spread's `opacity` animation fires, GSAP should target children elements (titles, cards, stamps) with a `stagger: 0.08` on a secondary timeline:
```js
tl.from(spreadEl.querySelectorAll('.stagger-child'), {
  opacity: 0, y: 12, duration: 0.4, stagger: 0.08, ease: 'power2.out'
}, spreadEntryPoint + 2)
```
Add `stagger-child` class to key elements in each spread.

---

### 13. Add hover/interactive states to spread content
**Current state:** Zero hover states on projects, skills, or experience entries.  
**Files:** All spread files  
Suggested hover states:
- **Skill stamps** (`SkillsSpread`): `hover:scale-105 hover:saturate-150` transition
- **Project cards** (`ProjectsSpread`): `hover:border-gold/40 hover:bg-passport-paper-dark/60` + subtle lift
- **Experience entries** (`ExperienceSpread`): `hover:bg-black/[0.03]` + show hidden description on hover
- **Research papers** (`ResearchSpread`): `hover:border-ink-blue/30` + reveal abstract snippet

---

### 14. Add real employer/institution names to ExperienceSpread
**File:** `src/spreads/ExperienceSpread.jsx`  
Current entries say "AI Engineer – Simulation", "Graduate Research", "Data Engineer" with no organization name.  
Fix: add institution/company name below the title in a smaller font:
- 2024–Now: company name (e.g. "Self / Freelance" or actual employer)
- 2023: university name
- 2022: company name
- 2021–2020: institution names

---

### 15. Design the cover interior (back of flipped cover)
**File:** `src/components/FloatingPassport.jsx`  
The back face of the cover (visible for ~0.5s during the flip transition) is a near-blank navy plane with a 0.06 opacity emblem.  
Fix: make it a premium moment. Ideas:
- Inner border ornament (classic passport inner cover styling)
- "Issued by the Ministry of Development" type text at low opacity
- Holographic-foil style gradient (`conic-gradient` with iridescent colors)
- Gold embossed seal at 15–20% opacity with a subtle border pattern

---

## 🟡 Sprint 3 — Authenticity & Polish

Details that elevate the portfolio from "good" to "portfolio-quality".

### 16. Add MRZ (Machine Readable Zone) to IdentitySpread
**File:** `src/spreads/IdentitySpread.jsx`  
Real passports have a two-line MRZ at the bottom of the data page. Adding a fake but plausible MRZ dramatically increases authenticity.  
Example:
```
P<IND<<SINGH<<HARSHDEEP<<<<<<<<<<<<<<<<<<<<<
A1234567<6IND9901019M3012310<<<<<<<<<<<<<<02
```
Style: `font-stamp text-[7px] tracking-[0.2em] text-dark-gray/25` — just visible enough to be noticed.

---

### 17. Use brand colors for contact buttons
**File:** `src/spreads/ContactSpread.jsx`  
Currently GitHub and LinkedIn both use `ink-blue (#1E3A8A)`. They should use brand colors:
- GitHub: `#24292e` (near-black)
- LinkedIn: `#0077B5`
- Email: `#B22222` (keep stamp-red — appropriate)
- Download CV: `#B22222` (keep stamp-red)

---

### 18. Add spread name labels to progress indicator dots
**File:** `src/components/FloatingPassport.jsx`  
The 7 navigation dots at the bottom have no labels. A user 6 spreads in has no idea what section they're viewing.  
Fix: add a `title` attribute tooltip, OR show a small spread name above/below the dots when `coverOpen` is true:
```jsx
const spreadNames = ['Identity', 'Skills', 'Projects', 'Journey', 'Research', 'Experience', 'Exit Visa']
```
Display the `spreadNames[activeSpread]` label in font-stamp above the dots.

---

### 19. Add skill proficiency hierarchy to SkillsSpread
**File:** `src/spreads/SkillsSpread.jsx`  
All 8 skill stamps have identical visual weight. Python and TensorFlow look the same as React.  
Fix: differentiate by stamp size:
- **Primary skills** (Python, ML, TensorFlow, RL): larger stamps (`text-[9px]`, `px-4 py-2.5`)
- **Secondary skills** (React, Django, Data Engineering): standard stamps
- **Tertiary** (others): smaller, lighter stamps with reduced opacity

---

### 20. Add geographic/institutional detail to JourneySpread
**File:** `src/spreads/JourneySpread.jsx`  
Journey milestones are: "B.Tech CS (2020)", "First ML Project (2021)", "Data Engineer (2022)", "ML Research (2023)", "RL Engine (2023)", "Grad Studies (2024)".  
None include city, university, or company name.  
Fix: add a second line below each milestone label in 6px with the institution/city name.

---

### 21. Improve SVG signature in IdentitySpread
**File:** `src/spreads/IdentitySpread.jsx`  
The "signature" is just `font-heading italic` text — "Harshdeep Singh" in navy/40.  
Fix options (best to least):
- Export an actual hand-drawn signature as an SVG path
- Use a Google Font specifically chosen for cursive signature feel (e.g. "Dancing Script", "Great Vibes")
- Minimum: increase opacity to `/70` and add a thin underline

---

### 22. Improve JourneySpread path from straight segments to curves
**File:** `src/spreads/JourneySpread.jsx`  
The travel route uses straight `L` commands between milestones, producing a jagged multi-segment line.  
Fix: replace `L x y` with `C x1 y1 x2 y2 x y` (cubic bezier) for a smooth geographic route feel. The control points should arc gently upward between milestones.

---

### 23. Fix `mix-blend-mode: multiply` scope
**File:** `src/styles/global.css`  
`.stamp-effect` applies `mix-blend-mode: multiply` globally. This causes color degradation when:
- Stamps overlap each other (both darken multiplicatively)
- When parent has `opacity < 1` (GSAP during transitions — multiply on semi-transparent parent fails)
- On dark backgrounds (multiply darkens toward black)

Fix: remove `mix-blend-mode: multiply` from `.stamp-effect` and apply it selectively only to the stamp's inner content layer, not the container.

---

### 24. Fix canvas `shadowBlur` performance in ParticleBackground
**File:** `src/components/ParticleBackground.jsx`  
Setting `ctx.shadowBlur = 8` and `ctx.shadowColor` for each of 55 particles every frame (60fps) = 3,300 shadow render calls per second.  
Fix: batch the glow effect — render all particles to an offscreen canvas, then apply a single `filter: blur(4px)` CSS on the canvas element for the glow, keeping per-frame canvas ops to simple `arc` + `fill`.

---

### 25. Add gold particle variant to ParticleBackground
**File:** `src/components/ParticleBackground.jsx`  
All 55 particles are white. A 10–15% gold variant (`rgba(212, 175, 55, alpha)`) would tie particles to the passport gold color system.  
Fix: when initializing particles, randomly assign ~8 particles a `gold: true` flag, then use `rgba(212,175,55,…)` for those particles' fill and shadow color.

---

### 26. Add keyboard navigation for spreads
**File:** `src/components/FloatingPassport.jsx`  
The entire portfolio is scroll-only with no keyboard navigation.  
Fix: add a `keydown` event listener for `ArrowRight` / `ArrowLeft` to jump to the next/previous spread by programmatically scrolling to the correct scroll position corresponding to each spread's timeline percentage.

---

### 27. Add section name display with active spread
**File:** `src/components/FloatingPassport.jsx`  
When the passport is open, show the current spread name as a small label (e.g. "SKILLS — Page 03 of 07") in font-stamp at the top or bottom of the passport. This improves orientation inside the book.

---

### 28. Fix CSS width transition vs GSAP cover flip conflict
**File:** `src/components/FloatingPassport.jsx`  
The cover element uses both a CSS `transition: 'width 0.7s cubic-bezier...'` AND GSAP `rotationY`. Two animation systems are fighting for control of the same element. The width shrink from 100%→50% happens via CSS `coverOpen` state toggle, while rotation is GSAP-driven. These are not in sync.  
Fix: remove the CSS width transition and drive the cover width change via GSAP in the master timeline at the same time as the rotation.

---

### 29. Add page number watermarks to each spread
**Files:** All spread files  
Real passports number every page. Each spread should have a subtle `P 01` – `P 14` style page number in font-stamp at `text-[7px] opacity-[0.2]` in the bottom outer corner of each page. Most spreads already have this partially (e.g. ResearchSpread has "P 07"), but it should be consistent across all spreads.

---

### 30. Improve cover emblem SVG
**File:** `src/spreads/CoverSpread.jsx`  
The current emblem is two concentric circles with a crosshair — completely generic.  
Fix: replace with a more passport-authentic emblem:
- Laurel wreath outline (SVG paths)
- Central shield or code bracket symbol (`</>`) 
- Stars or other decorative elements
- Keep the same gold color scheme, increase to 60–70% opacity

---

## Summary Table

| # | Item | File | Priority |
|---|------|------|----------|
| 1 | Fix placeholder contact URLs | ContactSpread | 🔴 |
| 2 | Apply `gold-foil` to cover headline | CoverSpread | 🔴 |
| 3 | Fix `drawPath` journey animation | JourneySpread + global.css | 🔴 |
| 4 | Apply `.passport-paper` texture to pages | FloatingPassport | 🔴 |
| 5 | Fix invisible photo placeholder | IdentitySpread | 🔴 |
| 6 | Add `animation` to `.gold-foil` class | global.css | 🔴 |
| 7 | Scale up typography (min 11px body, 9px meta) | All spreads | 🟠 |
| 8 | Increase world map opacity (0.10 → 0.22) | JourneySpread | 🟠 |
| 9 | Bridge timeline gap across spine | ExperienceSpread | 🟠 |
| 10 | Add 2 more projects (3 → 5) | ProjectsSpread | 🟠 |
| 11 | Differentiate Research from Projects content | ResearchSpread | 🟠 |
| 12 | Add per-element stagger animations | FloatingPassport + spreads | 🟠 |
| 13 | Add hover states to spread content | All spreads | 🟠 |
| 14 | Add employer/institution names | ExperienceSpread | 🟠 |
| 15 | Design the cover interior face | FloatingPassport | 🟠 |
| 16 | Add MRZ to Identity page | IdentitySpread | 🟡 |
| 17 | Brand colors for GitHub/LinkedIn buttons | ContactSpread | 🟡 |
| 18 | Add spread name label near progress dots | FloatingPassport | 🟡 |
| 19 | Skill proficiency size hierarchy | SkillsSpread | 🟡 |
| 20 | Add institution names to journey milestones | JourneySpread | 🟡 |
| 21 | Improve SVG signature | IdentitySpread | 🟡 |
| 22 | Bezier curves for journey path | JourneySpread | 🟡 |
| 23 | Fix `mix-blend-mode: multiply` scope | global.css | 🟡 |
| 24 | Fix canvas shadowBlur performance | ParticleBackground | 🟡 |
| 25 | Add gold particle variant | ParticleBackground | 🟡 |
| 26 | Add keyboard navigation (← →) | FloatingPassport | 🟡 |
| 27 | Show active spread name in passport | FloatingPassport | 🟡 |
| 28 | Remove CSS width transition vs GSAP conflict | FloatingPassport | 🟡 |
| 29 | Consistent page number watermarks | All spreads | 🟡 |
| 30 | Improve cover emblem SVG | CoverSpread | 🟡 |
