# Landing premium de Arena Sports — plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Nueva web de Arena Sports en React + Vite (`web/`) con landing premium, página `/perfil-jugador` y `torneo.html` intacto.

**Architecture:** SPA Vite en `web/` con React Router (`/`, `/perfil-jugador`). Cada sección es un componente en `web/src/sections/`; efectos reutilizables (partículas, mesh, kinetic type, spotlight, celular isométrico) en `web/src/fx/`. Un script `prebuild` copia `torneo.html` y sus carpetas a `web/public/`. Contenido (textos, redes, servicios) centralizado en `web/src/data/site.js`.

**Tech Stack:** Vite 6, React 18, React Router 6, Tailwind CSS 3, motion 11, lenis 1, Vitest.

**Spec:** `docs/superpowers/specs/2026-11-02-landing-premium-design.md`

## Global Constraints
- Colores: negro `#080808`, acento `#E8FF00`, acento-2 `#B8E000`, grises `#111 #191919 #242424`, borde `#2C2C2C`, texto `#F0F0F0` / `#A0A0A0`.
- Tipos: Oswald (títulos, mayúsculas) y Plus Jakarta Sans (texto), Google Fonts.
- No inventar datos. La sección de cifras solo se renderiza si `site.stats` tiene elementos (hoy vacío).
- Redes: Instagram/TikTok `@arenasportsco_`, YouTube `@ArenaSportsCo`, correo `arenasports.eventos@gmail.com`, WhatsApp `573183000593` (tomado del index actual; confirmar con Juanpa que es el de Arena).
- App: `https://perfil-jugador-wheat.vercel.app`.
- No modificar ningún archivo existente fuera de `web/` y `docs/`.
- `prefers-reduced-motion` desactiva partículas, kinetic type, rotación 3D y Lenis.

## Review Focus
1. Celular 375px: nada se desborda horizontalmente y el hero se lee sobre el mesh → verificación en navegador Task 6.
2. Reduced motion: todo el contenido visible sin animar → test `useReducedMotion` + verificación Task 6.
3. `/torneo.html` sirve la página antigua con su CSS/JS e imágenes → verificación Task 6 tras `npm run build && npm run preview`.
4. Recarga directa en `/perfil-jugador` no da 404 en Vercel → `web/vercel.json` rewrite, Task 1.
5. Formulario de contacto con caracteres especiales (tildes, &, saltos de línea) arma bien el link de WhatsApp → test `buildWhatsAppUrl`, Task 5.

---

### Task 1: Esqueleto del proyecto
**Files:** Create `web/package.json`, `web/vite.config.js`, `web/tailwind.config.js`, `web/postcss.config.js`, `web/index.html`, `web/vercel.json`, `web/scripts/copy-legacy.mjs`, `web/src/main.jsx`, `web/src/App.jsx`, `web/src/index.css`, `web/src/data/site.js`, `web/.gitignore`.

**Interfaces — Produces:** `site` (export default de `data/site.js`) con `{ nav, hero, services[], steps[], stats[], social{instagram,tiktok,youtube,email,whatsapp}, appUrl, sponsors[] }`; rutas `/` y `/perfil-jugador`; tokens Tailwind `negro, acento, acento2, gris1-3, borde, texto, texto2`, fuentes `font-display`, `font-body`.

- [ ] `npm create vite` manual (React, JS), instalar dependencias del stack.
- [ ] `copy-legacy.mjs`: copia `../torneo.html`, `../css`, `../js`, `../assets`, `../img` a `public/`; se ejecuta en `predev` y `prebuild`. `public/` copiado en `.gitignore`.
- [ ] `vercel.json`: `{"rewrites":[{"source":"/((?!torneo\\.html|assets|css|js|img).*)","destination":"/index.html"}]}`.
- [ ] Verificar: `npm run build` sin errores y `dist/torneo.html` existe.
- [ ] Commit.

### Task 2: Efectos (`web/src/fx/`)
**Files:** `useReducedMotion.js`, `useIsTouch.js`, `GradientMesh.jsx`, `Particles.jsx`, `KineticTitle.jsx`, `Spotlight.jsx`, `IsoPhone.jsx`, `Reveal.jsx`, `SmoothScroll.jsx`, test `useReducedMotion.test.js`.

**Produces:** `useReducedMotion(): boolean`; `<GradientMesh/>`; `<Particles count={n}/>` (canvas, repulsión al mouse, se apaga con reduced motion, `count` 30 en touch / 90 escritorio); `<KineticTitle lines={[{text, variant:'solid'|'accent'|'outline'}]}/>`; `<Spotlight className>` (envuelve hijos, brillo radial en el cursor); `<IsoPhone screens={[src]} />` (CSS 3D, `rotateX/rotateZ` ligado a `useScroll`, ángulo fijo en touch/reduced); `<Reveal delay>`; `<SmoothScroll>` (Lenis).

- [ ] Test: `useReducedMotion` devuelve `true` cuando `matchMedia('(prefers-reduced-motion: reduce)').matches` es true y `false` si no.
- [ ] Implementar y pasar test (`npx vitest run`).
- [ ] Commit.

### Task 3: Landing — Nav, Hero, Servicios, Faith Cup, Patrocinadores, Footer
**Files:** `web/src/sections/{Nav,Hero,Stats,Services,Events,Sponsors,Footer}.jsx`, `web/src/pages/Home.jsx`.
**Consumes:** `site`, efectos de Task 2. Textos de servicios y eventos tomados de `../index.html` actual; imágenes de `/assets/images/...`.
- [ ] Componentes según spec secciones 1,2,3,4,7,8,10. `Stats` devuelve `null` si `site.stats.length === 0`.
- [ ] Verificar visualmente en `npm run dev` (escritorio). Commit.

### Task 4: Perfil de Jugador + Blueprint + página `/perfil-jugador`
**Files:** `web/src/sections/{PlayerProfile,Blueprint}.jsx`, `web/src/pages/PlayerProfilePage.jsx`, `web/public-src/app/*.webp` (capturas).
- [ ] Capturas reales de la app (navegador, `perfil-jugador-wheat.vercel.app`). Si las pantallas internas requieren login, pedir capturas a Juanpa; mientras, usar la pantalla pública.
- [ ] Sección estrella con `IsoPhone`, blueprint de 4 pasos (líneas SVG con `pathLength` animado por scroll), página completa según spec.
- [ ] Commit.

### Task 5: Contacto
**Files:** `web/src/sections/Contact.jsx`, `web/src/lib/whatsapp.js`, test `whatsapp.test.js`.
**Produces:** `buildWhatsAppUrl(phone: string, {name, email, message}): string` → `https://wa.me/<phone>?text=<encodeURIComponent(texto)>`.
- [ ] Test: con `name:'José & Cía'`, `message:'Hola\nquiero un torneo'` el resultado contiene `Jos%C3%A9%20%26%20C%C3%ADa` y `%0A`.
- [ ] Implementar, pasar test, montar sección. Commit.

### Task 6: Verificación final
- [ ] `npm run build` + `npm run preview`; en el navegador: `/`, `/perfil-jugador`, recarga directa, `/torneo.html` funcionando.
- [ ] 1440px y 375px sin scroll horizontal; consola sin errores; reduced motion emulado.
- [ ] Capturas para Juanpa. Commit. El cambio de Root Directory en Vercel se hace con Juanpa.
