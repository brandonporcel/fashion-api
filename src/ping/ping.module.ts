import { Module } from '@nestjs/common';
import { PingService } from './ping.service';
import { PingController } from './ping.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [PingService],
  imports: [PrismaModule],
  controllers: [PingController],
})
export class PingModule {}
