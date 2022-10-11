const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class department extends Model {}

department.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING
      }
    },
    {
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'department'
    }
  );
  module.exports = department;