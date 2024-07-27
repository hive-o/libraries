import { Controller, Get, Post, Req } from '@nestjs/common';

import { AppService } from './app.service';
import { ProbotService } from '@hive-o/nest-probot';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly probot: ProbotService
  ) {}

  @Get()
  getData() {
    return this.appService.getData();
  }

  @Post('/hook')
  async hook(@Req() req) {
    await this.probot.receiveHook(req);
  }
}
