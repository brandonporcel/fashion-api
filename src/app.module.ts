import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { appConfig } from './config';
import { QuotesModule } from './quotes/quotes.module';
import { PrismaService } from './prisma/prisma.service';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig],
    }),
    QuotesModule,
    PrismaModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
