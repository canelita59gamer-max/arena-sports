/* =====================================================================
   CARTAS DE JUGADOR — ARENA SPORTS
   -----------------------------------------------------------------------
   ÚNICA PARTE QUE DEBES TOCAR: el arreglo PLAYERS de abajo.

   Por cada jugador:
     id       -> código corto, único (ej: "AS01"). Se usa para el nombre
                 del archivo de foto.
     nombre   -> nombre completo, se muestra en la carta.
     equipo   -> equipo, categoría o rol (ej: "Selección Sub-17").
     posicion -> opcional. Ej: "Delantero", "Portero", "Base".
     rating   -> número del 1 al 99. Tú lo decides; entre más alto,
                 mejor el "tier" visual de la carta (ver getTier más abajo).
     foto     -> ruta al archivo. Simplemente guarda la foto del jugador
                 en la carpeta assets/jugadores/ con ese mismo nombre.
                 Recomendado: foto de busto, buena luz, fondo oscuro o
                 liso — el sistema intenta quitar el fondo automáticamente
                 (ver nota de recorte automático más abajo).
     dato     -> opcional. Una frase o dato curioso para la ficha ampliada.
     logros   -> opcional. Arreglo de strings con logros o menciones.

   Si dejas "foto" vacío (""), la carta muestra las iniciales del
   nombre en lugar de una imagen — no se rompe nada.
   ===================================================================== */

const PLAYERS = [
  {
    id: "AS01",
    nombre: "Nombre Apellido",
    equipo: "Equipo / Categoría",
    posicion: "Delantero",
    rating: 88,
    foto: "assets/jugadores/AS01.jpg",
    dato: "Escribe aquí una frase o dato curioso del jugador.",
    logros: ["Goleador del torneo 2025", "Capitán del equipo"]
  },
  {
    id: "AS02",
    nombre: "Otro Jugador",
    equipo: "Equipo / Categoría",
    posicion: "Portero",
    rating: 74,
    foto: "assets/jugadores/AS02.jpg",
    dato: "",
    logros: []
  }
  // Copia uno de los bloques de arriba, pégalo antes de este comentario
  // y llena los datos para agregar un jugador nuevo.
];

/* ---------------------------------------------------------------------
   Tiers visuales — usan la misma paleta de marca de Arena Sports
   (negro + amarillo eléctrico + rojo). Ajusta los cortes de rating o
   los colores aquí si quieres afinar el look.
   --------------------------------------------------------------------- */
function getTier(rating) {
  if (rating >= 90) return { label: "Élite",     a: "#E8FF00", b: "#fff7b0", text: "#080808" };
  if (rating >= 75) return { label: "Titular",   a: "#FF3B3B", b: "#ff8a5c", text: "#ffffff" };
  if (rating >= 55) return { label: "Rotación",  a: "#3a3a3a", b: "#5c5c5c", text: "#E8FF00" };
  return                  { label: "Base",       a: "#1c1c1c", b: "#2a2a2a", text: "#A0A0A0" };
}

function escapeHtml(str) {
  return String(str ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  }[c]));
}

function initials(name) {
  return String(name || "").trim().split(/\s+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
}

/* ---------------------------------------------------------------------
   Recorte automático de fondo (opcional).
   Si la foto tiene fondo oscuro/liso, esta función intenta quitarlo
   para que el jugador "flote" sobre la carta, sin que tengas que
   editar la imagen tú mismo. Si la foto ya es un PNG/WEBP con
   transparencia, se usa tal cual. Si el recorte falla por cualquier
   motivo, simplemente se muestra la foto original — nunca rompe nada.
   --------------------------------------------------------------------- */
function autoCutout(stage, src) {
  if (!stage || !src) return;
  const img = new Image();
  img.decoding = "async";
  img.onload = () => {
    try {
      if (/\.(?:png|webp)(?:[?#].*)?$/i.test(src) && hasTransparency(img)) {
        showImage(stage, img.src);
        return;
      }
      const canvas = removeFlatBackground(img);
      canvas.className = "";
      stage.replaceChildren(canvas);
    } catch (err) {
      console.warn("[Arena Sports] No se pudo recortar automáticamente, se usa la foto original.", err);
      showImage(stage, src);
    }
  };
  img.onerror = () => showImage(stage, src);
  img.src = src;
}

function showImage(stage, src) {
  const img = document.createElement("img");
  img.src = src;
  img.alt = "";
  img.loading = "lazy";
  stage.replaceChildren(img);
}

function hasTransparency(source) {
  const maxSide = 160;
  const nw = source.naturalWidth || source.width, nh = source.naturalHeight || source.height;
  const scale = Math.min(1, maxSide / nw, maxSide / nh);
  const w = Math.max(1, Math.round(nw * scale)), h = Math.max(1, Math.round(nh * scale));
  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(source, 0, 0, w, h);
  const alpha = ctx.getImageData(0, 0, w, h).data;
  for (let i = 3; i < alpha.length; i += 4) if (alpha[i] < 250) return true;
  return false;
}

function removeFlatBackground(source) {
  const maxSide = 1000;
  const nw = source.naturalWidth || source.width, nh = source.naturalHeight || source.height;
  const scale = Math.min(1, maxSide / nw, maxSide / nh);
  const w = Math.max(1, Math.round(nw * scale)), h = Math.max(1, Math.round(nh * scale));

  const canvas = document.createElement("canvas");
  canvas.width = w; canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(source, 0, 0, w, h);

  const image = ctx.getImageData(0, 0, w, h);
  const data = image.data;
  const total = w * h;
  const bg = new Uint8Array(total);
  const visited = new Uint8Array(total);
  const queue = new Int32Array(total);
  let head = 0, tail = 0;

  const margin = Math.max(2, Math.round(Math.min(w, h) * 0.015));
  const step = Math.max(1, Math.floor(Math.min(w, h) / 30));
  const pixel = (x, y) => { const i = (y * w + x) * 4; return [data[i], data[i + 1], data[i + 2]]; };
  const luma = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;

  const samples = [];
  for (let x = margin; x < w - margin; x += step) { samples.push(pixel(x, margin)); samples.push(pixel(x, h - 1 - margin)); }
  for (let y = margin; y < h - margin; y += step) { samples.push(pixel(margin, y)); samples.push(pixel(w - 1 - margin, y)); }

  const dark = samples.filter(v => luma(...v) < 105);
  const chosen = dark.length >= 4 ? dark : samples;
  chosen.sort((a, b) => luma(...a) - luma(...b));
  const median = chosen[Math.floor(chosen.length / 2)] || [0, 0, 0];
  const br = median[0], bgc = median[1], bb = median[2];
  const bgLum = luma(br, bgc, bb);

  const distance = i => {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    return Math.sqrt((r - br) ** 2 + (g - bgc) ** 2 + (b - bb) ** 2);
  };

  const baseTolerance = Math.max(16, Math.min(24, 18 + Math.round((bgLum / 255) * 6)));
  const seedTolerance = Math.max(10, Math.round(baseTolerance * 0.60));
  const edgeTolerance = Math.max(9, Math.round(baseTolerance * 0.45));
  const hairVariance = 7.5, hairChroma = 9;

  const localVariance = (x, y) => {
    const x0 = Math.max(0, x - 1), x1 = Math.min(w - 1, x + 1);
    const y0 = Math.max(0, y - 1), y1 = Math.min(h - 1, y + 1);
    let sum = 0, sum2 = 0, n = 0;
    for (let yy = y0; yy <= y1; yy++) for (let xx = x0; xx <= x1; xx++) {
      const qi = (yy * w + xx) * 4;
      const v = luma(data[qi], data[qi + 1], data[qi + 2]);
      sum += v; sum2 += v * v; n++;
    }
    const mean = sum / n;
    return Math.max(0, sum2 / n - mean * mean);
  };

  const looksLikeSubjectDetail = (i, tolerance) => {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = luma(r, g, b);
    const x = ((i / 4) % w) | 0, y = ((i / 4 / w)) | 0;
    const variance = localVariance(x, y);
    const chroma = Math.max(r, g, b) - Math.min(r, g, b);
    return variance >= hairVariance || chroma >= hairChroma || lum > Math.min(88, bgLum + tolerance * 0.90);
  };

  const isBackgroundCandidate = (i, tolerance) => {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    const lum = luma(r, g, b);
    if (distance(i) > tolerance || lum > Math.min(88, bgLum + tolerance * 0.95)) return false;
    return true;
  };

  const enqueue = (x, y) => {
    if (x < 0 || x >= w || y < 0 || y >= h) return;
    const p = y * w + x;
    if (visited[p]) return;
    visited[p] = 1;
    queue[tail++] = p;
  };

  for (let x = 0; x < w; x++) {
    if (isBackgroundCandidate(x * 4, seedTolerance)) enqueue(x, 0);
    if (isBackgroundCandidate(((h - 1) * w + x) * 4, seedTolerance)) enqueue(x, h - 1);
  }
  for (let y = 0; y < h; y++) {
    if (isBackgroundCandidate((y * w) * 4, seedTolerance)) enqueue(0, y);
    if (isBackgroundCandidate((y * w + w - 1) * 4, seedTolerance)) enqueue(w - 1, y);
  }

  while (head < tail) {
    const p = queue[head++];
    const x = p % w, y = (p / w) | 0;
    const i = p * 4;
    if (!isBackgroundCandidate(i, baseTolerance)) continue;
    bg[p] = 1;
    const neighbors = [[x - 1, y], [x + 1, y], [x, y - 1], [x, y + 1]];
    for (const [nx, ny] of neighbors) {
      if (nx < 0 || nx >= w || ny < 0 || ny >= h) continue;
      const np = ny * w + nx;
      if (visited[np]) continue;
      const ni = np * 4;
      let localContrast = 0, count = 0;
      for (let yy = Math.max(0, ny - 1); yy <= Math.min(h - 1, ny + 1); yy++) {
        for (let xx = Math.max(0, nx - 1); xx <= Math.min(w - 1, nx + 1); xx++) {
          if (xx === nx && yy === ny) continue;
          const qi = (yy * w + xx) * 4;
          localContrast += Math.abs(luma(data[ni], data[ni + 1], data[ni + 2]) - luma(data[qi], data[qi + 1], data[qi + 2]));
          count++;
        }
      }
      localContrast /= count || 1;
      const tol = localContrast > 30 ? edgeTolerance : baseTolerance;
      if (isBackgroundCandidate(ni, tol)) {
        const protectedDetail = looksLikeSubjectDetail(ni, tol);
        if (!protectedDetail || localContrast < 14) enqueue(nx, ny);
      }
    }
  }

  const lowerStart = Math.floor(h * 0.70);
  for (let x = 0; x < w; x++) {
    for (let y = h - 1; y >= lowerStart; y--) {
      const p = y * w + x;
      if (bg[p]) continue;
      const i = p * 4;
      if (isBackgroundCandidate(i, edgeTolerance) && !looksLikeSubjectDetail(i, edgeTolerance)) bg[p] = 1;
      else break;
    }
  }

  const alpha = new Uint8Array(total);
  for (let p = 0; p < total; p++) alpha[p] = bg[p] ? 0 : 255;
  for (let p = 0; p < total; p++) {
    if (bg[p]) continue;
    const x = p % w, y = (p / w) | 0;
    let nearBg = 0;
    for (let yy = Math.max(0, y - 1); yy <= Math.min(h - 1, y + 1); yy++)
      for (let xx = Math.max(0, x - 1); xx <= Math.min(w - 1, x + 1); xx++)
        if (bg[yy * w + xx]) nearBg++;
    const i = p * 4;
    const d = distance(i);
    if (nearBg && d <= baseTolerance * 1.30) {
      const ratio = Math.max(0, Math.min(1, (d - baseTolerance * 0.45) / (baseTolerance * 0.85)));
      const edgeAlpha = Math.round(55 + ratio * 200);
      alpha[p] = Math.max(220, edgeAlpha, 255 - Math.round((nearBg / 8) * 18));
    }
  }
  for (let p = 0; p < total; p++) data[p * 4 + 3] = alpha[p];
  ctx.putImageData(image, 0, 0);

  let minX = w, minY = h, maxX = -1, maxY = -1;
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    if (alpha[y * w + x] > 18) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
  }
  if (maxX < 0) return canvas;
  const padX = Math.round(w * 0.018), padTop = Math.round(h * 0.012);
  const sx = Math.max(0, minX - padX), sy = Math.max(0, minY - padTop);
  const ex = Math.min(w - 1, maxX + padX), ey = Math.min(h - 1, maxY);
  const cropped = document.createElement("canvas");
  cropped.width = ex - sx + 1; cropped.height = ey - sy + 1;
  cropped.getContext("2d").drawImage(canvas, sx, sy, cropped.width, cropped.height, 0, 0, cropped.width, cropped.height);
  return cropped;
}

/* ---------------------------------------------------------------------
   Render de la grilla y del modal de detalle
   --------------------------------------------------------------------- */
function renderPlayerCards(players) {
  const grid = document.getElementById("jcGrid");
  if (!grid) return;

  if (!players.length) {
    grid.innerHTML = '<div class="jc-empty">No hay jugadores que coincidan con la búsqueda.</div>';
    return;
  }

  grid.innerHTML = players.map(p => {
    const tier = getTier(p.rating);
    const photoBlock = p.foto
      ? `<div class="jc-photo-loading" data-cutout="${escapeHtml(p.id)}"></div>`
      : `<div class="jc-photo-placeholder"><span>${escapeHtml(initials(p.nombre))}</span><small>Sin foto</small></div>`;
    return `<div class="jc-card" tabindex="0" role="button" aria-label="Ver ficha de ${escapeHtml(p.nombre)}"
        style="--tier-a:${tier.a};--tier-b:${tier.b};--tier-text:${tier.text};" data-player="${escapeHtml(p.id)}">
      <div class="jc-card-inner">
        <div class="jc-top">
          <div><div class="jc-rating">${Number(p.rating) || 0}</div><div class="jc-tier-label">${escapeHtml(tier.label)}</div></div>
          <div class="jc-chip">${escapeHtml(p.posicion || p.equipo || "")}</div>
        </div>
        <div class="jc-photo">${photoBlock}</div>
        <div class="jc-name">${escapeHtml(p.nombre)}</div>
        <div class="jc-team">${escapeHtml(p.equipo || "")}</div>
        <div class="jc-foot"><span>Arena Sports</span><b>#${escapeHtml(p.id)}</b></div>
      </div>
    </div>`;
  }).join("");

  grid.querySelectorAll("[data-cutout]").forEach(stage => {
    const player = players.find(p => p.id === stage.dataset.cutout);
    if (player?.foto) autoCutout(stage, player.foto);
  });

  grid.querySelectorAll("[data-player]").forEach(card => {
    const open = () => openPlayerModal(card.dataset.player, players);
    card.addEventListener("click", open);
    card.addEventListener("keydown", e => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); open(); } });
  });
}

function openPlayerModal(id, players) {
  const p = players.find(x => x.id === id);
  if (!p) return;
  const tier = getTier(p.rating);
  const overlay = document.getElementById("jcModalOverlay");
  const modal = document.getElementById("jcModal");

  const photoBlock = p.foto
    ? `<div data-cutout-modal="${escapeHtml(p.id)}"></div>`
    : `<div class="jc-photo-placeholder"><span>${escapeHtml(initials(p.nombre))}</span><small>Sin foto</small></div>`;

  const achievements = (p.logros && p.logros.length)
    ? `<div class="jc-modal-achievements"><h4>Logros</h4><ul>${p.logros.map(l => `<li>${escapeHtml(l)}</li>`).join("")}</ul></div>`
    : "";
  const quote = p.dato ? `<p class="jc-modal-quote">${escapeHtml(p.dato)}</p>` : "";

  modal.innerHTML = `
    <button class="jc-modal-close" id="jcModalClose" type="button" aria-label="Cerrar">✕</button>
    <div class="jc-modal-hero" style="--tier-a:${tier.a};--tier-b:${tier.b};--tier-text:${tier.text};">
      <div class="jc-modal-photo">${photoBlock}</div>
      <div class="jc-modal-main">
        <div class="jc-modal-rating">${Number(p.rating) || 0}</div>
        <div class="jc-modal-tier">${escapeHtml(tier.label)}</div>
        <h2>${escapeHtml(p.nombre)}</h2>
        <div class="jc-modal-team">${escapeHtml(p.equipo || "")}</div>
        ${p.posicion ? `<div class="jc-modal-chip">${escapeHtml(p.posicion)}</div>` : ""}
      </div>
    </div>
    <div class="jc-modal-body">
      ${quote}
      <div class="jc-modal-grid">
        <div class="jc-modal-stat"><b>#${escapeHtml(p.id)}</b><span>Código de jugador</span></div>
        <div class="jc-modal-stat"><b>${escapeHtml(p.equipo || "—")}</b><span>Equipo / categoría</span></div>
      </div>
      ${achievements}
    </div>`;

  const cutoutHost = modal.querySelector("[data-cutout-modal]");
  if (cutoutHost && p.foto) autoCutout(cutoutHost, p.foto);

  document.getElementById("jcModalClose").addEventListener("click", closePlayerModal);
  overlay.classList.add("open");
}

function closePlayerModal() {
  document.getElementById("jcModalOverlay")?.classList.remove("open");
}

/* ---------------------------------------------------------------------
   FIREBASE (opcional) — mismo proyecto de inscripciones que ya usa
   torneo.html: torneo-interiglesias / colección "teams".
   -----------------------------------------------------------------------
   Cómo funciona:
   - Al cargar, intenta traer los equipos y jugadores reales desde
     Firestore (los mismos datos que alimentan las inscripciones).
   - Por cada jugador de Firestore, busca en tu arreglo PLAYERS (manual,
     arriba en este archivo) uno con el mismo nombre para tomar de ahí
     la foto, el rating, la posición y los logros.
   - Si un jugador de Firestore no tiene entrada manual, se muestra con
     una carta base (iniciales, rating neutro) — nunca rompe la página,
     solo le falta la foto hasta que se la agregues a PLAYERS.
   - Si Firebase falla por cualquier motivo (config, permisos, sin
     internet), la página cae automáticamente a usar SOLO el arreglo
     PLAYERS manual, exactamente como funcionaba antes de conectar
     Firebase. Nunca deja la página en blanco.

   Si no quieres usar Firebase en esta página, simplemente no cargues
   el script del CDN de Firebase en jugadores.html (ver comentario en
   ese archivo) y esta sección se ignora sola.
   --------------------------------------------------------------------- */
const FIREBASE_CONFIG_INSCRIPCIONES = {
  apiKey: "AIzaSyDkoBlrMc12TOCOe0LSg5kb2ZO6iNdW8Wo",
  authDomain: "torneo-interiglesias.firebaseapp.com",
  projectId: "torneo-interiglesias",
  storageBucket: "torneo-interiglesias.firebasestorage.app",
  messagingSenderId: "494456395930",
  appId: "1:494456395930:web:5b680697e9460ece05a723"
};

function normalizeName(str) {
  return String(str || "").toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 ]/g, " ").replace(/\s+/g, " ").trim();
}

let manualByName = null;
function findManualPlayer(name) {
  if (!manualByName) {
    manualByName = new Map();
    PLAYERS.forEach(p => manualByName.set(normalizeName(p.nombre), p));
  }
  return manualByName.get(normalizeName(name));
}

async function loadFirebaseRoster() {
  // Se cargan dinámicamente para que esta página funcione aunque no
  // se incluya el script de Firebase (ver nota arriba).
  const appMod = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js");
  const fsMod = await import("https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js");
  const firebaseApp = appMod.initializeApp(FIREBASE_CONFIG_INSCRIPCIONES, "jugadores-cartas");
  const db = fsMod.getFirestore(firebaseApp);
  const snap = await fsMod.getDocs(fsMod.collection(db, "teams"));

  const merged = [];
  let counter = 0;
  snap.forEach(docSnap => {
    const t = docSnap.data();
    const equipo = t.churchName || t.name || "";
    (t.players || []).forEach(p => {
      const nombre = (p.name || "").trim();
      if (!nombre) return;
      counter++;
      const manual = findManualPlayer(nombre);
      merged.push({
        id: manual?.id || `FB${String(counter).padStart(3, "0")}`,
        nombre,
        equipo: equipo || manual?.equipo || "",
        posicion: manual?.posicion || "",
        rating: manual?.rating ?? 50,
        foto: manual?.foto || "",
        dato: manual?.dato || "",
        logros: manual?.logros || []
      });
    });
  });
  return merged;
}

/* ---------------------------------------------------------------------
   Búsqueda y filtro por equipo
   --------------------------------------------------------------------- */
let ACTIVE_PLAYERS = PLAYERS;

function initPlayerCards() {
  const searchInput = document.getElementById("jcSearch");
  const teamFilter = document.getElementById("jcTeamFilter");
  const overlay = document.getElementById("jcModalOverlay");

  function populateTeamFilter() {
    const teams = [...new Set(ACTIVE_PLAYERS.map(p => p.equipo).filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));
    if (teamFilter) {
      teamFilter.innerHTML = '<option value="">Todos los equipos</option>' +
        teams.map(t => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join("");
    }
  }

  function applyFilters() {
    const q = (searchInput?.value || "").toLowerCase();
    const team = teamFilter?.value || "";
    const filtered = ACTIVE_PLAYERS.filter(p =>
      (!q || p.nombre.toLowerCase().includes(q)) &&
      (!team || p.equipo === team)
    );
    renderPlayerCards(filtered);
  }

  searchInput?.addEventListener("input", applyFilters);
  teamFilter?.addEventListener("change", applyFilters);
  overlay?.addEventListener("click", e => { if (e.target === overlay) closePlayerModal(); });
  document.addEventListener("keydown", e => { if (e.key === "Escape") closePlayerModal(); });

  populateTeamFilter();
  applyFilters();

  // Intenta enriquecer con Firebase; si algo falla, se queda con PLAYERS.
  loadFirebaseRoster()
    .then(roster => {
      if (roster.length) {
        ACTIVE_PLAYERS = roster;
        console.log(`[Arena Sports] ${roster.length} jugadores cargados desde Firebase.`);
      } else {
        console.warn("[Arena Sports] Firebase respondió sin jugadores, se mantiene el arreglo manual.");
      }
    })
    .catch(err => {
      console.warn("[Arena Sports] No se pudo conectar a Firebase, se usa solo el arreglo manual.", err);
    })
    .finally(() => {
      populateTeamFilter();
      applyFilters();
    });
}

document.addEventListener("DOMContentLoaded", initPlayerCards);
