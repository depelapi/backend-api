import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('user', {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      nama: {
        type: DataTypes.CHAR(50),
        allowNull: true,
      },
      no_telpon: {
        type: DataTypes.CHAR(15),
        allowNull: true,
      },
      nip: {
        type: DataTypes.CHAR(18),
        allowNull: true,
        unique: true,
      },
      id_google: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
      },
      dibuat_pada: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      diperbarui_pada: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      id_jenis_user: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'jenis_user',
          key: 'id',
        },
      },
      id_regu_damkar: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: true,
        references: {
          model: 'regu_damkar',
          key: 'id',
        },
      }
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('user');
  },
};
