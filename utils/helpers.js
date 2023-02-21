module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  format_currency: (value) => {
    // format value as CA dollars
    return new Intl.NumberFormat("en-CA", { style: "currency", currency: "CAD" }).format(value);
  },
  stringfy: (data) => {
    return JSON.stringify(data);
  },
  sum_subtotal: (item) => {
    return item.quantity * item.menu.price;
  },
  sum_total: (data) => {
    let sum = 0;
    data.forEach((item) => {
      sum += item.quantity * item.menu.price;
    });
    return sum;
  },
};

id="item-{{order.id}}"