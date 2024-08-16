import {
  Controller,
  HttpStatus,
  Get,
  Query,
  Param,
  Post,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { SwaggerService } from './swagger.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
  ApiCookieAuth,
  ApiBasicAuth,
} from '@nestjs/swagger';
import { CccDto } from './dto/ccc.dto';
import { CccVo } from './dto/ccc.vo';

@ApiTags('SwaggerApi')
@Controller('swagger')
export class SwaggerController {
  constructor(private readonly swaggerService: SwaggerService) {}

  @Get()
  getSwagger() {
    return this.swaggerService.getHello();
  }

  // /aaa
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: '测试 aaa', description: 'aaa 描述' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'aaa 成功',
    type: String,
  })
  @ApiQuery({
    name: 'a1',
    type: String,
    description: 'a1 param',
    required: false,
    example: '1111',
  })
  @ApiQuery({
    name: 'a2',
    type: Number,
    description: 'a2 param',
    required: true,
    example: 2222,
  })
  @Get('aaa')
  aaa(@Query('a1') a1, @Query('a2') a2) {
    console.log(a1, a2);
    return 'aaa success';
  }

  // /bbb/:id
  @ApiCookieAuth('cookie')
  @ApiOperation({ summary: '测试 bbb', description: 'bbb 描述' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'bbb 成功',
    type: String,
  })
  @ApiResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: 'id 不合法',
  })
  @ApiParam({
    name: 'id',
    description: 'ID',
    required: true,
    example: 222,
  })
  @Get('bbb/:id')
  bbb(@Param('id') id: number) {
    console.log(id, typeof id);

    if (Number(id) !== 222) {
      throw new UnauthorizedException('id 不合法');
    }
    return 'bbb success';
  }

  @ApiBasicAuth('basic')
  @ApiTags('SwaggerApi-post')
  // /ccc
  @ApiOperation({ summary: '测试 ccc' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'ccc 成功',
    type: CccVo,
  })
  @ApiBody({
    type: CccDto,
  })
  @Post('ccc')
  ccc(@Body('ccc') ccc: CccDto) {
    console.log(ccc);

    const vo = new CccVo();
    vo.aaa = 111;
    vo.bbb = 222;

    return vo;
  }
}
