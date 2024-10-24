import { Controller, Get, Sse } from '@nestjs/common';
import { PptGenerateService } from './ppt-generate.service';

@Controller('ppt-generate')
export class PptGenerateController {
  constructor(private readonly pptGenerateService: PptGenerateService) {}

  @Get()
  getHello(): string {
    return this.pptGenerateService.getHello();
  }

  // localhost:3000/ppt-generate/list
  @Sse('list')
  async universityList() {
    return this.pptGenerateService.getUniversityData();
  }
}
