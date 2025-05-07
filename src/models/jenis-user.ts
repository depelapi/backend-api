import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'jenis_user',
  createdAt: 'dibuat_pada',
  updatedAt: 'diperbarui_pada',
  underscored: true,
})
class JenisUser extends Model<JenisUser> {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nama!: string;
}

export default JenisUser;
