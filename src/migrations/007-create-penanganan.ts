import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('penanganan', {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      lokasi_gmaps:
      {
        type: DataTypes.STRING,
        allowNull: false,
      },
      tiba_pada: {
        type: DataTypes.DATE,
        allowNull: true,
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
      id_regu_damkar: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'regu_damkar',
          key: 'id',
        },
      },
      id_pelaporan: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'pelaporan',
          key: 'id',
        },
      },
  });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('penanganan');
  },
};
