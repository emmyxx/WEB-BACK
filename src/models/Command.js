const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./AppUser');

class Command extends Model {}

Command.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      references: {
        model: User,
        key: 'id',
      }
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    totalPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    commandDate: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Command',
  }
);

Command.belongsTo(User, { foreignKey: 'userId' });

module.exports = {Command};
