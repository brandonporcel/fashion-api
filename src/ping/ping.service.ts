import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';

const EVERY_8_MINUTES = '*/8 * * * *';
@Injectable()
export class PingService {
  private readonly logger = new Logger(PingService.name);

  @Cron(EVERY_8_MINUTES)
  async handleCron() {
    try {
      this.logger.debug('Ejecutando ping para despertar ...');
      const url = process.env.BASE_URL + '/ping';
      const url2 = 'https://ropero-backend.onrender.com/api/ping';
      await axios.get(url);
      await axios.get(url2);
      this.logger.debug('Ping exitoso');
    } catch (error) {
      this.logger.error('Error al hacer ping:', error.message);
    }
  }
}
