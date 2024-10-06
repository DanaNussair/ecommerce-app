import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Module({
  imports: [
    // Load environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      uri: process.env.DATABASE_URL,
      autoLoadModels: true,
      synchronize: true,
      models: [Product],
    }),
    // Register the Product model with SequelizeModule
    SequelizeModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
