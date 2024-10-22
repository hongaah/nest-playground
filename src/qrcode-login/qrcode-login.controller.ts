import {
  Controller,
  Get,
  Query,
  BadRequestException,
  UnauthorizedException,
  Inject,
  Headers,
} from '@nestjs/common';
import { QrcodeLoginService } from './qrcode-login.service';
import { randomUUID } from 'crypto'; // 用 node 的 crypto 模块
import * as qrcode from 'qrcode';
import { JwtService } from '@nestjs/jwt';

interface QrCodeInfo {
  status:
    | 'noscan'
    | 'scan-wait-confirm'
    | 'scan-confirm'
    | 'scan-cancel'
    | 'expired';
  userInfo?: {
    userId: number;
  };
}
const map = new Map<string, QrCodeInfo>();

// noscan 未扫描
// scan-wait-confirm -已扫描，等待用户确认
// scan-confirm 已扫描，用户同意授权
// scan-cancel 已扫描，用户取消授权
// expired 已过期

@Controller('qrcode-login')
export class QrcodeLoginController {
  constructor(private readonly qrcodeLoginService: QrcodeLoginService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  private users = [
    { id: 1, username: 'hazel', password: '111111' },
    { id: 2, username: 'hong', password: '222222' },
  ];

  // 生成二维码
  // localhost:3000/qrcode-login/qrcode/generate
  @Get('qrcode/generate')
  async generate() {
    const uuid = randomUUID();
    const qrcode_url = `http://localhost:3000/static/qrcode-login.html?id=${uuid}`;
    const dataUrl = await qrcode.toDataURL(qrcode_url);

    map.set(`qrcode_${uuid}`, {
      status: 'noscan',
    });

    return {
      qrcode_id: uuid,
      img: dataUrl,
    };
  }

  // 检测二维码状态
  // localhost:3000/qrcode-login/qrcode/check?id=31d5d1fa-9277-4d12-8d91-cd658cba21e9
  @Get('qrcode/check')
  async check(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    if (info.status === 'scan-confirm') {
      return {
        token: await this.jwtService.sign({
          userId: info.userInfo.userId,
        }),
        ...info,
      };
    }
    return info;
  }

  @Get('qrcode/scan')
  async scan(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-wait-confirm';
    return 'success';
  }

  @Get('qrcode/confirm')
  async confirm(
    @Query('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    let user;
    try {
      const [, token] = auth.split(' ');
      const info = await this.jwtService.verify(token);

      user = this.users.find((item) => item.id == info.userId);
    } catch (e) {
      throw new UnauthorizedException('token 过期，请重新登录');
    }

    const info = map.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-confirm';
    info.userInfo = user;
    return 'success';
  }

  @Get('qrcode/cancel')
  async cancel(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    info.status = 'scan-cancel';
    return 'success';
  }

  @Get('login')
  async login(
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    const user = this.users.find((item) => item.username === username);

    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('密码错误');
    }

    return {
      token: await this.jwtService.sign({
        userId: user.id,
      }),
    };
  }

  @Get('userInfo')
  async userInfo(@Headers('Authorization') auth: string) {
    try {
      const [, token] = auth.split(' ');
      const info = await this.jwtService.verify(token);

      const user = this.users.find((item) => item.id == info.userId);
      return user;
    } catch (e) {
      throw new UnauthorizedException('token 过期，请重新登录');
    }
  }
}
