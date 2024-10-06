import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';

import { Product } from './product.model';
import { ProductService } from './product.service';
import {
  CreateProductRequest,
  DeleteProductRequest,
  DeleteProductResponse,
  GetProductRequest,
  ListProductsResponse,
  ProductServiceController,
  ProductServiceControllerMethods,
  UpdateProductRequest,
} from '@app/common';

@Controller()
@ProductServiceControllerMethods()
export class ProductController implements ProductServiceController {
  constructor(private readonly productService: ProductService) {}

  getProduct(
    request: GetProductRequest,
  ): Promise<Product> | Observable<Product> | Product {
    return this.productService.getProduct(request);
  }

  listProducts():
    | Promise<ListProductsResponse>
    | Observable<ListProductsResponse>
    | ListProductsResponse {
    return this.productService.listProducts();
  }

  createProduct(
    request: CreateProductRequest,
  ): Promise<Product> | Observable<Product> | Product {
    return this.productService.createProduct(request);
  }

  updateProduct(
    request: UpdateProductRequest,
  ): Promise<Product> | Observable<Product> | Product {
    return this.productService.updateProduct(request);
  }

  deleteProduct(
    request: DeleteProductRequest,
  ):
    | Promise<DeleteProductResponse>
    | Observable<DeleteProductResponse>
    | DeleteProductResponse {
    return this.productService.deleteProduct(request);
  }
}
