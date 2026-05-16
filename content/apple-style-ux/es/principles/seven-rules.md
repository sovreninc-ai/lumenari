# Las Siete Reglas — versión larga

## 1. Una acción primaria por pantalla.

Al cerebro le toma unos cientos de ms decidir a qué mirar en una pantalla nueva. Si hay tres botones del mismo estilo, son trescientos ms desperdiciados. Si hay un botón obviamente primario y uno obviamente secundario, el usuario decidió en cero ms.

**Regla visual:** solo un botón relleno por pantalla. Todo lo demás es text-link, outline o icono.

**Anti-ejemplo:** el fondo de un diálogo "¿estás seguro?" con tres botones rojos rellenos. Elige uno.

## 2. El español llano gana.

El copy de Apple se lee como un amigo contándote lo que está por pasar.

| Copy corporate | Copy estilo Apple |
|---|---|
| Inicializar proceso de backup | Hacer backup ahora |
| Configurar preferencias de notificaciones | Elige sobre qué notificarte |
| Se requiere autenticación | Inicia sesión para continuar |
| Ha ocurrido un error (Error 0x9F) | No se pudo guardar. Revisa tu conexión e inténtalo de nuevo. |

Si no se lo dirías a un amigo en tu cocina, no lo pongas en la pantalla.

## 3. Default a "simplemente hazlo".

Cuando el 90% de los usuarios quiere el mismo resultado, preguntar es fricción. Ejemplos:

- **Malo:** "¿Quieres habilitar el autosave?" (sí, obvio)
- **Bueno:** guarda automáticamente. Muestra "Todos los cambios guardados" en el chrome.

- **Malo:** "¿Te gustaría recibir confirmaciones por email?" (sí, obvio)
- **Bueno:** envía la confirmación. Incluye un link de Unsubscribe.

- **Malo:** "¿Permitir notificaciones?" al primer launch
- **Bueno:** espera hasta que el usuario esté por hacer algo donde una notificación sea genuinamente útil, después pregunta en contexto.

La excepción son las acciones irreversibles o caras — esas merecen una confirmación.

## 4. El whitespace es una feature.

La mayoría de los diseños está 20-30% demasiado apretada. Prueba aumentar todo el padding 1.25x y todos los gaps 1.5x. Casi siempre se siente mejor.

**Regla práctica:** si dos elementos visuales adyacentes se sienten como si se pertenecieran cuando no deberían, aumenta el gap. Si se sienten separados cuando no deberían, redúcelo. Ajusta hasta que la relación sea inequívoca.

## 5. Jerarquía por tamaño + peso, no color + cajas.

Una página puede tener:
- Un H1 (32-48px, semibold)
- Un puñado de H2s (22-28px, semibold)
- Body text (16-17px, regular)
- Unos pocos captions (13-14px, regular, muted)

Eso alcanza como jerarquía para casi cualquier pantalla. Agregar badges de colores, drop shadows y cajas-alrededor-de-cosas suele ser señal de que la escala tipográfica no está haciendo su trabajo.

## 6. Progressive disclosure.

La primera vez que un usuario ve una feature, muéstrale el 20% que va a usar el 80% del tiempo. Mete el resto detrás de:

- Un toggle de "Más opciones"
- Una segunda pantalla
- Un panel de detalle al costado derecho
- Long-press / right-click

**Anti-ejemplo:** una pantalla de settings con 40 toggles en una lista plana. Los primeros 6 deberían ser obvios; los siguientes 34 deberían estar en una sección "Avanzado" que se abre al tap.

## 7. La animación tiene una razón o no existe.

Las animaciones de Apple tienen uno de tres trabajos:
1. **Mantener continuidad espacial** — cuando algo aparece, anímalo desde donde vino (un modal sube desde el fondo de la pantalla, una vista de detalle entra desde la derecha).
2. **Comunicar cambio de estado** — un checkmark que se dibuja después de que un save tuvo éxito.
3. **Enmascarar la espera** — un fade-in de 200ms en una card recién cargada es mejor que un pop duro.

Eso es todo. Bounce en hover, parallax por parallax, glow al click — todo se lee como "queríamos parecer modernos" en lugar de "queríamos ser útiles".

**Reglas de timing:**
- 150-250ms: la mayoría de las micro-interacciones
- 300-400ms: transiciones de página
- > 500ms: raro e intencional

**Easing:** cubic-bezier(0.16, 1, 0.3, 1) para "cosas que deberían sentirse snappy y naturales" — Apple usa algo similar.

---

## Cómo aplicar esto

Toma una pantalla que hayas enviado. Lee las reglas en orden. Para cada regla, pregunta: "¿Dónde está violando esto esta pantalla?". No intentes arreglar todo a la vez — arregla la que esté más violada.

El mismo truco funciona para la salida de diseño de tu IA. Pega este archivo en el system prompt y pregunta: "Revisa esta pantalla contra las siete reglas. Dime cuál está más violada."
