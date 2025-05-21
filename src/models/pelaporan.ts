import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import TitikKamera from './titikKamera';
import StatusKebakaran from './statusKebakaran';
import GambarPelaporan from './gambarPelaporan';

class Pelaporan extends Model {
  public id!: number;
  public judul!: string;
  public deskripsi!: string;
  public latitud!: number;
  public longitud!: number;
  public akun_socmed!: boolean;
  public id_user!: number;
  public id_titik_kamera!: number;
  public id_status_kebakaran!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
}

Pelaporan.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
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
      type: DataTypes.STRING,
      allowNull: true,
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    id_titik_kamera: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'titik_kamera',
        key: 'id',
      },
    },
    id_status_kebakaran: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'status_kebakaran',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'pelaporan',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

Pelaporan.belongsTo(User, {
  foreignKey: 'id_user',
  as: 'User'
});

Pelaporan.belongsTo(TitikKamera, {
  foreignKey: 'id_titik_kamera',
  as: 'TitikKamera'
});

Pelaporan.belongsTo(StatusKebakaran, {
  foreignKey: 'id_status_kebakaran',
  as: 'StatusKebakaran'
});

Pelaporan.hasMany(GambarPelaporan, {
  foreignKey: 'id_pelaporan',
  as: 'GambarPelaporan'
});

export default Pelaporan;