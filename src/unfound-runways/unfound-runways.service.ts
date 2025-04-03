import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from 'src/prisma/prisma.service';
import { PaginationDto } from 'src/common/dtos/pagination.dto';

@Injectable()
export class UnfoundRunwaysService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll(paginationDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginationDto;

    const unfoundRunways = await this.prismaService.unfoundRunway.findMany({
      take: limit,
      skip: offset,
    });

    return unfoundRunways;
  }

  async findOnePlain(term: string) {
    return await this.findOne(term);
  }

  private async findOne(term: string) {
    const unfoundRunway = await this.prismaService.unfoundRunway.findUnique({
      where: { id: term },
    });

    if (!unfoundRunway) throw new NotFoundException(`UnfoundRunway not found`);

    return unfoundRunway;
  }
}
