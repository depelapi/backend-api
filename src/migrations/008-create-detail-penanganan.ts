import { QueryInterface, DataTypes } from 'sequelize';

export default {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('detail_penanganan', {
      id: {
        type: DataTypes.INTEGER({ unsigned: true }),
        autoIncrement: true,
        primaryKey: true,
      },
      deskripsi: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      penyebab: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      akses_jalan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      kendala_di_lapangan: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      korban_jiwa: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
      },
      bangunan_terdampak: {
        type: DataTypes.INTEGER({ unsigned: true })
      },
      selesai_pada: {
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
      id_penanganan: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'penanganan',
          key: 'id',
        },
      },
      id_jenis_sumber_air: {
        type: DataTypes.INTEGER({ unsigned: true }),
        allowNull: false,
        references: {
          model: 'jenis_sumber_air',
          key: 'id',
        },
      }
  });
  },
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('detail_penanganan');
  },
};
