import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user';

@Table({
  tableName: 'titik_kamera',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,
})
class TitikKamera extends Model<TitikKamera> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.CHAR(50),
    allowNull: false,
    unique: true,
  })
  nama!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  id_device!: string;

  @Column({
    type: DataType.DECIMAL(10, 8),
    allowNull: false,
  })
  latitud!: number;

  @Column({
    type: DataType.DECIMAL(11, 8),
    allowNull: false,
  })
  longitud!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  notifikasi_publik!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_user!: number;

  @BelongsTo(() => User)
  user!: User;
}

export default TitikKamera;