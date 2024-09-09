import { Global, forwardRef, Module } from '@nestjs/common';
import { CircularDependencyService } from './circular-dependency.service';
import { CircularDependencyController } from './circular-dependency.controller';
import { TestGlobalModule } from 'src/test-global/test-global.module';

@Global()
@Module({
  imports: [forwardRef(() => TestGlobalModule)],
  controllers: [CircularDependencyController],
  providers: [CircularDependencyService],
  exports: [CircularDependencyService],
})
export class CircularDependencyModule {}
