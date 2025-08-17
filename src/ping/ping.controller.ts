import { Controller, Get } from '@nestjs/common';
import { PingService } from './ping.service';

@Controller('ping')
export class PingController {
  constructor(private readonly pingService: PingService) {}

  @Get()
  ping() {
    return { ok: true, timestamp: new Date() };
  }

  @Get('health')
  health() {
    return this.pingService.health();
  }
}
