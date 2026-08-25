# Spec — Sitio web BlumenKron by Medical BK

> Fuente de diseño, contenido y maquetación de referencia: proyecto Lovable
> "BlumenKron Health" (conectado vía MCP, revisado el 2026-08-24). Este
> documento describe QUÉ debe hacer el sitio nuevo, no cómo se construye.

## Objetivo

Construir el sitio público de BlumenKron by Medical BK, una agencia broker
de Seguros de Gastos Médicos Mayores (GMM), para que una persona visitante
pueda: entender la propuesta de valor (salud preventiva + red médica +
respaldo Blumenkron), comparar las membresías disponibles, cotizar un
seguro, comprar una membresía en línea, conocer la red médica y la empresa,
resolver dudas frecuentes, y contactar a un asesor.

El sitio reemplaza/formaliza el sitio de referencia construido en Lovable,
conservando su contenido de marca (textos, cifras, planes, contacto) pero
construido sobre el stack fijado en `CLAUDE.md`.

### Alcance

- Página de inicio (propuesta de valor, cifras clave, CTA a cotizador y
  membresías).
- Página de membresías con comparativo de beneficios y compra en línea.
- Cotizador de seguro (formulario + estimación).
- Página de Red Médica (cobertura por categoría y por estado).
- Página Nosotros (misión, visión, valores, filosofía).
- Página de preguntas frecuentes.
- Página de contacto (formulario + datos de contacto directo).

### Fuera de alcance

- Login / portal de afiliado, gestión de beneficiarios, credencial digital
  o cualquier área que requiera cuenta de usuario. El stack fijado en
  `CLAUDE.md` no incluye autenticación ni base de datos propia, por lo que
  esta versión del sitio es pública y sin cuentas de usuario.
- Panel administrativo interno para el equipo de BlumenKron (ver pregunta
  abierta sobre gestión de leads, más abajo).
- Integraciones de agentes/MCP expuestas por el sitio (existían en el
  proyecto Lovable de referencia; no aplican a este sitio público).

## Usuarios

- **Visitante / prospecto**: persona que llega al sitio buscando información
  sobre seguros de gastos médicos mayores para sí o su familia. Puede o no
  conocer ya a BlumenKron. Objetivo: entender los planes, cotizar y/o
  comprar una membresía, o dejar sus datos para que un asesor lo contacte.
- **Cliente/afiliado potencial listo para comprar**: ya decidió un plan
  (Esencial o Integral) y quiere pagar su membresía en línea sin hablar
  primero con un asesor.
- **Equipo comercial de BlumenKron (interno)**: recibe las cotizaciones,
  mensajes de contacto y confirmaciones de pago generadas por el sitio para
  dar seguimiento y cerrar la venta o activar la membresía.

## Flujos

### 1. Descubrir la propuesta de valor (Inicio)
1. El visitante llega a `/` y ve el mensaje principal ("Cuidamos de ti antes
   de que lo necesites"), las cifras clave (clínicas participantes,
   atención 24/7, familias protegidas, calificación de afiliados) y los
   pilares del servicio (protección, salud preventiva, atención accesible,
   ahorro).
2. Ve un resumen de los planes de membresía con precio y beneficios
   principales, con acceso directo a cotizar cada uno.
3. Ve un resumen de la red médica nacional con acceso a la página completa.
4. Ve una llamada a la acción final para cotizar o hablar con un asesor.

### 2. Comparar y elegir una membresía
1. El visitante entra a `/membresias` y ve las membresías disponibles con
   su precio, público objetivo y una tabla comparativa beneficio por
   beneficio. El sitio ofrece **2 planes: Esencial e Integral** (la mención
   a un tercer plan "Premium" en el FAQ/modelo de datos de referencia no
   aplica a este sitio).
2. El visitante elige un plan y puede:
   - a) Pedir cotización (va al flujo de Cotizador), o
   - b) Comprar la membresía directamente en línea (flujo de Compra).

### 3. Comprar una membresía en línea
1. Desde `/membresias` (o desde el resultado del cotizador) el visitante
   elige "Comprar" sobre un plan.
2. Ingresa sus datos de contacto y de pago y confirma la compra.
3. El sitio confirma si el pago fue exitoso o no, y en caso de éxito
   muestra un mensaje de confirmación con los siguientes pasos (activación
   de membresía). El cobro es un **pago único anual** (coincide con el
   precio mostrado, "MXN + IVA / año"); no es una suscripción recurrente.
   La activación de la membresía la realiza el equipo comercial de forma
   manual al recibir la confirmación de pago, no es automática.
4. El equipo comercial de BlumenKron se entera de la compra para dar
   seguimiento/activar la membresía.

### 4. Cotizar un seguro
1. El visitante entra a `/cotizador` y llena sus datos (nombre, email,
   teléfono opcional, código postal opcional, edad, sexo, si fuma o no) y
   elige suma asegurada, deducible y coaseguro deseados.
2. Al enviar, ve de inmediato una estimación de prima mensual junto con el
   resumen de lo elegido, y un aviso de que un asesor lo contactará con
   opciones formales.
3. El equipo comercial de BlumenKron recibe los datos de esta cotización
   para dar seguimiento.

### 5. Conocer la red médica
1. El visitante entra a `/red-medica` y ve el total de clínicas
   participantes, el desglose por tipo de servicio (clínicas y
   consultorios, laboratorios, gabinetes de diagnóstico, hospitales,
   farmacias aliadas, telemedicina 24/7) y la distribución por estado de la
   República.

### 6. Conocer la empresa
1. El visitante entra a `/nosotros` y ve quiénes son, su misión, visión,
   filosofía ("Prevenir siempre será mejor que curar") y sus valores.

### 7. Resolver dudas frecuentes
1. El visitante entra a `/faq` y puede expandir/contraer preguntas sobre
   cómo funciona la membresía, duración, beneficiarios, dónde se usa,
   estudios incluidos y cómo renovar.
2. Si no encuentra su respuesta, ve una llamada a la acción hacia Contacto.

### 8. Contactar a un asesor
1. El visitante entra a `/contacto` y ve los teléfonos, correo y enlace
   directo de WhatsApp de BlumenKron, además de un formulario (nombre,
   email, teléfono opcional, mensaje).
2. Al enviar el formulario, ve una confirmación de que su mensaje fue
   recibido y que será contactado en un plazo determinado.
3. El equipo comercial de BlumenKron recibe este mensaje para dar
   seguimiento. Basta con que lo reciban por **notificación** (p. ej.
   correo); no se requiere una vista o listado de leads dentro del sitio.

## Decisiones de producto confirmadas

Estas preguntas bloqueaban `plan.md` y fueron resueltas por el dueño del
proyecto el 2026-08-24:

1. **Planes**: 2 (Esencial e Integral). Sin plan Premium.
2. **Cobro**: pago único anual vía Stripe. Activación manual por el equipo
   comercial tras confirmarse el pago.
3. **Leads**: solo notificación (correo) al equipo comercial. Sin vista de
   consulta dentro del sitio.

No quedan marcadores `[NEEDS CLARIFICATION]` pendientes. `plan.md` puede
proceder.
