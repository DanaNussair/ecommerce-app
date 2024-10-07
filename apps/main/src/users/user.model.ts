import {
  Table,
  Column,
  Model,
  IsEmail,
  PrimaryKey,
  AutoIncrement,
  DataType,
  BeforeCreate,
  BeforeUpdate,
  AllowNull,
} from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Table
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @IsEmail
  @Column({ type: DataType.STRING, unique: true })
  email: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @BeforeCreate
  @BeforeUpdate
  static async hashPassword(instance: User) {
    if (instance.password) {
      const salt = await bcrypt.genSalt();
      instance.password = await bcrypt.hash(instance.password, salt);
    }
  }

  @Column({
    type: DataType.ENUM({ values: ['customer', 'retailer'] }),
    defaultValue: 'customer',
  })
  role: 'customer' | 'retailer';

  @Column(DataType.INTEGER)
  age: number;

  @Column({
    type: DataType.ENUM({ values: ['female', 'male', 'other'] }),
    defaultValue: 'male',
  })
  gender: 'female' | 'male' | 'other';

  @Column(DataType.DATE)
  createdAt: Date;

  @Column({ type: DataType.DATE, allowNull: true })
  updatedAt: Date;
}
