import {
  CreateProductRequest,
  DeleteProductRequest,
  GetProductRequest,
  ListProductsResponse,
  UpdateProductRequest,
} from '@app/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private productModel: typeof Product,
  ) {}

  async getProduct(getProductRequest: GetProductRequest): Promise<Product> {
    return this.productModel.findOne({
      where: { id: getProductRequest.id },
      rejectOnEmpty: true,
    });
  }

  async listProducts(): Promise<ListProductsResponse> {
    const products = await this.productModel.findAll();
    return { products };
  }

  async createProduct(
    createProductRequest: Omit<CreateProductRequest, keyof any[]>,
  ): Promise<Product> {
    try {
      return this.productModel.create(createProductRequest);
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProduct(
    updateProductRequest: UpdateProductRequest,
  ): Promise<Product> {
    try {
      const product = await this.productModel.findByPk(updateProductRequest.id);
      if (!product) {
        throw new Error('Product not found');
      }
      return product.update(updateProductRequest);
    } catch (error) {
      throw new Error(error);
    }
  }

  async deleteProduct(
    deleteProductRequest: DeleteProductRequest,
  ): Promise<any> {
    try {
      const product = await this.productModel.findByPk(deleteProductRequest.id);
      if (!product) {
        throw new Error('Product not found');
      }
      await product.destroy();
      return { success: true };
    } catch (error) {
      throw new Error(error);
    }
  }
}
