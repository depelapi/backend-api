'use strict';

const tableName = 'user';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(tableName, {
      id: {
        type: Sequelize.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      nama: {
        type: Sequelize.CHAR(50),
        allowNull: true,
      },
      no_telpon: {
        type: Sequelize.CHAR(15),
        allowNull: true,
      },
      nip: {
        type: Sequelize.CHAR(18),
        allowNull: true,
        unique: true,
      },
      id_google: {
        type: Sequelize.STRING,
        allowNull: true,
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
      id_jenis_user: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'jenis_user',
          key: 'id',
        },
      },
      id_regu_damkar: {
        type: Sequelize.INTEGER({ unsigned: true }),
        allowNull: true,
        references: {
          model: 'regu_damkar',
          key: 'id',
        },
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(tableName);
  }
};
