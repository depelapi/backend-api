import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('titik_kamera', {
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
      id_device: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      latitud: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
      },
      longitud: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
      },
      notifikasi_publik: {
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
    });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('titik_kamera');
  },
};

