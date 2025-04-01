import { Module } from '@nestjs/common';
import { RunwaysService } from './runways.service';
import { RunwaysController } from './runways.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [RunwaysController],
  providers: [RunwaysService],
})
export class RunwaysModule {}
