'use strict';
const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */

const tableName = 'user';
const SALT_ROUNDS = 10;

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('password', SALT_ROUNDS);
    
    await queryInterface.bulkInsert(tableName, [
      {
        nama: 'Muhammad Azhim Nugroho',
        email: 'azhim@email.com',
        password: hashedPassword,
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
        password: hashedPassword,
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
        password: hashedPassword,
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
        password: hashedPassword,
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
        password: hashedPassword,
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

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete(tableName, null, {});
    await queryInterface.sequelize.query(
      `ALTER TABLE ${tableName} AUTO_INCREMENT = 1;`
    );
  }
};