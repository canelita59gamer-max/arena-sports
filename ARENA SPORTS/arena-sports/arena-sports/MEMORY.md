# MEMORY.md — Arena Sports
> Contexto completo del proyecto. Actualizar cada vez que haya un cambio importante.
> Última actualización: Mayo 2025

---

## EL PROYECTO

**Nombre:** Arena Sports
**Eslogan:** *"Donde el juego se vuelve historia."*
**Tipo:** Organización profesional de eventos deportivos
**Fundador:** Julio (Floridablanca, Santander, Colombia)
**Colaborador técnico:** Amigo de Julio (edita desde VS Code)
**Estado actual:** En construcción — sitio web listo, logo en proceso

---

## VISIÓN Y MODELO DE NEGOCIO

### Qué hace Arena Sports
Organiza torneos y eventos deportivos con estándares profesionales para:
- Comunidades e iglesias
- Empresas (ligas corporativas)
- Instituciones educativas
- Eventos abiertos intercomunidades

### Deportes que cubre
- Fútbol
- Básquetbol
- Voleibol
- Multideporte

### Modelo de ingresos
- Inscripciones de equipos
- Paquetes de patrocinio (Oro / Plata / Bronce)
- Ligas corporativas
- Consultoría deportiva

### Visión de crecimiento (en orden)
1. ✅ Primer torneo — I Torneo Interiglesias 2025 (en curso)
2. Ser la liga de referencia en Floridablanca / Bucaramanga
3. Expandirse a todo Colombia
4. Marca deportiva de nivel internacional

---

## PRIMER EVENTO (ANTECEDENTE)

- **Nombre:** Confraternidad Deportiva Navideña
- **Fecha:** Diciembre 2024
- **Lugar:** Polideportivo El Bosque
- **Participantes:** 4 iglesias
- **Campeón:** Iglesia Cuadrangular Central
- **Significado:** El evento que originó Arena Sports

---

## TORNEO ACTUAL EN CURSO

- **Nombre:** I Torneo Interiglesias 2025
- **Deporte:** Fútbol
- **Equipos:** 6
- **Fase actual:** Grupos
- **Próximos hitos:**
  - Semifinales: 15 Nov 2025
  - Gran Final: 29 Nov 2025

### Tabla de posiciones actual (placeholder — actualizar con datos reales)
| Pos | Equipo | Iglesia | PJ | G | E | P | GF | GC | DG | Pts |
|-----|--------|---------|----|----|---|---|----|----|-----|-----|
| 1 | Los Guerreros | Ig. Cuadrangular Central | 6 | 5 | 1 | 0 | 18 | 6 | +12 | 16 |
| 2 | Fuerzas de Vida | Centro Cristiano El Camino | 6 | 4 | 1 | 1 | 14 | 8 | +6 | 13 |
| 3 | Escudo de Fe | Ig. Bautista Restauración | 6 | 3 | 2 | 1 | 11 | 9 | +2 | 11 |
| 4 | Transformados FC | Comunidad Cristiana Shalom | 6 | 2 | 2 | 2 | 9 | 10 | -1 | 8 |
| 5 | Águilas del Rey | Ig. Pentecostal Unida | 6 | 1 | 3 | 2 | 7 | 11 | -4 | 6 |
| 6 | Mensajeros | Ig. Evangélica Betel | 6 | 1 | 1 | 4 | 5 | 14 | -9 | 4 |

---

## IDENTIDAD DE MARCA

### Nombre y eslogan
- **Marca:** Arena Sports
- **Eslogan:** "Donde el juego se vuelve historia."
- **Por qué "Arena":** Evoca el coliseo romano — competencia, espectáculo, grandeza. Universal en español e inglés.

### Paleta de colores (OFICIAL — no cambiar)
| Nombre | Hex | Uso |
|--------|-----|-----|
| Negro principal | `#080808` | Fondo |
| Amarillo eléctrico | `#E8FF00` | Acento, logo "ARENA", detalles |
| Blanco suave | `#F0F0F0` | Textos principales, logo "SPORTS" |
| Gris medio | `#A0A0A0` | Textos secundarios |
| Gris oscuro 1 | `#111111` | Secciones alternas |
| Gris oscuro 2 | `#191919` | Cards y componentes |
| Borde | `#2C2C2C` | Separadores y bordes |

### Tipografía (OFICIAL)
- **Oswald** — Títulos, wordmark, nav, botones
- **Inter** — Párrafos, descripciones, body text

### Logo
- **Estado:** En proceso de generación con Gemini AI
- **Concepto aprobado:** Atleta dinámico en movimiento con balones (fútbol + voleibol), letras "AS" al fondo, línea de velocidad
- **Versión A (preferida):** Humano en `#E8FF00`, letras y balones en `#F0F0F0`
- **Versión B:** Humano en `#F0F0F0`, letras y balones en `#E8FF00`
- **Pendiente:** Integrar en la página y generar assets para redes

### Username en redes sociales
- **Handle oficial:** `@ArenaSportsCo`
- **Por qué "Co":** `@ArenaSports` probablemente tomado; "Co" = Colombia o Company
- Aplicar en: Instagram, YouTube, TikTok, Facebook, LinkedIn

---

## SITIO WEB

### Estructura del proyecto
```
arena-sports/
├── index.html          ← Página principal
├── css/styles.css      ← Todos los estilos
├── js/main.js          ← Animaciones scroll reveal
├── assets/
│   ├── logos/          ← Logo (pendiente)
│   └── images/         ← Fotos de eventos (pendiente)
├── CLAUDE.md           ← Instrucciones para Claude
├── MEMORY.md           ← Este archivo
├── SKILL.md            ← Guía técnica del sitio
└── README.md           ← Guía para el equipo
```

### Secciones de la página (en orden)
1. **Nav** — Logo + links + botón contacto
2. **Hero** — Eslogan principal + 4 deportes en grid
3. **Ticker** — Banda animada con nombre y eslogan
4. **Servicios** — 6 tipos de servicio
5. **Tabla de posiciones** — I Torneo Interiglesias 2025
6. **Historial** — Eventos realizados (antecedentes)
7. **Próximos eventos** — Agenda 2025-2026
8. **Patrocinadores** — Paquetes + logos + CTA
9. **Visión** — Texto + 4 metas en escalera
10. **Redes sociales** — Cards a cada red
11. **Contacto** — Info + formulario
12. **Footer** — Logo + eslogan + copyright

### Dominio objetivo
`arenasports.com.co`

### Pendientes técnicos
- [ ] Integrar logo real en nav y hero
- [ ] Actualizar @handles de redes con @ArenaSportsCo
- [ ] Conectar formulario (Formspree recomendado — gratis)
- [ ] Subir a hosting (Netlify recomendado — gratis)
- [ ] Registrar dominio arenasports.com.co

---

## PATROCINADORES

### Paquetes disponibles
- **Oro:** Logo en camisetas + banner principal + redes + transmisión en vivo
- **Plata:** Logo en banner lateral + mención en redes + ceremonia
- **Bronce:** Logo en material digital + mención en publicaciones

### Estado actual
- Sin patrocinadores confirmados aún
- 1 slot marcado como "Tu Empresa" (placeholder)
- 5 slots disponibles

---

## DECISIONES TOMADAS (para no repetir)

| Decisión | Elegido | Descartado |
|----------|---------|------------|
| Nombre | Arena Sports | Élite Sports Group, Nexo Sports, Cumbre Deportiva |
| Eslogan | "Donde el juego se vuelve historia." | Variantes anteriores |
| Username | @ArenaSportsCo | @ArenaSports (tomado), otros |
| Logo v1 | Coliseo con flecha | Descartado — no representaba deporte |
| Logo v2 | Escudo "AS" | Descartado — parecía empresa genérica |
| Logo v3 | Atleta dinámico con "AS" | ✅ APROBADO — en refinamiento de colores |
| Enfoque página | Organizadora profesional amplia | Solo interiglesias |
