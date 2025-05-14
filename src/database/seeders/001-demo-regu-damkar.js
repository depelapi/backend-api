'use strict';

/** @type {import('sequelize-cli').Migration} */

const tableName = 'regu_damkar';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert(tableName, [
      {
        id: 1,
        nama: 'Damkar BPBD',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date(),
        id_jenis_regu_damkar: 1
      },
      {
        id: 2,
        nama: 'Damkar DPKP',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date(),
        id_jenis_regu_damkar: 1
      },
      {
        id: 3,
        nama: 'Damkar Relawan',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date(),
        id_jenis_regu_damkar: 1
      },
      {
        id: 4,
        nama: 'Damkar Swasta',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date(),
        id_jenis_regu_damkar: 2
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