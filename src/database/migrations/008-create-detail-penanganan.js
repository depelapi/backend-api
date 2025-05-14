'use strict';

const tableName = 'detail_penanganan';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      deskripsi: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      penyebab: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      akses_jalan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      kendala_di_lapangan: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      korban_jiwa: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
      },
      bangunan_terdampak: {
        type: Sequelize.INTEGER({ unsigned: true })
      },
      selesai_pada: {
        type: Sequelize.DATE,
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
      id_penanganan: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'penanganan',
          key: 'id',
        },
      },
      id_jenis_sumber_air: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'jenis_sumber_air',
          key: 'id',
        },
      }
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};