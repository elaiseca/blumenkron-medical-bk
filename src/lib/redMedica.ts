// Cobertura de la red médica — fuente única para /red-medica y para el
// mapa de cobertura del inicio.
//
// Datos actualizados (2026-08-28) según la infografía "Nuestra red de
// sucursales en todo el país" proporcionada por el dueño del proyecto:
// 157 unidades y sucursales médicas.
//
// Nota: la fuente lista "Tijuana: 8" junto a nombres de estado, pero
// Tijuana es una ciudad de Baja California, no un estado. Por decisión
// del dueño del proyecto (2026-08-28): la LISTA muestra "Tijuana" tal
// cual (campo `estado`), pero el MAPA por estado pinta esas 8 sucursales
// sobre Baja California (campo `mapEstado`).

export interface EstadoCobertura {
  estado: string;
  n: number;
  // Estado real para el mapa, solo cuando difiere de `estado` (caso Tijuana).
  mapEstado?: string;
}

export const estados: EstadoCobertura[] = [
  { estado: "Estado de México", n: 32 },
  { estado: "Ciudad de México", n: 16 },
  { estado: "Campeche", n: 19 },
  { estado: "Tlaxcala", n: 15 },
  { estado: "San Luis Potosí", n: 11 },
  { estado: "Jalisco", n: 10 },
  { estado: "Aguascalientes", n: 8 },
  { estado: "Oaxaca", n: 8 },
  { estado: "Yucatán", n: 8 },
  { estado: "Tijuana", n: 8, mapEstado: "Baja California" },
  { estado: "Coahuila", n: 7 },
  { estado: "Nuevo León", n: 4 },
  { estado: "Hidalgo", n: 3 },
  { estado: "Durango", n: 2 },
  { estado: "Guanajuato", n: 2 },
  { estado: "Quintana Roo", n: 2 },
  { estado: "Veracruz", n: 1 },
  { estado: "Chihuahua", n: 1 },
];

export const totalClinicas = estados.reduce((sum, e) => sum + e.n, 0);

// Servicios incluidos en toda la red (sin cifras por tipo de instalación,
// ya no tenemos ese desglose — ver la infografía de red de sucursales).
export const serviciosRed = [
  "Consultas médicas generales",
  "Especialidades: dental, oftalmología, nutrición y psicología",
  "Análisis clínicos (20 básicos)",
  "Orientación médica telefónica 24/7",
  "Red nacional de atención",
];
