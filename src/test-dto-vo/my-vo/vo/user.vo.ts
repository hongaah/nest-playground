import { ApiProperty } from '@nestjs/swagger';

export class UserVo {
  @ApiProperty({ name: 'id' })
  id: number;

  @ApiProperty({ name: 'username' })
  username: string;

  @ApiProperty({ name: 'email' })
  email: string;

  constructor(partial: Partial<UserVo>) {
    Object.assign(this, partial);
  }
}
