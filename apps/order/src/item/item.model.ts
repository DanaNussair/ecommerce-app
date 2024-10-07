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
import { Order } from '../order.model';

@Table
export class Item extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  id: number;

  @AllowNull(false)
  @Column(DataType.INTEGER)
  quantity: number;

  @ForeignKey(() => Product)
  @Column(DataType.INTEGER)
  productId: number;

  @ForeignKey(() => Order)
  @Column(DataType.INTEGER)
  orderId: number;
}
