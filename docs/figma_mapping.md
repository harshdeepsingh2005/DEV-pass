# figma_mapping.md

## Developer Passport Portfolio — Figma to Code Mapping

---

# 1. Purpose

This document maps the Figma design structure to the codebase structure.

It ensures that AI agents and developers correctly translate Figma layouts into React components.

Each major Figma frame corresponds to a **React section component** in the application.

Each reusable design element corresponds to a **React UI component**.

Agents should use this mapping when converting Figma designs into code.

---

# 2. Figma File Structure

The Figma file should contain a main page named:

Developer Passport Portfolio

Within this page, frames should be organized sequentially to match the scroll narrative.

Expected frame order:

Cover
Identity
Journey
Skills
Projects
Research
Experience
Contact

Each frame should represent **one viewport section** of the website.

---

# 3. Frame to Section Mapping

Each Figma frame corresponds to a React section component.

Mapping table:

Figma Frame → React Component

Cover → CoverSection.jsx
Identity → IdentitySection.jsx
Journey → JourneySection.jsx
Skills → SkillsSection.jsx
Projects → ProjectsSection.jsx
Research → ResearchSection.jsx
Experience → ExperienceSection.jsx
Contact → ContactSection.jsx

Location of section components:

```id="qvcm9y"
src/sections/
```

Agents should generate one component per frame.

---

# 4. Component Mapping

Reusable design elements in Figma correspond to React components.

Figma Component → React Component

Visa Stamp → VisaStamp.jsx
Project Card → ProjectVisa.jsx
Timeline Entry → TimelineEntry.jsx
Contact Button → ContactStamp.jsx
Passport Page → PassportPage.jsx

Location of reusable components:

```id="5m0f1o"
src/components/
```

These components should remain reusable across multiple sections.

---

# 5. Asset Mapping

Images exported from Figma must be placed in the assets directory.

Mapping:

Figma Asset → File Location

Passport Cover → src/assets/passport/passport-cover.webp
Passport Page Texture → src/assets/textures/passport-page.webp
Visa Stamp Graphics → src/assets/stamps/
Icons → src/assets/icons/
World Map → src/assets/maps/world-map.webp
Travel Path → src/assets/maps/travel-path.svg

Agents must import assets from these directories.

---

# 6. Layout Translation Rules

When converting Figma layouts to code:

Auto Layout → Flexbox (Tailwind flex utilities)

Figma Grid → CSS Grid (Tailwind grid utilities)

Spacing values from Figma should map to Tailwind spacing scale where possible.

Example:

Figma 16px gap → Tailwind gap-4
Figma 32px gap → Tailwind gap-8

---

# 7. Typography Mapping

Fonts defined in Figma should be mapped to CSS classes.

Example:

Figma Heading → Tailwind class for Playfair Display
Figma Body Text → Tailwind class for Inter

Agents should create reusable typography classes if necessary.

---

# 8. Color Token Mapping

Colors used in Figma should be translated into Tailwind theme tokens.

Example mapping:

Passport Navy → primary background
Passport Paper → page background
Gold Accent → accent color
Stamp Red → stamp elements

Tailwind configuration should define these tokens.

---

# 9. Animation Hook Mapping

Animations referenced in Figma prototypes should map to animation files.

Examples:

Passport opening animation → passportOpening.js
Stamp drop animation → stampAnimations.js
Page transitions → pageTransitions.js
Journey map path animation → journeyMapAnimation.js

These files exist in:

```id="le33ub"
src/animations/
```

Sections should call animation hooks rather than defining animations directly.

---

# 10. Scroll Section Mapping

Scroll segments correspond to section frames.

Example mapping:

Scroll Segment → Section

0–10% → CoverSection
10–20% → Passport Opening
20–35% → IdentitySection
35–50% → JourneySection
50–65% → SkillsSection
65–80% → ProjectsSection
80–90% → ResearchSection / ExperienceSection
90–100% → ContactSection

GSAP ScrollTrigger should control transitions between these sections.

---

# 11. Export Rules for Figma Assets

Assets exported from Figma must follow these rules.

Large images → WebP format
Transparent graphics → PNG format
Icons → SVG format

Recommended export sizes:

Background images → 2048px width
Component images → 800–1200px width

All assets must be optimized before being added to the repository.

---

# 12. Naming Conventions

Figma layers should follow clear naming conventions.

Examples:

passport-cover
passport-page
visa-stamp-ai
project-card
contact-button

Avoid generic names such as:

Rectangle 1
Frame 12
Group 4

Clear naming helps AI agents generate cleaner code.

---

# 13. Frame Size

Design frames should use a standard desktop width.

Recommended:

Width: 1440px

Height: auto (scroll-based layout)

This aligns well with modern responsive design practices.

---

# 14. Responsive Mapping

When converting Figma designs to responsive layouts:

Desktop layout → multi-column grid

Tablet layout → reduced columns

Mobile layout → stacked layout

Agents should convert large horizontal layouts into vertical stacks for smaller screens.

---

# 15. Final Mapping Principle

The goal of this mapping is to ensure that the visual design in Figma translates directly into structured, maintainable React components.

Each Figma frame represents a page in the passport narrative.

Each reusable element becomes a reusable UI component.

Following this mapping ensures the codebase remains organized and consistent with the original design.
