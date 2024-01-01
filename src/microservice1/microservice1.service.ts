import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './microservice1.model';

@Injectable()
export class Microservice1Service {
  constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const createdProduct = new this.productModel(productData);
    return createdProduct.save();
  }
}
