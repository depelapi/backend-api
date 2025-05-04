import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user';
import TitikKamera from './titik-kamera';
import StatusKebakaran from './status-kebakaran';

@Table({
  tableName: 'pelaporan',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,
})
class Pelaporan extends Model<Pelaporan> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.CHAR(50),
    allowNull: false,
  })
  judul!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  deskripsi!: string;

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
  })
  akun_socmed!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_user!: number;

  @ForeignKey(() => TitikKamera)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_titik_kamera!: number;

  @ForeignKey(() => StatusKebakaran)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_status_kebakaran!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => TitikKamera)
  titik_kamera!: TitikKamera;

  @BelongsTo(() => StatusKebakaran)
  status_kebakaran!: StatusKebakaran;
}

export default Pelaporan;