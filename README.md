# BOTTLE™ // Scrolltide-Style Editorial 3D Hero

An interactive 3D product hero experience inspired by the Scrolltide "Bottle" aesthetic: acid-green typography, high-detail glass/fluid 3D bottle passing through layered typography, GSAP ScrollTrigger timeline, custom cursor, studio lighting, smooth scrolling, film grain, and editorial sub-sections.

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

---

## 🎨 3D Model Setup & Custom GLB Replacement

This project features a high-fidelity **procedural 3D physical glass vessel** with dynamic liquid absorption and canvas-generated typography label.

To use your own custom `.glb` 3D model:
1. Place your model file at `public/models/bottle.glb`.
2. The `BottleModel.jsx` component will load your custom model geometry using `@react-three/drei`'s `useGLTF('/models/bottle.glb')`.

---

## 📜 Technical Stack & Architecture

- **React + Vite** (Fast build & development)
- **Tailwind CSS v4** (Acid-green design system & typography utilities)
- **Three.js & React Three Fiber (@react-three/fiber, @react-three/drei)** (PBR materials, studio lights, contact shadows)
- **GSAP & ScrollTrigger** (Pinned hero timeline with scrubbing rotation & individual letter parallax)
- **Lenis** (Butter-smooth scrolling synchronized with GSAP ticker)
- **Lucide Icons** (Editorial micro-UI iconography)
