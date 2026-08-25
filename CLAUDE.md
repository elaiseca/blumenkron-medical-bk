# Constitution — BlumenKron by Medical BK (sitio web)

> Este archivo se escribe una vez y casi no cambia. Es lo único que se carga en
> todas las sesiones. Cualquier cambio a este documento requiere aprobación
> explícita del dueño del proyecto.

## Stack y versiones fijadas

Único stack permitido para este repo. No se agregan paquetes fuera de esta
lista sin aprobación explícita (ver "Prohibido").

```json
"dependencies": {
  "@astrojs/check": "^0.9.9",
  "@astrojs/netlify": "^6.5.6",
  "@astrojs/react": "^4.3.0",
  "@stripe/react-stripe-js": "^6.7.0",
  "@stripe/stripe-js": "^9.9.0",
  "@types/react": "^19.1.8",
  "@types/react-dom": "^19.1.6",
  "astro": "^5.10.1",
  "crypto-js": "^4.2.0",
  "react": "^19.1.0",
  "react-dom": "^19.1.0",
  "typescript": "^5.9.3"
},
"devDependencies": {
  "@astrojs/tailwind": "^6.0.2",
  "autoprefixer": "^10.4.21",
  "postcss": "^8.5.6",
  "prettier": "^3.6.2",
  "prettier-plugin-astro": "^0.14.1",
  "tailwindcss": "^3.4.3"
}
```

Notas derivadas del stack (no se listan como paquetes porque no son
dependencias nuevas, son consecuencia del stack de arriba):

- **Astro + `@astrojs/netlify`** ⇒ despliegue en Netlify (SSR/functions vía
  adapter). Rutas de servidor son endpoints Astro (`src/pages/api/*.ts`), no
  un backend aparte.
- **`@stripe/stripe-js` + `@stripe/react-stripe-js`** son librerías de
  **cliente** únicamente. No hay `stripe` (SDK de servidor) en la lista ⇒
  cualquier llamada a la API de Stripe desde el servidor se hace con `fetch`
  directo a `api.stripe.com`, sin SDK.
- **`crypto-js`** es la única herramienta criptográfica del lado servidor ⇒
  se usa para verificar firmas HMAC de webhooks (p. ej. Stripe) a mano,
  reemplazando lo que normalmente haría el SDK de servidor.
- No hay librería de auth ni cliente de base de datos en el stack ⇒ este
  sitio **no** incluye login ni base de datos propia (ver spec para el
  alcance exacto).
- No hay framework de testing en dependencies/devDependencies ⇒ el comando
  `test` usa el test runner nativo de Node (`node --test`) sobre lógica pura
  (cálculos, validadores), sin agregar paquetes.

## Prohibido

- Agregar dependencias nuevas (npm) sin aprobación explícita del dueño del
  proyecto, incluida cualquier versión de `stripe` (SDK de servidor),
  ORMs, clientes de base de datos, frameworks de test, linters adicionales,
  etc. Si una tarea parece requerir una dependencia nueva, se detiene el
  trabajo y se propone el cambio a este archivo antes de continuar.
- Usar `any` en TypeScript (ni explícito ni implícito vía `tsconfig` laxo).
- Migraciones o cambios destructivos sin plan de rollback documentado.
- Commits directos a `main`. Todo cambio va en una rama (`feature/*`,
  `fix/*`) con su propio commit(s); `main` solo recibe merges.
- Inventar contenido de negocio (precios, teléfonos, coberturas) que no
  esté en la spec o confirmado por el dueño del proyecto.

## Comandos del repo

| Acción     | Comando                                              |
|------------|-------------------------------------------------------|
| Instalar   | `npm install`                                         |
| Dev        | `npm run dev` → `astro dev`                           |
| Build      | `npm run build` → `astro check && astro build`        |
| Preview    | `npm run preview` → `netlify dev` (vía `npx netlify-cli`, no se instala como dependencia del proyecto). **Nota:** `astro preview` no funciona con el adapter `@astrojs/netlify` (lo rechaza explícitamente); usar `astro dev` para desarrollo del día a día y `netlify dev` para probar `/api/*` en condiciones cercanas a producción. |
| Lint       | `npm run lint` → `prettier --check .`                 |
| Format     | `npm run format` → `prettier --write .`                |
| Test       | `npm test` → `node --test tests/**/*.test.mjs`        |
| Deploy     | Push a `main` (vía PR aprobado) → Netlify auto-deploy con `@astrojs/netlify`. Deploy manual de emergencia: `npx netlify-cli deploy --prod` (npx, no se instala como dependencia del proyecto). |

## Estructura de specs

Cada feature vive en `specs/<feature>/` con `spec.md`, `plan.md`, `tasks.md`,
en ese orden. No se escribe `plan.md` si `spec.md` todavía tiene marcadores
`[NEEDS CLARIFICATION]` sin resolver. No se implementa ninguna tarea de
`tasks.md` que no tenga su criterio de "hecho" y sus dependencias definidas.
