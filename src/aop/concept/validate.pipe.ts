import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ValidatePipe implements PipeTransform {
  // 可以对参数做一些检验和转换
  transform(value: any, metadata: ArgumentMetadata) {
    if (Number.isNaN(parseInt(value))) {
      throw new BadRequestException(`参数${metadata.data}只能是字符串或者数字`);
    }

    return typeof value === 'number' ? value * 10 : parseInt(value) * 10;
  }
}
