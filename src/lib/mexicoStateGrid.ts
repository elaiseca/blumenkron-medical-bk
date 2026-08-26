// Posición esquemática (columna, fila) de cada estado, para dibujar un
// mapa tipo "tile grid" de México sin depender de un contorno geográfico
// real (por eso no hace falta licenciar un mapa de terceros). No es
// geográficamente preciso: es una aproximación pensada para que la forma
// general se reconozca como México (norte ancho, cintura angosta, península
// de Yucatán al sureste), no para representar fronteras reales.
//
// col: 0 (oeste) → 9 (este). row: 0 (norte) → 5 (sur).
export const MEXICO_STATE_GRID: Record<string, [number, number]> = {
  "Baja California": [0, 0],
  "Baja California Sur": [0, 2],
  Sonora: [2, 0],
  Chihuahua: [3, 0],
  Coahuila: [4, 0],
  "Nuevo León": [5, 0],
  Tamaulipas: [6, 1],
  Sinaloa: [2, 1],
  Durango: [3, 1],
  Zacatecas: [4, 1],
  "San Luis Potosí": [5, 1],
  Nayarit: [1, 2],
  Aguascalientes: [3, 2],
  Guanajuato: [4, 2],
  Querétaro: [5, 2],
  Hidalgo: [6, 2],
  Veracruz: [7, 2],
  Colima: [1, 3],
  Jalisco: [2, 3],
  Michoacán: [3, 3],
  "Estado de México": [4, 3],
  "Ciudad de México": [5, 3],
  Tlaxcala: [6, 3],
  Guerrero: [3, 4],
  Morelos: [5, 4],
  Puebla: [6, 4],
  Tabasco: [7, 4],
  Oaxaca: [5, 5],
  Chiapas: [6, 5],
  Yucatán: [8, 2],
  Campeche: [8, 3],
  "Quintana Roo": [9, 3],
};

export const MEXICO_GRID_COLS = 10;
export const MEXICO_GRID_ROWS = 6;
