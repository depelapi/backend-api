import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('penyalahgunaan_user', {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      banned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
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
      id_user: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      id_jenis_penyalahgunaan_user: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'jenis_penyalahgunaan_user',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('penyalahgunaan_user');
  },
};
