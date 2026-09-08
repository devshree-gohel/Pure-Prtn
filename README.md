<div align="center">

# ⚡ PRTN™ // PURE VOLTAGE BIO-PROTEIN

**An editorial 3D bio-protein experience with interactive Three.js shaders, GSAP scroll animations, and an on-device AI peptide architect.**

[![React](https://img.shields.io/badge/React-18.3-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://reactjs.org/)
[![Three.js](https://img.shields.io/badge/Three.js-0.173-000000?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![React Three Fiber](https://img.shields.io/badge/R3F-8.17-black?style=for-the-badge&logo=three.js&logoColor=white)](https://docs.pmnd.rs/react-three-fiber/)
[![GSAP](https://img.shields.io/badge/GSAP-3.12-88CE02?style=for-the-badge&logo=greensock&logoColor=black)](https://gsap.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Vite](https://img.shields.io/badge/Vite-6.1-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## 🌟 Overview

**`PRTN™`** is an art-directed, fashion-editorial 3D product landing page inspired by high-concept digital campaigns (like Scrolltide). Built from scratch, it fuses experimental condensed typography with real-time WebGL physical materials, procedural audio synthesis, and an on-device machine learning formulation engine.

The signature visual effect features **giant acid-green typography (`PURE PRTN`)** where a **3D flint glass protein vessel** slowly rotates and passes between layered background and foreground letter matrices during scroll.

---

## ✨ Key Features

### 🍾 1. Ultra-Smooth 3D Flint Glass Vessel
- **High-Density Curved Geometry**: 80-segment cylinder with chamfered base fillets, S-curve shoulder transitions, and knurled aluminum nitrogen cap.
- **Physical Glass Shading**: High-transmission PBR material (`transmission: 0.94`, `ior: 1.54`, `roughness: 0.03`, `reflectivity: 0.96`).
- **Inner Fluid Core & Rising Micro-Bubbles**: 45 physics-based effervescence particles floating inside the liquid volume.
- **2048x2048 Dynamic Canvas Label**: High-resolution procedural vector texture with neural bio-circuitry, barcodes, and dynamic nutrition stamps.

### 🔤 2. Optical Depth Typography Layering
- **Dual-Layer Split Character Matrix**: The headline `PURE PRTN` is split into individual `span` transforms.
- **Weave Effect**: Background typography sits behind the 3D canvas (`z-index: 10`), while selective foreground clipped letters sit in front (`z-index: 30`), creating the illusion that the bottle travels *through* the words.

### 📜 3. GSAP ScrollTrigger Master Timeline
- **Pinned Hero Experience**: Pins the viewport for `+=2200px` of buttery scrubbing.
- **Multi-Stage Choreography**:
  - `0% → 25%`: Initial 81° rotation, camera dolly-in, subtle character drift.
  - `25% → 60%`: Mid-scroll weave (234° spin), letter matrix expansion allowing the vessel to traverse between planes.
  - `60% → 100%`: 360° complete spin, letter dispersal, and smooth release into the editorial story.

### 🧠 4. AI / ML Neural Peptide Architect
- **Interactive Biological Formulator**: Configure training stimulus (*Hypertrophy / Endurance / Hybrid*), absorption window (*15-min / Sustained / Overnight*), and biomarker priorities.
- **Real-Time Tensor Inference**: Calculates bioavailability scores (e.g. `99.4%`), mTOR pathway activation, and molecular weight breakdown.
- **Live Shader Synchronization**: Injecting the AI sequence immediately updates the 3D bottle shader, liquid color, and active category.

### 🧬 5. Three High-Performance Bio-Protein Categories
1. **`01 / HYDRO WHEY ISOLATE` (Acid Green `#B7FF00`)**: 30g Hydrolyzed Whey • 6.8g BCAA • 3.2g Leucine • Glacial Yuzu Matcha.
2. **`02 / RAW PLANT PEPTIDE` (Obsidian Cyan `#38BDF8`)**: 28g Fermented Seed Complex • Lion's Mane Adaptogen • Obsidian Cacao.
3. **`03 / CLEAR COLLAGEN & EAA` (Solar Crimson `#FF0055`)**: 25g Marine Collagen Type I & III • 9 EAAs • Blood Dragonfruit Hibiscus.

### 🎵 6. Web Audio API Ambient Music Engine
- **Zero-Dependency Synthesizer**: Generates continuous, smooth cinematic chord progressions (`F#m9` → `Dmaj9` → `Bm11` → `E9sus4`), warm sub-bass, and dreamy arpeggiator sparkles in real-time.
- **Fade Transitions**: Smooth 1.8s fade-in on activation and 1.0s fade-out on stop, complete with tactile UI interaction tones.

### 🎯 7. Dual-Layer Precision Custom Cursor
- **Instant Center Dot**: Zero-lag tracking anchored directly to the OS cursor for 100% click accuracy.
- **Fluid Trailing Aura**: Damped spring motion that expands into an 84px `"VIEW"` bubble over the 3D vessel and provides tactile squish feedback on click.

---

## 🛠️ Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **React 18** | Component architecture & reactive state orchestration |
| **Vite 6** | Ultra-fast bundling & development server |
| **Three.js** | 3D WebGL rendering engine |
| **@react-three/fiber** | Declarative React wrapper for Three.js |
| **@react-three/drei** | Environment maps, contact shadows & camera helpers |
| **GSAP & ScrollTrigger** | Master pinned timeline, matrix transforms & letter scrubbing |
| **Tailwind CSS v4** | Acid-green editorial design system & responsive layout |
| **Web Audio API** | Procedural ambient synthesizer & tactile audio feedback |
| **Lenis** | Smooth inertial scrolling synchronized with GSAP ticker |
| **Lucide Icons** | Minimalist micro-UI iconography |

---

## 📁 Project Structure

```text
pure-prtn/
├── public/
│   ├── models/                  # Optional custom GLB models
│   ├── textures/                # Custom bump / label textures
│   └── fonts/                   # Editorial typography assets
├── src/
│   ├── components/
│   │   ├── BottleScene.jsx         # R3F Canvas, studio lighting & environment
│   │   ├── BottleModel.jsx         # 80-segment 3D glass mesh, fluid core & 2K label
│   │   ├── HeroTypography.jsx      # Dual-layer split-character text matrix
│   │   ├── ScrollBottle.jsx        # GSAP ScrollTrigger timeline & kinetic scrub
│   │   ├── AINeuralArchitect.jsx   # AI / ML peptide sequence formulator & inference
│   │   ├── CustomCursor.jsx        # Precision dot + fluid trailing aura with VIEW hover
│   │   ├── Navigation.jsx          # Editorial header with ambient sound toggle
│   │   ├── HeroMeta.jsx            # Macro metrics, batch indicators & scroll badge
│   │   ├── IntroSection.jsx        # Bio-protein manifesto & kinetic marquee
│   │   ├── ProductDetails.jsx      # Amino spectrum, sensory profile & macros
│   │   ├── SecondaryShowcase.jsx   # 3-Category 3D variant viewer with +90° spin
│   │   ├── FinalCTA.jsx            # Crate allocation reservation & trust badges
│   │   └── GrainOverlay.jsx        # Fixed SVG film noise overlay
│   ├── hooks/
│   │   ├── useLenis.js             # Lenis smooth scroll hooked to GSAP ticker
│   │   └── usePointerPosition.js   # Mouse tracker with damping & click states
│   ├── lib/
│   │   ├── audioManager.js         # Web Audio API ambient music synthesizer
│   │   ├── constants.js            # Brand data, 3 categories, macros & specs
│   │   └── animations.js           # GSAP helpers & reduced-motion checks
│   ├── App.jsx                     # Layout composition & active edition state
│   ├── main.jsx                    # React DOM root entry
│   └── index.css                   # Tailwind v4 theme, design tokens & fonts
├── index.html                      # Display fonts & viewport configuration
├── package.json
└── vite.config.js
```

---

## 🚀 Quick Start

### 1. Clone the Repository
```bash
git clone https://github.com/YOUR-USERNAME/pure-prtn.git
cd pure-prtn
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```
Open **`http://localhost:5173`** in your browser.

### 4. Build for Production
```bash
npm run build
```

---

## 🎨 Design System

```css
:root {
  --acid:   #B7FF00;  /* Primary High-Voltage Accent */
  --black:  #050505;  /* Deep Obsidian Background */
  --white:  #F5F5F0;  /* Off-White Editorial Text */
  --gray:   #858585;  /* Muted Monospace Metadata */
}
```

---

## 📄 License

MIT License © 2026. Built with passion for creative frontend development and WebGL craft.
