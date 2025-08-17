import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import axios from 'axios';
import { PrismaService } from '../prisma/prisma.service';

const EVERY_8_MINUTES = '*/8 * * * *';
const URLS = ['https://ropero-backend.onrender.com/api/ping'];

@Injectable()
export class PingService {
  private readonly logger = new Logger(PingService.name);

  constructor(private readonly prisma: PrismaService) {}

  async health() {
    try {
      await this.prisma.$queryRaw`SELECT 1`;
      return { api: 'up', db: 'up' };
    } catch {
      return { api: 'up', db: 'down' };
    }
  }

  @Cron(EVERY_8_MINUTES)
  async handleCron() {
    try {
      this.logger.debug('Ejecutando ping para despertar ...');

      // 🔹 1) Pego a mi propia API
      const url = process.env.BASE_URL + '/ping';
      await axios.get(url);

      // 🔹 2) Pego a otras APIs en Render
      URLS.forEach((url) => {
        axios.get(url);
      });

      // 🔹 3) Mantengo la DB despierta
      await this.prisma.$queryRaw`SELECT 1`;

      this.logger.debug('Ping + DB keep-alive exitoso ✅');
    } catch (error) {
      this.logger.error('Error en ping:' + error.message);
    }
  }
}
