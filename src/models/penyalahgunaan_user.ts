import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user';
import JenisPenyalahgunaanUser from './jenis_penyalahgunaan_user';

@Table({
  tableName: 'penyalahgunaan_user',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,
})
class PenyalahgunaanUser extends Model<PenyalahgunaanUser> {
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  deskripsi!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  banned!: boolean;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_user!: number;

  @ForeignKey(() => JenisPenyalahgunaanUser)
  @Column({
    type: DataType.INTEGER.UNSIGNED,
    allowNull: false,
  })
  id_jenis_penyalahgunaan_user!: number;

  @BelongsTo(() => User)
  user!: User;

  @BelongsTo(() => JenisPenyalahgunaanUser)
  jenis_penyalahgunaan_user!: JenisPenyalahgunaanUser;
}

export default PenyalahgunaanUser;