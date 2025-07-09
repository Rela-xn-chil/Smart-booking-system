import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Service extends Model {
    static associate(models) {
      // define associations here later if needed
    }
  }

  Service.init(
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING,
      category: DataTypes.STRING,
      price: DataTypes.FLOAT,
      availableSlots: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Service',
    }
  );

  return Service;
};
