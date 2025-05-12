import { QueryInterface } from 'sequelize';

const tableName = 'user';

export default {
  async up (queryInterface: QueryInterface) {
     await queryInterface.bulkInsert(tableName, [
      {
        nama: 'Muhammad Azhim Nugroho',
        email: 'azhim@email.com',
        password: 'password',
        no_telpon: null,
        nip: null,
        id_google: null,
        dibuat_pada: new Date(),
        diperbarui_pada: new Date(),
        id_jenis_user: 1,
        id_regu_damkar: null
      },
      {
        nama: 'Nida\'an Khafiyya',
        email: 'nida@email.com',
        password: 'password',
        no_telpon: null,
        nip: null,
        id_google: null,
        dibuat_pada: new Date(),
        diperbarui_pada: new Date(),
        id_jenis_user: 2,
        id_regu_damkar: 1,
      },
      {
        nama: 'Jasmine Kinasih',
        email: 'jasmine@email.com',
        password: 'password',
        no_telpon: null,
        nip: null,
        id_google: null,
        dibuat_pada: new Date(),
        diperbarui_pada: new Date(),
        id_jenis_user: 3,
        id_regu_damkar: null
      },
      {
        nama: 'Reza Fauzan',
        email: 'reza@email.com',
        password: 'password',
        no_telpon: null,
        nip: null,
        id_google: null,
        dibuat_pada: new Date(),
        diperbarui_pada: new Date(),
        id_jenis_user: 4,
        id_regu_damkar: null
      },
      {
        nama: 'Rahimi Fitri',
        email: 'fitri@email.com',
        password: 'password',
        no_telpon: null,
        nip: null,
        id_google: null,
        dibuat_pada: new Date(),
        diperbarui_pada: new Date(),
        id_jenis_user: 2,
        id_regu_damkar: 2
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
