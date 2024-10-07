import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';
import { Product } from 'apps/product/src/product.model';

@Table
export class Item extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.STRING)
  quantity: string;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  productId: number;
}
