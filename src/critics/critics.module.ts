import { Module } from '@nestjs/common';
import { CriticsService } from './critics.service';
import { CriticsController } from './critics.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [CriticsController],
  providers: [CriticsService],
})
export class CriticsModule {}
