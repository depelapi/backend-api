import { QueryInterface } from 'sequelize';

const tableName = 'jenis_regu_damkar';

export default {
  async up (queryInterface: QueryInterface) {
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

  async down (queryInterface: QueryInterface) {
    await queryInterface.bulkDelete(tableName, {}, {});
    await queryInterface.sequelize.query(
      `ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`
    );
  }
};
