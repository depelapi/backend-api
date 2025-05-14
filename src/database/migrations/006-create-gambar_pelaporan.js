'use strict';

const tableName = 'gambar_pelaporan';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      tautan: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
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
      id_pelaporan: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'pelaporan',
          key: 'id',
        },
      },  
    });
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};