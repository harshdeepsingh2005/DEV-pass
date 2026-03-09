# animation.md

## Developer Passport Portfolio — Animation Architecture

---

# 1. Animation Philosophy

Animations in the Developer Passport Portfolio are designed to reinforce the central metaphor of exploring a passport.

Animations should feel:

smooth
intentional
responsive to scrolling
cinematic but subtle

Animations must never distract from the content.

Performance and smooth scrolling should always take priority over visual complexity.

---

# 2. Animation Engine

The animation system uses the following libraries:

GSAP
GSAP ScrollTrigger

Optional micro-interactions may use:

Framer Motion

GSAP is used because it provides reliable scroll-driven timelines and high performance animation.

---

# 3. Scroll Driven Architecture

The entire site is controlled by scroll position.

A single master timeline should be created that synchronizes section animations.

Scroll segments correspond to passport pages.

Example scroll segments:

0% – 10%
Passport closed

10% – 20%
Passport opening animation

20% – 35%
Identity page reveal

35% – 50%
Journey map animation

50% – 65%
Skills stamps appear

65% – 80%
Projects page reveal

80% – 90%
Research and experience

90% – 100%
Exit visa page

Scroll progress should drive animation progress.

---

# 4. Passport Opening Animation

Initial state:

Closed passport visible at center of screen.

Animation steps:

1. slight tilt on scroll start
2. passport rotates on Y axis
3. front cover opens
4. inner pages become visible

Recommended animation properties:

rotationY
transform perspective
scale

Duration should feel natural and responsive.

---

# 5. Page Transition Animation

Each passport page appears as the user scrolls.

Page transitions should feel like flipping pages.

Animation pattern:

current page fades out slightly
next page slides or rotates into view

Use transforms instead of layout changes.

Recommended properties:

translateX
translateY
opacity
rotationY

Avoid expensive layout recalculations.

---

# 6. Identity Page Animation

When the identity page appears:

profile photo fades in
identity fields slide upward
signature fades in last

Animation sequence:

photo
text
signature

Each element should appear sequentially.

---

# 7. Journey Map Animation

The journey page contains a world map with a travel route.

Animation sequence:

map fades in
travel path draws across map
milestone markers appear

The path should animate using SVG stroke animation.

Technique:

stroke-dasharray
stroke-dashoffset

Markers should appear as small pop-in animations.

---

# 8. Skill Stamp Animation

Skills appear as stamp graphics.

Animation style:

stamp drops onto page
slight rotation
ink spread effect

Sequence:

scale from 0 to 1
rotation from slight angle
opacity fade in

Timing should simulate stamping a passport.

Stamps should appear sequentially across the grid.

---

# 9. Project Visa Animation

Project cards appear as visa labels.

Animation pattern:

cards slide upward
opacity fades in
slight scale effect

Cards should animate individually as they enter the viewport.

---

# 10. Research Section Animation

Research entries should appear sequentially.

Animation pattern:

fade in
slight upward motion

Entries should appear one after another.

---

# 11. Experience Timeline Animation

Timeline entries animate as stamps across the passport page.

Animation pattern:

stamp drop effect
small bounce

Entries should appear based on scroll position.

---

# 12. Exit Visa Animation

The final section represents an exit visa.

Animation sequence:

background becomes brighter
exit stamp appears
contact buttons animate into place

Buttons should scale slightly on hover.

---

# 13. Micro Interactions

Small interactions should enhance the UI.

Examples include:

button hover scaling
stamp hover rotation
link hover underline animations

These should be subtle.

---

# 14. Mobile Animation Adjustments

Animations should be simplified on smaller devices.

Possible adjustments:

disable heavy page flip rotations
use simple fade transitions
reduce animation durations

The narrative flow must remain intact.

---

# 15. Performance Rules

Animations must follow these rules:

use GPU-friendly transforms
avoid animating layout properties
avoid animating large DOM trees

Preferred animated properties:

transform
opacity

Avoid animating:

width
height
top
left

---

# 16. Reduced Motion Support

Users who prefer reduced motion should see simplified animations.

When reduced motion is enabled:

page transitions become simple fades
stamp animations become instant appearance

Respect browser reduced motion settings.

---

# 17. Animation Code Structure

Animation logic should be stored separately from UI components.

Recommended structure:

src/animations

passportOpening.js
pageTransitions.js
stampAnimations.js
scrollTimeline.js

Components should import animation hooks rather than containing animation logic directly.

---

# 18. Master Scroll Timeline

The master timeline coordinates all animations.

Example flow:

create GSAP timeline
attach ScrollTrigger
define keyframes for each section

The timeline should be easy to adjust as new sections are added.

---

# 19. Debugging Tools

During development:

enable ScrollTrigger markers
test scroll breakpoints
verify animation performance

Markers should be disabled in production builds.

---

# 20. Final Animation Goal

The animation system should create the illusion that the user is flipping through a real passport documenting the developer's professional journey.

Animations should guide the user through the story rather than overwhelm them.
