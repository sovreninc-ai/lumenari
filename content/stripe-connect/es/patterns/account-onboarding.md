# Stripe Connect: onboarding de cuentas

Dos opciones reales: Express y Standard. (Custom existe; no la quieres salvo que tengas un equipo de compliance.)

## Express — el default correcto

Tú eres el dueño de la relación con el cliente y la marca. La connected account usa un dashboard de Stripe recortado para payouts y documentos fiscales.

**Pros**
- El onboarding es un formulario hospedado de 5 minutos
- Tú controlas branding, UX, manejo de disputas
- Menor carga de compliance sobre la connected account
- Las connected accounts pueden ser personas o negocios chicos

**Cons**
- La connected account no puede customizar a fondo su experiencia de Stripe
- Algunas features avanzadas (revenue recurrente al nivel de la connected) necesitan config adicional

Usa Express cuando: tu plataforma es dueña del cliente, tú manejas soporte, la connected account es el "supplier".

## Standard — cuando la connected account es el merchant

La connected account tiene un dashboard completo de Stripe. Maneja sus propias disputas, su propia config fiscal. Tú eres más una fuente de referidos que una plataforma real.

**Pros**
- La connected account tiene acceso completo a Stripe
- Menor responsabilidad de la plataforma

**Cons**
- El cliente ve la marca de la connected account en los recibos
- Las disputas van a la connected account — tu plataforma tiene menos visibilidad
- El onboarding es más largo (signup real de Stripe)

Usa Standard cuando: la connected account ya opera su propio negocio y tú solamente le estás habilitando recibir pagos por tu plataforma.

## De crear-cuenta al primer cobro

```ts
// 1. Crear la connected account
const account = await stripe.accounts.create({
  type: "express",
  country: "CA",
  email: org.contactEmail,
  capabilities: {
    card_payments: { requested: true },
    transfers: { requested: true },
  },
  business_type: org.businessType, // 'individual' | 'company'
  metadata: { organization_id: org.id },
});

// 2. Persistir el ID de la cuenta contra la org
await db.from("organizations")
  .update({ stripe_account_id: account.id })
  .eq("id", org.id);

// 3. Generar un onboarding link
const link = await stripe.accountLinks.create({
  account: account.id,
  refresh_url: `${SITE}/settings/payouts?refresh=1`,
  return_url: `${SITE}/settings/payouts?done=1`,
  type: "account_onboarding",
});

// 4. Redirigir al usuario. Vuelve a /settings/payouts.
return redirect(link.url);
```

## Verificar que la cuenta realmente esté lista

Escucha el webhook `account.updated`. El charge-readiness tiene dos flags:

```ts
const ready =
  account.charges_enabled === true && account.payouts_enabled === true;
```

Ambos tienen que ser true. `charges_enabled` sin `payouts_enabled` significa que Stripe va a aceptar pagos pero no puede pagar — lo que normalmente significa que la connected account no terminó la verificación bancaria.

Bloquea tu UI sobre `ready`. No dejes que una org empiece a cobrar si Stripe no está listo para pagarle.

## Impuestos y legal

- **La plataforma** suele ser responsable de cobrar sales tax si es dueña de la relación con el cliente (Express).
- **La connected account** es responsable si es dueña de la relación con el cliente (Standard).
- **Recolección de W-9 / W-8 / T1** la hace Stripe durante el onboarding para connected accounts de US/Canadá.
- **Emisión de 1099-K (US) / T4A (Canadá)** la maneja Stripe — no emites estos formularios a mano a tus connected accounts.

Si tu plataforma está haciendo > USD $20K y > 200 transacciones por connected account al año (umbral 1099-K de US), Stripe se encarga del formulario. Verifica que la dirección registrada sea correcta antes del cierre del año.
