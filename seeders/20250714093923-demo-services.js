'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert('Services', [
    {
      name: 'Auditorium',
      description: 'Large room for events',
      category: 'Room',
      price: 0,
      availableSlots: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: 'Collaboration',
      description: 'Small group meeting room',
      category: 'Room',
      price: 0,
      availableSlots: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete('Services', null, {});
}
