import { PartialType } from '@nestjs/swagger';
import { CreateDecoratorDto } from './create-decorator.dto';

export class UpdateDecoratorDto extends PartialType(CreateDecoratorDto) {}
