# context.md

## Developer Passport Portfolio — System Context

---

# 1. Project Context

This repository contains the implementation of an interactive personal portfolio website called **Developer Passport**.

The portfolio is designed as a storytelling interface that mimics a real-world passport.

As users scroll through the page, they explore multiple "passport pages" that reveal the developer's identity, skills, projects, research, and professional journey.

Instead of a traditional static portfolio layout, this project uses **scroll-driven animation and visual metaphors** to represent the developer’s professional profile.

The portfolio must be visually distinctive while still maintaining clarity and usability.

---

# 2. Developer Profile

The portfolio represents a developer with a strong focus on:

Artificial Intelligence
Machine Learning
Reinforcement Learning
Data Science
Simulation Systems
Applied AI Engineering

The developer builds complex AI-driven systems and research-oriented projects.

---

# 3. Example Work Represented in Portfolio

Projects that may appear in the portfolio include:

### CX-Twin

An AI-powered customer experience simulation engine using reinforcement learning.

Key features:

* Deep Q-Network agents
* stochastic customer behavior modeling
* dynamic reward structures
* customer journey prediction

---

### Urban Heat Island Prediction System

A machine learning system designed to predict urban heat island intensity using satellite and geospatial data.

Key features:

* MODIS satellite data
* XGBoost modeling
* temperature anomaly prediction
* geospatial analysis

---

### HealthSphere AI

An AI-driven healthcare decision-support system designed to predict patient risk and guide medical triage.

Key features:

* predictive health risk modeling
* patient journey simulation
* explainable AI outputs
* integrated analytics dashboard

---

# 4. Portfolio Narrative Structure

The portfolio uses a **passport metaphor** to structure the developer's story.

Each section corresponds to a passport page.

Typical sequence:

1. Passport cover
2. Identity page
3. Journey map
4. Skills visa page
5. Projects visa page
6. Research page
7. Experience page
8. Exit visa / contact page

The user navigates this journey through scrolling.

---

# 5. Design Philosophy

The design should follow these principles:

Minimalism
Strong thematic consistency
Smooth motion
Readable content hierarchy
Immersive storytelling

Visual inspiration comes from:

* travel documents
* passport stamps
* immigration visas
* map travel routes

---

# 6. Visual Asset Context

Assets used by the project are primarily created in Figma.

Assets may include:

Passport cover textures
Passport paper backgrounds
Visa stamp graphics
Project visa cards
Travel map illustrations
Profile photo frame
Icons

Asset formats:

WebP for large images
PNG for transparent graphics
SVG for icons and vector shapes

---

# 7. Animation Philosophy

Animations should enhance storytelling.

Animations should:

* be smooth
* feel intentional
* reinforce the passport metaphor

Avoid overly complex animations that distract from the content.

Animations must remain performant on modern browsers.

---

# 8. Scroll Interaction Model

Scrolling drives the entire experience.

The scroll position controls:

passport opening animation
page transitions
stamp animations
map path animations
final exit page reveal

Animations should be tied to scroll progress using GSAP ScrollTrigger.

---

# 9. Technology Context

The project uses the following technology stack.

Frontend Framework:
React

Build Tool:
Vite

Styling System:
Tailwind CSS

Animation Library:
GSAP
ScrollTrigger

Optional Micro-Interactions:
Framer Motion

Icons:
SVG icon libraries

Assets:
Figma exported graphics

---

# 10. Code Architecture Context

The project should maintain a clean modular structure.

Recommended folder structure:

src

components
reusable UI components

sections
individual passport pages

animations
GSAP animation logic

hooks
custom hooks for scroll interactions

assets
images and icons

styles
global styling

---

# 11. Expected User Journey

When a user visits the portfolio:

1. They see a closed passport.
2. Scrolling opens the passport.
3. Each scroll segment reveals a new passport page.
4. The user explores the developer's journey.
5. The final page contains links to external profiles.

The experience should feel like flipping through a real passport.

---

# 12. Performance Considerations

To maintain performance:

images must be optimized
animations must avoid layout thrashing
large assets should be lazy-loaded

Scroll-based animations should use efficient GPU-friendly transforms.

---

# 13. Developer Experience

The codebase should be structured for maintainability.

The project should support:

clear component separation
readable animation timelines
easy asset replacement
future expansion

The goal is to produce a portfolio that is both visually impressive and technically clean.

---

# 14. Agent Behavior Expectations

When generating code, the coding agent should:

respect the design metaphor
prioritize smooth animation
avoid unnecessary complexity
maintain readable code

All implementation should follow the instructions defined in:

prd.md
ui_design.md
animation.md
tasks.md

These documents together define the full project architecture.
