const { sumar, restar } = require('../src/calculadora');

describe('calculadora', () => {
  test('sumar 2 + 3 = 5', () => {
    expect(sumar(2, 3)).toBe(5);
  });

  test('restar 5 - 3 = 2', () => {
    expect(restar(5, 3)).toBe(2);
  });
});