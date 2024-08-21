import { Module } from '@nestjs/common';
import { MyMongooseService } from './my-mongoose.service';
import { MyMongooseController } from './my-mongoose.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Dog, DogSchema } from './entities/dog.entity';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/nest-demo'),
    MongooseModule.forFeature([{ name: Dog.name, schema: DogSchema }]),
  ],
  controllers: [MyMongooseController],
  providers: [MyMongooseService],
})
export class MyMongooseModule {}
