import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Microservice1Module } from './microservice1/microservice1.module';
import { Microservice2Module } from './microservice2/microservice2.module';

@Module({
  imports: [MongooseModule.forRoot(`mongodb+srv://Dezina:dzi123**@cluster0-sosgh.mongodb.net/nestJs-mongodb?retryWrites=true&w=majority`), Microservice1Module, Microservice2Module],
})
export class AppModule {}
