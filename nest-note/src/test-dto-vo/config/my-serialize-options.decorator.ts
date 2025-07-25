import { SetMetadata } from '@nestjs/common';
import { ClassTransformOptions } from 'class-transformer';

export const CLASS_SERIALIZER_OPTIONS = 'class_serializer:options';

// 这个装饰器的作用就是往 class 或者 method 上加一个 metadata。然后 interceptor 取出这个 metadata 的 options 给 class-transfromer 用。所以这个 options 的类型就是 ClassTransformOptions。
export const MySerializeOptions = (options: ClassTransformOptions) =>
  SetMetadata(CLASS_SERIALIZER_OPTIONS, options);
