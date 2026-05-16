# Patrones de microcopy

## Botones

Los botones describen un resultado, no una acción del sistema. Empiezan con un verbo.

| Malo | Bueno |
|---|---|
| Submit | Enviar invitación |
| OK | Guardar cambios |
| Process | Pagar ahora |
| Confirm | Cancelar registración |
| Sí | Eliminar evento |

La regla: lee el copy del botón aislado. ¿Puedes decir qué está por pasar? Si no, reescribe.

Para acciones destructivas, el verbo mismo hace la advertencia: "Eliminar cuenta" — no "¿Estás seguro?" dos veces seguidas.

## Empty states

Un empty state es la primera impresión que el usuario tiene de una pantalla. No la desperdicies con "No items found".

La forma:

```
[ Icono — modesto, no decorativo ]

Titular que explica para qué es esta pantalla
cuando tiene contenido (1 oración)

Body con una oración que explica cómo llegar.

[ El CTA que los lleva ahí ]
```

Ejemplos:

> **Tu biblioteca está vacía por ahora.**
> Una vez que compres un kit, cada descarga que vayas a necesitar vive acá.
> [ Explorar kits → ]

> **No hay eventos esta semana.**
> Cuando tu coach programe una práctica o partido, va a aparecer acá.
> [ Ver próximos → ]

## Errores

Un buen mensaje de error responde tres preguntas:
1. ¿Qué pasó?
2. ¿De quién es la culpa (sistema o yo)?
3. ¿Qué hago ahora?

```
No pudimos guardar tu borrador.
Se perdió la conexión. Inténtalo de nuevo — tu texto sigue acá.
[ Reintentar ] [ Guardar copia offline ]
```

Cosas para evitar:
- "Algo salió mal" — inútil
- Códigos de error solos — para soporte, no para el usuario (mételos en los detalles, no en el titular)
- Culpar al usuario implícitamente ("input inválido" — ¿inválido según qué criterio?)
- Stack traces

## Onboarding

Cada paso del onboarding tiene un trabajo. No combines trabajos.

El patrón de onboarding de Apple suele ser:
1. **Pantalla de bienvenida / value-prop** — qué hace esta app, una oración
2. **La única pregunta de permiso que importa** — y solamente esa
3. **La primera pantalla útil** — no un tutorial, el producto real

Anti-patrón: un carrusel de 5 pantallas explicando cada feature. El usuario todavía no se ganó la paciencia para leerlas.

Si una feature necesita explicación, explícala inline la primera vez que aparece, con un dismiss de "Entendido" u "OK".

## Diálogos de confirmación

Reserva para acciones irreversibles o caras. Cada uno es un impuesto de fricción.

Forma:

```
Qué está por pasar (1-2 oraciones, específicas)

[ Cancelar ] [ Verbo-la-acción ]
```

Ejemplo:

> **¿Eliminar este evento?**
> Los 14 RSVPs y los archivos subidos se van a borrar también.
>
> [ Cancelar ] [ Eliminar evento ]

Nota: el botón primario es el verbo de acción, no "Sí". El cancel es secundario, no con el mismo peso.

## Loading states

Tres sabores:

1. **< 200ms** — no muestres nada. El ojo no lo nota.
2. **200ms - 2s** — un spinner sutil o un skeleton en lugar del contenido que falta.
3. **> 2s** — mensaje explícito: "Generando tus recomendaciones de kits…" — para que el usuario sepa que algo está pasando por su cuenta.

Los spinners indeterminados son honestos solo cuando de verdad no puedes estimar. Si puedes estimar, usa una barra de progreso.

## Estados de éxito

Una acción exitosa no necesita un modal que se felicite a sí mismo. Un toast, un checkmark, un slide-in sutil que diga "Guardado" alcanza.

Reserva los estados celebratorios para hitos genuinos (primera factura pagada, cliente número cien, etc.) — y aun así, mantenlos breves.
