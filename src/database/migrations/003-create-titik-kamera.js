'use strict';

const tableName = 'titik_kamera';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      nama: {
        type: Sequelize.CHAR(50),
        allowNull: false,
        unique: true,
      },
      id_device: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      latitud: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false,
      },
      longitud: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false,
      },
      notifikasi_publik: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      dibuat_pada: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      diperbarui_pada: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
      },
      id_user: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};