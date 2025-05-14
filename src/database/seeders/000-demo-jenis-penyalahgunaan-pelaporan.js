'use strict';

/** @type {import('sequelize-cli').Migration} */

const tableName = 'jenis_penyalahgunaan_pelaporan';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(tableName, [
      {
        nama: 'Hoax atau Berita Palsu',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Spam atau Menyesatkan',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Kekerasan atau Ancaman',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Tidak Senonoh',
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