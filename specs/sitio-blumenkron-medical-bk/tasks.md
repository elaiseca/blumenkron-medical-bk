# Tasks — Sitio web BlumenKron by Medical BK

Orden de ejecución. `[P]` = puede ejecutarse en paralelo con las otras tareas
marcadas `[P]` en el mismo bloque (no comparten archivos ni dependen entre
sí). Los tests de un criterio de aceptación van como tarea propia ANTES de
su implementación.

- [x] **T-001 — Scaffold del proyecto**
  - Archivos: `package.json`, `astro.config.mjs`, `tsconfig.json`, `postcss.config.cjs`, `tailwind.config.cjs`, `netlify.toml`, `.env.example`, `public/favicon.svg`
  - Hecho cuando: `npm install` y `npm run build` corren sin error sobre un sitio Astro mínimo.
  - Dependencias: ninguna.

- [x] **T-002 — Tokens de marca y estilos globales** `[P]`
  - Archivos: `src/styles/global.css`
  - Hecho cuando: `npm run build` sigue pasando; colores/gradientes de marca (navy, brand-blue, teal, brand-light, brand-soft, `gradient-hero`, `gradient-accent`) definidos y usados en al menos una página de prueba.
  - Dependencias: T-001.

- [x] **T-003 — Layout y navegación**
  - Archivos: `src/layouts/SiteLayout.astro`, `src/components/Header.astro`, `src/components/Footer.astro`, `src/components/Logo.astro`
  - Hecho cuando: una página de prueba con `SiteLayout` renderiza el header con los 7 links (Inicio, Membresías, Red Médica, Nosotros, Cotizador, FAQ, Contacto) y el footer con los datos de contacto; el menú móvil abre/cierra; `astro check` sin errores.
  - Dependencias: T-001, T-002.

- [x] **T-004 — Test de la calculadora de prima (debe fallar primero)** `[P]`
  - Archivos: `tests/pricing.test.mjs`
  - Hecho cuando: `npm test` corre y este archivo **falla** porque `src/lib/pricing.ts` no existe aún (se pega la salida real del fallo).
  - Dependencias: T-001.

- [x] **T-005 — Implementar calculadora de prima**
  - Archivos: `src/lib/pricing.ts`
  - Hecho cuando: `npm test` pasa en verde para `tests/pricing.test.mjs`.
  - Dependencias: T-004.

- [x] **T-006 — Catálogo de planes** `[P]`
  - Archivos: `src/lib/plans.ts`
  - Hecho cuando: exporta los 2 planes (Esencial $3,990, Integral $4,990 MXN+IVA/año) con su tagline y las 10 filas de beneficios del comparativo; `astro check` sin errores.
  - Dependencias: T-001.

- [x] **T-007 — Página de inicio**
  - Archivos: `src/pages/index.astro`
  - Hecho cuando: `npm run build` exitoso; la página renderiza hero, las 4 cifras (116 clínicas, 24/7, 100K+ familias, 4.8★), los 4 pilares, preview de los 2 planes (usando `src/lib/plans.ts`) con CTA a `/cotizador` y `/membresias`, preview de red médica, y CTA final a `/cotizador` y `/contacto`. Verificación manual: `astro preview` navegado a `/`.
  - Dependencias: T-003, T-006.

- [ ] **T-008 — Test de verificación de firma de webhook (debe fallar primero)** `[P]`
  - Archivos: `tests/verifyWebhookSignature.test.mjs`
  - Hecho cuando: `npm test` corre y este archivo **falla** porque `src/lib/stripe/verifyWebhookSignature.ts` no existe aún.
  - Dependencias: T-001.

- [ ] **T-009 — Implementar verificación de firma de webhook**
  - Archivos: `src/lib/stripe/verifyWebhookSignature.ts`
  - Hecho cuando: `npm test` pasa en verde para `tests/verifyWebhookSignature.test.mjs` (firma válida, firma inválida, timestamp caducado).
  - Dependencias: T-008.

- [ ] **T-010 — Endpoint crear Payment Intent**
  - Archivos: `src/lib/stripe/createPaymentIntent.ts`, `src/pages/api/create-payment-intent.ts`
  - Hecho cuando: `npm run build` exitoso; verificación manual con `curl` (Stripe en modo test): 200 + `clientSecret` para plan válido, 400 para plan inválido, 400 para body inválido.
  - Dependencias: T-001, T-006.

- [ ] **T-011 — Endpoint webhook de Stripe**
  - Archivos: `src/pages/api/stripe-webhook.ts`
  - Hecho cuando: `npm run build` exitoso; verificación manual (payload de prueba firmado a mano o Stripe CLI en modo test): 200 con firma válida, 400 con firma inválida.
  - Dependencias: T-009, T-010.

- [ ] **T-012 — Componente de pago embebido (React island)**
  - Archivos: `src/components/checkout/MembershipCheckout.tsx`
  - Hecho cuando: `astro check` sin errores; en `astro preview`, el Payment Element de Stripe se muestra embebido y una tarjeta de prueba (4242 4242 4242 4242) confirma el pago y muestra el estado de éxito.
  - Dependencias: T-010.

- [x] **T-013 — Página de membresías (comparativo, sin checkout todavía)**
  - Archivos: `src/pages/membresias.astro`
  - Hecho cuando: `npm run build` exitoso; muestra los 2 planes con precio/tagline y la tabla comparativa completa (10 filas); el botón "Comprar" es un placeholder que enlaza a `/cotizador` (nota visible de "pago en línea próximamente") hasta que exista `MembershipCheckout` (T-012).
  - Dependencias: T-003, T-006.
  - Nota: se adelantó respecto al orden original del plan (decisión del dueño del proyecto, 2026-08-25) para poder ver la sección sin esperar a Stripe. T-012 sigue pendiente en su lugar original.

- [ ] **T-013b — Conectar compra en línea con Stripe**
  - Archivos: `src/pages/membresias.astro` (modifica: reemplaza el botón placeholder por `MembershipCheckout`)
  - Hecho cuando: `npm run build` exitoso; el botón "Comprar" monta `MembershipCheckout` con el plan elegido y completa un pago de prueba end-to-end.
  - Dependencias: T-012, T-013.

- [x] **T-014 — Cotizador**
  - Archivos: `src/pages/cotizador.astro`
  - Hecho cuando: `npm run build` exitoso; formulario con los campos de la spec; al enviar calcula la prima con `src/lib/pricing.ts` en cliente, muestra el resultado, y postea a Netlify Forms (`name="cotizador"`) — verificable inspeccionando que `data-netlify="true"` esté presente en el HTML del build.
  - Dependencias: T-003, T-005.

- [x] **T-015 — Red médica** `[P]`
  - Archivos: `src/pages/red-medica.astro`
  - Hecho cuando: `npm run build` exitoso; muestra las 6 categorías con su conteo y la distribución por estado de la referencia.
  - Dependencias: T-003.

- [x] **T-016 — Nosotros** `[P]`
  - Archivos: `src/pages/nosotros.astro`
  - Hecho cuando: `npm run build` exitoso; incluye misión (3 puntos), visión, filosofía y los 8 valores de la referencia.
  - Dependencias: T-003.

- [x] **T-017 — FAQ** `[P]`
  - Archivos: `src/pages/faq.astro`
  - Hecho cuando: `npm run build` exitoso; 6 preguntas en `<details>/<summary>` nativos (abren/cierran sin JS); CTA final a `/contacto`.
  - Dependencias: T-003.

- [x] **T-018 — Contacto**
  - Archivos: `src/pages/contacto.astro`
  - Hecho cuando: `npm run build` exitoso; datos de contacto (3 teléfonos, email, WhatsApp) y formulario (nombre, email, teléfono, mensaje) que postea a Netlify Forms (`name="contacto"`), verificable igual que T-014.
  - Dependencias: T-003.

- [ ] **T-019 — Notificar compra confirmada a Netlify Forms desde el webhook**
  - Archivos: `src/pages/api/stripe-webhook.ts` (modifica: agrega el POST a Netlify Forms tras verificar la firma)
  - Hecho cuando: verificación manual: al simular `payment_intent.succeeded` firmado, aparece un envío nuevo `name="compra-membresia"` en Netlify Forms (local con `netlify dev`, o en el sitio desplegado).
  - Dependencias: T-011.

- [ ] **T-020 — Documentación de despliegue**
  - Archivos: `README.md`
  - Hecho cuando: instrucciones completas para clonar, configurar `.env` desde `.env.example`, correr los comandos de `CLAUDE.md`, y desplegar en Netlify.
  - Dependencias: T-001 a T-019 (tarea de cierre).
