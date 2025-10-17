const {
  processOrder,
  calculatePremium,
  calculateStandard,
  applyDiscount,
  fallbackFlags,
} = require('../src/processor');

test('calcula premium correctamente', () => {
  const items = [{ price: 1200 }, { price: 800 }, { price: 300 }];
  expect(calculatePremium(items)).toBeGreaterThan(0);
});

test('calcula standard con varias categorías', () => {
  const items = [
    { category: 'food', price: 100 },
    { category: 'electronics', price: 200 },
    { category: 'other', price: 50 },
  ];
  // 100*0.98 + 200*1.02 + 50 = 98 + 204 + 50 = 352
  expect(calculateStandard(items)).toBeCloseTo(352, 0);
});

test('aplica descuento porcentual', () => {
  expect(applyDiscount(1000, { type: 'percent', value: 10 })).toBe(900);
});

test('aplica descuento fijo', () => {
  expect(applyDiscount(500, { type: 'fixed', value: 100 })).toBe(400);
});

test('aplica descuento desconocido no afecta total', () => {
  expect(applyDiscount(200, { type: 'unknown', value: 50 })).toBe(200);
});

test('procesa pedido tipo trial', () => {
  expect(processOrder({ type: 'trial' })).toBe(0);
});

test('procesa pedido tipo premium', () => {
  const order = { type: 'premium', items: [{ price: 1000 }] };
  expect(processOrder(order)).toBeGreaterThan(0);
});

test('procesa pedido tipo estándar', () => {
  const order = { type: 'standard', items: [{ price: 200, category: 'food' }] };
  expect(processOrder(order)).toBeGreaterThan(0);
});

test('procesa pedido tipo desconocido con banderas', () => {
  const order = { type: 'xyz', flagA: true, flagB: true, flagC: false };
  expect(processOrder(order)).toBeGreaterThan(0);
});

test('procesa pedido desconocido con banderas D y E', () => {
  const order = { type: 'unknown', flagD: true, flagE: true };
  expect(processOrder(order)).toBe(9);
});