import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthAclService {
  findAll() {
    return `This action returns all authAcl`;
  }
}
