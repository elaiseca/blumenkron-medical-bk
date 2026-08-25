# Plan — Sitio web BlumenKron by Medical BK

> `spec.md` no tiene marcadores `[NEEDS CLARIFICATION]` pendientes (resueltos
> el 2026-08-24). Este plan puede proceder.

## 0. Restricciones heredadas de `CLAUDE.md` que condicionan el diseño

- Sin SDK de servidor de Stripe → toda llamada a Stripe desde el servidor es
  `fetch` directo a `api.stripe.com` con `STRIPE_SECRET_KEY`.
- Sin cliente de base de datos ni auth → no hay modelo de datos persistente
  propio. "Persistencia" en este proyecto = lo que Stripe y Netlify Forms ya
  guardan por su cuenta (dashboard de Stripe, panel de Submissions de
  Netlify), más una notificación al equipo comercial.
- Sin framework de test → solo `node --test` sobre lógica pura, y
  `astro check` + `astro build` como gate de tipos/compilación.
- `tailwindcss` fijado en v3 (config-based), no v4.

## 0.1 Corrección: `output: "server"` no genera HTML estático por sí solo

Detectado al implementar T-013 (2026-08-25): con `output: "server"` (Astro
5), **ninguna página se prerenderiza por defecto** — todas se sirven vía la
función SSR de Netlify en cada request, y `dist/` no contiene ningún
`.html`. Eso rompe la premisa de la sección 4 (Netlify Forms escanea HTML
estático generado en build para detectar `data-netlify="true"`).

**Corrección:** toda página de contenido (no `/api/*`) exporta
`export const prerender = true;`, lo que activa el modo híbrido de Astro
(esa página se genera como HTML estático en build; solo `/api/*` sigue
siendo SSR dinámico vía la función de Netlify). Ya aplicado a
`index.astro` y `membresias.astro`; toda página nueva (`cotizador.astro`,
`red-medica.astro`, `nosotros.astro`, `faq.astro`, `contacto.astro`) debe
incluirlo también.

## 1. Modelo de datos y migraciones

**No aplica.** Este sitio no tiene base de datos propia (ver restricción
arriba). Los tres eventos de negocio de la spec (cotización, contacto,
compra) no se guardan en una tabla nuestra:

- Cotización y contacto → envío nativo a **Netlify Forms** (Netlify lo
  guarda y lo muestra en su panel de "Submissions"; nosotros no lo leemos de
  vuelta).
- Compra de membresía → el registro de verdad es el **objeto de Stripe**
  (Checkout Session / Payment Intent), visible en el Dashboard de Stripe.

Si en el futuro se necesita un modelo de datos propio (p. ej. para la
pregunta abierta que se descartó: "vista de leads dentro del sitio"), esa es
una feature nueva que requiere aprobar una dependencia de base de datos en
`CLAUDE.md` primero.

## 2. Integración de pago (Stripe) — decisión y alternativa

**Opción elegida — Stripe Elements embebido (Payment Element):**
El servidor crea un `PaymentIntent` vía REST (`fetch`, sin SDK) y el cliente
usa `@stripe/react-stripe-js` (ya fijado en el stack) para mostrar el
formulario de tarjeta embebido en `/membresias` sin salir del sitio.

**Alternativa considerada — Stripe Checkout hospedado:**
El servidor crea una `Checkout Session` vía REST y el cliente solo
redirige (`window.location = session.url`) a una página hospedada por
Stripe. Es más simple de implementar y reduce el alcance de PCI, pero deja
sin uso las dependencias `@stripe/react-stripe-js`/`@stripe/stripe-js` que
la constitution ya fijó para este propósito, y saca al usuario del sitio.

*Trade-off*: Elements embebido da mejor experiencia y usa el stack tal como
está fijado, a cambio de más código propio (manejo de estados de carga,
error y confirmación) que Checkout hospedado resuelve solo. Se elige
**Elements embebido** por ser lo que el stack fijado ya anticipa.

Pago único anual (`mode: "payment"`, no suscripción), por decisión de
producto ya confirmada.

## 3. Verificación de webhook de Stripe sin SDK

Stripe firma cada webhook con el header `Stripe-Signature`
(`t=<timestamp>,v1=<hmac>`). Sin el SDK de servidor, se verifica a mano con
`crypto-js`:

1. Tomar el cuerpo crudo (raw) de la petición.
2. Calcular `HMAC-SHA256(secret=STRIPE_WEBHOOK_SECRET, message=`${t}.${rawBody}`)`
   con `crypto-js/hmac-sha256`.
3. Comparar en tiempo constante contra el valor `v1` recibido.
4. Rechazar (400) si no coincide o si `t` tiene más de 5 minutos de
   antigüedad (previene replay).

Esto se aísla en `src/lib/stripe/verifyWebhookSignature.ts` para poder
probarse con `node --test` sin necesidad de red.

## 4. Notificación al equipo comercial (leads + compras)

**Opción elegida — un único canal: Netlify Forms para los 3 eventos.**
Cotizador y Contacto ya postean de forma nativa a Netlify Forms desde el
navegador. El webhook de Stripe (server-to-server) hace un `fetch` POST al
mismo endpoint de formularios (`/`) con `form-name=compra-membresia` y los
datos de la compra, reusando el mismo mecanismo. Netlify se configura
(fuera del código, en su dashboard) para notificar por correo al equipo
comercial en los 3 formularios. Cero dependencias nuevas, cero servicio
externo adicional.

**Alternativa considerada — API de email transaccional (fetch directo, sin
SDK) para los 3 eventos.**
Da más control de formato/remitente, pero agrega una **dependencia de
servicio externo nueva** (cuenta y API key de un proveedor de correo) que
hoy no está aprobada ni es necesaria para cumplir la spec ("solo
notificación"). Se descarta por ahora; queda documentada por si Netlify
Forms resulta insuficiente en producción.

**Riesgo marcado:** la detección de formularios de Netlify exige que el
`<form data-netlify="true">` exista como HTML estático en el build (no solo
dentro de un island que se hidrata en cliente). Si un formulario se
implementa mal (p. ej. renderizado solo por React sin el HTML base), Netlify
no lo detecta y no hay error visible hasta producción. Mitigación: los
formularios de Cotizador y Contacto se escriben como Astro/HTML plano con
mejora progresiva (JS mínimo), no como islands de React.

## 5. Contratos de API (endpoints propios)

### `POST /api/create-payment-intent`

Request:
```json
{
  "plan": "esencial",
  "full_name": "Nombre Apellido",
  "email": "persona@correo.com",
  "phone": "5500000000"
}
```

Response `200`:
```json
{ "clientSecret": "pi_..._secret_...", "amount": 399000, "currency": "mxn" }
```

Errores:
- `400` — `{ "error": "invalid_plan" }` (plan distinto de `esencial`/`integral`)
- `400` — `{ "error": "invalid_body" }` (falta email/nombre o formato inválido)
- `502` — `{ "error": "stripe_unavailable" }` (fetch a Stripe falló o devolvió error)

### `POST /api/stripe-webhook`

Request: envelope estándar de evento de Stripe (`checkout.session.completed`
o `payment_intent.succeeded`), header `Stripe-Signature` obligatorio.

Response:
- `200` — `{ "received": true }`
- `400` — `{ "error": "invalid_signature" }`
- `400` — `{ "error": "stale_timestamp" }`
- `200` — `{ "received": true, "ignored": "unhandled_event_type" }` (otros eventos se aceptan pero no se procesan)

### Formularios Netlify (no son endpoints propios, son el contrato de `name`/campos)

- `name="cotizador"`: `full_name, email, phone, age, sex, postal_code, smoker, suma_asegurada, deducible, coaseguro, prima_estimada`
- `name="contacto"`: `full_name, email, phone, message`
- `name="compra-membresia"` (posteado por el webhook, no por el navegador): `plan, full_name, email, phone, monto, payment_intent_id`

## 6. Cambios en el front — archivos exactos a crear

```
astro.config.mjs
tailwind.config.cjs
postcss.config.cjs
tsconfig.json                         # strict: true, sin "any"
package.json
netlify.toml
.env.example                          # STRIPE_SECRET_KEY, STRIPE_PUBLISHABLE_KEY,
                                       # STRIPE_WEBHOOK_SECRET, PLAN_ESENCIAL_PRICE_MXN,
                                       # PLAN_INTEGRAL_PRICE_MXN
public/favicon.svg
src/styles/global.css                 # tokens de marca (navy, brand-blue, teal,
                                       # brand-light, brand-soft) portados de la
                                       # referencia Lovable, Tailwind v3 @layer
src/layouts/SiteLayout.astro
src/components/Header.astro           # nav + menú móvil con <script> inline, sin
                                       # botón de login (fuera de alcance)
src/components/Footer.astro
src/components/Logo.astro
src/lib/pricing.ts                    # calcPrima(): puerto de la lógica del cotizador
src/lib/plans.ts                      # catálogo de los 2 planes (fuente única de precio)
src/lib/stripe/createPaymentIntent.ts  # fetch a api.stripe.com, sin SDK
src/lib/stripe/verifyWebhookSignature.ts
src/components/checkout/MembershipCheckout.tsx   # React island (Elements + PaymentElement)
src/pages/index.astro
src/pages/membresias.astro
src/pages/cotizador.astro             # form Astro/HTML + <script> para calcPrima en cliente
src/pages/red-medica.astro
src/pages/nosotros.astro
src/pages/faq.astro                   # <details>/<summary> nativos, sin JS
src/pages/contacto.astro
src/pages/api/create-payment-intent.ts
src/pages/api/stripe-webhook.ts
tests/pricing.test.mjs
tests/verifyWebhookSignature.test.mjs
```

No se modifica nada fuera de esta lista sin detenerse a explicar por qué
(regla de implementación, ver Constitution).

## 7. Estrategia de tests

- **Unitarios (`node --test`, sin dependencias nuevas):**
  - `src/lib/pricing.ts` → casos límite de edad, fumador, deducible,
    coaseguro.
  - `src/lib/stripe/verifyWebhookSignature.ts` → firma válida, firma
    inválida, timestamp caducado.
- **Gate de tipos y build (sustituye a e2e, que no está en el stack):**
  `astro check` (0 errores) y `astro build` (build exitoso) son condición
  de "hecho" para cualquier tarea que toque páginas/componentes.
- **Verificación manual documentada** por tarea en `tasks.md` (checklist en
  el propio PR) para lo que no cubre lo anterior: navegación, formularios,
  flujo de pago en modo test de Stripe.
- **Riesgo marcado:** no hay cobertura automatizada de UI/end-to-end. Si se
  necesita, requiere aprobar una dependencia nueva (p. ej. Playwright) en
  `CLAUDE.md` antes de agregarla.

## 8. Plan de rollback

- **Código/deploy:** todo cambio llega a `main` vía PR desde una rama
  `feature/*`. Si un deploy en `main` falla o rompe algo, rollback = (a)
  "Publish deploy" de la versión anterior desde el dashboard de Netlify
  (inmediato, sin tocar git), o (b) `git revert -m 1 <sha-del-merge>` +
  push, que dispara un nuevo deploy limpio.
- **Stripe:** no hay migración de datos que revertir (no hay base de datos
  propia). Si una clave o el webhook se comprometen: rotar
  `STRIPE_SECRET_KEY`/`STRIPE_WEBHOOK_SECRET` en el dashboard de Stripe y en
  las variables de entorno de Netlify; no requiere cambio de código.
- **Netlify Forms:** no hay estado que migrar; deshabilitar un formulario
  específico es quitar `data-netlify="true"` y redeployar.

## 9. Riesgos con servicios externos (marcados explícitamente)

| Servicio | Riesgo | Mitigación |
|---|---|---|
| Stripe (pagos) | Sin SDK de servidor: cambios en la forma de la API REST de Stripe requieren actualizar `fetch` a mano; claves viven en env vars de Netlify. | Aislar todas las llamadas en `src/lib/stripe/*`; tests unitarios de la verificación de firma. |
| Netlify Forms | Límite de envíos por plan de Netlify; detección de formularios requiere HTML estático en build. | Formularios como Astro/HTML plano, no islands React puros; verificación manual en checklist de la tarea correspondiente. |
| Netlify (hosting/adapter) | SSR y `/api/*` dependen de la disponibilidad de Netlify Functions. | Ya es la plataforma fijada por `@astrojs/netlify`; sin alternativa en este alcance. |
