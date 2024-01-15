import { Controller, Get, HostParam } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
//@Controller({ host: ':dynamic.localhost' }) // does not work with fastify.
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(/*@HostParam('dynamic') dynamic?: string*/): string {
    return ` ${this.appService.getHello()}`;
  }
}
