import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CccDto {
  @ApiProperty({
    name: 'aaa',
    maxLength: 30,
    minLength: 2,
    required: true,
    example: 'test a',
  })
  aaa: string;

  @ApiPropertyOptional({
    name: 'bbb',
    minimum: 1,
    maximum: 100,
    example: 10,
  })
  bbb: number;

  @ApiProperty({
    name: 'ccc',
    enum: ['c1', 'c2', 'c3'],
    default: 'c2',
  })
  ccc: Array<string>;
}
