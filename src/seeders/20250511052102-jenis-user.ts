import { QueryInterface } from 'sequelize';

const tableName = 'jenis_user';

export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(tableName, [
      {
        nama: 'Masyarakat',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Damkar',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Pemilik Lahan',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'BPBD',
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
