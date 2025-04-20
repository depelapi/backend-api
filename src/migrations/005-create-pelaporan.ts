import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('pelaporan', {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      judul: {
        type: DataTypes.CHAR(50),
        allowNull: false,
      },
      deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitud: {
        type: DataTypes.DECIMAL(10, 8),
        allowNull: false,
      },
      longitud: {
        type: DataTypes.DECIMAL(11, 8),
        allowNull: false,
      },
      akun_socmed: {
        type: DataTypes.BOOLEAN,
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
      id_user: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'user',
          key: 'id',
        },
      },
      id_titik_kamera: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'titik_kamera',
          key: 'id',
        },
      },
      id_status_kebakaran: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'status_kebakaran',
          key: 'id',
        },
      },
  });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('pelaporan');
  },
};
