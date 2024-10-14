import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { generateRandomStr } from './utils';
import { UniqueCode } from './entities/UniqueCode';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UniqueCodeService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  // @Cron(CronExpression.EVERY_5_SECONDS)
  // 生成随机的长度为 6 的字符串，查下数据库，如果没查到，就插入数据，否则重新生成。
  async generateCode() {
    const str = generateRandomStr(6);

    const uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      code: str,
    });

    if (!uniqueCode) {
      const code = new UniqueCode();
      code.code = str;
      code.status = 0;

      // TODO: 考虑批量插入性能会好
      return await this.entityManager.insert(UniqueCode, code);
    } else {
      return this.generateCode();
    }
  }

  // 一般是在凌晨 4 点左右批量插入一堆，比如一次性插入 10000 个
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async batchGenerateCode() {
    for (let i = 0; i < 10000; i++) {
      this.generateCode();
    }
  }
}
