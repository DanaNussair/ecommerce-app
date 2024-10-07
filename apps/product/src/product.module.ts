import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { APP_FILTER } from '@nestjs/core';
import { GrpcServerExceptionFilter } from 'nestjs-grpc-exceptions';

import { ProductController, ProductGrpcController } from './product.controller';
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
  controllers: [ProductController, ProductGrpcController],
  providers: [
    ProductService,
    {
      provide: APP_FILTER,
      useClass: GrpcServerExceptionFilter,
    },
  ],
})
export class ProductModule {}
