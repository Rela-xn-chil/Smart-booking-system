import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      // Optional for now
    }
  }

  Service.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      category: DataTypes.STRING,
      price: DataTypes.FLOAT,
      availableSlots: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'Service',
      tableName: 'Services' // ✅ Ensures correct table name
    }
  );

  return Service;
};
