import { Controller, Get } from '@nestjs/common';
import { AuthRbacService } from './auth-rbac.service';

@Controller('auth-rbac')
export class AuthRbacController {
  constructor(private readonly authRbacService: AuthRbacService) {}

  @Get()
  findAll() {
    return this.authRbacService.findAll();
  }
}
