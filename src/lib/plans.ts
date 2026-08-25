// Catálogo de membresías — fuente única de precio y beneficios para todo el
// front (preview en inicio, comparativo en /membresias, cotizador).
//
// El monto que realmente se cobra en Stripe (en centavos de MXN) vive en las
// variables de entorno PLAN_ESENCIAL_PRICE_MXN / PLAN_INTEGRAL_PRICE_MXN
// (ver .env.example) y se valida server-side en T-010 — el `priceMXN` de
// aquí es solo para mostrarlo en pantalla.

export type PlanKey = "esencial" | "integral";

export interface PlanBenefit {
  label: string;
  esencial: boolean;
  integral: boolean;
}

export interface Plan {
  key: PlanKey;
  name: string;
  tagline: string;
  priceMXN: number;
  period: string;
  featured: boolean;
}

export const plans: Plan[] = [
  {
    key: "esencial",
    name: "Esencial",
    tagline: "Empieza a cuidar tu salud",
    priceMXN: 3990,
    period: "MXN + IVA / año",
    featured: false,
  },
  {
    key: "integral",
    name: "Integral",
    tagline: "Más beneficios para ti y tu familia",
    priceMXN: 4990,
    period: "MXN + IVA / año",
    featured: true,
  },
];

export const planBenefits: PlanBenefit[] = [
  { label: "Consulta general (programada)", esencial: true, integral: true },
  { label: "Medicamentos incluidos", esencial: true, integral: true },
  {
    label: "Estudios médicos básicos (Centro de Autorización)",
    esencial: true,
    integral: true,
  },
  { label: "Orientación médica", esencial: true, integral: true },
  { label: "Consulta especializada dental", esencial: false, integral: true },
  {
    label: "Consulta especializada nutricional",
    esencial: false,
    integral: true,
  },
  {
    label: "Consulta especializada psicológica",
    esencial: false,
    integral: true,
  },
  {
    label: "Consulta especializada oftalmológica",
    esencial: false,
    integral: true,
  },
  {
    label: "Descuentos en estudios especializados",
    esencial: false,
    integral: true,
  },
  { label: "Check-up anual", esencial: false, integral: true },
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
