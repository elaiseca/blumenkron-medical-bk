// Catálogo de membresías — fuente única de precio y beneficios para todo el
// front (preview en inicio, comparativo en /membresias, cotizador).
//
// Corporativo e Integral comparten exactamente los mismos beneficios; la
// única diferencia es el público al que están dirigidos (empresas/equipos
// de trabajo vs. personas y familias) — ver `tagline`.
//
// El monto que realmente se cobra en Stripe (en centavos de MXN) vive en la
// variable de entorno PLAN_INTEGRAL_PRICE_MXN (ver .env.example) y se valida
// server-side en T-010 — el `priceMXN` de aquí es solo para mostrarlo en
// pantalla.
//
// Corporativo no tiene precio fijo (decisión del dueño del proyecto,
// 2026-08-28): depende de la cantidad de empleados, así que `priceMXN` y
// `period` se omiten y el front muestra un botón "Cotiza aquí" en su lugar.

export type PlanKey = "corporativo" | "integral";

export interface PlanBenefit {
  label: string;
  corporativo: boolean;
  integral: boolean;
}

export interface Plan {
  key: PlanKey;
  name: string;
  tagline: string;
  // undefined = cotización personalizada, sin precio fijo (ver Corporativo).
  priceMXN?: number;
  period?: string;
}

// Ningún plan se marca como "más popular" — ambos se muestran igual
// (decisión del dueño del proyecto, 2026-08-28).
export const plans: Plan[] = [
  {
    key: "corporativo",
    name: "Corporativo",
    tagline: "Ideal para empresas y equipos de trabajo",
  },
  {
    key: "integral",
    name: "Integral",
    tagline: "Ideal para ti y tu familia",
    priceMXN: 4990,
    period: "MXN + IVA / año",
  },
];

// Corporativo e Integral incluyen los mismos 10 beneficios.
export const planBenefits: PlanBenefit[] = [
  { label: "Consulta general (programada)", corporativo: true, integral: true },
  { label: "Medicamentos incluidos", corporativo: true, integral: true },
  {
    label: "Estudios médicos básicos (Centro de Autorización)",
    corporativo: true,
    integral: true,
  },
  { label: "Orientación médica", corporativo: true, integral: true },
  { label: "Consulta especializada dental", corporativo: true, integral: true },
  {
    label: "Consulta especializada nutricional",
    corporativo: true,
    integral: true,
  },
  {
    label: "Consulta especializada psicológica",
    corporativo: true,
    integral: true,
  },
  {
    label: "Consulta especializada oftalmológica",
    corporativo: true,
    integral: true,
  },
  {
    label: "Descuentos en estudios especializados",
    corporativo: true,
    integral: true,
  },
  { label: "Check-up anual", corporativo: true, integral: true },
];

export function formatMXN(amount: number): string {
  return `$${amount.toLocaleString("es-MX")}`;
}

export function getPlan(key: PlanKey): Plan {
  const plan = plans.find((p) => p.key === key);
  if (!plan) {
    throw new Error(`Plan desconocido: ${key}`);
  }
  return plan;
}
