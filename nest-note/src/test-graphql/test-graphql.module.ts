import { Module } from '@nestjs/common';
import { TestGraphqlService } from './test-graphql.service';
import { TestGraphqlController } from './test-graphql.controller';
import { StudentResolver } from './student/student.resolver';

@Module({
  controllers: [TestGraphqlController],
  providers: [TestGraphqlService, StudentResolver],
})
export class TestGraphqlModule {}
