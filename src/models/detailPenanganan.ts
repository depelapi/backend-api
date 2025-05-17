import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import Penanganan from './penanganan';
import JenisSumberAir from './jenisSumberAir';

class DetailPenanganan extends Model {
  public id!: number;
  public deskripsi!: string;
  public penyebab!: string;
  public akses_jalan!: string;
  public kendala_di_lapangan!: string;
  public korban_jiwa!: number;
  public bangunan_terdampak!: number;
  public selesai_pada!: Date | null;
  public id_penanganan!: number;
  public id_jenis_sumber_air!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;

  public static aassociate (models: any): void {
    DetailPenanganan.belongsTo(models.Penanganan, { foreignKey: 'id_penanganan' });
    DetailPenanganan.belongsTo(models.JenisSumberAir, { foreignKey: 'id_jenis_sumber_air' });
  };
}

DetailPenanganan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    bangunan_terdampak: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
    },
    selesai_pada: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    id_penanganan: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'penanganan',
        key: 'id',
      },
    },
    id_jenis_sumber_air: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'jenis_sumber_air',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'detail_penanganan',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

export default DetailPenanganan;