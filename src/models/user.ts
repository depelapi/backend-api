import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public id!: number;
  public email!: string | null;
  public password!: string | null;
  public nama!: string | null;
  public no_telpon!: string | null;
  public nip!: string | null;
  public id_google!: string | null;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
  public id_jenis_user!: number;
  public id_regu_damkar!: number | null;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    nama: {
      type: DataTypes.CHAR(50),
      allowNull: true,
    },
    no_telpon: {
      type: DataTypes.CHAR(15),
      allowNull: true,
    },
    nip: {
      type: DataTypes.CHAR(18),
      allowNull: true,
      unique: true,
    },
    id_google: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
    },
    id_jenis_user: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      references: {
        model: 'jenis_user',
        key: 'id',
      },
    },
    id_regu_damkar: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'regu_damkar',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    tableName: 'user',
    timestamps: true,
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
  }
);

export default User;