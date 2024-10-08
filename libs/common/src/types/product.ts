// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.3
//   protoc               v5.28.2
// source: proto/product.proto

/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import { Observable } from "rxjs";

export const protobufPackage = "product";

/** The product message definition */
export interface ProductDto {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  imageUrl: string;
}

/** Request message for GetProduct */
export interface GetProductRequest {
  id: number;
}

/** Request message for ListProducts */
export interface ListProductsRequest {
}

/** Response message for ListProducts */
export interface ListProductsResponse {
  products: ProductDto[];
}

/** Request message for CreateProduct */
export interface CreateProductRequest {
  name: string;
  description?: string | undefined;
  price: number;
  quantity: number;
  category?: string | undefined;
  imageUrl?: string | undefined;
}

/** Request message for UpdateProduct */
export interface UpdateProductRequest {
  id: number;
  name?: string | undefined;
  description?: string | undefined;
  price?: number | undefined;
  quantity?: number | undefined;
  category?: string | undefined;
  imageUrl?: string | undefined;
}

/** Request message for DeleteProduct */
export interface DeleteProductRequest {
  id: number;
}

/** Response message for DeleteProduct */
export interface DeleteProductResponse {
  success: boolean;
}

export const PRODUCT_PACKAGE_NAME = "product";

/** The service definition */

export interface ProductServiceClient {
  getProduct(request: GetProductRequest): Observable<ProductDto>;

  listProducts(request: ListProductsRequest): Observable<ListProductsResponse>;

  createProduct(request: CreateProductRequest): Observable<ProductDto>;

  updateProduct(request: UpdateProductRequest): Observable<ProductDto>;

  deleteProduct(request: DeleteProductRequest): Observable<DeleteProductResponse>;
}

/** The service definition */

export interface ProductServiceController {
  getProduct(request: GetProductRequest): Promise<ProductDto> | Observable<ProductDto> | ProductDto;

  listProducts(
    request: ListProductsRequest,
  ): Promise<ListProductsResponse> | Observable<ListProductsResponse> | ListProductsResponse;

  createProduct(request: CreateProductRequest): Promise<ProductDto> | Observable<ProductDto> | ProductDto;

  updateProduct(request: UpdateProductRequest): Promise<ProductDto> | Observable<ProductDto> | ProductDto;

  deleteProduct(
    request: DeleteProductRequest,
  ): Promise<DeleteProductResponse> | Observable<DeleteProductResponse> | DeleteProductResponse;
}

export function ProductServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getProduct", "listProducts", "createProduct", "updateProduct", "deleteProduct"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(constructor.prototype, method);
      GrpcStreamMethod("ProductService", method)(constructor.prototype[method], method, descriptor);
    }
  };
}

export const PRODUCT_SERVICE_NAME = "ProductService";
