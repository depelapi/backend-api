'use strict';

/** @type {import('sequelize-cli').Migration} */

const tableName = 'jenis_regu_damkar';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(tableName, [
      {
        nama: 'Umum',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Pribadi',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
    await queryInterface.sequelize.query(
      `ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`
    );
  }
};