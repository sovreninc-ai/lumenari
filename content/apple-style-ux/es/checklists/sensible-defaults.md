# Checklist de Sensible Defaults

La regla: pregúntale al usuario solo cuando la respuesta genuinamente importe y no la puedas inferir.

## Defaults para aplicar en silencio

| Decisión | Default sensato |
|---|---|
| Moneda | País detectado por IP del usuario, con un switcher de un tap |
| Idioma | Header `Accept-Language` del navegador, switcher en settings |
| Timezone | Detectado por navegador, mostrado pero no interrumpiendo |
| Formato de fecha | Apropiado al locale (en-CA → YYYY-MM-DD; en-US → MM/DD/YYYY) |
| Onboarding de primera vez | Saltarse el carrusel de bienvenida; aterrizar directo en el empty state |
| Frecuencia de email | Transaccional + update mensual de producto, con un link de Unsubscribe |
| Theme | Matchea `prefers-color-scheme: dark` |
| Notificaciones | Off hasta que el usuario haga algo donde una sea útil |
| Autosave | On |
| Confirmación en destructivos | On (el diálogo mismo es la fricción) |
| Formato de save | El formato con el que abrieron (PDF queda PDF, .md queda .md) |
| Orden de sort | Más reciente primero |
| Paginación | 20 items por página |

Si te encuentras agregando "¿te gustaría…" a la UI, pregúntate: ¿puedo simplemente hacer la cosa y ofrecer Undo?

## Cuándo preguntarle al usuario

Pregunta cuando:

1. **La acción es destructiva y no fácilmente reversible.** Eliminar una cuenta, purgar historial.
2. **La acción cuesta dinero real.** Reservar una sesión, procesar un pago.
3. **La elección afecta el comportamiento posterior de forma significativa.** Elegir un nombre de workspace, elegir un equipo para arrancar.
4. **Genuinamente no puedes inferir.** Nombre. Cargo. Por qué están usando el producto.

Pregunta una cosa por pantalla. No empaques cinco preguntas en un solo formulario.

## Cómo preguntar bien

```
[ Pregunta de una oración que también es heading ]

[ Body text — solo si la pregunta necesita contexto ]

[ La superficie de elección — grupo de chips, radio o text field ]

[ Botón Continuar — deshabilitado hasta que se haya elegido ]
```

Ejemplos:

> **¿Qué deporte coachea tu club?**
> Vamos a setear los grupos de edad, divisiones y defaults de scheduling correctos.
>
> [ Fútbol ] [ Hockey ] [ Básquet ] [ Béisbol ] [ Otro ]
>
> [ Continuar → ]

vs. la versión mala:

> ☐ Selecciona tu deporte primario
> ☐ Selecciona tu deporte secundario (opcional)
> ☐ Selecciona tu federación
> ☐ Selecciona la duración típica de tu temporada
> ☐ Selecciona tus grupos de edad (multi-select)
>
> [ Submit ]

La versión mala son cinco preguntas antes de cualquier respuesta. La buena pregunta una e infiere el resto.

## La versión más difícil

La versión más difícil de esto es: "¿qué debería hacer esta IA cuando la intención del usuario es ambigua?".

Default: elige la interpretación más plausible, haz la cosa, y dile al usuario qué hiciste. Ofrece cambiar de interpretación.

```
Asumí que querías decir la temporada primavera 2026 (la activa).
Si querías otra temporada, acá hay una forma de cambiarlo.
```

Así funcionan las superficies "¿Quisiste decir…?" de Apple. No bloquees; ofrece.
