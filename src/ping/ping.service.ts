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
      await axios.get('https://fashion-api-1-74i5.onrender.com/api/ping');
      this.logger.debug('Ping exitoso');
    } catch (error) {
      this.logger.error('Error al hacer ping:', error.message);
    }
  }
}
