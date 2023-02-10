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

Order.hasMany(Menu, {
  through: {
    model: OrderedItems,
    unique: false
  },
});

Menu.belongsTo(Order, {
  through: {
    model: OrderedItems,
    unique: false
  },
});

module.exports = { User, Menu, Order, OrderedItems };
