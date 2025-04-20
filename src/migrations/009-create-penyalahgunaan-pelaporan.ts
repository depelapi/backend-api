import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('penyalahgunaan_pelaporan', {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
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
      id_pelaporan: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'pelaporan',
          key: 'id',
        },
      },
      id_jenis_penyalahgunaan_pelaporan: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'jenis_penyalahgunaan_pelaporan',
          key: 'id',
        },
      }
  });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('penyalahgunaan_pelaporan');
  },
};
