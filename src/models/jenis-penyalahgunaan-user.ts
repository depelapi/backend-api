import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'jenis_penyalahgunaan_user',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,  // Enable snake_case names
})
class JenisPenyalahgunaanUser extends Model<JenisPenyalahgunaanUser> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nama!: string;
}

export default JenisPenyalahgunaanUser;
