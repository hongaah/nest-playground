import { HttpModule } from '@nestjs/axios';

// 统一配置 axios
export const httpModuleRegiser = HttpModule.register({
  timeout: 5000,
});
