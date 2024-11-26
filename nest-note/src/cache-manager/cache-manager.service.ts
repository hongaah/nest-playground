import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheManagerService {
  getHello(): string {
    return 'Hello CacheManager!';
  }
}
