// Servicios incluidos en la membresía y su cobertura — fuente: infografía
// "Descubre todo lo que incluye tu membresía" proporcionada por el dueño
// del proyecto (2026-08-28). Los mismos 2 planes (Corporativo e Integral)
// incluyen todos estos servicios (ver src/lib/plans.ts).
//
// Nota de la fuente: "Las cifras y servicios corresponden a la información
// proporcionada y pueden actualizarse conforme cambie la red o las
// condiciones de Medical BK."

import type { IconName } from "@/lib/icons";

export interface ServicioCobertura {
  icon: IconName;
  servicio: string;
  cobertura: string;
}

export const servicios: ServicioCobertura[] = [
  {
    icon: "medical-cross",
    servicio: "Médico general",
    cobertura:
      "Atención médica de primer contacto, valoración y orientación general.",
  },
  {
    icon: "tooth",
    servicio: "Dental",
    cobertura:
      "Ultrasonido, radiografía periapical, profilaxis, extracción simple, resinas, aplicación de flúor y curetaje.",
  },
  {
    icon: "glasses",
    servicio: "Óptica",
    cobertura:
      "Evaluación de la capacidad visual, evaluación de la graduación de cada ojo y armazón para otorgar lentes.",
  },
  {
    icon: "pill",
    servicio: "Farmacia",
    cobertura:
      "295 medicamentos genéricos del cuadro básico, que atienden 180 padecimientos.",
  },
  {
    icon: "leaf",
    servicio: "Nutrición",
    cobertura:
      "Orientación profesional para el cuidado nutricional y hábitos saludables.",
  },
  {
    icon: "brain",
    servicio: "Psicología",
    cobertura:
      "Atención y orientación psicológica como parte del cuidado integral.",
  },
  {
    icon: "flask",
    servicio: "Laboratorios clínicos",
    cobertura: "22 estudios del cuadro básico.",
  },
];
