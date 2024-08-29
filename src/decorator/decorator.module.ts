import { Module, Global } from '@nestjs/common';
import { DecoratorService } from './decorator.service';
import { DecoratorController } from './decorator.controller';

@Global()
@Module({
  imports: [],
  controllers: [DecoratorController],
  providers: [
    DecoratorService,
    {
      provide: 'Person',
      useFactory() {
        return {
          name: 'hazel',
        };
      },
    },
  ],
})
export class DecoratorModule {}
