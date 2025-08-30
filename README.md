# Unique Patel – 3D Portfolio (React + TypeScript + Vite)

A responsive developer portfolio with a real 3D scene (Three.js via **@react-three/fiber**/**@react-three/drei**), light/dark theme toggle, mobile menu, project cards, education/experience sections, and a **one-click PDF résumé download**. Skill badges link to official documentation.

## Features
- Animated Three.js scene (icosahedron + starfield)
- Light/Dark theme (Tailwind class strategy)
- Mobile hamburger menu, accessible and responsive
- Projects, Skills (each badge opens official docs), Experience, Education, Achievements, Leadership, Contact
- Résumé download saves a real **`.pdf`** (no browser viewer page)
- Clean TypeScript types; Vite HMR

## Tech Stack
React 18 · TypeScript · Vite 5 · Tailwind CSS 3 · Three.js · @react-three/fiber · @react-three/drei · framer-motion · lucide-react

---

## Quick Start

**Requirements**
- Node.js ≥ 18
- npm (or pnpm/yarn)

**Install & Run**
```bash
npm i
npm run dev
```
Open http://localhost:5173/

---

## Project Structure

```
.
├─ public/
│  └─ Unique_Patel_Resume.pdf      # ← place your resume here (exact name)
├─ src/
│  ├─ App.tsx                      # main app (UI + 3D + logic)
│  ├─ main.tsx                     # Vite entry
│  ├─ index.css                    # Tailwind layers
│  └─ vite-env.d.ts                # Vite type defs
├─ index.html                      # points to /src/main.tsx
├─ tsconfig.json
├─ tailwind.config.js              # darkMode: "class"
├─ postcss.config.js               # { tailwindcss: {}, autoprefixer: {} }
└─ vite.config.ts                  # Vite config (set base for GH Pages)
```

---

## Configuration

### 1) Résumé (PDF)
- Put your file at: `public/Unique_Patel_Resume.pdf` (exact casing).
- Locally it’s served at `/Unique_Patel_Resume.pdf`.
- The code uses `import.meta.env.BASE_URL`, so it also works on GitHub Pages.

### 2) Tailwind (v3)
**tailwind.config.js**
```js
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [],
};
```
**postcss.config.js**
```js
export default { plugins: { tailwindcss: {}, autoprefixer: {} } };
```
**src/index.css**
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### 3) TypeScript + Vite globals
**src/vite-env.d.ts**
```ts
/// <reference types="vite/client" />
```
**tsconfig.json** includes:
```json
"types": ["vite/client"]
```

---

## Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "predeploy": "vite build",
    "deploy": "gh-pages -d dist"
  }
}
```

---

## Deployment

### Option A — Vercel (recommended)
1. Push this repo to GitHub.
2. On vercel.com → **New Project** → Import your repo.
3. Framework: **Vite** · Build: `vite build` · Output: `dist`.
4. Deploy. Résumé will be at `https://<project>.vercel.app/Unique_Patel_Resume.pdf`.

### Option B — GitHub Pages (gh-pages branch)
1. Set **base** to your repo name in `vite.config.ts`:
   ```ts
   import { defineConfig } from "vite";
   import react from "@vitejs/plugin-react";

   export default defineConfig({
     plugins: [react()],
     base: "/<your-repo-name>/"
   });
   ```
2. Deploy:
   ```bash
   npm run deploy
   ```
3. GitHub → **Settings → Pages** → Source: `gh-pages` / `(root)`.
4. Site URL: `https://<username>.github.io/<your-repo-name>/`  
   Résumé URL: `https://<username>.github.io/<your-repo-name>/Unique_Patel_Resume.pdf`.

**SPA fallback (optional):**
```bash
npm run build
cp dist/index.html dist/404.html     # Windows: copy dist\\index.html dist\\404.html
npm run deploy
```

---

## Known-Good Dependency Set

If npm shows peer conflicts, pin these versions (already used in `package.json`):

```json
{
  "dependencies": {
    "@react-three/drei": "9.122.0",
    "@react-three/fiber": "8.15.13",
    "three": "0.160.0",
    "react": "18.2.0",
    "react-dom": "18.2.0",
    "framer-motion": "11.0.0",
    "lucide-react": "0.460.0"
  },
  "devDependencies": {
    "tailwindcss": "3.4.9",
    "postcss": "8.4.41",
    "autoprefixer": "10.4.19",
    "typescript": "5.4.5",
    "@vitejs/plugin-react": "4.3.1",
    "vite": "5.4.0",
    "gh-pages": "6.2.0"
  }
}
```

**Clean install (PowerShell):**
```powershell
if (Test-Path .\\node_modules) { Remove-Item -Recurse -Force .\\node_modules }
if (Test-Path .\\package-lock.json) { Remove-Item -Force .\\package-lock.json }
npm cache verify
npm i
```

---

## Troubleshooting

- **`Property 'env' does not exist on type 'ImportMeta'`**  
  Add `src/vite-env.d.ts` with `/// <reference types="vite/client" />` (and ensure `"types": ["vite/client"]` in `tsconfig.json`).

- **Vite looks for `/src/main.jsx`**  
  Update `index.html` to load `/src/main.tsx`.

- **PostCSS/Tailwind error about `@tailwindcss/postcss`**  
  You’re on Tailwind v3—keep `postcss.config.js` as `{ tailwindcss: {}, autoprefixer: {} }`.

- **ERESOLVE peer-deps conflict**  
  Use the **Known-Good Dependency Set**, delete `node_modules` + `package-lock.json`, then `npm i`.

- **Résumé downloads as `.htm`**  
  Ensure the PDF exists at `public/Unique_Patel_Resume.pdf`. The app uses a fetch + `a.download` to save a real `.pdf`.

---

## Editing Content

Open `src/App.tsx` and update the `DATA` object:
- `email`, social links
- `skills` array (name + official docs URL)
- `projects`, `experience`, `education`, etc.

---

## License
MIT (or choose your own and update this section)
