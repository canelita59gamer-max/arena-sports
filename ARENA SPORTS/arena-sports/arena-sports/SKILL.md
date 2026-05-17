# SKILL.md — Arena Sports
> Guía técnica del sitio web. Leer antes de tocar cualquier archivo de código.
> Aplica tanto para Claude como para el colaborador que edite en VS Code.

---

## STACK TÉCNICO

| Capa | Tecnología | Archivo |
|------|-----------|---------|
| Estructura | HTML5 semántico | `index.html` |
| Estilos | CSS3 puro (sin framework) | `css/styles.css` |
| Interacción | Vanilla JavaScript | `js/main.js` |
| Fuentes | Google Fonts (CDN) | En `<head>` del HTML |
| Sin dependencias | No hay npm, no hay bundler | Solo abrir index.html |

---

## CÓMO ESTÁ ORGANIZADO EL CSS

El archivo `css/styles.css` sigue este orden estricto:

```
1. :root — variables de color y tipografía
2. Reset y body
3. NAV
4. HERO
5. TICKER
6. Secciones base (.s-label, .s-title)
7. SERVICIOS
8. TABLA DE POSICIONES
9. HISTORIAL (eventos anteriores)
10. PRÓXIMOS EVENTOS
11. PATROCINADORES
12. VISIÓN
13. REDES SOCIALES
14. CONTACTO
15. FOOTER
16. SCROLL REVEAL (.reveal / .visible)
17. RESPONSIVE (@media max-width: 900px)
```

**Regla:** Cada sección tiene un comentario `/* ══ NOMBRE ══ */` — busca ese comentario para ubicarte rápido.

---

## VARIABLES DE COLOR (no cambiar)

```css
:root {
  --negro: #080808;
  --gris-1: #111;
  --gris-2: #191919;
  --gris-3: #242424;
  --borde: #2C2C2C;
  --blanco: #F0F0F0;
  --blanco-suave: #A0A0A0;
  --acento: #E8FF00;
  --acento-dim: rgba(232,255,0,0.08);
}
```

Usar siempre `var(--acento)` en lugar del hex directo.
Si se necesita el amarillo con opacidad, usar `--acento-dim` o `rgba(232,255,0, X)`.

---

## SISTEMA DE ANIMACIÓN (scroll reveal)

El JS en `main.js` usa `IntersectionObserver` para animar elementos al hacer scroll.

**Cómo agregar animación a un elemento nuevo:**
```html
<div class="reveal">
  <!-- contenido -->
</div>
```

Cuando el elemento entra en viewport, JS agrega la clase `.visible` que dispara la transición CSS.

**Stagger (retraso escalonado):** Los hijos de grids como `.servicios-grid` y `.redes-grid` tienen `transitionDelay` automático aplicado por JS. Si agregas una nueva grid con efecto stagger, añádela en `main.js`:

```js
document.querySelectorAll('.tu-nueva-grid .tu-card').forEach((el, i) => {
  el.style.transitionDelay = `${i * 70}ms`;
});
```

---

## CÓMO AGREGAR UNA SECCIÓN NUEVA

1. En `index.html`, agrega la sección con `id` único:
```html
<section id="nueva-seccion">
  <div class="reveal">
    <div class="s-label">Etiqueta superior</div>
    <h2 class="s-title">Título<br><span class="dim">subtítulo</span></h2>
  </div>
  <!-- contenido con clase reveal -->
</section>
```

2. En `css/styles.css`, agrega los estilos al final de la sección correspondiente (antes del bloque RESPONSIVE).

3. En el `<nav>`, agrega el link:
```html
<a href="#nueva-seccion">Nombre</a>
```

---

## CÓMO ACTUALIZAR LA TABLA DE POSICIONES

En `index.html`, busca el comentario `<!-- TABLA DE POSICIONES -->`.
Cada fila de la tabla sigue este patrón:

```html
<tr class="tr-top">  <!-- solo para top 3 clasificados -->
  <td><span class="pos-num p1">1</span></td>  <!-- p1=oro, p2=plata, p3=bronce -->
  <td>
    <div class="eq-name">NOMBRE DEL EQUIPO</div>
    <div class="eq-sub">Nombre de la iglesia/organización</div>
  </td>
  <td>PJ</td><td>G</td><td>E</td><td>P</td>
  <td>GF</td><td>GC</td><td>DG</td>
  <td><span class="pts-val">Pts</span></td>
</tr>
```

Quitar `class="tr-top"` para equipos fuera de zona de clasificación.

---

## CÓMO AGREGAR EL LOGO

Cuando el logo esté listo (PNG desde Gemini), guardarlo en `assets/logos/` y reemplazar en `index.html`:

**En el nav** (reemplazar el texto):
```html
<!-- Antes: -->
<div class="nav-logo"><em>ARENA</em> SPORTS</div>

<!-- Después: -->
<div class="nav-logo">
  <img src="assets/logos/logo-horizontal.png" alt="Arena Sports" height="36">
</div>
```

**En el footer** (mismo proceso):
```html
<img src="assets/logos/logo-horizontal.png" alt="Arena Sports" height="28">
```

---

## CÓMO AGREGAR PATROCINADORES REALES

En `index.html`, busca `.patro-logos`. Cada slot sigue este patrón:

```html
<!-- Patrocinador real: -->
<div class="patro-slot patro-activo">Nombre Empresa</div>

<!-- O con imagen: -->
<div class="patro-slot patro-activo">
  <img src="assets/images/logo-patrocinador.png" alt="Nombre" height="40">
</div>

<!-- Slot disponible: -->
<div class="patro-slot patro-libre">+ Disponible</div>
```

---

## CÓMO CONECTAR EL FORMULARIO (Formspree)

1. Crear cuenta gratis en formspree.io
2. Crear un nuevo form — te dan un endpoint como `https://formspree.io/f/xyzabc`
3. En `index.html`, reemplazar el botón del formulario:

```html
<!-- Antes: -->
<button class="btn-acento" onclick="alert('...')">Enviar Mensaje</button>

<!-- Después: agregar id al form y manejar con fetch en main.js -->
```

En `js/main.js` agregar:
```js
const form = document.querySelector('.contact-form');
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  await fetch('https://formspree.io/f/TU_ID', { method: 'POST', body: data });
  alert('¡Mensaje enviado! Te contactamos pronto.');
});
```

---

## CÓMO SUBIR EL SITIO (Netlify — gratis)

1. Ir a netlify.com → crear cuenta
2. Arrastrar la carpeta `arena-sports/` al panel de Netlify
3. El sitio queda en línea en segundos con URL temporal
4. En Settings → Domain → agregar `arenasports.com.co`
5. Configurar DNS según instrucciones de Netlify

---

## RESPONSIVE — BREAKPOINTS

Solo hay un breakpoint definido:
```css
@media (max-width: 900px) { ... }
```

En mobile (< 900px):
- Nav: solo logo + botón CTA (links ocultos)
- Hero: columna única (grid → 1fr)
- Servicios: columna única
- Visión: columna única
- Contacto: columna única

---

## ERRORES COMUNES A EVITAR

| Error | Por qué pasa | Cómo evitarlo |
|-------|-------------|---------------|
| Colores hardcodeados | Se escribe `#E8FF00` directo | Usar siempre `var(--acento)` |
| Romper el reveal | Olvidar clase `.reveal` en sección nueva | Siempre agregar `.reveal` al wrapper |
| Nav link roto | Escribir mal el `id` de la sección | Verificar que el `href="#id"` coincida exactamente |
| Tabla desalineada | Falta `text-align: center` en celdas | Las celdas que no son nombre/pos llevan `text-align: center` |
| Logo pixelado | Usar PNG pequeño | Mínimo 2x el tamaño de visualización |
