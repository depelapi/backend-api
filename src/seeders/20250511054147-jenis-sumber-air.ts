import { QueryInterface } from 'sequelize';

const tableName = 'jenis_sumber_air';

export default {
  async up (queryInterface: QueryInterface) {
    await queryInterface.bulkInsert(tableName, [
      {
        nama: 'APAR',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Hidran',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Sungai',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Danau',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Bendungan',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Sumur',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Reservoir, Kolam, atau Irigasi',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Mata Air',
        dibuat_pada: new Date(),
        diperbarui_pada: new Date()
      },
      {
        nama: 'Laut',
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
