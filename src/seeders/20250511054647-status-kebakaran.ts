import { QueryInterface } from 'sequelize';

const tableName = 'status_kebakaran';

export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(tableName, [
      {
        nama: 'Dilaporkan',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Dalam Penanganan',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Terkendali',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Diperlukan Bantuan',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Selesai',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
    ]);
  },

  async down (queryInterface: QueryInterface) {
    await queryInterface.bulkDelete(tableName, {}, {});
    await queryInterface.sequelize.query(
      `ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`
    );
  }
};
