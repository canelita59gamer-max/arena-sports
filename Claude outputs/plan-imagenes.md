# Plan para las ~90 fotos de jugadores

## El problema real

Noventa fotos tomadas por siete iglesias distintas, con teléfonos distintos, en luces distintas. Si entran tal cual al sitio pasan tres cosas, todas malas:

1. **Peso.** Una foto de celular pesa entre 2 y 5 MB. Noventa fotos son entre 180 y 450 MB. Vercel no despliega eso con comodidad y la página tardaría una eternidad en móvil con datos.
2. **Encuadre.** Unas llegarán verticales, otras horizontales, unas de cuerpo entero y otras de medio cuerpo. La ventana de la carta es un rectángulo fijo de 53% × 48,4%; lo que no calce se va a ver cortado por el cuello o con la cara diminuta.
3. **Fondo.** Cada foto traerá un fondo distinto — una pared, una cancha, una sala. Dentro de un marco metálico eso se ve desordenado, no premium.

## La solución en tres pasos

### 1. Cómo las pides (esto ahorra la mitad del trabajo)

Mándale a cada iglesia una instrucción corta. Que sea corta es lo que hace que la cumplan:

> Foto vertical, de la cintura para arriba, con el jugador mirando a la cámara.
> Fondo lo más liso posible — una pared sirve. Buena luz, de día, sin contraluz.
> Una foto por jugador. El nombre del archivo es el nombre completo del jugador.

Ese último punto es el que más tiempo te ahorra: si los archivos llegan como `Samuel Ortiz Gómez.jpg`, el emparejamiento con el roster es automático. Si llegan como `IMG_20260920_114523.jpg`, alguien va a tener que abrir noventa archivos uno por uno.

### 2. Cómo las procesas

No lo hagas a mano. Yo te armo un script que, sobre la carpeta que me pases, hace de una sola pasada:

- **Recorta al encuadre de la carta** detectando la cara, para que todas queden con la cabeza en la misma posición. Esto es lo que hace que las noventa se vean como una colección y no como noventa fotos sueltas.
- **Redimensiona** a 500 × 640 px, que es el doble de lo que la carta necesita en pantalla retina. Más que eso es peso desperdiciado.
- **Convierte a WebP** con calidad 82. De 3 MB por foto se baja a entre 40 y 70 KB. Las noventa juntas quedan en unos 5 MB en total.
- **Normaliza la exposición** un poco, para que la foto tomada a contraluz no desentone junto a la tomada al sol.
- **Nombra el archivo** en formato slug: `samuel-ortiz-gomez.webp`.

Al final te entrega un reporte de cuáles quedaron bien y cuáles hay que volver a pedir — casi siempre son dos o tres: la que salió borrosa, la que salió de espaldas.

### 3. Cómo entran al sitio

Las fotos van a `assets/images/jugadores/`. En el código se agrega un mapa igual al de los escudos:

```js
const FOTOS_JUGADOR = {
    'Samuel Ortiz Gómez': 'assets/images/jugadores/samuel-ortiz-gomez.webp',
};
```

El script te genera ese bloque ya escrito para que solo lo pegues. Y como el emparejamiento es por nombre exacto del roster, si un jugador no tiene foto la carta sigue mostrando sus iniciales — no se rompe nada.

## Orden sugerido

No esperes a tener las noventa. Trabaja por iglesia:

| Paso | Qué hacer |
|---|---|
| 1 | Pide las fotos a **una** iglesia primero, la que responda más rápido |
| 2 | Procesamos esas ~13 y las montamos |
| 3 | Revisas cómo se ven en la carta real y ajustamos el encuadre si hace falta |
| 4 | Con el encuadre ya aprobado, entran las seis iglesias restantes en lote |

El paso 3 es el importante. Es mucho más barato corregir el recorte con trece fotos que con noventa.

## Escudos de las iglesias

Van en el mismo pedido, pero son otro formato: **PNG con fondo transparente**, lo más grande que tengan. En la carta el escudo se ve en grande, así que un logo sacado de una captura de pantalla de Facebook se va a ver pixelado. Si alguna iglesia no tiene el logo en buena calidad, dímelo y lo redibujo.

Son solo siete archivos y van a `assets/images/escudos/`.

## Lo que necesito de ti para arrancar

- La carpeta con las fotos de la primera iglesia (compartida donde te quede cómodo)
- Los siete nombres de equipo **exactamente** como están en el panel de administración, para que el emparejamiento no falle por una tilde
