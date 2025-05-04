import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import JenisUser from './jenis_user';
import ReguDamkar from './regu_damkar';

@Table({
  tableName: 'user',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,
})
class User extends Model<User> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  email!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  password!: string | null;

  @Column({
    type: DataType.CHAR(50),
    allowNull: true,
  })
  nama!: string | null;

  @Column({
    type: DataType.CHAR(15),
    allowNull: true,
  })
  no_telpon!: string | null;

  @Column({
    type: DataType.CHAR(18),
    allowNull: true,
    unique: true,
  })
  nip!: string | null;

  @Column({
    type: DataType.STRING,
    allowNull: true,
    unique: true,
  })
  id_google!: string | null;

  @ForeignKey(() => JenisUser)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_jenis_user!: number;

  @ForeignKey(() => ReguDamkar)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: true,
  })
  id_regu_damkar!: number | null;

  @BelongsTo(() => JenisUser)
  jenis_user!: JenisUser;

  @BelongsTo(() => ReguDamkar)
  regu_damkar!: ReguDamkar;
}

export default User;
