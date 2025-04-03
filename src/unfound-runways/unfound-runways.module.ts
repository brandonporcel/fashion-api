import { Module } from '@nestjs/common';
import { UnfoundRunwaysService } from './unfound-runways.service';
import { UnfoundRunwaysController } from './unfound-runways.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UnfoundRunwaysController],
  providers: [UnfoundRunwaysService],
})
export class UnfoundRunwaysModule {}
