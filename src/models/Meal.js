const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Meal extends Model {}

Meal.init(
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
    
    price: {
      type: DataTypes.FLOAT,
      allowNull: false, // Ajout de la contrainte allowNull: false

    },
    image: {
      type: DataTypes.STRING
        }
  },
  {
    sequelize,
    modelName: 'Meal',
  }
);

module.exports = Meal;
