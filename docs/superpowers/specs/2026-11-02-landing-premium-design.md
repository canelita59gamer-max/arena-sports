# Landing premium de Arena Sports — diseño

Fecha: 2026-11-02 · Estado: aprobado en chat, pendiente revisión de este documento

## Objetivo
Rehacer la página principal de Arena Sports para que se vea premium (nivel de un equipo que trabaja con IA) y mostrar que Arena Sports ya no es solo torneos: también tiene **Perfil de Jugador** (https://perfil-jugador-wheat.vercel.app).

**Éxito =** la landing nueva se ve claramente superior a la actual en escritorio y celular, carga rápido, presenta Perfil de Jugador con su propia página y no rompe nada de `torneo.html`.

## Lo que NO cambia
- `torneo.html` (posiciones, partidos, cartas, panel admin) queda idéntico. Solo se enlaza.
- Identidad: negro `#080808`, acento lima `#E8FF00` (y `#B8E000`), títulos Oswald en mayúsculas, texto Plus Jakarta Sans. Logos y fotos reales de `assets/`.
- No se inventan datos (cifras, clubes, resultados, testimonios).

## Arquitectura
- Proyecto nuevo **React + Vite** (JavaScript, sin TypeScript) en `web/` dentro de este repo. Los archivos actuales de la raíz no se tocan durante la construcción, así la web publicada sigue igual.
- Librerías: Tailwind CSS (estilos), Motion (ex Framer Motion, animaciones), Lenis (scroll suave), React Router (dos páginas). Partículas y gradient mesh hechos a mano con canvas/CSS, sin librerías pesadas. Componentes inspirados en 21st.dev, adaptados a la marca.
- `torneo.html` y lo que necesita (`css/`, `js/`, `assets/`, `img/`) se copian a `web/public/` en el build, así queda en `/torneo.html` sin cambios de código.
- Rutas: `/` (landing) y `/perfil-jugador`. `vercel.json` en `web/` con rewrite para la ruta SPA.

## Página `/` — secciones
1. **Nav** fija con glassmorphism; links a secciones, `Perfil de Jugador`, `Faith Cup` y botón `Contacto`. Menú móvil animado.
2. **Hero**: gradient mesh animado (lima/azul sobre negro) + partículas en canvas que reaccionan al mouse. Título "Donde el juego se vuelve historia" con kinetic type (entrada letra por letra, palabra "historia" en contorno). Botones: `Organiza con nosotros` y `Conoce Perfil de Jugador`.
3. **Cifras** (contadores animados): solo si Juanpa entrega números reales. Si no, la sección no se renderiza.
4. **Servicios**: tarjetas glass con brillo que sigue al cursor (spotlight). Contenido de los servicios actuales.
5. **Perfil de Jugador** (sección estrella): celular isométrico en CSS 3D que rota con el scroll y muestra capturas reales de la app (card de jugador, ficha, entrenamientos). Beneficios para clubes (fútbol y voleibol, cards, ficha privada del admin, entrenamientos) y botón `Ver más` → `/perfil-jugador`.
6. **Cómo organizamos tu torneo**: estilo blueprint (cuadrícula de plano, líneas SVG que se dibujan con el scroll), 4 pasos.
7. **Eventos / Faith Cup**: galería con fotos reales y botón `Ver torneo en vivo` → `/torneo.html`.
8. **Patrocinadores**: marquee infinito con los logos actuales.
9. **Redes + Escríbenos**: WhatsApp, Instagram, TikTok de Arena Sports y formulario que abre WhatsApp con el mensaje armado (sin backend).
10. **Footer**.

## Página `/perfil-jugador`
Hero con el celular isométrico grande → qué incluye (cards, ficha privada, entrenamientos, fútbol y voleibol, cada categoría elige deporte) → cómo empezar (3 pasos) → club que ya la usa (Jogo Bonito, Bucaramanga) → CTA `Escríbenos` (WhatsApp) y `Entrar a la app`. Sin precios (modelo de cobro sin decidir).

## Estilos descartados
Cómic, pixel art y ASCII: chocan con el look premium deportivo.

## Rendimiento y accesibilidad
- `prefers-reduced-motion`: sin partículas, sin kinetic type ni rotación 3D; todo aparece directo.
- Celular: menos partículas, sin efecto de cursor, celular isométrico en ángulo fijo.
- Imágenes en webp con tamaño fijo para evitar saltos. Animaciones solo con transform/opacity.
- Contraste legible sobre el gradient mesh.

## Publicación
Vercel. Mientras se construye, la web actual sigue publicada sin cambios. Para el cambio final, en el proyecto de Vercel se pone **Root Directory = `web`** (lo hacemos juntos), y queda todo: landing nueva, `/perfil-jugador` y `/torneo.html`.

## Verificación
Revisión en el navegador (escritorio 1440px y celular 375px), consola sin errores, `npm run build` sin errores, `torneo.html` abre y funciona igual que hoy.

## Pendiente de Juanpa
- Cifras reales (torneos, equipos, jugadores) — opcional.
Redes (tomadas del index.html actual): Instagram y TikTok `@arenasportsco_`, YouTube `@ArenaSportsCo`, correo `arenasports.eventos@gmail.com`.
