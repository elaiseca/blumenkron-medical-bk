// Cobertura de la red médica — fuente única para /red-medica y para el
// mapa de cobertura del inicio. Antes cada página tenía su propio número
// inventado; ahora ambas leen de aquí.

export interface EstadoCobertura {
  estado: string;
  n: number;
}

// Clínicas participantes por estado. No tenemos el desglose exacto para
// el resto de la red (21 estados restantes) — se agregan como
// "Otros estados" en vez de inventar una cifra por estado.
export const estados: EstadoCobertura[] = [
  { estado: "Ciudad de México", n: 20 },
  { estado: "Estado de México", n: 14 },
  { estado: "Jalisco", n: 11 },
  { estado: "Nuevo León", n: 10 },
  { estado: "Puebla", n: 7 },
  { estado: "Querétaro", n: 6 },
  { estado: "Yucatán", n: 5 },
  { estado: "Guanajuato", n: 5 },
  { estado: "Veracruz", n: 5 },
  { estado: "Chihuahua", n: 4 },
  { estado: "Baja California", n: 4 },
  { estado: "Otros estados", n: 25 },
];

export const OTROS_ESTADOS_LABEL = "Otros estados";

export const totalClinicas = estados.reduce((sum, e) => sum + e.n, 0);
