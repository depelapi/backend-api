'use strict';

const tableName = 'menangani_lahan';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
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
      id_regu_damkar: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'regu_damkar',
          key: 'id',
        },
      },
      id_titik_kamera: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'titik_kamera',
          key: 'id',
        },
      },
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};