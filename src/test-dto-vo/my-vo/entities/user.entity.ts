// export class User {
//   id: number;

//   username: string;

//   password: string;

//   email: string;

//   // 可以传入部分属性
//   constructor(partial: Partial<User>) {
//     Object.assign(this, partial);
//   }
// }

// 这里要用到 class-transformer 这个包
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';

export class User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  username: string;

  @ApiHideProperty() // swagger 文档不显示该字段
  @Exclude()
  password: string;

  @ApiProperty()
  @Expose() // 添加一个导出的字段，这个字段是只读的
  get xxx(): string {
    return `${this.username} ${this.email}`;
  }

  @ApiProperty()
  @Transform(({ value }) => '邮箱是：' + value) // 对返回的字段值做一些转换
  email: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }
}
