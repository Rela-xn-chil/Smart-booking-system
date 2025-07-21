'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Services', [
      {
        name: 'Auditorium',
        description: 'Large hall for meetings and events',
        category: 'Facility',
        price: 150,
        availableSlots: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Collaboration Room',
        description: 'Room for group discussions',
        category: 'Facility',
        price: 10,
        availableSlots: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
  name: 'Connect',
  description: 'Small Networking and remote meeting space',
  category: 'Facility',
  price: 3,
  availableSlots: 3,
  createdAt: new Date(),
  updatedAt: new Date()
}
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Services', null, {});
  }
};
