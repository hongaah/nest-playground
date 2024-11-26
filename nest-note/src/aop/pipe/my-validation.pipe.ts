import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
  Optional,
  Inject,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class MyValidationPipe implements PipeTransform<any> {
  // 标记了 @Optional，没找到 validation_options token 的 provider 也不会报错
  @Optional()
  @Inject('validation_options')
  private options;

  async transform(value: any, { metatype }: ArgumentMetadata) {
    /**
     * 参数解析：
     * value: query、param
     *
     * metadata: type、metatype、data
     * type: @Query、@Param、@Body 装饰器，或者自定义装饰器
     * metatype: 参数的 ts 类型
     * data: @Query、@Param、@Body 等装饰器的参数
     *
     */

    if (!metatype) {
      return value;
    }
    console.log(this.options);
    const object = plainToInstance(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      throw new BadRequestException('参数验证失败');
    }
    return value;
  }
}
