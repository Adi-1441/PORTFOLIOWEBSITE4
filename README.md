# Adithya G — Premium Mechanical Engineering Portfolio

A state-of-the-art, responsive digital portfolio for **Adithya G**, a **Mechanical Engineering Student** focusing on **CAD (SolidWorks)**, **CAE (ANSYS FEA/CFD)**, **Thermal-Fluids Analysis**, **Sustainable Natural Fiber Composites Research**, and **AI in Engineering**.

Designed around the **"DARK ENGINEERING LABORATORY // DIGITAL PORTFOLIO"** theme with blueprint grids, CAD-inspired crosshairs, interactive 3D mechanical assemblies, and a browser-persistent IndexedDB storage engine for real-time CRUD management of projects, CAD images, and certification credentials.

---

## Key Features

- **Interactive 3D Mechanical Assembly**: Procedural 3D planetary gear train built with Three.js / React Three Fiber. Supports rotation, zooming, solid/wireframe toggle, exploded view, speed adjustment, and an interactive 2D blueprint fallback.
- **Persistent Project Management (CRUD)**:
  - Add, edit, view, and delete any project.
  - Multi-image drag-and-drop CAD upload (JPG, PNG, WEBP) with live preview, reordering, and cover image selection.
  - Initial sample projects can be fully edited or deleted; deleted sample projects **never reappear** upon refresh.
- **Interactive Project Dossier & Lightbox Gallery**: Full engineering breakdowns (Objective, Problem, Solution, Methodology, Tools, Skills, Results, Outcome) with an interactive zoomable image lightbox.
- **Dedicated Certifications & Credentials Section**:
  - Independent credential management with full CRUD.
  - Upload PDF or high-resolution image certificates (with built-in PDF viewer and download support).
- **Engineering Domain Showcases**:
  - **Research & Materials**: Natural fiber composites (coconut peduncle, areca), chemical alkaline surface treatments, and ASTM characterization.
  - **CAD & CAE**: SolidWorks parametric modeling, ANSYS Structural FEA stress maps, Fluent CFD aerodynamics.
  - **AI × Engineering**: CNC milling tool wear prediction ($VB_{max}$), EV Battery SOH, and vibration FFT signal processing.
  - **Technical Articles**: Engineering notes covering mesh convergence (GCI), boundary layer resolution ($y^+$), and sensor telemetry.
- **Backup & Restore**: Export the complete portfolio database (including images and PDFs) to a portable JSON archive and restore anytime with integrity checks.
- **Customizable Settings**: Modify contact links (Email, GitHub, LinkedIn), hero description, and custom resume PDF without touching source code.

---

## Technology Stack

- **Framework**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) with custom engineering laboratory design system
- **3D Graphics**: [Three.js](https://threejs.org/) + [@react-three/fiber](https://r3f.docs.pmnd.rs/) + [@react-three/drei](https://github.com/pmndrs/drei)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Storage Engine**: Browser [IndexedDB](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API) (Zero external database required)

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 3. Production Build
```bash
npm run build
```
Generates an optimized static bundle in the `dist/` directory ready for deployment.

---

## Documentation Guide

For comprehensive instructions on how to manage projects, upload SolidWorks CAD renders, configure certificates, and handle backups, refer to **[`PORTFOLIO_GUIDE.md`](./PORTFOLIO_GUIDE.md)**.
