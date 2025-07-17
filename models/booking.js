import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Booking extends Model {
    static associate(models) {
      Booking.belongsTo(models.User, { foreignKey: 'userId' });
      Booking.belongsTo(models.Service, { foreignKey: 'serviceId' });
    }
  }

  Booking.init(
    {
      date: DataTypes.DATE,
      userId: DataTypes.INTEGER,
      serviceId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Booking',
    }
  );

  return Booking;
};
