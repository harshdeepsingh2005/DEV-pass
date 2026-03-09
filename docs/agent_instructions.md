# agent_instructions.md

## Developer Passport Portfolio — AI Agent Instructions

---

# 1. Purpose

This document provides instructions for AI coding agents interacting with this repository.

The repository contains documentation-driven architecture for building an interactive portfolio called **Developer Passport**.

The portfolio simulates a passport that opens and reveals professional information page by page as the user scrolls.

Agents must follow the documentation files as the authoritative source of truth.

---

# 2. Documentation Priority Order

When generating code, always read the following files in this order:

1. prd.md
2. context.md
3. ui_design.md
4. animation.md
5. tasks.md

Additional supporting documents may include:

architecture.md
components.md
assets.md
content.md

These files define system behavior and must not be ignored.

---

# 3. Core Project Principles

The project follows several key principles.

1. Maintain a strong passport-themed visual identity.
2. Use scroll-driven storytelling.
3. Prioritize performance and smooth animations.
4. Keep the code modular and maintainable.
5. Avoid unnecessary complexity.

Agents should preserve these principles in all generated code.

---

# 4. Implementation Strategy

Agents must implement the project incrementally.

Follow the implementation roadmap defined in **tasks.md**.

Never skip steps.

Always complete earlier foundational tasks before generating higher-level components.

Example sequence:

Project setup
Folder structure
Base layout
Core components
Section components
Animation system
ScrollTrigger integration
Responsive design
Testing and deployment

---

# 5. Code Structure Rules

The project must follow a modular structure.

Expected directory layout:

src

components
Reusable UI components

sections
Individual passport pages

animations
GSAP animation logic

hooks
Custom hooks for animation and scroll handling

assets
Images, icons, textures

styles
Global CSS and Tailwind configuration

Agents must respect this structure when creating files.

---

# 6. Component Design Guidelines

Components should follow these rules.

Each component should have a single responsibility.

Components must be reusable.

Props should be clearly defined and typed when possible.

Avoid overly large components.

Preferred structure:

Functional React components.

Example:

Component file per UI element.

Avoid embedding complex animation logic directly inside UI components.

---

# 7. Animation Rules

Animations must follow the architecture defined in **animation.md**.

Key rules:

Use GSAP for all major animations.

Use ScrollTrigger for scroll-driven animation.

Animations should primarily use:

transform
opacity

Avoid animating layout properties such as:

width
height
top
left

Animation logic should be placed inside the animations directory.

Components should call animation hooks rather than defining animations directly.

---

# 8. UI Consistency Rules

All generated UI must respect the design system defined in **ui_design.md**.

Ensure:

consistent spacing
consistent typography
consistent color usage
consistent component styling

The UI should always resemble a passport document.

Avoid introducing unrelated design styles.

---

# 9. Asset Usage

All graphical assets must be loaded from the assets directory.

Expected asset locations:

src/assets/passport
src/assets/stamps
src/assets/icons
src/assets/maps
src/assets/textures

Large images should use WebP format.

SVG should be used for icons when possible.

Agents must not embed large image data directly into code.

---

# 10. Performance Requirements

The portfolio should remain performant even with heavy animation.

Agents should:

avoid unnecessary re-renders
minimize DOM complexity
use GPU-accelerated transforms

Animations should not cause layout thrashing.

Large images should be optimized and lazy-loaded when possible.

---

# 11. Responsive Design

The portfolio must function on:

desktop
tablet
mobile

Animations may simplify on smaller screens.

Layout should shift from grid-based to stacked layouts on mobile devices.

Agents should test responsive behavior when generating UI code.

---

# 12. Accessibility

Generated code should follow accessibility best practices.

Ensure:

semantic HTML structure
alt attributes for images
keyboard navigation support
sufficient color contrast

Animations must respect reduced-motion preferences.

---

# 13. Code Quality

Generated code must maintain high quality.

Requirements include:

clear variable names
consistent file naming
modular structure
inline comments for complex logic

Avoid unnecessary dependencies.

Avoid code duplication.

---

# 14. Error Handling

If documentation contains ambiguity, agents should:

infer reasonable behavior
preserve the passport metaphor
avoid breaking the existing architecture

Agents should prefer simple solutions over complex ones.

---

# 15. Testing

Before considering tasks complete, ensure:

components render correctly
animations trigger at correct scroll positions
external links function properly
layout adapts across screen sizes

---

# 16. Final Goal

The final result should be a polished, interactive portfolio that feels like flipping through a real passport documenting the developer’s journey.

The experience should be:

smooth
memorable
technically impressive
easy for recruiters to navigate

Agents should prioritize clarity and storytelling throughout the implementation.
