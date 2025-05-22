import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import User from './user';
import JenisPenyalahgunaanUser from './jenisPenyalahgunaanUser';
import ReguDamkar from './reguDamkar';
import TitiKamera from './titikKamera';

class PenyalahgunaanUser extends Model {
  public id!: number;
  public deskripsi!: string;
  public banned!: boolean;
  public id_user!: number;
  public id_jenis_penyalahgunaan_user!: number;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
}

PenyalahgunaanUser.init(
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
    banned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    id_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    id_jenis_penyalahgunaan_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'jenis_penyalahgunaan_user',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'penyalahgunaan_user',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

PenyalahgunaanUser.belongsTo(ReguDamkar, {
  foreignKey: 'id_regu_damkar',
  as: 'ReguDamkar',
});

PenyalahgunaanUser.belongsTo(TitiKamera, {
  foreignKey: 'id_titik_kamera',
  as: 'TitikKamera',
});

PenyalahgunaanUser.belongsTo(User, {
  foreignKey: 'id_user',
  as: 'User',
});

PenyalahgunaanUser.belongsTo(JenisPenyalahgunaanUser, {
  foreignKey: 'id_jenis_penyalahgunaan_user',
  as: 'JenisPenyalahgunaanUser',
});

export default PenyalahgunaanUser;