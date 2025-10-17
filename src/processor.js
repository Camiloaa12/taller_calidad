function calculatePremium(items = []) {
  return items.reduce((total, item) => {
    if (item.price > 1000) return total + item.price * 0.9;
    if (item.price > 500) return total + item.price * 0.95;
    return total + item.price;
  }, 0);
}

function calculateStandard(items = []) {
  return items.reduce((total, item) => {
    if (item.category === 'food') return total + item.price * 0.98;
    if (item.category === 'electronics') return total + item.price * 1.02;
    return total + item.price;
  }, 0);
}

function applyDiscount(total, discount) {
  if (!discount) return total;
  if (discount.type === 'percent') return total * (1 - discount.value / 100);
  if (discount.type === 'fixed') return Math.max(0, total - discount.value);
  return total;
}

function fallbackFlags(order) {
  let total = 0;
  if (order.flagA) total += 1;
  if (order.flagB) total += 2;
  if (order.flagC) total += 3;
  if (order.flagD) total += 4;
  if (order.flagE) total += 5;
  return total;
}

function processOrder(order) {
  if (!order) return null;
  let total = 0;

  switch (order.type) {
    case 'premium':
      total = calculatePremium(order.items);
      break;
    case 'standard':
      total = calculateStandard(order.items);
      break;
    case 'trial':
      total = 0;
      break;
    default:
      total = fallbackFlags(order);
      break;
  }

  return Math.round(applyDiscount(total, order.discount) * 100) / 100;
}

module.exports = {
  processOrder,
  calculatePremium,
  calculateStandard,
  applyDiscount,
  fallbackFlags,
};