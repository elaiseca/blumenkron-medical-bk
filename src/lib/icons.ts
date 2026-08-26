// Librería de íconos propios (línea, sin relleno, trazo 1.75, esquinas
// redondeadas) — mismo estilo que se definió para las tarjetas de
// "Nuestra propuesta" en el inicio. Sin librería externa (sigue la regla
// de no agregar dependencias nuevas): son paths SVG dibujados a mano.
//
// Uso: import { icon } from "@/lib/icons"; ...  set:html={icon("shield-check")}

export type IconName =
  | "shield-check"
  | "heart-pulse"
  | "heart"
  | "map-pin"
  | "coin"
  | "building"
  | "hospital"
  | "flask"
  | "search"
  | "pill"
  | "video"
  | "users"
  | "leaf"
  | "lightbulb"
  | "sparkle"
  | "target"
  | "eye"
  | "calculator"
  | "help-circle"
  | "message-circle"
  | "phone"
  | "mail"
  | "medical-cross"
  | "send"
  | "check-circle"
  | "x-circle";

const PATHS: Record<IconName, string> = {
  "shield-check": `<path d="M12 3l7 3v6c0 4.5-3 8-7 9-4-1-7-4.5-7-9V6l7-3z"/><path d="M9 12l2 2 4-4"/>`,
  "heart-pulse": `<path d="M19.5 12.57 12 20l-7.5-7.43A5 5 0 1 1 12 6.01a5 5 0 1 1 7.5 6.56Z"/><path d="M3.5 11h3l1.5-2.5 2 5 1.5-3H17"/>`,
  heart: `<path d="M19.5 12.57 12 20l-7.5-7.43A5 5 0 1 1 12 6.01a5 5 0 1 1 7.5 6.56Z"/>`,
  "map-pin": `<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21Z"/><circle cx="12" cy="9.5" r="2.5"/>`,
  coin: `<circle cx="12" cy="12" r="9"/><path d="M12 7v10M15 9.5c0-1.4-1.3-2.5-3-2.5s-3 1-3 2.3c0 1.3 1 1.8 3 2.2s3 .9 3 2.2c0 1.3-1.3 2.3-3 2.3s-3-1.1-3-2.5"/>`,
  building: `<rect x="5" y="4" width="14" height="17" rx="1"/><path d="M9 21v-4h6v4"/><path d="M9 8h.01M14 8h.01M9 12h.01M14 12h.01"/>`,
  hospital: `<rect x="4" y="3" width="16" height="18" rx="1"/><path d="M12 7v4M10 9h4"/><path d="M9 21v-5h6v5"/>`,
  flask: `<path d="M9 3h6M10 3v5.5L4.8 18a2 2 0 0 0 1.7 3h11a2 2 0 0 0 1.7-3L14 8.5V3"/><path d="M7.5 14h9"/>`,
  search: `<circle cx="10" cy="10" r="6"/><path d="M15 15l5 5"/>`,
  pill: `<path d="M6.5 17.5a5 5 0 0 1 0-7.07l4.93-4.93a5 5 0 0 1 7.07 7.07l-4.93 4.93a5 5 0 0 1-7.07 0Z"/><path d="M10 8l6 6"/>`,
  video: `<rect x="2.5" y="6" width="13" height="12" rx="2"/><path d="M15.5 10.5 21 7.5v9l-5.5-3"/>`,
  users: `<circle cx="9" cy="8" r="3"/><path d="M3.5 20a5.5 5.5 0 0 1 11 0"/><circle cx="17" cy="9" r="2.5"/><path d="M15.5 13.2A4.5 4.5 0 0 1 20.5 17.5"/>`,
  leaf: `<path d="M5 20C5 10 12 4 20 4c0 8-6 15-16 16Z"/><path d="M8 17c2-3 5-6 10-11"/>`,
  lightbulb: `<path d="M9 18h6"/><path d="M10 21h4"/><path d="M12 3a6 6 0 0 0-3.6 10.8c.6.5 1.1 1.3 1.1 2.2h5c0-.9.5-1.7 1.1-2.2A6 6 0 0 0 12 3Z"/>`,
  sparkle: `<path d="M12 3l1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z"/>`,
  target: `<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1"/>`,
  eye: `<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="3"/>`,
  calculator: `<rect x="5" y="3" width="14" height="18" rx="2"/><path d="M8 7h8"/><path d="M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>`,
  "help-circle": `<circle cx="12" cy="12" r="9"/><path d="M9.2 9.5a2.8 2.8 0 1 1 4.3 2.4c-.9.6-1.5 1.1-1.5 2.1"/><path d="M12 17.2h.01"/>`,
  "message-circle": `<path d="M21 12a8.5 8.5 0 0 1-12.4 7.5L4 21l1.6-4.5A8.5 8.5 0 1 1 21 12Z"/>`,
  phone: `<path d="M6.6 10.8a15.5 15.5 0 0 0 6.6 6.6l2.2-2.2a1.5 1.5 0 0 1 1.5-.4c1 .3 2 .5 3.1.5a1.5 1.5 0 0 1 1.5 1.5V20a1.5 1.5 0 0 1-1.5 1.5C10.8 21.5 2.5 13.2 2.5 3.5A1.5 1.5 0 0 1 4 2h3.2a1.5 1.5 0 0 1 1.5 1.5c0 1.1.2 2.1.5 3.1a1.5 1.5 0 0 1-.4 1.5Z"/>`,
  mail: `<rect x="2.5" y="4.5" width="19" height="15" rx="2"/><path d="M3 6l9 7 9-7"/>`,
  "medical-cross": `<circle cx="12" cy="12" r="9"/><path d="M12 8v8M8 12h8"/>`,
  send: `<path d="M21.5 2.5 11 13"/><path d="M21.5 2.5 15 21.5l-4-8.5-8.5-4 19-6.5Z"/>`,
  "check-circle": `<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>`,
  "x-circle": `<circle cx="12" cy="12" r="9"/><path d="M9 9l6 6M15 9l-6 6"/>`,
};

export function icon(name: IconName, size = 22): string {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" width="${size}" height="${size}">${PATHS[name]}</svg>`;
}

// Solo el contenido interior (sin el <svg> envolvente) — para cuando el
// ícono se coloca dentro de otro SVG (p. ej. un pin sobre el mapa).
export function iconInner(name: IconName): string {
  return PATHS[name];
}
