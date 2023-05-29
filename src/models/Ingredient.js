const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Ingredient extends Model {}

Ingredient.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Ajout de la contrainte allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false, // Ajout de la contrainte allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false, // Ajout de la contrainte allowNull: false

    }
  },
  {
    sequelize,
    modelName: 'Ingredient',
  }
);

module.exports = Ingredient;
