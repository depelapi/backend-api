import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/database';
import DetailPenanganan from './detailPenanganan';

class StatusKebakaran extends Model {
  public id!: number;
  public nama!: string;
  public dibuat_pada!: Date;
  public diperbarui_pada!: Date;
}

StatusKebakaran.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    nama: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'status_kebakaran',
    createdAt: 'dibuat_pada',
    updatedAt: 'diperbarui_pada',
    underscored: true,
  }
);

StatusKebakaran.hasMany(DetailPenanganan, {
  foreignKey: 'id_status_kebakaran',
  as: 'DetailPenanganan',
});

export default StatusKebakaran;
