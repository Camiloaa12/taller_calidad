const { processOrder } = require('../src/processor');

test('processOrder premium with items', () => {
  const order = { type: 'premium', items: [{ price: 1200 }, { price: 300 }] };
  expect(processOrder(order)).toBeDefined();
});

test('processOrder trial', () => {
  const order = { type: 'trial' };
  expect(processOrder(order)).toBe(0);
});