import { Module, Global } from '@nestjs/common';
import { DecoratorService } from './decorator.service';
import { DecoratorController } from './decorator.controller';
import { HostController } from './host.controller';
import { CustomController } from './custom.controller';

@Global()
@Module({
  imports: [],
  controllers: [DecoratorController, HostController, CustomController],
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
