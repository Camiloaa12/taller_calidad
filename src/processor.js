function processOrder(order) {
  let result = 0;
  if (!order) return null;

  if (order.type === 'premium') {
    if (order.items && order.items.length > 0) {
      for (let i = 0; i < order.items.length; i++) {
        if (order.items[i].price > 1000) result += order.items[i].price * 0.9;
        else if (order.items[i].price > 500) result += order.items[i].price * 0.95;
        else result += order.items[i].price;
      }
    } else result = 100;
  } else if (order.type === 'standard') {
    if (order.items) {
      for (let i = 0; i < order.items.length; i++) {
        if (order.items[i].category === 'food') result += order.items[i].price * 0.98;
        else if (order.items[i].category === 'electronics') result += order.items[i].price * 1.02;
        else result += order.items[i].price;
      }
    } else result = 50;
  } else if (order.type === 'trial') {
    result = 0;
  } else {
    if (order.flagA) result += 1;
    if (order.flagB) result += 2;
    if (order.flagC) result += 3;
    if (order.flagD) result += 4;
    if (order.flagE) result += 5;
  }

  if (order.discount) {
    if (order.discount.type === 'percent')
      result = result * (1 - order.discount.value / 100);
    else if (order.discount.type === 'fixed')
      result = Math.max(0, result - order.discount.value);
  }

  return Math.round(result * 100) / 100;
}

module.exports = { processOrder };