import { Module } from '@nestjs/common';
import { PipeController } from './pipe.controller';

@Module({
  controllers: [PipeController],
  providers: [
    {
      provide: 'validation_options',
      useFactory() {
        return {
          aaa: 1,
          bbb: 2,
        };
      },
    },
  ],
})
export class PipeModule {}
