import { Controller, Inject, Get } from '@nestjs/common';
import {
  MODULE_OPTIONS_TOKEN,
  // CccModuleOptions,
  OPTIONS_TYPE,
  ASYNC_OPTIONS_TYPE,
} from './ccc.module-definition';

@Controller('dynamic-builder')
export class DynamicBuilderController {
  // @Inject(MODULE_OPTIONS_TOKEN) private options: typeof CccModuleOptions;
  @Inject(MODULE_OPTIONS_TOKEN) private options: typeof OPTIONS_TYPE;
  @Inject(MODULE_OPTIONS_TOKEN) private asyncOptions: typeof ASYNC_OPTIONS_TYPE;

  @Get('options')
  getOptions() {
    return this.options;
  }

  @Get('async-options')
  getAsyncOptions() {
    return this.asyncOptions;
  }
}
