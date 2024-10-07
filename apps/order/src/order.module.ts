import { Module } from '@nestjs/common';
import { ItemModule } from './item/item.module';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Item } from './item/item.model';
import { Order } from './order.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ItemModule,
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.DATABASE_URL,
      autoLoadModels: true,
      synchronize: true,
      models: [Item, Order],
    }),
    // Register the Product model with SequelizeModule
    SequelizeModule.forFeature([Item, Order]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
