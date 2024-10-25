import { Controller, Post, Body, UseFilters, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { I18nValidationExceptionFilter, I18nValidationPipe } from 'nestjs-i18n';

@UsePipes(I18nValidationPipe)
@UseFilters(
  new I18nValidationExceptionFilter({
    detailedErrors: false,
  }),
)
@Controller('test-i18n-2/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    console.log(createUserDto);
    return this.userService.create(createUserDto);
  }
}
