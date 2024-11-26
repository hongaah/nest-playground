import { Module } from '@nestjs/common';
import { ServerStatusService } from './server-status.service';
import { ServerStatusController } from './server-status.controller';

@Module({
  controllers: [ServerStatusController],
  providers: [ServerStatusService],
})
export class ServerStatusModule {}
