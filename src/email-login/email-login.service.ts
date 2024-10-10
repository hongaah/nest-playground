import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class EmailLoginService {
  transporter: Transporter;

  @InjectEntityManager()
  private entityManager: EntityManager;

  constructor(private configService: ConfigService) {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: this.configService.get('email_user'),
        pass: this.configService.get('email_pass'),
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: 'hazel nest',
        address: this.configService.get('email_user'),
      },
      to,
      subject,
      html,
    });
  }

  async findUserByEmail(email: string) {
    return await this.entityManager.findOneBy(User, {
      email,
    });
  }
}
