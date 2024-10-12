import { Injectable, Inject } from '@nestjs/common';
import { EmailService } from 'src/test-event-emitter/email/email.service';
import { OnEvent } from '@nestjs/event-emitter';

@Injectable()
export class NotificationService {
  @Inject(EmailService)
  private emailService: EmailService;

  @OnEvent('user.register')
  async hanldeUserRegister(data) {
    console.log('user.register');

    await this.emailService.sendMail({
      to: data.email,
      subject: '欢迎' + data.username,
      html: '欢迎新人',
    });
  }
}
