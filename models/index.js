const User = require('./User');
const Menu = require('./Menu');
const Order = require('./Order');
const OrderedItems = require('./OrderedItems');

User.hasMany(Order, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Order.belongsTo(User, {
  foreignKey: 'userId'
});

Order.belongsToMany(Menu, {
  through: {
    model: OrderedItems,
    unique: false
  },
});

Menu.belongsToManygit chec(Order, {
  through: {
    model: OrderedItems,
    unique: false
  },
});

// Exports all models
module.exports = { User, Menu, Order, OrderedItems };
