import { Module } from '@nestjs/common';
import { PersonService } from './person.service';
import { PersonController, ApiPersonController } from './person.controller';

@Module({
  controllers: [PersonController, ApiPersonController],
  providers: [PersonService],
})
export class PersonModule {}
