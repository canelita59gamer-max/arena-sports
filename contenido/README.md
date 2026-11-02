# Contenido — Arena Sports / Perfil de Jugador

Carpeta dedicada únicamente a la producción de video para redes sociales (una sola cuenta de IG/TikTok/FB/YouTube para Arena Sports y Perfil de Jugador). No toca el código del sitio ni del torneo.

## Tablero (idea → guion → edición → lanzamiento)

El seguimiento de cada pieza vive en el Kanban:
https://claude.ai/artifact/6obaw5JXgpkhVAXQu28ykd

No se duplica aquí en archivos — esta carpeta es donde vive el *trabajo* (guiones, escenas, salidas), el tablero es el estado.

## Estructura

- `ideas/` — notas sueltas que todavía no tienen guion.
- `guiones/` — guion final de cada pieza (5 bloques: hook, qué grabar, guion hablado, pie, por qué funciona).
- `produccion/` — escenas HTML (fuente), screenshots, scripts de Playwright/ffmpeg.
- `salidas/` — videos finales (.mp4) listos para publicar.

## Estado de herramientas (1 nov 2026)

**Lo que ya funciona y es gratis (no toca el plan pago aparte):**
- Capturas reales de la app con Playwright + escenas HTML propias.
- Ken Burns (zoompan) + transiciones xfade rápidas (0.2s) con ffmpeg.
- **Remotion** (`/home/claude/video-promo/remotion-project`) para animación real (texto con resorte, movimiento real) en vez de zoom estático — instalado pero *aún sin usar en una pieza final*, pendiente de migrar el pipeline a esto como estándar.
- **Música real** vía ElevenLabs (`eleven_music_v2_5`): ~$0.09 USD por pieza (4 variaciones), reemplaza el beat sintetizado que se usaba antes. A partir de ahora, por defecto.

**Lo que falta y requiere decisión de Juanpa:**
- **Video generado por IA real** (movimiento de cámara, acción real sin necesidad de footage propio) — modelos tipo Kling/Veo/Seedance. Esto SÍ requiere plan pago de Higgsfield (ya no está incluido en el gratis de ElevenLabs tampoco). Opciones cotizadas 1 nov 2026:
  - Higgsfield **Plus**: $49/mes (anual $39/mes), 1000 créditos ≈ 200 videos Kling/mes.
  - Higgsfield **Ultra**: $99/mes anual, 3000 créditos ≈ 500 videos/mes, 70% más barato por crédito.
  - Para el volumen actual (2-3 piezas/semana entre las dos cuentas), **Plus** alcanza de sobra.
- Footage real de cancha: los clips que Juanpa sube a Google Drive pesan 93MB-738MB — el conector de Drive no puede traerlos (se transmiten como texto base64 dentro de la respuesta, no como descarga de archivo). Única vía práctica: Juanpa recorta un clip corto (5-15s) y lo sube directo al chat.

## Reglas heredadas de las skills de contenido

Ver `.claude/skills/guiones-arena-sports/`, `.claude/skills/reels-perfil-jugador/` y `.claude/skills/pipeline-video-promo/` en el repo `perfil-jugador` — siguen siendo la fuente de verdad para tono, hooks y comandos técnicos. Esta carpeta es donde se ejecuta lo que esas skills describen, no un reemplazo de ellas.
