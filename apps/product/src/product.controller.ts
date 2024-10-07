import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { Observable } from 'rxjs';

import { Product } from './product.model';
import { ProductService } from './product.service';
import {
  CreateProductRequest,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  ListProductsResponse,
  UpdateProductRequest,
} from '@app/common';
import { GrpcMethod } from '@nestjs/microservices';
import { GrpcNotFoundException } from 'nestjs-grpc-exceptions';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  listProducts():
    | Promise<ListProductsResponse>
    | Observable<ListProductsResponse>
    | ListProductsResponse {
    return this.productService.listProducts();
  }

  @Get(':id')
  getProduct(
    @Param('id') id: string,
  ): Promise<Product> | Observable<Product> | Product {
    const request: GetProductRequest = { id: +id };
    return this.productService.getProduct(request);
  }

  @Post()
  createProduct(
    @Body() request: CreateProductRequest,
  ): Promise<Product> | Observable<Product> | Product {
    return this.productService.createProduct(request);
  }

  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() request: UpdateProductRequest,
  ): Promise<Product> | Observable<Product> | Product {
    request.id = +id;
    return this.productService.updateProduct(request);
  }

  @Delete(':id')
  deleteProduct(
    @Param('id') id: string,
  ):
    | Promise<DeleteProductResponse>
    | Observable<DeleteProductResponse>
    | DeleteProductResponse {
    const request: DeleteProductRequest = { id: +id };
    return this.productService.deleteProduct(request);
  }
}

@Controller()
export class ProductGrpcController {
  constructor(private readonly productService: ProductService) {}

  @GrpcMethod('ProductService', 'GetProduct')
  getProduct(
    request: GetProductRequest,
  ): Promise<Product> | Observable<Product> | Product {
    try {
      return this.productService.getProduct(request);
    } catch (error) {
      console.error(error);
      throw new GrpcNotFoundException(error);
    }
  }

  @GrpcMethod('ProductService', 'ListProducts')
  listProducts():
    | Promise<ListProductsResponse>
    | Observable<ListProductsResponse>
    | ListProductsResponse {
    return this.productService.listProducts();
  }

  @GrpcMethod('ProductService', 'CreateProduct')
  createProduct(
    request: CreateProductRequest,
  ): Promise<Product> | Observable<Product> | Product {
    return this.productService.createProduct(request);
  }

  @GrpcMethod('ProductService', 'UpdateProduct')
  updateProduct(
    request: UpdateProductRequest,
  ): Promise<Product> | Observable<Product> | Product {
    return this.productService.updateProduct(request);
  }

  @GrpcMethod('ProductService', 'DeleteProduct')
  deleteProduct(
    request: DeleteProductRequest,
  ):
    | Promise<DeleteProductResponse>
    | Observable<DeleteProductResponse>
    | DeleteProductResponse {
    return this.productService.deleteProduct(request);
  }
}
