import {
  PartialType,
  PickType,
  OmitType,
  IntersectionType,
} from '@nestjs/mapped-types';
import { CreateMyDtoDto } from './create-my-dto.dto';
import { XxxDto } from './xxx.dto';

// export class UpdateAaaDto extends CreateMyDtoDto {}

// export class UpdateAaaDto extends PartialType(CreateMyDtoDto) {}

// export class UpdateAaaDto extends PickType(CreateMyDtoDto, ['age', 'email']) {}

// export class UpdateAaaDto extends OmitType(CreateMyDtoDto, [
//   'name',
//   'hoobies',
//   'sex',
// ]) {}

// export class UpdateAaaDto extends IntersectionType(CreateMyDtoDto, XxxDto) {}

export class UpdateMyDtoDto extends IntersectionType(
  PickType(CreateMyDtoDto, ['name', 'age']),
  PartialType(OmitType(XxxDto, ['yyy'])),
) {}
