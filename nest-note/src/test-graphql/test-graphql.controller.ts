import { Controller } from '@nestjs/common';
import { TestGraphqlService } from './test-graphql.service';

@Controller('test-graphql')
export class TestGraphqlController {
  constructor(private readonly testGraphqlService: TestGraphqlService) {}
}
