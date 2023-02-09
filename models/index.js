const User = require('./User');
const Order = require('./Order');

User.hasMany(Order, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Order.belongsTo(User, {
  foreignKey: 'userId'
});

module.exports = { User, Order };
