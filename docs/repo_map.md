# repo_map.md

## Developer Passport Portfolio — Repository Map

---

# 1. Purpose

This document provides a complete map of the repository structure for the **Developer Passport Portfolio** project.

Its purpose is to help AI coding agents and developers quickly understand:

* repository structure
* file responsibilities
* component hierarchy
* animation system layout
* asset organization

Agents should use this file to understand where code should be created or modified.

---

# 2. Root Repository Structure

The repository is organized into several main directories.

docs
src
public
config files

Example root layout:

```
/
docs
src
public
package.json
vite.config.js
tailwind.config.js
postcss.config.js
README.md
```

---

# 3. Documentation Directory

Location:

```
/docs
```

Contains all project documentation used by AI coding agents.

Files include:

```
prd.md
context.md
ui_design.md
animation.md
tasks.md
agent_instructions.md
repo_map.md
```

Optional documentation may include:

```
architecture.md
components.md
assets.md
content.md
style_guide.md
animation_map.md
deployment.md
dev_rules.md
```

Agents should read documentation before generating code.

---

# 4. Source Directory

Location:

```
/src
```

This directory contains all application code.

Structure:

```
src
 ├ components
 ├ sections
 ├ animations
 ├ hooks
 ├ assets
 ├ styles
 ├ App.jsx
 └ main.jsx
```

---

# 5. Components Directory

Location:

```
src/components
```

Contains reusable UI components used across the portfolio.

Examples:

```
PassportPage.jsx
VisaStamp.jsx
ProjectVisa.jsx
TimelineEntry.jsx
ContactStamp.jsx
Section.jsx
```

These components should be reusable and independent of page-specific logic.

---

# 6. Sections Directory

Location:

```
src/sections
```

Contains top-level sections representing passport pages.

Each section corresponds to a scroll segment.

Example structure:

```
CoverSection.jsx
IdentitySection.jsx
JourneySection.jsx
SkillsSection.jsx
ProjectsSection.jsx
ResearchSection.jsx
ExperienceSection.jsx
ContactSection.jsx
```

Each section should be implemented as an independent React component.

---

# 7. Animations Directory

Location:

```
src/animations
```

Contains GSAP animation logic.

Animation code should be separated from UI components.

Example files:

```
scrollTimeline.js
passportOpening.js
pageTransitions.js
stampAnimations.js
journeyMapAnimation.js
```

Animations should be imported by sections or hooks.

---

# 8. Hooks Directory

Location:

```
src/hooks
```

Contains custom React hooks used for:

scroll handling
animation triggers
responsive behavior

Example hooks:

```
useScrollTimeline.js
useStampAnimation.js
useResponsiveLayout.js
```

Hooks allow animations and behaviors to remain modular.

---

# 9. Assets Directory

Location:

```
src/assets
```

Contains all graphical assets.

Subdirectories include:

```
passport
stamps
icons
textures
maps
```

Example assets:

```
passport-cover.webp
passport-page.webp
stamp-approved.png
stamp-ai.png
world-map.webp
travel-path.svg
github.svg
linkedin.svg
```

Assets should be optimized and properly compressed.

---

# 10. Styles Directory

Location:

```
src/styles
```

Contains global styles.

Example files:

```
global.css
animations.css
```

Tailwind configuration is used for styling.

---

# 11. Public Directory

Location:

```
/public
```

Contains static assets served directly.

Examples:

```
favicon.ico
site-manifest.json
robots.txt
```

---

# 12. Application Entry Points

Two key files initialize the application.

---

## main.jsx

Location:

```
src/main.jsx
```

Responsibilities:

Initialize React application.

Mount root component.

Import global styles.

---

## App.jsx

Location:

```
src/App.jsx
```

Responsibilities:

Define main layout.

Load section components.

Initialize scroll container.

---

# 13. Scroll Architecture

Scrolling controls the entire user experience.

Scroll progress drives:

passport opening animation
page transitions
stamp animations
map route animations
final exit page

GSAP ScrollTrigger is used to synchronize animations with scroll progress.

---

# 14. Component Hierarchy

Example hierarchy:

```
App
 ├ CoverSection
 ├ IdentitySection
 ├ JourneySection
 ├ SkillsSection
 ├ ProjectsSection
 ├ ResearchSection
 ├ ExperienceSection
 └ ContactSection
```

Sections contain reusable components.

Example:

```
SkillsSection
 ├ VisaStamp
 ├ VisaStamp
 ├ VisaStamp
```

---

# 15. Animation Flow

Scroll segments correspond to page transitions.

Example timeline:

```
0–10%  → Passport closed
10–20% → Passport opening
20–35% → Identity page
35–50% → Journey map
50–65% → Skills stamps
65–80% → Projects
80–90% → Research & experience
90–100% → Exit visa page
```

Animations are coordinated by the master timeline.

---

# 16. Development Workflow

Typical development workflow:

1. Read documentation.
2. Implement components.
3. Implement sections.
4. Implement animation system.
5. Integrate scroll timeline.
6. Optimize performance.
7. Test responsive layouts.
8. Deploy.

Agents should follow the roadmap in **tasks.md**.

---

# 17. Deployment Targets

The project can be deployed to:

Vercel
Netlify
GitHub Pages

Production build command:

```
npm run build
```

---

# 18. Final Repository Goal

The repository should contain a clean, modular implementation of the Developer Passport Portfolio.

Developers and AI agents should be able to quickly understand:

where code belongs
how components interact
how animations are structured

This ensures the project remains maintainable and extensible.
