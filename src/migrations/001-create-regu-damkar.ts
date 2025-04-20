import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('regu_damkar', {
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
      id_jenis_regu_damkar: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'jenis_regu_damkar',
          key: 'id',
        },
      },
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('regu_damkar');
  },
};
