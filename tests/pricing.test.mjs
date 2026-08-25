import { test } from "node:test";
import assert from "node:assert/strict";
import { calcPrima } from "../src/lib/pricing.ts";

test("caso base: edad 30, no fumador, suma 2,000,000, deducible 30,000, coaseguro 10%", () => {
  const prima = calcPrima({
    age: 30,
    smoker: false,
    suma: 2_000_000,
    deducible: 30_000,
    coaseguro: 10,
  });
  assert.equal(prima, 1215);
});

test("menores de 25 años no reciben recargo por edad", () => {
  const primaJoven = calcPrima({
    age: 20,
    smoker: false,
    suma: 2_000_000,
    deducible: 30_000,
    coaseguro: 10,
  });
  const primaVeinticinco = calcPrima({
    age: 25,
    smoker: false,
    suma: 2_000_000,
    deducible: 30_000,
    coaseguro: 10,
  });
  assert.equal(primaJoven, primaVeinticinco);
});

test("fumar incrementa la prima en 35%", () => {
  const noFumador = calcPrima({
    age: 30,
    smoker: false,
    suma: 2_000_000,
    deducible: 30_000,
    coaseguro: 10,
  });
  const fumador = calcPrima({
    age: 30,
    smoker: true,
    suma: 2_000_000,
    deducible: 30_000,
    coaseguro: 10,
  });
  assert.ok(fumador > noFumador);
  assert.equal(fumador, Math.round(noFumador * 1.35));
});

test("el descuento por deducible tiene un piso de 0.55 (no puede bajar más)", () => {
  const conDeducibleAlto = calcPrima({
    age: 30,
    smoker: false,
    suma: 2_000_000,
    deducible: 200_000,
    coaseguro: 0,
  });
  const conDeducibleExtremo = calcPrima({
    age: 30,
    smoker: false,
    suma: 2_000_000,
    deducible: 1_000_000,
    coaseguro: 0,
  });
  assert.equal(conDeducibleAlto, conDeducibleExtremo);
});

test("el descuento por coaseguro tiene un piso de 0.7 (no puede bajar más)", () => {
  const conCoaseguro30 = calcPrima({
    age: 30,
    smoker: false,
    suma: 2_000_000,
    deducible: 30_000,
    coaseguro: 30,
  });
  const conCoaseguro100 = calcPrima({
    age: 30,
    smoker: false,
    suma: 2_000_000,
    deducible: 30_000,
    coaseguro: 100,
  });
  assert.equal(conCoaseguro30, conCoaseguro100);
});

test("siempre devuelve un entero (redondeado)", () => {
  const prima = calcPrima({
    age: 47,
    smoker: true,
    suma: 5_000_000,
    deducible: 80_000,
    coaseguro: 20,
  });
  assert.equal(Number.isInteger(prima), true);
});
