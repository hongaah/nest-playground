import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  SerializeOptions,
  HttpStatus,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserVo } from './vo/user.vo';
import { User } from './entities/user.entity';
import { MyVoService } from './my-vo.service';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Vo Demo')
@Controller('test-dto-vo-2/my-vo')
export class MyVoController {
  constructor(private readonly myVoService: MyVoService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.myVoService.create(createUserDto);
  }

  /** vo: 直接返回数据库的数据 */
  @Get('/init')
  findAll() {
    return this.myVoService.findAll();
  }

  @Get('/init:id')
  findOne(@Param('id') id: string) {
    return this.myVoService.findOne(+id);
  }

  /** vo: 基于 entity 直接创建 vo */
  /** swagger: vo 直接用 entity  */
  @ApiOperation({ summary: 'entity 定义的字段' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ccc 成功',
    type: User,
  })
  @SerializeOptions({
    strategy: 'excludeAll', // 全部排除，除了有 @Expose 装饰器的
    // strategy: 'exposeAll', // 全部导出，除了有 @Exclude 装饰器的
  })
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/extendEntity')
  findAllExtendEntity() {
    return this.myVoService.findAll();
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/extendEntity:id')
  findOneExtendEntity(@Param('id') id: string) {
    return this.myVoService.findOne(+id);
  }

  /** vo: 返回 vo 文件定义的字段 */
  /** swagger: 使用 vo 文件定义的 swagger 的装饰器 */
  @ApiOperation({ summary: 'vo 文件定义的字段' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ccc 成功',
    type: UserVo,
  })
  @Get('/byvo')
  findAllByVo() {
    return this.myVoService.findAllByVo();
  }

  @Get('/byvo:id')
  findOneByVo(@Param('id') id: string) {
    return this.myVoService.findOneByVo(+id);
  }
}
