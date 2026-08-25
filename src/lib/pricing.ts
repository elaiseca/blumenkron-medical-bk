// Calculadora de prima estimada del cotizador — puerto de la lógica del
// proyecto de referencia (Lovable). Es una estimación orientativa, no una
// tarifa formal de aseguradora.

export interface CalcPrimaInput {
  age: number;
  smoker: boolean;
  suma: number;
  deducible: number;
  coaseguro: number;
}

export function calcPrima({
  age,
  smoker,
  suma,
  deducible,
  coaseguro,
}: CalcPrimaInput): number {
  const base = suma * 0.008;
  const ageFactor = 1 + Math.max(0, age - 25) * 0.025;
  const smokerFactor = smoker ? 1.35 : 1;
  const deducibleFactor = Math.max(0.55, 1 - deducible / 300_000);
  const coaseguroFactor = Math.max(0.7, 1 - coaseguro / 100);
  return Math.round(
    (base * ageFactor * smokerFactor * deducibleFactor * coaseguroFactor) / 12,
  );
}
