import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Microservice1Controller } from './microservice1.controller';
import { Microservice1Service } from './microservice1.service';
import { Product, ProductSchema } from './microservice1.model';
import { KafkaModule } from 'src/kafka/kafka.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    KafkaModule
  ],
  controllers: [Microservice1Controller],
  providers: [Microservice1Service],
})
export class Microservice1Module {}

