'use strict';

const tableName = 'pelaporan';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      judul: {
        type: Sequelize.CHAR(50),
        allowNull: false,
      },
      deskripsi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitud: {
        type: Sequelize.DECIMAL(10, 8),
        allowNull: false,
      },
      longitud: {
        type: Sequelize.DECIMAL(11, 8),
        allowNull: false,
      },
      akun_socmed: {
        type: Sequelize.STRING,
        allowNull: true,
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
      id_titik_kamera: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: true,
        references: {
          model: 'titik_kamera',
          key: 'id',
        },
      },
      id_status_kebakaran: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'status_kebakaran',
          key: 'id',
        },
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};