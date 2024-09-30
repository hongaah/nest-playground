import { Controller, Inject, Get, Req, Res } from '@nestjs/common';
import { SessionService } from 'src/redis-session/session/session.service';
import { RedisSessionService } from './redis-session.service';
// import { Request, Response } from 'express';

@Controller('redis-session')
export class RedisSessionController {
  constructor(private readonly redisSessionService: RedisSessionService) {}

  @Inject(SessionService)
  private sessionService: SessionService;

  @Get('count')
  async count(@Req() req: any, @Res({ passthrough: true }) res: any) {
    const sid = req.cookies?.sid;

    // 当不传类型参数，返回的是默认类型 Record<string, any>
    // const session = await this.sessionService.getSession(sid);
    const session = await this.sessionService.getSession<{ count: string }>(
      sid,
    );

    const curCount = session.count ? parseInt(session.count) + 1 : 1;
    const curSid = await this.sessionService.setSession(sid, {
      count: curCount,
    });

    res.cookie('sid', curSid, { maxAge: 1800000 });
    return curCount;
  }
}
