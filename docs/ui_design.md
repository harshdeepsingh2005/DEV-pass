# ui_design.md

## Developer Passport Portfolio — UI Design Specification

---

# 1. Design Overview

The Developer Passport Portfolio uses a visual theme inspired by real-world passports and travel documents.

The UI should feel like a physical passport being opened and explored page by page.

Design elements should evoke:

passport paper
visa stamps
travel routes
immigration markings
document textures

The interface should be modern, minimal, and highly readable while preserving the passport theme.

---

# 2. Layout System

The site follows a **scroll narrative layout**.

Each scroll segment corresponds to a passport page.

Each page is implemented as a full viewport section.

Standard section size:

Height: 100vh
Width: 100%

Sections should remain centered within the viewport.

---

# 3. Grid System

Use a **12-column responsive grid**.

Recommended maximum content width:

1200px

Spacing rules:

Section padding:

Top: 80px
Bottom: 80px
Left: 40px
Right: 40px

Component spacing:

Small gap: 8px
Medium gap: 16px
Large gap: 32px
Section gap: 64px

---

# 4. Color System

Primary colors should match passport and travel aesthetics.

Primary Background

Deep Passport Navy
HEX: #0B1D3A

Secondary Background

Passport Paper White
HEX: #F5F1E8

Accent Colors

Gold Accent
HEX: #D4AF37

Stamp Red
HEX: #B22222

Secondary Accent

Ink Blue
HEX: #1E3A8A

Neutral Text

Dark Gray
HEX: #333333

---

# 5. Typography

Typography should resemble travel documents but remain modern.

Primary Heading Font

Playfair Display

Used for:

page titles
section headers
important labels

---

Body Font

Inter

Used for:

descriptions
paragraph text
project summaries

---

Stamp Font

Special Elite

Used for:

visa stamps
immigration labels
passport markings

---

Font sizes

Hero Title

48px

Section Title

36px

Subheading

24px

Body Text

16px

Caption

14px

---

# 6. Component System

The interface should use reusable components.

---

## PassportPage Component

Represents a single passport page.

Structure

Container
Header
Content Area
Footer

Each page should visually resemble passport paper.

Background should use passport texture assets.

---

## VisaStamp Component

Represents skills or approvals.

Shape

Circular stamp

Properties

text label
color
rotation
scale animation

Common stamps include

APPROVED
AI SYSTEM
PROJECT VISA
RESEARCH VISA
HACKATHON ENTRY

---

## ProjectVisa Component

Represents a project entry.

Structure

Title
Short description
Technology list
Optional link button

Design should resemble a visa label or immigration entry.

---

## SkillStamp Component

Represents a technical skill.

Example skills

Python
Machine Learning
Reinforcement Learning
Django
React
Data Engineering

Each skill appears as a stamp graphic.

---

## TimelineEntry Component

Used in the experience section.

Structure

year
title
description

Entries should resemble immigration checkpoints.

---

## ContactStamp Component

Used in the final section.

Buttons styled as visa stamps.

Examples

GitHub
LinkedIn
Download CV
Email

---

# 7. Page Design Specifications

---

## Cover Page

Displays a closed passport.

Center aligned layout.

Elements

Passport graphic
Developer name
Title text

Example text

Developer Passport
Harshdeep Singh
AI / Machine Learning Engineer

Background should be dark.

---

## Identity Page

Layout

Left side

profile photo

Right side

identity information

Fields

Name
Specialization
Focus areas
Short description

A digital signature appears at the bottom.

---

## Journey Page

Background

world map

Foreground

animated travel path

Milestones appear as markers along the path.

---

## Skills Page

Layout

grid of stamp elements.

Recommended grid

3 columns desktop
2 columns tablet
1 column mobile

Each stamp represents a skill.

---

## Projects Page

Projects appear as visa cards.

Cards arranged in grid layout.

Each card includes

project title
short summary
technology tags

---

## Research Page

List layout.

Each entry contains

paper title
description
status

Optional link to repository or paper.

---

## Experience Page

Vertical timeline layout.

Each entry appears as an immigration stamp across the page.

---

## Contact Page

Final page acts as an exit visa.

Layout

center aligned.

Buttons styled as stamps.

Examples

GitHub
LinkedIn
Download CV
Email

---

# 8. Icon System

Icons should be minimal and monochrome.

Use SVG icons.

Example icons

GitHub
LinkedIn
Email
Download

Icons should scale cleanly across resolutions.

---

# 9. Asset Usage

Assets are stored in:

src/assets

Subfolders

passport
stamps
icons
textures
maps

Large images must use WebP format.

---

# 10. Responsive Design Rules

Desktop

Full animation experience.

Tablet

Reduced spacing.

Mobile

Simplified animations.

Stacks replace multi-column layouts.

---

# 11. Accessibility

Ensure:

text contrast meets accessibility guidelines
images have alt text
navigation remains keyboard accessible

Animations should support reduced motion preferences.

---

# 12. UI Consistency Rules

All sections should maintain:

consistent spacing
consistent typography
consistent passport theme

Avoid mixing unrelated design styles.

The UI should always feel like part of a passport document.
