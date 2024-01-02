import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './microservice1.model';
import { KafkaService } from 'src/kafka/kafka.service';

@Injectable()
export class Microservice1Service {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    private kafkaService: KafkaService,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productModel.find().exec();
  }

  async createProduct(productData: Partial<Product>): Promise<Product> {
    const createdProduct = new this.productModel(productData);
    const savedProduct = await createdProduct.save();

    // Send a message to Kafka when a new product is created
    await this.kafkaService.sendMicroservice1Message('product-created', JSON.stringify(savedProduct));

    return savedProduct;
  }
}
