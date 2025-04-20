import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

const EVERY_5_MINUTES = '*/5 * * * *';
@Injectable()
export class PingService {
  private readonly logger = new Logger(PingService.name);

  @Cron(EVERY_5_MINUTES)
  async handleCron() {
    try {
      this.logger.debug('Ejecutando ping para despertar ...');
      const url = process.env.BASE_URL + '/api/ping';
      await axios.get(url);
      this.logger.debug('Ping exitoso');
    } catch (error) {
      this.logger.error('Error al hacer ping:', error.message);
    }
  }
}
