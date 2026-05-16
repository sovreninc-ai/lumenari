# Checklist PR-ready

Repasa esto antes de abrir un PR. La meta es "¿podría un ingeniero senior darle +1 en una sola lectura?"

## Calidad de código

- [ ] `npm run typecheck` limpio
- [ ] `npm run lint` limpio
- [ ] `npm run build` limpio
- [ ] Sin `console.log` dejados atrás (usa un logger o quítalos)
- [ ] Sin bloques de código comentados
- [ ] Todos los archivos nuevos tienen al menos un docblock arriba explicando el propósito

## Type safety

- [ ] Sin `any` (usa `unknown` + narrowing en su lugar)
- [ ] Sin casts `as Type` que no estén justificados por un comentario
- [ ] Las props de los componentes tienen interfaces explícitas, no inline `{a, b}: {a: string; b: number}`
- [ ] Todas las funciones async o esperan con await o devuelven la promesa; nada de fire-and-forget sin un comentario

## Capa de datos

- [ ] Los cambios de schema están en un archivo de migración bajo `supabase/migrations/`
- [ ] Las tablas nuevas tienen RLS habilitado con políticas explícitas
- [ ] El cliente service-role solo se importa en route handlers / server actions
- [ ] Sin `select *` para tablas con columnas sensibles

## Seguridad

- [ ] El input del usuario pasa por un schema de Zod antes de tocar la DB
- [ ] Los valores monetarios se guardan y calculan como centavos enteros
- [ ] Sin secretos en código de cliente ni en variables `NEXT_PUBLIC_*`
- [ ] Las superficies CSRF (server actions, route handlers) están auth-gated

## UX

- [ ] Los formularios tienen labels accesibles + `aria-invalid` + errores visibles
- [ ] Estados de loading para cualquier acción que tarde >300 ms
- [ ] Estados empty para cualquier lista que pueda estar vacía
- [ ] Funciona en viewport de 320px (prueba en DevTools)
- [ ] Targets táctiles ≥44pt en móvil

## Tests

- [ ] ¿Tocaste RLS? Un test de integración demuestra el límite cross-tenant
- [ ] ¿Tocaste un camino de pago o de dinero? Test de idempotencia de webhook
- [ ] ¿Tocaste auth? Test de que un request no autenticado es rechazado

## Operacional

- [ ] El título del PR es un semantic commit (`feat:`, `fix:`, `refactor:` …)
- [ ] La descripción del PR tiene: qué, por qué, cómo probarlo
- [ ] DECISIONS.md actualizado si este PR cambió una decisión arquitectónica
- [ ] STATE.md actualizado si este PR movió el estado del proyecto hacia adelante

## El "test del sueño"

> ¿Te podrías ir a la cama justo después de mergear esto y estar tranquilo con que quede vivo 8 horas sin supervisión?

Si no — ¿cuál es el test, alerta o feature flag que falta?
