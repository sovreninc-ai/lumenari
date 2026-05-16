# Progressive disclosure — muestra el 20% primero

El principio: nunca muestres en el primer contacto lo que el 80% de los usuarios no va a necesitar.

## Formularios

Un formulario con 14 campos espanta a la gente. Tres patrones para comprimirlo:

### A. Solo obligatorios al principio

Muestra solo los campos verdaderamente obligatorios. Agrega un toggle "Más detalles" abajo para los opcionales.

```
Nombre *
Email *

▸ Más detalles (3 campos opcionales)

[ Continuar ]
```

### B. Multi-paso con una sección por pantalla

Cada pantalla es 2-4 campos, una sola columna. El usuario puede ver exactamente cuánto queda ("Paso 2 de 4").

No fake-multi-pasos un formulario de 14 campos en 7 pantallas de 2 campos cada una — eso es peor. Agrupa con sentido.

### C. Defaults inteligentes

Si el 80% de los usuarios elegiría el mismo valor, pre-cárgalo. Menciónalo en el helper text del campo.

```
Moneda: CAD (tu IP sugiere Canadá)
```

## Settings

Las pantallas de settings son las peores ofensoras. La estructura canónica estilo Apple:

```
Más común (≤5 items)
─────────────────────
Item A
Item B
Item C

Avanzado
─────────────────────
▸ Cuenta y privacidad (8 items)
▸ Notificaciones (12 items)
▸ Developer (6 items)
```

Agrupa por modelo mental del usuario, no por tu data model interno.

## Dashboards

Un dashboard debería responder una pregunta arriba del fold: "¿Cómo está mi cosa?".

Todo lo demás es territorio de scroll. El fold superior:

```
[ Número grande — métrica primaria ]
[ Resumen en una oración ]
[ Un único sparkline o visual ]
```

Debajo de eso, data más profunda. El usuario solo scrollea si quiere.

## Páginas de detalle

Muestra lo esencial en la primera carga. Esconde el detalle denso detrás de tabs o expand-on-click.

Por ejemplo, en una página de detalle de un kit:
- Arriba del fold: nombre, tagline, precio, CTA primario
- Debajo del fold: qué incluye (5 bullets, no 50)
- "Archivos que vas a recibir" — lista colapsada por defecto salvo que el usuario clickee para expandir

## Cuándo NO usar progressive disclosure

- Info crítica (consent, pricing, política de refunds) — nunca escondida.
- Errores — siempre visibles de inmediato.
- Confirmaciones obligatorias en acciones destructivas — nunca escondidas.
- Cualquier cosa legalmente requerida de ser conspicua.

## Cómo elegir qué mostrar

Pregunta: "Si el usuario solo pasara 5 segundos en esta pantalla, ¿cuál es la única cosa que tiene que llevarse?"

Eso va arriba del fold, en la tipografía más grande, con el mayor contraste. Todo lo demás es secundario.
