<div align="center">

```text
  ░██████  ░██                      ░██               ░██          ░██     ░██   ░██████     ░███    ░██    ░██
  ░██   ░██ ░██                      ░██               ░██          ░██     ░██  ░██   ░██   ░██░██   ░██    ░██
 ░██        ░████████   ░██████   ░████████  ░██████   ░██    ░██   ░██     ░██ ░██         ░██  ░██  ░██    ░██
 ░██  █████ ░██    ░██       ░██     ░██          ░██  ░██   ░██    ░██     ░██ ░██        ░█████████ ░██    ░██
 ░██     ██ ░██    ░██  ░███████     ░██     ░███████  ░███████     ░██     ░██ ░██        ░██    ░██  ░██  ░██
  ░██  ░███ ░██    ░██ ░██   ░██     ░██    ░██   ░██  ░██   ░██     ░██   ░██   ░██   ░██ ░██    ░██   ░██░██
   ░█████░█ ░██    ░██  ░█████░██     ░████  ░█████░██ ░██    ░██     ░██████     ░██████  ░██    ░██    ░███
```

# Voxel-Ghatak-UCAV

### Interactive 3D voxel model of India's DRDO Ghatak UCAV — autonomous stealth flying-wing combat jet

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Play_Now-38bdf8?style=for-the-badge)](https://tjstar09.github.io/Voxel-Ghatak-UCAV/)
[![Deploy Pages](https://github.com/tjstar09/Voxel-Ghatak-UCAV/actions/workflows/deploy-pages.yml/badge.svg)](https://github.com/tjstar09/Voxel-Ghatak-UCAV/actions/workflows/deploy-pages.yml)
[![Sync Notion Docs](https://github.com/tjstar09/Voxel-Ghatak-UCAV/actions/workflows/sync-notion-docs.yml/badge.svg)](https://github.com/tjstar09/Voxel-Ghatak-UCAV/actions/workflows/sync-notion-docs.yml)
![Node](https://img.shields.io/badge/Node-22-339933?logo=node.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![Three.js](https://img.shields.io/badge/Three.js-CDN-black?logo=three.js&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Voxels](https://img.shields.io/badge/Voxels-~10K-f59e0b)
![License](https://img.shields.io/badge/License-Apache_2.0-blue)

🎮 **[▶ Play it live: tjstar09.github.io/Voxel-Ghatak-UCAV](https://tjstar09.github.io/Voxel-Ghatak-UCAV/)** — no install, runs in your browser.

</div>

---

## 📖 Table of Contents

- [About](#-about)
- [Built With](#-built-with)
- [Features](#-features)
- [Controls Cheat-Sheet](#-controls-cheat-sheet)
- [Getting Started](#-getting-started)
- [Tips: Adding Things to the Environment](#-tips-adding-things-to-the-environment)
- [Cool Things To Try](#-cool-things-to-try)
- [Documentation](#-documentation)
- [Deployment & Auto-Docs](#-deployment--auto-docs)
- [Roadmap](#-roadmap)
- [Contributing](#-contributing)
- [License](#-license)
- [Acknowledgments](#-acknowledgments)

---

## 🛩️ About

**Voxel-Ghatak-UCAV** is a high-density voxel tribute to the DRDO Ghatak — India's planned autonomous stealth flying-wing UCAV. Everything is procedural cubes: ~10,000 voxels on a `0.2`-unit grid, batched into `InstancedMesh` per sub-assembly for a smooth 60+ FPS.

What's in the scene:

| System | Details |
|---|---|
| ✈️ Jet | Faceted stealth radome, pitot boom, sapphire EO/IR chin turret, S-duct dorsal intake, blended core, cranked-arrow wings with IAF roundels, stealth elevons, Kaveri dry turbofan with shielded 2D nozzle, twin SAAW glide bombs behind animated bay doors |
| 🛳️ Theatre | Voxel aircraft carrier (checker deck, edge lights, hull, ski-jump) floating on animated ocean swells, mountain ring, drifting clouds, land runway island, control tower + radar + hangars, starfield, target bunker, 2 wingmen, ☄️ tumbling asteroid belt |
| 🔊 Audio | Zero-asset Web Audio synth — ejection thud + booster roar on every launch |

---

## 🧱 Built With

* [Vite 6](https://vitejs.dev/) + [React 19](https://react.dev/) + [TypeScript 5](https://www.typescriptlang.org/)
* [Three.js](https://threejs.org/) (CDN import map) — scene, lighting, `InstancedMesh` voxel batching
* [Tailwind CSS 4](https://tailwindcss.com/) — HUD styling
* [Google Gemini AI](https://ai.google.dev/) (`@google/genai`) — AI Studio integration
* GitHub Pages + GitHub Actions — deploy & Notion docs auto-sync

---

## ✨ Features

* **8 camera views** — Orbit, Front, Top, Engine, Deck, Runway, Target, Rocks (asteroid gaze)
* **Flight model** — Launch → takeoff roll → holding loop → Hold frozen midair → loop-aware landing with final approach over the runway, touchdown on deck
* **Combat** — Fire twin DRDO SAAW glide bombs (drop → boost → impact), voxel explosion with debris + shockwave + boom light
* **Explode view** — airframe decouples into 9 sub-assemblies, usable mid-hold
* **Dual sensor modes** — 🛰️ **FLIR Jet** (whole-airframe wireframe) and 🌡️ **Thermal** (scene-wide false-color night vision, white-hot engine/seekers/beacons); hide scenery with `V` for clean sensor views
* **Walk mode** — WASD/arrows + Q/Z glide through the scenery
* **Build mode** — place crates, fuel drums, tents, comms pylons with cursor ghost; click objects to inspect; everything persists in `localStorage`
* **Telemetry HUD** — engine, flight state, RCS, payload, live block count, FPS

---

## 🎮 Controls Cheat-Sheet

| Key | Action | Key | Action |
|---|---|---|---|
| `Left Drag` / `Scroll` / `Right Drag` | Rotate / Zoom / Pan | `1–4` | Orbit / Front / Top / Engine |
| `5–8` | Deck / Runway / Target / Rocks | `F` / `Space` | 🔥 Fire SAAW |
| `E` | 💥 Explode view | `B` | 🚪 Bay doors |
| `R` | 🔄 Auto-rotate | `S` / `T` | 🛰️ FLIR Jet / 🌡️ Thermal |
| `V` | 🏝️ Scenery on/off | `L` | 🛫 Launch / ⏸ Hold / ▶ Resume |
| `N` | 🛬 Land | `W A D` + `←↑↓→` | 🚶 Walk (`Q`/`Z` up/down, `Shift` fast) |
| `Click` | Place ghost / inspect object | `Esc` / `Right-click` | Cancel placement |

---

## 🚀 Getting Started

**Prerequisites:** [Node.js 22](https://nodejs.org/) (Pages runners deprecated Node 20), npm, a Gemini API key for AI features.

```bash
git clone https://github.com/tjstar09/Voxel-Ghatak-UCAV.git
cd Voxel-Ghatak-UCAV
npm install
cp .env.example .env.local   # then set GEMINI_API_KEY=... APP_URL=...
npm run dev                  # → http://localhost:3000
```

| Script | What it does |
|---|---|
| `npm run dev` | Dev server (`vite --port=3000 --host=0.0.0.0`) |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Type check (`tsc --noEmit`) |
| `npm run clean` | Remove `dist/` + `server.js` |

> The whole experience lives in `index.html` (Three.js scene + HUD); `src/main.tsx` bootstraps React and `src/App.tsx` is intentionally minimal.

---

## 🛠️ Tips: Adding Things to the Environment

All scenery code lives in `index.html`'s module script. The pattern is always the same — copy the asteroid belt and make it yours:

**1. The 3-step recipe**

```js
// a) collect voxel coords (grid units, y-up)
const myRocks = [];
for (let ix = -3; ix <= 3; ix++)
  for (let iy = -3; iy <= 3; iy++)
    for (let iz = -3; iz <= 3; iz++) {
      if (Math.sqrt(ix*ix + iy*iy + iz*iz) > 3) continue; // carve a shape
      if (Math.random() > 0.8) continue;                  // craggy surface
      myRocks.push([ix * 0.6, iy * 0.6, iz * 0.6]);
    }
// b) batch them (size, shared material, parent group)
buildInstanced(myRocks, 0.6, materials.rockMid, myGroup);
// c) register the cost so telemetry stays honest
envVoxelCount += myRocks.length;
```

**2. Where things live** — search these anchors in `index.html`:

| Want to… | Look for |
|---|---|
| New colors | `// 5. Materials Palette` (`materials = {...}`) — clone an entry, tweak `color/roughness/emissive` |
| Add scenery | `// 7H. VOXEL ENVIRONMENT` — deck, hull, runway island, ocean, mountains, clouds, airbase, stars, target, wingmen, `asteroid belt` |
| Animate it | `// 12. Animation Loop` — drift/bob/tumble next to the cloud + asteroid updates; store per-object state in `group.userData` |
| New camera view | `cameraPresets` + `viewButtons` (copy the `rocks` entry, pick a key `9`…) |
| New placeable | `buildPlaceable(type)` in `11D. Build mode` + a palette button in the `Build` btn-group |

**3. House rules**

* Add animated groups to `envGroup` → they obey the Scenery (`V`) toggle for free.
* Clone shared materials for new actors (like the wingmen do) if you don't want sensor modes leaking onto them.
* Keep voxel sizes in the `0.2–0.85` family so lighting/shadows stay consistent.
* No-code route: use **Build mode** in-app (📦🛢️⛺📡) — placements persist in `localStorage` under `voxel-ghatak-placements-v1`.

---

## 🤯 Cool Things To Try

1. **Frozen autopsy** — `L` to launch, `L` again to Hold midair, then `E` explode + `S` FLIR Jet. A wireframe-decoupled stealth jet hanging in the sky. 🤌
2. **Night strike** — `T` thermal, `V` off… actually keep scenery ON, fire (`F`) and watch the missile flame burn white-hot into the target bunker.
3. **Deck walk** — `5` (Deck view) + Walk (`WASD`) at deck level while a buddy holds (`L`) overhead.
4. **Build a FOB** — drop tents + drums + pylons on the carrier corners, reload the page — they're still there (localStorage). `🧹 Clear` to wipe.
5. **Asteroid gaze** — `8` (Rocks), `R` auto-rotate on, `V` off/on to compare skies.
6. **Impossible landing** — Hold midair, Explode, Fire, then `N` — the jet reassembles itself onto final approach. Probably.
7. **Roundel hunt** — `3` Top view, zoom max, find both IAF roundels + the dorsal tricolor flash.
8. **FPS flex** — watch the telemetry FPS counter while firing + contrails + explosion debris; InstancedMesh is doing the heavy lifting.
9. **Sound on** — first click enables audio; `F` hits different with the synth booster roar.
10. **Break it, keep it** — fork it, add your own voxel island with the 3-step recipe above, PR it — the Notion docs update themselves on merge. 🪄

---

## 📚 Documentation

* **Full docs (Notion):** public link coming soon — currently the workspace is **private** (`public_url: null` on all pages), so there's nothing shareable yet.
* **In-repo docs:** [`docs/`](docs/) — versioned markdown mirror of the Notion pages (Overview, Architecture, Features, Environment, Setup/Deployment, Auto-Sync).
* **Auto-sync design:** [`scripts/sync-notion-docs.mjs`](scripts/sync-notion-docs.mjs) + [`.github/workflows/sync-notion-docs.yml`](.github/workflows/sync-notion-docs.yml).

---

## 🌍 Deployment & Auto-Docs

* **Site:** every push to `main` triggers [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) (Node 22 → `npm ci` → `vite build` → GitHub Pages). Base path `/Voxel-Ghatak-UCAV/`.
* **Docs:** every merge to `main` triggers [`sync-notion-docs.yml`](.github/workflows/sync-notion-docs.yml) — regenerates `docs/*.md` footers with the merge SHA and upserts all 6 Notion pages via the API (idempotent title-match, `[skip ci]` bot commit back, loop-guarded). Needs repo secrets `NOTION_API_KEY` + `NOTION_PARENT_PAGE_ID`.

---

## 🗺️ Roadmap

* [x] Voxel Ghatak + carrier theatre + flight model + combat
* [x] Asteroid belt, navigate views, walk mode
* [x] Build mode with persisted placements
* [x] Jet-wide FLIR + true thermal sensor modes
* [x] GitHub Pages deploy + Notion auto-docs on merge
* [ ] Mobile touch controls (joystick + fire button)
* [ ] Engine sound loop + wind ambience
* [ ] Multiplayer formation flying (WebRTC)
* [ ] Screenshot/share-preview image for this README

---

## 🤝 Contributing

1. Fork → branch (`feature/my-voxel-thing`) → commit → push → PR to `main`
2. Merging to `main` auto-deploys the site **and** auto-syncs Notion docs — check both Actions runs on your merge
3. Scenery PRs: follow the 3-step voxel recipe + register `envVoxelCount`

---

## 📄 License

Apache-2.0 — see source headers (`SPDX-License-Identifier: Apache-2.0`).

---

## 🙏 Acknowledgments

* Inspired by India's **DRDO Ghatak UCAV / SWiFT** stealth flying-wing programme
* [Three.js](https://threejs.org/) examples (OrbitControls) via unpkg CDN
* Voxel-block aesthetic in the spirit of classic cube builders everywhere

<div align="center">

**Made with cubes • Flown with attitude** 🛩️

[▶ Play now](https://tjstar09.github.io/Voxel-Ghatak-UCAV/) • [📚 Docs (soon public)](https://github.com/tjstar09/Voxel-Ghatak-UCAV/tree/main/docs) • [🐞 Report a bug](https://github.com/tjstar09/Voxel-Ghatak-UCAV/issues)

</div>
