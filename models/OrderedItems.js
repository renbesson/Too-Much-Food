const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class OrderedItems extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: {
        type: DataTypes.INTEGER,
        references: {
          model: 'order',
          key: 'id',
          unique: false
        }
    },
    menu_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'menu',
        key: 'id',
        unique: false
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      default: 1
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "orderedItems",
  }
);

module.exports = OrderedItems;
