import { Controller, Get } from '@nestjs/common';
import { AuthAclService } from './auth-acl.service';

@Controller('auth-acl')
export class AuthAclController {
  constructor(private readonly authAclService: AuthAclService) {}

  @Get()
  findAll() {
    return this.authAclService.findAll();
  }
}
