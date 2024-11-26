import { Module } from '@nestjs/common';
import { TestEventEmitterService } from './test-event-emitter.service';
import { UserModule } from './user/user.module';
import { NotificationModule } from './notification/notification.module';
import { EmailModule } from './email/email.module';

@Module({
  providers: [TestEventEmitterService],
  imports: [UserModule, NotificationModule, EmailModule],
})
export class TestEventEmitterModule {}
