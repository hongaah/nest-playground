import {
  IsEmail,
  IsNotEmpty,
  IsDefined,
  IsString,
  IsOptional,
  IsIn,
  IsNotIn,
  IsArray,
  IsBoolean,
  IsInt,
  IsNumber,
  IsDate,
  ArrayContains,
  ArrayNotContains,
  ArrayMinSize,
  ArrayMaxSize,
  ArrayUnique,
  IsPositive,
  IsNegative,
  Min,
  Max,
  IsDivisibleBy,
  IsDateString,
  IsAlpha,
  IsAlphanumeric,
  Contains,
  MinLength,
  MaxLength,
  Length,
  IsHexColor,
  IsHSL,
  IsRgbColor,
  IsIP,
  IsPort,
  IsJSON,
  ValidateIf,
  Validate,
} from 'class-validator';
import { MyValidator } from '../config/my-validator';
import { MyContains } from '../config/my-contains.decorator';

export class ClassValidatorDecoratorsDto {
  @IsNotEmpty({ message: 'aaa 不能为空' }) // 检查值是不是 ''、undefined、null
  @IsString({ message: 'aaa 必须是字符串' })
  @IsEmail({}, { message: 'aaa 必须是邮箱' })
  @IsOptional() // 和 @IsNotEmpty 相反的是
  @IsIn(['aaa@aa.com', 'bbb@bb.com']) // 限制属性只能是某些值
  @IsNotIn(['ccc@cc.com', 'ddd@dd.com']) // 限制属性不能是某些值
  aaa: string;

  @IsDefined() // 检查值是不是 undefined、null
  kkk: string;

  @IsString()
  @MinLength(2)
  @MaxLength(6)
  @IsAlpha() // 检查是否只有字母
  @Contains('aaa') // 是否包含某个值
  jjj: string;

  @IsString()
  @Length(2, 6) // 限制字符串长度
  @IsAlphanumeric() // 检查是否只有字母和数字
  lll: string;

  @IsArray()
  @ArrayContains(['aaa'])
  @ArrayNotContains(['bbb'])
  @ArrayMinSize(2)
  @ArrayMaxSize(5)
  @ArrayUnique() // 限制数组元素必须唯一
  bbb: string;

  @IsBoolean()
  ccc: boolean;

  @IsInt()
  @IsPositive() // 必须是正数
  @Min(1)
  @Max(10)
  @IsDivisibleBy(2) // 必须被某个数整除
  ddd: number;

  @IsNumber()
  @IsNegative() // 必须是负数
  eee: number;

  @IsDate()
  @IsDateString() // ISO 标准的日期字符串 类似 '2019-01-01T00:00:00.000Z'
  fff: Date;

  @IsHexColor() // 校验颜色值的格式
  @IsHSL()
  @IsRgbColor()
  @IsIP() // 校验 IP 的格式
  @IsPort() // 校验端口
  @IsJSON() // 校验 JSON 格式
  qqq: string;

  // @ValidateIf 可以根据别的字段来决定是否校验当前字段
  // 如果 qqq 传了 111，那就需要对 iii 做校验，否则不需要。
  @ValidateIf((o) => o.qqq === '111')
  @IsNotEmpty()
  @IsHexColor()
  iii: string;

  // 自定义校验规则
  @Validate(MyValidator, [11, 22], {
    message: 'rrr 校验失败',
  })
  rrr: string;

  @MyContains('111', {
    message: 'sss 必须包含 111',
  })
  sss: string;
}
