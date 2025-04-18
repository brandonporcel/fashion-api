import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config';
import { QuotesModule } from './quotes/quotes.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';
import { CommonModule } from './common/common.module';
import { BrandsModule } from './brands/brands.module';
import { CriticsModule } from './critics/critics.module';
import { RunwaysModule } from './runways/runways.module';
import { DesignersModule } from './designers/designers.module';
import { UnfoundRunwaysModule } from './unfound-runways/unfound-runways.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    QuotesModule,
    PrismaModule,
    CommonModule,
    BrandsModule,
    CriticsModule,
    RunwaysModule,
    DesignersModule,
    UnfoundRunwaysModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
