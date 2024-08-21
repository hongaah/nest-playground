import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema()
export class Dog {
  @Prop()
  name: string;

  @Prop()
  age: number;

  @Prop([String])
  tags: string[];
}

// 这个 HydratedDocument 只是在 Dog 类型的基础上加了一个 _id 属性
export type DogDocument = HydratedDocument<Dog>;

// 用 @Schema 创建 schema，然后用 @Prop 声明属性。之后用 SchemaFactory.createForClass 来根据 class 创建 Schema。
export const DogSchema = SchemaFactory.createForClass(Dog);
