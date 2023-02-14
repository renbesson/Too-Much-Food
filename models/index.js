const User = require('./User');
const Menu = require('./Menu');
const Order = require('./Order');
const OrderedItems = require('./OrderedItems');

User.hasMany(Order, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE'
});

Order.belongsTo(User, {
  foreignKey: 'user_id'
});

Order.hasMany(OrderedItems, {
  foreignKey: 'order_id',
  onDelete: 'CASCADE'
});

OrderedItems.belongsTo(Order, {
  foreignKey: 'order_id'
});

OrderedItems.belongsTo(Menu, {
  foreignKey: 'menu_id'
});

Menu.hasMany(OrderedItems, {
  foreignKey: 'menu_id',
  onDelete: 'CASCADE'
});

// Exports all models
module.exports = { User, Menu, Order, OrderedItems };
