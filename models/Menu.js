const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Menu extends Model {}

Menu.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    item: {
      type: DataTypes.VARCHAR(30),
      allowNull: false,
      unique: true,
    },
    price: {
      type: DataTypes.DECIMAL(4,2),
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      default: true
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "menu",
  }
);

module.exports = Menu;
