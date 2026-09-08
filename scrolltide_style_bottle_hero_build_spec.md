# SCROLLTIDE-STYLE "BOTTLE" HERO — COMPLETE BUILD SPECIFICATION

## 1. Goal

Build a premium, editorial 3D product hero inspired by the visual concept of Scrolltide's **Bottle** template:

> Acid-green display typography fills the viewport while a product bottle rotates slowly through and between the oversized letters.

This is an **original implementation** of the visual idea. Do not copy Scrolltide's source code, proprietary prompts, exact assets, logos, or exact typography. Recreate the interaction and design language from scratch.

The final result should feel like a high-end creative studio / fashion / beverage / fragrance website.

---

# 2. Core Visual Direction

## Overall mood

- Experimental
- Loud
- Editorial
- Minimal but dramatic
- Premium
- Fashion-art-direction inspired
- High contrast
- 3D product photography feel
- Almost poster-like
- Extremely smooth motion

## Main visual

The viewport is dominated by gigantic acid-green typography.

Example:

    BOTT
    LE

or:

    DRINK
    LOUD

The letters should be so large that portions naturally leave the viewport.

A 3D bottle sits in the center of the composition.

The bottle:

- rotates slowly around its Y axis
- has realistic glass/plastic/metallic material
- catches highlights
- has a visible label
- sits visually between the typography layers
- slightly floats vertically
- reacts subtly to scroll
- should feel physically present rather than like a flat image

The typography should feel like it is behind and/or around the bottle.

---

# 3. Recommended Tech Stack

Use only freely available/open-source libraries.

## Required

- React
- Vite
- JavaScript or TypeScript
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Three.js
- @react-three/fiber
- @react-three/drei

## Optional

- Lenis for smooth scrolling
- React Icons
- postprocessing

## Installation

```bash
npm create vite@latest bottle-hero -- --template react
cd bottle-hero

npm install
npm install gsap three @react-three/fiber @react-three/drei
npm install lenis
npm install -D tailwindcss @tailwindcss/vite
```

If Tailwind configuration differs because of the installed version, follow the current Vite/Tailwind setup.

---

# 4. Project Structure

Create this structure:

```text
bottle-hero/
│
├── public/
│   ├── models/
│   │   └── bottle.glb
│   │
│   ├── textures/
│   │   ├── bottle-label.jpg
│   │   └── bottle-normal.jpg
│   │
│   └── fonts/
│       └── display-font.woff2
│
├── src/
│   │
│   ├── components/
│   │   ├── BottleScene.jsx
│   │   ├── BottleModel.jsx
│   │   ├── HeroTypography.jsx
│   │   ├── ScrollBottle.jsx
│   │   ├── GrainOverlay.jsx
│   │   ├── Navigation.jsx
│   │   ├── IntroSection.jsx
│   │   └── ProductDetails.jsx
│   │
│   ├── hooks/
│   │   ├── useLenis.js
│   │   └── useScrollProgress.js
│   │
│   ├── lib/
│   │   ├── animations.js
│   │   └── constants.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
└── README.md
```

---

# 5. Page Architecture

The page should contain these sections:

```text
PAGE
│
├── Fixed / Floating Navigation
│
├── HERO
│   ├── Giant Typography
│   ├── 3D Bottle
│   ├── Small Product Metadata
│   ├── Scroll Indicator
│   └── Grain / Texture
│
├── STORY SECTION
│   ├── Large statement
│   └── Product transition
│
├── PRODUCT DETAIL SECTION
│   ├── Bottle close-up
│   ├── Ingredients / information
│   └── Editorial typography
│
├── SECONDARY 3D SECTION
│   └── Bottle rotation / alternate angle
│
└── FINAL CTA
```

The HERO is the most important part.

---

# 6. Hero Layout

The hero must occupy at least:

```css
min-height: 100svh;
height: 100vh;
```

Recommended layout:

```text
┌───────────────────────────────────────────────┐
│ LOGO                         MENU              │
│                                               │
│                                               │
│       B O T T          ← huge letters         │
│       L E                                      │
│                      ╭──────╮                  │
│                      │ BOTT │                  │
│                      │ LE   │                  │
│                      ╰──────╯                  │
│                                               │
│       PRODUCT / 01                 ↓ SCROLL   │
└───────────────────────────────────────────────┘
```

The bottle should overlap the typography.

---

# 7. Color System

Use a very limited palette.

```css
:root {
  --acid: #B7FF00;
  --black: #050505;
  --white: #F5F5F0;
  --gray: #858585;
}
```

Primary hero:

```css
background: #050505;
color: #B7FF00;
```

Do not use many colors.

The acid green should dominate.

---

# 8. Typography

The display type must be:

- extremely bold
- condensed if possible
- uppercase
- tight tracking
- oversized
- aggressive
- editorial

Recommended free fonts:

- Bebas Neue
- Anton
- Archivo Black
- Space Grotesk
- Oswald

If a suitable local font is available, allow it through:

```css
@font-face {
  font-family: "Display";
  src: url("/fonts/display-font.woff2") format("woff2");
  font-display: swap;
}
```

Typography sizing:

```css
.hero-title {
  font-size: clamp(7rem, 20vw, 25rem);
  line-height: 0.78;
  letter-spacing: -0.07em;
  font-weight: 900;
}
```

Important:

The text should not simply fit inside the screen.

It should intentionally overflow.

---

# 9. Typography Layering

Create separate layers:

```text
Layer 1
background

Layer 2
back typography

Layer 3
3D bottle

Layer 4
front typography fragments

Layer 5
UI
```

Use CSS `z-index`.

Example:

```text
background             z-index: 0
back text               z-index: 1
bottle                  z-index: 5
front text              z-index: 10
navigation              z-index: 30
```

This creates the illusion that the bottle is traveling through the letters.

---

# 10. Bottle Model

Use a `.glb` or `.gltf` 3D model.

Example:

```text
public/models/bottle.glb
```

Load it with:

```jsx
useGLTF("/models/bottle.glb")
```

Do not hard-code the entire model geometry if a proper GLB asset is available.

The component should support:

- rotation
- scale
- position
- material adjustment
- environment lighting

---

# 11. Bottle Material

The bottle should look premium.

For glass:

```jsx
<meshPhysicalMaterial
  transmission={0.85}
  roughness={0.12}
  thickness={0.8}
  ior={1.45}
  clearcoat={0.8}
/>
```

For plastic:

```jsx
<meshPhysicalMaterial
  roughness={0.25}
  metalness={0.05}
  clearcoat={0.5}
/>
```

Adjust according to the actual model.

The label should remain readable.

---

# 12. Lighting

Use dramatic studio lighting.

Suggested setup:

```text
Large Area Light
        ↓

       BOTTLE

Rim Light ←     → Fill Light

        ↓
   Dark Background
```

Use:

- ambient light
- key directional/area light
- rim light
- subtle point light

The bottle must have visible highlights.

Do not make the scene uniformly bright.

---

# 13. Camera

Recommended:

```js
camera.position.set(0, 0, 5);
camera.fov = 35;
```

The camera should be slightly above or level with the bottle.

Avoid an extreme perspective distortion.

During scrolling:

```text
Hero start:
camera = normal

Hero middle:
camera moves slightly closer

Hero end:
camera pulls back
```

Keep movement subtle.

---

# 14. Initial Bottle Animation

The bottle should slowly rotate continuously.

Example concept:

```js
useFrame((state, delta) => {
  bottle.rotation.y += delta * 0.35;
});
```

Do NOT make it spin quickly.

The desired feeling is:

```text
slow
luxurious
controlled
physical
```

---

# 15. Scroll-Driven Bottle Animation

Use GSAP ScrollTrigger.

ScrollTrigger supports:

- scrub
- pin
- timeline-based scroll animation
- progress-driven animation

Official reference:

https://gsap.com/docs/v3/Plugins/ScrollTrigger/

Use a pinned hero.

Concept:

```js
const timeline = gsap.timeline({
  scrollTrigger: {
    trigger: hero,
    start: "top top",
    end: "+=2200",
    scrub: 1,
    pin: true
  }
});
```

Do not animate the pinned element itself. Animate children inside it.

---

# 16. Scroll Timeline

Create approximately this animation:

## Progress 0%

```text
Bottle:
center
rotation: 0deg
scale: 1

Text:
fully visible

Camera:
normal
```

## Progress 20%

```text
Bottle:
rotation: 35deg
x: -3%

Text:
moves slightly left

Camera:
moves closer
```

## Progress 40%

```text
Bottle:
rotation: 120deg
x: +4%

Text:
large parallax movement
```

## Progress 60%

```text
Bottle:
rotation: 220deg
y: -3%

Text:
letters move independently
```

## Progress 80%

```text
Bottle:
rotation: 300deg
x: -5%

Camera:
slightly wider
```

## Progress 100%

```text
Bottle:
rotation: 360deg

Text:
moves toward edges

Hero:
transitions to next section
```

---

# 17. Typography Scroll Animation

Do not move the entire title as one object.

Split it into individual characters or words.

Example:

```text
B O T T L E
```

Each character gets its own span.

```jsx
<span className="letter">B</span>
<span className="letter">O</span>
<span className="letter">T</span>
...
```

Then animate individual letters:

```js
gsap.to(".letter:nth-child(1)", {
  x: -120,
  scrollTrigger: {...}
});

gsap.to(".letter:nth-child(2)", {
  x: 60,
  scrollTrigger: {...}
});
```

Keep the movement subtle.

The goal is controlled chaos, not random motion.

---

# 18. Bottle Passing Through Text Effect

This is the signature effect.

Use multiple text layers.

Example:

```jsx
<div className="text-back">
  <HeroTypography />
</div>

<BottleScene />

<div className="text-front">
  <HeroTypography />
</div>
```

But mask/crop the front layer so only selected portions appear.

Alternative:

Use CSS clipping:

```css
.text-front {
  clip-path: polygon(...);
}
```

Or use several text fragments positioned around the bottle.

The bottle should visually appear to travel:

```text
BEHIND → THROUGH → IN FRONT → THROUGH → BEHIND
```

---

# 19. Parallax

Add multiple movement speeds.

Background text:

```text
speed = 0.15
```

Main typography:

```text
speed = 0.35
```

Bottle:

```text
speed = 0.50
```

Foreground typography:

```text
speed = 0.25
```

This creates depth.

---

# 20. Grain / Film Texture

Add a very subtle grain overlay.

```css
.grain {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0.035;
  z-index: 100;
  mix-blend-mode: screen;
}
```

Use a tiny noise texture or procedural CSS/SVG noise.

Do not make the grain obvious.

---

# 21. Navigation

Minimal navigation.

Example:

```text
BRAND                  MENU
```

or:

```text
BOTTLE™       INDEX  SHOP  INFO
```

Navigation should remain above the animation.

Use:

```css
position: fixed;
top: 0;
left: 0;
right: 0;
z-index: 50;
```

Use small uppercase typography.

---

# 22. Hero Micro UI

Add tiny metadata.

Example:

```text
PRODUCT 01
250 ML
ORIGINAL FORMULA
```

Place it in a corner.

Another corner:

```text
SCROLL TO EXPLORE ↓
```

Do not clutter the page.

---

# 23. Cursor Interaction

Desktop only.

Create a custom cursor:

```text
small circle
```

When hovering the bottle:

```text
circle grows
+
VIEW
```

Example:

```text
     ◉
   VIEW
```

On mobile disable the custom cursor.

---

# 24. Mouse Interaction

The bottle can subtly react to pointer movement.

Concept:

```js
targetX = mouse.x * 0.15;
targetY = mouse.y * 0.08;
```

Interpolate instead of directly applying the value.

This should feel physical.

Do not allow pointer movement to completely rotate the bottle.

---

# 25. Smooth Scrolling

Use Lenis if desired.

Basic concept:

```js
const lenis = new Lenis({
  duration: 1.1,
  smoothWheel: true
});
```

Synchronize it with GSAP's ticker.

Make sure ScrollTrigger updates correctly.

Do not over-smooth the page.

---

# 26. Responsive Design

This is mandatory.

## Desktop

```text
large typography
large bottle
full 3D animation
mouse interaction
```

## Tablet

```text
smaller typography
smaller bottle
reduced parallax
```

## Mobile

```text
typography remains oversized
bottle centered
simplified animation
no custom cursor
reduced 3D complexity
```

Recommended mobile bottle:

```css
width: 65vw;
max-width: 420px;
```

Desktop:

```css
width: 30vw;
max-width: 520px;
```

---

# 27. Performance Rules

The animation must remain smooth.

Use:

- compressed GLB
- optimized textures
- reasonable polygon count
- DPR limits
- lazy loading
- transform-based animations

For WebGL:

```js
dpr={[1, 1.5]}
```

Avoid unnecessarily high DPR.

Do not animate layout properties such as:

```text
width
height
top
left
margin
```

Prefer:

```text
transform
opacity
scale
rotation
```

---

# 28. Accessibility

Include:

```html
<h1>Drink Loud</h1>
```

even if the visual typography is split into spans.

Add:

```html
aria-label
```

where necessary.

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

For reduced motion:

- disable continuous rotation
- disable aggressive parallax
- reduce scroll animation
- keep the product visible

---

# 29. Animation Architecture

Do NOT put all animation logic inside `App.jsx`.

Use:

```text
BottleScene.jsx
        ↓
BottleModel.jsx
        ↓
ScrollBottle.jsx
        ↓
GSAP ScrollTrigger
```

Suggested responsibilities:

### BottleScene.jsx

Responsible for:

- Canvas
- camera
- lights
- environment
- renderer

### BottleModel.jsx

Responsible for:

- GLB
- materials
- bottle rotation

### HeroTypography.jsx

Responsible for:

- giant text
- letter splitting
- text layers

### ScrollBottle.jsx

Responsible for:

- GSAP
- ScrollTrigger
- hero timeline
- scroll progress

### GrainOverlay.jsx

Responsible for:

- film grain

### Navigation.jsx

Responsible for:

- top navigation

---

# 30. Suggested React Component Tree

```text
<App>
│
├── <Navigation />
│
├── <main>
│
│   ├── <section className="hero">
│   │
│   │   ├── <HeroTypography layer="back" />
│   │   │
│   │   ├── <BottleScene />
│   │   │    └── <BottleModel />
│   │   │
│   │   ├── <HeroTypography layer="front" />
│   │   │
│   │   ├── <HeroMeta />
│   │   │
│   │   └── <ScrollIndicator />
│   │
│   ├── <IntroSection />
│   │
│   ├── <ProductDetails />
│   │
│   └── <FinalCTA />
│
└── <GrainOverlay />
```

---

# 31. Exact AI Coding Prompt

Use the following prompt in Claude, ChatGPT, Cursor, Windsurf, or another coding assistant:

```text
You are a senior creative frontend engineer specializing in award-winning
editorial websites, WebGL, Three.js, React and GSAP.

Build an original premium 3D product landing page inspired by the visual
concept of an experimental bottle hero.

IMPORTANT:
Do not copy any proprietary website source code, prompts, assets, logos,
exact typography, or implementation. Create the design and implementation
from scratch.

TECH STACK:
- React + Vite
- JavaScript
- Tailwind CSS
- GSAP
- GSAP ScrollTrigger
- Three.js
- @react-three/fiber
- @react-three/drei
- optional Lenis for smooth scrolling

MAIN CONCEPT:

Create a full-screen black hero with enormous acid-green display typography.
The typography should be so large that it extends beyond the viewport.

Place a realistic 3D bottle in the center.

The bottle must slowly rotate around the Y axis and visually pass through
the oversized typography.

The visual layering should communicate:

BEHIND TEXT
    ↓
3D BOTTLE
    ↓
FRONT TEXT
    ↓
BOTTLE
    ↓
BACK TEXT

The final result should feel like an expensive creative studio website,
fashion editorial, experimental product campaign and premium digital
experience.

COLOR:
background: #050505
primary text: #B7FF00
secondary text: #F5F5F0

TYPOGRAPHY:
Use a bold condensed uppercase display font.
Make the hero title approximately:
font-size: clamp(7rem, 20vw, 25rem)
line-height: 0.78
letter-spacing: -0.07em

HERO:
- min-height: 100svh
- black background
- giant typography
- centered 3D bottle
- tiny product metadata
- tiny scroll indicator
- fixed navigation
- subtle film grain

3D BOTTLE:
Load:
public/models/bottle.glb

Use React Three Fiber.

The bottle should:
- rotate slowly
- have premium realistic material
- receive dramatic studio lighting
- cast/receive subtle shadows where appropriate
- react subtly to pointer movement
- respond to scroll progress
- remain centered on mobile

CAMERA:
- perspective camera
- FOV around 35
- initial Z around 5
- subtle camera movement during scroll

LIGHTING:
Use:
- key area light
- rim light
- subtle fill
- ambient/environment lighting

Do not make the scene flat.

SCROLL EXPERIENCE:

Pin the hero section while the user scrolls.

Use GSAP ScrollTrigger with:

start: "top top"
end: approximately "+=2200"
scrub: 1
pin: true

Create a master GSAP timeline.

At scroll progress 0:
- bottle centered
- bottle rotation 0
- text stable
- camera normal

At 20%:
- bottle rotation around 35 degrees
- text moves slightly
- camera moves slightly closer

At 40%:
- bottle rotation around 120 degrees
- typography begins strong parallax
- bottle shifts slightly horizontally

At 60%:
- bottle rotation around 220 degrees
- bottle moves slightly vertically
- text layers separate more

At 80%:
- bottle rotation around 300 degrees
- camera widens slightly

At 100%:
- bottle reaches approximately 360 degrees
- typography moves toward viewport edges
- hero transitions into the next section

TYPOGRAPHY:

Do not animate one giant title as a single DOM element.

Split the title into individual letters or words.

Each letter should be independently transformable.

Create two or more visual typography layers:
1. background text
2. foreground text

The bottle should appear to pass between these layers.

Use z-index and/or clipping/masking to create the illusion.

PARALLAX:

Background typography:
low movement

Main typography:
medium movement

Bottle:
medium/high movement

Foreground text:
medium movement

Keep all motion controlled and premium.

MOUSE:

Create a subtle pointer interaction.

Pointer movement should slightly affect:
- bottle rotation
- bottle position
- camera orientation

Use interpolation/lerp.

Do not allow the pointer to cause extreme movement.

CUSTOM CURSOR:

On desktop create a minimal circular cursor.

When hovering the bottle:
- increase cursor size
- display "VIEW"

Disable the custom cursor on touch devices.

GRAIN:

Add a fixed subtle film-grain overlay.

Opacity around 0.02–0.05.

It must not interfere with pointer events.

NAVIGATION:

Fixed top navigation:

left:
BRAND

right:
MENU

Small uppercase typography.

Do not make the navigation visually dominant.

HERO METADATA:

Small text such as:

PRODUCT 01
250 ML
ORIGINAL FORMULA

And:

SCROLL TO EXPLORE ↓

RESPONSIVE:

Desktop:
- full animation
- large bottle
- large typography
- pointer interaction

Tablet:
- reduce bottle size
- reduce parallax

Mobile:
- bottle around 60–70vw
- preserve oversized typography
- simplify scroll animation
- disable custom cursor
- reduce WebGL DPR
- keep performance high

ACCESSIBILITY:

Implement:
prefers-reduced-motion

When reduced motion is enabled:
- disable continuous rotation
- reduce scroll-driven transforms
- disable aggressive parallax
- keep content readable

PERFORMANCE:

Use transform-based animation wherever possible.

Avoid animating layout properties.

Limit WebGL DPR to approximately 1–1.5.

Clean up:
- GSAP ScrollTriggers
- event listeners
- animation frames
- Lenis instance

when components unmount.

CODE QUALITY:

Create reusable components:

src/components/
- BottleScene.jsx
- BottleModel.jsx
- HeroTypography.jsx
- ScrollBottle.jsx
- GrainOverlay.jsx
- Navigation.jsx
- IntroSection.jsx
- ProductDetails.jsx

Keep App.jsx clean.

Do not put all logic into one component.

IMPORTANT VISUAL REQUIREMENT:

The hero must NOT look like a generic Three.js demo.

It must look like an art-directed premium website.

Prioritize:
- typography scale
- composition
- negative space
- bottle depth
- lighting
- layering
- smooth scrolling
- subtle motion
- visual hierarchy

The final result should feel:
LOUD
EDITORIAL
PREMIUM
MINIMAL
EXPERIMENTAL
PHYSICAL

After creating the project, provide:
1. complete file structure
2. complete code for every required file
3. installation commands
4. instructions for adding bottle.glb
5. instructions for running locally
6. explanation of how the scroll animation works
7. mobile optimization notes
8. troubleshooting notes for WebGL and ScrollTrigger
```

---

# 32. If You Don't Have a 3D Bottle

You have three options.

## Option A — Use a free GLB

Find a legally reusable bottle model from a free 3D asset source.

Prefer:

```text
GLB
low-poly / optimized
commercial-use permitted
PBR textures
```

Then place it at:

```text
public/models/bottle.glb
```

## Option B — Create a simple bottle yourself

Create a bottle using Blender.

Recommended:

```text
cylinder
↓
bevel
↓
extrude neck
↓
bevel edges
↓
UV unwrap
↓
label texture
↓
export GLB
```

## Option C — Temporary placeholder

For development, use a simple Three.js cylinder.

This lets you finish the entire animation system before replacing it with
the final model.

---

# 33. Important GSAP Rules

When using ScrollTrigger:

```js
gsap.registerPlugin(ScrollTrigger);
```

For scroll-driven animations prefer:

```js
scrub: true
```

or:

```js
scrub: 1
```

For pinned sections:

```js
pin: true
```

When pinning, animate children rather than the pinned element itself.

For horizontal/fake-horizontal scroll, use a linear tween with:

```js
ease: "none"
```

These patterns are documented in GSAP's official ScrollTrigger documentation.

---

# 34. Development Checklist

Before calling the project complete:

```text
[ ] Hero fills viewport
[ ] Black background
[ ] Acid-green giant typography
[ ] Bottle loaded
[ ] Bottle rotates slowly
[ ] Bottle has proper lighting
[ ] Typography overlaps bottle
[ ] Back/front text layers work
[ ] ScrollTrigger installed
[ ] Hero pins correctly
[ ] Scroll scrubs animation
[ ] Bottle responds to scroll
[ ] Text responds to scroll
[ ] Camera responds subtly
[ ] Pointer interaction works
[ ] Custom cursor works on desktop
[ ] Custom cursor disabled on mobile
[ ] Grain overlay works
[ ] Navigation works
[ ] Responsive layout works
[ ] Reduced-motion mode works
[ ] No console errors
[ ] ScrollTrigger cleaned up
[ ] WebGL performance acceptable
```

---

# 35. Final Design Principle

Do NOT add effects just because they are technically possible.

The page should have one dominant idea:

```text
GIANT TYPE
       +
3D BOTTLE
       +
SCROLL
       =
A PRODUCT THAT FEELS PHYSICAL
```

Every animation should support this idea.

The final website should feel like a moving poster rather than a normal
marketing website.

The bottle is the hero.

The typography is the environment.

The scroll is the camera.
