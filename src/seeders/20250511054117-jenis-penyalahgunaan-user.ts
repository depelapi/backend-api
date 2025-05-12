import { QueryInterface } from 'sequelize';

const tableName = 'jenis_penyalahgunaan_user';

export default {
  async up (queryInterface: QueryInterface) {
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

  async down (queryInterface: QueryInterface) {
    await queryInterface.bulkDelete(tableName, {}, {});
    await queryInterface.sequelize.query(
      `ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`
    );
  }
};
