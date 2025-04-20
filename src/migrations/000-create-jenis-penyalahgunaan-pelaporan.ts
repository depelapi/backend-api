import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('jenis_penyalahgunaan_pelaporan', {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      nama: {
        type: DataTypes.CHAR(50),
        allowNull: false,
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
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('jenis_penyalahgunaan_pelaporan');
  },
};
